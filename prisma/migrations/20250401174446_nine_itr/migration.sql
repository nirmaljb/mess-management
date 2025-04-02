/*
  Warnings:

  - You are about to drop the `MessReductionRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessReductionRequest" DROP CONSTRAINT "MessReductionRequest_enrollment_no_fkey";

-- DropTable
DROP TABLE "MessReductionRequest";

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "enrollment_no" TEXT NOT NULL,
    "reason" "ReductionReason" NOT NULL,
    "attached_letter" TEXT,
    "status" "ReductionRequestStatus" NOT NULL DEFAULT 'pending',
    "starting_date" TEXT NOT NULL,
    "ending_date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("unique_id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_enrollment_no_fkey" FOREIGN KEY ("enrollment_no") REFERENCES "User"("enrollment_no") ON DELETE RESTRICT ON UPDATE CASCADE;
