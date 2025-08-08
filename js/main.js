
// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = getComputedStyle(nav).display !== 'none';
    nav.style.display = open ? 'none' : 'flex';
  });
}

// Active nav highlight
const page = (location.pathname.split('/').pop() || 'index.html').replace('.html','');
document.querySelectorAll('[data-nav]').forEach(a => {
  if ((a.dataset.nav === 'home' && page === 'index') || a.dataset.nav === page) {
    a.classList.add('active');
  }
});

// Init jarallax if available
window.addEventListener('DOMContentLoaded', () => {
  if (window.jarallax) {
    jarallax(document.querySelectorAll('.jarallax'), { speed: 0.3 });
  }
});
