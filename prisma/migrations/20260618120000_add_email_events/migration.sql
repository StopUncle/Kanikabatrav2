-- EmailEvent: open + click tracking for marketing emails.
--
-- Recorded by /api/email/open (1x1 pixel) and /api/email/click (redirect),
-- which the queue processor injects into marketing rows before sending.
-- Powers open/click rates per sequence and engagement-based segmentation.

CREATE TYPE "EmailEventType" AS ENUM ('OPEN', 'CLICK');

CREATE TABLE "EmailEvent" (
  "id"        TEXT             NOT NULL,
  "email"     TEXT             NOT NULL,
  "sequence"  TEXT,
  "step"      INTEGER,
  "type"      "EmailEventType" NOT NULL,
  "url"       TEXT,
  "createdAt" TIMESTAMP(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "EmailEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "EmailEvent_email_idx" ON "EmailEvent"("email");
CREATE INDEX "EmailEvent_sequence_type_idx" ON "EmailEvent"("sequence", "type");
CREATE INDEX "EmailEvent_type_createdAt_idx" ON "EmailEvent"("type", "createdAt");
