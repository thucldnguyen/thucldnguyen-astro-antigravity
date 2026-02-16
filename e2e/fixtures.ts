import { chromium, test as base, expect, type Browser, type BrowserContext, type Page } from '@playwright/test';

const runMode = (process.env.RUN_MODE ?? 'headed').toLowerCase();
const screenshotMode = (process.env.SCREENSHOT_MODE ?? 'failure').toLowerCase();
const isHeadless = runMode === 'headless';

function sanitize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

type CheckpointFn = (name: string) => Promise<void>;

type Fixtures = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  checkpoint: CheckpointFn;
};

export const test = base.extend<Fixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.launch({
      headless: isHeadless,
      channel: 'chromium',
    });
    await use(browser);
    await browser.close();
  },
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  checkpoint: async ({ page }, use, testInfo) => {
    let index = 0;
    const capture: CheckpointFn = async (name) => {
      if (runMode !== 'headed' || screenshotMode !== 'all') {
        return;
      }

      index += 1;
      const label = `${String(index).padStart(3, '0')}-${sanitize(name)}.png`;
      const path = testInfo.outputPath('screenshots', label);
      await page.screenshot({ path, fullPage: true });
      await testInfo.attach(`checkpoint-${String(index).padStart(3, '0')}-${name}`, {
        path,
        contentType: 'image/png',
      });
    };

    await use(capture);
  },
});

test.afterEach(async ({ page }, testInfo) => {
  const failed = testInfo.status !== testInfo.expectedStatus;
  if (runMode !== 'headed' || screenshotMode !== 'failure' || !failed) {
    return;
  }

  const path = testInfo.outputPath('screenshots', `failure-${sanitize(testInfo.title)}.png`);
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach('failure-screenshot', {
    path,
    contentType: 'image/png',
  });
});

export { expect };
