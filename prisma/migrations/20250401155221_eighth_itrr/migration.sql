/*
  Warnings:

  - The `status` column on the `MessReductionRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Query` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ReductionRequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "QueryStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "MessReductionRequest" DROP COLUMN "status",
ADD COLUMN     "status" "ReductionRequestStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Query" DROP COLUMN "status",
ADD COLUMN     "status" "QueryStatus" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "ReductionRequest";
