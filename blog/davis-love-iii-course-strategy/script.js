tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { 900: '#071b2e', 800: '#0c2842', 700: '#173a58' },
            gold: { 300: '#dbc584', 400: '#c7aa58', 500: '#a98834' },
            ivory: '#f7f3e8',
            ink: '#172332'
          },
          fontFamily: {
            display: ['Georgia', 'Times New Roman', 'serif'],
            body: ['Arial', 'Helvetica', 'sans-serif']
          },
          boxShadow: { editorial: '0 22px 60px rgba(7,27,46,.16)' }
        }
      }
    };

// ===== MOBILE NAVIGATION =====
    // Purpose: Toggles the compact navigation on small screens.
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    function setMenuState(isOpen) {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      mobileMenu.classList.toggle('hidden', !isOpen);
    }
    menuButton.addEventListener('click', function () {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
      }
    });
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    // ===== DATALAYER EVENT TRACKING =====
    // Purpose: Pushes requested click-event names without requiring a GA ID.
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

// ===== EDITORIAL SCROLL REVEALS =====
    // Purpose: Adds restrained motion to summary cards and calls to action.
    AOS.init({ once: true, duration: 700, offset: 80 });