document.addEventListener("DOMContentLoaded", () => {
  const btnConcluir = document.getElementById("concluir");

  btnConcluir.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(".card-input");

    const titulo = inputs[0].value.trim();
    const descricao = inputs[1].value.trim();
    const urlVideo = inputs[2].value.trim();

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario || !usuario.id) {
      alert("Erro: nenhum usuário logado encontrado.");
      return;
    }

    const dados = {
      titulo,
      descricao,
      urlVideo,
      denuncia: 0,
      like: 0,
      dislike: 0,
      id_usuario: usuario.id,
      nome_usuario: usuario.nome_completo,
    };

    try {
      await fetch("/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      window.location.href = "/";
    } catch (erro) {
      console.log(erro);
    }
  });
});
