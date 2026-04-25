import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = process.env.SHOT_DIR || '/tmp/kanika-shots';
fs.mkdirSync(OUT, { recursive: true });

const log = (...a) => console.log('[snap]', ...a);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  });
  const page = await context.newPage();
  page.on('console', (m) => {
    if (['error', 'warning'].includes(m.type())) {
      log('console', m.type(), m.text().slice(0, 200));
    }
  });
  page.on('pageerror', (e) => log('pageerror', e.message.slice(0, 200)));

  async function snap(name) {
    const file = `${OUT}/${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    log('shot', file);
  }

  // 1) Admin login
  log('go /admin');
  await page.goto('https://kanikarose.com/admin', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(1500);
  await snap('01-admin-login');

  // Find PIN input — likely 6 single-digit boxes or one number/text field
  const pinDigits = await page.locator('input[inputmode="numeric"], input[autocomplete="one-time-code"], input[maxlength="1"]').all();
  if (pinDigits.length >= 6) {
    log('detected', pinDigits.length, 'PIN boxes');
    const digits = '736473'.split('');
    for (let i = 0; i < 6; i++) {
      await pinDigits[i].fill(digits[i]);
    }
  } else {
    // fall back to single field
    const single = page.locator('input[type="password"], input[type="text"], input[type="tel"], input[type="number"]').first();
    log('using single PIN input');
    await single.fill('736473');
  }
  await page.waitForTimeout(400);

  // Submit — try Enter, then click any visible submit button
  await page.keyboard.press('Enter').catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await snap('02-after-pin');

  log('current URL:', page.url());

  // 2) Admin dashboard
  if (!page.url().includes('/admin')) {
    await page.goto('https://kanikarose.com/admin', { waitUntil: 'domcontentloaded' });
  }
  await page.waitForTimeout(1200);
  await snap('03-admin-dashboard');

  // 3) Consilium landing
  log('go /consilium');
  await page.goto('https://kanikarose.com/consilium', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  log('current URL:', page.url());
  await snap('04-consilium');

  // 4) Consilium feed
  log('go /consilium/feed');
  await page.goto('https://kanikarose.com/consilium/feed', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  log('current URL:', page.url());
  await snap('05-consilium-feed');

  // 5) Consilium previews (admin-style preview)
  log('go /consilium/previews');
  await page.goto('https://kanikarose.com/consilium/previews', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  log('current URL:', page.url());
  await snap('06-consilium-previews');

  // dump page text for the feed for analysis
  await page.goto('https://kanikarose.com/consilium/feed', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const body = await page.locator('body').innerText().catch(() => '');
  fs.writeFileSync(`${OUT}/feed-text.txt`, body);
  log('saved feed text', body.length, 'chars');

  await browser.close();
  log('done');
})().catch((e) => {
  console.error('FAIL', e);
  process.exit(1);
});
