-- Dark Mirror simulator — per-user progress + earned badges.
--
-- Railway production deploys now run `prisma migrate deploy` at pre-deploy;
-- the earlier `prisma db push` in nixpacks.toml was no longer syncing the
-- schema in the Railway V2 runtime. Adding this migration as the
-- authoritative way to ship the tables.

-- ---------------------------------------------------------------------------
-- SimulatorProgress — one row per (userId, scenarioId), latest playthrough
-- ---------------------------------------------------------------------------
CREATE TABLE "SimulatorProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "currentSceneId" TEXT NOT NULL,
    "choicesMade" JSONB NOT NULL DEFAULT '[]',
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "outcome" TEXT,

    CONSTRAINT "SimulatorProgress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SimulatorProgress_userId_scenarioId_key"
    ON "SimulatorProgress"("userId", "scenarioId");
CREATE INDEX "SimulatorProgress_userId_idx" ON "SimulatorProgress"("userId");
CREATE INDEX "SimulatorProgress_scenarioId_idx" ON "SimulatorProgress"("scenarioId");

ALTER TABLE "SimulatorProgress"
    ADD CONSTRAINT "SimulatorProgress_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ---------------------------------------------------------------------------
-- SimulatorBadge — badges earned across scenarios (unique per user+key)
-- ---------------------------------------------------------------------------
CREATE TABLE "SimulatorBadge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeKey" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SimulatorBadge_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SimulatorBadge_userId_badgeKey_key"
    ON "SimulatorBadge"("userId", "badgeKey");
CREATE INDEX "SimulatorBadge_userId_idx" ON "SimulatorBadge"("userId");

ALTER TABLE "SimulatorBadge"
    ADD CONSTRAINT "SimulatorBadge_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
