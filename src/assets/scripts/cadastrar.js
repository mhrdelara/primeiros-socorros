document.addEventListener("DOMContentLoaded", () => {
  const btnConcluir = document.getElementById("concluir");

  btnConcluir?.addEventListener("click", async (e) => {
    e.preventDefault();

    // pega todos os inputs em ordem
    const inputs = document.querySelectorAll(".input");
    const values = Array.from(inputs).map((i) => i.value.trim());

    const [nome_completo, data_nascimento, crm, funcao, email, senha] = values;

    // validação básica
    if (!nome_completo || !email || !crm || !senha || !data_nascimento) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // data_nascimento vem do <input type='date'> assim: "yyyy-mm-dd"
    const [ano, mes, dia] = data_nascimento.split("-");

    if (!ano || !mes || !dia) {
      alert("Data inválida.");
      return;
    }

    // converte para dd/mm/yyyy → formato que o backend EXIGE
    const dataBR = `${dia}/${mes}/${ano}`;

    // foto
    const fotoBase64 = localStorage.getItem("fotoPerfil") || "";

    // objeto a ser enviado
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

    // envia pro backend
    try {
      const res = await fetch("/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });

      if (!res.ok) {
        const resposta = await res.text();
        console.warn("ERRO DO BACKEND:", res.status, resposta);
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
