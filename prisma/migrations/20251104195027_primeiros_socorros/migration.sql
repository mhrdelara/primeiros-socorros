-- CreateTable
CREATE TABLE "Usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "foto_perfil" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "denuncia" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "data_postagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "like" TEXT NOT NULL,
    "dislike" TEXT NOT NULL,
    "usuariosId" INTEGER NOT NULL,
    CONSTRAINT "Cursos_usuariosId_fkey" FOREIGN KEY ("usuariosId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "materiais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "anexo" TEXT NOT NULL,
    "urlVideo" TEXT NOT NULL,
    "data_postagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cursosId" INTEGER NOT NULL,
    CONSTRAINT "materiais_cursosId_fkey" FOREIGN KEY ("cursosId") REFERENCES "Cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
