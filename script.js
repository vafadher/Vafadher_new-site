/* VAFADHER v5 — script.js */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
  if (!sections.length) return;
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    const href = l.getAttribute('href');
    if (href && href.startsWith('#')) {
      l.classList.toggle('active', href === '#' + current);
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---- MOBILE NAV ----
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
  document.querySelectorAll('.mob-link').forEach(l =>
    l.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 68;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth'
      });
    }
  });
});

// ---- SCROLL REVEAL (slide + fade) ----
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ---- HERO + PAGE HERO IMMEDIATE REVEAL ----
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero [data-reveal], .page-hero[data-reveal]')
      .forEach(el => el.classList.add('visible'));
  }, 60);
});

// ---- HERO ATMOSPHERE PARALLAX ----
const atm = document.querySelector('.hero-atmosphere');
if (atm) {
  window.addEventListener('scroll', () => {
    atm.style.transform = `translateY(${window.scrollY * 0.1}px)`;
  }, { passive: true });
}

// ---- HOVER GLOW CURSOR TRACKING ----
// Updates CSS custom props on mouse move for the glow to follow cursor
document.querySelectorAll('.hover-glow').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', x + '%');
    el.style.setProperty('--mouse-y', y + '%');
  });
});

// ---- FORM SUBMIT ----
const form = document.getElementById('discForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sent — we\'ll be in touch.';
    btn.style.opacity = '0.6';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      form.reset();
    }, 4000);
  });
}
