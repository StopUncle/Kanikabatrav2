-- Enforce one-shot grants at the database level. The application-side
-- dedupe in lib/standing/grant.ts is a read-then-create, so two identical
-- requests landing at once could both pass the check and double-pay.
-- First remove any rows that raced past it (keep the earliest; NULL refId
-- rows are exempt, Postgres treats NULLs as distinct in unique indexes).
-- Note: User.standing is deliberately not decremented for removed dupes;
-- Standing is one-way and any drift here is bounded to race survivors.
DELETE FROM "StandingEvent" a
USING "StandingEvent" b
WHERE a."userId" = b."userId"
  AND a."source" = b."source"
  AND a."refId" = b."refId"
  AND a."refId" IS NOT NULL
  AND (a."createdAt" > b."createdAt"
    OR (a."createdAt" = b."createdAt" AND a."id" > b."id"));

-- DropIndex (superseded by the unique index below)
DROP INDEX "StandingEvent_userId_source_refId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "StandingEvent_userId_source_refId_key" ON "StandingEvent"("userId", "source", "refId");
