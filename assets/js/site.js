/* Fishman Law — site interactions: nav, scroll behavior, practice accordion,
   testimonials carousel, contact form validation, scroll reveal. */

(function () {
  'use strict';

  // ---- Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navBackdrop = document.querySelector('.nav-backdrop');
  if (navToggle && navLinks) {
    const setOpen = (open) => {
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navLinks.classList.toggle('open', open);
      if (navBackdrop) navBackdrop.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    navToggle.addEventListener('click', () => {
      setOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    if (navBackdrop) navBackdrop.addEventListener('click', () => setOpen(false));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // ---- Sticky nav scrolled state
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Practice accordion (homepage + practice page)
  const items = document.querySelectorAll('.practice-item');
  const cards = document.querySelectorAll('.practice-card[data-area]');
  if (items.length && cards.length) {
    const setActive = (key) => {
      items.forEach(it => it.classList.toggle('active', it.dataset.area === key));
      cards.forEach(c => c.style.display = c.dataset.area === key ? '' : 'none');
    };
    items.forEach(it => it.addEventListener('click', () => setActive(it.dataset.area)));
    setActive(items[0].dataset.area);
  }

  // ---- Testimonials carousel
  const carousel = document.querySelector('.tcarousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.tslide');
    const dots = document.querySelectorAll('.tdots button');
    let idx = 0;
    let timer;
    const go = (i) => {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('active', n === idx));
      dots.forEach((d, n) => d.classList.toggle('active', n === idx));
    };
    dots.forEach((d, n) => d.addEventListener('click', () => { go(n); reset(); }));
    const reset = () => {
      clearInterval(timer);
      timer = setInterval(() => go(idx + 1), 7000);
    };
    go(0); reset();
  }

  // ---- Contact form
  const form = document.querySelector('form.contact-form');
  if (form) {
    // Matter chips
    const chips = form.querySelectorAll('.chip');
    const matterInput = form.querySelector('input[name="matter"]');
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(o => o.classList.remove('selected'));
      c.classList.add('selected');
      if (matterInput) matterInput.value = c.dataset.matter;
    }));

    // Validation + submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const fields = form.querySelectorAll('.field[data-required]');
      fields.forEach(f => {
        const input = f.querySelector('input, textarea');
        const v = (input.value || '').trim();
        let bad = !v;
        if (!bad && f.dataset.type === 'email') bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
        f.classList.toggle('error', bad);
        if (bad) ok = false;
      });
      if (!ok) {
        const first = form.querySelector('.field.error input, .field.error textarea');
        if (first) first.focus();
        return;
      }
      const firstName = (form.querySelector('input[name="first"]').value || '').trim() || 'there';
      const success = document.querySelector('.success');
      const formWrap = document.querySelector('.form-wrap');
      if (success && formWrap) {
        formWrap.style.display = 'none';
        success.style.display = '';
        const span = success.querySelector('[data-name]');
        if (span) span.textContent = firstName;
      }
    });

    const resetBtn = document.querySelector('.success .btn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      const success = document.querySelector('.success');
      const formWrap = document.querySelector('.form-wrap');
      if (success && formWrap) {
        formWrap.style.display = '';
        success.style.display = 'none';
        form.reset();
        chips.forEach(c => c.classList.remove('selected'));
      }
    });
  }

  // ---- Scroll reveal
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }
})();
