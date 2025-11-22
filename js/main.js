// js/main.js - Homepage JavaScript

// Render category cards
function renderCategories() {
  const categoryGrid = document.getElementById('categoryGrid');
  
  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];
  
  categoryGrid.innerHTML = '';
  
  categories.forEach(category => {
    const productsInCategory = products.filter(p => p.category === category);
    const categoryProduct = productsInCategory[0];
    
    const card = document.createElement('div');
    card.className = 'category-card';
    // Pass category as URL parameter
    card.onclick = () => window.location.href = `products.html?category=${encodeURIComponent(category)}`;
    
    card.innerHTML = `
      <img src="${categoryProduct.image}" alt="${category}" class="category-image">
      <div class="category-info">
        <div class="category-name">${category}</div>
        <div class="category-count">${productsInCategory.length} Products</div>
      </div>
    `;
    
    categoryGrid.appendChild(card);
  });
}

// Initialize homepage
renderCategories();
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
  
  // Clear cart after checkout
  saveCart([]);
  
  // Redirect to order page
  window.location.href = 'order.html';
}

// Event listeners for cart
if (cartBtn) cartBtn.addEventListener('click', openCartModal);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartModal);
if (closeCart) closeCart.addEventListener('click', closeCartModal);
if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
