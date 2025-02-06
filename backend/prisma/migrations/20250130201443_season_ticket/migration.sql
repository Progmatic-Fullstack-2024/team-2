/*
  Warnings:

  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'theaterAdmin', 'admin');

-- DropIndex
DROP INDEX "TheaterAdmin_userId_key";

-- DropIndex
DROP INDEX "TheaterAdmin_userId_theaterId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "UserVisitedPerformance" (
    "id" TEXT NOT NULL,
    "qrImage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,
    "seasonTicketId" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,

    CONSTRAINT "UserVisitedPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSeasonTicket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonTicketId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSeasonTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonTicket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "durationDay" INTEGER NOT NULL,
    "seatQuantity" INTEGER NOT NULL,

    CONSTRAINT "SeasonTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeasonTicket_id_key" ON "SeasonTicket"("id");

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_seasonTicketId_fkey" FOREIGN KEY ("seasonTicketId") REFERENCES "SeasonTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeasonTicket" ADD CONSTRAINT "UserSeasonTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeasonTicket" ADD CONSTRAINT "UserSeasonTicket_seasonTicketId_fkey" FOREIGN KEY ("seasonTicketId") REFERENCES "SeasonTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
