/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Performance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_creatorId_fkey";

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "creatorId";

-- CreateTable
CREATE TABLE "_Performance_Creator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Performance_Creator_AB_unique" ON "_Performance_Creator"("A", "B");

-- CreateIndex
CREATE INDEX "_Performance_Creator_B_index" ON "_Performance_Creator"("B");

-- AddForeignKey
ALTER TABLE "_Performance_Creator" ADD CONSTRAINT "_Performance_Creator_A_fkey" FOREIGN KEY ("A") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Performance_Creator" ADD CONSTRAINT "_Performance_Creator_B_fkey" FOREIGN KEY ("B") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
