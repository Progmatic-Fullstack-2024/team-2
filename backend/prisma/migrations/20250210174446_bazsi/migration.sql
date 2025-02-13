/*
  Warnings:

  - You are about to drop the column `performanceId` on the `UserVisitedPerformance` table. All the data in the column will be lost.
  - You are about to drop the column `seasonTicketId` on the `UserVisitedPerformance` table. All the data in the column will be lost.
  - Added the required column `performanceEventsId` to the `UserVisitedPerformance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSeasonTicketId` to the `UserVisitedPerformance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserVisitedPerformance" DROP CONSTRAINT "UserVisitedPerformance_performanceId_fkey";

-- DropForeignKey
ALTER TABLE "UserVisitedPerformance" DROP CONSTRAINT "UserVisitedPerformance_seasonTicketId_fkey";

-- DropIndex
DROP INDEX "SeasonTicket_id_key";

-- AlterTable
ALTER TABLE "UserVisitedPerformance" DROP COLUMN "performanceId",
DROP COLUMN "seasonTicketId",
ADD COLUMN     "performanceEventsId" TEXT NOT NULL,
ADD COLUMN     "userSeasonTicketId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_userSeasonTicketId_fkey" FOREIGN KEY ("userSeasonTicketId") REFERENCES "UserSeasonTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_performanceEventsId_fkey" FOREIGN KEY ("performanceEventsId") REFERENCES "PerformanceEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
