import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'beige-escape';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Beige Escape',
  tagline: 'Match their energy. Or starve trying.',
  description:
    "He texts 'hey.' Plans 'sometime.' Answers with 'lol.' You keep carrying the conversation, the planning, the effort. Time to stop. The Beige Escape teaches you to match low effort—and recognize when to walk away.",
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 15,
  difficulty: 'intermediate' as Difficulty,
  category: 'healthy' as ScenarioCategory,
  xpReward: 150,
  badgeId: 'energy-matcher',
  startSceneId: 'opening-1',
};

export const tacticsLearned = [
  'Energy matching (mirror their effort)',
  'Forcing investment through questions',
  'Recognizing low-effort patterns',
  'Clean exit from non-starters',
  'Value demand over validation seeking',
];

export const redFlagsTaught = [
  'One-word responses as interest test',
  'Vague planning ("sometime")',
  '"I forgot" as respect test',
  'Emotional walls masking disinterest',
  'Making you carry the relationship',
];

export const templates: TemplatePool = {
  partner: ['Ryan', 'Tyler', 'Chris'],
  friend: ['Maya', 'Sarah', 'Cate'],
};

export const characters: Character[] = [
  {
    id: 'ryan',
    name: 'Ryan',
    description: 'Attractive, seemingly interested, but chronically low-effort.',
    traits: ['vague', 'passive', 'non-committal'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'maya',
    name: 'Maya',
    description: 'Your friend who sees through the bullshit.',
    traits: ['direct', 'wise', 'protective'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'The part of you that knows their effort level.',
    traits: ['observant', 'strategic'],
    defaultEmotion: 'neutral',
  },
];
