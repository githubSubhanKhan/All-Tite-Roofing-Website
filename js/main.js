/* All-Tite Roofing — landing page interactions */
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  /* ---------- Header state + mobile call bar ---------- */
  const header = $('.site-header');
  const callbar = $('.callbar');
  const hero = $('.hero');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    if (callbar && hero) callbar.classList.toggle('is-visible', y > hero.offsetHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('.menu-btn');
  const nav = $('#nav');
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Project carousel buttons ---------- */
  const track = $('#projTrack');
  $$('.proj-nav .round-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = $('.proj', track);
      const step = card ? card.getBoundingClientRect().width + 18 : 320;
      track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox');
  if (lb && typeof lb.showModal === 'function') {
    const lbImg = $('img', lb);
    const lbCap = $('.lb-cap', lb);
    $$('.proj-open').forEach(btn => {
      btn.addEventListener('click', () => {
        const img = $('img', btn);
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = btn.closest('figure').querySelector('figcaption').textContent.trim();
        lb.showModal();
      });
    });
    $('.lb-close', lb).addEventListener('click', () => lb.close());
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  }

  /* ---------- Service links preselect the form ---------- */
  $$('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      const input = $(`input[name="property"][value="${link.dataset.service}"]`);
      if (input) input.checked = true;
    });
  });

  /* ---------- Multi-step estimate form ---------- */
  const form = $('#estForm');
  if (!form) return;
  const steps = $$('.fstep', form);
  const nextBtn = $('#nextBtn');
  const backBtn = $('#backBtn');
  const bar = $('#progressBar');
  const count = $('#stepCount');
  let current = 0;

  const showError = (key, show) => {
    const el = $(`.field-error[data-for="${key}"]`, form);
    if (el) el.classList.toggle('show', show);
  };

  const validate = (i) => {
    if (i === 0) {
      const ok = !!$('input[name="property"]:checked', form);
      showError('property', !ok);
      return ok;
    }
    if (i === 1) {
      const ok = !!$('input[name="need"]:checked', form);
      showError('need', !ok);
      return ok;
    }
    if (i === 2) {
      let ok = true;
      ['name', 'phone', 'email', 'address'].forEach(n => {
        const input = form.elements[n];
        let valid = input.value.trim().length > 1;
        if (n === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        if (n === 'phone') valid = input.value.replace(/\D/g, '').length >= 10;
        input.setAttribute('aria-invalid', String(!valid));
        if (!valid) ok = false;
      });
      showError('contact', !ok);
      if (!ok) $('[aria-invalid="true"]', form)?.focus();
      return ok;
    }
    return true;
  };

  const render = () => {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === current));
    backBtn.hidden = current === 0;
    nextBtn.textContent = current === steps.length - 1 ? 'Send request' : 'Continue';
    bar.style.width = `${((current + 1) / steps.length) * 100}%`;
    count.textContent = `Step ${current + 1} of ${steps.length}`;
  };

  // auto-advance on the single-choice first step for a quicker feel
  $$('input[name="property"]', form).forEach(r => r.addEventListener('change', () => {
    showError('property', false);
    if (current === 0) setTimeout(() => { current = 1; render(); }, 220);
  }));
  $$('input[name="need"]', form).forEach(r => r.addEventListener('change', () => showError('need', false)));

  nextBtn.addEventListener('click', () => {
    if (!validate(current)) return;
    if (current < steps.length - 1) {
      current++;
      render();
      $('input, textarea', steps[current])?.focus({ preventScroll: true });
      return;
    }
    submit();
  });
  backBtn.addEventListener('click', () => { current = Math.max(0, current - 1); render(); });
  form.addEventListener('submit', e => { e.preventDefault(); nextBtn.click(); });

  const submit = () => {
    const data = Object.fromEntries(new FormData(form).entries());
    // TODO (production): POST `data` to the backend / form service, e.g.
    // fetch('https://formspree.io/f/XXXX', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
    console.info('Estimate request', data);
    steps.forEach(s => s.classList.remove('is-active'));
    $('#formNav').hidden = true;
    count.textContent = 'Done';
    bar.style.width = '100%';
    const done = $('#formDone');
    done.hidden = false;
    done.focus();
  };

  render();

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
