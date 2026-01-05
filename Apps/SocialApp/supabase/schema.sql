-- The Dark Mirror - Complete Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'premium', 'vip')),
  subscription_status text default 'inactive',
  stripe_customer_id text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- QUIZZES
-- ============================================
create table public.quizzes (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  icon text,
  color text,
  question_count int not null default 0,
  estimated_minutes int not null default 5,
  is_premium boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.quizzes enable row level security;

create policy "Quizzes are viewable by everyone"
  on public.quizzes for select
  using (is_active = true);

-- ============================================
-- QUIZ QUESTIONS
-- ============================================
create table public.quiz_questions (
  id uuid primary key default uuid_generate_v4(),
  quiz_id uuid references public.quizzes on delete cascade not null,
  question_text text not null,
  trait text,
  order_index int not null,
  created_at timestamptz default now()
);

alter table public.quiz_questions enable row level security;

create policy "Questions viewable by everyone"
  on public.quiz_questions for select
  using (true);

-- ============================================
-- QUIZ OPTIONS
-- ============================================
create table public.quiz_options (
  id uuid primary key default uuid_generate_v4(),
  question_id uuid references public.quiz_questions on delete cascade not null,
  option_text text not null,
  score_value int default 0,
  order_index int not null
);

alter table public.quiz_options enable row level security;

create policy "Options viewable by everyone"
  on public.quiz_options for select
  using (true);

-- ============================================
-- QUIZ RESULTS
-- ============================================
create table public.quiz_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles on delete set null,
  quiz_id uuid references public.quizzes not null,
  email text,
  name text,
  total_score int not null,
  trait_scores jsonb,
  result_category text,
  answers jsonb,
  created_at timestamptz default now()
);

alter table public.quiz_results enable row level security;

create policy "Users can view own results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "Anyone can submit quiz"
  on public.quiz_results for insert
  with check (true);

-- ============================================
-- LEADS
-- ============================================
create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  name text,
  source text default 'quiz',
  quiz_result_id uuid references public.quiz_results,
  metadata jsonb,
  created_at timestamptz default now()
);

create unique index leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

create policy "Anyone can submit lead"
  on public.leads for insert
  with check (true);

-- ============================================
-- COURSES
-- ============================================
create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  thumbnail_url text,
  price_cents int,
  is_free boolean default false,
  tier_required text default 'premium' check (tier_required in ('free', 'premium', 'vip')),
  total_minutes int default 0,
  lesson_count int default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  published_at timestamptz
);

alter table public.courses enable row level security;

create policy "Published courses viewable by everyone"
  on public.courses for select
  using (is_published = true);

-- ============================================
-- COURSE MODULES
-- ============================================
create table public.course_modules (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references public.courses on delete cascade not null,
  title text not null,
  description text,
  order_index int not null
);

alter table public.course_modules enable row level security;

create policy "Modules viewable by everyone"
  on public.course_modules for select
  using (true);

-- ============================================
-- COURSE LESSONS
-- ============================================
create table public.course_lessons (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references public.course_modules on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  duration_seconds int default 0,
  order_index int not null,
  is_preview boolean default false
);

alter table public.course_lessons enable row level security;

create policy "Lessons viewable by everyone"
  on public.course_lessons for select
  using (true);

-- ============================================
-- COURSE PROGRESS
-- ============================================
create table public.course_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles on delete cascade not null,
  lesson_id uuid references public.course_lessons on delete cascade not null,
  completed boolean default false,
  watched_seconds int default 0,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

alter table public.course_progress enable row level security;

create policy "Users can manage own progress"
  on public.course_progress for all
  using (auth.uid() = user_id);

-- ============================================
-- CHAT ROOMS
-- ============================================
create table public.chat_rooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  icon text default '💬',
  is_public boolean default true,
  is_vip_only boolean default false,
  member_count int default 0,
  created_at timestamptz default now()
);

alter table public.chat_rooms enable row level security;

create policy "Public rooms viewable by everyone"
  on public.chat_rooms for select
  using (is_public = true);

-- ============================================
-- CHAT MESSAGES
-- ============================================
create table public.chat_messages (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid references public.chat_rooms on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  content text not null,
  reply_to uuid references public.chat_messages,
  created_at timestamptz default now()
);

alter table public.chat_messages enable row level security;

create policy "Messages in public rooms viewable"
  on public.chat_messages for select
  using (
    exists (
      select 1 from public.chat_rooms
      where chat_rooms.id = chat_messages.room_id
      and chat_rooms.is_public = true
    )
  );

create policy "Authenticated users can send messages"
  on public.chat_messages for insert
  with check (auth.uid() = user_id);

-- ============================================
-- ACTIVITIES (community feed)
-- ============================================
create table public.activities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles on delete cascade not null,
  type text not null check (type in ('quiz_completed', 'course_started', 'course_completed', 'lesson_completed', 'user_joined', 'badge_earned')),
  entity_id text,
  entity_title text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index activities_created_at_idx on public.activities (created_at desc);

alter table public.activities enable row level security;

create policy "Activities viewable by everyone"
  on public.activities for select
  using (true);

create policy "Users can create own activities"
  on public.activities for insert
  with check (auth.uid() = user_id);

-- ============================================
-- FOLLOWS (social connections)
-- ============================================
create table public.follows (
  id uuid primary key default uuid_generate_v4(),
  follower_id uuid references public.profiles on delete cascade not null,
  following_id uuid references public.profiles on delete cascade not null,
  created_at timestamptz default now(),
  unique(follower_id, following_id)
);

create index follows_follower_idx on public.follows (follower_id);
create index follows_following_idx on public.follows (following_id);

