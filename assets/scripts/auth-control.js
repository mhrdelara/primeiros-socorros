document.addEventListener("DOMContentLoaded", () => {
  const headerDown = document.querySelector(".header-down");
  const opcoesBtn = document.getElementById("opcoes");

  function renderLoggedOut() {
    if (!headerDown) return;
    headerDown.innerHTML = `<a href="./tela-cadastro.html" id="login-logout"><p>Inscrever-se <span>ou</span> entrar</p></a>`;
    if (opcoesBtn) opcoesBtn.style.display = "none";
  }

  function renderAvatar(foto, showOpcoes) {
    if (!headerDown) return;
    headerDown.innerHTML = `
      <div class="foto-container header-foto">
        <img id="header-foto-perfil" src="${foto}" alt="Foto de perfil" 
      </div>
    `;
    if (opcoesBtn) opcoesBtn.style.display = showOpcoes ? "block" : "none";

    if (showOpcoes) {
      const headerImg = document.getElementById("header-foto-perfil");
      headerImg?.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        if (modal) modal.classList.remove("disable");
      });
    }
  }

  function run() {
    let usuario = null;
    try {
      usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch (e) {
      console.warn("auth-control: parse error", e);
    }
    let foto = null;
    try {
      foto =
        localStorage.getItem("fotoPerfil") ||
        (usuario && usuario.foto_perfil) ||
        "../assets/images/icons/3d_avatar_1.svg";
    } catch (e) {
      foto = "../assets/images/icons/3d_avatar_1.svg";
    }

    if (!usuario) {
      renderLoggedOut();
    } else {
      const autorizado = !!usuario.autorizado;
      renderAvatar(foto, autorizado);
    }
  }

  run();

  window.addEventListener("authChanged", () => {
    run();
  });
});
