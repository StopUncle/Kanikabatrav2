-- Standing source for finishing a week of the 12 Week Transformation.
--
-- Separate migration from the program tables because the tables were already
-- applied to production, and an enum value cannot be added retroactively to a
-- migration that has run.

-- AlterEnum
ALTER TYPE "StandingSource" ADD VALUE 'PROGRAM_WEEK';
