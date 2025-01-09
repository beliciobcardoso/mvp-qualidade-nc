-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "scopeServiceId" INTEGER;

-- CreateTable
CREATE TABLE "ScopeService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ScopeService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_scopeServiceId_fkey" FOREIGN KEY ("scopeServiceId") REFERENCES "ScopeService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
