-- PactWeek.publishedAt: when this slot's content became visible to members.
-- The scar pass uses it to refuse retroactive scars: a week may only scar if
-- its challenge was published BEFORE that member's week ended, i.e. the
-- member actually saw an assignment during the week they are being marked
-- for. Publishing weeks 5-12 months from now must never scar the cohorts
-- who lived through those weeks staring at the "being written" fallback.
ALTER TABLE "PactWeek" ADD COLUMN "publishedAt" TIMESTAMP(3);

-- Any row already published predates the guard; stamp it now so it keeps
-- scarring exactly as it did.
UPDATE "PactWeek" SET "publishedAt" = CURRENT_TIMESTAMP WHERE "isPublished";

-- Legacy activation backfill. 20260805220000_add_pact_started_at introduced
-- the activation clock as a nullable column with no backfill, which left
-- pre-activation pacts in a state the model says cannot exist: startedAt
-- null with entry rows already on the record. Those pacts signed under the
-- old rules where the clock started at signing; make that explicit.
UPDATE "Pact" SET "startedAt" = "signedAt"
WHERE "startedAt" IS NULL
  AND id IN (SELECT DISTINCT "pactId" FROM "PactEntry");
