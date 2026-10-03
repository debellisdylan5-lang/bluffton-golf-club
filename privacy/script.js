window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MXRJCSN55F');

document.documentElement.classList.add('aos-fallback');

tailwind.config = {
      theme: {
        extend: {
          colors: {
            ivory: '#F7F3E9',
            navy: '#10283F',
            gold: '#B69350',
            ink: '#273744'
          },
          fontFamily: {
            display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
            sans: ['Inter', 'Arial', 'sans-serif']
          }
        }
      }
    };

// ===== MOBILE NAVIGATION =====
    // Purpose: Opens and closes the compact navigation on smaller screens.
    // Triggers: Menu button clicks and Escape key presses.
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    function setMenuState(isOpen) {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      mobileMenu.classList.toggle('hidden', !isOpen);
      openIcon.classList.toggle('hidden', isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
    }

    menuButton.addEventListener('click', function () {
      setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenuState(false);
    });

    // ===== LIGHTWEIGHT ANALYTICS EVENT BRIDGE =====
    // Purpose: Normalizes click tracking via data-track attributes without changing the UI.
    window.dataLayer = window.dataLayer || [];

    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[data-track]');
      if (!link) return;

      window.dataLayer.push({
        event: link.dataset.track,
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    }, true);

// ===== SCROLL REVEALS =====
    // Purpose: Adds subtle motion to the policy layout without affecting readability.
    if (window.AOS) {
      document.documentElement.classList.remove('aos-fallback');
      AOS.init({ once: true, duration: 700, offset: 80 });
    }

(function () {
      const PAYMEGPT_HOST = 'paymegpt.com';
      const GITHUB_PREFIX = '/bluffton-golf-club';

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

      function getPrefix() {
        if (location.hostname === PAYMEGPT_HOST) return '';
        if (location.hostname.endsWith('github.io')) return GITHUB_PREFIX;
        return '';
      }

      function buildTarget(pathname) {
        const prefix = getPrefix();
        if (!prefix) return pathname;
        return pathname === '/' ? prefix + '/' : prefix + pathname;
      }

      function rewriteUrl(original) {
        try {
          const url = new URL(original, location.href);
          if (url.hostname !== PAYMEGPT_HOST) return null;
          if (!ROUTES[url.origin + url.pathname]) return null;
          const targetPath = buildTarget(ROUTES[url.origin + url.pathname]);
          return targetPath + url.search + url.hash;
        } catch (_) {
          return null;
        }
      }

      function rewriteLinks(root) {
        const scope = root && root.querySelectorAll ? root : document;
        scope.querySelectorAll('a[href], [data-article-url]').forEach((el) => {
          const attr = el.tagName === 'A' ? 'href' : 'data-article-url';
          const original = el.getAttribute(attr);
          if (!original) return;
          const rewritten = rewriteUrl(original);
          if (rewritten && rewritten !== original) {
            el.setAttribute(attr, rewritten);
          }
        });
      }

      function init() {
        rewriteLinks(document);
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType !== 1) return;
              if (node.matches && (node.matches('a[href]') || node.matches('[data-article-url]'))) {
                rewriteLinks(node.parentElement || document);
              } else {
                rewriteLinks(node);
              }
            });
          }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
      } else {
        init();
      }
    })();

(function(){function boot(){if(document.getElementById('bgc-unified-shell'))return;
document.querySelectorAll('nav[data-section="navbar"],header.site-header,header.topbar,.bgc-canonical-nav,.bgc-main-nav').forEach(function(el){el.style.display='none';});
var path=location.pathname.replace(/\/$/,'')||'/';var links=[['Golf','/golf'],['Membership','/membership'],['Lessons','/lessons'],['Outings','/outings'],['Blog','/blog'],['Contact','/contact']];var make=function(label,url){return '<a href="https://blufftongc.com'+url+'"'+(path===url?' aria-current="page"':'')+'>'+label+'</a>'};var shell=document.createElement('div');shell.id='bgc-unified-shell';shell.innerHTML='<div class="bgc-unified-nav"><a class="bgc-unified-logo" href="https://blufftongc.com/" aria-label="Bluffton Golf Club home"><img src="https://paymegpt.com/objects/quick-uploads/1257/5e32ab36c69024a9.png" alt="Bluffton Golf Club"></a><div class="bgc-unified-links">'+links.map(function(x){return make(x[0],x[1])}).join('')+'</div><div class="bgc-unified-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div><button class="bgc-unified-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div><div class="bgc-unified-mobile-menu" aria-label="Mobile navigation">'+links.map(function(x){return make(x[0],x[1])}).join('')+'<div class="bgc-unified-mobile-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div></div>';document.body.insertBefore(shell,document.body.firstChild);var b=shell.querySelector('button'),menu=shell.querySelector('.bgc-unified-mobile-menu');b.addEventListener('click',function(){var open=menu.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'×':'☰';b.setAttribute('aria-label',open?'Close menu':'Open menu')});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();})();