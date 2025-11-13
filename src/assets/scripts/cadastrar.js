document.addEventListener("DOMContentLoaded", () => {
  const nomeInput = document.querySelector("#nome");
  const sobrenomeInput = document.querySelector("#sobrenome");
  const data_nascimentoInput = document.querySelector("#data_nascimento");
  const crmInput = document.querySelector("#crm");
  const funcaoInput = document.querySelector("#funcao");
  const emailInput = document.querySelector("#email");
  const btnCadastrar = document.querySelector("#concluir");

  btnCadastrar.addEventListener("click", (e) => {
    e.preventDefault();

    const usuario = {
      nome: nomeInput.value.trim(),
      sobrenome: sobrenomeInput.value.trim(),
      data_nascimento: data_nascimentoInput.value,
      crm: crmInput.value.trim(),
      funcao: funcaoInput.value.trim(),
      email: emailInput.value.trim(),
      foto: localStorage.getItem("fotoPerfil") || "",
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    window.location.href = "../pages/tela-validacao.html";
  });
});
