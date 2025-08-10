// Year in footer (safe if #year missing)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------------- Mobile menu (class-based) ----------------
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

function closeMenu() { document.body.classList.remove('nav-open'); }
function toggleMenu() { document.body.classList.toggle('nav-open'); }

if (toggle && nav) {
  toggle.addEventListener('click', toggleMenu);

  // Close when a nav link is clicked
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when clicking outside the nav (on small screens)
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('nav-open')) return;
    const withinNav = nav.contains(e.target) || toggle.contains(e.target);
    if (!withinNav) closeMenu();
  });
}

// ---------------- Jarallax ----------------
window.addEventListener('DOMContentLoaded', () => {
  // Respect reduced motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && window.jarallax) {
    jarallax(document.querySelectorAll('.jarallax'), { speed: 0.3 });
  }
});

// ---------------- Active nav ----------------
(function () {
  const p = location.pathname;
  document.querySelectorAll('[data-nav]').forEach(a => {
    const key = a.dataset.nav;
    const isHome =
      key === 'home' &&
      p.endsWith('/') &&
      !p.includes('/services/') &&
      !p.includes('/work/') &&
      !p.includes('/contact/') &&
      !p.includes('/about/');
    const isServices = key === 'services' && p.includes('/services/');
    const isWork     = key === 'work'     && p.includes('/work/');
    const isContact  = key === 'contact'  && p.includes('/contact/');
    const isAbout    = key === 'about'    && p.includes('/about/');
    if (isHome || isServices || isWork || isContact || isAbout) a.classList.add('active');
  });
})();

// ---------------- Success toast after FormSubmit ----------------
document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3000);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const hasSentQuery = urlParams.get('sent') === '1';
  const fromFormSubmit = /formsubmit\.co/i.test(document.referrer);

  if (hasSentQuery || fromFormSubmit) {
    showToast('✅ Message sent successfully!');
    if (hasSentQuery) {
      // Clean the URL so refresh doesn't re-trigger the toast
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
});
