-- CreateTable
CREATE TABLE "ProcessInstanceLog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessInstanceLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_processId_fkey" FOREIGN KEY ("processId") REFERENCES "ProcessInstanceLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
