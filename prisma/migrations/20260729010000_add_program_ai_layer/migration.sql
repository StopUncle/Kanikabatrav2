-- The Twelve, AI layer: enrollment (intake + the Read), thresholds, journal.
-- See docs/AI-PROGRAM-SPEC.md.

CREATE TABLE "ProgramEnrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situation" TEXT NOT NULL,
    "counterpart" TEXT NOT NULL,
    "lastFailure" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "readLetter" TEXT NOT NULL,
    "readModel" TEXT NOT NULL,
    "pausedAt" TIMESTAMP(3),
    "agreedAiTermsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramEnrollment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProgramEnrollment_userId_key" ON "ProgramEnrollment"("userId");

ALTER TABLE "ProgramEnrollment" ADD CONSTRAINT "ProgramEnrollment_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "ProgramThreshold" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "standardText" TEXT NOT NULL,
    "deeperText" TEXT,
    "depth" TEXT,
    "crossedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramThreshold_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProgramThreshold_userId_weekNumber_key" ON "ProgramThreshold"("userId", "weekNumber");
CREATE INDEX "ProgramThreshold_userId_crossedAt_idx" ON "ProgramThreshold"("userId", "crossedAt");

ALTER TABLE "ProgramThreshold" ADD CONSTRAINT "ProgramThreshold_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "reply" TEXT,
    "replyModel" TEXT,
    "replyDueAt" TIMESTAMP(3) NOT NULL,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "JournalEntry_userId_weekNumber_key" ON "JournalEntry"("userId", "weekNumber");
CREATE INDEX "JournalEntry_flagged_createdAt_idx" ON "JournalEntry"("flagged", "createdAt");
CREATE INDEX "JournalEntry_replyDueAt_idx" ON "JournalEntry"("replyDueAt");

ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
