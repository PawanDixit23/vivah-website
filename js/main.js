/* ═══════════════════════════════════════════════
   VIVAH WEBSITE — Main JavaScript
   ═══════════════════════════════════════════════ */

'use strict';

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ─── MOBILE HAMBURGER ───
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ─── SMOOTH SCROLL REVEAL ───
const scrollRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        scrollRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
  scrollRevealObserver.observe(el);
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// ─── COUNTER ANIMATION ───
function animateCounter(el, start, end, duration, suffix = '') {
  const startTime = performance.now();
  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = current.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      if (text.includes('50K'))  animateCounter(el, 0, 50, 1400, 'K+');
      else if (text.includes('12K'))  animateCounter(el, 0, 12, 1200, 'K+');
      else if (text.includes('4.9'))  { setTimeout(() => { el.textContent = '4.9★'; }, 600); }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ─── VOUCH STAT COUNTERS ───
const vouchStats = document.querySelectorAll('.vouch-stat-num');
const vouchObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      if (text === '300%') animateCounter(el, 0, 300, 1400, '%');
      vouchObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
vouchStats.forEach(s => vouchObserver.observe(s));

// ─── PARALLAX GLOW ───
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (glow1) glow1.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
  if (glow2) glow2.style.transform = `translate(${-x * 20}px, ${-y * 15}px)`;
}, { passive: true });

// ─── FLOATING BADGES TILT ───
const phoneFame = document.querySelector('.phone-frame');
if (phoneFame) {
  phoneFame.closest('.hero-visual')?.addEventListener('mousemove', (e) => {
    const rect = phoneFame.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    phoneFame.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
  });
  phoneFame.closest('.hero-visual')?.addEventListener('mouseleave', () => {
    phoneFame.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    phoneFame.style.transition = 'transform 0.6s ease';
  });
}

// ─── FEATURE CARD MOUSE GRADIENT ───
document.querySelectorAll('.feature-card, .trust-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(180,130,38,0.06), var(--bg-card) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ─── ACTIVE NAV STYLE ───
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--gold-light) !important; }`;
document.head.appendChild(style);

console.log('🕉️ Vivah Website loaded successfully');
