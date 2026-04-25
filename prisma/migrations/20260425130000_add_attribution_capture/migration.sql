-- Acquisition attribution capture. Stamped on User at registration
-- and on QuizResult at quiz creation, from URL params + Railway/CF
-- request headers + browser navigator. All nullable; legacy rows stay
-- null. Indexed on the two highest-cardinality lookup fields
-- (utmSource, utmCampaign) so we can answer "where did revenue come
-- from in 7d" without a sequential scan.

ALTER TABLE "User"
  ADD COLUMN "utmSource"   TEXT,
  ADD COLUMN "utmMedium"   TEXT,
  ADD COLUMN "utmCampaign" TEXT,
  ADD COLUMN "utmContent"  TEXT,
  ADD COLUMN "utmTerm"     TEXT,
  ADD COLUMN "gclid"       TEXT,
  ADD COLUMN "fbclid"      TEXT,
  ADD COLUMN "ttclid"      TEXT,
  ADD COLUMN "referrer"    TEXT,
  ADD COLUMN "landingPage" TEXT,
  ADD COLUMN "userAgent"   TEXT,
  ADD COLUMN "ipCountry"   TEXT,
  ADD COLUMN "language"    TEXT,
  ADD COLUMN "timezone"    TEXT;

CREATE INDEX "User_utmSource_idx"   ON "User"("utmSource");
CREATE INDEX "User_utmCampaign_idx" ON "User"("utmCampaign");

ALTER TABLE "QuizResult"
  ADD COLUMN "utmSource"   TEXT,
  ADD COLUMN "utmMedium"   TEXT,
  ADD COLUMN "utmCampaign" TEXT,
  ADD COLUMN "utmContent"  TEXT,
  ADD COLUMN "utmTerm"     TEXT,
  ADD COLUMN "gclid"       TEXT,
  ADD COLUMN "fbclid"      TEXT,
  ADD COLUMN "ttclid"      TEXT,
  ADD COLUMN "referrer"    TEXT,
  ADD COLUMN "landingPage" TEXT,
  ADD COLUMN "userAgent"   TEXT,
  ADD COLUMN "ipCountry"   TEXT,
  ADD COLUMN "language"    TEXT,
  ADD COLUMN "timezone"    TEXT;

CREATE INDEX "QuizResult_utmSource_idx"   ON "QuizResult"("utmSource");
CREATE INDEX "QuizResult_utmCampaign_idx" ON "QuizResult"("utmCampaign");
