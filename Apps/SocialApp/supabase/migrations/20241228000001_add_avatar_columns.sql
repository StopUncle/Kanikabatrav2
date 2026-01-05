-- Add avatar reward columns to profiles table
-- These columns store earned avatar rewards and current avatar configuration

-- Avatar rewards earned by the user (array of reward IDs)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_rewards TEXT[] DEFAULT '{}';

-- Current avatar configuration (active frame, character, etc.)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_config JSONB DEFAULT '{"baseAvatar":"default"}';

-- Add comments for documentation
COMMENT ON COLUMN profiles.avatar_rewards IS 'Array of earned avatar reward IDs (frames and characters)';
COMMENT ON COLUMN profiles.avatar_config IS 'User avatar configuration: baseAvatar, activeFrame, activeCharacter';
