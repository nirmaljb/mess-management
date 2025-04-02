-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "logged_in_time" TEXT,
    "logged_out_time" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("unique_id")
);
