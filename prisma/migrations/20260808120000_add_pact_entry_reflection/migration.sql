-- The week's reflection: how hard it was, and what happened when it did not happen.
--
-- Until now a missed week had exactly one outcome and nobody was asked
-- anything: `scarOverdueEntries` flipped the row to "scarred" on a cron or a
-- lazy read, and the first the member knew of it was a mark already there.
-- These four columns let a member own the miss and say why, and let both
-- outcomes carry a difficulty rating for the challenge itself.
--
-- All nullable, no backfill: an existing entry simply has no reflection, which
-- is the truth about it. `status` is untouched, so every existing read, the
-- scar pass, the record wall and the XP maths keep working unchanged.

ALTER TABLE "PactEntry" ADD COLUMN "difficulty" INTEGER;
ALTER TABLE "PactEntry" ADD COLUMN "claimedAt" TIMESTAMP(3);
ALTER TABLE "PactEntry" ADD COLUMN "missReason" TEXT;
ALTER TABLE "PactEntry" ADD COLUMN "missNote" TEXT;
