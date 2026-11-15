import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('vehicle owner can inspect the wrap and carry the service into a quotation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Vehicle graphics', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  const opener = page.getByRole('button', { name: 'Enlarge Personality. In motion.' });
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await page.getByRole('link', { name: 'Ask about this service' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('select[name="service"]')).toHaveValue('Vehicle wrapping & graphics');
  await page.locator('textarea[name="description"]').fill('Partial wrap for a Suzuki Swift');
  await page.getByRole('tab', { name: 'Marble effect' }).click();
  await page.getByRole('link', { name: 'Ask about this material' }).click();
  await expect(page.locator('input[name="material"]')).toHaveValue('Marble effect');
  await expect(page.locator('textarea[name="description"]')).toHaveValue('Partial wrap for a Suzuki Swift');
});

test('restaurant inquiry contains dimensions and Urdu, validates and opens only a draft', async ({ page }) => {
  await page.addInitScript(() => { window.open = (url) => { (window as Window & { draftUrl?: string }).draftUrl = String(url); return null; }; });
  await page.goto('/?service=signage#quote');
  await expect(page.locator('select[name="service"]')).toHaveValue('Commercial signage');
  await page.getByRole('button', { name: 'Continue in WhatsApp' }).click();
  await expect(page.locator('#quote-error')).toContainText('Tell us a little');
  await page.locator('textarea[name="description"]').fill('Café logo & خوش آمدید + neon');
  await page.locator('input[name="dimensions"]').fill('6 × 3 ft');
  await page.locator('input[name="quantity"]').fill('2 signs');
  await page.getByRole('button', { name: 'Continue in WhatsApp' }).click();
  const url = await page.evaluate(() => (window as Window & { draftUrl?: string }).draftUrl);
  expect(url).toBeTruthy();
  const draft = new URL(url!);
  expect(draft.hostname).toBe('wa.me');
  expect(draft.pathname).toBe('/923455130004');
  expect(draft.searchParams.get('text')).toContain('Café logo & خوش آمدید + neon');
  expect(draft.searchParams.get('text')).toContain('Dimensions: 6 × 3 ft');
  expect(draft.searchParams.get('text')).toContain('Quantity: 2 signs');
  await expect(page.getByRole('status').filter({ hasText: 'Your draft' })).toContainText('Review and send it');
  const email = page.getByRole('link', { name: /Prefer email/ });
  expect(decodeURIComponent((await email.getAttribute('href'))!)).toContain('Dimensions: 6 × 3 ft');
});

test('wallpaper customer can browse interiors and discover the matching service', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Walls & interiors', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(4);
  await page.getByRole('button', { name: 'Wall art & interior branding', exact: true }).click();
  await expect(page.locator('#service-panel-interiors')).toContainText('wallpaper');
  await page.getByRole('link', { name: 'Discuss wall & interior graphics' }).click();
  await expect(page.locator('select[name="service"]')).toHaveValue('Wall art & interior branding');
});

test('mobile menu, location and contact methods are immediately usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Contact & directions' }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('link', { name: 'Get directions', exact: true })).toHaveAttribute('href', /destination_place_id=ChIJLRjMavGV3zgRPh1liHLwtjw/);
  await expect(page.locator('#contact a[href="tel:+923455130004"]')).toBeVisible();
  await expect(page.locator('#contact a[href="mailto:stickerzcorp@gmail.com"]')).toBeVisible();
});

test('materials support keyboard navigation, and the gallery expands and cycles', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Solid colours' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Printed patterns' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Marble effect' })).toBeFocused();
  await page.getByRole('button', { name: 'Explore the full gallery' }).click();
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Enlarge A world of colour.' }).click();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#photo-title')).toHaveText('Personality. In motion.');
  await expect(page.locator('.photo-dialog .inline-link')).toHaveAttribute('href', /google.com\/maps/);
});

test('keyboard inquiry actions move focus into the quote form, including from the photo viewer', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('link', { name: 'Discuss vehicle graphics', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('select[name="service"]')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('textarea[name="description"]')).toBeFocused();
  await page.locator('textarea[name="description"]').fill('Preserve my project details');
  await page.getByRole('button', { name: 'Enlarge A world of colour.' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('link', { name: 'Ask about this service' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('select[name="service"]')).toBeFocused();
  await expect(page.locator('select[name="service"]')).toHaveValue('Wall art & interior branding');
  await page.keyboard.press('Tab');
  await expect(page.locator('textarea[name="description"]')).toBeFocused();
  await expect(page.locator('textarea[name="description"]')).toHaveValue('Preserve my project details');
});

test('responsive layouts have no horizontal overflow and honor reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px overflow`).toBe(true);
  }
  expect(await page.locator('.hero-create').evaluate(element => getComputedStyle(element).animationName)).toBe('none');
});

test('every material photograph stays within its frame on desktop and mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const family of ['Solid colours', 'Printed patterns', 'Marble effect']) {
      await page.getByRole('tab', { name: family, exact: true }).click();
      const frame = await page.locator('.material-photo').boundingBox();
      const photo = await page.locator('.material-photo img').boundingBox();
      expect(photo!.height, `${family} at ${width}px`).toBeLessThanOrEqual(frame!.height + 1);
      expect(photo!.y + photo!.height).toBeLessThanOrEqual(frame!.y + frame!.height + 1);
    }
  }
});

test('all sample photos load, anchors resolve, and the page has no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Explore the full gallery' }).click();
  for (const image of await page.locator('img:visible').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  const missing = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!).filter(href => !document.querySelector(href)));
  expect(missing).toEqual([]);
  expect(errors).toEqual([]);
});

test('desktop and mobile pass automated WCAG accessibility checks, including open viewer', async ({ page }) => {
  await page.goto('/');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
  }
  await page.getByRole('button', { name: 'Enlarge A world of colour.' }).click();
  const viewer = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(viewer.violations).toEqual([]);
});
