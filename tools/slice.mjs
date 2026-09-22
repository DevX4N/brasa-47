/** Fatia uma captura de página inteira em recortes legíveis para review. */
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { basename } from 'node:path';

const file = process.argv[2];
const slices = Number(process.argv[3] ?? 6);
const outDir = '.impeccable/review/crops';
mkdirSync(outDir, { recursive: true });

const b64 = readFileSync(file).toString('base64');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<img id="i" src="data:image/png;base64,${b64}">`);
const { w, h } = await page.evaluate(
  () => new Promise((res) => {
    const i = document.getElementById('i');
    const go = () => res({ w: i.naturalWidth, h: i.naturalHeight });
    i.complete ? go() : (i.onload = go);
  })
);

const name = basename(file, '.png');
const band = Math.ceil(h / slices);
for (let n = 0; n < slices; n++) {
  await page.setViewportSize({ width: w, height: Math.min(band, h - n * band) });
  await page.evaluate((y) => (document.getElementById('i').style.marginTop = `-${y}px`), n * band);
  await page.evaluate(() => (document.body.style.margin = '0'));
  await page.screenshot({ path: `${outDir}/${name}-${n}.png` });
}
console.log(`${name}: ${w}x${h} → ${slices} recortes`);
await browser.close();
