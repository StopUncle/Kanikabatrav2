-- AlterTable
ALTER TABLE "User" ADD COLUMN "isBot" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "botActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "User_isBot_idx" ON "User"("isBot");

-- CreateEnum
CREATE TYPE "BotActionType" AS ENUM ('COMMENT', 'LIKE');
CREATE TYPE "BotActionStatus" AS ENUM ('PENDING', 'EXECUTED', 'FAILED', 'SKIPPED');

-- CreateTable
CREATE TABLE "BotAction" (
    "id" TEXT NOT NULL,
    "type" "BotActionType" NOT NULL,
    "status" "BotActionStatus" NOT NULL DEFAULT 'PENDING',
    "botId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "executedAt" TIMESTAMP(3),
    "commentText" TEXT,
    "commentId" TEXT,
    "failureReason" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BotAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BotAction_status_scheduledAt_idx" ON "BotAction"("status", "scheduledAt");
CREATE INDEX "BotAction_postId_idx" ON "BotAction"("postId");
CREATE INDEX "BotAction_botId_idx" ON "BotAction"("botId");

-- AddForeignKey
ALTER TABLE "BotAction" ADD CONSTRAINT "BotAction_botId_fkey" FOREIGN KEY ("botId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BotAction" ADD CONSTRAINT "BotAction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "FeedPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "BotEngagementSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "dryRun" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BotEngagementSettings_pkey" PRIMARY KEY ("id")
);
