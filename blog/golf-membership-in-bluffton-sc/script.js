tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { 950: '#071722', 900: '#0b2232', 800: '#123247' },
            gold: { 300: '#e3c982', 400: '#c9a95f', 500: '#ab883f' },
            ivory: '#f8f4ea',
            ink: '#17232b'
          },
          fontFamily: {
            serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
          },
          boxShadow: {
            editorial: '0 22px 60px rgba(7,23,34,.13)'
          }
        }
      }
    };

// ===== DATA LAYER EVENT TRACKING =====
    // Purpose: Sends requested click-event names without adding a Google Analytics ID.
    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('[data-event]').forEach(function (link) {
      link.addEventListener('click', function () {
        window.dataLayer.push({
          event: link.getAttribute('data-event'),
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      });
    });

    window.bgcEditorialEvents = {
      membership_click: 'membership_click',
      membership_form_click: 'membership_form_click',
      tee_time_click: 'tee_time_click',
      lessons_click: 'lessons_click',
      member_login_click: 'member_login_click'
    };

    // ===== MOBILE MENU =====
    // Purpose: Toggles the navigation on small screens and closes it after selection.
    var menuButton = document.getElementById('menuButton');
    var mainMenu = document.getElementById('mainMenu');
    function setMenuState(isOpen) {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      if (isOpen) {
        mainMenu.classList.remove('hidden');
      } else {
        mainMenu.classList.add('hidden');
      }
    }
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        menuButton.focus();
      }
    });
    mainMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
          setMenuState(false);
          menuButton.focus();
        }
      });
    });

// ===== EDITORIAL SCROLL REVEALS =====
    // Purpose: Adds restrained entrance motion to supporting content.
    AOS.init({ once: true, duration: 700, offset: 80 });