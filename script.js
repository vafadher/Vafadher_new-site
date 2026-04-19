/* VAFADHER — script.js v4 */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- ACTIVE NAV (homepage only) ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  if (sections.length === 0) return;
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

// ---- SMOOTH SCROLL (same-page anchor links) ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 70;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth'
      });
    }
  });
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ---- HERO IMMEDIATE REVEAL ----
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero [data-reveal], .page-hero[data-reveal]').forEach(el =>
      el.classList.add('visible')
    );
  }, 60);
});

// ---- HERO PARALLAX ----
const atm = document.querySelector('.hero-atmosphere');
if (atm) {
  window.addEventListener('scroll', () => {
    atm.style.transform = `translateY(${window.scrollY * 0.1}px)`;
  }, { passive: true });
}

// ---- MARQUEE — pause on hover ----
const marqueeTrack = document.querySelector('.marquee-track');
const marqueeWrap = document.querySelector('.marquee-wrap');
if (marqueeTrack && marqueeWrap) {
  marqueeWrap.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeWrap.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

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

// ---- FIELD NOTES ENTRIES — hover lift ----
document.querySelectorAll('.fn-entry').forEach(el => {
  el.style.transition = 'background 0.25s';
});
