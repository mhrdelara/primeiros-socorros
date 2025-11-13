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
  res.sendFile(__dirname + "../pages/tela-postagem.html");
});

server.get("/tela-alterar-usuario", (req, res) => {
  res.sendFile(__dirname + "../pages/tela-alterar-usuario.html");
});

server.get("/tela-validacao.html", (req, res) => {
  res.sendFile(__dirname + "../pages/tela-validacao.html");
});

server.get("/tela-video.html", (req, res) => {
  res.sendFile(__dirname + "../pages/tela-video.html");
});

server.get("/login.html", (req, res) => {
  res.sendFile(__dirname + "../login.html");
});

server.get("/recomendacao.html", (req, res) => {
  res.sendFile(__dirname + "../recomendacao.html");
});

server.listen(3001, console.log("Rodando"));