alter table public.follows enable row level security;

create policy "Follows viewable by everyone"
  on public.follows for select
  using (true);

create policy "Users can manage own follows"
  on public.follows for all
  using (auth.uid() = follower_id);

-- ============================================
-- COACHING PACKAGES
-- ============================================
create table public.coaching_packages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  price_cents int not null,
  session_count int not null,
  session_duration_minutes int not null,
  features jsonb,
  is_active boolean default true,
  is_popular boolean default false
);

alter table public.coaching_packages enable row level security;

create policy "Packages viewable by everyone"
  on public.coaching_packages for select
  using (is_active = true);

-- ============================================
-- COACHING BOOKINGS
-- ============================================
create table public.coaching_bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles on delete cascade not null,
  package_id uuid references public.coaching_packages not null,
  stripe_payment_intent_id text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  total_sessions int not null,
  sessions_used int default 0,
  created_at timestamptz default now()
);

alter table public.coaching_bookings enable row level security;

create policy "Users can view own bookings"
  on public.coaching_bookings for select
  using (auth.uid() = user_id);

-- ============================================
-- SEED DATA: Dark Triad Quiz
-- ============================================
insert into public.quizzes (slug, title, description, icon, color, question_count, estimated_minutes, is_premium)
values (
  'dark-triad',
  'Dark Triad Assessment',
  'Measure your levels of Machiavellianism, Narcissism, and Psychopathy',
  '🪞',
  '#C9A961',
  12,
  8,
  false
);

do $$
declare
  quiz_uuid uuid;
  q_uuid uuid;
begin
  select id into quiz_uuid from public.quizzes where slug = 'dark-triad';

  -- Machiavellianism questions
  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to manipulate others to get my way.', 'machiavellianism', 1)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I have used deceit or lied to get my way.', 'machiavellianism', 2)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I have used flattery to get my way.', 'machiavellianism', 3)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to exploit others towards my own end.', 'machiavellianism', 4)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  -- Psychopathy questions
  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to lack remorse.', 'psychopathy', 5)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to be unconcerned with the morality of my actions.', 'psychopathy', 6)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to be callous or insensitive.', 'psychopathy', 7)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to be cynical.', 'psychopathy', 8)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  -- Narcissism questions
  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to want others to admire me.', 'narcissism', 9)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to want others to pay attention to me.', 'narcissism', 10)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to seek prestige or status.', 'narcissism', 11)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);

  insert into public.quiz_questions (quiz_id, question_text, trait, order_index)
  values (quiz_uuid, 'I tend to expect special favors from others.', 'narcissism', 12)
  returning id into q_uuid;
  insert into public.quiz_options (question_id, option_text, score_value, order_index) values
    (q_uuid, 'Strongly Disagree', 1, 1),
    (q_uuid, 'Disagree', 2, 2),
    (q_uuid, 'Neutral', 3, 3),
    (q_uuid, 'Agree', 4, 4),
    (q_uuid, 'Strongly Agree', 5, 5);
end $$;

-- ============================================
-- SEED DATA: Courses
-- ============================================
insert into public.courses (slug, title, description, is_free, tier_required, is_published, lesson_count, total_minutes)
values
  ('dark-psychology-101', 'Dark Psychology 101', 'Master the fundamentals of understanding human behavior', true, 'free', true, 12, 165),
  ('art-of-influence', 'The Art of Influence', 'Learn ethical persuasion techniques that actually work', false, 'premium', true, 18, 260),
  ('emotional-armor', 'Emotional Armor', 'Protect yourself from manipulation and toxic patterns', false, 'premium', true, 15, 210),
  ('reading-between-lines', 'Reading Between Lines', 'Decode body language and hidden intentions', false, 'vip', true, 10, 135);

-- ============================================
-- SEED DATA: Chat Rooms (realistic member counts)
-- ============================================
insert into public.chat_rooms (name, description, icon, is_vip_only, member_count)
values
  ('The War Room', 'Where predators compare notes and prey learns to bite back', '⚔️', false, 247),
  ('The Library', 'Dissect the doctrine. Chapter by chapter, power move by power move', '📖', false, 156),
  ('Field Reports', 'Real victories. Real tactics. No participation trophies', '🎯', false, 112),
  ('The Mirror', 'Confront your shadow. No judgment, only truth', '🪞', false, 89),
  ('Strategic Silence', 'Sometimes the best move is watching. Lurk, learn, level up', '👁️', false, 73),
  ('The Inner Sanctum', 'Direct access to Kanika. VIP minds only', '🔮', true, 31);

-- ============================================
-- SEED DATA: Coaching Packages
-- ============================================
insert into public.coaching_packages (slug, name, description, price_cents, session_count, session_duration_minutes, features, is_popular)
values
  ('insight-call', 'Insight Call', 'One powerful session to gain clarity on your situation', 50000, 1, 30,
   '["Personal assessment", "30-minute video call", "Action plan PDF", "Email follow-up"]'::jsonb, false),
  ('deep-dive', 'Deep Dive', 'Transform your understanding over three intensive sessions', 200000, 3, 60,
   '["Comprehensive assessment", "3x 60-minute sessions", "Personalized workbook", "Priority email support", "Session recordings"]'::jsonb, true),
  ('vip-transformation', 'VIP Transformation', 'The ultimate deep transformation experience', 500000, 6, 90,
   '["Full psychological profile", "6x 90-minute sessions", "Custom strategy blueprint", "Unlimited email support", "Private community access", "All course materials included"]'::jsonb, false);

-- ============================================
-- Enable Realtime
-- ============================================
alter publication supabase_realtime add table public.chat_messages;
alter publication supabase_realtime add table public.activities;
