const menuToggle = document.getElementById('menu-toggle');
    const primaryMenu = document.getElementById('primary-menu');
    if (menuToggle && primaryMenu) {
      function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        primaryMenu.classList.remove('is-open');
      }

      function openMenu() {
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close navigation');
        primaryMenu.classList.add('is-open');
      }

      menuToggle.addEventListener('click', function () {
        const open = menuToggle.getAttribute('aria-expanded') === 'true';
        if (open) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
          closeMenu();
          menuToggle.focus();
        }
      });

      primaryMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth < 1024) {
            closeMenu();
          }
        });
      });
    }

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

AOS.init({ once: true, duration: 700, offset: 80 });