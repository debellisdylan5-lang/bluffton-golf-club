tailwind.config = {
      theme: {
        extend: {
          colors: {
            pine: '#071B3A',
            charcoal: '#102447',
            ivory: '#F7F6F2',
            brass: '#C7A35B'
          },
          fontFamily: {
            sans: ['Inter', 'Arial', 'sans-serif'],
            serif: ['Cormorant Garamond', 'Georgia', 'serif']
          }
        }
      }
    }

(function () {
        if (!window.dataLayer || !Array.isArray(window.dataLayer)) return;
        const pushFooterEvent = (action, label) => {
          window.dataLayer.push({
            event: 'footer_click',
            footer_action: action,
            footer_label: label
          });
        };
        const bind = (id, action, label) => {
          const el = document.getElementById(id);
          if (!el) return;
          el.addEventListener('click', () => pushFooterEvent(action, label));
        };
        bind('footer-tee-time', 'tee_time', 'Book a Tee Time');
        bind('footer-member-login', 'member_login', 'Member Login');
        const phoneLink = document.querySelector('a[href="tel:8437575900"]');
        if (phoneLink) phoneLink.addEventListener('click', () => pushFooterEvent('phone', '(843) 757-5900'));
      })();

AOS.init({ once: true, duration: 700, offset: 80 });