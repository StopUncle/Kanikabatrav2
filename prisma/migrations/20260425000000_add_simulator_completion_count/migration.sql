-- Add completionCount to SimulatorProgress. Feeds the `three-time-reader`
-- meta-achievement in lib/simulator/achievements.ts. Ticks on every run
-- that reaches an ending, not just the first one.

ALTER TABLE "SimulatorProgress"
  ADD COLUMN "completionCount" INTEGER NOT NULL DEFAULT 0;

-- Backfill: any row that already has `completedAt` has been completed at
-- least once. Set the count to 1 for those so existing members aren't
-- silently reset. Fresh rows start at 0 and tick to 1 on first ending.
UPDATE "SimulatorProgress"
  SET "completionCount" = 1
  WHERE "completedAt" IS NOT NULL;
