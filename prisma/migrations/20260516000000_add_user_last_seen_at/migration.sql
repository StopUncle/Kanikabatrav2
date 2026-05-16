-- AlterTable
ALTER TABLE "User" ADD COLUMN "lastSeenAt" TIMESTAMP(3);

-- Index lets the dormant-member cron scan ACTIVE memberships joined
-- against User.lastSeenAt without a sequential scan once the table
-- grows past a few hundred rows.
CREATE INDEX "User_lastSeenAt_idx" ON "User"("lastSeenAt");
