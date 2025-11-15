const { Router } = require("express");
const { db } = require("../db");
const rotaVideo = Router();

rotaVideo.get("/video", async (req, res) => {
  const videos = await db.video.findMany({
    include: {
      usuario: true,
    },
  });

  res.json(videos);
});

rotaVideo.post("/video", async (req, res) => {
  const {
    denuncia,
    descricao,
    like,
    dislike,
    titulo,
    urlVideo,
    id_usuario,
    nome_usuario,
  } = req.body;

  await db.video.create({
    data: {
      denuncia,
      descricao,
      like,
      dislike,
      titulo,
      urlVideo,
      nome: nome_usuario,
      usuario: {
        connect: {
          id: id_usuario,
        },
      },
    },
  });
  res.json({ mensagem: "OK" });
});

rotaVideo.delete("/video/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.video.delete({
    where: { id },
  });
  res.json({ mensagem: "OK" });
});

rotaVideo.put("/video/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.denuncia) data.denuncia = req.body.denuncia;
  if (req.body.descricao) data.descricao = req.body.descricao;
  if (req.body.data_postagem) data.data_postagem = req.body.data_postagem;
  if (req.body.like) data.like = req.body.like;
  if (req.body.dislike) data.dislike = req.body.dislike;
  if (req.body.titulo) data.titulo = req.body.titulo;
  if (req.body.urlVideo) data.urlVideo = req.body.urlVideo;

  await db.video.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "OK" });
});

module.exports = { rotaVideo };
