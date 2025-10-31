const express = require("express");
const { db } = require("./db");
const { rotaUsuario } = require("./controllers/usuario");
const server = express("");

server.use(express.json());
server.use(rotaUsuario);
server.listen(3000, console.log("Rodando"));
