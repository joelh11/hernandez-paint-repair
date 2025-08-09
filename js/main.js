// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = getComputedStyle(nav).display !== 'none';
    nav.style.display = open ? 'none' : 'flex';
  });
}

// Init Jarallax
window.addEventListener('DOMContentLoaded', () => {
  if (window.jarallax) {
    jarallax(document.querySelectorAll('.jarallax'), { speed: 0.3 });
  }
});

// Active nav (simple)
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
  const isWork = key === 'work' && p.includes('/work/');
  const isContact = key === 'contact' && p.includes('/contact/');
  if (isHome || isServices || isWork || isContact) a.classList.add('active');
});

// ---------- Success toast after FormSubmit redirect (?sent=1) ----------
document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3000);
  }

  const urlParams = new URLSearchParams(window.location.search);
  console.log('Search:', window.location.search);
  console.log('Toast element found:', !!document.getElementById('toast'));

  if (urlParams.get('sent') === '1') {
    showToast('✅ Message sent successfully!');
    // Clean the URL so refresh doesn't re-trigger the toast
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
