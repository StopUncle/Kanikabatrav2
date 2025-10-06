-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('BOOK', 'COURSE', 'COACHING');

-- CreateEnum
CREATE TYPE "public"."PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."SessionType" AS ENUM ('INDIVIDUAL', 'GROUP', 'VIP');

-- CreateEnum
CREATE TYPE "public"."SessionStatus" AS ENUM ('PENDING_SCHEDULING', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" "public"."ProductType" NOT NULL,
    "productVariant" TEXT,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "public"."PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "paypalOrderId" TEXT,
    "paypalCaptureId" TEXT,
    "downloadToken" TEXT,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "maxDownloads" INTEGER NOT NULL DEFAULT 5,
    "lastDownloadAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoachingSession" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "userId" TEXT,
    "packageName" TEXT NOT NULL,
    "sessionCount" INTEGER NOT NULL DEFAULT 1,
    "scheduledAt" TIMESTAMP(3),
    "duration" INTEGER,
    "status" "public"."SessionStatus" NOT NULL DEFAULT 'PENDING_SCHEDULING',
    "meetingUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachingSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_paypalOrderId_key" ON "public"."Purchase"("paypalOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_downloadToken_key" ON "public"."Purchase"("downloadToken");

-- CreateIndex
CREATE INDEX "Purchase_userId_idx" ON "public"."Purchase"("userId");

-- CreateIndex
CREATE INDEX "Purchase_paypalOrderId_idx" ON "public"."Purchase"("paypalOrderId");

-- CreateIndex
CREATE INDEX "Purchase_customerEmail_idx" ON "public"."Purchase"("customerEmail");

-- CreateIndex
CREATE INDEX "Purchase_downloadToken_idx" ON "public"."Purchase"("downloadToken");

-- CreateIndex
CREATE INDEX "CoachingSession_userId_idx" ON "public"."CoachingSession"("userId");

-- CreateIndex
CREATE INDEX "CoachingSession_purchaseId_idx" ON "public"."CoachingSession"("purchaseId");

-- CreateIndex
CREATE INDEX "CoachingSession_scheduledAt_idx" ON "public"."CoachingSession"("scheduledAt");

-- AddForeignKey
ALTER TABLE "public"."Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingSession" ADD CONSTRAINT "CoachingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoachingSession" ADD CONSTRAINT "CoachingSession_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "public"."Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
