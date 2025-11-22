// js/products.js

let allProducts = products;
let filteredProducts = products;

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');

// DOM Elements
const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const sortBy = document.getElementById('sortBy');
const categoryFilter = document.getElementById('categoryFilter');
const ratingFilter = document.getElementById('ratingFilter');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const filterToggleBtn = document.getElementById('filterToggleBtn');
const filterPanel = document.getElementById('filterPanel');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.querySelector('.page-subtitle');

// Category descriptions for dynamic header
const categoryDescriptions = {
  '': {
    title: 'Discover Our Collection',
    subtitle: 'Find products you\'ll love'
  },
  'all categories': {
    title: 'Discover Our Collection',
    subtitle: 'Find products you\'ll love'
  },
  'electronics': {
    title: 'Electronics',
    subtitle: 'Cutting-edge tech and gadgets'
  },
  'fashion': {
    title: 'Fashion',
    subtitle: 'Style that fits your personality'
  },
  'home & living': {
    title: 'Home & Living',
    subtitle: 'Transform your living space'
  },
  'accessories': {
    title: 'Accessories',
    subtitle: 'Complete your look with perfect accents'
  }
};

// Update page header based on category
function updatePageHeader(category) {
  const categoryKey = category ? category.toLowerCase().trim() : '';
  const description = categoryDescriptions[categoryKey] || categoryDescriptions[''];
  
  if (pageTitle) {
    pageTitle.textContent = description.title;
    pageTitle.style.animation = 'none';
    setTimeout(() => {
      pageTitle.style.animation = 'fadeInUp 0.6s ease';
    }, 10);
  }
  
  if (pageSubtitle) {
    pageSubtitle.textContent = description.subtitle;
    pageSubtitle.style.animation = 'none';
    setTimeout(() => {
      pageSubtitle.style.animation = 'fadeInUp 0.6s ease 0.1s both';
    }, 10);
  }
}

// Populate category filter
function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  
  // Set initial category from URL parameter
  if (categoryParam) {
    categoryFilter.value = categoryParam;
    // Update header immediately when arriving from category click
    updatePageHeader(categoryParam);
  } else {
    updatePageHeader('');
  }
}

// Filter products (WITHOUT updating header unless from URL)
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedRating = parseFloat(ratingFilter.value) || 0;
  
  filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                         product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesRating = product.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesRating;
  });
  
  sortProducts();
  renderProducts();
}

// Sort products
function sortProducts() {
  const sortValue = sortBy.value;
  
  switch(sortValue) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      filteredProducts = [...allProducts].filter(product => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedRating = parseFloat(ratingFilter.value) || 0;
        
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesRating = product.rating >= selectedRating;
        
        return matchesSearch && matchesCategory && matchesRating;
      });
  }
}

// Render products
function renderProducts() {
  productGrid.innerHTML = '';
  
  if (filteredProducts.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  
  noResults.style.display = 'none';
  
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => window.location.href = `details.html?id=${product.id}`;
    
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-price">₹${product.price.toLocaleString()}</div>
      <div class="product-rating">${product.rating} Rating</div>
      <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
        Add to Cart
      </button>
    `;
    
    productGrid.appendChild(card);
  });
}

// Toggle filter panel
filterToggleBtn.addEventListener('click', () => {
  filterPanel.classList.toggle('show');
  filterToggleBtn.classList.toggle('active');
});

// Event listeners
searchInput.addEventListener('input', filterProducts);

sortBy.addEventListener('change', () => {
  sortProducts();
  renderProducts();
});

// Apply filter button - ONLY UPDATE HEADER HERE
applyFilterBtn.addEventListener('click', () => {
  const selectedCategory = categoryFilter.value;
  
  // Update header ONLY when Apply Filters is clicked
  updatePageHeader(selectedCategory);
  
  // Then filter products
  filterProducts();
  
  // Close filter panel
  filterPanel.classList.remove('show');
  filterToggleBtn.classList.remove('active');
});

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

// Checkout function
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

// Initialize - IMPORTANT: This runs when page loads
populateCategories();  // This sets up the dropdown AND updates header from URL
filterProducts();      // This filters products based on URL parameter
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

// Event listeners for cart
if (cartBtn) cartBtn.addEventListener('click', openCartModal);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartModal);
if (closeCart) closeCart.addEventListener('click', closeCartModal);
if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
