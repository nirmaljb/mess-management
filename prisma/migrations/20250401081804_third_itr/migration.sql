/*
  Warnings:

  - The values [PENDING,SUCCESS,FAILED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `payment_date` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('pending', 'captured', 'failed');
ALTER TABLE "Payment" ALTER COLUMN "payment_status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "payment_status" TYPE "PaymentStatus_new" USING ("payment_status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "payment_status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payment_date",
DROP COLUMN "updated_at",
ALTER COLUMN "payment_status" SET DEFAULT 'pending';
