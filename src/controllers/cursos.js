const { Router } = require("express");
const { db } = require("../db");
const rotaCursos = Router();

rotaCursos.get("/cursos", async (req, res) => {
  const cursos = await db.cursos.findMany();
  res.json(cursos);
});

rotaCursos.post("/cursos", async (req, res) => {
  const { denuncia, texto, data_postagem, like, dislike, id_usuarios } =
    req.body;

  await db.cursos.create({
    data: {
      denuncia: denuncia,
      texto: texto,
      data_postagem: data_postagem,
      like: like,
      dislike: dislike,
      usuarios: {
        connect: {
          id: id_usuarios,
        },
      },
    },
  });
  res.json({ mensagem: "OK" });
});

rotaCursos.delete("/cursos/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.cursos.delete({
    where: { id },
  });
  res.json({ mensagem: "OK" });
});

rotaCursos.put("/cursos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.denuncia) data.denuncia = req.body.denuncia;
  if (req.body.texto) data.texto = req.body.texto;
  if (req.body.data_postagem) data.data_postagem = req.body.data_postagem;
  if (req.body.like) data.like = req.body.like;
  if (req.body.dislike) data.dislike = req.body.dislike;

  await db.cursos.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "OK" });
});

module.exports = { rotaCursos };
