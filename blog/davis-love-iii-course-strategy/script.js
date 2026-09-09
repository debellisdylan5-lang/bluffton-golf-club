tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { 900: '#071b2e', 800: '#0c2842', 700: '#173a58' },
            gold: { 300: '#dbc584', 400: '#c7aa58', 500: '#a98834' },
            ivory: '#f7f3e8',
            ink: '#172332'
          },
          fontFamily: {
            display: ['Georgia', 'Times New Roman', 'serif'],
            body: ['Arial', 'Helvetica', 'sans-serif']
          },
          boxShadow: { editorial: '0 22px 60px rgba(7,27,46,.16)' }
        }
      }
    };

// ===== MOBILE NAVIGATION =====
    // Purpose: Toggles the compact navigation on small screens.
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    function setMenuState(isOpen) {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      mobileMenu.classList.toggle('hidden', !isOpen);
    }
    menuButton.addEventListener('click', function () {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
      }
    });
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    // ===== DATALAYER EVENT TRACKING =====
    // Purpose: Pushes requested click-event names without requiring a GA ID.
    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('[data-event]').forEach(function (link) {
      link.addEventListener('click', function () {
        window.dataLayer.push({
          event: link.dataset.event,
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      });
    });

// ===== EDITORIAL SCROLL REVEALS =====
    // Purpose: Adds restrained motion to summary cards and calls to action.
    if (window.AOS) {
      AOS.init({ once: true, duration: 700, offset: 80 });
    }

(function () {
      const EXACT_HOST = 'paymegpt.com';
      const GH_PREFIX = '/bluffton-golf-club';
      const isGitHubPages = location.hostname.endsWith('github.io');
      const prefix = location.hostname === EXACT_HOST ? '' : (isGitHubPages ? GH_PREFIX : '');

      const routes = {
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

      function rewriteValue(value) {
        if (!value || location.hostname === EXACT_HOST) return value;
        const hashIndex = value.indexOf('#');
        const queryIndex = value.indexOf('?');
        const cutIndex = hashIndex === -1 ? queryIndex : (queryIndex === -1 ? hashIndex : Math.min(hashIndex, queryIndex));
        const base = cutIndex === -1 ? value : value.slice(0, cutIndex);
        const suffix = cutIndex === -1 ? '' : value.slice(cutIndex);

        if (routes[base]) return prefix + routes[base] + suffix;
        return value;
      }

      function shouldSkipLink(anchor) {
        const href = anchor.getAttribute('href') || '';
        if (!href) return true;
        if (/^(mailto:|tel:|sms:|javascript:|#)/i.test(href)) return true;
        if (href.includes('/objects/') || href.includes('/forms/') || href.includes('members.eaglespointegc.com') || href.includes('golfscape') || href.includes('wallet') || href.includes('join')) return true;
        return false;
      }

      function rewrite(root) {
        const nodes = root.querySelectorAll ? root.querySelectorAll('a[href], [data-article-url]') : [];
        nodes.forEach(function (node) {
          if (node.tagName === 'A') {
            if (shouldSkipLink(node)) return;
            const href = node.getAttribute('href');
            const nextHref = rewriteValue(href);
            if (nextHref !== href) node.setAttribute('href', nextHref);
          }
          if (node.hasAttribute('data-article-url')) {
            const val = node.getAttribute('data-article-url');
            const nextVal = rewriteValue(val);
            if (nextVal !== val) node.setAttribute('data-article-url', nextVal);
          }
        });
      }

      rewrite(document);

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) rewrite(node);
          });
          if (mutation.type === 'attributes' && (mutation.attributeName === 'href' || mutation.attributeName === 'data-article-url')) {
            rewrite(mutation.target.parentElement || document);
          }
        });
      });

      observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['href', 'data-article-url']
      });
    })();