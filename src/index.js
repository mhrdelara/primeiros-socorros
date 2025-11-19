const express = require("express");
const path = require("path");
const { rotaUsuario } = require("./controllers/usuario");
const { rotaMaterial } = require("./controllers/material");
const { rotaVideo } = require("./controllers/video");
const { rotaLogin } = require("./controllers/login");
const { rotaLike } = require("./controllers/like");

const server = express();

server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));

server.use("/usuario", rotaUsuario);
server.use("/material", rotaMaterial);
server.use("/video", rotaVideo);
server.use("/login", rotaLogin);
server.use("/like", rotaLike);

server.use(express.static(path.join(__dirname, "assets")));

server.get("/", (req, res) => res.sendFile(__dirname + "/pages/index.html"));
server.get("/tela-cadastro", (req, res) =>
  res.sendFile(__dirname + "/pages/tela-cadastro.html")
);
server.get("/tela-postagem", (req, res) =>
  res.sendFile(__dirname + "/pages/tela-postagem.html")
);
server.get("/tela-alterar-usuario", (req, res) =>
  res.sendFile(__dirname + "/pages/tela-alterar-usuario.html")
);
server.get("/tela-validacao", (req, res) =>
  res.sendFile(__dirname + "/pages/tela-validacao.html")
);
server.get("/tela-video", (req, res) =>
  res.sendFile(__dirname + "/pages/tela-video.html")
);
server.get("/tela-usuario-login", (req, res) =>
  res.sendFile(__dirname + "/pages/tela-usuario-login.html")
);
server.get("/recomendacao", (req, res) =>
  res.sendFile(__dirname + "/pages/recomendacao.html")
);

server.listen(3001, () => console.log("Servidor rodando na porta 3001"));
