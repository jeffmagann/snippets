/*
  Warnings:

  - You are about to drop the `Snippet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Snippet";

-- CreateTable
CREATE TABLE "snippet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "snippet_pkey" PRIMARY KEY ("id")
);
