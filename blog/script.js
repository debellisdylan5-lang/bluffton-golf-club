window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

(function(){
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobile-menu');
  if(btn && panel){
    btn.addEventListener('click', function(){
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && panel.classList.contains('open')){
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation');
        btn.focus();
      }
    });
  }

  function bindClick(selector, eventName, label){
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('click', function(){
        window.dataLayer.push({
          event: eventName,
          article_title: label || this.textContent.trim()
        });
      });
    });
  }

  bindClick('.article-link', 'article_click');
  bindClick('#teeTimeTop, #teeTimeMobile, #teeTimeBottom, #teeTimeFooter, #teeTimeSticky', 'tee_time_click', 'Book a Tee Time');
  bindClick('#memberLoginTop, #memberLoginMobile, #memberLoginFooter', 'member_login_click', 'Member Login');
  bindClick('a[href^="tel:"]', 'phone_click');

  bindClick('.navlinks a[href="https://paymegpt.com/p/7kEfQDVgfm"], .bgc-site-footer__link[href="https://paymegpt.com/p/7kEfQDVgfm"]', 'golf_page_click', 'Golf');
  bindClick('.navlinks a[href="https://paymegpt.com/p/5c8a7v9Aa"], .bgc-site-footer__link[href="https://paymegpt.com/p/5c8a7v9Aa"]', 'membership_click', 'Membership');
  bindClick('.navlinks a[href="https://paymegpt.com/p/BbtfDrfYx"], .bgc-site-footer__link[href="https://paymegpt.com/p/BbtfDrfYx"]', 'lessons_click', 'Lessons');
  bindClick('.navlinks a[href="https://paymegpt.com/p/UrkWi8r"], .bgc-site-footer__link[href="https://paymegpt.com/p/UrkWi8r"]', 'outings_click', 'Outings');
  bindClick('.navlinks a[href="https://paymegpt.com/p/fHpcvCS2Y"], .bgc-site-footer__link[href="https://paymegpt.com/p/fHpcvCS2Y"]', 'blog_click', 'Blog');
  bindClick('.navlinks a[href="https://paymegpt.com/p/fDMLxwZ8"], .bgc-site-footer__link[href="https://paymegpt.com/p/fDMLxwZ8"], .mobile-sticky-actions a.secondary[href="https://paymegpt.com/p/fDMLxwZ8"]', 'contact_click', 'Contact');
  bindClick('.bgc-site-footer__link[href="https://paymegpt.com/p/WSYbZ2a6q"], #privacyPolicyFooter', 'privacy_click', 'Privacy Policy');


})();