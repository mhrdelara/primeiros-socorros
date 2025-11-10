/*
  Warnings:

  - You are about to drop the column `telefone` on the `Usuarios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "foto_perfil" TEXT NOT NULL
);
INSERT INTO "new_Usuarios" ("crm", "data_nascimento", "email", "foto_perfil", "funcao", "id", "matricula", "nome", "sobrenome") SELECT "crm", "data_nascimento", "email", "foto_perfil", "funcao", "id", "matricula", "nome", "sobrenome" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
