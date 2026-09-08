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
      }
    })();

(function () {
      const PAYMEGPT_HOST = 'paymegpt.com';
      const isGithubPages = location.hostname.endsWith('github.io');
      const isPaymeGPT = location.hostname === PAYMEGPT_HOST;
      const prefix = isGithubPages ? '/bluffton-golf-club' : '';

      const ROUTES = new Map([
        ['https://paymegpt.com/p/SUpiU9p', '/'],
        ['https://paymegpt.com/p/7kEfQDVgfm', '/golf/'],
        ['https://paymegpt.com/p/5c8a7v9Aa', '/membership/'],
        ['https://paymegpt.com/p/BbtfDrfYx', '/lessons/'],
        ['https://paymegpt.com/p/UrkWi8r', '/outings/'],
        ['https://paymegpt.com/p/fHpcvCS2Y', '/blog/'],
        ['https://paymegpt.com/p/fDMLxwZ8', '/contact/'],
        ['https://paymegpt.com/p/S6jARJrr', '/book-tee-times/'],
        ['https://paymegpt.com/p/WSYbZ2a6q', '/privacy/'],
        ['https://paymegpt.com/p/S48UZA4', '/rewards/'],
        ['https://paymegpt.com/p/QdFmcQ', '/blog/public-golf-near-hilton-head/'],
        ['https://paymegpt.com/p/TVSWTAP', '/blog/golf-courses-in-bluffton-sc/'],
        ['https://paymegpt.com/p/Q4j95JW9HH', '/blog/davis-love-iii-course-strategy/'],
        ['https://paymegpt.com/p/AVRKGkLz', '/blog/golf-lessons-in-bluffton-sc/'],
        ['https://paymegpt.com/p/DVjf4mfhk', '/blog/lowcountry-golf-guide/'],
        ['https://paymegpt.com/p/iGQS8v', '/blog/golf-membership-in-bluffton-sc/']
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
          href.includes('members.eaglespointegc.com')
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