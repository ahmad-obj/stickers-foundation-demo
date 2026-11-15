import { test, expect } from '@playwright/test';

test('hero contact sheet explores authentic services and carries the chosen service into inquiry', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Show vehicle graphics', exact: true }).click();
  await expect(page.locator('.hero-photo-sheet img')).toHaveAttribute('alt', /scooter/i);
  await expect(page.getByRole('button', { name: 'Show vehicle graphics', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Show walls & interiors', exact: true }).click();
  await expect(page.locator('.hero-photo-sheet img')).toHaveAttribute('alt', /world map/i);
  await page.locator('.hero-image figcaption a').click();
  await expect(page.locator('#quote-service')).toHaveValue('Wall art & interior branding');
});

test('rapid portfolio category changes settle correctly without transition errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('.filters').evaluate(element => {
    const buttons = element.querySelectorAll('button');
    buttons[1].click(); buttons[3].click(); buttons[2].click();
  });
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card')).toContainText('Made to stand out.');
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});

test('mobile service selection reveals its image inside the matching explanation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Commercial signage', exact: true }).click();
  const panel = page.locator('#service-panel-signage');
  await expect(panel.locator('img')).toBeVisible();
  await expect(panel.locator('img')).toHaveAttribute('alt', /Cheezy/);
  await expect(panel).toContainText('sign dimensions');
  await expect.poll(async () => (await panel.locator('img').boundingBox())!.y).toBeGreaterThanOrEqual(72);
  await page.getByRole('button', { name: 'Wall art & interior branding', exact: true }).click();
  await expect(page.locator('#service-panel-interiors img')).toBeVisible();
  await expect(page.locator('#service-panel-interiors img')).toHaveAttribute('alt', /world map/i);
  await expect(panel).toHaveAttribute('aria-hidden', 'true');
});

test('single-photo categories disable cycling and viewer dismissal restores focus', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Vehicle graphics', exact: true }).click();
  const opener = page.getByRole('button', { name: 'Enlarge Personality. In motion.' });
  await opener.click();
  await expect(page.getByRole('button', { name: 'Previous photo' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Next photo' })).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('mobile viewer swipes horizontally and retains visible controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Enlarge A world of colour.' }).click();
  const image = page.locator('.photo-dialog img');
  await image.dispatchEvent('pointerdown', { pointerType: 'touch', pointerId: 1, clientX: 300, clientY: 250, isPrimary: true });
  await image.dispatchEvent('pointerup', { pointerType: 'touch', pointerId: 1, clientX: 80, clientY: 260, isPrimary: true });
  await expect(page.locator('#photo-title')).toHaveText('Personality. In motion.');
  await image.dispatchEvent('pointerdown', { pointerType: 'touch', pointerId: 2, clientX: 80, clientY: 250, isPrimary: true });
  await image.dispatchEvent('pointerup', { pointerType: 'touch', pointerId: 2, clientX: 300, clientY: 260, isPrimary: true });
  await expect(page.locator('#photo-title')).toHaveText('A world of colour.');
  await expect(page.getByRole('button', { name: 'Next photo' })).toBeVisible();
});

test('mobile menu can reverse its exit and returns Escape focus to the toggle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Services', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
});

test('filter fallback and rapid material reversals preserve the final selection', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(document, 'startViewTransition', { value: undefined, configurable: true }); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Signage', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('tab', { name: 'Printed patterns' }).click();
  await page.getByRole('tab', { name: 'Marble effect' }).click();
  await page.getByRole('tab', { name: 'Solid colours' }).click();
  await expect(page.locator('.material-copy h3')).toHaveText('One colour. A different feeling.');
  await expect(page.locator('.material-photo img')).toHaveAttribute('alt', /solid colour/i);
  await page.getByRole('link', { name: 'Ask about this material' }).click();
  await expect(page.locator('input[name="material"]')).toHaveValue('Solid colours');
});

