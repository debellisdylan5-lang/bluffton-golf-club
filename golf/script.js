window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MXRJCSN55F');

window.dataLayer = window.dataLayer || [];
    function trackEvent(eventName){ window.dataLayer.push({event:eventName}); }

const b=document.querySelector('.menu'),m=document.getElementById('mobile-nav');
    const setMenuState=(open)=>{b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close navigation':'Toggle navigation');m.hidden=!open};
    const closeMenu=()=>setMenuState(false);
    b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';setMenuState(!o)});
    m.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',(e)=>{if(e.key==='Escape') closeMenu()});

(() => {
      const exactMap = new Map([
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
          if (href.includes('members.blufftongc.com') || href.includes('golfscape') || href.includes('wallet') || href.includes('join')) return;
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

(function(){function boot(){if(document.getElementById('bgc-unified-shell'))return;
document.querySelectorAll('nav[data-section="navbar"],header.site-header,header.topbar,.bgc-canonical-nav,.bgc-main-nav').forEach(function(el){el.style.display='none';});
var path=location.pathname.replace(/\/$/,'')||'/';var links=[['Golf','/golf'],['Membership','/membership'],['Lessons','/lessons'],['Outings','/outings'],['Blog','/blog'],['Contact','/contact']];var make=function(label,url){return '<a href="https://blufftongc.com'+url+'"'+(path===url?' aria-current="page"':'')+'>'+label+'</a>'};var shell=document.createElement('div');shell.id='bgc-unified-shell';shell.innerHTML='<div class="bgc-unified-nav"><a class="bgc-unified-logo" href="https://blufftongc.com/" aria-label="Bluffton Golf Club home"><img src="https://paymegpt.com/objects/quick-uploads/1257/5e32ab36c69024a9.png" alt="Bluffton Golf Club"></a><div class="bgc-unified-links">'+links.map(function(x){return make(x[0],x[1])}).join('')+'</div><div class="bgc-unified-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div><button class="bgc-unified-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div><div class="bgc-unified-mobile-menu" aria-label="Mobile navigation">'+links.map(function(x){return make(x[0],x[1])}).join('')+'<div class="bgc-unified-mobile-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div></div>';document.body.insertBefore(shell,document.body.firstChild);var b=shell.querySelector('button'),menu=shell.querySelector('.bgc-unified-mobile-menu');b.addEventListener('click',function(){var open=menu.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'×':'☰';b.setAttribute('aria-label',open?'Close menu':'Open menu')});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();})();