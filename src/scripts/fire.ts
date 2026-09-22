/**
 * BRASA 47 — comportamento.
 *
 * Regra única do movimento: tudo obedece a uma lei do fogo.
 * Sobe (translateY), irradia (scaleX a partir do ponto quente),
 * esfria (o acento decai até o quase-preto no repouso).
 * Nada desliza de lado, nada pisca, nada gira.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ------------------------------------------------------------------
   1. Reveal — subir e irradiar ao entrar na tela
   ------------------------------------------------------------------ */
function revealOnScroll() {
  let pending = Array.from(
    document.querySelectorAll<HTMLElement>('[data-rise], [data-unveil], [data-draw]')
  );

  if (reduced.matches) {
    pending.forEach((el) => el.classList.add('is-lit'));
    return;
  }

  // Varredura por posição, não por IntersectionObserver: o observer perde
  // elementos em scroll rápido ou em salto de âncora, e a seção fica em
  // branco. Aqui, qualquer coisa que já passou da linha acende — sempre.
  const sweep = () => {
    const line = window.innerHeight * 0.94;
    const still: HTMLElement[] = [];
    for (const el of pending) {
      if (el.getBoundingClientRect().top < line) el.classList.add('is-lit');
      else still.push(el);
    }
    pending = still;
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };

  let frame = 0;
  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      sweep();
    });
  };

  sweep();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

/* ------------------------------------------------------------------
   2. Calor — a brasa acende onde o olho está e esfria no resto
   ------------------------------------------------------------------ */
function heatOnProximity() {
  if (reduced.matches || !window.matchMedia('(hover: hover)').matches) return;

  const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-cut]'));
  if (!rows.length) return;

  rows.forEach((row) => {
    const bar = row.querySelector<HTMLElement>('.grate');
    if (!bar) return;

    row.addEventListener('pointermove', (e) => {
      const box = row.getBoundingClientRect();
      const x = ((e.clientX - box.left) / box.width) * 100;
      bar.style.setProperty('--hot', `${x.toFixed(1)}%`);
      bar.style.setProperty('--heat', '1');
    });

    row.addEventListener('pointerleave', () => {
      bar.style.setProperty('--heat', '0');
    });
  });
}

/* ------------------------------------------------------------------
   3. Parallax — leve, só onde a profundidade existe de verdade
   ------------------------------------------------------------------ */
