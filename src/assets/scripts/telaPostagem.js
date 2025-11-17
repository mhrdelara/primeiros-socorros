// telaPostagem.js — versão robusta que resolve o erro anexoUrl undefined
document.addEventListener("DOMContentLoaded", () => {
  const btnConcluir = document.getElementById("concluir");
  if (!btnConcluir) return;

  // util: lê um File e retorna dataURL (base64)
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  // util async: resolve a URL/base64 do anexo a partir de várias fontes
  async function resolveAnexoUrl() {
    // 1) variável global pré-existente (compatibilidade)
    if (window.anexoUrl) return window.anexoUrl;

    // 2) campo de texto com link (opcional)
    const inputLink = document.getElementById("anexo-url");
    if (inputLink && inputLink.value.trim()) return inputLink.value.trim();

    // 3) input file com id "anexo-file" → converte para base64
    const inputFile = document.getElementById("anexo-file");
    if (inputFile && inputFile.files && inputFile.files.length > 0) {
      try {
        const file = inputFile.files[0];
        const dataUrl = await fileToDataURL(file); // ex: data:application/pdf;base64,....
        return dataUrl;
      } catch (err) {
        console.error("Erro convertendo arquivo:", err);
        return null;
      }
    }

    // nenhum anexo encontrado
    return null;
  }

  btnConcluir.addEventListener("click", async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    console.log("Usuário logado:", usuario);

    if (!usuario || !usuario.id) {
      alert("Erro: nenhum usuário logado encontrado.");
      console.warn("usuarioLogado está assim:", usuario);
      return;
    }

    const inputs = document.querySelectorAll(".card-input");
    const titulo = (inputs[0] && inputs[0].value.trim()) || "";
    const descricao = (inputs[1] && inputs[1].value.trim()) || "";
    const urlVideo = (inputs[2] && inputs[2].value.trim()) || "";

    if (!titulo || !descricao || !urlVideo) {
      alert("Preencha todos os campos antes de postar.");
      return;
    }

    // tenta resolver um possível anexo (link ou file -> base64)
    let materialId = null;
    let anexoResolved = null;

    try {
      anexoResolved = await resolveAnexoUrl();
    } catch (err) {
      console.error("Erro ao resolver anexo:", err);
      alert("Erro ao processar o anexo. Tenta de novo.");
      return;
    }

    // se encontrou anexo (string não vazia), cria material e pega id
    if (anexoResolved) {
      try {
        const respMat = await fetch("/material", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ anexo: anexoResolved }),
        });

        if (!respMat.ok) {
          const text = await respMat.text().catch(() => "");
          console.error(
            "Resposta inválida ao criar material:",
            respMat.status,
            text
          );
          alert("Não foi possível anexar o material. Verifique o console.");
          return;
        }

        const matJson = await respMat.json();
        materialId = matJson.id;
        console.log("Material criado com id:", materialId);
      } catch (error) {
        console.error("Erro ao criar material:", error);
        alert("Não foi possível anexar o material.");
        return;
      }
    }

    const id_usuario = Number(usuario.id);

    const dados = {
      titulo,
      descricao,
      urlVideo,
      denuncia: 0,
      like: 0,
      dislike: 0,
      id_usuario,
      material_id: materialId, // null se não houver anexo
    };

    try {
      const resposta = await fetch("/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const json = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        console.error("Erro ao postar vídeo:", resposta.status, json);
        alert("Não foi possível postar o vídeo. Veja o console para detalhes.");
        return;
      }

      alert("Vídeo postado com sucesso!");
      window.location.href = "/";
    } catch (erro) {
      console.error("Erro de rede:", erro);
      alert("Ocorreu um erro ao tentar postar o vídeo.");
    }
  });
});
