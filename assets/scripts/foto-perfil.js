// foto-perfil.js - versão final
(function () {
  const DEBUG = false;
  function log(...a) {
    if (DEBUG) console.log("[foto-perfil]", ...a);
  }
  function warn(...a) {
    if (DEBUG) console.warn("[foto-perfil]", ...a);
  }
  function err(...a) {
    if (DEBUG) console.error("[foto-perfil]", ...a);
  }

  // tenta selecionar elementos padrão (não trava se não existir)
  function findBaseElements() {
    const foto =
      document.getElementById("foto-perfil") ||
      document.querySelector(".foto-container img");
    const input =
      document.getElementById("img") ||
      document.querySelector(".foto-container input[type=file]");
    return { foto, input };
  }

  async function init() {
    if (document.readyState === "loading") {
      await new Promise((r) =>
        document.addEventListener("DOMContentLoaded", r)
      );
    }

    const { foto, input } = findBaseElements();
    if (!foto) {
      log(
        "foto não encontrada — script foto-perfil vai apenas salvar/ler localStorage se presente."
      );
    }
    if (!input) {
      log("input não encontrado — upload desabilitado nesta página.");
    }

    // carrega imagem salva (se existir)
    try {
      const saved = localStorage.getItem("fotoPerfil");
      if (saved && foto) foto.src = saved;
    } catch (e) {
      warn("localStorage read falhou", e);
    }

    if (!input || !foto) return; // nada mais a fazer se um dos dois faltar

    // clique na imagem abre o seletor
    foto.style.cursor = "pointer";
    foto.addEventListener("click", () => input.click());

    input.addEventListener("change", async (ev) => {
      const file = ev.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        // se Cropper não disponível faz upload simples e salva
        if (typeof Cropper === "undefined") {
          foto.src = src;
          try {
            localStorage.setItem("fotoPerfil", src);
          } catch {}
          input.value = "";
          return;
        }

        // cria overlay com cropper
        const overlay = document.createElement("div");
        overlay.style.cssText =
          "position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;justify-content:center;align-items:center;z-index:10000;padding:16px;box-sizing:border-box;";
        const panel = document.createElement("div");
        panel.style.cssText =
          "background:#fff;padding:12px;border-radius:10px;max-width:90vw;max-height:86vh;display:flex;flex-direction:column;align-items:center;";
        overlay.appendChild(panel);

        const img = document.createElement("img");
        img.src = src;
        img.style.maxWidth = "80vw";
        img.style.maxHeight = "65vh";
        img.style.display = "block";
        panel.appendChild(img);

        const controls = document.createElement("div");
        controls.style.cssText = "margin-top:12px;display:flex;gap:10px;";
        panel.appendChild(controls);

        const btnSalvar = document.createElement("button");
        btnSalvar.textContent = "Salvar";
        btnSalvar.style.cssText =
          "padding:8px 14px;border-radius:8px;cursor:pointer;";
        const btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar";
        btnCancelar.style.cssText =
          "padding:8px 14px;border-radius:8px;cursor:pointer;";

        controls.appendChild(btnSalvar);
        controls.appendChild(btnCancelar);
        document.body.appendChild(overlay);

        let cropper;
        try {
          cropper = new Cropper(img, {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: "move",
            autoCropArea: 1,
            background: false,
          });
        } catch (e) {
          err("Cropper init failed", e);
          foto.src = src;
          try {
            localStorage.setItem("fotoPerfil", src);
          } catch {}
          overlay.remove();
          input.value = "";
          return;
        }

        btnSalvar.addEventListener(
          "click",
          () => {
            try {
              const canvas = cropper.getCroppedCanvas({
                width: 300,
                height: 300,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: "high",
              });
              if (!canvas) {
                err("canvas vazio");
                return;
              }
              const nova = canvas.toDataURL("image/png");
              foto.src = nova;
              try {
                localStorage.setItem("fotoPerfil", nova);
              } catch (e) {
                warn("salvar localStorage falhou", e);
              }
              cropper.destroy();
              overlay.remove();
              input.value = "";
              log("foto salva");
            } catch (e) {
              err("erro salvar crop", e);
            }
          },
          { once: true }
        );

        btnCancelar.addEventListener(
          "click",
          () => {
            try {
              if (cropper) cropper.destroy();
            } catch {}
            overlay.remove();
            input.value = "";
          },
          { once: true }
        );
      };

      reader.onerror = (err) => {
        err("FileReader error", err);
      };
      reader.readAsDataURL(file);
    });
  }

  init();
})();
