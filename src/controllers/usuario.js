const { Router } = require("express");
const { db } = require("../db");
const rotaUsuario = Router();

rotaUsuario.get("/usuarios", async (req, res) => {
  const usuarios = await db.usuarios.findMany();
  res.json(usuarios);
});

rotaUsuario.post("/usuarios", async (req, res) => {
  const {
    nome,
    sobrenome,
    data_nascimento,
    email,
    crm,
    funcao,
    matricula,
    foto_perfil,
  } = req.body;
  await db.usuarios.create({
    data: {
      nome,
      sobrenome,
      data_nascimento: new Date(data_nascimento),
      email,
      crm,
      funcao,
      matricula,
      foto_perfil,
    },
  });
  res.json({ mensagem: "OK" });
});

rotaUsuario.delete("/usuarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.usuarios.delete({
    where: { id },
  });
  res.json({ mensagem: "OK" });
});

rotaUsuario.put("/usuarios/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.nome) data.nome = req.body.nome;
  if (req.body.sobrenome) data.sobrenome = req.body.sobrenome;
  if (req.body.data_nascimento)
    data.data_nascimento = new Date(req.body.data_nascimento);
  if (req.body.email) data.email = req.body.email;
  if (req.body.crm) data.crm = req.body.crm;
  if (req.body.funcao) data.funcao = req.body.funcao;
  if (req.body.matricula) data.matricula = req.body.matricula;
  if (req.body.foto_perfil) data.foto_perfil = req.body.foto_perfil;

  await db.usuarios.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "OK" });
});

module.exports = { rotaUsuario };
