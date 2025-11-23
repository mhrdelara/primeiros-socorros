const API_URL = "/video";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = (urlParams.get("query") || "").toLowerCase();
  const currentVideoId = Number(urlParams.get("id"));
  const span = document.getElementById("span");
  const main = document.querySelector(".pai-videos");

  if (span && query) span.textContent = urlParams.get("query");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro ao carregar vídeos: ${response.status}`);

    let dados = await response.json();

    // remover o vídeo que já está aberto
    dados = dados.filter(video => video.id !== currentVideoId);

    // filtrar por query
    const filtrados = query
      ? dados.filter(video => video.titulo.toLowerCase().includes(query))
      : dados;

    // ordenar por data e likes
    filtrados.sort((a, b) => {
      const dataA = a.data_postagem ? new Date(a.data_postagem) : new Date(0);
      const dataB = b.data_postagem ? new Date(b.data_postagem) : new Date(0);

      // se a data for diferente, mais recente primeiro
      if (dataB - dataA !== 0) return dataB - dataA;

      // se mesma data, ordenar por likes
      return (b.like || 0) - (a.like || 0);
    });

    main.innerHTML = "";

    if (filtrados.length === 0) {
      main.innerHTML = `
        <p style="color:#777; text-align:center; width:100%;">
          Nenhum vídeo encontrado ${query ? `para "<strong>${urlParams.get("query")}</strong>"` : ""}
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
          <div class="video">${data.titulo}</div>
          <div class="quadrado">
            <div class="sub-quadrado">
              <h1>${data.titulo}</h1>
              <p>${data.nome_usuario} - ${data.funcao}</p>
            </div>
            <p>${dataFormatada}</p>
          </div>
        </a>
      `;
    });
  } catch (err) {
    console.error("Erro ao carregar vídeos:", err.message);
    main.innerHTML = `
      <p style="color:red; text-align:center; width:100%;">
        Ocorreu um erro ao carregar os vídeos.
      </p>
    `;
  }
});
