/*
  Warnings:

  - Added the required column `payment_date` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_time` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "payment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_method" TEXT NOT NULL,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "payment_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "image_url" TEXT;
