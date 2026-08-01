-- Story/Gauntlet play modes: the run's mode, and the one-time stamp of a
-- member's first Gauntlet clear per scenario.
ALTER TABLE "SimulatorProgress" ADD COLUMN "mode" TEXT NOT NULL DEFAULT 'story';
ALTER TABLE "SimulatorProgress" ADD COLUMN "gauntletClearedAt" TIMESTAMP(3);
