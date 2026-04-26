-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('PENDING', 'ANSWERING', 'ANSWERED', 'REJECTED', 'HIDDEN');

-- CreateTable
CREATE TABLE "MemberQuestion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "status" "QuestionStatus" NOT NULL DEFAULT 'PENDING',
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,
    "answeredAt" TIMESTAMP(3),
    "answerPostId" TEXT,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionUpvote" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberQuestionSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "dailyCap" INTEGER NOT NULL DEFAULT 1,
    "maxLength" INTEGER NOT NULL DEFAULT 500,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberQuestionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MemberQuestion_userId_createdAt_idx" ON "MemberQuestion"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "MemberQuestion_status_upvoteCount_idx" ON "MemberQuestion"("status", "upvoteCount" DESC);

-- CreateIndex
CREATE INDEX "MemberQuestion_status_createdAt_idx" ON "MemberQuestion"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionUpvote_questionId_userId_key" ON "QuestionUpvote"("questionId", "userId");

-- CreateIndex
CREATE INDEX "QuestionUpvote_userId_idx" ON "QuestionUpvote"("userId");

-- AddForeignKey
ALTER TABLE "MemberQuestion" ADD CONSTRAINT "MemberQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberQuestion" ADD CONSTRAINT "MemberQuestion_answerPostId_fkey" FOREIGN KEY ("answerPostId") REFERENCES "FeedPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionUpvote" ADD CONSTRAINT "QuestionUpvote_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MemberQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionUpvote" ADD CONSTRAINT "QuestionUpvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
