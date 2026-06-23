/* =============================================
   PULSEFEED — Interactions & Animations
   ============================================= */

(function () {
  'use strict';

  /* ── Scroll-based fade-up animations ── */
  function initScrollAnimations() {
    const els = document.querySelectorAll('.js-fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay);
        observer.unobserve(el);
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    els.forEach((el, i) => {
      // Stagger items within the same parent container
      if (!el.dataset.delay) {
        const siblings = Array.from(el.parentElement.querySelectorAll('.js-fade-up'));
        const idx = siblings.indexOf(el);
        el.dataset.delay = idx * 80;
      }
      observer.observe(el);
    });
  }

  /* ── Nav: hide on scroll down, show on scroll up ── */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;

        // Glassmorphism when scrolled
        if (y > 20) {
          nav.classList.add('is-scrolled');
        } else {
          nav.classList.remove('is-scrolled');
        }

        // Hide/show on direction
        if (y > lastY && y > 120) {
          nav.classList.add('is-hidden');
        } else {
          nav.classList.remove('is-hidden');
        }

        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── Mobile Menu ── */
  function initMobileMenu() {
    const burger = document.querySelector('.nav-burger');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.querySelector('.mobile-close');
    if (!burger || !menu) return;

    function openMenu() {
      menu.hidden = false;
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
      // Animate burger to X
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    }

    function closeMenu() {
      menu.hidden = true;
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }

    burger.addEventListener('click', () => {
      menu.hidden ? openMenu() : closeMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close on link click
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) closeMenu();
    });
  }

  /* ── FAQ Accordion ── */
  function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      // Remove hidden attribute initially so CSS transition works
      answer.hidden = false;
      answer.style.maxHeight = '0';
      answer.style.overflow = 'hidden';
      answer.style.transition = 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all others
        items.forEach((other) => {
          const otherBtn = other.querySelector('.faq-question');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherBtn !== btn && otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = '0';
            otherAnswer.classList.remove('is-open');
          }
        });

        if (isOpen) {
          btn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = '0';
          answer.classList.remove('is-open');
        } else {
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.classList.add('is-open');
        }
      });
    });
  }

  /* ── Smooth anchor scrolling ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── Number counter animation ── */
  function initCounters() {
    // Not used in current HTML but available for future use
  }

  /* ── Floating cards subtle mouse parallax ── */
  function initParallax() {
    const cards = document.querySelectorAll('.float-card');
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mx = 0, my = 0;
    let tx = 0, ty = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function tick() {
      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      cards.forEach((card, i) => {
        const depth = (i % 2 === 0) ? 1 : -1;
        const ox = tx * 8 * depth;
        const oy = ty * 6 * depth;
        const rot = parseFloat(getComputedStyle(card).getPropertyValue('--rot') || '0');
        card.style.transform = `rotate(${rot}deg) translateY(${oy}px) translateX(${ox}px)`;
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  /* ── Hero elements enter animation ── */
  function initHeroEntrance() {
    const heroEls = document.querySelectorAll('.hero .js-fade-up');
    if (!heroEls.length) return;

    // Trigger immediately with stagger
    heroEls.forEach((el) => {
      const delay = parseInt(el.dataset.delay || 0, 10) + 200;
      setTimeout(() => {
        el.classList.add('is-visible');
      }, delay);
    });
  }

  /* ── Init ── */
  function init() {
    initNav();
    initMobileMenu();
    initFaq();
    initSmoothScroll();
    initHeroEntrance();
    initScrollAnimations();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
