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