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
      nome: nomeInput.value,
      sobrenome: sobrenomeInput.value,
      data_nascimento: data_nascimentoInput.value,
      crm: crmInput.value,
      funcao: funcaoInput.value,
      email: emailInput.value,
      foto: localStorage.getItem("fotoPerfil") || "",
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    window.location.href = "/tela-validacao";
  });
});
