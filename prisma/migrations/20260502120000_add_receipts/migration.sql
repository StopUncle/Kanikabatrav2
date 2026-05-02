-- Receipts: premium AI text-reader, "paste your situation, get the read"
--
-- Privacy posture: we do NOT store the raw input. Stored fields are
-- response (Kanika voice teach), inputCharCount + inputHash for analytics
-- and same-input replay detection, plus model + cost for usage tracking.

CREATE TABLE "Receipt" (
  "id"             TEXT         NOT NULL,
  "userId"         TEXT         NOT NULL,
  "label"          TEXT,
  "response"       TEXT         NOT NULL,
  "inputCharCount" INTEGER      NOT NULL,
  "inputHash"      TEXT         NOT NULL,
  "model"          TEXT         NOT NULL,
  "costMicros"     INTEGER      NOT NULL DEFAULT 0,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Receipt_userId_createdAt_idx" ON "Receipt"("userId", "createdAt");
CREATE INDEX "Receipt_inputHash_idx" ON "Receipt"("inputHash");

ALTER TABLE "Receipt"
  ADD CONSTRAINT "Receipt_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
