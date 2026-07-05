/* ============================================
   URBANFLOW WORKS — Scroll Animations
   Intersection Observer for reveal-on-scroll.
   ============================================ */

(function () {
  'use strict';

  // Respect user motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Make everything visible immediately
    document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  /* ── Intersection Observer for .reveal elements ── */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  /* ── Stagger observer for parent containers ── */
  const staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach(function (child) {
          child.classList.add('is-visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

  /* ── Initialize ── */
  function init() {
    // Observe individual reveal elements
    document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale').forEach(function (el) {
      observer.observe(el);
    });

    // Observe stagger containers
    document.querySelectorAll('.stagger').forEach(function (el) {
      staggerObserver.observe(el);
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
