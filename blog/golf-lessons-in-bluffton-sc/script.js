tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { 800: "#10263a", 900: "#081a2a", 950: "#05121d" },
            gold: { 400: "#cfad66", 500: "#b9954f", 600: "#98753a" },
            ivory: "#f8f4e9",
            ink: "#17212a"
          },
          fontFamily: {
            display: ["Georgia", "Cambria", "Times New Roman", "serif"],
            sans: ["Inter", "Arial", "sans-serif"]
          },
          boxShadow: {
            editorial: "0 22px 60px rgba(5,18,29,.14)"
          }
        }
      }
    };

const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    menuButton.addEventListener("click", function () {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuButton.setAttribute("aria-expanded", String(!isOpen));
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll("[data-event]").forEach(function (element) {
      element.addEventListener("click", function () {
        window.dataLayer.push({
          event: element.getAttribute("data-event"),
          link_url: element.href || "",
          link_text: element.textContent.trim()
        });
      });
    });

    window.bgcEditorialEvents = [
      "golf_page_click",
      "membership_click",
      "lessons_click",
      "tee_time_click",
      "tee_time_phone_click",
      "phone_click",
      "outings_click",
      "contact_click",
      "member_login_click",
      "blog_click",
      "privacy_click"
    ];

AOS.init({ once: true, duration: 700, offset: 80 });