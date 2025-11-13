document.getElementById("btnSimExit")?.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  localStorage.removeItem("fotoPerfil");
  window.location.href = "../pages/index.html";
});
