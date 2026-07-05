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

  /* ── Contact form ── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = contactForm.querySelector('#contact-name');
      var email   = contactForm.querySelector('#contact-email');
      var subject = contactForm.querySelector('#contact-subject');
      var message = contactForm.querySelector('#contact-message');

      // Basic validation
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Simple email validation
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        showToast('Please enter a valid email address.');
        return;
      }

      // Build mailto link
      var subjectText = subject ? subject.value : 'Website Contact';
      var body = 'Name: ' + name.value + '\n\n' + message.value;
      var mailtoLink = 'mailto:contact@urbanflowworks.com'
        + '?subject=' + encodeURIComponent(subjectText)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailtoLink;
      showToast('Opening your email client...');
      contactForm.reset();
    });
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
