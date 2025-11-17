document.addEventListener("DOMContentLoaded", () => {
  closeAllModals();
});

document.getElementById("pesquisa")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const valor = document.getElementById("pesquisar").value.trim();
  if (valor) {
    window.location.href = `/recomendacao?query=${encodeURIComponent(valor)}`;
  }
});
