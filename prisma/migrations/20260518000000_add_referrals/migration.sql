-- Member-gets-member referrals.
--
-- User.referralCode is a unique, nullable 8-char alphanumeric token. Lazy-
-- generated on first visit to /consilium/invite so existing members do not
-- need to be back-filled. The unique constraint creates the lookup index.
--
-- Referral rows record each link use. PENDING when only the referee's email
-- is known, CONVERTED when they complete a Consilium-granting checkout and
-- the referrer's Stripe customer balance is credited.

ALTER TABLE "User" ADD COLUMN "referralCode" TEXT;
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

CREATE TYPE "ReferralStatus" AS ENUM ('PENDING', 'CONVERTED', 'CANCELLED');

CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "refereeUserId" TEXT,
    "refereeEmail" TEXT,
    "status" "ReferralStatus" NOT NULL DEFAULT 'PENDING',
    "rewardTxnId" TEXT,
    "refereeRewardId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "convertedAt" TIMESTAMP(3),

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Referral_refereeUserId_key" ON "Referral"("refereeUserId");
CREATE INDEX "Referral_referrerId_idx" ON "Referral"("referrerId");
CREATE INDEX "Referral_refereeEmail_idx" ON "Referral"("refereeEmail");
CREATE INDEX "Referral_status_idx" ON "Referral"("status");

ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey"
    FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_refereeUserId_fkey"
    FOREIGN KEY ("refereeUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
