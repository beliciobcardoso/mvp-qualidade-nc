-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "scopeServiceId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "ScopeService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'RELATÓRIO DE MANUTENÇÃO CORRETIVA',

    CONSTRAINT "ScopeService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_scopeServiceId_fkey" FOREIGN KEY ("scopeServiceId") REFERENCES "ScopeService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
