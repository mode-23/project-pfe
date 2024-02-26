-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "processList" TEXT[],

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);
