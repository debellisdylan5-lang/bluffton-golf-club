window.dataLayer=window.dataLayer||[];function trackEvent(eventName,label){window.dataLayer.push({event:eventName,label:label||''});}

(function(){const btn=document.getElementById('menuBtn'),panel=document.getElementById('mobileMenu');if(!btn||!panel)return;function close(){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu')}btn.addEventListener('click',()=>{const open=panel.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu')});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('resize',()=>{if(window.innerWidth>1024)close()})})();

(function(){
  const ROUTES = {
    'https://paymegpt.com/p/SUpiU9p': '/',
    'https://paymegpt.com/p/7kEfQDVgfm': '/golf/',
    'https://paymegpt.com/p/5c8a7v9Aa': '/membership/',
    'https://paymegpt.com/p/BbtfDrfYx': '/lessons/',
    'https://paymegpt.com/p/UrkWi8r': '/outings/',
    'https://paymegpt.com/p/fHpcvCS2Y': '/blog/',
    'https://paymegpt.com/p/fDMLxwZ8': '/contact/',
    'https://paymegpt.com/p/S6jARJrr': '/book-tee-times/',
    'https://paymegpt.com/p/WSYbZ2a6q': '/privacy/',
    'https://paymegpt.com/p/S48UZA4': '/rewards/',
    'https://paymegpt.com/p/QdFmcQ': '/blog/public-golf-near-hilton-head/',
    'https://paymegpt.com/p/TVSWTAP': '/blog/golf-courses-in-bluffton-sc/',
    'https://paymegpt.com/p/Q4j95JW9HH': '/blog/davis-love-iii-course-strategy/',
    'https://paymegpt.com/p/AVRKGkLz': '/blog/golf-lessons-in-bluffton-sc/',
    'https://paymegpt.com/p/DVjf4mfhk': '/blog/lowcountry-golf-guide/',
    'https://paymegpt.com/p/iGQS8v': '/blog/golf-membership-in-bluffton-sc/'
  };

  const currentHost = location.hostname;
  const isGitHubPages = currentHost.endsWith('github.io');
  const isCustomDomain = !isGitHubPages && currentHost !== 'paymegpt.com';

  function toMappedPath(url) {
    if (!Object.prototype.hasOwnProperty.call(ROUTES, url)) return null;
    const path = ROUTES[url];
    return isGitHubPages ? '/bluffton-golf-club' + path : (isCustomDomain ? path : null);
  }

  document.addEventListener('click', function(e) {
    const link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('https://paymegpt.com/forms/') ||
      href.startsWith('https://paymegpt.com/objects/') ||
      href.startsWith('https://paymegpt.com/wallet/') ||
      href.startsWith('https://paymegpt.com/join/') ||
      href.includes('golfscape.com') ||
      href.includes('google.com/maps') ||
      href.includes('members.eaglespointegc.com')
    ) {
      return;
    }

    const mapped = toMappedPath(href);
    if (mapped) {
      e.preventDefault();
      window.location.href = mapped;
    }
  }, true);
})();