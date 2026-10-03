window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MXRJCSN55F');

const menuToggle = document.getElementById('menu-toggle');
    const primaryMenu = document.getElementById('primary-menu');
    if (menuToggle && primaryMenu) {
      function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        primaryMenu.classList.remove('is-open');
      }

      function openMenu() {
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close navigation');
        primaryMenu.classList.add('is-open');
      }

      menuToggle.addEventListener('click', function () {
        const open = menuToggle.getAttribute('aria-expanded') === 'true';
        if (open) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
          closeMenu();
          menuToggle.focus();
        }
      });

      primaryMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth < 1024) {
            closeMenu();
          }
        });
      });
    }

    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('[data-event]').forEach(function (link) {
      link.addEventListener('click', function () {
        window.dataLayer.push({
          event: link.getAttribute('data-event'),
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      });
    });

if (window.AOS) {
      AOS.init({ once: true, duration: 700, offset: 80 });
    } else {
      document.documentElement.classList.add('no-aos');
    }

(function () {
      const PAYMEGPT_HOST = 'paymegpt.com';
      const GH_PREFIX = '/bluffton-golf-club';
      const MAP = {
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

      function isGitHubPagesHost(hostname) {
        return hostname.endsWith('github.io');
      }

      function buildPath(pathname) {
        if (location.hostname === PAYMEGPT_HOST) return pathname;
        const prefix = isGitHubPagesHost(location.hostname) ? GH_PREFIX : '';
        return prefix + pathname;
      }

      function rewriteValue(value) {
        try {
          const url = new URL(value, location.href);
          const key = url.origin + url.pathname;
          const mapped = MAP[key];
          if (!mapped) return value;
          if (location.hostname === PAYMEGPT_HOST) return value;
          return buildPath(mapped) + url.search + url.hash;
        } catch (e) {
          return value;
        }
      }

      function shouldRewriteAttribute(value) {
        if (!value) return false;
        return value.indexOf('https://blufftongc.com/') === 0 || value.indexOf('https://paymegpt.com/p/') === 0;
      }

      function rewriteNode(node) {
        if (!node || node.nodeType !== 1) return;
        const el = node;
        if (el.matches && el.matches('a[href]')) {
          const href = el.getAttribute('href');
          if (shouldRewriteAttribute(href)) {
            el.setAttribute('href', rewriteValue(href));
          }
        }
        if (el.hasAttribute && el.hasAttribute('data-article-url')) {
          const val = el.getAttribute('data-article-url');
          if (shouldRewriteAttribute(val)) {
            el.setAttribute('data-article-url', rewriteValue(val));
          }
        }
        if (el.querySelectorAll) {
          el.querySelectorAll('a[href], [data-article-url]').forEach(function (child) {
            rewriteNode(child);
          });
        }
      }

      function rewriteAll() {
        document.querySelectorAll('a[href], [data-article-url]').forEach(rewriteNode);
      }

      rewriteAll();

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(rewriteNode);
        });
      });

      observer.observe(document.documentElement, { childList: true, subtree: true });
    })();

(function(){function boot(){if(document.getElementById('bgc-unified-shell'))return;
document.querySelectorAll('nav[data-section="navbar"],header.site-header,header.topbar,.bgc-canonical-nav,.bgc-main-nav').forEach(function(el){el.style.display='none';});
var path=location.pathname.replace(/\/$/,'')||'/';var links=[['Golf','/golf'],['Membership','/membership'],['Lessons','/lessons'],['Outings','/outings'],['Blog','/blog'],['Contact','/contact']];var make=function(label,url){return '<a href="https://blufftongc.com'+url+'"'+(path===url?' aria-current="page"':'')+'>'+label+'</a>'};var shell=document.createElement('div');shell.id='bgc-unified-shell';shell.innerHTML='<div class="bgc-unified-nav"><a class="bgc-unified-logo" href="https://blufftongc.com/" aria-label="Bluffton Golf Club home"><img src="https://paymegpt.com/objects/quick-uploads/1257/5e32ab36c69024a9.png" alt="Bluffton Golf Club"></a><div class="bgc-unified-links">'+links.map(function(x){return make(x[0],x[1])}).join('')+'</div><div class="bgc-unified-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div><button class="bgc-unified-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div><div class="bgc-unified-mobile-menu" aria-label="Mobile navigation">'+links.map(function(x){return make(x[0],x[1])}).join('')+'<div class="bgc-unified-mobile-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div></div>';document.body.insertBefore(shell,document.body.firstChild);var b=shell.querySelector('button'),menu=shell.querySelector('.bgc-unified-mobile-menu');b.addEventListener('click',function(){var open=menu.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'×':'☰';b.setAttribute('aria-label',open?'Close menu':'Open menu')});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();})();