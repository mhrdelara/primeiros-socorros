const { Router } = require("express");
const { db } = require("../db");
const rotaVideo = Router();

// ----------------- GET todos os vídeos -----------------
rotaVideo.get("/", async (req, res) => {
  try {
    const videos = await db.video.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome_completo: true,
            foto_perfil: true,
            funcao: true,
          },
        },
        Material: { select: { id: true, anexo: true } },
      },
      orderBy: { data_postagem: "desc" },
    });

    const formatados = videos.map((v) => ({
      ...v,
      nome_usuario: v.usuario?.nome_completo || "Autor",
      foto_perfil: v.usuario?.foto_perfil || "",
      funcao_usuario: v.usuario?.funcao || "",
      materiais: v.Material.map((m) => m.anexo),
    }));

    res.json(formatados);
  } catch (err) {
    console.error("GET /video error:", err);
    res.status(500).json({ erro: "Erro ao carregar vídeos" });
  }
});

// ----------------- GET vídeo por id -----------------
rotaVideo.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const video = await db.video.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome_completo: true,
            foto_perfil: true,
            funcao: true,
          },
        },
        Material: { select: { id: true, anexo: true } },
      },
    });

    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    res.json({
      ...video,
      nome_usuario: video.usuario?.nome_completo || "Autor",
      foto_perfil: video.usuario?.foto_perfil || "",
      funcao_usuario: video.usuario?.funcao || "",
      materiais: video.Material.map((m) => m.anexo),
    });
  } catch (err) {
    console.error("GET /video/:id error:", err);
    res.status(500).json({ erro: "Erro ao carregar vídeo" });
  }
});

rotaVideo.post("/", async (req, res) => {
  try {
    const { titulo, descricao, urlVideo, id_usuario } = req.body;
    if (!titulo || !descricao || !urlVideo || !id_usuario) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando" });
    }

    const usuarioExiste = await db.usuario.findUnique({
      where: { id: Number(id_usuario) },
    });
    if (!usuarioExiste)
      return res.status(400).json({ erro: "Usuário não encontrado" });

    const novoVideo = await db.video.create({
      data: {
        titulo,
        descricao,
        urlVideo,
        usuarioId: Number(id_usuario),
      },
      include: { usuario: true, Material: true },
    });

    res.status(201).json(novoVideo);
  } catch (err) {
    console.error("POST /video error:", err);
    res.status(500).json({ erro: "Erro ao criar vídeo" });
  }
});

rotaVideo.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, descricao, urlVideo } = req.body;

    const videoExistente = await db.video.findUnique({ where: { id } });
    if (!videoExistente)
      return res.status(404).json({ erro: "Vídeo não encontrado" });

    const atualizado = await db.video.update({
      where: { id },
      data: {
        titulo: titulo ?? videoExistente.titulo,
        descricao: descricao ?? videoExistente.descricao,
        urlVideo: urlVideo ?? videoExistente.urlVideo,
      },
    });

    res.json(atualizado);
  } catch (err) {
    console.error("PUT /video/:id error:", err);
    res.status(500).json({ erro: "Erro ao atualizar vídeo" });
  }
});

rotaVideo.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await db.material.deleteMany({ where: { videoId: id } });

    await db.video.delete({ where: { id } });

    res.json({ mensagem: "Vídeo e materiais deletados com sucesso" });
  } catch (err) {
    console.error("DELETE /video/:id error:", err);
    res.status(500).json({ erro: "Erro ao deletar vídeo" });
  }
});

module.exports = { rotaVideo };
