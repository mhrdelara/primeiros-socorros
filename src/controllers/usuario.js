const { Router } = require("express");
const { db } = require("../db");
const rotaUsuario = Router();

function converterDataBR(data) {
  const [dia, mes, ano] = data.split("/");
  return `${ano}-${mes}-${dia}`;
}

rotaUsuario.get("/", async (req, res) => {
  try {
    const usuarios = await db.usuario.findMany();
    res.json(usuarios);
  } catch (e) {
    console.error("GET /usuario error:", e);
    res
      .status(500)
      .json({ erro: "Falha ao buscar usuários", detalhe: e.message });
  }
});

rotaUsuario.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = await db.usuario.findUnique({ where: { id } });

    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json(usuario);
  } catch (e) {
    console.error("GET /usuario/:id erro:", e);
    res.status(500).json({ erro: "Falha ao buscar usuário" });
  }
});

rotaUsuario.post("/", async (req, res) => {
  const {
    nome_completo,
    data_nascimento,
    email,
    crm,
    funcao,
    matricula,
    foto_perfil,
    senha,
  } = req.body || {};

  if (!nome_completo || !email || !crm || !senha || !data_nascimento) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando" });
  }

  let dataISO;
  try {
    const convertida = converterDataBR(data_nascimento);
    dataISO = new Date(convertida);
    if (isNaN(dataISO.getTime())) throw new Error("Data inválida");
  } catch {
    return res
      .status(400)
      .json({ erro: "Formato da data inválido. Use dd/mm/yyyy" });
  }

  try {
    const usuarioCriado = await db.usuario.create({
      data: {
        nome_completo,
        data_nascimento: dataISO,
        email,
        crm,
        funcao: funcao || "Não informado",
        matricula: matricula || crm,
        foto_perfil: foto_perfil || "",
        senha,
      },
    });

    res.json(usuarioCriado);
  } catch (e) {
    console.error("Erro criando usuário:", e);
    return res.status(500).json({
      erro: "Falha ao criar usuário",
      detalhe: e.message,
    });
  }
});

rotaUsuario.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.usuario.delete({ where: { id } });
    res.json({ mensagem: "OK" });
  } catch (e) {
    console.error("DELETE /usuario/:id erro:", e);
    res
      .status(500)
      .json({ erro: "Falha ao deletar usuário", detalhe: e.message });
  }
});

rotaUsuario.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = {};
    const campos = [
      "nome_completo",
      "data_nascimento",
      "email",
      "crm",
      "funcao",
      "matricula",
      "foto_perfil",
      "senha",
    ];

    campos.forEach((campo) => {
      if (req.body[campo] !== undefined) {
        if (campo === "data_nascimento") {
          try {
            const convertida = converterDataBR(req.body[campo]);
            const dataISO = new Date(convertida);
            if (isNaN(dataISO)) throw new Error("Data inválida");
            data[campo] = dataISO;
          } catch {
            return res.status(400).json({
              erro: "Formato da data inválido. Use dd/mm/yyyy",
            });
          }
        } else {
          data[campo] = req.body[campo];
        }
      }
    });

    await db.usuario.update({ where: { id }, data });
    res.json({ mensagem: "OK" });
  } catch (e) {
    console.error("PUT /usuario/:id erro:", e);
    res
      .status(500)
      .json({ erro: "Falha ao atualizar usuário", detalhe: e.message });
  }
});

module.exports = { rotaUsuario };
