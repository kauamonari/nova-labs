/* ==========================================================================
   NØVA LABS — Mobile menu
   ========================================================================== */

function initMobileMenu(){
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const closeBtn = document.querySelector("[data-menu-close]");
  if (!toggle || !mobileNav) return;

  const openMenu = () => {
    mobileNav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileNav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", initMobileMenu);
