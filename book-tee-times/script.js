window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MXRJCSN55F');

window.dataLayer=window.dataLayer||[];function trackEvent(eventName,label){window.dataLayer.push({event:eventName,label:label||''});}

(function(){const btn=document.getElementById('menuBtn'),panel=document.getElementById('mobileMenu');if(!btn||!panel)return;function close(){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu')}btn.addEventListener('click',()=>{const open=panel.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu')});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('resize',()=>{if(window.innerWidth>1024)close()})})();

(function () {
  const SITE_MAP = {
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
      href.includes('members.blufftongc.com') ||
      href.includes('golfscape.com') ||
      href.includes('/wallet/') ||
      href.includes('/join/');
  }

  function rewrite(root) {
    const nodes = root.querySelectorAll ? Array.from(root.querySelectorAll('a[href], [data-article-url]')) : [];
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

(function(){function boot(){if(document.getElementById('bgc-unified-shell'))return;
document.querySelectorAll('nav[data-section="navbar"],header.site-header,header.topbar,.bgc-canonical-nav,.bgc-main-nav').forEach(function(el){el.style.display='none';});
var path=location.pathname.replace(/\/$/,'')||'/';var links=[['Golf','/golf'],['Membership','/membership'],['Lessons','/lessons'],['Outings','/outings'],['Blog','/blog'],['Contact','/contact']];var make=function(label,url){return '<a href="https://blufftongc.com'+url+'"'+(path===url?' aria-current="page"':'')+'>'+label+'</a>'};var shell=document.createElement('div');shell.id='bgc-unified-shell';shell.innerHTML='<div class="bgc-unified-nav"><a class="bgc-unified-logo" href="https://blufftongc.com/" aria-label="Bluffton Golf Club home"><img src="https://paymegpt.com/objects/quick-uploads/1257/5e32ab36c69024a9.png" alt="Bluffton Golf Club"></a><div class="bgc-unified-links">'+links.map(function(x){return make(x[0],x[1])}).join('')+'</div><div class="bgc-unified-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div><button class="bgc-unified-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div><div class="bgc-unified-mobile-menu" aria-label="Mobile navigation">'+links.map(function(x){return make(x[0],x[1])}).join('')+'<div class="bgc-unified-mobile-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div></div>';document.body.insertBefore(shell,document.body.firstChild);var b=shell.querySelector('button'),menu=shell.querySelector('.bgc-unified-mobile-menu');b.addEventListener('click',function(){var open=menu.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'×':'☰';b.setAttribute('aria-label',open?'Close menu':'Open menu')});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();})();