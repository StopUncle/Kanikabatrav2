-- Delivered-push log, so the rolling per-user send cap is enforceable.
-- Additive only.

-- CreateTable
CREATE TABLE "PushSend" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PushSend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PushSend_userId_sentAt_idx" ON "PushSend"("userId", "sentAt");

-- CreateIndex
CREATE INDEX "PushSend_sentAt_idx" ON "PushSend"("sentAt");

-- AddForeignKey
ALTER TABLE "PushSend" ADD CONSTRAINT "PushSend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
