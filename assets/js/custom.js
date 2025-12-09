document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector(".php-email-form");
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const addressInput = form.querySelector('input[name="address"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  const ratingInputs = form.querySelectorAll('input[name="rating"]');
  const submitBtn = form.querySelector('button[type="submit"]');

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
    } else {
      clearError(nameInput);
      return true;
    }
  }

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required");
      return false;
    } else if (!regex.test(emailInput.value)) {
      showError(emailInput, "Invalid email");
      return false;
    } else {
      clearError(emailInput);
      return true;
    }
  }

  function validateAddress() {
    if (addressInput.value.trim().length < 5) {
      showError(addressInput, "Enter valid address");
      return false;
    } else {
      clearError(addressInput);
      return true;
    }
  }

  // ✅ PHONE MASK (+370 6xx xxxxx)
  phoneInput.addEventListener("input", function () {
    let value = phoneInput.value.replace(/\D/g, "");

    if (value.startsWith("370")) {
      value = value.slice(3);
    }

    if (value.length > 8) value = value.slice(0, 8);

    phoneInput.value = "+370 " + value.replace(/(\d{3})(\d{5})/, "$1 $2");

    if (value.length === 8) {
      clearError(phoneInput);
    } else {
      showError(phoneInput, "Invalid Lithuanian number");
    }
  });

  function validateRatings() {
    let checked = false;
    ratingInputs.forEach(r => {
      if (r.checked) checked = true;
    });
    return checked;
  }

  function checkFormValidity() {
    if (
      validateName() &&
      validateEmail() &&
      validateAddress() &&
      phoneInput.value.length >= 12 &&
      validateRatings()
    ) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  addressInput.addEventListener("input", validateAddress);
  phoneInput.addEventListener("input", checkFormValidity);
  ratingInputs.forEach(r => r.addEventListener("change", checkFormValidity));

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Form submitted successfully!");
    form.reset();
    submitBtn.disabled = true;
  });

});

