// // ✅ Get logged in user
// const loggedUser = JSON.parse(localStorage.getItem("furniture_loggeduser"));
// const cartKey = loggedUser ? `furniture_cart_${loggedUser.username}` : "furniture_cart_guest";

// // ✅ Checkout data key (unique per user/guest)
// const CHECKOUT_KEY = loggedUser
//   ? `furni_checkout_${loggedUser.username}`
//   : "furni_checkout_guest";

// // ✅ Load this user's cart
// const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// // DOM elements
// const orderItems = document.getElementById("orderItems");
// const subtotalEl = document.querySelector(".summary p:nth-of-type(1) span");
// const totalEl = document.querySelector(".summary p:nth-of-type(3) span");

// // ============================
// // CART SUMMARY
// // ============================
// function loadOrderSummary() {
//   orderItems.innerHTML = "";
//   let subtotal = 0;

//   if (cart.length === 0) {
//     orderItems.innerHTML = `<li class="empty">🛒 Your cart is empty.</li>`;
//     subtotalEl.textContent = "₹0";
//     totalEl.textContent = "₹0";
//     return;
//   }

//   cart.forEach(item => {
//     const itemTotal = item.price * item.quantity;
//     subtotal += itemTotal;

//     const li = document.createElement("li");
//     li.className = "order-item";
//     li.innerHTML = `
//       <div class="order-item-info">
//         <img src="${item.img}" alt="${item.name}" />
//         <div>
//           <p class="item-name">${item.name}</p>
//           <p class="item-qty">Qty: ${item.quantity} × ₹${item.price.toLocaleString()}</p>
//         </div>
//       </div>
//       <span class="item-total">₹${itemTotal.toLocaleString()}</span>
//     `;
//     orderItems.appendChild(li);
//   });

//   subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
//   totalEl.textContent = `₹${subtotal.toLocaleString()}`;
// }

// // ============================
// // FORM SAVE / RESTORE
// // ============================
// function saveCheckoutData() {
//   const data = {
//     name: document.getElementById("furni_name").value,
//     email: document.getElementById("furni_email").value,
//     phone: document.getElementById("furni_phone").value,
//     address: document.getElementById("furni_address").value,
//     city: document.getElementById("furni_city").value,
//     state: document.getElementById("furni_state").value,
//     zip: document.getElementById("furni_zip").value,
//   };
//   localStorage.setItem(CHECKOUT_KEY, JSON.stringify(data));
// }

// function loadCheckoutData() {
//   const savedData = localStorage.getItem(CHECKOUT_KEY);
//   if (savedData) {
//     const data = JSON.parse(savedData);
//     document.getElementById("furni_name").value = data.name || "";
//     document.getElementById("furni_email").value = data.email || "";
//     document.getElementById("furni_phone").value = data.phone || "";
//     document.getElementById("furni_address").value = data.address || "";
//     document.getElementById("furni_city").value = data.city || "";
//     document.getElementById("furni_state").value = data.state || "";
//     document.getElementById("furni_zip").value = data.zip || "";
//   }
// }

// function clearCheckoutData() {
//   localStorage.removeItem(CHECKOUT_KEY);
//   // document.getElementById("checkoutForm").reset();
// }

// // Auto-save on typing
// document.querySelectorAll("#checkoutForm input, #checkoutForm textarea").forEach(field => {
//   field.addEventListener("input", saveCheckoutData);
// });

// // ============================
// // PLACE ORDER
// // ============================
// document.getElementById("checkoutForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   if (cart.length === 0) {
//     alert("Your cart is empty. Please add items before checkout.");
//     return;
//   }

//   // 👉 Random success/failure
//   const isSuccess = Math.random() > 0.5;

//   if (isSuccess) {
//     // ✅ Success → clear cart + checkout form data
//     localStorage.removeItem(cartKey);
//     clearCheckoutData();
//     document.getElementById("checkoutForm").reset(); // reset only on success
//     window.location.href = "ordersuccess.html";
//   } else {
//     // ❌ Failure → make sure form data is saved
//     saveCheckoutData();
//     window.location.href = "order-failed.html";
//   }
// });

// // ============================
// // INIT
// // ============================
// window.addEventListener("DOMContentLoaded", () => {
//   loadOrderSummary();
//   loadCheckoutData();


