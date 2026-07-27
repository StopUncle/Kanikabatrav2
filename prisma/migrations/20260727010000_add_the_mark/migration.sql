-- The Mark: the vulnerability profile (tactic x operator).
-- Additive only. No existing column changes type, no data moves.

-- CreateEnum
CREATE TYPE "MarkSource" AS ENUM ('BASELINE', 'TELL', 'SCENARIO', 'LAB', 'RECEIPT');

-- AlterTable: content tags. Null on existing Tells; untagged content
-- never speaks in the ledger, which the honesty rule already covers.
ALTER TABLE "Tell" ADD COLUMN "tactic" TEXT,
ADD COLUMN "operatorType" TEXT;

-- CreateTable
CREATE TABLE "MarkEncounter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tactic" TEXT,
    "operatorType" TEXT,
    "correct" BOOLEAN NOT NULL,
    "source" "MarkSource" NOT NULL,
    "sourceId" TEXT,
    "answerMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarkEncounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaselineAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemsVersion" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "correctCount" INTEGER NOT NULL,
    "itemCount" INTEGER NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BaselineAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MirrorReading" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "scores" JSONB NOT NULL,
    "dominantType" TEXT NOT NULL,
    "secondaryType" TEXT,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MirrorReading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MarkEncounter_userId_createdAt_idx" ON "MarkEncounter"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "MarkEncounter_userId_tactic_idx" ON "MarkEncounter"("userId", "tactic");

-- CreateIndex
CREATE INDEX "MarkEncounter_userId_operatorType_idx" ON "MarkEncounter"("userId", "operatorType");

-- CreateIndex
CREATE INDEX "BaselineAttempt_userId_takenAt_idx" ON "BaselineAttempt"("userId", "takenAt");

-- CreateIndex
CREATE INDEX "MirrorReading_userId_takenAt_idx" ON "MirrorReading"("userId", "takenAt");

-- AddForeignKey
ALTER TABLE "MarkEncounter" ADD CONSTRAINT "MarkEncounter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaselineAttempt" ADD CONSTRAINT "BaselineAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MirrorReading" ADD CONSTRAINT "MirrorReading_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
