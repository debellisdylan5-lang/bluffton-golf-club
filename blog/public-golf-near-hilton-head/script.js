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