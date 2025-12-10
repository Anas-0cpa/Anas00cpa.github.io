document.addEventListener("DOMContentLoaded", function () {

  // Select your contact form
  const form = document.querySelector(".php-email-form");

  // This is where submitted history will appear
  const resultsBox = document.getElementById("formResults");

  // When user clicks submit
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload

    // Get values from inputs
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const subject = form.querySelector('input[name="subject"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    // Show the history box
    resultsBox.style.display = "block";

    // Add new entry to history (OPTIONAL TASK ✅)
    resultsBox.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-top:10px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;

    // Success message
    alert("Form submitted successfully!");

    // Clear form after submit
    form.reset();
  });

});
