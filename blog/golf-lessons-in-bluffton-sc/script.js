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

(function () {
      const routes = {
        "https://blufftongc.com/": "/",
        "https://blufftongc.com/golf": "/golf/",
        "https://blufftongc.com/membership": "/membership/",
        "https://blufftongc.com/lessons": "/lessons/",
        "https://blufftongc.com/outings": "/outings/",
        "https://blufftongc.com/blog": "/blog/",
        "https://blufftongc.com/contact": "/contact/",
        "https://blufftongc.com/book-tee-times": "/book-tee-times/",
        "https://blufftongc.com/privacy": "/privacy/",
        "https://blufftongc.com/rewards": "/rewards/",
        "https://blufftongc.com/blog/public-golf-near-hilton-head": "/blog/public-golf-near-hilton-head/",
        "https://blufftongc.com/blog/golf-courses-in-bluffton-sc": "/blog/golf-courses-in-bluffton-sc/",
        "https://blufftongc.com/blog/davis-love-iii-course-strategy": "/blog/davis-love-iii-course-strategy/",
        "https://blufftongc.com/blog/golf-lessons-in-bluffton-sc": "/blog/golf-lessons-in-bluffton-sc/",
        "https://blufftongc.com/blog/lowcountry-golf-guide": "/blog/lowcountry-golf-guide/",
        "https://blufftongc.com/blog/golf-membership-in-bluffton-sc": "/blog/golf-membership-in-bluffton-sc/"
      };

      function getPrefix() {
        if (location.hostname === "paymegpt.com") return null;
        if (location.hostname.endsWith("github.io")) return "/bluffton-golf-club";
        return "";
      }

      function rewriteUrl(url) {
        const base = url.split("#")[0].split("?")[0];
        const mapped = routes[base];
        if (!mapped) return url;
        const suffix = url.slice(base.length);
        const prefix = getPrefix();
        if (prefix === null) return url;
        return prefix + mapped + suffix;
      }

      function shouldRewriteHref(href) {
        return Object.prototype.hasOwnProperty.call(routes, href.split("#")[0].split("?")[0]);
      }

      function rewriteElement(el) {
        const href = el.getAttribute("href");
        if (href && shouldRewriteHref(href)) {
          el.setAttribute("href", rewriteUrl(href));
        }
        const articleUrl = el.getAttribute("data-article-url");
        if (articleUrl && shouldRewriteHref(articleUrl)) {
          el.setAttribute("data-article-url", rewriteUrl(articleUrl));
        }
      }

      function rewriteAll(root) {
        root.querySelectorAll('a[href], [data-article-url]').forEach(rewriteElement);
      }

      rewriteAll(document);

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            if (node.matches && (node.matches("a[href]") || node.matches("[data-article-url]"))) {
              rewriteElement(node);
            }
            if (node.querySelectorAll) rewriteAll(node);
          });
          if (mutation.type === "attributes" && mutation.target && mutation.target.nodeType === 1) {
            rewriteElement(mutation.target);
          }
        });
      });

      observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["href", "data-article-url"]
      });
    })();