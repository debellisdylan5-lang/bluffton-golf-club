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

  const shouldSkip = (href) => {
    if(!href) return true;
    return /^(https?:\/\/paymegpt\.com\/objects\/|https?:\/\/paymegpt\.com\/forms\/|mailto:|tel:|https:\/\/members\.eaglespointegc\.com|https:\/\/golfscape\.com|https:\/\/paymegpt\.com\/wallet\/|https:\/\/paymegpt\.com\/join\/)/.test(href);
  };

  const rewriteUrl = (href) => {
    try {
      const u = new URL(href, location.href);
      const full = u.origin + u.pathname;
      if(routes[full]) return prefix + routes[full] + u.search + u.hash;
    } catch(e) {}
    return href;
  };

  const rewrite = (root) => {
    root.querySelectorAll('a[href], [data-article-url]').forEach(el => {
      if(el.tagName === 'A'){
        const href = el.getAttribute('href');
        if(shouldSkip(href)) return;
        const next = rewriteUrl(href);
        if(next !== href) el.setAttribute('href', next);
      }
      const articleUrl = el.getAttribute && el.getAttribute('data-article-url');
      if(articleUrl){
        const nextArticleUrl = rewriteUrl(articleUrl);
        if(nextArticleUrl !== articleUrl) el.setAttribute('data-article-url', nextArticleUrl);
      }
    });
  };

  const init = () => {
    rewrite(document);
    const observer = new MutationObserver(mutations => {
      for(const mutation of mutations){
        mutation.addedNodes.forEach(node => {
          if(node && node.nodeType === 1) rewrite(node);
        });
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }else{
    init();
  }
})();