// main.js
const Featuredproducts = [
  {
    name: "Wooden Chair",
    description: "Comfortable wooden chair perfect for dining or workspace.",
    price: 5000,
    img: "assets/images/chair1.jpg"
  },
  {
    name: "Dining Table",
    description: "Elegant wooden dining table with a premium finish.",
    price: 18000,
    img: "assets/images/shop/diningtable.jpg"
  },
  {
    name: "Modern Sofa",
    description: "Stylish and cozy sofa made for modern living rooms.",
    price: 25000,
    img: "assets/images/sofa1.jpg"
  }
];


// Modal functions
function openModal(index) {
  const product = Featuredproducts[index];
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-description").textContent = product.description;
  document.getElementById("modal-price").textContent = `$${product.price}`;
  document.getElementById("modal-image").src = product.img;


  // Fix: call addToCart with full product object
  document.getElementById("modal-addcart").onclick = () => addToCart(product);

  document.getElementById("product-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("product-modal").style.display = "none";
}
