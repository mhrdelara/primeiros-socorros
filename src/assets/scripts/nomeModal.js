document.addEventListener("DOMContentLoaded", () => {
  const nomeCompleto = document.querySelector("#nome_completo");
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  console.log("Usuário logado:", usuarioLogado);

  if (nomeCompleto) {
    nomeCompleto.textContent = usuarioLogado.nome_completo || "Usuário";
  }
});
