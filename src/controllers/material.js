const { Router } = require("express");
const { db } = require("../db");
const rotaMaterial = Router();

rotaMaterial.get("/material", async (req, res) => {
  const material = await db.material.findMany();
  res.json(material);
});

rotaMaterial.post("/material", async (req, res) => {
  const { anexo } = req.body;
  await db.material.create({
    data: {
      anexo,
    },
  });
  res.json({ mensagem: "OK" });
});

rotaMaterial.delete("/material/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.material.delete({
    where: { id },
  });
  res.json({ mensagem: "OK" });
});

rotaMaterial.put("/material/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = {};

  if (req.body.data_postagem) data.data_postagem = req.body.data_postagem;
  if (req.body.anexo) data.anexo = req.body.anexo;

  await db.material.update({
    where: { id },
    data,
  });

  res.send({ mensagem: "OK" });
});

module.exports = { rotaMaterial };
