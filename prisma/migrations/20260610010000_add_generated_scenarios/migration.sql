-- CreateEnum
CREATE TYPE "GeneratedScenarioStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'REJECTED');

-- CreateTable
CREATE TABLE "GeneratedScenario" (
    "id" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "status" "GeneratedScenarioStatus" NOT NULL DEFAULT 'DRAFT',
    "json" JSONB NOT NULL,
    "briefKey" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "costMicros" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "GeneratedScenario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedScenario_scenarioId_key" ON "GeneratedScenario"("scenarioId");

-- CreateIndex
CREATE INDEX "GeneratedScenario_status_createdAt_idx" ON "GeneratedScenario"("status", "createdAt");
