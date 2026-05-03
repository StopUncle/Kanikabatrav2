-- Training-bot fields on User. Distinct from `isBot` (community-engagement bots
-- that comment + post) so the two cohorts can be filtered independently.
-- Training bots fill the Tells leaderboard / league brackets so the social
-- pressure layer reads as alive even at low real-member counts. They never
-- post, never get push, never have memberships, never count in member metrics.

ALTER TABLE "User"
  ADD COLUMN "isTrainingBot" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "botProfile"    JSONB;

CREATE INDEX "User_isTrainingBot_idx" ON "User"("isTrainingBot");
