import { defineConfig, devices } from '@playwright/test';

const runId = process.env.RUN_ID ?? new Date().toISOString().replace(/[.:]/g, '-');
const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const runMode = (process.env.RUN_MODE ?? 'headed').toLowerCase();
const isHeadless = runMode === 'headless';
const isLocalTarget = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(baseURL);
const skipWebServer = process.env.SKIP_WEB_SERVER === 'true';
const shardId = process.env.SHARD_ID ? `/${process.env.SHARD_ID}` : '';
const workerCount = Number(process.env.PW_WORKERS ?? '1');
const fullyParallel = process.env.FULLY_PARALLEL === 'true';

export default defineConfig({
  testDir: './e2e',
  fullyParallel,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: Number.isFinite(workerCount) && workerCount > 0 ? workerCount : 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: `playwright-report/${runId}${shardId}` }]],
  timeout: 60_000,
  outputDir: `test-results/artifacts/${runId}${shardId}`,
  use: {
    baseURL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        headless: isHeadless,
      },
    },
  ],
  webServer: !skipWebServer && isLocalTarget
    ? {
        command: 'npm run dev -- --host 127.0.0.1 --port 4321',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
});
