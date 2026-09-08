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
  const PAYMEGPT_HOST = 'paymegpt.com';
  const GH_PREFIX = '/bluffton-golf-club';

  const LOCAL_ROUTES = {
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

  function sitePrefix(){
    return location.hostname.endsWith('github.io') ? GH_PREFIX : '';
  }

  function localizePath(path){
    const prefix = sitePrefix();
    return prefix ? (path === '/' ? prefix + '/' : prefix + path) : path;
  }

  function isLocalizableHref(href){
    if(!href) return false;
    if(href.startsWith('tel:') || href.startsWith('mailto:')) return false;
    if(href.includes('golfscape')) return false;
    if(href === 'https://members.eaglespointegc.com') return false;
    if(/^https?:\/\/paymegpt\.com\/(objects|forms|wallet|join)\//.test(href)) return false;
    if(/^https?:\/\/[^/]+/.test(href) && !href.startsWith('https://paymegpt.com/')) return false;
    return Object.prototype.hasOwnProperty.call(LOCAL_ROUTES, href);
  }

  function handleLocalRouting(event){
    if(location.hostname === PAYMEGPT_HOST) return;

    const anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if(!anchor) return;

    const href = anchor.getAttribute('href');
    if(!isLocalizableHref(href)) return;

    const nextPath = localizePath(LOCAL_ROUTES[href]);
    event.preventDefault();
    event.stopPropagation();
    window.location.href = nextPath;
  }

  document.addEventListener('click', handleLocalRouting, true);
})();