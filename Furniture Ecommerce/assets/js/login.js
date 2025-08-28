// login js
function togglePassword() {
  const pwd = document.getElementById('password');
  pwd.type = pwd.type === 'password' ? 'text' : 'password';
}

function login(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageDiv = document.getElementById('login-message');

  // Hardcoded users
  const validUsers = [
    { username: "manikandan", email: "manikandanjava@vtscoders.com", password: "1234" },
    { username: "praveena", email: "praveenas@vetriitsystems.com", password: "1234" }
  ];

  // LocalStorage users
  const storedUsers = JSON.parse(localStorage.getItem("furniture_users")) || [];

  // Combine
  const allUsers = [...validUsers, ...storedUsers];

  const foundUser = allUsers.find(user =>
    (user.username === username || user.email === username) && user.password === password
  );

  if (foundUser) {
    // Save logged in user
    localStorage.setItem("furniture_loggeduser", JSON.stringify(foundUser));

    messageDiv.textContent = "Login successful! Redirecting...";
    messageDiv.className = "success";
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500);
  } else {
    messageDiv.textContent = "Invalid username/email or password.";
    messageDiv.className = "error";
  }
}

// Pre-fill username if redirected from register
window.addEventListener("load", () => {
  const tempUser = localStorage.getItem("furniture_tempUser");
  if (tempUser) {
    document.getElementById("username").value = tempUser;
    localStorage.removeItem("furniture_tempUser");
  }
});
