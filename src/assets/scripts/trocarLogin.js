document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector(".header-down");
  const fotoSalva = localStorage.getItem("fotoPerfil");

  if (fotoSalva) {
    loginContainer.innerHTML = `
        <div class="foto-header">
          <img id="foto-header-perfil" src="${fotoSalva}" alt="Foto de perfil" />
        </div>
      `;

    const img = document.getElementById("foto-header-perfil");

    img.addEventListener("click", () => {
      window.location.href = "/tela-cadastro";
    });
  } else {
    console.log("Nenhuma foto de perfil salva no localStorage.");
  }
});
