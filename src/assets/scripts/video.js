function gerarIframe(link, titulo = "YouTube video player") {
  const videoIdMatch = link.match(/[?&]v=([^&#]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const iframe = `
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

  return iframe.trim();
}

const link = "https://www.youtube.com/watch?v=d8N1udiLwLk";
const titulo = "Meu novo vídeo";
console.log(gerarIframe(link, titulo));

API_URL = "/video";

addEventListener("DOMContentLoaded", async () => {
  let main = document.querySelector(".pai-videos");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const dados = await response.json();
    dados.map((data) => {
      main.innerHTML += `
              <a href="/tela-video" class="filho-videos">
              <div class="video">${
                (gerarIframe(data.urlVideo), data.titulo)
              }</div>

              <div class="quadrado">
                <div class="sub-quadrado">
                  <h1>${data.titulo}</h1>
                  <p>${data.data_postagem}</p>
                  <p></p>
                </div>

                <p>${data.descricao}</p>
                <p></p>
              </div>
            </a>
      `;
      console.log(data);
    });
    console.log("tessss");
  } catch (error) {
    console.error("Erro na requisição:", error.message);
  }
});
