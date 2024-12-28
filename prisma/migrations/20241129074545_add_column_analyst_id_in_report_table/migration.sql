/*
  Warnings:

  - Added the required column `analystId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "analystId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_analystId_fkey" FOREIGN KEY ("analystId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
