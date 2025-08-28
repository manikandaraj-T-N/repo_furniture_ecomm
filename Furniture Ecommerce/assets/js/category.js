const categories = [
  {
    name: "Chair",
    products: [
      {
        id: "chair1",
        name: "Elegant Chair",
        img: "assets/images/chair1.jpg",
        price: 199,
        quantity: 1,
      },
      {
        id: "chair2",
        name: "Classic Armchair",
        img: "assets/images/chair2.jpg",
        price: 299,
        quantity: 1,
      },
    ],
  },
  {
    name: "Table",
    products: [
      {
        id: "table1",
        name: "Wooden Table",
        img: "assets/images/table1.jpg",
        price: 499,
        quantity: 1,
      },
      {
        id: "table2",
        name: "Dining Table Set",
        img: "assets/images/table2.jpg",
        price: 899,
        quantity: 1,
      },
    ],
  },
  {
    name: "Sofa",
    products: [
      {
        id: "sofa1",
        name: "Comfort Sofa",
        img: "assets/images/sofa1.jpg",
        price: 799,
        quantity: 1,
      },
    ],
  },
  // Add more categories here
];


const productSections = document.getElementById("product-sections");

categories.forEach(category => {
  const section = document.createElement("section");
  section.innerHTML = `
    <h2>${category.name}</h2>
    <div class="product-list">
      ${category.products.map(product => `
        <div class="product-card">
          <img src="${product.img}" alt="${product.name}" onclick="openModal('${product.id}', '${category.name}')">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart('${product.id}', '${category.name}')">Add to Cart</button>
        </div>
      `).join("")}
    </div>
  `;
  productSections.appendChild(section);
});



function openModal(productId, categoryName) {
  const category = categories.find(cat => cat.name === categoryName);
  const product = category.products.find(p => p.id === productId);

  document.getElementById("modal-img").src = product.img;
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-price").textContent = product.price;
  document.getElementById("modal-add-btn").onclick = function () {
    addToCart(productId, categoryName);
    closeModal();
  };

  document.getElementById("product-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("product-modal").style.display = "none";
}



let cart = [];

function addToCart(productId, categoryName) {
  const category = categories.find(c => c.name === categoryName);
  const product = category.products.find(p => p.id === productId);

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product });
  }

  saveCart();
  updateCartUI();
}
