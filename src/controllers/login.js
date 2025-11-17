const { Router } = require("express");
const { db } = require("../db");
const rotaLogin = Router();

rotaLogin.post("/", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }

  try {
    const usuario = await db.usuario.findUnique({
      where: { email },
    });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    res.json({ usuario });
  } catch (err) {
    console.error("POST /login error:", err);
    res.status(500).json({ erro: "Erro ao tentar logar" });
  }
});

module.exports = { rotaLogin };
