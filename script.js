const SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzkU3Q8TFp7u51h8ICicW9FkCndlz7XldlXczAPa4QUAYNNY4PU8b7GjR9zSxeltVwiuQ/exec";

const form = document.getElementById("rsvp-form");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submit-btn");

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.classList.remove("ok", "err");
  if (type) {
    statusEl.classList.add(type);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!SHEETS_WEB_APP_URL || SHEETS_WEB_APP_URL.includes("COLE_AQUI")) {
    setStatus("Configure a URL do Google Sheets no arquivo script.js.", "err");
    return;
  }

  const data = new FormData(form);
  const payload = {
    nome: data.get("nome")?.toString().trim() || "",
    telefone: data.get("telefone")?.toString().trim() || "",
    mensagem: data.get("mensagem")?.toString().trim() || "",
  };

  const body = new URLSearchParams(payload);

  submitBtn.disabled = true;
  setStatus("Enviando confirmação...");

  try {
    await fetch(SHEETS_WEB_APP_URL, {
      method: "POST",
      body,
      mode: "no-cors",
    });

    setStatus("Presença registrada com sucesso. Obrigado!", "ok");
    form.reset();
  } catch (error) {
    console.error(error);
    setStatus("Não foi possível enviar agora. Tente novamente em instantes.", "err");
  } finally {
    submitBtn.disabled = false;
  }
});
