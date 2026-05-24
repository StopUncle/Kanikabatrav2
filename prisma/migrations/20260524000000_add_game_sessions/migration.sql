-- Adds daily-training game sessions and per-user game streak fields.

-- User: streak fields. Default 0 / NULL so the migration applies cleanly
-- to existing rows.
ALTER TABLE "User" ADD COLUMN "gamesStreakCurrent" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "gamesStreakLongest" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "gamesLastSession" TIMESTAMP(3);

-- GameSession: one row per completed game run.
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameKey" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "totalCards" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "maxCombo" INTEGER NOT NULL DEFAULT 0,
    "durationSec" INTEGER NOT NULL,
    "tier" INTEGER NOT NULL DEFAULT 2,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "GameSession_userId_gameKey_playedAt_idx" ON "GameSession"("userId", "gameKey", "playedAt");
CREATE INDEX "GameSession_gameKey_playedAt_idx" ON "GameSession"("gameKey", "playedAt");

ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
