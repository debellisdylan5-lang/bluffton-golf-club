tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#071C2C',
            navysoft: '#102D40',
            gold: '#B99755',
            goldlight: '#D5BF8A',
            ivory: '#F7F3E9',
            ink: '#1B292E'
          },
          fontFamily: {
            display: ['Georgia', 'Times New Roman', 'serif'],
            body: ['Arial', 'Helvetica', 'sans-serif']
          },
          boxShadow: {
            editorial: '0 24px 70px rgba(7,28,44,.16)'
          }
        }
      }
    };

AOS.init({ once: true, duration: 700, offset: 80 });

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      mobileMenu.hidden = isOpen;
    });

    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('[data-track]').forEach(function (link) {
      link.addEventListener('click', function () {
        window.dataLayer.push({
          event: link.getAttribute('data-track'),
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      });
    });