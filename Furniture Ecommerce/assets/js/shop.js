// shop.js

const products = [
  { id: 1, name: "Modern Sofa", price: 25000, img: "./assets/images/sofa1.jpg", description: "A stylish modern sofa for your living room." },
  { id: 2, name: "King Size Bed", price: 40000, img: "./assets/images/shop/kingsizebed.jpg", description: "Comfortable king size bed with premium finish." },
  { id: 3, name: "Wooden Chair", price: 5000, img: "./assets/images/chair1.jpg", description: "Strong and durable wooden chair." },
  { id: 4, name: "Dining Table", price: 18000, img: "./assets/images/shop/diningtable.jpg", description: "Elegant dining table set for your family." },
  { id: 5, name: "Office Chair", price: 7000, img: "./assets/images/shop/officechair.jpg", description: "Ergonomic office chair with comfort support." },
  { id: 6, name: "Wardrobe", price: 22000, img: "./assets/images/shop/wardrobe.jpg", description: "Spacious wardrobe with modern design." },
];

// Pagination settings
const productsPerPage = 4;
let currentPage = 1;
let filteredProducts = [...products];

// Render Products
function renderProducts(page = 1) {
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const displayProducts = filteredProducts.slice(start, end);

  const grid = document.getElementById("productGrid");
  grid.innerHTML = displayProducts.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price.toLocaleString()}</p>
        <button onclick="event.stopPropagation(); addProductToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");

  renderPagination();
}

// Render Pagination
function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pagination = document.getElementById("pagination");

  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<a href="#" onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderProducts(page);
}

// Search
document.getElementById("searchBar").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
  currentPage = 1;
  renderProducts();
});

// Sort
document.getElementById("sortSelect").addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "priceLow") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (value === "priceHigh") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts = [...products];
  }
  renderProducts();
});

// Modal
function openModal(id) {
  const product = products.find(p => p.id === id);
  document.getElementById("modal-image").src = product.img;
  document.getElementById("modal-title").innerText = product.name;
  document.getElementById("modal-description").innerText = product.description;
  document.getElementById("modal-price").innerText = `₹${product.price.toLocaleString()}`;

  document.getElementById("modal-addcart").onclick = () => addToCart(product);

  document.getElementById("product-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("product-modal").style.display = "none";
}

// Add to Cart (connects to cart.js)
function addProductToCart(id) {
  const product = products.find(p => p.id === id);
  addToCart(product);
}

// Init
renderProducts();
