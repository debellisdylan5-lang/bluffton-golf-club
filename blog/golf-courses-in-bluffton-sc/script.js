tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { 950: '#071927', 900: '#0b2335', 800: '#12344a' },
            gold: { 500: '#b99045', 400: '#d0ab62', 200: '#ead8ad' },
            ivory: '#f8f4e9'
          },
          fontFamily: {
            display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
          },
          boxShadow: { editorial: '0 22px 60px rgba(7,25,39,.14)' }
        }
      }
    };

// ===== SCROLL REVEALS =====
    if (window.AOS) {
      AOS.init({ once: true, duration: 700, offset: 80 });
    }

    // ===== MOBILE NAVIGATION =====
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    menuButton.addEventListener('click', function () {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('hidden');
    });

    // ===== DATALAYER LINK EVENTS =====
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

(function () {
      const hostname = location.hostname;
      const isExactPayMeGPT = hostname === 'paymegpt.com';
      const isGitHubPages = hostname.endsWith('github.io');
      const prefix = isExactPayMeGPT ? '' : (isGitHubPages ? '/bluffton-golf-club' : '');

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

      function rewriteUrl(value) {
        if (!value || typeof value !== 'string') return value;
        const base = value.split('#')[0].split('?')[0];
        const mapped = routes[base];
        if (!mapped) return value;
        const suffix = value.slice(base.length);
        return prefix + mapped + suffix;
      }

      function rewriteRoot(root) {
        if (isExactPayMeGPT) return;

        root.querySelectorAll('a[href]').forEach(function (a) {
          const href = a.getAttribute('href');
          if (!href) return;
          if (href.startsWith('https://paymegpt.com/objects/') || href.startsWith('https://paymegpt.com/forms/') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
          if (href.includes('members.eaglespointegc.com') || href.includes('golfscape')) return;

          const newHref = rewriteUrl(href);
          if (newHref !== href) a.setAttribute('href', newHref);
        });

        root.querySelectorAll('[data-article-url]').forEach(function (el) {
          const val = el.getAttribute('data-article-url');
          const newVal = rewriteUrl(val);
          if (newVal !== val) el.setAttribute('data-article-url', newVal);
        });
      }

      rewriteRoot(document);

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            rewriteRoot(node);
          });
          if (mutation.type === 'attributes') {
            const target = mutation.target;
            if (target && target.nodeType === 1) rewriteRoot(target.parentElement || document);
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