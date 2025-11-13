const express = require("express");
const { db } = require("./db");
const path = require("path");
const { rotaUsuario } = require("./controllers/usuario");
const { rotaMateriais } = require("./controllers/materiais");
const { rotaCursos } = require("./controllers/cursos");
const server = express();

server.use(express.json());
server.use(rotaUsuario);
server.use(rotaMateriais);
server.use(rotaCursos);

server.use(express.static(path.join(__dirname, "assets")));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

server.get("/tela-cadastro", (req, res) => {
  res.sendFile(__dirname + "../pages/tela-cadastro.html");
});

server.get("/tela-postagem", (req, res) => {
  res.sendFile(__dirname + "../pages/tela-cadastro.html");
});

server.listen(3001, console.log("Rodando"));
