const { Router } = require("express");
const { db } = require("../db");
const rotaMaterial = Router();

rotaMaterial.get("/", async (req, res) => {
  try {
    const material = await db.material.findMany({
      include: {
        video: { select: { id: true, titulo: true } },
      },
      orderBy: { data_postagem: "desc" },
    });
    res.json(material);
  } catch (err) {
    console.error("GET /material error:", err);
    res.status(500).json({ erro: "Erro ao carregar materiais" });
  }
});

rotaMaterial.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const material = await db.material.findUnique({
      where: { id },
      include: {
        video: { select: { id: true, titulo: true } },
      },
    });

    if (!material)
      return res.status(404).json({ erro: "Material não encontrado" });

    res.json(material);
  } catch (err) {
    console.error("GET /material/:id error:", err);
    res.status(500).json({ erro: "Erro ao carregar material" });
  }
});

rotaMaterial.post("/", async (req, res) => {
  try {
    const { anexo, videoId } = req.body;
    if (!anexo || !videoId)
      return res.status(400).json({ erro: "Anexo e videoId são obrigatórios" });

    const videoExiste = await db.video.findUnique({
      where: { id: Number(videoId) },
    });
    if (!videoExiste)
      return res.status(400).json({ erro: "Vídeo não encontrado" });

    const materialCriado = await db.material.create({
      data: { anexo, videoId: Number(videoId) },
    });

    res.status(201).json(materialCriado);
  } catch (err) {
    console.error("POST /material error:", err);
    res.status(500).json({ erro: "Erro ao criar material" });
  }
});

rotaMaterial.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { anexo, videoId, data_postagem } = req.body;

    const materialExistente = await db.material.findUnique({ where: { id } });
    if (!materialExistente)
      return res.status(404).json({ erro: "Material não encontrado" });

    const dataUpdate = {};
    if (anexo) dataUpdate.anexo = anexo;
    if (videoId) {
      const videoExiste = await db.video.findUnique({
        where: { id: Number(videoId) },
      });
      if (!videoExiste)
        return res.status(400).json({ erro: "Vídeo não encontrado" });
      dataUpdate.videoId = Number(videoId);
    }
    if (data_postagem) dataUpdate.data_postagem = new Date(data_postagem);

    const atualizado = await db.material.update({
      where: { id },
      data: dataUpdate,
    });

    res.json(atualizado);
  } catch (err) {
    console.error("PUT /material/:id error:", err);
    res.status(500).json({ erro: "Erro ao atualizar material" });
  }
});

rotaMaterial.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const materialExistente = await db.material.findUnique({ where: { id } });
    if (!materialExistente)
      return res.status(404).json({ erro: "Material não encontrado" });

    await db.material.delete({ where: { id } });

    res.json({ mensagem: "Material deletado com sucesso" });
  } catch (err) {
    console.error("DELETE /material/:id error:", err);
    res.status(500).json({ erro: "Erro ao deletar material" });
  }
});

module.exports = { rotaMaterial };
