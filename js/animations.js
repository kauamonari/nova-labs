/* ==========================================================================
   NØVA LABS — Scroll reveal animations
   ========================================================================== */

function initScrollReveal(){
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noIO = typeof IntersectionObserver === "undefined";

  if (prefersReduced || noIO) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  // Safety net: if a layout quirk (e.g. a resized/printed/automated
  // viewport) means an element never registers as intersecting, don't
  // let content stay invisible forever.
  window.setTimeout(() => {
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
      el.classList.add("is-visible");
    });
  }, 2500);
}

/* Auto-tag common sections with staggered reveal if not already tagged */
function autoTagReveal(){
  document.querySelectorAll(".card-grid > *, .projects-grid > *, .process-list > *, .info-grid > *").forEach((el, i) => {
    if (!el.hasAttribute("data-reveal")) {
      el.setAttribute("data-reveal", "");
      el.setAttribute("data-reveal-delay", String((i % 4) + 1));
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  autoTagReveal();
  initScrollReveal();
});
