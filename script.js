/* VAFADHER v3 — script.js */

// ---- NAV SCROLL STATE ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateNav();
}, { passive: true });

// ---- ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    const h = l.getAttribute('href');
    if ((h === '#' && !current) || h === '#' + current) l.classList.add('active');
  });
}

// ---- MOBILE NAV ----
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
toggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    }
  });
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ---- HERO IMMEDIATE REVEAL ----
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('visible'));
  }, 80);
});

// ---- SUBTLE HERO PARALLAX ----
const atmosphere = document.querySelector('.hero-atmosphere');
window.addEventListener('scroll', () => {
  if (atmosphere) atmosphere.style.transform = `translateY(${window.scrollY * 0.12}px)`;
}, { passive: true });

// ---- CHART BAR ANIMATION ----
const chartBars = document.querySelectorAll('.chart-bar');
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      chartBars.forEach((bar, i) => {
        bar.style.transition = `height 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`;
        const targetH = bar.style.getPropertyValue('--h');
        bar.style.height = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { bar.style.height = targetH; });
        });
      });
      chartObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const consoleFrame = document.querySelector('.console-frame');
if (consoleFrame) chartObserver.observe(consoleFrame);

// ---- FORM ----
const form = document.getElementById('discForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sent — we\'ll be in touch.';
    btn.style.opacity = '0.6';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = 'Find the Friction →';
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      form.reset();
    }, 4000);
  });
}
