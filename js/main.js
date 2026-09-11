/* ═══════════════════════════════════════════════
   VIVAH WEBSITE — Main JavaScript (Knot.dating Style)
   ═══════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. NAVBAR SCROLL EFFECT ───
  const header = document.getElementById('site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ─── 2. MOBILE MENU TOGGLE ───
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
      });
    });
  }

  // ─── 3. PRESS RELEASES CAROUSEL ───
  const pressTrack = document.getElementById('press-track');
  const prevBtn = document.getElementById('press-prev');
  const nextBtn = document.getElementById('press-next');

  if (pressTrack && prevBtn && nextBtn) {
    const getCardWidth = () => {
      const card = pressTrack.querySelector('.press-card');
      return card ? card.offsetWidth + 28 : 340;
    };

    prevBtn.addEventListener('click', () => {
      pressTrack.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      pressTrack.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });
  }

  // ─── 4. CALLBACK REQUEST FORM & TOAST ───
  const callbackForm = document.getElementById('callback-form');
  const toast = document.getElementById('vivah-toast');

  if (callbackForm) {
    callbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('user-name');
      const phoneInput = document.getElementById('user-phone');

      if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        alert('Please fill in both name and mobile number.');
        return;
      }

      // Show toast
      if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
          toast.classList.remove('active');
        }, 4500);
      }

      // Reset form
      callbackForm.reset();
    });
  }

  // ─── 5. SMOOTH SCROLL FOR IN-PAGE ANCHORS ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
