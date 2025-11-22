// js/detail.js - Product Details JavaScript

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

const product = products.find(p => p.id === productId);

function renderProductDetail() {
  const detailContainer = document.getElementById('productDetail');
  
  if (!product) {
    detailContainer.innerHTML = '<p>Product not found</p>';
    return;
  }
  
  detailContainer.innerHTML = `
    <div class="detail-image-container">
      <img src="${product.image}" alt="${product.name}" class="detail-image">
    </div>
    <div class="detail-info">
      <h1>${product.name}</h1>
      <div class="detail-category">${product.category}</div>
      <div class="detail-price">₹${product.price.toLocaleString()}</div>
      <div class="detail-rating">${product.rating} Rating</div>
      <p class="detail-description">${product.description}</p>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="btn btn-secondary" onclick="buyNow(${product.id})">Buy Now</button>
      </div>
      <a href="products.html?category=${product.category}" class="back-link">Back to ${product.category}</a>
    </div>
  `;
}

// Add to cart function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  saveCart(cart);
  updateCartBadge();
  showNotification('Added to cart!');
}

// Buy Now function - REMOVES ONLY THIS PRODUCT FROM CART
function buyNow(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  
  cart = cart.filter(item => item.id !== productId);
  
  saveCart(cart);

  updateCartBadge();
  
  window.location.href = 'order.html';
}

// Initialize
renderProductDetail();
updateCartBadge();

// Cart modal functionality
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartBody = document.getElementById('cartBody');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

function openCartModal() {
  cartModal.classList.add('show');
  renderCart();
}

function closeCartModal() {
  cartModal.classList.remove('show');
}

function renderCart() {
  const cart = getCart();
  cartBody.innerHTML = '';
  
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
      </div>
    `;
    return;
  }
  
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
        <div class="cart-item-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
    cartBody.appendChild(cartItem);
  });
}

function updateQuantity(productId, change) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
  }
  
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function clearCart() {
  saveCart([]);
  updateCartBadge();
  renderCart();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  saveCart([]);
  
  window.location.href = 'order.html';
}

// Event listeners for cart
if (cartBtn) cartBtn.addEventListener('click', openCartModal);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartModal);
if (closeCart) closeCart.addEventListener('click', closeCartModal);
if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
