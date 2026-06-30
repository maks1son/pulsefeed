(() => {
  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  };

  ready(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealItems = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.18 }
      );
      revealItems.forEach((item) => observer.observe(item));
    }

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#nav-menu");
    const menuLinks = menu ? menu.querySelectorAll("a") : [];

    const closeMenu = () => {
      if (!toggle || !menu) return;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });

      menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
      });
    }

    document.querySelectorAll(".faq-item").forEach((item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!button || !answer) return;

      button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".faq-question").forEach((otherButton) => {
          otherButton.setAttribute("aria-expanded", "false");
        });
        document.querySelectorAll(".faq-answer").forEach((otherAnswer) => {
          otherAnswer.style.maxHeight = "0px";
        });

        if (!isOpen) {
          button.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  });
})();
