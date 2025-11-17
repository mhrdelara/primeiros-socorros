const { Router } = require("express");
const { db } = require("../db");
const jwt = require("jsonwebtoken");
const { SEGURANCA_CODIGO } = require("../autenticar");
const rotaLogin = Router();

rotaLogin.post("/", async (req, res) => {
  const { nome_completo, crm, email, senha } = req.body;

  if (!nome_completo || !crm || !email || !senha) {
    return res.status(400).json({ erro: "Preencha todas as informações" });
  }

  console.log({ nome_completo, crm, email, senha });

  try {
    const usuario = await db.usuario.findFirst({
      where: { email },
    });

    console.log(usuario);

    if (!usuario || usuario?.senha !== senha) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = jwt.sign(usuario, SEGURANCA_CODIGO);
    res.json({ usuario, token });
  } catch (err) {
    console.error("POST /login error:", err);
    res.status(500).json({ erro: "Erro ao tentar logar" });
  }
});

module.exports = { rotaLogin };
