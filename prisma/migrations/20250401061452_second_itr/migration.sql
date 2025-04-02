/*
  Warnings:

  - You are about to drop the column `studentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Query` table. All the data in the column will be lost.
  - Added the required column `enrollment_no` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollment_no` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_studentId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "studentId",
ADD COLUMN     "enrollment_no" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Query" DROP COLUMN "studentId",
ADD COLUMN     "enrollment_no" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_enrollment_no_fkey" FOREIGN KEY ("enrollment_no") REFERENCES "User"("enrollment_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_enrollment_no_fkey" FOREIGN KEY ("enrollment_no") REFERENCES "User"("enrollment_no") ON DELETE RESTRICT ON UPDATE CASCADE;