//   // ✅ extra safety: re-bind input events here
//   document.querySelectorAll("#checkoutForm input, #checkoutForm textarea")
//     .forEach(field => {
//       field.removeEventListener("input", saveCheckoutData); // avoid duplicates
//       field.addEventListener("input", saveCheckoutData);
//     });
// });










// ===============================================

// ✅ Get logged in user
const loggedUser = JSON.parse(localStorage.getItem("furniture_loggeduser"));
const cartKey = loggedUser ? `furniture_cart_${loggedUser.username}` : "furniture_cart_guest";

// ✅ Checkout data key (unique per user/guest)
const CHECKOUT_KEY = loggedUser
  ? `furni_checkout_${loggedUser.username}`
  : "furni_checkout_guest";

// ✅ Load this user's cart
const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// DOM elements
const orderItems = document.getElementById("orderItems");
const subtotalEl = document.getElementById("subtotalAmt");
const totalEl = document.getElementById("totalAmt");

// ============================
// CART SUMMARY
// ============================
function loadOrderSummary() {
  orderItems.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    orderItems.innerHTML = `<li class="empty">🛒 Your cart is empty.</li>`;
    subtotalEl.textContent = "₹0";
    totalEl.textContent = "₹0";
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const li = document.createElement("li");
    li.className = "order-item";
    li.innerHTML = `
      <div class="order-item-info">
        <img src="${item.img}" alt="${item.name}" />
        <div>
          <p class="item-name">${item.name}</p>
          <p class="item-qty">Qty: ${item.quantity} × ₹${item.price.toLocaleString()}</p>
        </div>
      </div>
      <span class="item-total">₹${itemTotal.toLocaleString()}</span>
    `;
    orderItems.appendChild(li);
  });

  subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
  totalEl.textContent = `₹${subtotal.toLocaleString()}`;
}

// ============================
// FORM SAVE / RESTORE
// ============================
function saveCheckoutData() {
  const data = {
    fullname: document.getElementById("furni_fullname").value,
    email: document.getElementById("furni_email").value,
    phone: document.getElementById("furni_phone").value,
    address: document.getElementById("furni_address").value,
    city: document.getElementById("furni_city").value,
    state: document.getElementById("furni_state").value,
    zip: document.getElementById("furni_zip").value,
  };
  localStorage.setItem(CHECKOUT_KEY, JSON.stringify(data));
}

function loadCheckoutData() {
  const savedData = localStorage.getItem(CHECKOUT_KEY);
  if (savedData) {
    const data = JSON.parse(savedData);
    document.getElementById("furni_fullname").value = data.fullname || "";
    document.getElementById("furni_email").value = data.email || "";
    document.getElementById("furni_phone").value = data.phone || "";
    document.getElementById("furni_address").value = data.address || "";
    document.getElementById("furni_city").value = data.city || "";
    document.getElementById("furni_state").value = data.state || "";
    document.getElementById("furni_zip").value = data.zip || "";
  }
}

function clearCheckoutData() {
  localStorage.removeItem(CHECKOUT_KEY);
}

// ============================
// AUTO-SAVE with Timeout (debounce)
// ============================
let saveTimer;
function handleInputSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveCheckoutData, 200); // save after 500ms of inactivity
}

// ============================
// PLACE ORDER
// ============================
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checkout.");
    return;
  }

  // 👉 Random success/failure
  const isSuccess = Math.random() > 0.3;

  if (isSuccess) {
    // ✅ Success → clear cart + checkout form data
    localStorage.removeItem(cartKey);
    clearCheckoutData();
    document.getElementById("checkoutForm").reset(); // reset only on success
    window.location.href = "ordersuccess.html";
  } else {
    // ❌ Failure → keep form data intact
    saveCheckoutData();
    window.location.href = "order-failed.html";
  }
});

// ============================
// INIT
// ============================
window.addEventListener("DOMContentLoaded", () => {
  loadOrderSummary();
  loadCheckoutData();

  // ✅ bind input events with debounce (only once here)
  document.querySelectorAll("#checkoutForm input, #checkoutForm textarea")
    .forEach(field => {
      field.addEventListener("input", handleInputSave);
    });
});
