import { chromium } from '@playwright/test';
import { mkdir, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.TEST_BASE_URL || 'http://localhost:3001';
const output = process.env.REVIEW_OUTPUT || '.impeccable/review';
await mkdir(output, { recursive: true });
// Software rendering avoids missing photo textures in very tall Chromium captures.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.emulateMedia({ reducedMotion: 'reduce' });

async function settleImages() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(async image => { image.loading = 'eager'; await image.decode().catch(() => {}); }));
  });
  await page.waitForTimeout(250);
}

async function captureFullPage(name) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  if (height <= 8000) {
    await page.screenshot({ path: `${output}/${name}.png`, fullPage: true, animations: 'disabled' });
    return;
  }
  // Very tall full-page Chromium captures can drop a repeated image texture.
  // Capture real viewport frames and join them at their measured scroll offsets.
  const directory = await mkdtemp(join(tmpdir(), 'stickers-capture-'));
  const headerStyle = await page.addStyleTag({ content: '.site-header{position:relative!important}' });
  const shots = [];
  const viewport = page.viewportSize();
  for (let y = 0; y < height; y += viewport.height) {
    await page.evaluate(value => scrollTo(0, value), y);
    await page.waitForTimeout(130);
    const scrollY = await page.evaluate(() => window.scrollY);
    const path = join(directory, `${shots.length}.png`);
    await page.screenshot({ path, animations: 'disabled' });
    shots.push({ path, y: scrollY });
    if (scrollY + viewport.height >= height) break;
  }
  const dataPath = join(directory, 'frames.json');
  await writeFile(dataPath, JSON.stringify({ width: viewport.width, height, shots, output: `${output}/${name}.png` }));
  const result = spawnSync('python', ['scripts/stitch-captures.py', dataPath], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr);
  await headerStyle.evaluate(element => element.remove());
  await page.evaluate(() => scrollTo(0, 0));
  await rm(directory, { recursive: true });
}

const measurements = [];
for (const [name, width, height] of [['desktop', 1440, 1000], ['intermediate', 1024, 1000], ['tablet', 768, 1024], ['mobile', 390, 844], ['small-mobile', 360, 800]]) {
  await page.setViewportSize({ width, height });
  await page.goto(base, { waitUntil: 'networkidle' });
  await settleImages();
  await page.screenshot({ path: `${output}/${name}-hero.png`, animations: 'disabled' });
  await captureFullPage(name);
  const sectionHeaderStyle = await page.addStyleTag({ content: '.site-header{position:relative!important}' });
  for (const section of ['work', 'services', 'about', 'quote', 'contact']) {
    await page.locator(`#${section}`).screenshot({ path: `${output}/${width}-${section}.png`, animations: 'disabled' });
  }
  await sectionHeaderStyle.evaluate(element => element.remove());
  await page.evaluate(() => scrollTo(0, 0));
  measurements.push(await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, brokenImages: [...document.images].filter(image => !image.naturalWidth).map(image => image.src) })));
}

await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Enlarge A world of colour.' }).click();
await settleImages();
await page.screenshot({ path: `${output}/photo-viewer.png`, animations: 'disabled' });
await page.keyboard.press('Escape');
await page.getByRole('button', { name: 'Vehicle graphics', exact: true }).click();
await settleImages();
await page.locator('#work').screenshot({ path: `${output}/filtered-work.png`, animations: 'disabled' });
await page.getByRole('tab', { name: 'Printed patterns' }).click();
await settleImages();
await page.locator('#materials').screenshot({ path: `${output}/material-patterns.png`, animations: 'disabled' });
await page.getByRole('link', { name: 'Ask about this material' }).click();
await page.locator('textarea[name="description"]').fill('Printed labels for our café, with our logo and Urdu text.');
await page.locator('input[name="dimensions"]').fill('8 × 5 cm');
await page.locator('input[name="quantity"]').fill('100 labels');
await page.locator('input[name="name"]').fill('Ali');
await page.getByText('Preview your inquiry', { exact: true }).click();
await page.locator('#quote').screenshot({ path: `${output}/quote-preview.png`, animations: 'disabled' });
await page.getByRole('link', { name: 'Discuss vehicle graphics', exact: true }).focus();
await page.keyboard.press('Enter');
await page.keyboard.press('Tab');
await page.screenshot({ path: `${output}/keyboard-quote.png`, animations: 'disabled' });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Open navigation' }).click();
await page.screenshot({ path: `${output}/mobile-menu.png`, animations: 'disabled' });
await page.getByRole('button', { name: 'Close navigation' }).click();
await page.getByRole('button', { name: 'Commercial signage', exact: true }).click();
await settleImages();
await page.locator('#service-panel-signage').scrollIntoViewIfNeeded();
await page.screenshot({ path: `${output}/mobile-service-signage.png`, animations: 'disabled' });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Show vehicle graphics', exact: true }).click();
await settleImages();
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: `${output}/hero-vehicles.png`, animations: 'disabled' });
await page.getByRole('button', { name: 'Show walls & interiors', exact: true }).click();
await settleImages();
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: `${output}/hero-interiors.png`, animations: 'disabled' });
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base, { waitUntil: 'load' });
await page.waitForTimeout(150);
await page.screenshot({ path: `${output}/hero-entrance.png` });
await page.waitForTimeout(850);
const headline = await page.locator('.hero-create').boundingBox();
await page.mouse.move(headline.x + headline.width * .7, headline.y + headline.height / 2);
await page.waitForTimeout(300);
await page.screenshot({ path: `${output}/hero-pointer.png` });
await page.mouse.move(0, 0);
await page.waitForTimeout(550);
await page.screenshot({ path: `${output}/hero-rest.png` });
await page.locator('#quote-title').scrollIntoViewIfNeeded();
await page.waitForTimeout(1100);
await page.locator('#quote-title .ink-highlight').hover();
await page.waitForTimeout(300);
await page.screenshot({ path: `${output}/happen-ink.png` });
for (const block of await page.locator('#contact .reveal-block').all()) {
  await block.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
}
await page.locator('#contact-title').scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.locator('#contact-title .ink-highlight').last().hover();
await page.waitForTimeout(300);
await page.screenshot({ path: `${output}/footer-ink.png` });
await writeFile(`${output}/browser-measurements.json`, JSON.stringify({ measurements, errors }, null, 2));
console.log(JSON.stringify({ measurements, errors }, null, 2));
await browser.close();
