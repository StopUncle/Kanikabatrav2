-- AlterTable: bounded follow-up thread for Ask Kanika.
-- A follow-up is a MemberQuestion that points at the question it continues.
ALTER TABLE "MemberQuestion" ADD COLUMN "parentQuestionId" TEXT;

-- CreateIndex
CREATE INDEX "MemberQuestion_parentQuestionId_idx" ON "MemberQuestion"("parentQuestionId");

-- AddForeignKey
ALTER TABLE "MemberQuestion" ADD CONSTRAINT "MemberQuestion_parentQuestionId_fkey" FOREIGN KEY ("parentQuestionId") REFERENCES "MemberQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
