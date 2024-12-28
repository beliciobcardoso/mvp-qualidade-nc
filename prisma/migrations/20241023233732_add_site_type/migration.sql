/*
  Warnings:

  - You are about to drop the column `tipoSite` on the `Site` table. All the data in the column will be lost.
  - Added the required column `siteTypeId` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "tipoSite",
ADD COLUMN     "siteTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SiteType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SiteType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_siteTypeId_fkey" FOREIGN KEY ("siteTypeId") REFERENCES "SiteType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
