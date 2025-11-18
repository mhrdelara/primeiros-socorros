document.addEventListener("DOMContentLoaded", () => {
  const headerDown = document.querySelector(".header-down");
  const opcoesBtn = document.getElementById("opcoes");

  let usuario = {};
  try {
    usuario = JSON.parse(localStorage.getItem("usuario")) || {};
  } catch {
    usuario = {};
  }

  const usuarioExiste = usuario && Object.keys(usuario).length > 0;
  console.log(usuarioExiste);

  if (usuarioExiste) {
    console.log("Colocando os dados do usuario");
    const fotoSrc =
      usuario.foto ||
      usuario.foto_perfil ||
      localStorage.getItem("fotoPerfil") ||
      "/images/icons/3d_avatar_1.svg";

    headerDown.innerHTML = `
      <div class="foto-container" id="foto-container-header">
        <img 
          class="foto-perfil" 
          id="foto-perfil-header" 
          src="${fotoSrc}"
          alt="Foto de perfil"
          onerror="this.src='/images/icons/3d_avatar_1.svg'"
        >
      </div>
    `;

    if (opcoesBtn) opcoesBtn.style.display = "block";
  } else {
    console.log("Deu errado");

    headerDown.innerHTML = `
      <a href="/tela-cadastro" id="login-logout">
        <p>Inscrever-se <span>ou</span> entrar</p>
      </a>
    `;

    if (opcoesBtn) opcoesBtn.style.display = "none";
  }
});
