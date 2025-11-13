function gerarIframe(link, titulo = "YouTube video player") {
  const videoIdMatch = link.match(/[?&]v=([^&#]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    throw new Error("Link inválido do YouTube");
  }

  const iframe = `
  <iframe 
    width="560" 
    height="315" 
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

function trocarVideo(iframe) {
  document.querySelector(".video").innerHTML = iframe;
}
trocarVideo(gerarIframe(link, titulo));
