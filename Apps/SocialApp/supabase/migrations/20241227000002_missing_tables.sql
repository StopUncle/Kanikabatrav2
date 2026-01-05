-- Migration: Create missing tables for full app functionality
-- Created: 2024-12-27
-- Purpose: Add tables referenced by services but not yet created

-- ============================================================================
-- COURSE ENROLLMENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_course_enrollments_user ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course ON course_enrollments(course_id);

ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments" ON course_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own enrollments" ON course_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments" ON course_enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- COACHING BOOKINGS - SKIPPED (already exists in base schema)
-- ============================================================================

-- ============================================================================
-- COACHING SESSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS coaching_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES coaching_bookings(id) ON DELETE CASCADE NOT NULL,
  session_number INTEGER NOT NULL,
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  meeting_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coaching_sessions_booking ON coaching_sessions(booking_id);
CREATE INDEX IF NOT EXISTS idx_coaching_sessions_scheduled ON coaching_sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_coaching_sessions_status ON coaching_sessions(status);

ALTER TABLE coaching_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view sessions for their bookings
CREATE POLICY "Users can view own sessions" ON coaching_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM coaching_bookings
      WHERE coaching_bookings.id = coaching_sessions.booking_id
      AND coaching_bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own sessions" ON coaching_sessions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM coaching_bookings
      WHERE coaching_bookings.id = coaching_sessions.booking_id
      AND coaching_bookings.user_id = auth.uid()
    )
  );

-- ============================================================================
-- VIDEO MEETINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS video_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES coaching_sessions(id) ON DELETE CASCADE NOT NULL,
  meeting_url TEXT NOT NULL,
  host_url TEXT NOT NULL,
  password TEXT,
  provider TEXT DEFAULT 'zoom' CHECK (provider IN ('zoom', 'google_meet', 'custom')),
  start_time TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'started', 'ended', 'cancelled')),
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_video_meetings_session ON video_meetings(session_id);
CREATE INDEX IF NOT EXISTS idx_video_meetings_start ON video_meetings(start_time);

ALTER TABLE video_meetings ENABLE ROW LEVEL SECURITY;

-- Users can view meetings for their sessions
CREATE POLICY "Users can view own meetings" ON video_meetings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM coaching_sessions cs
      JOIN coaching_bookings cb ON cb.id = cs.booking_id
      WHERE cs.id = video_meetings.session_id
      AND cb.user_id = auth.uid()
    )
  );

-- ============================================================================
-- DM CHANNELS
-- ============================================================================
CREATE TABLE IF NOT EXISTS dm_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE dm_channels ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- DM CHANNEL PARTICIPANTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS dm_channel_participants (
  channel_id UUID REFERENCES dm_channels(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (channel_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_dm_participants_user ON dm_channel_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_dm_participants_channel ON dm_channel_participants(channel_id);

ALTER TABLE dm_channel_participants ENABLE ROW LEVEL SECURITY;

-- Users can see channels they're part of
CREATE POLICY "Users can view own channel memberships" ON dm_channel_participants
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view channels they're in
CREATE POLICY "Users can view channels they're in" ON dm_channels
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dm_channel_participants
      WHERE dm_channel_participants.channel_id = dm_channels.id
      AND dm_channel_participants.user_id = auth.uid()
    )
  );

-- ============================================================================
-- DIRECT MESSAGES
-- ============================================================================
CREATE TABLE IF NOT EXISTS direct_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES dm_channels(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_direct_messages_channel ON direct_messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_sender ON direct_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_created ON direct_messages(created_at DESC);

ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages in channels they're part of
CREATE POLICY "Users can view messages in their channels" ON direct_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dm_channel_participants
      WHERE dm_channel_participants.channel_id = direct_messages.channel_id
      AND dm_channel_participants.user_id = auth.uid()
    )
  );

-- Users can send messages to channels they're part of
CREATE POLICY "Users can send messages to their channels" ON direct_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM dm_channel_participants
      WHERE dm_channel_participants.channel_id = direct_messages.channel_id
      AND dm_channel_participants.user_id = auth.uid()
    )
  );

-- ============================================================================
-- PUSH TOKENS
-- ============================================================================
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL UNIQUE,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON push_tokens(user_id);

ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own push tokens" ON push_tokens
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- CERTIFICATES
-- ============================================================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates" ON certificates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own certificates" ON certificates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public can verify certificates by number
CREATE POLICY "Anyone can verify certificates" ON certificates
  FOR SELECT USING (true);

-- ============================================================================
-- PSYCHOLOGICAL PROFILES
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_psych_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  dark_triad_scores JSONB DEFAULT '{}',
  attachment_style TEXT CHECK (attachment_style IN ('secure', 'anxious', 'avoidant', 'fearful', NULL)),
  manipulation_vulnerability JSONB DEFAULT '{}',
  personality_traits JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_psych_profiles_user ON user_psych_profiles(user_id);

ALTER TABLE user_psych_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own psych profile" ON user_psych_profiles
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS FOR REALTIME CHANNEL UPDATES
-- ============================================================================

-- Function to update dm_channels.updated_at when new message arrives
CREATE OR REPLACE FUNCTION update_dm_channel_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE dm_channels
  SET updated_at = NOW()
  WHERE id = NEW.channel_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_direct_message_insert
  AFTER INSERT ON direct_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_dm_channel_timestamp();

-- ============================================================================
-- ENABLE REALTIME FOR KEY TABLES
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE direct_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE dm_channels;
ALTER PUBLICATION supabase_realtime ADD TABLE coaching_sessions;
