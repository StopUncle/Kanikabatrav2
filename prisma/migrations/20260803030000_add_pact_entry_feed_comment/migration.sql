-- The shared pact note's comment on the week's feed thread. SetNull so an
-- admin deleting the comment moderates the feed without touching the entry.
ALTER TABLE "PactEntry" ADD COLUMN "feedCommentId" TEXT;

CREATE UNIQUE INDEX "PactEntry_feedCommentId_key" ON "PactEntry"("feedCommentId");

ALTER TABLE "PactEntry" ADD CONSTRAINT "PactEntry_feedCommentId_fkey"
  FOREIGN KEY ("feedCommentId") REFERENCES "FeedComment"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
