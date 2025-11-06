const { Router } = require("express");
const { db } = require("../db");
const rotaMateriais = Router();

rotaMateriais.get("/materiais", async (req, res) => {
  const materiais = await db.materiais.findMany();
  res.json(materiais);
});

rotaMateriais.post("/materiais", async (req, res) => {
  const { anexo, titulo, urlVideo, id_curso } = req.body;
  await db.materiais.create({
    data: {
      anexo,
      titulo,
      urlVideo,
      cursos: {
        connect: {
          id: id_curso,
        },
      },
    },
  });
  res.json({ mensagem: "OK" });
});

rotaMateriais.delete("/materiais/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.materiais.delete({
    where: { id },
  });
  res.json({ mensagem: "OK" });
});

rotaMateriais.put("/materiais/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.denuncia) data.denuncia = req.body.denuncia;
  if (req.body.texto) data.texto = req.body.texto;
  if (req.body.data_postagem) data.data_postagem = req.body.data_postagem;
  if (req.body.nota) data.nota = req.body.nota;
  if (req.body.like) data.like = req.body.like;
  if (req.body.dislike) data.dislike = req.body.dislike;

  await db.materiais.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "OK" });
});

module.exports = { rotaMateriais };
