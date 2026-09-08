window.dataLayer=window.dataLayer||[];function trackEvent(eventName,label){window.dataLayer.push({event:eventName,label:label||''});}

(function(){const btn=document.getElementById('menuBtn'),panel=document.getElementById('mobileMenu');if(!btn||!panel)return;function close(){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu')}btn.addEventListener('click',()=>{const open=panel.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu')});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('resize',()=>{if(window.innerWidth>1024)close()})})();

(function () {
  const SITE_MAP = {
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

  function prefixPath(path) {
    if (location.hostname === 'paymegpt.com') return path;
    if (location.hostname.endsWith('github.io')) return '/bluffton-golf-club' + path;
    return path;
  }

  function rewriteUrl(value) {
    if (!value || typeof value !== 'string') return value;
    const qIndex = value.search(/[?#]/);
    const base = qIndex === -1 ? value : value.slice(0, qIndex);
    const suffix = qIndex === -1 ? '' : value.slice(qIndex);
    if (!Object.prototype.hasOwnProperty.call(SITE_MAP, base)) return value;
    return prefixPath(SITE_MAP[base]) + suffix;
  }

  function shouldSkipHref(href) {
    return !href ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.includes('/objects/') ||
      href.includes('/forms/') ||
      href.includes('members.eaglespointegc.com') ||
      href.includes('golfscape.com') ||
      href.includes('/wallet/') ||
      href.includes('/join/');
  }

  function rewrite(root) {
    const nodes = root.querySelectorAll ? root.querySelectorAll('a[href], [data-article-url]') : [];
    if (root.matches && (root.matches('a[href]') || root.matches('[data-article-url]'))) {
      nodes.unshift(root);
    }

    nodes.forEach((el) => {
      if (el.matches('a[href]')) {
        const href = el.getAttribute('href');
        if (shouldSkipHref(href)) return;
        const nextHref = rewriteUrl(href);
        if (nextHref !== href) el.setAttribute('href', nextHref);
      }
      if (el.hasAttribute('data-article-url')) {
        const val = el.getAttribute('data-article-url');
        const nextVal = rewriteUrl(val);
        if (nextVal !== val) el.setAttribute('data-article-url', nextVal);
      }
    });
  }

  function run() {
    rewrite(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) rewrite(node);
      });
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();