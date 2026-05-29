-- Unified Consilium daily streak (additive over the per-surface simulator /
-- games / Tells streaks). Fed by any qualifying daily action; the number
-- members chase. Nullable last-date matches the lazy-create pattern of the
-- existing streak columns (no backfill needed; first action seeds it).
ALTER TABLE "User" ADD COLUMN "dailyStreakCurrent" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "dailyStreakLongest" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "dailyStreakLastDate" TEXT;
