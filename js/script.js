/* ============================================
   URBANFLOW WORKS — Main Script
   Form handling, page-specific logic.
   ============================================ */

(function () {
  'use strict';

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Toast notification ── */
  function showToast(message, duration) {
    duration = duration || 3000;
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, duration);
  }


  /* ── Account deletion form ── */
  var deletionForm = document.getElementById('deletion-form');
  if (deletionForm) {
    deletionForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = deletionForm.querySelector('#deletion-email');
      var reason = deletionForm.querySelector('#deletion-reason');

      if (!email || !email.value.trim()) {
        showToast('Please enter your email address.');
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        showToast('Please enter a valid email address.');
        return;
      }

      var body = 'Account Deletion Request\n\n'
        + 'Email: ' + email.value + '\n'
        + (reason && reason.value ? 'Reason: ' + reason.value : '');

      var mailtoLink = 'mailto:privacy@urbanflowworks.com'
        + '?subject=' + encodeURIComponent('Account Deletion Request')
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailtoLink;
      showToast('Opening your email client...');
      deletionForm.reset();
    });
  }

  /* ── Current year in footer ── */
  var yearEls = document.querySelectorAll('.current-year');
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

})();
