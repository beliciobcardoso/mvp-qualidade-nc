/*
  Warnings:

  - A unique constraint covering the columns `[idSite]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Site_idSite_key" ON "Site"("idSite");
