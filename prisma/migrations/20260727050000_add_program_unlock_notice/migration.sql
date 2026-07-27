-- One "your week is open" notification per member per week.
--
-- The unlock is derived from dates and needs no storage. The notification is
-- a side effect that must fire exactly once, and cron.yml permits manual
-- workflow_dispatch runs, so the schedule alone is not a guarantee.

-- CreateTable
CREATE TABLE "ProgramUnlockNotice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "notifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramUnlockNotice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProgramUnlockNotice_weekNumber_idx" ON "ProgramUnlockNotice"("weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramUnlockNotice_userId_weekNumber_key" ON "ProgramUnlockNotice"("userId", "weekNumber");

-- AddForeignKey
ALTER TABLE "ProgramUnlockNotice" ADD CONSTRAINT "ProgramUnlockNotice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
