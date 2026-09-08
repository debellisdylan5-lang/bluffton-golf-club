window.dataLayer = window.dataLayer || [];
    function trackEvent(eventName){ window.dataLayer.push({event:eventName}); }

const b=document.querySelector('.menu'),m=document.getElementById('mobile-nav');
    const closeMenu=()=>{b.setAttribute('aria-expanded','false');m.hidden=true};
    b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));m.hidden=o});
    m.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

(() => {
      const exactMap = new Map([
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

      const basePrefix = location.hostname === 'paymegpt.com'
        ? ''
        : location.hostname.endsWith('github.io')
          ? '/bluffton-golf-club'
          : '';

      const buildUrl = (path) => basePrefix + path;

      const rewriteNode = (node) => {
        if (!node || node.nodeType !== 1) return;
        const anchors = node.matches && node.matches('a[href]') ? [node] : Array.from(node.querySelectorAll ? node.querySelectorAll('a[href]') : []);
        anchors.forEach((a) => {
          const href = a.getAttribute('href');
          if (!href) return;
          if (href.startsWith('/objects/') || href.startsWith('/forms/') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
          if (href.includes('members.eaglespointegc.com') || href.includes('golfscape') || href.includes('wallet') || href.includes('join')) return;
          const url = href.split('#')[0].split('?')[0];
          if (!exactMap.has(url)) return;
          if (location.hostname === 'paymegpt.com') return;
          const suffix = href.slice(url.length);
          a.setAttribute('href', buildUrl(exactMap.get(url)) + suffix);
        });

        const dataNodes = node.matches && node.matches('[data-article-url]') ? [node] : Array.from(node.querySelectorAll ? node.querySelectorAll('[data-article-url]') : []);
        dataNodes.forEach((el) => {
          const val = el.getAttribute('data-article-url');
          if (!val) return;
          const url = val.split('#')[0].split('?')[0];
          if (!exactMap.has(url)) return;
          if (location.hostname === 'paymegpt.com') return;
          const suffix = val.slice(url.length);
          el.setAttribute('data-article-url', buildUrl(exactMap.get(url)) + suffix);
        });
      };

      const rewriteAll = () => rewriteNode(document.body);

      rewriteAll();

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach(rewriteNode);
        }
      });

      observer.observe(document.documentElement, { childList: true, subtree: true });
    })();