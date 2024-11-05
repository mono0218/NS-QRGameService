/*
  Warnings:

  - Added the required column `serviceId` to the `Qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Qrcode" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Qrcode" ADD CONSTRAINT "Qrcode_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
