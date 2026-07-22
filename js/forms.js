/* ============================================
   URBANFLOW WORKS — Form Submission Handler
   Sends all form data to Google Apps Script
   ============================================ */

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // ⚠️  PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW
  // ─────────────────────────────────────────────
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOEQA1mobHGzZLmxRD49lz1N5Z_f2yHcAprdKOZqDva0c694te8l850rv0oPP-WPIy/exec';
  // ─────────────────────────────────────────────

  /**
   * Core submission function.
   * Posts JSON data to the Apps Script endpoint.
   * @param {Object} data - Form data to send
   * @returns {Promise<Object>}
   */
  async function submitForm(data) {
    // Add page URL for tracking
    data.page_url = window.location.href;

    // Add honeypot value (should be empty for real users)
    const honeypotEl = document.querySelector('input[name="_honeypot"]');
    if (honeypotEl) {
      data._honeypot = honeypotEl.value;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    });

    // no-cors returns opaque response, so we just trust it went through
    return { status: 'ok' };
  }

  /**
   * Helper: Animate a button through states
   * @param {HTMLElement} btn
   * @param {string} loadingText
   * @param {string} successText
   * @param {string} originalHTML
   * @param {Function} [onReset] - Called when button resets
   */
  function animateButton(btn, loadingText, successText, originalHTML, onReset) {
    btn.disabled = true;
    btn.innerHTML = loadingText;
    btn.style.opacity = '0.8';

    setTimeout(function () {
      btn.style.opacity = '1';
      btn.classList.add('success');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;vertical-align:middle;margin-right:8px;"><polyline points="20 6 9 17 4 12"></polyline></svg>' + successText;

      setTimeout(function () {
        btn.classList.remove('success');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        if (onReset) onReset();
      }, 3000);
    }, 1200);
  }


  // ═══════════════════════════════════════════
  // CONTACT PAGE — Discovery Form
  // ═══════════════════════════════════════════
  var discoveryForm = document.getElementById('discoveryForm');
  if (discoveryForm) {
    discoveryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('discoveryBtn');
      var originalHTML = btn.innerHTML;

      // Get selected project type
      var projectType = 'Website';
      var checkedRadio = discoveryForm.querySelector('input[name="project_type"]:checked');
      if (checkedRadio) {
        var label = discoveryForm.querySelector('label[for="' + checkedRadio.id + '"]');
        projectType = label ? label.textContent.trim() : checkedRadio.id;
      }

      var data = {
        form_type: 'Project Request',
        name: document.getElementById('disc-name').value.trim(),
        email: document.getElementById('disc-email').value.trim(),
        message: document.getElementById('disc-details').value.trim(),
        project_type: projectType,
      };

      submitForm(data);
      animateButton(btn, 'Submitting...', 'Request Received!', originalHTML, function () {
        discoveryForm.reset();
      });
    });
  }


  // ═══════════════════════════════════════════
  // CONTACT PAGE — Calendar Booking
  // ═══════════════════════════════════════════
  var confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      var originalHTML = confirmBtn.innerHTML;

      var selectedDayEl = document.querySelector('.cal-day.active');
      var selectedSlotEl = document.querySelector('.time-slot.selected');

      var data = {
        form_type: 'Call Booking',
        booking_date: selectedDayEl ? selectedDayEl.textContent.trim() : 'Unknown',
        booking_time: selectedSlotEl ? selectedSlotEl.textContent.trim() : 'Unknown',
      };

      submitForm(data);
      animateButton(confirmBtn, 'Booking...', 'Call Booked! ✓ Check Email', originalHTML);
    });
  }


  // ═══════════════════════════════════════════
  // INDEX PAGE — Audit Lead Magnet
  // ═══════════════════════════════════════════
  var auditForm = document.getElementById('auditForm');
  if (auditForm) {
    auditForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('auditBtn');
      var originalHTML = btn.innerHTML;

      var data = {
        form_type: 'Free Audit Request',
        website_url: document.getElementById('audit-url').value.trim(),
        email: document.getElementById('audit-email').value.trim(),
      };

      submitForm(data);
      animateButton(btn, 'Analyzing...', 'Success! Check your email soon.', originalHTML, function () {
        auditForm.reset();
      });
    });
  }


  // ═══════════════════════════════════════════
  // CHAT WIDGET (Index + Services pages)
  // ═══════════════════════════════════════════
  var chatForm = document.getElementById('chatForm');
  if (chatForm) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('chatBtn');
      var originalHTML = btn.innerHTML;

      var data = {
        form_type: 'Chat Message',
        email: document.getElementById('chat-email').value.trim(),
        message: document.getElementById('chat-message').value.trim(),
      };

      submitForm(data);
      animateButton(btn, 'Sending...', 'Message Sent! ✓', originalHTML, function () {
        chatForm.reset();
      });
    });
  }


  // ═══════════════════════════════════════════
  // SERVICES PAGE — Cost Calculator Proposal
  // ═══════════════════════════════════════════
  var proposalForm = document.getElementById('proposalForm');
  if (proposalForm) {
    proposalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = proposalForm.querySelector('button[type="submit"]');
      var originalHTML = btn.innerHTML;

      // Grab calculator values
      var platformSelect = document.getElementById('calcPlatform');
      var platform = platformSelect ? platformSelect.options[platformSelect.selectedIndex].text : '';
      var totalEl = document.getElementById('calcTotal');
      var total = totalEl ? totalEl.textContent.trim() : '';

      var data = {
        form_type: 'Proposal Request',
        email: document.getElementById('proposal-email').value.trim(),
        platform: platform,
        estimated_total: total,
        accounts: document.getElementById('calcAccounts') ? document.getElementById('calcAccounts').value : '0',
        ecommerce: document.getElementById('calcEcom') ? document.getElementById('calcEcom').value : '0',
      };

      submitForm(data);
      animateButton(btn, 'Sending Proposal...', 'Proposal Sent! ✓', originalHTML, function () {
        proposalForm.reset();
      });
    });
  }


  // ═══════════════════════════════════════════
  // GENERATOR PAGE — Lead Capture
  // ═══════════════════════════════════════════
  var generatorForm = document.getElementById('generatorForm');
  if (generatorForm) {
    // We listen for submit but DON'T prevent the redirect
    // Instead, we fire the data submission alongside the redirect
    var originalHandler = null;

    generatorForm.addEventListener('submit', function () {
      // The page's own script handles the redirect
      // We just silently capture the lead data
      var catSelect = document.getElementById('category');

      var data = {
        form_type: 'Demo Generated',
        name: document.getElementById('bname').value.trim(),
        email: document.getElementById('email').value.trim(),
        business_category: catSelect ? catSelect.options[catSelect.selectedIndex].text : '',
      };

      submitForm(data);
      // Don't prevent default — let the existing redirect logic run
    });
  }

})();
