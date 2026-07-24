-- CreateEnum
CREATE TYPE "StandingSource" AS ENUM ('SCENARIO', 'DAILY_MISSION', 'TELL', 'DRILL', 'LAB', 'RECEIPT', 'COMMENT', 'QUESTION_ANSWERED', 'STREAK_MILESTONE', 'BASELINE', 'SESSION_WATCH', 'RETRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ringLevel" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "standing" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "StandingEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "source" "StandingSource" NOT NULL,
    "amount" INTEGER NOT NULL,
    "refId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StandingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StandingEvent_userId_createdAt_idx" ON "StandingEvent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "StandingEvent_userId_source_refId_idx" ON "StandingEvent"("userId", "source", "refId");

-- AddForeignKey
ALTER TABLE "StandingEvent" ADD CONSTRAINT "StandingEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
