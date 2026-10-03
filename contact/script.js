window.dataLayer=window.dataLayer||[];function trackEvent(eventName,label){window.dataLayer.push({event:eventName,label:label||''});}

(function(){const btn=document.getElementById('menuBtn'),panel=document.getElementById('mobileMenu');if(!btn||!panel)return;function close(){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu')}btn.addEventListener('click',()=>{const open=panel.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu')});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('resize',()=>{if(window.innerWidth>1024)close()})})();

(function(){
  const ROUTES = {
    'https://blufftongc.com/': '/',
    'https://blufftongc.com/golf': '/golf/',
    'https://blufftongc.com/membership': '/membership/',
    'https://blufftongc.com/lessons': '/lessons/',
    'https://blufftongc.com/outings': '/outings/',
    'https://blufftongc.com/blog': '/blog/',
    'https://blufftongc.com/contact': '/contact/',
    'https://blufftongc.com/book-tee-times': '/book-tee-times/',
    'https://blufftongc.com/privacy': '/privacy/',
    'https://blufftongc.com/rewards': '/rewards/',
    'https://blufftongc.com/blog/public-golf-near-hilton-head': '/blog/public-golf-near-hilton-head/',
    'https://blufftongc.com/blog/golf-courses-in-bluffton-sc': '/blog/golf-courses-in-bluffton-sc/',
    'https://blufftongc.com/blog/davis-love-iii-course-strategy': '/blog/davis-love-iii-course-strategy/',
    'https://blufftongc.com/blog/golf-lessons-in-bluffton-sc': '/blog/golf-lessons-in-bluffton-sc/',
    'https://blufftongc.com/blog/lowcountry-golf-guide': '/blog/lowcountry-golf-guide/',
    'https://blufftongc.com/blog/golf-membership-in-bluffton-sc': '/blog/golf-membership-in-bluffton-sc/'
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