tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { 950: '#071722', 900: '#0b2232', 800: '#123247' },
            gold: { 300: '#e3c982', 400: '#c9a95f', 500: '#ab883f' },
            ivory: '#f8f4ea',
            ink: '#17232b'
          },
          fontFamily: {
            serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
          },
          boxShadow: {
            editorial: '0 22px 60px rgba(7,23,34,.13)'
          }
        }
      }
    };

// ===== DATA LAYER EVENT TRACKING =====
    // Purpose: Sends requested click-event names without adding a Google Analytics ID.
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

    window.bgcEditorialEvents = {
      membership_click: 'membership_click',
      membership_form_click: 'membership_form_click',
      tee_time_click: 'tee_time_click',
      lessons_click: 'lessons_click',
      member_login_click: 'member_login_click'
    };

    // ===== MOBILE MENU =====
    // Purpose: Toggles the navigation on small screens and closes it after selection.
    var menuButton = document.getElementById('menuButton');
    var mainMenu = document.getElementById('mainMenu');
    function setMenuState(isOpen) {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      if (isOpen) {
        mainMenu.classList.remove('hidden');
      } else {
        mainMenu.classList.add('hidden');
      }
    }
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        menuButton.focus();
      }
    });
    mainMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
          setMenuState(false);
          menuButton.focus();
        }
      });
    });

// ===== EDITORIAL SCROLL REVEALS =====
    // Purpose: Adds restrained entrance motion to supporting content.
    AOS.init({ once: true, duration: 700, offset: 80 });

(function () {
      var ROUTES = {
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

      var EXACT_HOST = 'paymegpt.com';
      var GH_PREFIX = '/bluffton-golf-club';

      function getPrefix() {
        var host = location.hostname;
        if (host === EXACT_HOST) return null;
        if (host === 'www.' + EXACT_HOST) return null;
        if (host.slice(-10) === 'github.io') return GH_PREFIX;
        return '';
      }

      function buildPath(path) {
        var prefix = getPrefix();
        if (prefix === null) return null;
        return prefix + path;
      }

      function rewriteUrl(url) {
        if (!url) return url;
        var base = url.split('#')[0].split('?')[0];
        var target = ROUTES[base];
        if (!target) return url;
        var suffix = url.slice(base.length);
        var rewritten = buildPath(target);
        if (rewritten === null) return url;
        return rewritten + suffix;
      }

      function shouldSkipHref(href) {
        return !href ||
          href.indexOf('https://paymegpt.com/objects/') === 0 ||
          href.indexOf('https://paymegpt.com/forms/') === 0 ||
          href.indexOf('https://paymegpt.com/wallet/') === 0 ||
          href.indexOf('https://paymegpt.com/join/') === 0 ||
          href.indexOf('mailto:') === 0 ||
          href.indexOf('tel:') === 0 ||
          href.indexOf('https://members.eaglespointegc.com') === 0 ||
          href.indexOf('https://golfscape.com') === 0 ||
          href.indexOf('https://www.golfscape.com') === 0;
      }

      function rewriteRoot(root) {
        if (getPrefix() === null) return;
        var nodes = root.querySelectorAll ? root.querySelectorAll('a[href], [data-article-url]') : [];
        for (var i = 0; i < nodes.length; i++) {
          var el = nodes[i];
          if (el.tagName === 'A') {
            var href = el.getAttribute('href');
            if (!shouldSkipHref(href)) {
              el.setAttribute('href', rewriteUrl(href));
            }
          }
          if (el.hasAttribute && el.hasAttribute('data-article-url')) {
            var articleUrl = el.getAttribute('data-article-url');
            if (articleUrl && ROUTES[articleUrl.split('#')[0].split('?')[0]]) {
              el.setAttribute('data-article-url', rewriteUrl(articleUrl));
            }
          }
        }
      }

      function init() {
        rewriteRoot(document);

        var observer = new MutationObserver(function (mutations) {
          for (var i = 0; i < mutations.length; i++) {
            var added = mutations[i].addedNodes;
            for (var j = 0; j < added.length; j++) {
              var node = added[j];
              if (node.nodeType === 1) rewriteRoot(node);
            }
          }
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })();