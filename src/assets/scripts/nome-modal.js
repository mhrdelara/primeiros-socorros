document.addEventListener("DOMContentLoaded", () => {
  const nome = document.querySelector("#nome");
  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "{}"
  );

  console.log("Usuário logado:", usuarioLogado);

  if (nome) {
    if (usuarioLogado.nome && usuarioLogado.nome !== "") {
      nome.textContent = usuarioLogado.nome;
    } else {
      nome.textContent = "Usuário";
    }
  }
});
