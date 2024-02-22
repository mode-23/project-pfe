/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "project" TEXT NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);
