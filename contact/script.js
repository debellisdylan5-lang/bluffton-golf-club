window.dataLayer=window.dataLayer||[];function trackEvent(eventName,label){window.dataLayer.push({event:eventName,label:label||''});}

(function(){const btn=document.getElementById('menuBtn'),panel=document.getElementById('mobileMenu');if(!btn||!panel)return;function close(){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Open menu')}btn.addEventListener('click',()=>{const open=panel.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu')});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('resize',()=>{if(window.innerWidth>1024)close()})})();

(function(){
  const MAP={
    'https://paymegpt.com/p/SUpiU9p':'/',
    'https://paymegpt.com/p/7kEfQDVgfm':'/golf/',
    'https://paymegpt.com/p/5c8a7v9Aa':'/membership/',
    'https://paymegpt.com/p/BbtfDrfYx':'/lessons/',
    'https://paymegpt.com/p/UrkWi8r':'/outings/',
    'https://paymegpt.com/p/fHpcvCS2Y':'/blog/',
    'https://paymegpt.com/p/fDMLxwZ8':'/contact/',
    'https://paymegpt.com/p/S6jARJrr':'/book-tee-times/',
    'https://paymegpt.com/p/WSYbZ2a6q':'/privacy/',
    'https://paymegpt.com/p/S48UZA4':'/rewards/',
    'https://paymegpt.com/p/QdFmcQ':'/blog/public-golf-near-hilton-head/',
    'https://paymegpt.com/p/TVSWTAP':'/blog/golf-courses-in-bluffton-sc/',
    'https://paymegpt.com/p/Q4j95JW9HH':'/blog/davis-love-iii-course-strategy/',
    'https://paymegpt.com/p/AVRKGkLz':'/blog/golf-lessons-in-bluffton-sc/',
    'https://paymegpt.com/p/DVjf4mfhk':'/blog/lowcountry-golf-guide/',
    'https://paymegpt.com/p/iGQS8v':'/blog/golf-membership-in-bluffton-sc/'
  };
  const isPaymegpt=location.hostname==='paymegpt.com';
  const isGithubPages=location.hostname.endsWith('github.io');
  const prefix=isPaymegpt?'':(isGithubPages?'/bluffton-golf-club':'');
  function shouldRewrite(url){
    return Object.prototype.hasOwnProperty.call(MAP,url);
  }
  function rewrite(el){
    const href=el.getAttribute('href');
    if(href && shouldRewrite(href)){
      el.setAttribute('href',prefix+MAP[href]);
    }
    const dataUrl=el.getAttribute('data-article-url');
    if(dataUrl && shouldRewrite(dataUrl)){
      el.setAttribute('data-article-url',prefix+MAP[dataUrl]);
    }
  }
  function scan(root){
    root.querySelectorAll('a[href], [data-article-url]').forEach(rewrite);
  }
  if(!isPaymegpt){
    scan(document);
    const observer=new MutationObserver(mutations=>{
      for(const m of mutations){
        m.addedNodes.forEach(node=>{
          if(node.nodeType===1) scan(node);
        });
        if(m.type==='attributes' && m.target && m.target.nodeType===1) rewrite(m.target);
      }
    });
    observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['href','data-article-url']});
  }
})();