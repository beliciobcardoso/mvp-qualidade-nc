/*
  Warnings:

  - You are about to drop the column `clientId` on the `Report` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_clientId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "clientId";
