document.addEventListener("DOMContentLoaded", () => {
  const links = [
    { texto: "Reanimação", link: "Reanimação" },
    { texto: "Ferimentos", link: "Ferimentos" },
    { texto: "Engasgo", link: "Engasgo" },
    { texto: "AVC", link: "AVC" },
    { texto: "Crise Ansie.", link: "Crise de Ansiedade" },
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
          <div class="quadrado-video"></div>
          <p>${l.texto}</p>
        </a>
      `
    )
    .join("");
});
