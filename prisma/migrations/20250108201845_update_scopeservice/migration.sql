/*
  Warnings:

  - Made the column `scopeServiceId` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_scopeServiceId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "scopeServiceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_scopeServiceId_fkey" FOREIGN KEY ("scopeServiceId") REFERENCES "ScopeService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
