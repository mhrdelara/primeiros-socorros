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

  const res = await fetch(`/video/${id}`);

  const video = await res.json();
  montarVideoNaTela(video);
}

function montarVideoNaTela(video) {
  console.log(video);
  const player = document.getElementById("video");
  const youtubeID = extrairIDYoutube(video.urlVideo);

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
  desc.innerText = video.descricao || "Sem descrição.";

  const data = new Date(video.data_postagem).toLocaleDateString("pt-BR");
  document.querySelector(".data").innerHTML = `<p id="data">${data}</p>`;

  document.getElementById("foto-perfil").src =
    video.foto_perfil || "/images/icons/3d_avatar_1.svg";
  document.getElementById("info-user").textContent = `${
    video.nome_usuario || "Usuário"
  } - ${video.funcao_usuario || "Função não informada"}`;

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
  const btn = document.getElementById("like");
  if (!btn) return;

  console.log("ok");
  btn.addEventListener("click", () => {
    fetch(`/video/like/${video.id}`, {
      headers: {
        Authenticate: "gfhj",
      },
    });
  });
}

carregarVideo();
