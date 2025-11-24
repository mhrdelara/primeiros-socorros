const { Router } = require("express");
const { db } = require("../db");

const router = Router();

router.get("/denunciar/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const video = await db.video.findUnique({ where: { id } });
    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    const atualizado = await db.video.update({
      where: { id },
      data: {
        denuncia: video.denuncia + 1,
      },
    });

    res.json({ mensagem: "Vídeo denunciado", video: atualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao denunciar" });
  }
});

router.get("/retirar/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const video = await db.video.findUnique({ where: { id } });
    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    const atualizado = await db.video.update({
      where: { id },
      data: {
        denuncia: video.denuncia > 0 ? video.denuncia - 1 : 0,
      },
    });

    res.json({ mensagem: "Denúncia removida", video: atualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao remover denúncia" });
  }
});

module.exports = { rotaDenuncia: router };
