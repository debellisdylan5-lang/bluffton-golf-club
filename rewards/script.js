const menu=document.getElementById('menu'),mobile=document.getElementById('mobileNav');
menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
window.dataLayer=window.dataLayer||[];
document.querySelectorAll('a[href*="/wallet/join/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'rewards_join_click'})));
document.querySelectorAll('a[href*="blufftongc.com/book-tee-times"], a[href*="/book-tee-times/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'tee_time_click'})));
document.querySelectorAll('a[href*="members.eaglespointegc.com"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'member_login_click'})));
document.querySelectorAll('a[href*="blufftongc.com/contact"], a[href*="/contact/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'phone_click'})));
document.querySelectorAll('a[href*="blufftongc.com/membership"], a[href*="/membership/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'member_login_click'})));
document.querySelectorAll('a[href*="blufftongc.com/lessons"], a[href*="/lessons/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'rewards_click'})));
document.querySelectorAll('a[href*="blufftongc.com/outings"], a[href*="/outings/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'outings_click'})));
document.querySelectorAll('a[href*="blufftongc.com/privacy"], a[href*="/privacy/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'privacy_click'})));

(function(){
  const routes={
    'https://blufftongc.com/':'/',
    'https://blufftongc.com/golf':'/golf/',
    'https://blufftongc.com/membership':'/membership/',
    'https://blufftongc.com/lessons':'/lessons/',
    'https://blufftongc.com/outings':'/outings/',
    'https://blufftongc.com/blog':'/blog/',
    'https://blufftongc.com/contact':'/contact/',
    'https://blufftongc.com/book-tee-times':'/book-tee-times/',
    'https://blufftongc.com/privacy':'/privacy/',
    'https://blufftongc.com/rewards':'/rewards/',
    'https://blufftongc.com/blog/public-golf-near-hilton-head':'/blog/public-golf-near-hilton-head/',
    'https://blufftongc.com/blog/golf-courses-in-bluffton-sc':'/blog/golf-courses-in-bluffton-sc/',
    'https://blufftongc.com/blog/davis-love-iii-course-strategy':'/blog/davis-love-iii-course-strategy/',
    'https://blufftongc.com/blog/golf-lessons-in-bluffton-sc':'/blog/golf-lessons-in-bluffton-sc/',
    'https://blufftongc.com/blog/lowcountry-golf-guide':'/blog/lowcountry-golf-guide/',
    'https://blufftongc.com/blog/golf-membership-in-bluffton-sc':'/blog/golf-membership-in-bluffton-sc/'
  };
  const isPaymeHost=location.hostname==='paymegpt.com';
  const isGitHubPages=/\.github\.io$/i.test(location.hostname);
  const prefix=isPaymeHost?'':(isGitHubPages?'/bluffton-golf-club':'');
  const rewriteUrl=url=>{
    if(!url) return url;
    if(isPaymeHost) return url;
    try{
      const u=new URL(url,location.href);
      const key=u.origin+u.pathname;
      if(routes[key]){
        return prefix.replace(/\/$/,'') + routes[key].replace(/^\//,'') + u.search + u.hash;
      }
    }catch(e){}
    return url;
  };
  const rewriteRoot=root=>{
    root.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(!href) return;
      if(href.includes('/objects/')||href.includes('/forms/')||href.includes('/wallet/join/')||href.startsWith('tel:')||href.startsWith('mailto:')||href.includes('members.eaglespointegc.com')||href.includes('golfscape')||href.startsWith('http')&& !href.startsWith('https://paymegpt.com/p/')) return;
      a.href=rewriteUrl(href);
    });
    root.querySelectorAll('[data-article-url]').forEach(el=>{
      const val=el.getAttribute('data-article-url');
      if(val) el.setAttribute('data-article-url',rewriteUrl(val));
    });
  };
  rewriteRoot(document);
  const mo=new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1) rewriteRoot(n);})));
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();