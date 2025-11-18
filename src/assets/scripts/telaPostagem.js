document.addEventListener("DOMContentLoaded", () => {
  const btnConcluir = document.getElementById("concluir");
  if (!btnConcluir) return;

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  async function resolveAnexoUrl() {
    const inputFile = document.getElementById("pdf");
    if (inputFile?.files?.length) {
      return await fileToDataURL(inputFile.files[0]);
    }
    return null;
  }

  btnConcluir.addEventListener("click", async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario?.id) return alert("Usuário não logado.");

    const titulo = document.getElementById("titulo")?.value.trim();
    const descricao = document.getElementById("descricao")?.value.trim();
    const urlVideo = document.getElementById("video")?.value.trim();

    if (!titulo || !descricao || !urlVideo)
      return alert("Preencha todos os campos.");

    let novoVideo;
    try {
      const respVideo = await fetch(`/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          titulo,
          descricao,
          urlVideo,
          id_usuario: usuario.id,
        }),
      });

      if (!respVideo.ok) throw new Error("Erro criando vídeo");
      novoVideo = await respVideo.json();
    } catch (err) {
      console.error(err);
      return alert("Não foi possível criar o vídeo.");
    }

    const anexoResolved = await resolveAnexoUrl();
    if (anexoResolved) {
      try {
        await fetch(`/material`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            anexo: anexoResolved,
            videoId: novoVideo.id,
          }),
        });
      } catch (err) {
        console.error(err);
        alert("Vídeo criado, mas falha ao anexar material.");
      }
    }

    alert("Vídeo postado com sucesso!");
    window.location.href = "/";
  });
});