function parallax() {
  if (reduced.matches || !window.matchMedia('(hover: hover)').matches) return;

  const layers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-parallax], [data-hero-media]')
  ).map((el) => ({
    el,
    depth: Number(el.dataset.parallax ?? 0.1),
  }));

  if (!layers.length) return;

  let frame = 0;
  const tick = () => {
    frame = 0;
    const vh = window.innerHeight;
    for (const { el, depth } of layers) {
      const box = el.getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) continue;
      const progress = (box.top + box.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(progress * depth * 100).toFixed(2)}px, 0)`;
    }
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  tick();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

/* ------------------------------------------------------------------
   4. Header — encosta no conteúdo e ganha corpo
   ------------------------------------------------------------------ */
function stickyHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;height:72px;width:1px;pointer-events:none';
  document.body.prepend(sentinel);

  if (!('IntersectionObserver' in window)) return;

  new IntersectionObserver(
    ([entry]) => header.toggleAttribute('data-stuck', !entry.isIntersecting),
    { threshold: 0 }
  ).observe(sentinel);
}

/* ------------------------------------------------------------------
   5. Herói — a entrada orquestrada, o único momento autoral
   ------------------------------------------------------------------ */
function igniteHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.setAttribute('data-hero-ready', ''));
  });
}

/* ------------------------------------------------------------------
   6. Menu mobile — drawer com foco preso e Esc
   ------------------------------------------------------------------ */
function mobileMenu() {
  const drawer = document.querySelector<HTMLElement>('[data-drawer]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!drawer || !openBtn || !closeBtn) return;

  let lastFocus: HTMLElement | null = null;

  const focusables = () =>
    Array.from(
      drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    ).filter((el) => el.offsetParent !== null);

  const open = () => {
    lastFocus = document.activeElement as HTMLElement;
    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      drawer.setAttribute('data-open', '');
      openBtn.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    });
  };

  const close = () => {
    drawer.removeAttribute('data-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    const done = () => {
      drawer.hidden = true;
      drawer.removeEventListener('transitionend', done);
    };
    if (reduced.matches) done();
    else drawer.addEventListener('transitionend', done);
    lastFocus?.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  drawer
    .querySelectorAll('[data-menu-link]')
    .forEach((link) => link.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (drawer.hidden) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* ------------------------------------------------------------------
   7. Reserva — validação real, estados reais, sem backend
   ------------------------------------------------------------------ */
type Rule = { test: (v: string, form: HTMLFormElement) => boolean; message: string };

const rules: Record<string, Rule[]> = {
  nome: [
    { test: (v) => v.trim().length > 0, message: 'Informe o nome da reserva.' },
    {
      test: (v) => v.trim().length >= 2,
      message: 'O nome está curto demais — escreva ao menos duas letras.',
    },
  ],
  telefone: [
    { test: (v) => v.trim().length > 0, message: 'Precisamos de um telefone para confirmar.' },
    {
      test: (v) => (v.match(/\d/g) ?? []).length >= 10,
      message: 'Telefone incompleto. Inclua o DDD — ex.: (41) 99999-9999.',
    },
  ],
  email: [
    {
      test: (v) => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      message: 'Esse e-mail parece incompleto. Confira o trecho depois do @.',
    },
  ],
  data: [
    { test: (v) => v !== '', message: 'Escolha a data do jantar.' },
    {
      test: (v) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(`${v}T00:00:00`) >= today;
      },
      message: 'Essa data já passou. Escolha hoje ou um dia à frente.',
    },
    {
      test: (v) => new Date(`${v}T00:00:00`).getDay() !== 1,
      message: 'Segunda-feira a casa não abre. Atendemos de terça a domingo.',
    },
  ],
  hora: [{ test: (v) => v !== '', message: 'Escolha um horário entre 18:30 e 22:30.' }],
  pessoas: [{ test: (v) => v !== '', message: 'Quantas pessoas vão à mesa?' }],
};

function reservationForm() {
  const form = document.querySelector<HTMLFormElement>('[data-form]');
  const done = document.querySelector<HTMLElement>('[data-done]');
  const detail = document.querySelector<HTMLElement>('[data-done-detail]');
  const alertBox = document.querySelector<HTMLElement>('[data-form-alert]');
  const submit = document.querySelector<HTMLButtonElement>('[data-submit]');
  const label = document.querySelector<HTMLElement>('[data-submit-label]');
  const resetBtn = document.querySelector<HTMLButtonElement>('[data-reset]');
  if (!form || !done || !detail || !alertBox || !submit || !label) return;

  // A data mínima é hoje — calculada no cliente, para não envelhecer no build.
  const dateInput = form.querySelector<HTMLInputElement>('#f-data');
  if (dateInput) {
    const t = new Date();
    dateInput.min = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(
      t.getDate()
    ).padStart(2, '0')}`;
  }

  const fieldOf = (name: string) =>
    form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;

  const validate = (name: string, silent = false): boolean => {
    const el = fieldOf(name);
    const list = rules[name];
    if (!el || !list) return true;
    const err = document.getElementById(el.getAttribute('aria-describedby') ?? '');
    const failure = list.find((r) => !r.test(el.value, form));

    if (failure && !silent) {
      el.setAttribute('aria-invalid', 'true');
      if (err) {
        err.textContent = failure.message;
        err.hidden = false;
      }
    } else if (!failure) {
      el.removeAttribute('aria-invalid');
      if (err) {
        err.textContent = '';
        err.hidden = true;
      }
    }
    return !failure;
  };

  Object.keys(rules).forEach((name) => {
    const el = fieldOf(name);
    if (!el) return;
    // Só reclama depois que o campo perdeu o foco uma vez; depois disso,
    // corrige em tempo real enquanto a pessoa digita.
    el.addEventListener('blur', () => validate(name));
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validate(name);
    });
    el.addEventListener('change', () => validate(name));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.hidden = true;

    const names = Object.keys(rules);
    const bad = names.filter((n) => !validate(n));

    if (bad.length) {
      alertBox.textContent =
        bad.length === 1
          ? 'Falta um campo para concluir o pedido.'
          : `Faltam ${bad.length} campos para concluir o pedido.`;
      alertBox.hidden = false;
      fieldOf(bad[0])?.focus();
      return;
    }

    submit.disabled = true;
    submit.setAttribute('data-busy', '');
    label.textContent = 'Enviando…';

    await new Promise((r) => setTimeout(r, reduced.matches ? 120 : 850));

    const data = new FormData(form);
    const nome = String(data.get('nome') ?? '').trim().split(' ')[0];
    const dataStr = new Date(`${data.get('data')}T00:00:00`).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    });

    detail.innerHTML =
      `${nome}, guardamos o pedido para <strong>${data.get('pessoas')}</strong> ` +
      `em <strong>${dataStr}</strong>, às <strong>${data.get('hora')}</strong>.`;

    form.hidden = true;
    done.hidden = false;
    done.querySelector<HTMLElement>('.done__t')?.setAttribute('tabindex', '-1');
    done.querySelector<HTMLElement>('.done__t')?.focus();
  });

  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    done.hidden = true;
    submit.disabled = false;
    submit.removeAttribute('data-busy');
    label.textContent = 'Reservar mesa';
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    form.querySelectorAll<HTMLElement>('[data-err]').forEach((el) => {
      el.textContent = '';
      el.hidden = true;
    });
    fieldOf('nome')?.focus();
  });
}

/* ------------------------------------------------------------------ */

function boot() {
  revealOnScroll();
  heatOnProximity();
  parallax();
  stickyHeader();
  igniteHero();
  mobileMenu();
  reservationForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
