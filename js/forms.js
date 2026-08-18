/* ==========================================================================
   NØVA LABS — Forms
   Static hosting has no backend, so every form assembles a pre-filled
   WhatsApp message and opens it in a new tab. Fields are validated with
   native HTML5 constraints (required, type=email, etc.) before sending.
   ========================================================================== */

function setStatus(statusEl, type, message){
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `form-status is-visible is-${type}`;
}

function buildBudgetMessage(data){
  const lines = [
    "Olá, NØVA LABS! Gostaria de solicitar um orçamento.",
    "",
    `Nome / Empresa: ${data.name || "-"}`,
    `WhatsApp: ${data.whatsapp || "-"}`,
    `E-mail: ${data.email || "-"}`,
    `Empresa: ${data.company || "-"}`,
    `Serviço desejado: ${data.service || "-"}`,
    `Tipo de projeto: ${data.projectType || "-"}`,
    `Orçamento estimado: ${data.budget || "-"}`,
    `Prazo desejado: ${data.deadline || "-"}`,
    "",
    `Descrição do projeto: ${data.description || "-"}`
  ];
  return lines.join("\n");
}

function buildContactMessage(data){
  const lines = [
    "Olá, NØVA LABS! Vim pelo site e gostaria de falar com a equipe.",
    "",
    `Nome: ${data.name || "-"}`,
    `E-mail: ${data.email || "-"}`,
    "",
    `Mensagem: ${data.message || "-"}`
  ];
  return lines.join("\n");
}

function handleFormSubmit(form, messageBuilder, successText){
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector("[type=submit]");
    const statusEl = form.querySelector("[data-form-status]");

    if (submitBtn) submitBtn.classList.add("is-loading");

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const message = messageBuilder(data);
    const link = buildWhatsAppLink(message);

    // Small delay so the loading state is perceptible — this is a real
    // action (opening WhatsApp), not decoration.
    window.setTimeout(() => {
      if (submitBtn) submitBtn.classList.remove("is-loading");
      setStatus(statusEl, "success", successText);
      window.open(link, "_blank", "noopener");
      form.reset();
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const budgetForm = document.querySelector("[data-form='budget']");
  if (budgetForm) {
    handleFormSubmit(
      budgetForm,
      buildBudgetMessage,
      "Solicitação recebida! Vamos abrir o WhatsApp para você confirmar o envio — nossa equipe responde em até 24 horas."
    );
  }

  const contactForm = document.querySelector("[data-form='contact']");
  if (contactForm) {
    handleFormSubmit(
      contactForm,
      buildContactMessage,
      "Mensagem pronta! Vamos abrir o WhatsApp para você confirmar o envio."
    );
  }
});
