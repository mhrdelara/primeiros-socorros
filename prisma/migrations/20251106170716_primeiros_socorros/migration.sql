/*
  Warnings:

  - You are about to drop the `materias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nota` on the `Cursos` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "materias";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "materiais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anexo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "urlVideo" TEXT NOT NULL,
    "data_postagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cursosId" INTEGER NOT NULL,
    CONSTRAINT "materiais_cursosId_fkey" FOREIGN KEY ("cursosId") REFERENCES "Cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "denuncia" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "data_postagem" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "like" TEXT NOT NULL,
    "dislike" TEXT NOT NULL,
    "usuariosId" INTEGER NOT NULL,
    CONSTRAINT "Cursos_usuariosId_fkey" FOREIGN KEY ("usuariosId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cursos" ("data_postagem", "denuncia", "dislike", "id", "like", "texto", "usuariosId") SELECT "data_postagem", "denuncia", "dislike", "id", "like", "texto", "usuariosId" FROM "Cursos";
DROP TABLE "Cursos";
ALTER TABLE "new_Cursos" RENAME TO "Cursos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
