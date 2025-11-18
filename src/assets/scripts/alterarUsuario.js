// document.addEventListener("DOMContentLoaded", () => {
//   const usuario = JSON.parse(localStorage.getItem("usuario"));
//   const objetoData = new Date(usuario.data_nascimento);
//   const dataFormatada = objetoData.toISOString().substring(0, 10);
//   const btnConcluir = document.getElementById("concluir");
//   const userId = usuario.id;

//   document.getElementById("nome_completo").value = usuario.nome_completo;
//   document.getElementById("data_nascimento").value = dataFormatada;
//   document.getElementById("crm").value = usuario.crm;
//   document.getElementById("funcao").value = usuario.funcao;
//   document.getElementById("email").value = usuario.email;
//   document.getElementById("senha").value = usuario.senha;

//   btnConcluir?.addEventListener("click", async (e) => {
//     e.preventDefault();

//     const alterarUsuario = {
//       nome_completo,
//       data_nascimento: dataFormatada,
//       email,
//       crm,
//       funcao,
//       matricula: crm,
//       foto_perfil: "",
//       senha,
//     };
//     console.log(alterarUsuario);

//     try {
//       const res = await fetch(`/usuario/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(alterarUsuario),
//       });

//       const usuarioAlterado = await res.json();
//       localStorage.setItem("usuario", JSON.stringify(usuarioAlterado));

//       window.dispatchEvent(new Event("authChanged"));
//       window.location.href = "/";
//     } catch (e) {
//       console.warn("Erro ao alterar usuario", e);
//     }
//   });
// });
