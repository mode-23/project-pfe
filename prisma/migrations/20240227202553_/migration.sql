/*
  Warnings:

  - You are about to drop the column `processId` on the `Process` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_processId_fkey";

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "processId";
