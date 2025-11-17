function gerarIframeEmBigger(link, titulo = "YouTube video player") {
  const videoIdMatch = link.match(/[?&]v=([^&#]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  return `
        <iframe 
          width="100%"
          height="480"
          src="https://www.youtube.com/embed/${videoId}"
          title="${titulo}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      `;
}

async function fetchVideoById(id) {
  const res = await fetch(`/video/${id}`);
  if (!res.ok) throw new Error(`Erro ao buscar vídeo: ${res.status}`);
  return res.json();
}

async function fetchMaterial(id) {
  const res = await fetch(`/material/${id}`);
  if (!res.ok) return null;
  return res.json();
}

async function fetchVideosAll() {
  const res = await fetch(`/video`);
  if (!res.ok) throw new Error(`Erro ao buscar vídeos: ${res.status}`);
  return res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    document.querySelector("main").innerText = "Vídeo não especificado.";
    return;
  }

  try {
    const video = await fetchVideoById(id);

    // player
    const videoContainer = document.getElementById("video");
    videoContainer.innerHTML = gerarIframeEmBigger(
      video.urlVideo,
      video.titulo
    );

    // título
    const h1 = document.querySelector("#esquerda h1");
    if (h1) h1.textContent = video.titulo;

    const userDiv = document.getElementById("user");
    if (userDiv) {
      const foto = video.usuario?.foto_perfil || "/images/icons/avatar.svg";
      const nome = video.usuario?.nome_completo || "Autor";
      const funcao = video.usuario?.funcao || "Profissional";

      userDiv.innerHTML = `
            <img src="${foto}" alt="Foto do autor" />
            <p>${nome} - ${funcao}</p>
          `;
    }

    const textoDiv = document.getElementById("texto");
    textoDiv.innerHTML = `
          <h1>Descrição</h1>
          <p>${video.descricao || ""}</p>
        `;

    if (video.id_material) {
      const material = await fetchMaterial(video.id_material);

      if (material) {
        const div = document.createElement("div");
        div.className = "material-block";

        div.innerHTML = `
              <h2>Material</h2>
              <a href="${material.anexo}" target="_blank" class="material-file">
                <div class="file-icon">📄</div>
                <div class="file-info">
                  <div class="file-name">Material do vídeo</div>
                  <div class="file-meta">${
                    material.data_postagem
                      ? new Date(material.data_postagem).toLocaleDateString(
                          "pt-BR"
                        )
                      : ""
                  }</div>
                </div>
              </a>
            `;

        textoDiv.appendChild(div);
      }
    }

    // recomendações
    const all = await fetchVideosAll();
    const relacionados = all.filter((v) => v.id !== video.id).slice(0, 5);

    const paiVideos = document.querySelector(".pai-videos");
    paiVideos.innerHTML = "";

    relacionados.forEach((v) => {
      const dataFormatada = v.data_postagem
        ? new Date(v.data_postagem).toLocaleDateString("pt-BR")
        : "";

      paiVideos.innerHTML += `
            <a href="/tela-video?id=${v.id}" class="filho-videos">
              <div class="video" style="width:212px;height:120px;">
                <iframe width="212" height="120" src="https://www.youtube.com/embed/${
                  (v.urlVideo.match(/[?&]v=([^&#]+)/) || [])[1] || ""
                }" frameborder="0" allowfullscreen></iframe>
              </div>
    
              <div class="quadrado">
                <div class="sub-quadrado">
                  <h1>${v.titulo}</h1>
                  <p>${dataFormatada}</p>
                </div>
                <p>${v.usuario?.nome_completo || ""}</p>
              </div>
            </a>
          `;
    });
  } catch (err) {
    console.error(err);
    document.querySelector("main").innerText = "Erro ao carregar o vídeo.";
  }
});
