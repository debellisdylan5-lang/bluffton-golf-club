window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MXRJCSN55F');

tailwind.config = {
      theme: {
        extend: {
          colors: {
            pine: '#071B3A',
            charcoal: '#102447',
            ivory: '#F7F6F2',
            brass: '#C7A35B'
          },
          fontFamily: {
            sans: ['Inter', 'Arial', 'sans-serif'],
            serif: ['Cormorant Garamond', 'Georgia', 'serif']
          }
        }
      }
    }

(function () {
        if (!window.dataLayer || !Array.isArray(window.dataLayer)) return;
        const pushFooterEvent = (action, label) => {
          window.dataLayer.push({
            event: 'footer_click',
            footer_action: action,
            footer_label: label
          });
        };
        const bind = (id, action, label) => {
          const el = document.getElementById(id);
          if (!el) return;
          el.addEventListener('click', () => pushFooterEvent(action, label));
        };
        bind('footer-tee-time', 'tee_time', 'Book a Tee Time');
        bind('footer-member-login', 'member_login', 'Member Login');
        const phoneLink = document.querySelector('a[href="tel:8437575900"]');
        if (phoneLink) phoneLink.addEventListener('click', () => pushFooterEvent('phone', '(843) 757-5900'));
      })();

(function () {
      if (window.AOS) {
        AOS.init({ once: true, duration: 700, offset: 80 });
        document.documentElement.classList.add('aos-loaded');
      } else {
        document.documentElement.classList.add('aos-loaded');
      }
    })();

(function () {
      const PAYMEGPT_HOST = 'paymegpt.com';
      const isGithubPages = location.hostname.endsWith('github.io');
      const isPaymeGPT = location.hostname === PAYMEGPT_HOST;
      const prefix = isGithubPages ? '/bluffton-golf-club' : '';

      const ROUTES = new Map([
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

      function localizePath(pathname) {
        return prefix + (pathname === '/' ? '/' : pathname);
      }

      function routeForAnchor(anchor) {
        if (!(anchor instanceof HTMLAnchorElement)) return null;

        const href = anchor.getAttribute('href');
        if (!href) return null;

        if (
          href.startsWith('tel:') ||
          href.startsWith('mailto:') ||
          href.startsWith('#') ||
          href.startsWith('/forms/') ||
          href.startsWith('/objects/') ||
          href.startsWith('/wallet/') ||
          href.startsWith('/join/') ||
          href.includes('golfscape') ||
          href.includes('members.blufftongc.com')
        ) {
          return null;
        }

        try {
          const url = new URL(href, location.href);
          const raw = url.origin + url.pathname;
          const mapped = ROUTES.get(raw);
          if (!mapped) return null;
          return localizePath(mapped);
        } catch (_) {
          return null;
        }
      }

      document.addEventListener('click', function (event) {
        if (isPaymeGPT) return;
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const anchor = event.target.closest && event.target.closest('a[href]');
        if (!anchor) return;

        const localPath = routeForAnchor(anchor);
        if (!localPath) return;

        event.preventDefault();
        event.stopPropagation();
        window.location.href = localPath + new URL(anchor.href, location.href).search + new URL(anchor.href, location.href).hash;
      }, true);
    })();

(function(){function boot(){if(document.getElementById('bgc-unified-shell'))return;
document.querySelectorAll('nav[data-section="navbar"],header.site-header,header.topbar,.bgc-canonical-nav,.bgc-main-nav').forEach(function(el){el.style.display='none';});
var path=location.pathname.replace(/\/$/,'')||'/';var links=[['Golf','/golf'],['Membership','/membership'],['Lessons','/lessons'],['Outings','/outings'],['Blog','/blog'],['Contact','/contact']];var make=function(label,url){return '<a href="https://blufftongc.com'+url+'"'+(path===url?' aria-current="page"':'')+'>'+label+'</a>'};var shell=document.createElement('div');shell.id='bgc-unified-shell';shell.innerHTML='<div class="bgc-unified-nav"><a class="bgc-unified-logo" href="https://blufftongc.com/" aria-label="Bluffton Golf Club home"><img src="https://paymegpt.com/objects/quick-uploads/1257/5e32ab36c69024a9.png" alt="Bluffton Golf Club"></a><div class="bgc-unified-links">'+links.map(function(x){return make(x[0],x[1])}).join('')+'</div><div class="bgc-unified-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div><button class="bgc-unified-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div><div class="bgc-unified-mobile-menu" aria-label="Mobile navigation">'+links.map(function(x){return make(x[0],x[1])}).join('')+'<div class="bgc-unified-mobile-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div></div>';document.body.insertBefore(shell,document.body.firstChild);var b=shell.querySelector('button'),menu=shell.querySelector('.bgc-unified-mobile-menu');b.addEventListener('click',function(){var open=menu.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'×':'☰';b.setAttribute('aria-label',open?'Close menu':'Open menu')});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();})();