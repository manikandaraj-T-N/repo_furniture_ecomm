
window.addEventListener("load", () => {
  const loggedUser = JSON.parse(localStorage.getItem("furniture_loggeduser"));
  const userSpan = document.getElementById("logged-user");
  const loginLink = document.querySelector(".login");
  const registerLink = document.querySelector(".register");

  if (loggedUser) {
    userSpan.textContent = `👤 ${loggedUser.username}`;
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const loggedUserSpan = document.getElementById("logged-user");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.querySelector(".login");
  const registerLink = document.querySelector(".register");

  // Get logged in user from localStorage
  const loggedUser = localStorage.getItem("furniture_loggeduser");

  if (loggedUser) {
    // If user is logged in → show username + logout, hide login/register
    loggedUserSpan.textContent = `Welcome, ${loggedUser}`;
    logoutBtn.style.display = "inline-block";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  } else {
    // If no user → show login/register, hide username + logout
    loggedUserSpan.textContent = "";
    logoutBtn.style.display = "none";
    loginLink.style.display = "inline-block";
    registerLink.style.display = "inline-block";
  }

  // Logout button functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("furniture_loggeduser"); // clear login session
      window.location.href = "home.html"; // redirect to home page
    });
  }
});

function checkoutpage(){
  window.location.href="checkout.html"
}
