/*
  Warnings:

  - You are about to drop the column `fullname` on the `Query` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Query` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Query" DROP COLUMN "fullname",
DROP COLUMN "image_url",
ADD COLUMN     "photo_url" TEXT;
