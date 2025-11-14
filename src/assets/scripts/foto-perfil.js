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

  function findAllFotos() {
    const fotos = document.querySelectorAll(".foto-perfil");
    const input =
      document.getElementById("img") ||
      document.querySelector(".foto-container input[type=file]");
    return { fotos, input };
  }

  async function init() {
    if (document.readyState === "loading") {
      await new Promise((r) =>
        document.addEventListener("DOMContentLoaded", r)
      );
    }

    const { fotos, input } = findAllFotos();
    if (!fotos.length) {
      log("nenhuma foto encontrada — apenas leitura localStorage");
    }
    if (!input) {
      log("input não encontrado — upload desabilitado nesta página.");
    }

    try {
      const saved = localStorage.getItem("fotoPerfil");
      if (saved) fotos.forEach((f) => (f.src = saved));
    } catch (e) {
      warn("localStorage read falhou", e);
    }

    if (!input || !fotos.length) return;

    fotos.forEach((f) => (f.style.cursor = "pointer"));
    fotos.forEach((f) => f.addEventListener("click", () => input.click()));

    input.addEventListener("change", async (ev) => {
      const file = ev.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;

        if (typeof Cropper === "undefined") {
          fotos.forEach((f) => (f.src = src));
          try {
            localStorage.setItem("fotoPerfil", src);
          } catch {}
          input.value = "";
          return;
        }

        const overlay = document.createElement("div");
        const panel = document.createElement("div");
        overlay.classList.add("cropper-overlay");
        panel.classList.add("cropper-box");
        overlay.appendChild(panel);

        const img = document.createElement("img");
        img.src = src;
        panel.appendChild(img);

        const controls = document.createElement("div");
        const btnSalvar = document.createElement("button");
        btnSalvar.textContent = "Salvar";
        const btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar";
        controls.appendChild(btnSalvar);
        controls.appendChild(btnCancelar);
        panel.appendChild(controls);
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
          fotos.forEach((f) => (f.src = src));
          try {
            localStorage.setItem("fotoPerfil", src);
          } catch {}
          overlay.remove();
          input.value = "";
          return;
        }

        // botão salvar
        btnSalvar.addEventListener(
          "click",
          () => {
            try {
              const canvas = cropper.getCroppedCanvas({
                width: 400,
                height: 400,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: "high",
              });
              const nova = canvas.toDataURL("image/png");

              fotos.forEach((f) => (f.src = nova));

              localStorage.setItem("fotoPerfil", nova);

              const usuario = JSON.parse(
                localStorage.getItem("usuarioLogado") || "{}"
              );
              usuario.foto_perfil = nova;
              localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

              window.dispatchEvent(new Event("authChanged"));

              cropper.destroy();
              overlay.remove();
              input.value = "";
              log("foto salva e sincronizada");
            } catch (e) {
              err("erro ao salvar crop", e);
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
