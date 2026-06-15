-- CreateEnum
CREATE TYPE "Category" AS ENUM ('hotels', 'entertainment', 'food', 'carRentals', 'shopping');

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "wantToVisit" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "category" "Category" NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
