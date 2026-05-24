-- EmailQueue retry telemetry. Lets the processor stop silently losing
-- emails after a single transient failure window.

ALTER TABLE "EmailQueue" ADD COLUMN "attempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "EmailQueue" ADD COLUMN "lastErrorAt" TIMESTAMP(3);
ALTER TABLE "EmailQueue" ADD COLUMN "lastError" TEXT;
