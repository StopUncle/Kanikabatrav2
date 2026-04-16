-- Add messaging restriction fields to User
ALTER TABLE "User" ADD COLUMN "messagingRestricted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "messagingRestrictedAt" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "messagingRestrictedReason" TEXT;

-- New CommentReport table — members flag comments for admin review
CREATE TABLE "CommentReport" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "resolvedById" TEXT,

    CONSTRAINT "CommentReport_pkey" PRIMARY KEY ("id")
);

-- One report per (comment, reporter) pair — no spam-reporting the same comment.
CREATE UNIQUE INDEX "CommentReport_commentId_reporterId_key" ON "CommentReport"("commentId", "reporterId");
CREATE INDEX "CommentReport_commentId_idx" ON "CommentReport"("commentId");
CREATE INDEX "CommentReport_reporterId_idx" ON "CommentReport"("reporterId");
CREATE INDEX "CommentReport_resolvedAt_idx" ON "CommentReport"("resolvedAt");

-- Foreign keys
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_commentId_fkey"
    FOREIGN KEY ("commentId") REFERENCES "FeedComment"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_reporterId_fkey"
    FOREIGN KEY ("reporterId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_resolvedById_fkey"
    FOREIGN KEY ("resolvedById") REFERENCES "User"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
