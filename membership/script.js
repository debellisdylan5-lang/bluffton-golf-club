window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MXRJCSN55F');

window.dataLayer = window.dataLayer || [];
function bgcTrack(eventName){ window.dataLayer.push({event:eventName}); }

const navToggle = document.getElementById('nav-toggle');
const navToggleLabel = document.querySelector('.nav label[for="nav-toggle"]');
if (navToggle && navToggleLabel) {
  const syncNavState = () => {
    const expanded = navToggle.checked ? 'true' : 'false';
    navToggle.setAttribute('aria-expanded', expanded);
    navToggleLabel.setAttribute('aria-expanded', expanded);
    navToggleLabel.setAttribute('aria-label', navToggle.checked ? 'Close navigation' : 'Open navigation');
  };
  const toggleNav = () => {
    navToggle.checked = !navToggle.checked;
    navToggle.dispatchEvent(new Event('change', { bubbles: true }));
  };
  navToggle.addEventListener('change', syncNavState);
  navToggleLabel.addEventListener('click', syncNavState);
  navToggleLabel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNav();
    }
  });
  syncNavState();
}

(() => {
  const BGC_PAGE_MAP = new Map([
    ['https://blufftongc.com/', '/'],
    ['https://blufftongc.com/golf', '/golf/'],
    ['https://blufftongc.com/membership', '/membership/'],
    ['https://blufftongc.com/lessons', '/lessons/'],
    ['https://blufftongc.com/outings', '/outings/'],
    ['https://blufftongc.com/blog', '/blog/'],
    ['https://blufftongc.com/contact', '/contact/'],
    ['https://blufftongc.com/book-tee-times', '/book-tee-times/'],
    ['https://blufftongc.com/privacy', '/privacy/'],
    ['https://blufftongc.com/rewards', '/rewards/'],
    ['https://blufftongc.com/blog/public-golf-near-hilton-head', '/blog/public-golf-near-hilton-head/'],
    ['https://blufftongc.com/blog/golf-courses-in-bluffton-sc', '/blog/golf-courses-in-bluffton-sc/'],
    ['https://blufftongc.com/blog/davis-love-iii-course-strategy', '/blog/davis-love-iii-course-strategy/'],
    ['https://blufftongc.com/blog/golf-lessons-in-bluffton-sc', '/blog/golf-lessons-in-bluffton-sc/'],
    ['https://blufftongc.com/blog/lowcountry-golf-guide', '/blog/lowcountry-golf-guide/'],
    ['https://blufftongc.com/blog/golf-membership-in-bluffton-sc', '/blog/golf-membership-in-bluffton-sc/']
  ]);

  const isPayMeGPTHost = location.hostname === 'paymegpt.com';
  const isGitHubPages = location.hostname.endsWith('github.io');
  const prefix = isGitHubPages ? '/bluffton-golf-club' : '';

  function rewriteUrl(raw) {
    try {
      const url = new URL(raw, location.href);
      const mapped = BGC_PAGE_MAP.get(url.origin + url.pathname);
      if (!mapped) return raw;
      const path = mapped === '/' ? prefix + '/' : prefix + mapped;
      return path + url.search + url.hash;
    } catch {
      return raw;
    }
  }

  function rewriteAttribute(node, attr) {
    if (!node.hasAttribute || !node.hasAttribute(attr)) return;
    const raw = node.getAttribute(attr);
    if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('#')) return;
    if (attr === 'href' && (raw.includes('/objects/') || raw.includes('/forms/') || raw.includes('members.blufftongc.com'))) return;
    const next = rewriteUrl(raw);
    if (next !== raw) node.setAttribute(attr, next);
  }

  function rewriteAll(root = document) {
    root.querySelectorAll('a[href], [data-article-url]').forEach((node) => {
      rewriteAttribute(node, node.tagName === 'A' ? 'href' : 'data-article-url');
    });
  }

  if (isPayMeGPTHost) return;

  const start = () => {
    rewriteAll();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches && (node.matches('a[href]') || node.matches('[data-article-url]'))) {
            rewriteAttribute(node, node.tagName === 'A' ? 'href' : 'data-article-url');
          }
          rewriteAll(node);
        });
        if (mutation.type === 'attributes' && mutation.target && mutation.target.nodeType === 1) {
          const target = mutation.target;
          if (target.matches('a[href]')) rewriteAttribute(target, 'href');
          if (target.matches('[data-article-url]')) rewriteAttribute(target, 'data-article-url');
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['href', 'data-article-url']
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

(function(){function boot(){if(document.getElementById('bgc-unified-shell'))return;
document.querySelectorAll('nav[data-section="navbar"],header.site-header,header.topbar,.bgc-canonical-nav,.bgc-main-nav').forEach(function(el){el.style.display='none';});
var path=location.pathname.replace(/\/$/,'')||'/';var links=[['Golf','/golf'],['Membership','/membership'],['Lessons','/lessons'],['Outings','/outings'],['Blog','/blog'],['Contact','/contact']];var make=function(label,url){return '<a href="https://blufftongc.com'+url+'"'+(path===url?' aria-current="page"':'')+'>'+label+'</a>'};var shell=document.createElement('div');shell.id='bgc-unified-shell';shell.innerHTML='<div class="bgc-unified-nav"><a class="bgc-unified-logo" href="https://blufftongc.com/" aria-label="Bluffton Golf Club home"><img src="https://paymegpt.com/objects/quick-uploads/1257/5e32ab36c69024a9.png" alt="Bluffton Golf Club"></a><div class="bgc-unified-links">'+links.map(function(x){return make(x[0],x[1])}).join('')+'</div><div class="bgc-unified-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div><button class="bgc-unified-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div><div class="bgc-unified-mobile-menu" aria-label="Mobile navigation">'+links.map(function(x){return make(x[0],x[1])}).join('')+'<div class="bgc-unified-mobile-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div></div>';document.body.insertBefore(shell,document.body.firstChild);var b=shell.querySelector('button'),menu=shell.querySelector('.bgc-unified-mobile-menu');b.addEventListener('click',function(){var open=menu.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'×':'☰';b.setAttribute('aria-label',open?'Close menu':'Open menu')});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();})();