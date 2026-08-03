-- Shared pact notes become individual member posts on the feed (design
-- change, same day as 20260803030000; the comment link it added carried
-- no data yet and is replaced by a post link).
ALTER TYPE "FeedPostType" ADD VALUE 'PACT_NOTE';

ALTER TABLE "PactEntry" DROP CONSTRAINT "PactEntry_feedCommentId_fkey";
DROP INDEX "PactEntry_feedCommentId_key";
ALTER TABLE "PactEntry" DROP COLUMN "feedCommentId";

ALTER TABLE "PactEntry" ADD COLUMN "feedPostId" TEXT;

CREATE UNIQUE INDEX "PactEntry_feedPostId_key" ON "PactEntry"("feedPostId");

ALTER TABLE "PactEntry" ADD CONSTRAINT "PactEntry_feedPostId_fkey"
  FOREIGN KEY ("feedPostId") REFERENCES "FeedPost"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
