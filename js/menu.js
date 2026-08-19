/* ==========================================================================
   NØVA LABS — Mobile menu
   ========================================================================== */

/* ==========================================================================
   NØVA LABS — Mobile menu

   Two iOS Safari–specific issues this fixes:
   1) `overflow: hidden` on <body> does NOT reliably stop background
      scroll/rubber-banding on iOS Safari. We lock scroll with
      `position: fixed` on <body> instead, and restore the exact
      scroll position on close.
   2) iOS Safari aggressively restores pages from the back/forward
      cache (bfcache) on swipe-back / forward navigation — including
      whatever inline styles and classes were present at the moment
      the page was left. If the menu was ever open when a visitor
      navigated away, a bfcache-restored page could come back with
      the menu stuck open or the scroll lock stuck on. We force a
      clean reset on the `pageshow` event when `event.persisted` is
      true, which only fires for bfcache restores.
   ========================================================================== */

function initMobileMenu(){
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const closeBtn = document.querySelector("[data-menu-close]");
  if (!toggle || !mobileNav) return;

  let lockedScrollY = 0;

  const openMenu = () => {
    lockedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    mobileNav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    mobileNav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, lockedScrollY);
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

  // Guarantee a clean slate if this page is restored from bfcache
  // (iOS Safari swipe-back/forward) instead of freshly loaded.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", initMobileMenu);
