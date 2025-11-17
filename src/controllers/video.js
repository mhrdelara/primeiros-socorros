const { Router } = require("express");
const { db } = require("../db");
const rotaVideo = Router();

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
        material: true,
      },
      orderBy: { data_postagem: "desc" },
    });

    const formatados = videos.map((v) => ({
      ...v,
      nome_usuario: v.usuario?.nome_completo || "Autor",
      foto_perfil: v.usuario?.foto_perfil || "",
      funcao_usuario: v.usuario?.funcao || "",
    }));

    res.json(formatados);
  } catch (err) {
    console.error("GET /video error:", err);
    res.status(500).json({ erro: err.message });
  }
});

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
        material: true,
      },
    });

    if (!video) return res.status(404).json({ erro: "Vídeo não encontrado" });

    const formatado = {
      ...video,
      nome_usuario: video.usuario?.nome_completo || "Autor",
      foto_perfil: video.usuario?.foto_perfil || "",
      funcao_usuario: video.usuario?.funcao || "",
    };

    res.json(formatado);
  } catch (err) {
    console.error("GET /video/:id error:", err);
    res.status(500).json({ erro: err.message });
  }
});

rotaVideo.post("/", async (req, res) => {
  try {
    const {
      denuncia,
      descricao,
      like,
      dislike,
      titulo,
      urlVideo,
      id_usuario,
      material_id,
    } = req.body;

    if (!titulo || !urlVideo || !id_usuario) {
      return res
        .status(400)
        .json({ erro: "titulo, urlVideo e id_usuario são obrigatórios" });
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
        denuncia: Number(denuncia || 0),
        like: Number(like || 0),
        dislike: Number(dislike || 0),
        usuario: { connect: { id: Number(id_usuario) } },
        ...(material_id
          ? { material: { connect: { id: Number(material_id) } } }
          : {}),
      },
      include: {
        usuario: {
          select: {
            nome_completo: true,
            foto_perfil: true,
            funcao: true,
          },
        },
      },
    });

    const formatado = {
      ...novoVideo,
      nome_usuario: novoVideo.usuario.nome_completo,
      foto_perfil: novoVideo.usuario.foto_perfil,
      funcao_usuario: novoVideo.usuario.funcao,
    };

    res.status(201).json(formatado);
  } catch (err) {
    console.error("POST /video error:", err);
    res.status(500).json({ erro: err.message });
  }
});

rotaVideo.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.video.delete({ where: { id } });
    res.json({ mensagem: "OK" });
  } catch (err) {
    console.error("DELETE /video/:id error:", err);
    res.status(500).json({ erro: err.message });
  }
});

rotaVideo.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = {};

    if (req.body.denuncia !== undefined) data.denuncia = req.body.denuncia;
    if (req.body.descricao !== undefined) data.descricao = req.body.descricao;
    if (req.body.data_postagem !== undefined)
      data.data_postagem = new Date(req.body.data_postagem);
    if (req.body.like !== undefined) data.like = req.body.like;
    if (req.body.dislike !== undefined) data.dislike = req.body.dislike;
    if (req.body.titulo !== undefined) data.titulo = req.body.titulo;
    if (req.body.urlVideo !== undefined) data.urlVideo = req.body.urlVideo;
    if (req.body.material_id !== undefined) {
      const matId = req.body.material_id;
      if (matId) {
        data.material = { connect: { id: Number(matId) } };
      } else {
        data.material = { disconnect: true };
      }
    }

    const videoAtualizado = await db.video.update({
      where: { id },
      data,
      include: { usuario: true, material: true },
    });

    res.json(videoAtualizado);
  } catch (err) {
    console.error("PUT /video/:id error:", err);
    res.status(500).json({ erro: err.message });
  }
});

module.exports = { rotaVideo };
