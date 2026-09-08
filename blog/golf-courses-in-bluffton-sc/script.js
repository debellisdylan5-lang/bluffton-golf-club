tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { 950: '#071927', 900: '#0b2335', 800: '#12344a' },
            gold: { 500: '#b99045', 400: '#d0ab62', 200: '#ead8ad' },
            ivory: '#f8f4e9'
          },
          fontFamily: {
            display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
          },
          boxShadow: { editorial: '0 22px 60px rgba(7,25,39,.14)' }
        }
      }
    };

// ===== SCROLL REVEALS =====
    AOS.init({ once: true, duration: 700, offset: 80 });

    // ===== MOBILE NAVIGATION =====
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    menuButton.addEventListener('click', function () {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('hidden');
    });

    // ===== DATALAYER LINK EVENTS =====
    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('[data-event]').forEach(function (link) {
      link.addEventListener('click', function () {
        window.dataLayer.push({
          event: link.dataset.event,
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      });
    });