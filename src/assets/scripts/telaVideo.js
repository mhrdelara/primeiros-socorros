function getVideoIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function extrairIDYoutube(url) {
  try {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

async function carregarVideo() {
  const id = getVideoIdFromUrl();
  if (!id) {
    console.error("ID do vídeo não encontrado");
    return;
  }

  try {
    const res = await fetch(`https://6lrndh-3001.csb.app/video/${id}`);
    if (!res.ok) throw new Error("Erro ao carregar vídeo");

    const video = await res.json();
    montarVideoNaTela(video);
  } catch (erro) {
    console.error("Erro carregando vídeo:", erro);
  }
}

function montarVideoNaTela(video) {
  const player = document.getElementById("video");
  const youtubeID = extrairIDYoutube(video.urlVideo);

  // Inserir o player do YouTube
  player.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/${youtubeID}"
      frameborder="0" 
      allowfullscreen
    ></iframe>

    <div id="bandeira">
      <button id="btnDenunciaFlag">
        <img src="/images/icons/flag-inativo.svg" alt="Denunciar"/>
      </button>
    </div>
  `;

  document.querySelector("#titulo h1").textContent = video.titulo;

  const desc = document.getElementById("text-descricao");
  desc.textContent = video.descricao || "Sem descrição.";

  const data = new Date(video.data_postagem).toLocaleDateString("pt-BR");
  document
    .querySelector("#texto h1")
    .insertAdjacentHTML(
      "afterend",
      `<p style="margin-top: -15px; opacity: .7">Postado em ${data}</p>`
    );

  document.getElementById("user-foto").src =
    video.foto_perfil || "/images/default-user.png";
  document.getElementById("user-nome").textContent =
    video.nome_usuario || "Usuário";
  document.getElementById("user-funcao").textContent =
    video.funcao_usuario || "Função não informada";

  const materiaisContainer = document.getElementById("materiais");
  if (materiaisContainer && video.materiais.length > 0) {
    materiaisContainer.innerHTML = video.materiais
      .map(
        (m) =>
          `<a href="${m}" target="_blank" class="material-link"> ${m
            .split("/")
            .pop()}</a>`
      )
      .join("<br>");
  }

  configurarLike(video);
}

function configurarLike(video) {
  const btn = document.getElementById("like-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("liked");
  });
}

carregarVideo();
