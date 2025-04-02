-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "enrollment_no" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "enrolled_year" INTEGER NOT NULL,
    "expected_graduation_year" INTEGER NOT NULL,
    "hostel_name" TEXT NOT NULL,
    "room_no" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("unique_id")
);

-- CreateTable
CREATE TABLE "Query" (
    "id" SERIAL NOT NULL,
    "unqiue_id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("unqiue_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("unique_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_enrollment_no_key" ON "User"("enrollment_no");

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("enrollment_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("enrollment_no") ON DELETE RESTRICT ON UPDATE CASCADE;
