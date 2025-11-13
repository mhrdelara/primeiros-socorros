document.addEventListener("DOMContentLoaded", () => {
  const btnSair = document.getElementById("btnSimExit");
  const btnExcluir = document.getElementById("btnSimDelete");

  function limparConta() {
    localStorage.removeItem("fotoPerfil");
    localStorage.removeItem("usuarioLogado");

    window.location.href = "../pages/index.html";
  }

  if (btnSair) {
    btnSair.addEventListener("click", () => {
      limparConta();
    });
  }

  if (btnExcluir) {
    btnExcluir.addEventListener("click", () => {
      limparConta();
    });
  }
});
