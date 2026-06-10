-- CreateEnum
CREATE TYPE "LabSessionStatus" AS ENUM ('ACTIVE', 'ENDED', 'ABANDONED');

-- CreateTable
CREATE TABLE "LabSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "personaKey" TEXT NOT NULL,
    "status" "LabSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "transcript" JSONB NOT NULL DEFAULT '[]',
    "turnCount" INTEGER NOT NULL DEFAULT 0,
    "score" JSONB,
    "costMicros" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "LabSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LabSession_userId_createdAt_idx" ON "LabSession"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "LabSession_status_createdAt_idx" ON "LabSession"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "LabSession" ADD CONSTRAINT "LabSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
