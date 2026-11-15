import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const report = { pointer: [], navigation: [], widths: [], touch: {}, menu: {}, errors: [] };
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', e => report.errors.push(e.message));
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(950);
  const b = await page.locator('.hero-create').boundingBox();
  for (const [x, y] of [[b.x, b.y], [b.x + b.width / 2, b.y + b.height / 2], [b.x + b.width, b.y + b.height], [1370, 160], [80, 800]]) {
    await page.mouse.move(x, y, { steps: 4 }); await page.waitForTimeout(250);
    report.pointer.push(await page.evaluate(() => ({ ink: { left: document.querySelector('.hero-create').style.getPropertyValue('--ink-left'), right: document.querySelector('.hero-create').style.getPropertyValue('--ink-right') }, frame: { x: parseFloat(document.querySelector('.hero-print').style.getPropertyValue('--frame-x')), y: parseFloat(document.querySelector('.hero-print').style.getPropertyValue('--frame-y')) } })));
  }
  await page.mouse.move(0, 0); await page.waitForTimeout(550);
  report.rest = await page.locator('.hero-print').evaluate(el => getComputedStyle(el).transform);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const id of ['work', 'services', 'about', 'quote', 'contact']) {
    await page.locator(`#${id}`).evaluate(el => el.scrollIntoView({ behavior: 'instant' })); await page.waitForTimeout(150);
    const active = await page.locator('.header-inner a[aria-current]').getAttribute('href');
    report.navigation.push({ id, active }); assert.equal(active, `#${id}`);
  }
  for (const width of [320, 360, 390, 600, 767, 768, 820, 900, 1024, 1200, 1440, 1680, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const value = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, stageHeight: document.querySelector('.hero-image-inner').offsetHeight }));
    report.widths.push(value); assert.equal(value.width, value.documentWidth); assert.ok(value.stageHeight <= 558);
  }
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const touch = await mobile.newPage();
  await touch.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle' });
  await touch.locator('.hero-create').dispatchEvent('pointermove', { pointerType: 'touch', clientX: 180, clientY: 200, isPrimary: true });
  report.touch.heroActive = await touch.locator('.hero').getAttribute('data-pointer-active'); assert.equal(report.touch.heroActive, null);
  await touch.getByRole('button', { name: 'Enlarge A world of colour.' }).tap(); await touch.waitForTimeout(350);
  const image = await touch.locator('.photo-dialog img').boundingBox();
  const cdp = await mobile.newCDPSession(touch); const y = image.y + image.height / 2;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y }] });
  for (const x of [260, 220, 180, 140, 100, 70]) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y + 3 }] }); await touch.waitForTimeout(25); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  report.touch.swipeTitle = await touch.locator('#photo-title').textContent(); assert.equal(report.touch.swipeTitle, 'Personality. In motion.');
  async function naturalTap(locator) {
    const box = await locator.boundingBox();
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }] });
    await touch.waitForTimeout(120);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  }
  await touch.waitForTimeout(1000);
  await naturalTap(touch.getByRole('button', { name: 'Close photo viewer' }));
  await touch.locator('dialog').waitFor({ state: 'hidden' }); report.touch.closed = true;
  await touch.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await naturalTap(touch.getByRole('button', { name: 'Open navigation' }));
  await touch.waitForTimeout(280); report.menu.openHeight = (await touch.locator('#mobile-nav').boundingBox()).height;
  await naturalTap(touch.getByRole('button', { name: 'Close navigation' })); await touch.waitForTimeout(220);
  report.menu.closedHeight = (await touch.locator('#mobile-nav').boundingBox()).height;
  report.menu.inert = await touch.locator('#mobile-nav').evaluate(el => el.inert);
  assert.ok(report.menu.openHeight > 300); assert.equal(report.menu.closedHeight, 0); assert.equal(report.menu.inert, true);
  console.log(JSON.stringify({ rest: report.rest, navigation: report.navigation, widths: report.widths, touch: report.touch, menu: report.menu, errors: report.errors }));
} finally {
  await writeFile('.impeccable/v11-after/motion-measurements.json', JSON.stringify(report, null, 2));
  await browser.close();
}
