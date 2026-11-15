import { test, expect } from '@playwright/test';

test('button effects preserve names, react to pointers and reset for reduced motion', async ({ page }) => {
  await page.goto('/');
  const primary = page.getByRole('link', { name: 'Explore our work', exact: true });
  await expect(primary.locator('.button-fill')).toHaveCount(1);
  await primary.hover();
  await expect.poll(() => primary.locator('.button-fill').evaluate(el => getComputedStyle(el).clipPath)).toBe('inset(0px)');
  const quote = page.locator('.nav-quote');
  await expect(quote).toHaveAccessibleName('Request a quote');
  await expect(quote.locator('.rolling-label')).toHaveCount(1);
  await quote.focus();
  await expect.poll(() => quote.locator('.rolling-label-track').evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  const arrow = page.locator('.closing-arrow');
  await arrow.scrollIntoViewIfNeeded();
  const box = await arrow.boundingBox();
  await page.mouse.move(box!.x + box!.width * .8, box!.y + box!.height * .4);
  await expect.poll(() => arrow.evaluate(el => (el as HTMLElement).style.getPropertyValue('--magnet-x'))).not.toBe('');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => arrow.evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await expect(primary).toHaveAccessibleName('Explore our work');
});

test('service-strip wipes retain the inquiry destination and highlighted quote text responds to the pointer', async ({ page }) => {
  await page.goto('/');
  const strip = page.locator('.service-strip');
  for (const label of ['VEHICLE GRAPHICS', 'SIGNAGE', 'WALL ART', 'CUSTOM PRINTING']) {
    const link = strip.getByRole('link', { name: label, exact: true });
    await expect(link.locator('.button-fill')).toHaveCount(1);
    await link.hover();
    await expect.poll(() => link.locator('.button-fill').evaluate(el => getComputedStyle(el).clipPath)).toBe('inset(0px)');
  }
  await strip.getByRole('link', { name: 'SIGNAGE', exact: true }).click();
  await expect(page.locator('#quote-service')).toHaveValue('Commercial signage');
  const highlight = page.locator('#quote-title .ink-highlight');
  await highlight.scrollIntoViewIfNeeded();
  await expect(page.locator('#quote-title')).toHaveAttribute('data-revealed', 'true');
  await page.waitForTimeout(900);
  await highlight.hover();
  await expect.poll(() => highlight.evaluate(el => (el as HTMLElement).style.getPropertyValue('--ink-left'))).not.toBe('');
  await expect(page.locator('#quote-title')).toHaveAccessibleName('Let’s make your idea happen.');
});

test('offscreen headings wait for arrival and footer effects remain accessible with reduced motion', async ({ page }) => {
  await page.goto('/');
  const about = page.locator('#about-title');
  await expect(about).toHaveAttribute('data-motion-ready', 'true');
  await expect(about).not.toHaveAttribute('data-revealed', 'true');
  await about.scrollIntoViewIfNeeded();
  await expect(about).toHaveAttribute('data-revealed', 'true');
  await page.locator('#contact-title').scrollIntoViewIfNeeded();
  await expect(page.locator('#contact-title')).toHaveAttribute('data-revealed', 'true');
  await expect(page.locator('#contact a[href="tel:+923455130004"] .rolling-label')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#contact-title .ink-highlight-copy').first()).toHaveCSS('display', 'none');
  await expect(page.getByRole('link', { name: 'Get directions', exact: true })).toHaveAttribute('href', /google.com/);
});

test('plain headlines sweep text colour without painting a background or changing their names', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('#work-title');
  await title.scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute('data-revealed', 'true');
  await page.waitForTimeout(1000);
  const text = title.locator('.ink-text').first();
  await expect(text).toHaveCount(1);
  const copy = text.locator('.ink-text-copy');
  const rest = await copy.evaluate(el => getComputedStyle(el).clipPath);
  await text.hover();
  await expect.poll(() => copy.evaluate(el => getComputedStyle(el).clipPath)).not.toBe(rest);
  await expect(text).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(copy).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(title).toHaveAccessibleName('See what’s possible.');
  await page.mouse.move(0, 0);
  await expect.poll(() => copy.evaluate(el => getComputedStyle(el).clipPath)).toBe(rest);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(copy).toHaveCSS('display', 'none');
  await expect(page.locator('#quote-title .ink-highlight')).toHaveCount(1);
});
