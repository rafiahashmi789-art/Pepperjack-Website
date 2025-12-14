
document.addEventListener('DOMContentLoaded', function() {
  function getCart() {
    const cart = localStorage.getItem('pepperjackCart');
    return cart ? JSON.parse(cart) : [];
  }

  function saveCart(cart) {
    localStorage.setItem('pepperjackCart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
      cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }

  function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    saveCart(cart);
  }

  updateCartCount();

  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainProductImage');
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      mainImage.src = this.querySelector('img').src;
    });
  });

  const quantityInput = document.getElementById('quantityInput');
  const decreaseBtn = document.getElementById('decreaseQty');
  const increaseBtn = document.getElementById('increaseQty');
  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      if (value > 1) quantityInput.value = value - 1;
    });
  }
  if (increaseBtn) {
    increaseBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
  }

  const addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const quantity = parseInt(quantityInput.value);
      const product = {
        id: 'product-1',
        name: 'Bamboo Tumbler',
        price: 59.00,
        quantity: quantity,
        image: '../assets/home-4-gallery-7.png'
      };
      addToCart(product);
    });
  }

  const buyNowBtn = document.getElementById('buyNowBtn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      const quantity = parseInt(quantityInput.value);
      const product = {
        id: 'product-1',
        name: 'Bamboo Tumbler',
        price: 59.00,
        quantity: quantity,
        image: '../assets/home-4-gallery-7.png'
      };
      addToCart(product);
      window.location.href = 'cart.html';
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('.newsletter-input');
      emailInput.value = '';
    });
  }
});
