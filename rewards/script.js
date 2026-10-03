window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MXRJCSN55F');

const menu=document.getElementById('menu'),mobile=document.getElementById('mobileNav');
menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
window.dataLayer=window.dataLayer||[];
document.querySelectorAll('a[href*="/wallet/join/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'rewards_join_click'})));
document.querySelectorAll('a[href*="blufftongc.com/book-tee-times"], a[href*="/book-tee-times/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'tee_time_click'})));
document.querySelectorAll('a[href*="members.blufftongc.com"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'member_login_click'})));
document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'phone_click'})));
document.querySelectorAll('a[href*="blufftongc.com/contact"], a[href*="/contact/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'contact_click'})));
document.querySelectorAll('a[href*="blufftongc.com/membership"], a[href*="/membership/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'membership_click'})));
document.querySelectorAll('a[href*="blufftongc.com/lessons"], a[href*="/lessons/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'lessons_click'})));
document.querySelectorAll('a[href*="blufftongc.com/outings"], a[href*="/outings/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'outings_click'})));
document.querySelectorAll('a[href*="blufftongc.com/privacy"], a[href*="/privacy/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'privacy_click'})));
document.querySelectorAll('a[href*="blufftongc.com/golf"], a[href*="/golf/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'golf_page_click'})));
document.querySelectorAll('a[href*="blufftongc.com/blog"], a[href*="/blog/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'blog_click'})));
document.querySelectorAll('a[href*="blufftongc.com/rewards"], a[href*="/rewards/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'rewards_click'})));

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
      if(href.includes('/objects/')||href.includes('/forms/')||href.includes('/wallet/join/')||href.startsWith('tel:')||href.startsWith('mailto:')||href.includes('members.blufftongc.com')||href.includes('golfscape')||href.startsWith('http')&& !href.startsWith('https://paymegpt.com/p/')) return;
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

(function(){function boot(){if(document.getElementById('bgc-unified-shell'))return;
document.querySelectorAll('nav[data-section="navbar"],header.site-header,header.topbar,.bgc-canonical-nav,.bgc-main-nav').forEach(function(el){el.style.display='none';});
var path=location.pathname.replace(/\/$/,'')||'/';var links=[['Golf','/golf'],['Membership','/membership'],['Lessons','/lessons'],['Outings','/outings'],['Blog','/blog'],['Contact','/contact']];var make=function(label,url){return '<a href="https://blufftongc.com'+url+'"'+(path===url?' aria-current="page"':'')+'>'+label+'</a>'};var shell=document.createElement('div');shell.id='bgc-unified-shell';shell.innerHTML='<div class="bgc-unified-nav"><a class="bgc-unified-logo" href="https://blufftongc.com/" aria-label="Bluffton Golf Club home"><img src="https://paymegpt.com/objects/quick-uploads/1257/5e32ab36c69024a9.png" alt="Bluffton Golf Club"></a><div class="bgc-unified-links">'+links.map(function(x){return make(x[0],x[1])}).join('')+'</div><div class="bgc-unified-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div><button class="bgc-unified-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div><div class="bgc-unified-mobile-menu" aria-label="Mobile navigation">'+links.map(function(x){return make(x[0],x[1])}).join('')+'<div class="bgc-unified-mobile-actions"><a href="https://members.blufftongc.com/">Member Login</a><a href="https://blufftongc.com/book-tee-times/">Book a Tee Time</a></div></div>';document.body.insertBefore(shell,document.body.firstChild);var b=shell.querySelector('button'),menu=shell.querySelector('.bgc-unified-mobile-menu');b.addEventListener('click',function(){var open=menu.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'×':'☰';b.setAttribute('aria-label',open?'Close menu':'Open menu')});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();})();