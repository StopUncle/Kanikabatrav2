-- Quiz → Consilium credit: each paid quiz result carries a one-use
-- Stripe promotion code worth the quiz price ($9.99) off the first
-- Consilium month. 14-day expiry. Code redemption + expiry are
-- enforced by Stripe; these columns are display/audit only.

ALTER TABLE "QuizResult"
  ADD COLUMN "consiliumCreditCode" TEXT,
  ADD COLUMN "consiliumCreditExpiresAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "QuizResult_consiliumCreditCode_key"
  ON "QuizResult"("consiliumCreditCode");
