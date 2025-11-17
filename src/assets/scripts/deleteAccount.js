document.addEventListener("DOMContentLoaded", () => {
  const btnSair = document.getElementById("btnSimExit");
  const btnExcluir = document.getElementById("btnSimDelete");

  function limparConta() {
    localStorage.removeItem("fotoPerfil");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  }

  async function excluirUsuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const userId = usuario?.id;

    if (!userId) {
      alert("Erro: ID do usuário não encontrado!");
      return;
    }

    try {
      const response = await fetch(`/usuario/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      alert("Conta excluída com sucesso!");
      limparConta();
    } catch (err) {
      console.error(err);
      alert("Não foi possível excluir a conta.");
    }
  }

  if (btnSair) {
    btnSair.addEventListener("click", () => limparConta());
  }

  if (btnExcluir) {
    btnExcluir.addEventListener("click", () => excluirUsuario());
  }
});
