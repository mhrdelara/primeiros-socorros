function atualizarIcones(estado) {
  const like = document.getElementById("like-img");
  const likeV = document.getElementById("like-img-vermelho");
  const des = document.getElementById("deslike-img");
  const desV = document.getElementById("deslike-img-vermelho");

  like.classList.toggle("hidden", estado.like);
  likeV.classList.toggle("hidden", !estado.like);

  des.classList.toggle("hidden", estado.deslike);
  desV.classList.toggle("hidden", !estado.deslike);
}

async function toggleLike(id, estado) {
  if (estado.like) {
    // tirar like
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

  let estado = JSON.parse(localStorage.getItem(`reacao_${id}`)) || {
    like: false,
    deslike: false,
  };

  atualizarIcones(estado);

  document.getElementById("like").onclick = () => toggleLike(id, estado);
  document.getElementById("deslike").onclick = () => toggleDeslike(id, estado);
}
