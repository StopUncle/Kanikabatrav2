-- CreateTable
CREATE TABLE "public"."PactMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."MembershipStatus" NOT NULL DEFAULT 'PENDING',
    "stripeSubscriptionId" TEXT,
    "billingCycle" TEXT NOT NULL DEFAULT 'weekly',
    "activatedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "suspendedAt" TIMESTAMP(3),
    "suspendReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PactMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "preset" TEXT NOT NULL,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "signatureData" JSONB,
    "brokenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PactWeek" (
    "id" TEXT NOT NULL,
    "preset" TEXT NOT NULL,
    "cycleWeek" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "journalPrompt" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL DEFAULT 1,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PactWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PactEntry" (
    "id" TEXT NOT NULL,
    "pactId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "journalBody" TEXT,
    "publicBody" TEXT,
    "sharedAt" TIMESTAMP(3),
    "aiReply" TEXT,
    "replyDueAt" TIMESTAMP(3),
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "weekEndsAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PactEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PactMembership_userId_key" ON "public"."PactMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PactMembership_stripeSubscriptionId_key" ON "public"."PactMembership"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "PactMembership_status_idx" ON "public"."PactMembership"("status");

-- CreateIndex
CREATE INDEX "PactMembership_stripeSubscriptionId_idx" ON "public"."PactMembership"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Pact_userId_brokenAt_idx" ON "public"."Pact"("userId", "brokenAt");

-- CreateIndex
CREATE UNIQUE INDEX "Pact_userId_number_key" ON "public"."Pact"("userId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "PactWeek_preset_cycleWeek_key" ON "public"."PactWeek"("preset", "cycleWeek");

-- CreateIndex
CREATE INDEX "PactEntry_userId_idx" ON "public"."PactEntry"("userId");

-- CreateIndex
CREATE INDEX "PactEntry_status_weekEndsAt_idx" ON "public"."PactEntry"("status", "weekEndsAt");

-- CreateIndex
CREATE UNIQUE INDEX "PactEntry_pactId_weekNumber_key" ON "public"."PactEntry"("pactId", "weekNumber");

-- AddForeignKey
ALTER TABLE "public"."PactMembership" ADD CONSTRAINT "PactMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pact" ADD CONSTRAINT "Pact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PactEntry" ADD CONSTRAINT "PactEntry_pactId_fkey" FOREIGN KEY ("pactId") REFERENCES "public"."Pact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PactEntry" ADD CONSTRAINT "PactEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

