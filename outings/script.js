window.dataLayer = window.dataLayer || [];
function trackEvent(name){ window.dataLayer.push({event:name}); }
(function(){
  const nav = document.querySelector('.nav');
  const menuBtn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobile-panel');
  if(menuBtn && nav && panel){
    const closeMenu = () => { panel.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Open navigation'); };
    menuBtn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => { if(!nav.contains(e.target)) closeMenu(); });
  }
})();