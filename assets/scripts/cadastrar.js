const usuario = {
  nome: nomeInput.value,
  sobrenome: sobrenomeInput.value,
  data_nascimento: data_nascimentoInput.value,
  crm: crmInput.value,
  funcao: nomeInput.value,
  email: emailInput.value,
  foto: localStorage.getItem("fotoPerfil") || "",
};

// Salva no localStorage para manter sessão
localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

// Redireciona para a tela inicial
window.location.href = "../pages/index.html";
