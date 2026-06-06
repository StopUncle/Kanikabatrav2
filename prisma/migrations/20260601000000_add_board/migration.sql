-- THE BOARD: ranked PCL-R-anchored instrument scoring public figures.
-- Figures (with calibration anchors), append-only Score history, public
-- Sources, account-gated CrowdVote + RescorePetition, and a real-event
-- activity feed (BoardActivityEvent) powering the live ticker.

-- CreateEnum
CREATE TYPE "Archetype" AS ENUM ('OPERATOR', 'TRAINWRECK');

-- CreateEnum
CREATE TYPE "FigureStatus" AS ENUM ('ON_BOARD', 'RESCORE_PENDING', 'MOST_REQUESTED');

-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('NEGLIGIBLE', 'LOW', 'MODERATE', 'ELEVATED', 'HIGH');

-- CreateEnum
CREATE TYPE "BoardEventType" AS ENUM ('VOTE', 'PETITION', 'DEBUT', 'RESCORE_REVEALED');

-- CreateTable
CREATE TABLE "Figure" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descriptor" TEXT,
    "photoUrl" TEXT,
    "archetype" "Archetype",
    "status" "FigureStatus" NOT NULL DEFAULT 'ON_BOARD',
    "isCalibration" BOOLEAN NOT NULL DEFAULT false,
    "featuredRequest" BOOLEAN NOT NULL DEFAULT false,
    "currentScoreId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Figure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "figureId" TEXT NOT NULL,
    "composite" INTEGER NOT NULL,
    "factor1" INTEGER NOT NULL,
    "factor2" INTEGER NOT NULL,
    "tier" "Tier" NOT NULL,
    "verdict" TEXT NOT NULL,
    "sectors" JSONB NOT NULL,
    "triggerEvent" TEXT,
    "scoredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "figureId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrowdVote" (
    "id" TEXT NOT NULL,
    "figureId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "composite" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CrowdVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RescorePetition" (
    "id" TEXT NOT NULL,
    "figureId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RescorePetition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardActivityEvent" (
    "id" TEXT NOT NULL,
    "type" "BoardEventType" NOT NULL,
    "figureId" TEXT,
    "figureName" TEXT,
    "figureSlug" TEXT,
    "actorHandle" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoardActivityEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Figure_slug_key" ON "Figure"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Figure_currentScoreId_key" ON "Figure"("currentScoreId");

-- CreateIndex
CREATE INDEX "Figure_status_idx" ON "Figure"("status");

-- CreateIndex
CREATE INDEX "Figure_isCalibration_idx" ON "Figure"("isCalibration");

-- CreateIndex
CREATE INDEX "Score_figureId_scoredAt_idx" ON "Score"("figureId", "scoredAt");

-- CreateIndex
CREATE INDEX "Source_figureId_idx" ON "Source"("figureId");

-- CreateIndex
CREATE INDEX "CrowdVote_figureId_idx" ON "CrowdVote"("figureId");

-- CreateIndex
CREATE UNIQUE INDEX "CrowdVote_figureId_userId_key" ON "CrowdVote"("figureId", "userId");

-- CreateIndex
CREATE INDEX "RescorePetition_figureId_idx" ON "RescorePetition"("figureId");

-- CreateIndex
CREATE UNIQUE INDEX "RescorePetition_figureId_userId_key" ON "RescorePetition"("figureId", "userId");

-- CreateIndex
CREATE INDEX "BoardActivityEvent_createdAt_idx" ON "BoardActivityEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_currentScoreId_fkey" FOREIGN KEY ("currentScoreId") REFERENCES "Score"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdVote" ADD CONSTRAINT "CrowdVote_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdVote" ADD CONSTRAINT "CrowdVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RescorePetition" ADD CONSTRAINT "RescorePetition_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RescorePetition" ADD CONSTRAINT "RescorePetition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
