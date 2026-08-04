-- Difficulty weighting for The Mark's ledger. Every existing row is a
-- standard-difficulty item, so the default backfills them at 1.
ALTER TABLE "MarkEncounter" ADD COLUMN "weight" DOUBLE PRECISION NOT NULL DEFAULT 1;
