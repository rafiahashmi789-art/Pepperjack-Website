
document.addEventListener('DOMContentLoaded', function() {
  
 

  const announcementBtn = document.querySelector('.announcement_button');
  if (announcementBtn) {
    announcementBtn.addEventListener('click', function() {
      window.location.href = 'shop-all.html';
    });
  }

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'product.html';
    });
  });

  // Collection cards
  const collectionCards = document.querySelectorAll('.collection-card');
  collectionCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'shop-all.html';
    });
  });
});
