document.addEventListener("DOMContentLoaded", () => {
  closeAllModals();
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  const span = document.getElementById("span");
  const input = document.getElementById("pesquisar");

  if (query) {
    span.textContent = query;

    const origem = urlParams.get("by");
    if (origem !== "card") input.value = query;
  }
});
