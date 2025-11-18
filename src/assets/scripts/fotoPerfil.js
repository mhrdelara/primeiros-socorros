(function () {
  let cropper = null;

  document.addEventListener("DOMContentLoaded", () => {
    const fotos = document.querySelectorAll(".foto-perfil");
    const input = document.getElementById("img");

    if (!fotos.length || !input) return;

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const saved = usuario.foto_perfil || localStorage.getItem("fotoPerfil");
    if (saved) fotos.forEach((f) => (f.src = saved));

    fotos.forEach((f) => {
      f.style.cursor = "pointer";
      f.addEventListener("click", () => input.click());
    });

    input.addEventListener("change", (ev) => {
      const file = ev.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => abrirCropUI(e.target.result, fotos);
      reader.readAsDataURL(file);
    });
  });

  function abrirCropUI(src, fotos) {
    const overlay = document.createElement("div");
    overlay.className = "cropper-overlay";

    overlay.innerHTML = `
      <div class="cropper-box">
        <div class="cropper-image-wrapper">
          <img id="cropper-image" src="${src}">
        </div>
        <div class="cropper-controls">
          <button class="cropper-cancel" type="button">Cancelar</button>
          <button class="cropper-save" type="button">Salvar</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const img = overlay.querySelector("#cropper-image");
    const btnSalvar = overlay.querySelector(".cropper-save");
    const btnCancelar = overlay.querySelector(".cropper-cancel");

    img.onload = () => {
      cropper = new Cropper(img, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        background: false,
      });
    };

    btnSalvar.addEventListener("click", () => {
      const canvas = cropper.getCroppedCanvas({ width: 500, height: 500 });
      const base64 = canvas.toDataURL("image/png");

      atualizarFoto(base64, fotos);

      cropper.destroy();
      overlay.remove();
    });

    btnCancelar.addEventListener("click", () => {
      cropper.destroy();
      overlay.remove();
    });

    overlay.addEventListener("click", (ev) => {
      if (ev.target === overlay) {
        cropper.destroy();
        overlay.remove();
      }
    });
  }

  function atualizarFoto(base64, fotos) {
    fotos.forEach((f) => (f.src = base64));
    localStorage.setItem("fotoPerfil", base64);

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    usuario.foto_perfil = base64;
    localStorage.setItem("usuario", JSON.stringify(usuario));

    if (usuario.id) {
      fetch(`/usuario/${usuario.id}/foto`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foto_perfil: base64 }),
      });
    }

    window.dispatchEvent(new Event("authChanged"));
  }
})();
