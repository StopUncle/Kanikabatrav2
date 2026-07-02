-- CreateTable
CREATE TABLE "FeedPostPoll" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedPostPoll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedPostPollVote" (
    "id" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "optionIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedPostPollVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedPostPoll_postId_key" ON "FeedPostPoll"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedPostPollVote_pollId_userId_key" ON "FeedPostPollVote"("pollId", "userId");

-- CreateIndex
CREATE INDEX "FeedPostPollVote_pollId_idx" ON "FeedPostPollVote"("pollId");

-- AddForeignKey
ALTER TABLE "FeedPostPoll" ADD CONSTRAINT "FeedPostPoll_postId_fkey" FOREIGN KEY ("postId") REFERENCES "FeedPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPostPollVote" ADD CONSTRAINT "FeedPostPollVote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "FeedPostPoll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPostPollVote" ADD CONSTRAINT "FeedPostPollVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
