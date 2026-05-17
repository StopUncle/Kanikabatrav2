-- Adventures: curated multi-scenario arcs stitched together from existing
-- simulator content. Two tables. scenarioIds on Adventure is a Postgres
-- text[] of scenario.id values, NOT a relational FK — scenarios live in
-- code (lib/simulator/scenarios/**), only adventures live in the DB.

CREATE TABLE "Adventure" (
  "id"               TEXT          NOT NULL,
  "slug"             TEXT          NOT NULL,
  "title"            TEXT          NOT NULL,
  "tagline"          TEXT          NOT NULL,
  "description"      TEXT          NOT NULL,
  "scenarioIds"      TEXT[]        NOT NULL DEFAULT ARRAY[]::TEXT[],
  "tier"             TEXT          NOT NULL DEFAULT 'free',
  "estimatedMinutes" INTEGER       NOT NULL,
  "difficulty"       TEXT          NOT NULL,
  "coverArt"         TEXT,
  "endingRecap"      TEXT          NOT NULL,
  "isNew"            BOOLEAN       NOT NULL DEFAULT FALSE,
  "publishedAt"      TIMESTAMP(3),
  "createdAt"        TIMESTAMP(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3)  NOT NULL,

  CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Adventure_slug_key" ON "Adventure"("slug");
CREATE INDEX "Adventure_publishedAt_idx" ON "Adventure"("publishedAt");

CREATE TABLE "AdventureProgress" (
  "id"          TEXT         NOT NULL,
  "userId"      TEXT         NOT NULL,
  "adventureId" TEXT         NOT NULL,
  "currentStep" INTEGER      NOT NULL DEFAULT 0,
  "completedAt" TIMESTAMP(3),
  "startedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "AdventureProgress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AdventureProgress_userId_adventureId_key"
  ON "AdventureProgress"("userId", "adventureId");
CREATE INDEX "AdventureProgress_userId_idx"      ON "AdventureProgress"("userId");
CREATE INDEX "AdventureProgress_adventureId_idx" ON "AdventureProgress"("adventureId");

ALTER TABLE "AdventureProgress"
  ADD CONSTRAINT "AdventureProgress_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "AdventureProgress"
  ADD CONSTRAINT "AdventureProgress_adventureId_fkey"
  FOREIGN KEY ("adventureId") REFERENCES "Adventure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
