import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'healthy-connection';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Green Flags',
  tagline: 'What good actually looks like.',
  description:
    "After so many red flags, do you even know what healthy looks like? Learn to recognize genuine interest, respectful boundaries, and real partnership.",
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as Difficulty,
  category: 'healthy' as ScenarioCategory,
  xpReward: 150,
  badgeId: 'green-flag-finder',
  startSceneId: 'opening-1',
};

export const tacticsLearned = [
  'Green flag recognition',
  'Healthy conflict patterns',
  'Secure attachment behaviors',
  'Boundaries that don\'t trigger punishment',
  'Consistent effort vs lovebombing',
];

export const redFlagsTaught = [
  'Mistaking chaos for chemistry',
  'Feeling bored by stability',
  'Self-sabotaging good connections',
  'Testing healthy partners unfairly',
];

export const templates: TemplatePool = {
  friend: ['Maya', 'Sarah', 'Cate'],
};

export const characters: Character[] = [
  {
    id: 'michael',
    name: 'Michael',
    description: 'Consistent, present, secure. What healthy looks like.',
    traits: ['secure', 'consistent', 'genuine'],
    defaultEmotion: 'happy',
  },
  {
    id: 'maya',
    name: 'Maya',
    description: 'Your best friend. Helps you see patterns.',
    traits: ['wise', 'supportive', 'direct'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut.',
    traits: ['intuitive'],
    defaultEmotion: 'neutral',
  },
];
