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

AOS.init({ once: true, duration: 700, offset: 80 });

(function () {
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

      const PAYMEGPT_HOST = 'paymegpt.com';
      const GITHUB_PREFIX = '/bluffton-golf-club';

      function getPrefix() {
        if (location.hostname === PAYMEGPT_HOST) return null;
        if (location.hostname.endsWith('github.io')) return GITHUB_PREFIX;
        return '';
      }

      function applyPrefix(path) {
        const prefix = getPrefix();
        if (prefix === null) return path;
        if (!prefix) return path;
        return path === '/' ? prefix + '/' : prefix + path;
      }

      function rewriteUrl(raw) {
        const match = ROUTES.get(raw);
        if (!match) return null;
        return applyPrefix(match);
      }

      function rewriteAnchor(anchor) {
        if (!(anchor instanceof HTMLAnchorElement)) return;
        const original = anchor.getAttribute('href');
        if (!original || !ROUTES.has(original)) return;
        if (location.hostname === PAYMEGPT_HOST) return;

        try {
          const url = new URL(original);
          const mapped = rewriteUrl(url.origin + url.pathname);
          if (!mapped) return;
          anchor.setAttribute('href', mapped + url.search + url.hash);
        } catch (_) {}
      }

      function rewriteDataArticleUrl(el) {
        if (!(el instanceof Element)) return;
        const original = el.getAttribute('data-article-url');
        if (!original || !ROUTES.has(original)) return;
        if (location.hostname === PAYMEGPT_HOST) return;

        try {
          const url = new URL(original);
          const mapped = rewriteUrl(url.origin + url.pathname);
          if (!mapped) return;
          el.setAttribute('data-article-url', mapped + url.search + url.hash);
        } catch (_) {}
      }

      function scan(root) {
        if (!root || !root.querySelectorAll) return;
        root.querySelectorAll('a[href], [data-article-url]').forEach((el) => {
          if (el.tagName === 'A') rewriteAnchor(el);
          rewriteDataArticleUrl(el);
        });
      }

      function start() {
        scan(document);
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType !== 1) return;
              scan(node);
            });
            if (mutation.type === 'attributes' && mutation.target) {
              if (mutation.target.tagName === 'A') rewriteAnchor(mutation.target);
              rewriteDataArticleUrl(mutation.target);
            }
          }
        });
        observer.observe(document.documentElement, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['href', 'data-article-url']
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
      } else {
        start();
      }
    })();