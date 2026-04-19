/* ============================================================
   VAFADHER — script.js
   ============================================================ */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  updateActiveNav();
}, { passive: true });

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === '#' && (current === 'hero' || current === '')) {
      link.classList.add('active');
    } else if (href === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ---- MOBILE NAV TOGGLE ----
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});

// ---- SMOOTH SCROLL FOR CTAs ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ---- HERO PARALLAX (subtle depth) ----
const heroGlow = document.querySelector('.hero-glow');
const heroConsole = document.querySelector('.hero-console');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroGlow) {
    heroGlow.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
  if (heroConsole) {
    heroConsole.style.transform = `translateY(${scrollY * 0.06}px)`;
  }
}, { passive: true });

// ---- CONSOLE BARS ANIMATE ON VISIBLE ----
const consoleBars = document.querySelectorAll('.console-bar');
const consoleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      consoleBars.forEach((bar, i) => {
        bar.style.transitionDelay = `${i * 200 + 400}ms`;
      });
      consoleObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero-console');
if (heroSection) consoleObserver.observe(heroSection);

// ---- FORM SUBMIT ----
const form = document.getElementById('discoveryForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sent — we\'ll be in touch.';
    btn.style.opacity = '0.6';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      form.reset();
    }, 4000);
  });
}

// ---- CURSOR PRECISION: note hover lift ----
document.querySelectorAll('.note').forEach(note => {
  note.addEventListener('mouseenter', () => {
    note.style.transform = 'translateY(-2px)';
  });
  note.addEventListener('mouseleave', () => {
    note.style.transform = '';
  });
});

// ---- CASE HOVER: subtle lift ----
document.querySelectorAll('.case').forEach(card => {
  card.style.transition = 'background 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1)';
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-2px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- INITIAL HERO REVEAL ----
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero [data-reveal]').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 100);
});
