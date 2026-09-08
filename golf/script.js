window.dataLayer = window.dataLayer || [];
    function trackEvent(eventName){ window.dataLayer.push({event:eventName}); }

const b=document.querySelector('.menu'),m=document.getElementById('mobile-nav');
    const closeMenu=()=>{b.setAttribute('aria-expanded','false');m.hidden=true};
    b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));m.hidden=o});
    m.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));