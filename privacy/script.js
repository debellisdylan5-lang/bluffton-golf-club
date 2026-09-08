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
    AOS.init({ once: true, duration: 700, offset: 80 });

(function () {
      const PAYMEGPT_HOST = 'paymegpt.com';
      const GITHUB_PREFIX = '/bluffton-golf-club';

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