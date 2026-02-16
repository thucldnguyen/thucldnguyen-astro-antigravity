import { spawn } from 'node:child_process';
import net from 'node:net';

const usage = `Usage: npm run test:e2e -- [options] [-- <playwright args>]

Options:
  --mode headed|headless        Browser mode (default: headed)
  --screenshots all|failure     Screenshot policy in headed mode (default: failure)
  --instances <n>               Number of distributed runner processes (default: 1)
  --target local|prod|<url>     Test target (default: local)
                                local -> http://127.0.0.1:4321
                                prod  -> https://thucldnguyen.com
  -h, --help                    Show this help
`;

const args = process.argv.slice(2);
let mode = 'headed';
let screenshots = 'failure';
let target = 'local';
let instances = '1';
const passthrough = [];

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];

  if (arg === '--') {
    passthrough.push(...args.slice(i + 1));
    break;
  }

  if (arg === '-h' || arg === '--help') {
    console.log(usage);
    process.exit(0);
  }

  if (arg === '--mode') {
    mode = args[i + 1] ?? '';
    i += 1;
    continue;
  }

  if (arg === '--screenshots') {
    screenshots = args[i + 1] ?? '';
    i += 1;
    continue;
  }

  if (arg === '--target') {
    target = args[i + 1] ?? '';
    i += 1;
    continue;
  }

  if (arg === '--instances') {
    instances = args[i + 1] ?? '';
    i += 1;
    continue;
  }

  passthrough.push(arg);
}

const normalizedMode = mode.toLowerCase();
if (!['headed', 'headless'].includes(normalizedMode)) {
  console.error(`Invalid --mode: ${mode}`);
  console.error(usage);
  process.exit(1);
}

const normalizedScreenshots = screenshots.toLowerCase();
if (!['all', 'failure'].includes(normalizedScreenshots)) {
  console.error(`Invalid --screenshots: ${screenshots}`);
  console.error(usage);
  process.exit(1);
}
const instanceCount = Number.parseInt(instances, 10);
if (!Number.isInteger(instanceCount) || instanceCount < 1 || instanceCount > 32) {
  console.error(`Invalid --instances: ${instances}. Use an integer between 1 and 32.`);
  console.error(usage);
  process.exit(1);
}

let baseURL = 'http://127.0.0.1:4321';
if (target === 'prod') {
  baseURL = 'https://thucldnguyen.com';
} else if (target !== 'local') {
  if (!/^https?:\/\//i.test(target)) {
    console.error(`Invalid --target: ${target}. Use local, prod, or a full http(s) URL.`);
    process.exit(1);
  }
  baseURL = target;
}

const runId = new Date().toISOString().replace(/[.:]/g, '-');
const hasWorkerOverride = passthrough.includes('--workers') || passthrough.includes('-j');
const isLocalTarget = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(baseURL);
const sharedEnv = {
  ...process.env,
  RUN_MODE: normalizedMode,
  SCREENSHOT_MODE: normalizedScreenshots,
  BASE_URL: baseURL,
  RUN_ID: runId,
  // Disable Netlify Vite middleware for local E2E runs to avoid flaky
  // internal blobs server startup that can crash Playwright webServer boot.
  ...(isLocalTarget ? { NETLIFY_DEV: '1' } : {}),
};

function spawnRunner(extraArgs, envOverrides = {}) {
  return spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['playwright', 'test', ...extraArgs],
    {
      stdio: 'inherit',
      env: {
        ...sharedEnv,
        ...envOverrides,
      },
    },
  );
}

async function isPortAvailable(port, host = '127.0.0.1') {
  return await new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on('error', () => resolve(false));
    server.listen({ host, port }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findFreePort(startPort, endPort = startPort + 200, host = '127.0.0.1') {
  for (let port = startPort; port <= endPort; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    if (await isPortAvailable(port, host)) {
      return port;
    }
  }
  throw new Error(`Unable to find an available port in range ${startPort}-${endPort}`);
}

async function waitForUrl(url, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok || (res.status >= 300 && res.status < 500)) {
        return;
      }
    } catch {
      // Server not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function waitForStableUrl(url, timeoutMs = 120_000, stableWindowMs = 8_000) {
  const start = Date.now();
  let stableSince = 0;

  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' });
      const isHealthy = res.ok || (res.status >= 300 && res.status < 500);
      if (isHealthy) {
        if (!stableSince) {
          stableSince = Date.now();
        }
        if (Date.now() - stableSince >= stableWindowMs) {
          return;
        }
      } else {
        stableSince = 0;
      }
    } catch {
      stableSince = 0;
    }
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  throw new Error(`Timed out waiting for stable server at ${url}`);
}

if (instanceCount === 1) {
  const child = spawnRunner(passthrough, {
    FULLY_PARALLEL: 'false',
    PW_WORKERS: hasWorkerOverride ? '' : '1',
  });
  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 1);
  });
} else {
  const children = [];
  let remaining = instanceCount;
  let failed = false;
  let devServer;
  let distributedBaseURL = baseURL;

  const shutdown = () => {
    if (devServer && !devServer.killed) {
      devServer.kill('SIGTERM');
    }
  };

  process.on('SIGINT', () => {
    shutdown();
    process.exit(130);
  });
  process.on('SIGTERM', () => {
    shutdown();
    process.exit(143);
  });

  const runDistributed = async () => {
    if (isLocalTarget) {
      const initialPort = Number(new URL(baseURL).port || 4321);
      const freePort = await findFreePort(initialPort, initialPort + 200);
      distributedBaseURL = `http://127.0.0.1:${freePort}`;

      console.log(`[distributed] starting shared dev server at ${distributedBaseURL}`);
      devServer = spawn(
        process.platform === 'win32' ? 'npm.cmd' : 'npm',
        ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(freePort)],
        {
          stdio: 'inherit',
          env: {
            ...sharedEnv,
            BASE_URL: distributedBaseURL,
          },
        },
      );
      await waitForUrl(distributedBaseURL, 120_000);
      await waitForStableUrl(distributedBaseURL, 120_000, 8_000);
      console.log('[distributed] shared dev server is ready and stable');
    }

    for (let shard = 1; shard <= instanceCount; shard += 1) {
      const shardArgs = [
        ...passthrough,
        ...(hasWorkerOverride ? [] : ['--workers', '1']),
        '--shard',
        `${shard}/${instanceCount}`,
      ];

      console.log(`[distributed] starting shard ${shard}/${instanceCount}`);
      const child = spawnRunner(shardArgs, {
        BASE_URL: distributedBaseURL,
        FULLY_PARALLEL: 'true',
        SHARD_ID: `shard-${shard}-of-${instanceCount}`,
        SKIP_WEB_SERVER: 'true',
      });
      children.push(child);

      child.on('exit', (code, signal) => {
        remaining -= 1;
        const ok = code === 0 && !signal;
        if (!ok) {
          failed = true;
          console.error(`[distributed] shard ${shard}/${instanceCount} failed`);
        } else {
          console.log(`[distributed] shard ${shard}/${instanceCount} passed`);
        }

        if (remaining === 0) {
          shutdown();
          process.exit(failed ? 1 : 0);
        }
      });
    }
  };

  runDistributed().catch((err) => {
    console.error(`[distributed] failed to initialize: ${err.message}`);
    shutdown();
    process.exit(1);
  });
}
