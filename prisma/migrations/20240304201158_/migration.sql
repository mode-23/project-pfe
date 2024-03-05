-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "processId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_processId_fkey" FOREIGN KEY ("processId") REFERENCES "ProcessInstanceLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
