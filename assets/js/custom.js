document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const addressInput = form.querySelector('input[name="address"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  // your 3 rating fields are numbers (Design / Usability / Content)
  const ratingInputs = form.querySelectorAll('input[type="number"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Start disabled
  submitBtn.disabled = true;

  function showError(input, message) {
    input.style.border = "2px solid red";
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error-text")) {
      const error = document.createElement("small");
      error.classList.add("error-text");
      error.style.color = "red";
      error.innerText = message;
      input.after(error);
    }
  }

  function clearError(input) {
    input.style.border = "2px solid green";
    if (input.nextElementSibling && input.nextElementSibling.classList.contains("error-text")) {
      input.nextElementSibling.remove();
    }
  }

  function validateName() {
    const regex = /^[A-Za-z\s]+$/;
    if (!nameInput.value.trim()) {
      showError(nameInput, "Name is required");
      return false;
    } else if (!regex.test(nameInput.value)) {
      showError(nameInput, "Only letters allowed");
      return false;
    }
    clearError(nameInput);
    return true;
  }

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required");
      return false;
    } else if (!regex.test(emailInput.value)) {
      showError(emailInput, "Invalid email");
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validateAddress() {
    if (addressInput.value.trim().length < 5) {
      showError(addressInput, "Enter a valid address");
      return false;
    }
    clearError(addressInput);
    return true;
  }

  // Phone mask + validation
  function validatePhone() {
    let value = phoneInput.value.replace(/\D/g, "");

    // remove 370 if user typed it
    if (value.startsWith("370")) {
      value = value.slice(3);
    }
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 0) {
      phoneInput.value = "+370 " + value.replace(/(\d{3})(\d{0,5})/, "$1 $2").trim();
    }

    if (value.length === 8) {
      clearError(phoneInput);
      return true;
    } else {
      showError(phoneInput, "Invalid Lithuanian phone number");
      return false;
    }
  }

  function validateRatings() {
    let ok = true;
    ratingInputs.forEach(input => {
      const v = Number(input.value);
      if (!v || v < 1 || v > 10) {
        showError(input, "Enter a number 1–10");
        ok = false;
      } else {
        clearError(input);
      }
    });
    return ok;
  }

  // Check whole form and enable/disable button
  function validateForm() {
    const isValid =
      validateName() &&
      validateEmail() &&
      validateAddress() &&
      validatePhone() &&
      validateRatings();

    submitBtn.disabled = !isValid;
    return isValid;
  }

  // Real-time validation
  nameInput.addEventListener("input", validateForm);
  emailInput.addEventListener("input", validateForm);
  addressInput.addEventListener("input", validateForm);
  phoneInput.addEventListener("input", validateForm);
  ratingInputs.forEach(input => input.addEventListener("input", validateForm));

  // Submit handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    alert("Form submitted successfully!");
    form.reset();
    submitBtn.disabled = true;
  });
});
