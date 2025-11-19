document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const btnConcluir = document.getElementById("concluir");
  const userId = usuario.id;
  const dataObj = new Date(usuario.data_nascimento);
  const data = dataObj.toISOString().split("T")[0];

  console.log("Data formatada:", data);

  document.getElementById("nome_completo").value = usuario.nome_completo;
  document.getElementById("data_nascimento").value = data;
  document.getElementById("crm").value = usuario.crm;
  document.getElementById("funcao").value = usuario.funcao;
  document.getElementById("email").value = usuario.email;

  const inputSenhaAntiga = document.getElementById("senha");
  const inputSenhaNova = document.getElementById("senha_nova");

  btnConcluir?.addEventListener("click", async (e) => {
    e.preventDefault();

    const nome_completo = document.getElementById("nome_completo").value;
    const data_nascimento = document.getElementById("data_nascimento").value;
    const email = document.getElementById("email").value;
    const crm = document.getElementById("crm").value;
    const funcao = document.getElementById("funcao").value;

    const senhaAntigaDigitada = inputSenhaAntiga.value;
    const senhaNovaDigitada = inputSenhaNova.value;

    if (senhaAntigaDigitada !== usuario.senha) {
      alert("A senha antiga está incorreta!");
      return;
    }

    if (!senhaNovaDigitada || senhaNovaDigitada.trim() === "") {
      alert("A nova senha não pode ser vazia!");
      return;
    }

    if (senhaNovaDigitada === usuario.senha) {
      alert("A nova senha não pode ser igual à senha antiga!");
      return;
    }

    const alterarUsuario = {
      nome_completo,
      data_nascimento: data,
      email,
      crm,
      funcao,
      matricula: crm,
      foto_perfil: usuario.foto_perfil || "",
      senha: senhaNovaDigitada,
    };

    console.log("Enviando:", alterarUsuario);

    try {
      const res = await fetch(`/usuario/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alterarUsuario),
      });

      if (!res.ok) {
        alert("Erro ao alterar usuário");
        return;
      }

      const usuarioAlterado = await res.json();
      localStorage.setItem("usuario", JSON.stringify(usuarioAlterado));

      window.dispatchEvent(new Event("authChanged"));
      window.location.href = "/";
    } catch (e) {
      console.warn("Erro ao alterar usuario", e);
    }
  });
});
