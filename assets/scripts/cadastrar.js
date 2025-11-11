const usuario = {
  nome: nomeInput.value,
  sobrenome: sobrenomeInput.value,
  data_nascimento: data_nascimentoInput.value,
  crm: crmInput.value,
  funcao: nomeInput.value,
  email: emailInput.value,
  foto: localStorage.getItem("fotoPerfil") || "",
};

localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

window.location.href = "../pages/index.html";
