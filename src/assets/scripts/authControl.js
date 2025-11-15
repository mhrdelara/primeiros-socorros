document.addEventListener("DOMContentLoaded", () => {
  const headerDown = document.querySelector(".header-down");
  const opcoesBtn = document.getElementById("opcoes");

  const FALLBACK_FOTO = "/images/icons/3d_avatar_1.svg";

  function renderLoggedOut() {
    if (!headerDown) return;

    headerDown.innerHTML = `
      <a href="/tela-cadastro" id="login-logout">
        <p>Inscrever-se <span>ou</span> entrar</p>
      </a>
    `;

    if (opcoesBtn) opcoesBtn.style.display = "none";
  }

  function renderAvatar(fotoPerfil, showOpcoes) {
    if (!headerDown) return;

    headerDown.innerHTML = `
      <div class="foto-container" id="foto-container-header">
        <img class="foto-perfil"
             id="foto-perfil-header"
             src="${fotoPerfil}"
             alt="Foto de perfil"
             onerror="this.src='${FALLBACK_FOTO}'">
      </div>
    `;

    if (opcoesBtn) opcoesBtn.style.display = showOpcoes ? "block" : "none";

    if (showOpcoes) {
      document.querySelector(".foto-perfil")?.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        modal?.classList.remove("disable");
      });
    }
  }

  function run() {
    let usuario = null;

    try {
      usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    } catch {
      usuario = null;
    }

    const foto =
      localStorage.getItem("fotoPerfil") ||
      usuario?.foto_perfil ||
      FALLBACK_FOTO;

    if (!usuario) {
      renderLoggedOut();
      return;
    }

    renderAvatar(foto, !!usuario.autorizado);
  }

  run();
  window.addEventListener("authChanged", run);
});
