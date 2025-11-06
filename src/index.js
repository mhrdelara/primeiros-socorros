const express = require("express");
const { db } = require("./db");
const { rotaUsuario } = require("./controllers/usuario");
const { rotaMateriais } = require("./controllers/materiais");
const { rotaCursos } = require("./controllers/cursos");
const server = express();

server.use(express.json());
server.use(rotaUsuario);
server.use(rotaMateriais);
server.use(rotaCursos);

server.get("/", (req, res) => {
  res.json(200);
});

server.listen(3001, console.log("Rodando"));
