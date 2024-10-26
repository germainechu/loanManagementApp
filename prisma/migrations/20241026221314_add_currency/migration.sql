/*
  Warnings:

  - Added the required column `currency` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'NZD');

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "currency" "Currency" NOT NULL;
