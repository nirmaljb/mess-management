-- CreateEnum
CREATE TYPE "ReductionRequest" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ReductionReason" AS ENUM ('vacation', 'medical_emergency', 'family_crisis', 'scholarship', 'other');

-- CreateTable
CREATE TABLE "MessReductionRequest" (
    "id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "enrollment_no" TEXT NOT NULL,
    "reason" "ReductionReason" NOT NULL,
    "attached_letter" TEXT,
    "status" "ReductionRequest" NOT NULL DEFAULT 'pending',
    "starting_date" TEXT NOT NULL,
    "ending_date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessReductionRequest_pkey" PRIMARY KEY ("unique_id")
);

-- AddForeignKey
ALTER TABLE "MessReductionRequest" ADD CONSTRAINT "MessReductionRequest_enrollment_no_fkey" FOREIGN KEY ("enrollment_no") REFERENCES "User"("enrollment_no") ON DELETE RESTRICT ON UPDATE CASCADE;
