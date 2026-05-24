-- Daily Check-In: one row per user per UTC calendar day.

CREATE TABLE "DailyCheckIn" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "checkedDate" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "recommendedTrack" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyCheckIn_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "DailyCheckIn_userId_checkedDate_key" ON "DailyCheckIn"("userId", "checkedDate");
CREATE INDEX "DailyCheckIn_userId_createdAt_idx" ON "DailyCheckIn"("userId", "createdAt");
CREATE INDEX "DailyCheckIn_situation_createdAt_idx" ON "DailyCheckIn"("situation", "createdAt");

ALTER TABLE "DailyCheckIn" ADD CONSTRAINT "DailyCheckIn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
