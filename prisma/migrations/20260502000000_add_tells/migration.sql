-- Tells: daily Train-Your-Instincts product
--
-- Adds four tables (Tell, TellResponse, InstinctScore, TellStreak) plus
-- three new enums (TellFormat, InstinctTrack, TellStatus). InstinctAxis
-- is stored as a Postgres text[] on Tell.axes — Prisma's enum-array
-- support is fragile across migrations, plain string array is the
-- pragmatic call.

-- Enums
CREATE TYPE "TellFormat" AS ENUM (
  'DIAGNOSE',
  'SPOT_THE_MOVE',
  'NEXT_OPTIMAL',
  'FIND_THE_DECOY',
  'GRADE_THE_REPLY'
);

CREATE TYPE "InstinctTrack" AS ENUM (
  'DARK_PSYCH',
  'RED_FLAGS',
  'CROSS_SEX',
  'POWER',
  'REFUSAL',
  'SELF_REG'
);

CREATE TYPE "TellStatus" AS ENUM (
  'DRAFT',
  'REVIEW',
  'SCHEDULED',
  'PUBLISHED',
  'ARCHIVED'
);

-- Tell
CREATE TABLE "Tell" (
  "id"           TEXT          NOT NULL,
  "number"       INTEGER       NOT NULL,
  "slug"         TEXT          NOT NULL,
  "format"       "TellFormat"  NOT NULL,
  "track"        "InstinctTrack" NOT NULL,
  "axes"         TEXT[]        NOT NULL DEFAULT ARRAY[]::TEXT[],
  "difficulty"   INTEGER       NOT NULL DEFAULT 3,
  "artifact"     JSONB         NOT NULL,
  "question"     TEXT          NOT NULL,
  "choices"      JSONB         NOT NULL,
  "reveal"       TEXT          NOT NULL,
  "scheduleDate" TIMESTAMP(3),
  "status"       "TellStatus"  NOT NULL DEFAULT 'DRAFT',
  "authorId"    TEXT,
  "createdAt"    TIMESTAMP(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3)  NOT NULL,

  CONSTRAINT "Tell_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Tell_number_key" ON "Tell"("number");
CREATE UNIQUE INDEX "Tell_slug_key"   ON "Tell"("slug");
CREATE INDEX "Tell_scheduleDate_status_idx" ON "Tell"("scheduleDate", "status");
CREATE INDEX "Tell_track_status_idx"        ON "Tell"("track", "status");
CREATE INDEX "Tell_status_idx"              ON "Tell"("status");

-- TellResponse
CREATE TABLE "TellResponse" (
  "id"            TEXT         NOT NULL,
  "userId"        TEXT,
  "anonId"        TEXT,
  "tellId"        TEXT         NOT NULL,
  "choiceId"      TEXT         NOT NULL,
  "isCorrect"     BOOLEAN      NOT NULL,
  "scoreImpact"   INTEGER      NOT NULL DEFAULT 0,
  "axesImpact"    JSONB        NOT NULL,
  "countedScored" BOOLEAN      NOT NULL DEFAULT TRUE,
  "countedStreak" BOOLEAN      NOT NULL DEFAULT FALSE,
  "answeredAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "answerMs"      INTEGER,

  CONSTRAINT "TellResponse_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "TellResponse_userId_answeredAt_idx" ON "TellResponse"("userId", "answeredAt");
CREATE INDEX "TellResponse_anonId_idx"            ON "TellResponse"("anonId");
CREATE INDEX "TellResponse_tellId_idx"            ON "TellResponse"("tellId");

-- Partial unique index: a logged-in user counts a Tell toward score at
-- most once. Anonymous responses can repeat freely (visit telemetry).
CREATE UNIQUE INDEX "TellResponse_user_tell_scored_unique"
  ON "TellResponse"("userId", "tellId")
  WHERE "userId" IS NOT NULL AND "countedScored" = TRUE;

ALTER TABLE "TellResponse"
  ADD CONSTRAINT "TellResponse_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TellResponse"
  ADD CONSTRAINT "TellResponse_tellId_fkey"
  FOREIGN KEY ("tellId") REFERENCES "Tell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- InstinctScore (one per user, lazily created)
CREATE TABLE "InstinctScore" (
  "id"            TEXT         NOT NULL,
  "userId"        TEXT         NOT NULL,
  "read"          INTEGER      NOT NULL DEFAULT 1000,
  "spot"          INTEGER      NOT NULL DEFAULT 1000,
  "reply"         INTEGER      NOT NULL DEFAULT 1000,
  "refuse"        INTEGER      NOT NULL DEFAULT 1000,
  "calibrate"     INTEGER      NOT NULL DEFAULT 1000,
  "hold"          INTEGER      NOT NULL DEFAULT 1000,
  "totalAnswered" INTEGER      NOT NULL DEFAULT 0,
  "updatedAt"     TIMESTAMP(3) NOT NULL,

  CONSTRAINT "InstinctScore_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "InstinctScore_userId_key" ON "InstinctScore"("userId");

ALTER TABLE "InstinctScore"
  ADD CONSTRAINT "InstinctScore_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- TellStreak (one per user, lazily created)
CREATE TABLE "TellStreak" (
  "id"            TEXT         NOT NULL,
  "userId"        TEXT         NOT NULL,
  "currentDays"   INTEGER      NOT NULL DEFAULT 0,
  "longestDays"   INTEGER      NOT NULL DEFAULT 0,
  "lastTellDate"  TEXT,
  "freezeWeekKey" TEXT,
  "freezesAvail"  INTEGER      NOT NULL DEFAULT 1,
  "updatedAt"     TIMESTAMP(3) NOT NULL,

  CONSTRAINT "TellStreak_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TellStreak_userId_key" ON "TellStreak"("userId");

ALTER TABLE "TellStreak"
  ADD CONSTRAINT "TellStreak_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
