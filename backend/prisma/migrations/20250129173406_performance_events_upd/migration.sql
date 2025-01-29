/*
  Warnings:

  - The `performanceDate` column on the `PerformanceEvents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PerformanceEvents" DROP COLUMN "performanceDate",
ADD COLUMN     "performanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
