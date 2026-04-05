/* ===================================================
   PREMSAGAR PORTFOLIO — main.js
=================================================== */

'use strict';

/* --------- NAVBAR SCROLL EFFECT --------- */
const navbar   = document.getElementById('navbar');
const backTop  = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('visible');
  }
});

/* --------- MOBILE NAV TOGGLE --------- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav when link clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

/* --------- ACTIVE NAV LINK ON SCROLL --------- */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* --------- FADE-IN ON SCROLL --------- */
const fadeElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .timeline-card, .highlight-card, .skills-group, .contact-card, .contact-form, .tool-chip'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

/* --------- SKILL BARS ANIMATION --------- */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-group').forEach(group => {
  skillObserver.observe(group);
});

/* --------- COUNTER ANIMATION (HERO STATS) --------- */
// Observe hero stats
const heroStats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    const targets  = [5, 90, 20];
    const prefixes = ['', '$', ''];
    const suffixes = ['+', 'K', '+'];

    heroStats.forEach((el, i) => {
      setTimeout(() => {
        const target = targets[i];
        const prefix = prefixes[i];
        const suffix = suffixes[i];
        const dur    = 1200;
        const inc    = target / (dur / 16);
        let cur = 0;

        const tick = () => {
          cur += inc;
          if (cur >= target) { el.textContent = prefix + target + suffix; return; }
          el.textContent = prefix + Math.floor(cur) + suffix;
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, i * 200);
    });
  }
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) statsObserver.observe(heroSection);

/* --------- CONTACT FORM --------- */
const contactForm    = document.getElementById('contactForm');
const formSuccessMsg = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // Simulate send (no server)
    setTimeout(() => {
      btn.innerHTML    = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#22c55e';
      formSuccessMsg.classList.add('visible');
      contactForm.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        formSuccessMsg.classList.remove('visible');
      }, 5000);
    }, 1500);
  });
}

/* --------- SMOOTH BACK-TO-TOP --------- */
if (backTop) {
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------- PORTFOLIO CARD HOVER METRIC HIGHLIGHT --------- */
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelectorAll('.new-val.highlight').forEach(v => {
      v.style.color = 'var(--accent)';
    });
  });
  card.addEventListener('mouseleave', () => {
    card.querySelectorAll('.new-val.highlight').forEach(v => {
      v.style.color = '';
    });
  });
});

/* --------- STAGGERED SECTION ENTRANCES --------- */
const staggerGroups = [
  '.services-grid .service-card',
  '.portfolio-grid .portfolio-card',
  '.about-highlights .highlight-card',
  '.tools-grid .tool-chip'
];

staggerGroups.forEach(selector => {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 70}ms`;
  });
});

/* --------- TYPED EFFECT FOR HERO TITLE --------- */
(function typeTitle() {
  const titles = [
    'Customer Success Manager',
    'Amazon PPC Specialist',
    'Amazon DSP Expert',
    'Digital Marketing Strategist'
  ];

  const el = document.querySelector('.hero-title');
  if (!el) return;

  // Find or create span for animated text
  let span = el.querySelector('span');
  if (!span) return;

  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const current = titles[ti];
    if (!deleting) {
      span.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    } else {
      span.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % titles.length;
      }
    }
    setTimeout(tick, deleting ? 50 : 80);
  }

  setTimeout(tick, 1200);
})();

/* --------- TIMELINE ACTIVE MARK ON SCROLL --------- */
document.querySelectorAll('.timeline-item').forEach(item => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.marker-dot').style.background = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });
  obs.observe(item);
});
