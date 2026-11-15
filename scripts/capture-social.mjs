import { chromium } from '@playwright/test';

const base = process.env.TEST_BASE_URL || 'http://localhost:3001';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(base);
await page.setContent(`<style>
@font-face{font-family:Display;src:url('${base}/fonts/barlow-condensed-800.woff2')}@font-face{font-family:Body;src:url('${base}/fonts/manrope-latin-variable.woff2')}
*{box-sizing:border-box}body{margin:0;background:#f3f2ec;color:#22231f;padding:50px;font-family:Body,sans-serif;display:grid;grid-template-columns:690px 1fr;gap:30px;height:630px}h1{font:800 92px/.95 Display,sans-serif;margin:45px 0 26px;letter-spacing:-2px}h1 span{display:table;background:#f3ed38;font-size:126px;margin-top:8px;padding:0 10px 12px 6px}p{font-size:17px;line-height:1.8}.logo{width:200px}.photo{height:530px;width:100%;object-fit:cover}
</style><div><img class="logo" src="${base}/images/logo-480.webp"><h1>YOU ONLY THINK.<span>WE CREATE.</span></h1><p>Custom printing. Wraps. Signage.<br>I-10 Markaz, Islamabad.</p></div><img class="photo" src="${base}/images/cheezy-burger-and-shake-cutout-sign-800.webp">`);
await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); });
await page.screenshot({ path: 'public/images/og-stickers.jpg', type: 'jpeg', quality: 90 });
await browser.close();
