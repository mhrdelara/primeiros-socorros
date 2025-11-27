document.addEventListener("DOMContentLoaded", () => {
  const links = [
    {
      texto: "Reanimação",
      link: "Reanimação",
      img: "/images/icons/reanimacao.jpg",
    },
    {
      texto: "Ferimentos",
      link: "Ferimentos",
      img: "/images/icons/feridas-joelho.jpg",
    },
    {
      texto: "Engasgo",
      link: "Engasgo",
      img: "/images/icons/engasgo.jpg",
    },
    { texto: "AVC", link: "AVC", img: "/images/icons/avc.jpg" },
    {
      texto: "Crise Ansie.",
      link: "Crise de Ansiedade",
      img: "/images/icons/crise-de-ansiedade.png",
    },
  ];

  const section = document.querySelector("section");
  if (!section) return;

  section.innerHTML = links
    .map(
      (l) => `
        <a
          href="/recomendacao?query=${encodeURIComponent(l.link)}&by=card"
          class="son-quadrado"
        >
          <div class="quadrado-video" style="
            backdrop-filter: blur(4px);
            background-position: center;
            background-size: cover;
            background-image: url('${l.img}')"></div>
          <p>${l.texto}</p>
        </a>
      `
    )
    .join("");
});
