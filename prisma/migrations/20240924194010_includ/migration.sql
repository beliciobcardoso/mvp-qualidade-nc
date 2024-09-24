/*
  Warnings:

  - You are about to drop the `report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "report";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCliente" TEXT NOT NULL,
    "idSite" TEXT NOT NULL,
    "altura" TEXT,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "tecnico" TEXT NOT NULL,
    "dataServico" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "finishedAt" DATETIME,
    "tipoSite" TEXT NOT NULL,
    "tipoEstrutura" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PhotoAnalisys" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idReport" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "PhotoAnalisys_idReport_fkey" FOREIGN KEY ("idReport") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PhotoAnalisys_idReport_key" ON "PhotoAnalisys"("idReport");
