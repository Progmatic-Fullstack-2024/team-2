-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('actor', 'director', 'writer', 'stageDesigner');

-- CreateEnum
CREATE TYPE "TargetAge" AS ENUM ('adult', 'kid', 'teenager', 'every_age');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('default');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'theaterAdmin', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" "Theme" NOT NULL,

    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "theaterId" TEXT NOT NULL,
    "posterURL" TEXT,
    "imagesURL" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT NOT NULL,
    "targetAudience" "TargetAge",
    "performanceEventId" TEXT,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceEvents" (
    "id" TEXT NOT NULL,
    "spots" INTEGER NOT NULL,
    "soldSpots" INTEGER NOT NULL DEFAULT 0,
    "performanceId" TEXT NOT NULL,
    "performanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerformanceEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuturePerformances" (
    "id" TEXT NOT NULL,
    "targetBudgetIdeal" INTEGER NOT NULL,
    "targetBudget" INTEGER NOT NULL,
    "minimumBudget" INTEGER NOT NULL,
    "actualBudget" INTEGER NOT NULL,
    "gift" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,

    CONSTRAINT "FuturePerformances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT,
    "profession" "Profession"[],
    "awards" TEXT,
    "introductions" TEXT,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theater" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageURL" TEXT,
    "phone" TEXT,
    "seatsAvailable" INTEGER,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TheaterAdmin" (
    "userId" TEXT NOT NULL,
    "theaterId" TEXT NOT NULL,

    CONSTRAINT "TheaterAdmin_pkey" PRIMARY KEY ("userId")
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

-- CreateTable
CREATE TABLE "UserSeasonTicket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonTicketId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSeasonTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVisitedPerformance" (
    "id" TEXT NOT NULL,
    "qrImage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "performanceEventsId" TEXT NOT NULL,
    "userSeasonTicketId" TEXT NOT NULL,

    CONSTRAINT "UserVisitedPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Performance_Genre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PerformanceFollower_User" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Company_Creator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Performance_Creator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TheaterFollower_User" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSetting_userId_key" ON "UserSetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Performance_performanceEventId_key" ON "Performance"("performanceEventId");

-- CreateIndex
CREATE UNIQUE INDEX "FuturePerformances_performanceId_key" ON "FuturePerformances"("performanceId");

-- CreateIndex
CREATE UNIQUE INDEX "_Performance_Genre_AB_unique" ON "_Performance_Genre"("A", "B");

-- CreateIndex
CREATE INDEX "_Performance_Genre_B_index" ON "_Performance_Genre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PerformanceFollower_User_AB_unique" ON "_PerformanceFollower_User"("A", "B");

-- CreateIndex
CREATE INDEX "_PerformanceFollower_User_B_index" ON "_PerformanceFollower_User"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Company_Creator_AB_unique" ON "_Company_Creator"("A", "B");

-- CreateIndex
CREATE INDEX "_Company_Creator_B_index" ON "_Company_Creator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Performance_Creator_AB_unique" ON "_Performance_Creator"("A", "B");

-- CreateIndex
CREATE INDEX "_Performance_Creator_B_index" ON "_Performance_Creator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TheaterFollower_User_AB_unique" ON "_TheaterFollower_User"("A", "B");

-- CreateIndex
CREATE INDEX "_TheaterFollower_User_B_index" ON "_TheaterFollower_User"("B");

-- AddForeignKey
ALTER TABLE "UserSetting" ADD CONSTRAINT "UserSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_performanceEventId_fkey" FOREIGN KEY ("performanceEventId") REFERENCES "PerformanceEvents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceEvents" ADD CONSTRAINT "PerformanceEvents_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuturePerformances" ADD CONSTRAINT "FuturePerformances_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheaterAdmin" ADD CONSTRAINT "TheaterAdmin_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TheaterAdmin" ADD CONSTRAINT "TheaterAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeasonTicket" ADD CONSTRAINT "UserSeasonTicket_seasonTicketId_fkey" FOREIGN KEY ("seasonTicketId") REFERENCES "SeasonTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeasonTicket" ADD CONSTRAINT "UserSeasonTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_performanceEventsId_fkey" FOREIGN KEY ("performanceEventsId") REFERENCES "PerformanceEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVisitedPerformance" ADD CONSTRAINT "UserVisitedPerformance_userSeasonTicketId_fkey" FOREIGN KEY ("userSeasonTicketId") REFERENCES "UserSeasonTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Performance_Genre" ADD CONSTRAINT "_Performance_Genre_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Performance_Genre" ADD CONSTRAINT "_Performance_Genre_B_fkey" FOREIGN KEY ("B") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerformanceFollower_User" ADD CONSTRAINT "_PerformanceFollower_User_A_fkey" FOREIGN KEY ("A") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerformanceFollower_User" ADD CONSTRAINT "_PerformanceFollower_User_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Company_Creator" ADD CONSTRAINT "_Company_Creator_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Company_Creator" ADD CONSTRAINT "_Company_Creator_B_fkey" FOREIGN KEY ("B") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Performance_Creator" ADD CONSTRAINT "_Performance_Creator_A_fkey" FOREIGN KEY ("A") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Performance_Creator" ADD CONSTRAINT "_Performance_Creator_B_fkey" FOREIGN KEY ("B") REFERENCES "Performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheaterFollower_User" ADD CONSTRAINT "_TheaterFollower_User_A_fkey" FOREIGN KEY ("A") REFERENCES "Theater"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheaterFollower_User" ADD CONSTRAINT "_TheaterFollower_User_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
