window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

(function(){
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobile-menu');
  if(btn && panel){
    btn.addEventListener('click', function(){
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && panel.classList.contains('open')){
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation');
        btn.focus();
      }
    });
  }

  function bindClick(selector, eventName, label){
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('click', function(){
        window.dataLayer.push({
          event: eventName,
          article_title: label || this.textContent.trim()
        });
      });
    });
  }

  bindClick('.article-link', 'article_click');
  bindClick('#teeTimeTop, #teeTimeMobile, #teeTimeBottom, #teeTimeFooter, #teeTimeSticky', 'tee_time_click', 'Book a Tee Time');
  bindClick('#memberLoginTop, #memberLoginMobile, #memberLoginFooter', 'member_login_click', 'Member Login');
  bindClick('a[href^="tel:"]', 'phone_click');

  bindClick('.navlinks a[href="https://paymegpt.com/p/7kEfQDVgfm"], .bgc-site-footer__link[href="https://paymegpt.com/p/7kEfQDVgfm"]', 'golf_page_click', 'Golf');
  bindClick('.navlinks a[href="https://paymegpt.com/p/5c8a7v9Aa"], .bgc-site-footer__link[href="https://paymegpt.com/p/5c8a7v9Aa"]', 'membership_click', 'Membership');
  bindClick('.navlinks a[href="https://paymegpt.com/p/BbtfDrfYx"], .bgc-site-footer__link[href="https://paymegpt.com/p/BbtfDrfYx"]', 'lessons_click', 'Lessons');
  bindClick('.navlinks a[href="https://paymegpt.com/p/UrkWi8r"], .bgc-site-footer__link[href="https://paymegpt.com/p/UrkWi8r"]', 'outings_click', 'Outings');
  bindClick('.navlinks a[href="https://paymegpt.com/p/fHpcvCS2Y"], .bgc-site-footer__link[href="https://paymegpt.com/p/fHpcvCS2Y"]', 'blog_click', 'Blog');
  bindClick('.navlinks a[href="https://paymegpt.com/p/fDMLxwZ8"], .bgc-site-footer__link[href="https://paymegpt.com/p/fDMLxwZ8"], .mobile-sticky-actions a.secondary[href="https://paymegpt.com/p/fDMLxwZ8"]', 'contact_click', 'Contact');
  bindClick('.bgc-site-footer__link[href="https://paymegpt.com/p/WSYbZ2a6q"], #privacyPolicyFooter', 'privacy_click', 'Privacy Policy');


})();

(function(){
  const EXACT_HOST = 'paymegpt.com';
  const GH_PREFIX = '/bluffton-golf-club';
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

  function getPrefix(){
    if(location.hostname === EXACT_HOST) return '';
    if(location.hostname.endsWith('github.io')) return GH_PREFIX;
    return '';
  }

  function withPrefix(path){
    const prefix = getPrefix();
    if(!prefix) return path;
    return path === '/' ? prefix + '/' : prefix + path;
  }

  function rewriteValue(value){
    if(typeof value !== 'string') return value;
    const qIndex = value.search(/[?#]/);
    const base = qIndex === -1 ? value : value.slice(0, qIndex);
    const suffix = qIndex === -1 ? '' : value.slice(qIndex);

    if(Object.prototype.hasOwnProperty.call(ROUTES, base)){
      return withPrefix(ROUTES[base]) + suffix;
    }
    return value;
  }

  function rewriteNode(node){
    if(!node || node.nodeType !== 1) return;

    if(node.tagName === 'A'){
      const href = node.getAttribute('href');
      if(href && !/^https?:\/\/paymegpt\.com\/objects\//.test(href) && !/^https?:\/\/paymegpt\.com\/forms\//.test(href) && !/^https?:\/\/paymegpt\.com\/wallet\//.test(href) && !/^https?:\/\/paymegpt\.com\/join\//.test(href) && !href.startsWith('tel:') && !href.startsWith('mailto:') && href !== 'https://members.eaglespointegc.com' && !href.includes('golfscape') && !/^https?:\/\/[^/]+/.test(href.replace(/^https?:\/\/paymegpt\.com/i, ''))) {
        const nextHref = rewriteValue(href);
        if(nextHref !== href) node.setAttribute('href', nextHref);
      }
    }

    if(node.hasAttribute && node.hasAttribute('data-article-url')){
      const current = node.getAttribute('data-article-url');
      const next = rewriteValue(current);
      if(next !== current) node.setAttribute('data-article-url', next);
    }

    if(node.querySelectorAll){
      node.querySelectorAll('a[href], [data-article-url]').forEach(el => {
        if(el.tagName === 'A'){
          const href = el.getAttribute('href');
          if(href && !/^https?:\/\/paymegpt\.com\/objects\//.test(href) && !/^https?:\/\/paymegpt\.com\/forms\//.test(href) && !/^https?:\/\/paymegpt\.com\/wallet\//.test(href) && !/^https?:\/\/paymegpt\.com\/join\//.test(href) && !href.startsWith('tel:') && !href.startsWith('mailto:') && href !== 'https://members.eaglespointegc.com' && !href.includes('golfscape')) {
            const nextHref = rewriteValue(href);
            if(nextHref !== href) el.setAttribute('href', nextHref);
          }
        } else if(el.hasAttribute('data-article-url')){
          const current = el.getAttribute('data-article-url');
          const next = rewriteValue(current);
          if(next !== current) el.setAttribute('data-article-url', next);
        }
      });
    }
  }

  function rewriteAll(){
    document.querySelectorAll('a[href], [data-article-url]').forEach(rewriteNode);
  }

  rewriteAll();

  const observer = new MutationObserver(mutations => {
    for(const mutation of mutations){
      mutation.addedNodes.forEach(rewriteNode);
      if(mutation.type === 'attributes' && mutation.target){
        rewriteNode(mutation.target);
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['href', 'data-article-url']
  });
})();