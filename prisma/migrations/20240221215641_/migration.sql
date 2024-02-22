/*
  Warnings:

  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - Added the required column `date` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
