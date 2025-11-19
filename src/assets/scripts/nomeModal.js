document.addEventListener("DOMContentLoaded", () => {
  const nomeCompleto = document.getElementById("nome_completo");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (nomeCompleto) {
    nomeCompleto.textContent = usuario.nome_completo || "Usuário";
  }

  console.log("Usuário logado:", usuario);
});
