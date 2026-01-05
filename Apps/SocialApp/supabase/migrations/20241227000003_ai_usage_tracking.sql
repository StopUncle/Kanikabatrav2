-- AI Usage Tracking Tables for Pocket Kanika
-- Enables server-side rate limiting and cost tracking

-- Table for tracking AI API usage per request
CREATE TABLE IF NOT EXISTS ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tokens_in INTEGER NOT NULL DEFAULT 0,
  tokens_out INTEGER NOT NULL DEFAULT 0,
  cost_usd DECIMAL(10,6) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for daily spending queries
CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_id ON ai_usage(user_id);

-- Table for rate limiting (messages per hour)
CREATE TABLE IF NOT EXISTS ai_rate_limits (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  messages_this_hour INTEGER NOT NULL DEFAULT 0,
  hour_reset_at TIMESTAMPTZ,
  messages_today INTEGER NOT NULL DEFAULT 0,
  day_reset_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to atomically increment rate limit counter
CREATE OR REPLACE FUNCTION increment_ai_rate_limit(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_now TIMESTAMPTZ := NOW();
  v_current_hour TIMESTAMPTZ;
  v_next_hour TIMESTAMPTZ;
BEGIN
  -- Calculate hour boundaries
  v_current_hour := date_trunc('hour', v_now);
  v_next_hour := v_current_hour + INTERVAL '1 hour';

  -- Upsert with atomic increment
  INSERT INTO ai_rate_limits (user_id, messages_this_hour, hour_reset_at, updated_at)
  VALUES (p_user_id, 1, v_next_hour, v_now)
  ON CONFLICT (user_id) DO UPDATE SET
    messages_this_hour = CASE
      WHEN ai_rate_limits.hour_reset_at IS NULL OR ai_rate_limits.hour_reset_at <= v_now
      THEN 1  -- Reset counter
      ELSE ai_rate_limits.messages_this_hour + 1  -- Increment
    END,
    hour_reset_at = CASE
      WHEN ai_rate_limits.hour_reset_at IS NULL OR ai_rate_limits.hour_reset_at <= v_now
      THEN v_next_hour  -- Set new reset time
      ELSE ai_rate_limits.hour_reset_at  -- Keep existing
    END,
    updated_at = v_now;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view own AI usage"
  ON ai_usage FOR SELECT
  USING (auth.uid() = user_id);

-- Users can view their own rate limits
CREATE POLICY "Users can view own rate limits"
  ON ai_rate_limits FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role can insert/update (edge functions)
CREATE POLICY "Service role can insert AI usage"
  ON ai_usage FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can manage rate limits"
  ON ai_rate_limits FOR ALL
  USING (true);

-- Grant execute on RPC function
GRANT EXECUTE ON FUNCTION increment_ai_rate_limit TO authenticated;
GRANT EXECUTE ON FUNCTION increment_ai_rate_limit TO service_role;

-- View for daily cost summary (admin use)
CREATE OR REPLACE VIEW ai_daily_costs AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_requests,
  SUM(tokens_in) as total_tokens_in,
  SUM(tokens_out) as total_tokens_out,
  SUM(cost_usd) as total_cost_usd
FROM ai_usage
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View for user usage summary
CREATE OR REPLACE VIEW ai_user_costs AS
SELECT
  user_id,
  DATE(created_at) as date,
  COUNT(*) as requests,
  SUM(tokens_in + tokens_out) as total_tokens,
  SUM(cost_usd) as cost_usd
FROM ai_usage
GROUP BY user_id, DATE(created_at)
ORDER BY date DESC, cost_usd DESC;
