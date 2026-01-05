-- Profile Enhancements Migration
-- Run this in Supabase SQL Editor

-- ============================================
-- MISSION BADGE (highest completed week)
-- ============================================
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS highest_mission_week INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS profiles_highest_mission_week_idx
ON public.profiles (highest_mission_week);

COMMENT ON COLUMN public.profiles.highest_mission_week IS
  'The highest mission week number (1-12) the user has completed. Used for displaying mission badges on avatars.';

-- ============================================
-- PROFILE FIELDS (bio & social links)
-- ============================================
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS instagram_handle VARCHAR(30);

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS twitter_handle VARCHAR(15);

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tiktok_handle VARCHAR(24);

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS website_url VARCHAR(255);

COMMENT ON COLUMN public.profiles.bio IS 'User bio/description, max 160 characters recommended';
COMMENT ON COLUMN public.profiles.instagram_handle IS 'Instagram username without @ prefix';
COMMENT ON COLUMN public.profiles.twitter_handle IS 'Twitter/X username without @ prefix';
COMMENT ON COLUMN public.profiles.tiktok_handle IS 'TikTok username without @ prefix';
COMMENT ON COLUMN public.profiles.website_url IS 'Personal website URL';
