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

  bindClick('.navlinks a[href="https://blufftongc.com/golf"], .bgc-site-footer__link[href="https://blufftongc.com/golf"]', 'golf_page_click', 'Golf');
  bindClick('.navlinks a[href="https://blufftongc.com/membership"], .bgc-site-footer__link[href="https://blufftongc.com/membership"]', 'membership_click', 'Membership');
  bindClick('.navlinks a[href="https://blufftongc.com/lessons"], .bgc-site-footer__link[href="https://blufftongc.com/lessons"]', 'lessons_click', 'Lessons');
  bindClick('.navlinks a[href="https://blufftongc.com/outings"], .bgc-site-footer__link[href="https://blufftongc.com/outings"]', 'outings_click', 'Outings');
  bindClick('.navlinks a[href="https://blufftongc.com/blog"], .bgc-site-footer__link[href="https://blufftongc.com/blog"]', 'blog_click', 'Blog');
  bindClick('.navlinks a[href="https://blufftongc.com/contact"], .bgc-site-footer__link[href="https://blufftongc.com/contact"], .mobile-sticky-actions a.secondary[href="https://blufftongc.com/contact"]', 'contact_click', 'Contact');
  bindClick('.bgc-site-footer__link[href="https://blufftongc.com/privacy"], #privacyPolicyFooter', 'privacy_click', 'Privacy Policy');


})();

(function(){
  const PAYMEGPT_HOST = 'paymegpt.com';
  const GH_PREFIX = '/bluffton-golf-club';

  const LOCAL_ROUTES = {
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