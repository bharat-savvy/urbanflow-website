/* ============================================
   URBANFLOW WORKS — Navbar Controller
   Scroll detection, mobile menu, active links.
   ============================================ */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbar-toggle');
  const links  = document.getElementById('navbar-links');

  if (!navbar) return;

  /* ── Scroll → solid background ── */
  let lastScroll = 0;
  const SCROLL_THRESHOLD = 50;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load

  /* ── Mobile menu toggle ── */
  let previousFocus = null;

  if (toggle && links) {
    // Focusable elements inside the menu
    const focusableElements = links.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements.length ? focusableElements[0] : null;
    const lastFocusable = focusableElements.length ? focusableElements[focusableElements.length - 1] : null;

    function openMenu() {
      previousFocus = document.activeElement;
      links.classList.add('open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
    }

    function closeMenu() {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (previousFocus) {
        previousFocus.focus();
      }
    }

    toggle.addEventListener('click', function () {
      if (links.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking a link
    links.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Trap focus and Handle Escape
    document.addEventListener('keydown', function (e) {
      if (!links.classList.contains('open')) return;

      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable || document.activeElement === toggle) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            toggle.focus(); // loop back to toggle
          }
        }
      }
    });
  }

  /* ── Active link highlighting ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

})();
