// contact.js (or you can place inside home.js)

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // simple email regex validation
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

      // remove existing message if any
      let formMsg = document.getElementById("formMsg");
      if (!formMsg) {
        formMsg = document.createElement("p");
        formMsg.id = "formMsg";
        contactForm.appendChild(formMsg);
      }

      if (!name || !email || !subject || !message) {
        formMsg.textContent = "⚠ Please fill in all fields.";
        formMsg.style.color = "red";
        return;
      }

      if (!email.match(emailPattern)) {
        formMsg.textContent = "⚠ Please enter a valid email address.";
        formMsg.style.color = "red";
        return;
      }

      // Success message
      formMsg.textContent = "✅ Message sent successfully!";
      formMsg.style.color = "green";

      // Reset form
      contactForm.reset();
    });
  }
});
