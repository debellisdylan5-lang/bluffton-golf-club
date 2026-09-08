tailwind.config = {
      theme: {
        extend: {
          colors: {
            ivory: '#F7F3E9',
            navy: '#10283F',
            gold: '#B69350',
            ink: '#273744'
          },
          fontFamily: {
            display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
            sans: ['Inter', 'Arial', 'sans-serif']
          }
        }
      }
    };

// ===== MOBILE NAVIGATION =====
    // Purpose: Opens and closes the compact navigation on smaller screens.
    // Triggers: Menu button clicks and Escape key presses.
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    function setMenuState(isOpen) {
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      mobileMenu.classList.toggle('hidden', !isOpen);
      openIcon.classList.toggle('hidden', isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
    }

    menuButton.addEventListener('click', function () {
      setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenuState(false);
    });

    // ===== LIGHTWEIGHT ANALYTICS EVENT BRIDGE =====
    // Purpose: Normalizes click tracking via data-track attributes without changing the UI.
    window.dataLayer = window.dataLayer || [];

    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[data-track]');
      if (!link) return;

      window.dataLayer.push({
        event: link.dataset.track,
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    }, true);

// ===== SCROLL REVEALS =====
    // Purpose: Adds subtle motion to the policy layout without affecting readability.
    AOS.init({ once: true, duration: 700, offset: 80 });