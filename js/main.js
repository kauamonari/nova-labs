/* ==========================================================================
   NØVA LABS — Site configuration & shared behavior
   Edit SITE_CONFIG below to update contact details across the whole site.
   ========================================================================== */

const SITE_CONFIG = {
  whatsapp: "5511912456408", // digits only, country + area code, no symbols
  whatsappDefaultMessage: "Olá! Tudo bem? Conheci a NØVA LABS pelo site e gostaria de solicitar um orçamento e saber mais sobre os serviços.",
  email: "suporte@novalabsbr.com",
  phoneDisplay: "(11) 91245-6408",
  location: "São Paulo, SP — Atendimento Global",
  instagram: "" // add handle (without @) if/when available
};

function buildWhatsAppLink(message){
  const text = encodeURIComponent(message || SITE_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${text}`;
}

/* Wire up every element flagged as a WhatsApp CTA */
function initWhatsAppLinks(){
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const customMsg = el.getAttribute("data-wa-message");
    el.setAttribute("href", buildWhatsAppLink(customMsg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  document.querySelectorAll("[data-wa-float]").forEach((el) => {
    el.setAttribute("href", buildWhatsAppLink());
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* Fill in mailto / phone / location placeholders */
function initContactFields(){
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = SITE_CONFIG.email;
    if (el.tagName === "A") el.setAttribute("href", `mailto:${SITE_CONFIG.email}`);
  });
  document.querySelectorAll("[data-phone]").forEach((el) => {
    el.textContent = SITE_CONFIG.phoneDisplay;
    if (el.tagName === "A") el.setAttribute("href", `tel:+${SITE_CONFIG.whatsapp}`);
  });
  document.querySelectorAll("[data-location]").forEach((el) => {
    el.textContent = SITE_CONFIG.location;
  });
}

/* Header shadow/blur state on scroll */
function initHeaderScrollState(){
  const header = document.querySelector(".site-header");
  if (!header) return;
  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* Current-page nav highlight */
function initActiveNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initContactFields();
  initHeaderScrollState();
  initActiveNav();
});
