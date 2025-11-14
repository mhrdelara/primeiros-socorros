const { Router } = require("express");
const { db } = require("../db");
const rotaVideos = Router();

rotaVideos.get("/videos", async (req, res) => {
  const videos = await db.videos.findMany();
  res.json(videos);
});

rotaVideos.post("/videos", async (req, res) => {
  const { denuncia, texto, like, dislike, titulo, urlVideo, id_usuarios } =
    req.body;

  await db.videos.create({
    data: {
      denuncia,
      texto,
      like,
      dislike,
      titulo,
      urlVideo,
      usuarios: {
        connect: {
          id: id_usuarios,
        },
      },
    },
  });
  res.json({ mensagem: "OK" });
});

rotaVideos.delete("/videos/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.videos.delete({
    where: { id },
  });
  res.json({ mensagem: "OK" });
});

rotaVideos.put("/videos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.denuncia) data.denuncia = req.body.denuncia;
  if (req.body.texto) data.texto = req.body.texto;
  if (req.body.data_postagem) data.data_postagem = req.body.data_postagem;
  if (req.body.like) data.like = req.body.like;
  if (req.body.dislike) data.dislike = req.body.dislike;
  if (req.body.titulo) data.titulo = req.body.titulo;
  if (req.body.urlVideo) data.urlVideo = req.body.urlVideo;

  await db.videos.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "OK" });
});

module.exports = { rotaVideos };
