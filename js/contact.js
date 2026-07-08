// ==========================================================
// UrbanFlow Works - Contact Form
// Google Forms Integration
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) return;

  const submitButton = form.querySelector("button[type='submit']");
  const originalButtonText = submitButton.innerHTML;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ------------------------------------------------------
    // Get Values
    // ------------------------------------------------------

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const app = document.getElementById("contact-app").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value.trim();

    // ------------------------------------------------------
    // Validation
    // ------------------------------------------------------

    if (!name || !email || !app || !subject || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // ------------------------------------------------------
    // Disable Button
    // ------------------------------------------------------

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";

    try {
      const formData = new FormData();

      formData.append("entry.1830259988", name);
      formData.append("entry.1943647196", email);
      formData.append("entry.1660075018", app);
      formData.append("entry.1487756902", subject);
      formData.append("entry.2097988909", message);

      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLScsNg3B17HOdvHfXl4VzmZvclitsc9EMV2Ht_f9uVEo0XoVAw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      // --------------------------------------------------
      // Success
      // --------------------------------------------------

      form.reset();

      alert(
        "Thank you! Your message has been sent successfully.\n\nWe'll get back to you as soon as possible."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Sorry! Something went wrong while sending your message.\nPlease try again."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
});