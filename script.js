(() => {
  const init = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll(".reveal");

    if (reduce || !("IntersectionObserver" in window)) {
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
        { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
      );
      revealItems.forEach((item) => observer.observe(item));
    }

    const button = document.querySelector(".menu-button");
    const menu = document.querySelector("#mobile-nav");
    if (!button || !menu) return;

    const close = () => {
      menu.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    };

    button.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
