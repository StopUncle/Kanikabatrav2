-- Drift-detector table written by the hourly reconciliation cron.

CREATE TABLE "MembershipReconciliation" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeSubId" TEXT NOT NULL,
    "mismatch" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "localStatus" TEXT NOT NULL,
    "stripeStatus" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "resolvedBy" TEXT,
    "resolvedNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembershipReconciliation_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "MembershipReconciliation_resolvedAt_createdAt_idx" ON "MembershipReconciliation"("resolvedAt", "createdAt");
CREATE INDEX "MembershipReconciliation_membershipId_idx" ON "MembershipReconciliation"("membershipId");
CREATE INDEX "MembershipReconciliation_userId_idx" ON "MembershipReconciliation"("userId");
