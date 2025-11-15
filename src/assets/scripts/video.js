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
  const main = document.querySelector(".pai-videos");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const dados = await response.json();

    dados.forEach((data) => {
      const dataFormatada = new Date(data.data_postagem).toLocaleDateString(
        "pt-BR"
      );

      main.innerHTML += `
        <a href="/tela-video" class="filho-videos">
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
