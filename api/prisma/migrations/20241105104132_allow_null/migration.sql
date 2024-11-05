-- DropForeignKey
ALTER TABLE "Qrcode" DROP CONSTRAINT "Qrcode_userId_fkey";

-- AlterTable
ALTER TABLE "Qrcode" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Qrcode" ADD CONSTRAINT "Qrcode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
