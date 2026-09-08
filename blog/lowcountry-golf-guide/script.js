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

AOS.init({ once: true, duration: 700, offset: 80 });

(function () {
      const PAYMEGPT_HOST = 'paymegpt.com';
      const GH_PREFIX = '/bluffton-golf-club';
      const MAP = {
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
          const mapped = MAP[url.origin + url.pathname];
          if (!mapped) return value;
          return buildPath(mapped) + url.search + url.hash;
        } catch (e) {
          return value;
        }
      }

      function rewriteNode(node) {
        if (!node || node.nodeType !== 1) return;
        const el = node;
        if (el.matches && el.matches('a[href]')) {
          const href = el.getAttribute('href');
          if (href && href.indexOf('https://paymegpt.com/p/') === 0) {
            el.setAttribute('href', rewriteValue(href));
          }
        }
        if (el.hasAttribute && el.hasAttribute('data-article-url')) {
          const val = el.getAttribute('data-article-url');
          if (val && val.indexOf('https://paymegpt.com/p/') === 0) {
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