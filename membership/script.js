window.dataLayer = window.dataLayer || [];
function bgcTrack(eventName){ window.dataLayer.push({event:eventName}); }

const navToggle = document.getElementById('nav-toggle');
const navToggleLabel = document.querySelector('.nav label[for="nav-toggle"]');
if (navToggle && navToggleLabel) {
  const syncNavState = () => {
    const expanded = navToggle.checked ? 'true' : 'false';
    navToggle.setAttribute('aria-expanded', expanded);
    navToggleLabel.setAttribute('aria-expanded', expanded);
    navToggleLabel.setAttribute('aria-label', navToggle.checked ? 'Close navigation' : 'Open navigation');
  };
  const toggleNav = () => {
    navToggle.checked = !navToggle.checked;
    navToggle.dispatchEvent(new Event('change', { bubbles: true }));
  };
  navToggle.addEventListener('change', syncNavState);
  navToggleLabel.addEventListener('click', syncNavState);
  navToggleLabel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleNav();
    }
  });
  syncNavState();
}