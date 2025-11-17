document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const nomeCompletoInput = document.getElementById("nome_completo");
  const crmInput = document.getElementById("crm");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  let mensagem = document.getElementById("mensagem");
  if (!mensagem) {
    mensagem = document.createElement("p");
    mensagem.id = "mensagem";
    mensagem.style.marginTop = "10px";
    formLogin.appendChild(mensagem);
  }

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome_completo = nomeCompletoInput.value.trim();
    const crm = crmInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!nome_completo || !crm || !email || !senha) {
      mensagem.textContent = "Preencha todas as informações";
      mensagem.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        mensagem.textContent = data.erro || "Erro no login";
        mensagem.style.color = "red";
        return;
      }

      const usuario = data.usuario;
      const token = data.token;

      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", token);

      mensagem.textContent = `Bem-vindo, ${usuario.nome_completo}! Redirecionando...`;
      mensagem.style.color = "green";

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("Erro ao logar:", err);
      mensagem.textContent = "Erro ao tentar logar";
      mensagem.style.color = "red";
      mensagem.style.background = "white";
    }
  });
});
