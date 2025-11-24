const { Router } = require("express");
const { db } = require("../db");

const router = Router();

router.get("/like/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const video = await db.video.findUnique({ where: { id } });
    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    const atualizado = await db.video.update({
      where: { id },
      data: {
        like: video.like + 1,
      },
    });

    res.json({ mensagem: "Like registrado", video: atualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao registrar like" });
  }
});

router.get("/retirarlike/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const video = await db.video.findUnique({ where: { id } });
    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    const atualizado = await db.video.update({
      where: { id },
      data: {
        like: video.like > 0 ? video.like - 1 : 0,
      },
    });

    res.json({ mensagem: "Like removido", video: atualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao remover like" });
  }
});

router.get("/dislike/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const video = await db.video.findUnique({ where: { id } });
    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    const atualizado = await db.video.update({
      where: { id },
      data: {
        dislike: video.dislike + 1,
      },
    });

    res.json({ mensagem: "Dislike registrado", video: atualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao registrar dislike" });
  }
});

router.get("/retirardeslike/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const video = await db.video.findUnique({ where: { id } });
    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    const atualizado = await db.video.update({
      where: { id },
      data: {
        dislike: video.dislike > 0 ? video.dislike - 1 : 0,
      },
    });

    res.json({ mensagem: "Dislike removido", video: atualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao remover dislike" });
  }
});

module.exports = { rotaLike: router };
