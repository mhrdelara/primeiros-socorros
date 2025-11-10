// assets/scripts/auth-control.js

document.addEventListener("DOMContentLoaded", () => {
  const botaoOpcoes = document.getElementById("opcoes");
  const headerDown = document.querySelector(".header-down");
  const btnSimExit = document.getElementById("btnSimExit");
  const btnSimDelete = document.getElementById("btnSimDelete");

  // Função central — atualiza toda a interface conforme o login
  function atualizarInterface() {
    const usuarioLogado = JSON.parse(
      localStorage.getItem("usuarioLogado") || "null"
    );
    const fotoPerfil = localStorage.getItem("fotoPerfil");

    // Mostra/esconde o botão de opções
    if (botaoOpcoes) {
      botaoOpcoes.style.display = usuarioLogado ? "flex" : "none";
    }

    // Atualiza o header
    if (headerDown) {
      if (usuarioLogado) {
        headerDown.innerHTML = `
          <div class="foto-header" title="Abrir perfil">
            <img
              id="foto-header-perfil"
              src="${
                fotoPerfil ||
                usuarioLogado.foto_perfil ||
                "../assets/images/icons/3d_avatar_1.svg"
              }"
              alt="Perfil"
            />
          </div>
        `;
        const fotoHeader = document.getElementById("foto-header-perfil");
        fotoHeader.style.width = "48px";
        fotoHeader.style.height = "48px";
        fotoHeader.style.borderRadius = "50%";
        fotoHeader.style.objectFit = "cover";
        fotoHeader.style.cursor = "pointer";
        fotoHeader.addEventListener("click", () => {
          if (typeof showModal === "function") showModal();
        });
      } else {
        headerDown.innerHTML = `
          <a href="./tela-cadastro" id="login-logout">
            <p>Inscrever-se <span>ou</span> entrar</p>
          </a>
        `;
      }
    }
  }

  // 🔹 Atualiza a UI quando a página carrega
  atualizarInterface();

  // 🔹 Escuta alterações do localStorage (outras abas)
  window.addEventListener("storage", (e) => {
    if (e.key === "usuarioLogado" || e.key === "fotoPerfil") {
      atualizarInterface();
    }
  });

  // 🔹 Logout e exclusão da conta
  async function limparConta(excluir = false) {
    const usuarioLogado = JSON.parse(
      localStorage.getItem("usuarioLogado") || "null"
    );

    if (excluir && usuarioLogado?.id) {
      try {
        await fetch(`${window.location.origin}/usuarios/${usuarioLogado.id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.warn("Erro ao excluir no servidor:", err);
      }
    }

    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("fotoPerfil");
    atualizarInterface();
  }

  if (btnSimExit)
    btnSimExit.addEventListener("click", () => limparConta(false));
  if (btnSimDelete)
    btnSimDelete.addEventListener("click", () => limparConta(true));

  // 🔹 Reaplica a interface se for disparado o evento "authChanged"
  window.addEventListener("authChanged", atualizarInterface);
});
