-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_clientId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
