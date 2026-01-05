-- Add source column to ai_usage for tracking which feature used the AI
ALTER TABLE ai_usage ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'ai-advisor';
