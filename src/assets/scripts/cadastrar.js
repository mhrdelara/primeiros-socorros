document.addEventListener("DOMContentLoaded", () => {
  const btnConcluir = document.getElementById("concluir");

  btnConcluir?.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(".input");
    const values = Array.from(inputs).map((i) => i.value.trim());

    const [nome_completo, data_nascimento, crm, funcao, email, senha] = values;

    if (!nome_completo || !email || !crm || !senha || !data_nascimento) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const [ano, mes, dia] = data_nascimento.split("-");

    if (!ano || !mes || !dia) {
      alert("Data inválida.");
      return;
    }

    const dataBR = `${dia}/${mes}/${ano}`;

    const fotoBase64 = localStorage.getItem("fotoPerfil") || "";

    const novoUsuario = {
      nome_completo,
      data_nascimento: dataBR,
      email,
      crm,
      funcao,
      matricula: crm,
      foto_perfil: fotoBase64,
      senha,
    };

    try {
      const res = await fetch("/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });

      const usuarioCriado = await res.json();
      localStorage.setItem("usuario", JSON.stringify(usuarioCriado));

      window.dispatchEvent(new Event("authChanged"));
      window.location.href = "/tela-validacao";
    } catch (e) {
      console.warn("Erro ao enviar cadastro:", e);
    }
  });
});
