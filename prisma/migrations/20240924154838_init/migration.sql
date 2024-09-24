-- CreateTable
CREATE TABLE "report" (
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
