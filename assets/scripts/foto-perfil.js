// foto-perfil.js - versão resiliente e com logs
(function () {
  const DEBUG = true;

  function log(...args) {
    if (DEBUG) console.log("[foto-perfil]", ...args);
  }
  function warn(...args) {
    if (DEBUG) console.warn("[foto-perfil]", ...args);
  }
  function err(...args) {
    if (DEBUG) console.error("[foto-perfil]", ...args);
  }

  // tenta encontrar elementos por vários seletores comuns
  function findElements() {
    const selectors = [
      { img: "#foto-perfil", input: "#img" },
      { img: ".foto-container img", input: ".foto-container input[type=file]" },
      { img: "img[data-role=profile]", input: "input[type=file][name=img]" },
    ];

    for (const s of selectors) {
      const foto = document.querySelector(s.img);
      const input = document.querySelector(s.input);
      if (foto && input) return { foto, input };
    }
    // última tentativa: qualquer img e input file dentro do modal
    const modalImg = document.querySelector(".modal img");
    const modalInput = document.querySelector(".modal input[type=file]");
    if (modalImg && modalInput) return { foto: modalImg, input: modalInput };

    return { foto: null, input: null };
  }

  // Observador que espera os elementos aparecerem (até timeout)
  function waitForElements(timeout = 5000) {
    return new Promise((resolve) => {
      const found = findElements();
      if (found.foto && found.input) {
        log("Encontrou elementos imediatamente.");
        resolve(found);
        return;
      }

      const observer = new MutationObserver(() => {
        const f = findElements();
        if (f.foto && f.input) {
          observer.disconnect();
          log("Elementos encontrados via MutationObserver.");
          resolve(f);
        }
      });

      observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
      });

      // timeout fallback
      setTimeout(() => {
        observer.disconnect();
        const f = findElements();
        if (f.foto && f.input) {
          log("Encontrou elementos antes do timeout.");
          resolve(f);
        } else {
          warn("Timeout: elementos não encontrados em", timeout, "ms");
          resolve(f); // pode ser nulo
        }
      }, timeout);
    });
  }

  // Função principal
  async function init() {
    if (document.readyState === "loading") {
      await new Promise((r) =>
        document.addEventListener("DOMContentLoaded", r)
      );
    }
    log("DOM pronto. Procurando elementos...");
    const { foto, input } = await waitForElements(6000);

    if (!foto || !input) {
      warn(
        "Elemento #foto-perfil ou #img não encontrado. Confira IDs e caminhos do script."
      );
      warn(
        "Sugestões rápidas:\n - Verifique se #foto-perfil e #img existem no HTML.\n - Verifique se o script está sendo carregado (Network tab).\n - Se o HTML usa caminhos relativos, confirme o src do script."
      );
      return;
    }

    log("Elementos encontrados:", foto, input);

    // garantir input visível para interação programática (não necessário visualmente)
    input.style.display = input.style.display || "";

    // carrega imagem salva (se houver)
    try {
      const saved = localStorage.getItem("fotoPerfil");
      if (saved) {
        foto.src = saved;
        log("Carregou foto do localStorage.");
      }
    } catch (e) {
      warn("Erro localStorage:", e);
    }

    // abrir seletor quando clicar na foto
    foto.addEventListener("click", () => {
      log("Clique na foto: abrindo seletor de arquivos.");
      input.click();
    });

    // tratar seleção de arquivo
    input.addEventListener("change", (ev) => handleFileChange(ev, foto, input));
    log("Iniciado com sucesso. Clique na foto para testar.");
  }

  // Handler do change do input
  function handleFileChange(event, foto, input) {
    const file = event.target.files?.[0];
    if (!file) {
      warn("Nenhum arquivo selecionado.");
      return;
    }
    log("Arquivo selecionado:", file.name, file.type, file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;

      if (typeof Cropper === "undefined") {
        warn("Cropper.js não encontrado — aplicando upload simples.");
        foto.src = imageSrc;
        try {
          localStorage.setItem("fotoPerfil", imageSrc);
        } catch {}
        input.value = "";
        return;
      }

      // overlay com cropper
      const overlay = document.createElement("div");
      overlay.setAttribute("data-foto-overlay", "1");
      overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.85);
        display:flex; justify-content:center; align-items:center; z-index:10000;
        padding: 16px; box-sizing: border-box;
      `;

      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        background: #fff; padding: 12px; border-radius: 10px; max-width: 90vw;
        max-height: 86vh; display:flex; flex-direction:column; align-items:center;
      `;
      overlay.appendChild(wrapper);

      const img = document.createElement("img");
      img.src = imageSrc;
      img.style.maxWidth = "80vw";
      img.style.maxHeight = "65vh";
      img.style.display = "block";
      wrapper.appendChild(img);

      const controls = document.createElement("div");
      controls.style.cssText = "margin-top:12px; display:flex; gap:10px;";
      wrapper.appendChild(controls);

      const btnSalvar = document.createElement("button");
      btnSalvar.textContent = "Salvar";
      btnSalvar.style.cssText =
        "padding:8px 14px; border-radius:8px; cursor:pointer;";
      const btnCancelar = document.createElement("button");
      btnCancelar.textContent = "Cancelar";
      btnCancelar.style.cssText =
        "padding:8px 14px; border-radius:8px; cursor:pointer;";

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
        err("Falha ao inicializar Cropper:", e);
        // fallback: aplica a imagem direto
        foto.src = imageSrc;
        try {
          localStorage.setItem("fotoPerfil", imageSrc);
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
              err("Canvas vazio após crop.");
              return;
            }
            const nova = canvas.toDataURL("image/png");
            foto.src = nova;
            try {
              localStorage.setItem("fotoPerfil", nova);
            } catch (e) {
              warn("Erro salvando localStorage:", e);
            }
            cropper.destroy();
            overlay.remove();
            input.value = "";
            log("Foto atualizada e salva.");
          } catch (e) {
            err("Erro ao salvar crop:", e);
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
          log("Recorte cancelado.");
        },
        { once: true }
      );
    };

    reader.onerror = (err) => {
      err("FileReader error:", err);
    };

    reader.readAsDataURL(file);
  }

  // inicializa
  init();
})();
