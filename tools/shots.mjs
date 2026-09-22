/**
 * Capturas de inspeção. Assenta o movimento antes de fotografar:
 * um elemento escondido por timing de animação vira "elemento faltando"
 * no review e depois vira uma correção errada.
 *
 *   node tools/shots.mjs [url]
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const URL = process.argv[2] ?? 'http://localhost:4321/';
const OUT = '.impeccable/review';
mkdirSync(OUT, { recursive: true });

const sizes = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, mobile: true },
  { name: 'user-800', width: 800, height: 720 },
  { name: 'w375', width: 375, height: 812, mobile: true },
  { name: 'w1920', width: 1920, height: 1080 },
];

const browser = await chromium.launch();

for (const s of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: 1,
    isMobile: !!s.mobile,
    hasTouch: !!s.mobile,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Passa a página inteira para acordar todo lazy-load e todo reveal.
  // `scroll-behavior: smooth` transforma cada scrollTo numa animação e o
  // laço não sai do lugar — desliga antes de percorrer.
  await page.evaluate(async () => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    // O Chromium headless não dispara `loading="lazy"` de forma confiável
    // sob scroll programático. Em browser real carrega; aqui, força.
    for (const i of document.images) i.loading = 'eager';
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 120)));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 60));
    document.documentElement.style.scrollBehavior = prev;
  });
  await page.waitForLoadState('networkidle');

  // Uma captura só é prova se estiver completa: espera toda imagem
  // lazy terminar, senão retângulos pretos viram "defeito de design".
  await page
    .waitForFunction(() => [...document.images].every((i) => i.complete), null, {
      timeout: 45000,
    })
    .catch(() => console.warn('  (aviso: alguma imagem não completou)'));

  // Deixa as transições de entrada assentarem.
  await page.waitForTimeout(1800);

  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: true });

  const report = await page.evaluate(() => {
    const d = document.documentElement;
    const rises = [...document.querySelectorAll('[data-rise]')];
    const unv = [...document.querySelectorAll('[data-unveil]')];
    const draws = [...document.querySelectorAll('[data-draw]')];
    const imgs = [...document.images];
    const overflow = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > d.clientWidth + 1.5 || r.left < -1.5);
      })
      .slice(0, 8)
      .map((el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`);
    return {
      scrollW: d.scrollWidth,
      clientW: d.clientWidth,
      hOverflow: d.scrollWidth > d.clientWidth + 1,
      rise: `${rises.filter((e) => e.classList.contains('is-lit')).length}/${rises.length}`,
      unveil: `${unv.filter((e) => e.classList.contains('is-lit')).length}/${unv.length}`,
      draw: `${draws.filter((e) => e.classList.contains('is-lit')).length}/${draws.length}`,
      brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      pendingImgs: imgs.filter((i) => !i.complete).length,
      docH: document.body.scrollHeight,
      culprits: overflow,
    };
  });

  console.log(s.name.padEnd(10), JSON.stringify(report));
  await ctx.close();
}

await browser.close();
