-- Add VIDEO to FeedPostType enum and three video columns to FeedPost.
-- Mirrors the existing voice-note plumbing (voiceNoteUrl) so the feed
-- can render Kanika-on-camera posts alongside voice notes and essays.

ALTER TYPE "FeedPostType" ADD VALUE IF NOT EXISTS 'VIDEO';

ALTER TABLE "FeedPost"
  ADD COLUMN IF NOT EXISTS "videoUrl"             TEXT,
  ADD COLUMN IF NOT EXISTS "videoPosterUrl"       TEXT,
  ADD COLUMN IF NOT EXISTS "videoDurationSeconds" INTEGER;
