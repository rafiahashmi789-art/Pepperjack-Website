// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get cart from localStorage
  function getCart() {
    const cart = localStorage.getItem('pepperjackCart');
    return cart ? JSON.parse(cart) : [];
  }

  // Save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem('pepperjackCart', JSON.stringify(cart));
    updateCartCount();
  }

  // Update cart count in header
  function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
      cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }

  // Render cart items
  function renderCart() {
    const cart = getCart();
    const cartItemsEl = document.getElementById('cartItems');
    const emptyCartEl = document.getElementById('emptyCart');

    if (cart.length === 0) {
      cartItemsEl.style.display = 'none';
      emptyCartEl.classList.add('show');
      updateSummary(0, 0, 0);
      return;
    }

    cartItemsEl.style.display = 'flex';
    emptyCartEl.classList.remove('show');

    cartItemsEl.innerHTML = cart.map((item, index) => `
      <div class="cart-item" data-index="${index}">
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h3 class="item-name">${item.name}</h3>
          <p class="item-price">$${item.price.toFixed(2)}</p>
          <div class="item-quantity">
            <span class="qty-label">Qty:</span>
            <div class="qty-controls">
              <button class="qty-btn qty-decrease" data-index="${index}">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn qty-increase" data-index="${index}">+</button>
            </div>
          </div>
        </div>
        <div class="item-actions">
          <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="btn-remove" data-index="${index}">Remove</button>
        </div>
      </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 10 : 0;
    const tax = subtotal * 0.08; // 8% tax
    updateSummary(subtotal, shipping, tax);

    // Add event listeners
    attachCartEventListeners();
  }

  // Update summary
  function updateSummary(subtotal, shipping, tax) {
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = subtotal > 0 ? `$${shipping.toFixed(2)}` : 'Free';
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }

  // Attach event listeners to cart items
  function attachCartEventListeners() {
    // Increase quantity
    document.querySelectorAll('.qty-increase').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const cart = getCart();
        if (cart[index].quantity < 10) {
          cart[index].quantity++;
          saveCart(cart);
          renderCart();
        }
      });
    });

    // Decrease quantity
    document.querySelectorAll('.qty-decrease').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const cart = getCart();
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
          saveCart(cart);
          renderCart();
        }
      });
    });

    // Remove item
    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
      });
    });
  }

  // Checkout button
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    const cart = getCart();
    if (cart.length === 0) {
      return;
    }
    // Proceed to checkout
    window.location.href = 'index.html';
  });

  // Newsletter form
  document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
  });

  // Announcement button
  document.querySelector('.announcement_button')?.addEventListener('click', () => {
    window.location.href = 'shop-all.html';
  });

  // Initialize cart
  updateCartCount();
  renderCart();
});
