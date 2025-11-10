document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector(".header-down");
  const fotoSalva = localStorage.getItem("fotoPerfil");

  if (fotoSalva) {
    // Substitui o conteúdo do botão por uma imagem circular
    loginContainer.innerHTML = `
        <div class="foto-header">
          <img id="foto-header-perfil" src="${fotoSalva}" alt="Foto de perfil" />
        </div>
      `;

    // adiciona estilo circular por segurança
    const img = document.getElementById("foto-header-perfil");
    img.style.width = "55px";
    img.style.height = "55px";
    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
    img.style.objectPosition = "center top";
    img.style.cursor = "pointer";

    // Quando clicar na foto, abre o modal do perfil (ou tela de usuário)
    img.addEventListener("click", () => {
      window.location.href = "../pages/tela-cadastro.html";
    });
  } else {
    console.log("Nenhuma foto de perfil salva no localStorage.");
  }
});
