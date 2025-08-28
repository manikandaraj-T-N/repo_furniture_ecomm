// cart.js
// ✅ Get logged in user
const loggedUser = JSON.parse(localStorage.getItem("furniture_loggeduser"));
const cartKey = loggedUser ? `furniture_cart_${loggedUser.username}` : "furniture_cart_guest";

// Load cart for this user
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// Add product to cart
function addToCart(product) {
  if (!product) return;
  alert("Product added to cart!");

  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();

  // Close modal if open
  if (document.getElementById("product-modal")) {
    document.getElementById("product-modal").style.display = "none";
  }
}

// Save cart to *specific user*
function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

// Toggle cart sidebar
function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
}

// Update cart UI (same as before)
function updateCartUI() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    const hideDecrease = item.quantity === 1 ? 'style="visibility:hidden;"' : "";

    div.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.img}" alt="${item.name}" width="50" height="50" />
      </div>
      <div class="cart-item-info">
        <p><strong>${item.name}</strong></p>
        <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
        <div class="cart-actions">
          <button class="decrease" data-index="${index}" ${hideDecrease}>-</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
          <button class="remove" data-index="${index}">🗑️</button>
        </div>
      </div>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);

  // Increase
  document.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.getAttribute("data-index");
      cart[i].quantity += 1;
      saveCart();
      updateCartUI();
    })
  );

  // Decrease
  document.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.getAttribute("data-index");
      if (cart[i].quantity > 1) {
        cart[i].quantity -= 1;
      } else {
        cart.splice(i, 1);
      }
      saveCart();
      updateCartUI();
    })
  );

  // Remove
  document.querySelectorAll(".remove").forEach(btn =>
    btn.addEventListener("click", e => {
      const i = e.target.getAttribute("data-index");
      cart.splice(i, 1);
      saveCart();
      updateCartUI();
    })
  );
}

// Clear cart
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    saveCart();
    updateCartUI();
  }
}

// Init cart UI on load
window.addEventListener("load", updateCartUI);
