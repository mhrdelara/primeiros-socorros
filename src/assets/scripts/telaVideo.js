function safeGet(id) { return document.getElementById(id); }

function getVideoIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function extrairIDYoutube(url) {
  try {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch { return null; }
}

/* ==========================
        CARREGAR VIDEO
========================== */
async function carregarVideo() {
  const id = getVideoIdFromUrl();
  if (!id) return console.error("ID do vídeo não encontrado");

  const res = await fetch(`/video/${id}`);
  const video = await res.json();
  montarVideoNaTela(video);
}

function montarVideoNaTela(video) {
  const player = safeGet("video");
  const youtubeID = extrairIDYoutube(video.urlVideo);

  player.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${youtubeID}" frameborder="0" allowfullscreen></iframe>
    <div id="bandeira">
      <button id="btnDenunciaFlag">
        <img id="imgFlag" src="/images/icons/flag-inativo.svg" alt="Denunciar"/>
      </button>
    </div>
  `;

  safeGet("titulo").querySelector("h1").textContent = video.titulo;
  safeGet("text-descricao").innerText = video.descricao || "Sem descrição.";
  const data = new Date(video.data_postagem).toLocaleDateString("pt-BR");
  document.querySelector(".data").innerHTML = `<p id="data">${data}</p>`;
  safeGet("foto-perfil").src = video.foto_perfil || "/images/icons/3d_avatar_1.svg";
  safeGet("info-user").textContent = `${video.nome_usuario || "Usuário"} - ${video.funcao_usuario || "Função não informada"}`;

  configurarLike(video);
  configurarDenuncia(video);
}

/* ==========================
        LIKE / DESLIKE
========================== */
function atualizarIcones(estado) {
  const like = safeGet("like-img");
  const likeV = safeGet("like-img-vermelho");
  const des = safeGet("deslike-img");
  const desV = safeGet("deslike-img-vermelho");

  like.classList.toggle("hidden", estado.like);
  likeV.classList.toggle("hidden", !estado.like);
  des.classList.toggle("hidden", estado.deslike);
  desV.classList.toggle("hidden", !estado.deslike);
}

async function toggleLike(id, estado) {
  if (estado.like) {
    await fetch(`/like/unlike/${id}`);
    estado.like = false;
  } else {
    if (estado.deslike) {
      await fetch(`/like/undislike/${id}`);
      estado.deslike = false;
    }
    await fetch(`/like/like/${id}`);
    estado.like = true;
  }
  localStorage.setItem(`reacao_${id}`, JSON.stringify(estado));
  atualizarIcones(estado);
}

async function toggleDeslike(id, estado) {
  if (estado.deslike) {
    await fetch(`/like/undislike/${id}`);
    estado.deslike = false;
  } else {
    if (estado.like) {
      await fetch(`/like/unlike/${id}`);
      estado.like = false;
    }
    await fetch(`/like/dislike/${id}`);
    estado.deslike = true;
  }
  localStorage.setItem(`reacao_${id}`, JSON.stringify(estado));
  atualizarIcones(estado);
}

function configurarLike(video) {
  const id = video.id;
  let estado = JSON.parse(localStorage.getItem(`reacao_${id}`)) || { like: false, deslike: false };
  atualizarIcones(estado);
  safeGet("like").onclick = () => toggleLike(id, estado);
  safeGet("deslike").onclick = () => toggleDeslike(id, estado);
}

function abrirModal() {
  const modal = safeGet("modal-denuncia");
  if (!modal) return;
  modal.classList.remove("hidden-modal");
}

function fecharModal() {
  const modal = safeGet("modal-denuncia");
  if (!modal) return;
  modal.classList.add("hidden-modal");
}

function atualizarIconeDenuncia(btnDenuncia, denunciado) {
  if (!btnDenuncia) return;
  const img = btnDenuncia.querySelector("img");
  if (!img) return;
  img.src = denunciado ? "/images/icons/flag-ativo.svg" : "/images/icons/flag-inativo.svg";
}

async function toggleDenuncia(id, estado, btnDenuncia) {
  if (estado.denunciado) {
    await fetch(`/denuncia/undenunciar/${id}`);
    estado.denunciado = false;
    atualizarIconeDenuncia(btnDenuncia, false);
    fecharModal();
  } else {
    await fetch(`/denuncia/denunciar/${id}`);
    estado.denunciado = true;
    atualizarIconeDenuncia(btnDenuncia, true);
    abrirModal();
  }
  localStorage.setItem(`denuncia_${id}`, JSON.stringify(estado));
}

function configurarDenuncia(video) {
  const id = video.id;
  const btnDenuncia = safeGet("btnDenunciaFlag");
  const modal = safeGet("modal-denuncia");
  const overlay = modal ? modal.querySelector(".modal-overlay") : null;
  const card = modal ? modal.querySelector(".modal-card") : null;

  let estado = JSON.parse(localStorage.getItem(`denuncia_${id}`)) || { denunciado: false };
  atualizarIconeDenuncia(btnDenuncia, estado.denunciado);

  if (btnDenuncia) btnDenuncia.onclick = () => toggleDenuncia(id, estado, btnDenuncia);

  if (overlay) overlay.addEventListener("click", () => fecharModal());
  if (card) card.addEventListener("click", e => e.stopPropagation());

  if (modal && !estado.denunciado) modal.classList.add("hidden-modal");
}
carregarVideo();
