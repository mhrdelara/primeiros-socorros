function gerarIframe(link, titulo = "YouTube video player") {
  const videoIdMatch = link.match(/[?&]v=([^&#]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  return `
    <iframe 
      width="212"
      height="120"
      src="https://www.youtube.com/embed/${videoId}"
      title="${titulo}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  `;
}

const API_URL = "/video";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = (urlParams.get("query") || "").toLowerCase();

  const main = document.querySelector(".pai-videos");
  const span = document.getElementById("span");

  if (query) span.textContent = query;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const dados = await response.json();

    const filtrados = query
      ? dados.filter((d) => d.titulo.toLowerCase().includes(query))
      : dados;

    main.innerHTML = "";

    if (filtrados.length === 0) {
      main.innerHTML = `
        <p style="color:#777; text-align:center; width:100%;">
          Nenhum vídeo encontrado${
            query ? ` para "<strong>${query}</strong>"` : ""
          }
        </p>
      `;
      return;
    }

    filtrados.forEach((data) => {
      const dataFormatada = data.data_postagem
        ? new Date(data.data_postagem).toLocaleDateString("pt-BR")
        : "";

      main.innerHTML += `
        <a href="/tela-video?id=${data.id}" class="filho-videos">
          <div class="video">${gerarIframe(data.urlVideo, data.titulo)}</div>

          <div class="quadrado">
            <div class="sub-quadrado">
              <h1>${data.titulo}</h1>
              <p>${dataFormatada}</p>
            </div>

            <p>${data.nome_usuario}</p>
          </div>
        </a>
      `;
    });
  } catch (error) {
    console.error("Erro na requisição:", error.message);
  }
});
