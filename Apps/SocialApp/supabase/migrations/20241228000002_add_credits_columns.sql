-- Add credits and cooldown columns to profiles table
-- Supports the scenario cooldown and credits system

-- Credits balance
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS credits INTEGER DEFAULT 0;

-- Last daily credit claim date
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_daily_claim DATE;

-- Scenario cooldowns (stores scenarioId -> timestamp mappings)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS scenario_cooldowns JSONB DEFAULT '{}';

-- Add constraint to ensure credits are non-negative and capped
ALTER TABLE profiles ADD CONSTRAINT credits_non_negative CHECK (credits >= 0);
ALTER TABLE profiles ADD CONSTRAINT credits_max_cap CHECK (credits <= 50);

-- Create index for faster daily claim lookups
CREATE INDEX IF NOT EXISTS idx_profiles_last_daily_claim ON profiles(last_daily_claim);
