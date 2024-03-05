/*
  Warnings:

  - You are about to drop the `Process` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Process";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "project" TEXT NOT NULL,
    "processName" TEXT NOT NULL,
    "processId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
