-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_analystId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "analystId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_analystId_fkey" FOREIGN KEY ("analystId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
