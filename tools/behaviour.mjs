/** Testa comportamento real: menu mobile, validação e estados da reserva. */
import { chromium } from 'playwright';

const URL = process.argv[2] ?? 'http://localhost:4330/';
const browser = await chromium.launch();
const out = [];
const ok = (n, v) => out.push(`${v ? 'OK  ' : 'FALHA'} ${n}`);

// --- menu mobile ---------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'load' });
  await p.click('[data-menu-open]');
  await p.waitForTimeout(700);
  ok('drawer abre', await p.isVisible('[data-drawer]'));
  ok('aria-expanded=true', (await p.getAttribute('[data-menu-open]', 'aria-expanded')) === 'true');
  ok('foco vai para fechar', await p.evaluate(() => document.activeElement?.hasAttribute('data-menu-close')));
  await p.keyboard.press('Escape');
  await p.waitForTimeout(800);
  ok('Esc fecha', !(await p.isVisible('[data-drawer]')));
  ok('scroll do body liberado', (await p.evaluate(() => document.body.style.overflow)) === '');
  await ctx.close();
}

// --- formulário ----------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'load' });

  // submit vazio → erros nomeando o problema
  await p.click('[data-submit]');
  await p.waitForTimeout(300);
  const errs = await p.$$eval('[data-err]:not([hidden])', (n) => n.map((e) => e.textContent.trim()));
  ok(`5 erros no submit vazio (${errs.length})`, errs.length === 5);
  ok('erro de campo vazio pede o dado', errs.some((e) => /telefone/i.test(e)));
  ok('alerta agregado visível', await p.isVisible('[data-form-alert]'));
  ok('foco no primeiro campo inválido', await p.evaluate(() => document.activeElement?.id === 'f-nome'));

  // telefone curto
  await p.fill('#f-tel', '4199');
  await p.locator('#f-tel').blur();
  await p.waitForTimeout(200);
  ok('telefone curto rejeitado', (await p.getAttribute('#f-tel', 'aria-invalid')) === 'true');
  await p.fill('#f-tel', '(41) 99999-9999');
  await p.waitForTimeout(200);
  ok('erro some ao corrigir digitando', (await p.getAttribute('#f-tel', 'aria-invalid')) === null);

  // data de segunda-feira → casa fechada
  const monday = await p.evaluate(() => {
    const d = new Date();
    d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
    return d.toISOString().slice(0, 10);
  });
  await p.fill('#f-data', monday);
  await p.locator('#f-data').blur();
  await p.waitForTimeout(250);
  const msg = await p.textContent('#e-data');
  ok(`segunda recusada ("${(msg || '').slice(0, 28)}…")`, /[Ss]egunda/.test(msg || ''));

  // caminho feliz
  const soon = await p.evaluate(() => {
    const d = new Date();
    do { d.setDate(d.getDate() + 1); } while (d.getDay() === 1);
    return d.toISOString().slice(0, 10);
  });
  await p.fill('#f-nome', 'Marina');
  await p.fill('#f-data', soon);
  await p.selectOption('#f-hora', '20:00');
  await p.selectOption('#f-pessoas', '2');
  await p.click('[data-submit]');
  await p.waitForTimeout(1500);
  ok('estado de sucesso aparece', await p.isVisible('[data-done]'));
  ok('formulário some', !(await p.isVisible('form[data-form]')));
  const detail = await p.textContent('[data-done-detail]');
  ok(`resumo com os dados ("${(detail || '').slice(0, 34)}…")`, /Marina/.test(detail || '') && /20:00/.test(detail || ''));
  ok('sucesso admite ser demo', /[Dd]emonstração/.test(await p.textContent('[data-done]')));
  ok('foco vai para o sucesso', await p.evaluate(() => document.activeElement?.classList.contains('done__t')));

  await p.click('[data-reset]');
  await p.waitForTimeout(300);
  ok('reset devolve o formulário limpo', (await p.isVisible('form[data-form]')) && (await p.inputValue('#f-nome')) === '');

  await ctx.close();
}

// --- teclado --------------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'load' });
  await p.waitForTimeout(400);
  await p.keyboard.press('Tab');
  ok('skip link é a primeira parada do Tab', await p.evaluate(() => document.activeElement?.classList.contains('skip')));
  await p.waitForTimeout(400);
  ok('skip link fica visível ao focar', await p.evaluate(() => {
    const el = document.querySelector('.skip');
    return el.getBoundingClientRect().top >= 0;
  }));
  await p.keyboard.press('Enter');
  await p.waitForTimeout(400);
  ok('skip link leva ao conteúdo', await p.evaluate(() => location.hash === '#conteudo'));
  await ctx.close();
}

// --- reduced motion -------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'load' });
  await p.waitForTimeout(900);
  const hidden = await p.evaluate(() =>
    [...document.querySelectorAll('[data-rise],[data-unveil],[data-draw]')].filter(
      (e) => !e.classList.contains('is-lit')
    ).length
  );
  ok(`nada escondido com reduced-motion (${hidden} pendentes)`, hidden === 0);
  await ctx.close();
}

console.log(out.join('\n'));
await browser.close();
process.exit(out.some((l) => l.startsWith('FALHA')) ? 1 : 0);
