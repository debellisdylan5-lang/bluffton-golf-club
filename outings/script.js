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

(function(){
  const host = location.hostname;
  if(host === 'paymegpt.com') return;

  const isGithubPages = host.endsWith('github.io');
  const prefix = isGithubPages ? '/bluffton-golf-club' : '';

  const routes = {
    '/p/SUpiU9p': '/',
    '/p/7kEfQDVgfm': '/golf/',
    '/p/5c8a7v9Aa': '/membership/',
    '/p/BbtfDrfYx': '/lessons/',
    '/p/UrkWi8r': '/outings/',
    '/p/fHpcvCS2Y': '/blog/',
    '/p/fDMLxwZ8': '/contact/',
    '/p/S6jARJrr': '/book-tee-times/',
    '/p/WSYbZ2a6q': '/privacy/',
    '/p/S48UZA4': '/rewards/',
    '/p/QdFmcQ': '/blog/public-golf-near-hilton-head/',
    '/p/TVSWTAP': '/blog/golf-courses-in-bluffton-sc/',
    '/p/Q4j95JW9HH': '/blog/davis-love-iii-course-strategy/',
    '/p/AVRKGkLz': '/blog/golf-lessons-in-bluffton-sc/',
    '/p/DVjf4mfhk': '/blog/lowcountry-golf-guide/',
    '/p/iGQS8v': '/blog/golf-membership-in-bluffton-sc/'
  };

  const shouldIgnore = (href) => {
    if(!href) return true;
    return /^(#|mailto:|tel:|https?:\/\/paymegpt\.com\/objects\/|https?:\/\/paymegpt\.com\/forms\/|https?:\/\/paymegpt\.com\/wallet\/|https?:\/\/paymegpt\.com\/join\/|https:\/\/members\.eaglespointegc\.com|https:\/\/golfscape\.com|https:\/\/maps\.google\.com|https:\/\/www\.google\.com\/maps|https:\/\/www\.google\.com\/search\?.*[?&]q=|https:\/\/www\.google\.com\/maps)/i.test(href);
  };

  const localizeHref = (href) => {
    try {
      const u = new URL(href, location.href);
      if(u.hostname !== 'paymegpt.com') return null;
      const mapped = routes[u.pathname];
      if(!mapped) return null;
      return prefix + mapped + u.search + u.hash;
    } catch(e) {
      return null;
    }
  };

  document.addEventListener('click', function(e){
    if(e.defaultPrevented) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;

    const href = a.getAttribute('href');
    if(shouldIgnore(href)) return;

    const next = localizeHref(href);
    if(!next) return;

    e.preventDefault();
    e.stopPropagation();
    location.href = next;
  }, true);
})();