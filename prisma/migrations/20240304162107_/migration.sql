-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_processId_fkey" FOREIGN KEY ("processId") REFERENCES "ProcessInstanceLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
