-- Weekly leagues for Tells. Each ISO week + tier pair is one League row.
-- A user's first scored response of the week creates their LeagueMembership
-- against the tier matching their current Elo (or last week's promote/demote
-- outcome, when the resolution cron has run). Resolution happens Sunday
-- 23:59 UTC and freezes finalRank + outcome on every membership.

CREATE TYPE "LeagueOutcome" AS ENUM ('PROMOTED', 'DEMOTED', 'HELD');

CREATE TABLE "League" (
  "id"         TEXT NOT NULL,
  "weekKey"    TEXT NOT NULL,
  "tierName"   TEXT NOT NULL,
  "tierOrder"  INTEGER NOT NULL,
  "eloMin"     INTEGER NOT NULL,
  "eloMax"     INTEGER NOT NULL,
  "resolvedAt" TIMESTAMP(3),
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "League_weekKey_tierName_key" ON "League"("weekKey", "tierName");
CREATE INDEX "League_weekKey_idx" ON "League"("weekKey");
CREATE INDEX "League_resolvedAt_idx" ON "League"("resolvedAt");

CREATE TABLE "LeagueMembership" (
  "id"             TEXT NOT NULL,
  "userId"         TEXT NOT NULL,
  "leagueId"       TEXT NOT NULL,
  "weekKey"        TEXT NOT NULL,
  "startElo"       INTEGER NOT NULL,
  "weeklyScore"    INTEGER NOT NULL DEFAULT 0,
  "weeklyAnswered" INTEGER NOT NULL DEFAULT 0,
  "finalRank"      INTEGER,
  "outcome"        "LeagueOutcome",
  "joinedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LeagueMembership_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "LeagueMembership_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "LeagueMembership_leagueId_fkey" FOREIGN KEY ("leagueId")
    REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "LeagueMembership_userId_weekKey_key"
  ON "LeagueMembership"("userId", "weekKey");
CREATE INDEX "LeagueMembership_leagueId_weeklyScore_idx"
  ON "LeagueMembership"("leagueId", "weeklyScore");
CREATE INDEX "LeagueMembership_userId_idx"
  ON "LeagueMembership"("userId");
