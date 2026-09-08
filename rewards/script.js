const menu=document.getElementById('menu'),mobile=document.getElementById('mobileNav');
menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
window.dataLayer=window.dataLayer||[];
document.querySelectorAll('a[href*="/wallet/join/"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'rewards_join_click'})));
document.querySelectorAll('a[href*="/p/S48UZA4"]').forEach(a=>a.addEventListener('click',e=>{
  if(!e.currentTarget.closest('header') && !e.currentTarget.closest('main') && !e.currentTarget.closest('footer')) return;
  window.dataLayer.push({event:'rewards_click'});
}));
document.querySelectorAll('a[href*="/p/S6jARJrr"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'tee_time_click'})));
document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'phone_click'})));
document.querySelectorAll('a[href*="members.eaglespointegc.com"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'member_login_click'})));
document.querySelectorAll('a[href*="/p/WSYbZ2a6q"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'privacy_click'})));
document.querySelectorAll('a[href*="/p/UrkWi8r"]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:'outings_click'})));