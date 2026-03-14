const { chromium } = require('/opt/hostedtoolcache/node/20.20.0/x64/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.click('button[aria-label="Switch to dark mode"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/workspace/repo/screenshots/03-after-dark-click.png', fullPage: true });
  await browser.close();
  console.log('Done');
})().catch(e => { console.error(e); process.exit(1); });