test('hero ink sweep follows the pointer without lifting letters and resets for reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('YOU ONLY THINK. WE CREATE.');
  const ink = page.locator('.hero-ink-layer');
  await expect(ink).toHaveCount(1);
  await page.waitForTimeout(950);
  const rest = await ink.evaluate(element => getComputedStyle(element).clipPath);
  const line = await page.locator('.hero-create').boundingBox();
  const positions: number[] = [];
  for (const fraction of [.15, .8, .4]) {
    await page.mouse.move(line!.x + line!.width * fraction, line!.y + line!.height / 2);
    await expect(page.locator('.hero')).toHaveAttribute('data-pointer-active', '');
    await expect.poll(async () => ink.evaluate(element => getComputedStyle(element).clipPath)).not.toBe(rest);
    const edges = await page.locator('.hero-create').evaluate(element => ({ left: parseFloat((element as HTMLElement).style.getPropertyValue('--ink-left')), right: parseFloat((element as HTMLElement).style.getPropertyValue('--ink-right')) }));
    expect(edges.left).toBeGreaterThanOrEqual(0); expect(edges.right).toBeGreaterThanOrEqual(0);
    expect(edges.left + edges.right).toBeLessThan(line!.width);
    positions.push(edges.left);
    expect(await page.locator('.hero-letter').first().evaluate(element => getComputedStyle(element).transform)).toBe('none');
  }
  expect(positions[1]).toBeGreaterThan(positions[0]);
  await page.mouse.move(0, 0);
  await expect(page.locator('.hero')).not.toHaveAttribute('data-pointer-active');
  await expect.poll(async () => ink.evaluate(element => getComputedStyle(element).clipPath)).toBe(rest);
  await page.mouse.move(line!.x + line!.width / 2, line!.y + line!.height / 2);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.hero')).not.toHaveAttribute('data-pointer-active');
  expect(await ink.evaluate(element => getComputedStyle(element).display)).toBe('none');
  expect(await page.locator('.hero-print').evaluate(element => getComputedStyle(element).transform)).toBe('none');
});

test('hero photo reversals settle on the last manual selection without moving the layout', async ({ page }) => {
  await page.goto('/');
  const frame = await page.locator('.hero-image-inner').evaluate(element => ({ width: (element as HTMLElement).offsetWidth, height: (element as HTMLElement).offsetHeight }));
  await page.getByRole('button', { name: 'Show vehicle graphics', exact: true }).click();
  await page.getByRole('button', { name: 'Show walls & interiors', exact: true }).click();
  await page.getByRole('button', { name: 'Show signage', exact: true }).click();
  await expect(page.locator('.hero-photo-sheet img')).toHaveAttribute('alt', /Cheezy/);
  const after = await page.locator('.hero-image-inner').evaluate(element => ({ width: (element as HTMLElement).offsetWidth, height: (element as HTMLElement).offsetHeight }));
  expect(after!.height).toBe(frame!.height);
  expect(after!.width).toBe(frame!.width);
});

test('filter reversal to the committed category cancels an in-flight filter', async ({ page }) => {
  await page.goto('/');
  await page.locator('.filters').evaluate(element => {
    const buttons = element.querySelectorAll('button');
    buttons[1].click(); buttons[0].click();
  });
  await expect(page.getByRole('button', { name: 'All work', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.project-card')).toHaveCount(4);
});

test('header quote action dismisses the mobile menu before entering the inquiry', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.locator('.nav-quote').click();
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(async () => (await page.locator('#mobile-nav').boundingBox())!.height).toBe(0);
  // Let the native smooth scroll settle; transient bounds can cross the target.
  await page.waitForTimeout(1100);
  expect((await page.locator('#quote').boundingBox())!.y).toBeGreaterThanOrEqual(72);
  await expect(page.locator('#quote-title')).toBeInViewport({ ratio: 1 });
});

test('hero proximity geometry follows the lettering after scrolling within the hero', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.waitForTimeout(950);
  let line = await page.locator('.hero-create').boundingBox();
  await page.mouse.move(line!.x + line!.width / 2, line!.y + line!.height / 2);
  await page.evaluate(() => scrollBy({ top: 140, behavior: 'instant' }));
  await page.waitForTimeout(550);
  line = await page.locator('.hero-create').boundingBox();
  await page.mouse.move(line!.x + line!.width / 2, line!.y + line!.height / 2);
  await expect.poll(async () => page.locator('.hero-create').evaluate(element => {
    const style = (element as HTMLElement).style;
    return element.getBoundingClientRect().width - parseFloat(style.getPropertyValue('--ink-left')) - parseFloat(style.getPropertyValue('--ink-right'));
  })).toBeGreaterThan(300);
});

test('gallery transitions allow real pointer input to interrupt the current animation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Vehicle graphics', exact: true }).click();
  await page.waitForTimeout(30);
  const all = await page.getByRole('button', { name: 'All work', exact: true }).boundingBox();
  await page.mouse.click(all!.x + all!.width / 2, all!.y + all!.height / 2);
  await expect(page.locator('.project-card')).toHaveCount(4);
});
