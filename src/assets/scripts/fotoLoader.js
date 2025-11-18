document.addEventListener("DOMContentLoaded", () => {
  const fotos = document.querySelectorAll(".foto-perfil");

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  if (usuario.foto_perfil) {
    fotos.forEach((f) => (f.src = usuario.foto_perfil));
  }
});
