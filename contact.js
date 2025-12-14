// Contact Page Script
document.addEventListener('DOMContentLoaded', function() {
  // Update cart count
  function updateCartCount() {
    const cart = localStorage.getItem('pepperjackCart');
    const cartItems = cart ? JSON.parse(cart) : [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
      cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }
  
  updateCartCount();

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = this.querySelectorAll('input, textarea');
      inputs.forEach(input => input.value = '');
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
