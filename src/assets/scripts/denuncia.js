// denuncia.js
// Maneira robusta de abrir/fechar modal e alternar denúncia.

function safeGet(id) {
  return document.getElementById(id);
}

function abrirModal() {
  const modal = safeGet("modal-denuncia");
  if (!modal) return;

  modal.classList.remove("hidden-modal");
  document.body.classList.add("modal-open"); // opcional, pra controlar scroll via CSS
  // foco acessível
  modal.setAttribute("aria-hidden-modal", "false");

  // adiciona listener de ESC uma vez
  if (!modal._escHandler) {
    modal._escHandler = (e) => {
      if (e.key === "Escape") fecharModal();
    };
    document.addEventListener("keydown", modal._escHandler);
  }
}

function fecharModal() {
  const modal = safeGet("modal-denuncia");
  if (!modal) return;

  modal.classList.add("hidden-modal");
  document.body.classList.remove("modal-open");
  modal.setAttribute("aria-hidden-modal", "true");
  if (modal._escHandler) {
    document.removeEventListener("keydown", modal._escHandler);
    modal._escHandler = null;
  }
}

function atualizarIconeDenuncia(btnDenuncia, denunciado) {
  if (!btnDenuncia) return;
  const img = btnDenuncia.querySelector("img");
  if (!img) return;

  img.src = denunciado
    ? "/images/icons/flag-ativo.svg"
    : "/images/icons/flag-inativo.svg";
}

async function toggleDenuncia(id, estado, btnDenuncia) {
  // chama rota do backend conforme estado
  if (estado.denunciado) {
    try {
      await fetch(`/denuncia/undenunciar/${id}`);
    } catch (err) {
      console.error("Erro ao remover denuncia:", err);
    }
    estado.denunciado = false;
    atualizarIconeDenuncia(btnDenuncia, false);
    fecharModal();
  } else {
    try {
      await fetch(`/denuncia/denunciar/${id}`);
    } catch (err) {
      console.error("Erro ao denunciar:", err);
    }
    estado.denunciado = true;
    atualizarIconeDenuncia(btnDenuncia, true);
    abrirModal();
  }

  localStorage.setItem(`denuncia_${id}`, JSON.stringify(estado));
}

function configurarDenuncia(video) {
  if (!video || !video.id) return;

  const id = video.id;
  const btnDenuncia = safeGet("btnDenunciaFlag");
  const modal = safeGet("modal-denuncia");
  const overlay = modal ? modal.querySelector(".modal-overlay") : null;
  const card = modal ? modal.querySelector(".modal-card") : null;

  // estado salvo
  let estado = JSON.parse(localStorage.getItem(`denuncia_${id}`)) || {
    denunciado: false,
  };

  atualizarIconeDenuncia(btnDenuncia, estado.denunciado);

  // segurança: se botão não existir, não tenta adicionar listener
  if (btnDenuncia) {
    btnDenuncia.onclick = () => toggleDenuncia(id, estado, btnDenuncia);
  }

  // overlay click fecha modal
  if (overlay) {
    overlay.addEventListener("click", () => {
      // se modal estiver aberto, fecha; caso contrário, nada
      if (!modal.classList.contains("hidden-modal")) fecharModal();
    });
  } else if (modal) {
    // fallback: clique no próprio container fecha
    modal.addEventListener("click", () => {
      if (!modal.classList.contains("hidden-modal")) fecharModal();
    });
  }

  // prevenir fechamento quando clicar dentro da caixa
  if (card) {
    card.addEventListener("click", (e) => e.stopPropagation());
  }

  // garantir que modal comece escondido
  if (modal) {
    modal.classList.toggle(
      "hidden-modal",
      !estado.denunciado && modal.classList.contains("hidden-modal")
    );
    modal.setAttribute("aria-hidden-modal", (!estado.denunciado).toString());
  }
}
