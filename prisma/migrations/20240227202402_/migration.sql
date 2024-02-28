-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "processId" TEXT;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
