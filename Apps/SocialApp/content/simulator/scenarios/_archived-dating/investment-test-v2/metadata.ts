import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'investment-test';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Investment Test',
  tagline: 'What is freely given is never valued.',
  description:
    "Jake's been sweet for three weeks. Now the demands start: your Saturday, your money, your identity. Each 'small favor' tests your boundaries. Will you give freely—or make him earn access?",
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 15,
  difficulty: 'intermediate' as Difficulty,
  category: 'healthy' as ScenarioCategory,
  xpReward: 175,
  badgeId: 'gatekeeper',
  startSceneId: 'opening-1',
};

export const tacticsLearned = [
  'The Investment Ladder framework',
  'Recognizing time investment demands',
  'Financial boundary enforcement',
  'Triangulation defense (ex encounters)',
  'Identity protection under pressure',
  'Pivoting demands back to the requester',
];

export const redFlagsTaught = [
  'Last-minute "emergency" favors',
  'Financial requests disguised as loans',
  'Triangulation via exes',
  'Identity change requests as "love"',
  'Plausible deniability in manipulation',
];

export const templates: TemplatePool = {
  partner: ['Jake', 'Dylan', 'Ryan'],
  friend: ['Maya', 'Sarah', 'Cate'],
};

export const characters: Character[] = [
  {
    id: 'jake',
    name: 'Jake',
    description: 'Charming, persistent. Three weeks in, the demands begin.',
    traits: ['charming', 'persistent', 'entitled'],
    defaultEmotion: 'seductive',
  },
  {
    id: 'maya',
    name: 'Maya',
    description: 'Your best friend. Sees through everything.',
    traits: ['protective', 'wise', 'blunt'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct. Learning to trust it.',
    traits: ['strategic', 'aware'],
    defaultEmotion: 'neutral',
  },
];
