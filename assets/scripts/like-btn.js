function mudarSvgLike() {
  const like = document.getElementById("like-img");
  const likeVermelho = document.getElementById("like-img-vermelho");
  const deslike = document.getElementById("deslike-img");
  const deslikeVermelho = document.getElementById("deslike-img-vermelho");

  if (!likeVermelho.classList.contains("hidden")) {
    likeVermelho.classList.add("hidden");
    like.classList.remove("hidden");
  } else {
    likeVermelho.classList.remove("hidden");
    like.classList.add("hidden");
    deslikeVermelho.classList.add("hidden");
    deslike.classList.remove("hidden");
  }
}

function mudarSvgDeslike() {
  const deslike = document.getElementById("deslike-img");
  const deslikeVermelho = document.getElementById("deslike-img-vermelho");
  const like = document.getElementById("like-img");
  const likeVermelho = document.getElementById("like-img-vermelho");

  if (!deslikeVermelho.classList.contains("hidden")) {
    deslikeVermelho.classList.add("hidden");
    deslike.classList.remove("hidden");
  } else {
    deslikeVermelho.classList.remove("hidden");
    deslike.classList.add("hidden");
    likeVermelho.classList.add("hidden");
    like.classList.remove("hidden");
  }
}
