document.addEventListener("DOMContentLoaded", () => {
  const btnConcluir = document.getElementById("concluir");
  const imgPreview = document.querySelector(".foto-perfil");

  btnConcluir?.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(".input");
    const values = Array.from(inputs).map((i) => i.value.trim());

    const [nome_completo, data_nascimento, crm, funcao, email, senha] = values;

    if (!nome_completo || !email || !crm || !senha) {
      alert("Preencha nome completo, email, CRM e senha.");
      return;
    }

    const fotoBase64 =
      localStorage.getItem("fotoPerfil") ||
      (imgPreview ? imgPreview.src : null);

    const novoUsuario = {
      nome_completo,
      data_nascimento,
      email,
      crm,
      funcao,
      matricula: crm,
      foto_perfil: fotoBase64,
      senha,
      autorizado: false,
    };

    try {
      const res = await fetch("/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });

      if (!res.ok) {
        console.warn("Erro ao cadastrar usuário:", res.status);
        return;
      }

      const usuarioCriado = await res.json();

      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioCriado));

      window.dispatchEvent(new Event("authChanged"));

      window.location.href = "/tela-validacao";
    } catch (e) {
      console.warn("Erro ao enviar cadastro:", e);
    }
  });
});
