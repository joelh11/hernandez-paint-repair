
document.getElementById('year').textContent = new Date().getFullYear();
// Mobile menu
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
if (toggle) toggle.addEventListener('click', ()=>{nav.style.display = (getComputedStyle(nav).display!=='none')?'none':'flex';});
// Init jarallax
window.addEventListener('DOMContentLoaded', ()=>{ if(window.jarallax) jarallax(document.querySelectorAll('.jarallax'),{speed:0.3}); });
// Active nav (simple)
const p = location.pathname;
document.querySelectorAll('[data-nav]').forEach(a=>{
  const key = a.dataset.nav;
  if ((key==='home' && (p.endsWith('/') && !p.includes('/services/') && !p.includes('/work/') && !p.includes('/contact/') && !p.includes('/about/')))
   || (key==='services' && p.includes('/services/'))
   || (key==='work' && p.includes('/work/'))
   || (key==='contact' && p.includes('/contact/'))) { a.classList.add('active'); }
});
