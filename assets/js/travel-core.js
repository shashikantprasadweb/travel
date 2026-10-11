/**
 * Shashikant Prasad Platform — Travel Spoke Interactive Engine
 * travel-core.js
 * Lightbox modal carousel, keyboard navigation, and Atlas category filter engine.
 */

(function () {
  'use strict';

  let activeGalleryItems = [];
  let currentLightboxIndex = 0;

  // Initialize Destination Gallery Items
  window.initTravelGallery = function (items) {
    if (Array.isArray(items)) {
      activeGalleryItems = items;
    }
  };

  // Open Lightbox by index in activeGalleryItems
  window.openLightboxByIndex = function (index) {
    if (!activeGalleryItems || activeGalleryItems.length === 0) return;
    if (index < 0 || index >= activeGalleryItems.length) return;
    
    currentLightboxIndex = index;
    const item = activeGalleryItems[index];
    const modal = document.getElementById('imageLightbox');
    const modalImg = document.getElementById('lightboxImg');
    const modalCaption = document.getElementById('lightboxCaption');
    const modalCounter = document.getElementById('lightboxCounter');
    
    if (modalImg) modalImg.src = item.src;
    if (modalCaption) modalCaption.textContent = item.caption;
    if (modalCounter) modalCounter.textContent = `${index + 1} of ${activeGalleryItems.length}`;
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Open Lightbox by item ID
  window.openLightboxByName = function (id) {
    if (!activeGalleryItems) return;
    const idx = activeGalleryItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      window.openLightboxByIndex(idx);
    }
  };

  // Generic Open Lightbox by source and caption
  window.openLightbox = function (imgSrc, captionText) {
    if (!activeGalleryItems || activeGalleryItems.length === 0) {
      const modal = document.getElementById('imageLightbox');
      const modalImg = document.getElementById('lightboxImg');
      const modalCaption = document.getElementById('lightboxCaption');
      const modalCounter = document.getElementById('lightboxCounter');
      if (modalImg) modalImg.src = imgSrc;
      if (modalCaption) modalCaption.textContent = captionText || '';
      if (modalCounter) modalCounter.textContent = '';
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    const idx = activeGalleryItems.findIndex(item => item.src === imgSrc);
    if (idx !== -1) {
      window.openLightboxByIndex(idx);
    } else {
      const modal = document.getElementById('imageLightbox');
      const modalImg = document.getElementById('lightboxImg');
      const modalCaption = document.getElementById('lightboxCaption');
      const modalCounter = document.getElementById('lightboxCounter');
      if (modalImg) modalImg.src = imgSrc;
      if (modalCaption) modalCaption.textContent = captionText || '';
      if (modalCounter) modalCounter.textContent = '';
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  };

  // Close Lightbox
  window.closeLightbox = function (e) {
    if (e && e.target && (e.target.tagName === 'IMG' || e.target.classList.contains('lightbox-nav-btn'))) {
      return;
    }
    const modal = document.getElementById('imageLightbox');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Next Lightbox Image
  window.nextLightboxImage = function (e) {
    if (e) e.stopPropagation();
    if (!activeGalleryItems || activeGalleryItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryItems.length;
    window.openLightboxByIndex(currentLightboxIndex);
  };

  // Previous Lightbox Image
  window.prevLightboxImage = function (e) {
    if (e) e.stopPropagation();
    if (!activeGalleryItems || activeGalleryItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    window.openLightboxByIndex(currentLightboxIndex);
  };

  // Atlas Category Filter
  window.filterAtlas = function (category) {
    const buttons = document.querySelectorAll('.atlas-filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(buttons).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(category));
    if (activeBtn) activeBtn.classList.add('active');

    const cards = document.querySelectorAll('.atlas-card');
    cards.forEach(card => {
      if (category === 'all') {
        card.style.display = 'flex';
      } else {
        const cardCat = card.getAttribute('data-category');
        card.style.display = (cardCat === category) ? 'flex' : 'none';
      }
    });
  };

  // Keyboard Event Listener
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageLightbox');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowRight') window.nextLightboxImage();
    if (e.key === 'ArrowLeft') window.prevLightboxImage();
  });
})();
