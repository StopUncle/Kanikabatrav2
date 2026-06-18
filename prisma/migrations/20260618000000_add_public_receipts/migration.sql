-- PublicReceipt: the stored OUTPUT of a free, public Receipts read.
--
-- Exists only so the shareable card has content to render server-side when a
-- social scraper fetches /api/og/receipts/[id]. We store ONLY the generated
-- read, never the user's pasted input or screenshots, preserving the same
-- "your input is not stored" promise as the paid Receipt table.
--
-- Anonymous by design: no userId, only a nullable anonId for abuse analytics.

CREATE TABLE "PublicReceipt" (
  "id"         TEXT         NOT NULL,
  "response"   TEXT         NOT NULL,
  "model"      TEXT         NOT NULL,
  "costMicros" INTEGER      NOT NULL DEFAULT 0,
  "anonId"     TEXT,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "PublicReceipt_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "PublicReceipt_anonId_createdAt_idx" ON "PublicReceipt"("anonId", "createdAt");
