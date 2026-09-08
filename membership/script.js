window.dataLayer = window.dataLayer || [];
function bgcTrack(eventName){ window.dataLayer.push({event:eventName}); }

const navToggle = document.getElementById('nav-toggle');
const navToggleLabel = document.querySelector('.nav label[for="nav-toggle"]');
if (navToggle && navToggleLabel) {
  const syncNavState = () => {
    const expanded = navToggle.checked ? 'true' : 'false';
    navToggle.setAttribute('aria-expanded', expanded);
    navToggleLabel.setAttribute('aria-expanded', expanded);
    navToggleLabel.setAttribute('aria-label', navToggle.checked ? 'Close navigation' : 'Open navigation');
  };
  const toggleNav = () => {
    navToggle.checked = !navToggle.checked;
    navToggle.dispatchEvent(new Event('change', { bubbles: true }));
  };
  navToggle.addEventListener('change', syncNavState);
  navToggleLabel.addEventListener('click', syncNavState);
  navToggleLabel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNav();
    }
  });
  syncNavState();
}

(() => {
  const BGC_PAGE_MAP = new Map([
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

  const isPayMeGPTHost = location.hostname === 'paymegpt.com';
  const isGitHubPages = location.hostname.endsWith('github.io');
  const prefix = isGitHubPages ? '/bluffton-golf-club' : '';

  function rewriteUrl(raw) {
    try {
      const url = new URL(raw, location.href);
      const mapped = BGC_PAGE_MAP.get(url.origin + url.pathname);
      if (!mapped) return raw;
      const path = mapped === '/' ? prefix + '/' : prefix + mapped;
      return path + url.search + url.hash;
    } catch {
      return raw;
    }
  }

  function rewriteAttribute(node, attr) {
    if (!node.hasAttribute || !node.hasAttribute(attr)) return;
    const raw = node.getAttribute(attr);
    if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('#')) return;
    if (attr === 'href' && (raw.includes('/objects/') || raw.includes('/forms/') || raw.includes('members.eaglespointegc.com'))) return;
    const next = rewriteUrl(raw);
    if (next !== raw) node.setAttribute(attr, next);
  }

  function rewriteAll(root = document) {
    root.querySelectorAll('a[href], [data-article-url]').forEach((node) => {
      rewriteAttribute(node, node.tagName === 'A' ? 'href' : 'data-article-url');
    });
  }

  if (isPayMeGPTHost) return;

  const start = () => {
    rewriteAll();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches && (node.matches('a[href]') || node.matches('[data-article-url]'))) {
            rewriteAttribute(node, node.tagName === 'A' ? 'href' : 'data-article-url');
          }
          rewriteAll(node);
        });
        if (mutation.type === 'attributes' && mutation.target && mutation.target.nodeType === 1) {
          const target = mutation.target;
          if (target.matches('a[href]')) rewriteAttribute(target, 'href');
          if (target.matches('[data-article-url]')) rewriteAttribute(target, 'data-article-url');
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['href', 'data-article-url']
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();