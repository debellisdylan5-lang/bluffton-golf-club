tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#071C2C',
            navysoft: '#102D40',
            gold: '#B99755',
            goldlight: '#D5BF8A',
            ivory: '#F7F3E9',
            ink: '#1B292E'
          },
          fontFamily: {
            display: ['Georgia', 'Times New Roman', 'serif'],
            body: ['Arial', 'Helvetica', 'sans-serif']
          },
          boxShadow: {
            editorial: '0 24px 70px rgba(7,28,44,.16)'
          }
        }
      }
    };

AOS.init({ once: true, duration: 700, offset: 80 });

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      mobileMenu.hidden = isOpen;
    });

    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('[data-track]').forEach(function (link) {
      link.addEventListener('click', function () {
        window.dataLayer.push({
          event: link.getAttribute('data-track'),
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      });
    });

(function () {
      const BGC_PAGES = new Map([
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

      const currentHost = location.hostname;
      const isPayMeGPT = currentHost === 'paymegpt.com';
      const isGitHubPages = currentHost.endsWith('github.io');
      const prefix = isPayMeGPT ? '' : (isGitHubPages ? '/bluffton-golf-club' : '');

      function rewriteUrl(rawUrl) {
        if (!rawUrl) return rawUrl;
        if (!isPayMeGPT && !isGitHubPages) return rawUrl;
        const hashIndex = rawUrl.indexOf('#');
        const queryIndex = rawUrl.indexOf('?');
        const cutIndex = hashIndex === -1 ? queryIndex : (queryIndex === -1 ? hashIndex : Math.min(hashIndex, queryIndex));
        const base = cutIndex === -1 ? rawUrl : rawUrl.slice(0, cutIndex);
        const suffix = cutIndex === -1 ? '' : rawUrl.slice(cutIndex);
        if (!BGC_PAGES.has(base)) return rawUrl;
        return prefix + BGC_PAGES.get(base) + suffix;
      }

      function rewriteLinks(root) {
        root.querySelectorAll('a[href], [data-article-url]').forEach(function (el) {
          if (el.tagName === 'A') {
            const href = el.getAttribute('href');
            if (!href) return;
            if (
              href.startsWith('/objects/') ||
              href.startsWith('/forms/') ||
              href.startsWith('mailto:') ||
              href.startsWith('tel:') ||
              href.includes('members.eaglespointegc.com') ||
              href.includes('golfscape') ||
              /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href) && !href.startsWith('https://paymegpt.com/p/')
            ) {
              return;
            }
            const nextHref = rewriteUrl(href);
            if (nextHref !== href) el.setAttribute('href', nextHref);
          }
          const articleUrl = el.getAttribute('data-article-url');
          if (articleUrl) {
            const nextArticleUrl = rewriteUrl(articleUrl);
            if (nextArticleUrl !== articleUrl) el.setAttribute('data-article-url', nextArticleUrl);
          }
        });
      }

      rewriteLinks(document);

      const observer = new MutationObserver(function (mutations) {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) rewriteLinks(node);
          });
        }
      });

      observer.observe(document.documentElement, { childList: true, subtree: true });
    })();