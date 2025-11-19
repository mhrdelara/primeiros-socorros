const { Router } = require("express");
const { db } = require("../db");
const rotaLike = Router();

rotaLike.get("/", async (req, res) => {
  try {
    const video = await db.video.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome_completo: true,
            foto_perfil: true,
            funcao: true,
          },
        },
        Material: {
          select: {
            id: true,
            anexo: true,
          },
        },
      },
      orderBy: { like: "desc" },
    });

    return res.status(200).json(video);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao buscar vídeos por like" });
  }
});

module.exports = { rotaLike };
