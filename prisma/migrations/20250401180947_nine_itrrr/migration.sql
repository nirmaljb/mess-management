/*
  Warnings:

  - Changed the type of `reason` on the `Request` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "reason",
ADD COLUMN     "reason" "ReductionReason" NOT NULL;
