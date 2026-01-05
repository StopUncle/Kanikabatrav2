-- Add gamification columns to profiles table
-- These columns enable XP tracking, leaderboards, and persistent gamification

-- Add XP and level tracking to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_xp INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_level INTEGER DEFAULT 1;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS max_streak INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_streak_date DATE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS badges_earned TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cards_earned TEXT[] DEFAULT '{}';

-- Create index for leaderboard queries (sorted by XP)
CREATE INDEX IF NOT EXISTS idx_profiles_total_xp ON profiles(total_xp DESC);

-- Create index for level-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_current_level ON profiles(current_level DESC);

-- Enable RLS on profiles if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all profiles (for leaderboard)
DROP POLICY IF EXISTS "Profiles are viewable by all users" ON profiles;
CREATE POLICY "Profiles are viewable by all users" ON profiles
  FOR SELECT USING (true);

-- Policy: Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to update XP and recalculate level
CREATE OR REPLACE FUNCTION update_user_xp(
  user_id UUID,
  xp_to_add INTEGER
) RETURNS TABLE(new_total_xp INTEGER, new_level INTEGER) AS $$
DECLARE
  level_thresholds INTEGER[] := ARRAY[0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000];
  new_xp INTEGER;
  calc_level INTEGER := 1;
BEGIN
  -- Add XP
  UPDATE profiles
  SET total_xp = COALESCE(total_xp, 0) + xp_to_add
  WHERE id = user_id
  RETURNING total_xp INTO new_xp;

  -- Calculate level
  FOR i IN 2..array_length(level_thresholds, 1) LOOP
    IF new_xp >= level_thresholds[i] THEN
      calc_level := i;
    ELSE
      EXIT;
    END IF;
  END LOOP;

  -- Update level
  UPDATE profiles
  SET current_level = calc_level
  WHERE id = user_id;

  RETURN QUERY SELECT new_xp, calc_level;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update streak
CREATE OR REPLACE FUNCTION update_user_streak(user_id UUID) RETURNS TABLE(
  streak INTEGER,
  max_streak INTEGER,
  just_increased BOOLEAN
) AS $$
DECLARE
  last_date DATE;
  curr_streak INTEGER;
  max_str INTEGER;
  today_date DATE := CURRENT_DATE;
  increased BOOLEAN := FALSE;
BEGIN
  -- Get current streak data
  SELECT
    COALESCE(p.current_streak, 0),
    COALESCE(p.max_streak, 0),
    p.last_streak_date
  INTO curr_streak, max_str, last_date
  FROM profiles p
  WHERE p.id = user_id;

  -- Check if already checked today
  IF last_date = today_date THEN
    RETURN QUERY SELECT curr_streak, max_str, FALSE;
    RETURN;
  END IF;

  -- Check if streak continues (yesterday) or resets
  IF last_date = today_date - 1 THEN
    curr_streak := curr_streak + 1;
    increased := TRUE;
  ELSIF last_date IS NULL OR last_date < today_date - 1 THEN
    curr_streak := 1;
    increased := TRUE;
  END IF;

  -- Update max streak if needed
  IF curr_streak > max_str THEN
    max_str := curr_streak;
  END IF;

  -- Save to database
  UPDATE profiles
  SET
    current_streak = curr_streak,
    max_streak = max_str,
    last_streak_date = today_date
  WHERE id = user_id;

  RETURN QUERY SELECT curr_streak, max_str, increased;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION update_user_xp(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_streak(UUID) TO authenticated;
