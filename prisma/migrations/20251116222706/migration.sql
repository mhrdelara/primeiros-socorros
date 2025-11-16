-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_completo" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "foto_perfil" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "denuncia" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_postagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome_usuario" TEXT NOT NULL,
    "foto_perfil" TEXT NOT NULL,
    "like" INTEGER NOT NULL,
    "dislike" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "urlVideo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Video_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anexo" TEXT NOT NULL,
    "data_postagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoId" INTEGER NOT NULL,
    CONSTRAINT "Material_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
