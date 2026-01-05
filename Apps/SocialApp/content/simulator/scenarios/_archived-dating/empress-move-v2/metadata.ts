import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'empress-move';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Empress Move',
  tagline: 'Stop surviving. Start reigning.',
  description:
    "Sometimes power means leaving. Sometimes it means demanding. Sometimes it means becoming undeniable. Three power plays for the woman ready to reign.",
  tier: 'vip' as SubscriptionTier,
  estimatedMinutes: 15,
  difficulty: 'advanced' as Difficulty,
  category: 'healthy' as ScenarioCategory,
  xpReward: 200,
  badgeId: 'empress',
  startSceneId: 'opening-1',
};

export const tacticsLearned = [
  'Strategic withdrawal (leaving from strength)',
  'The ultimatum frame (demanding, not begging)',
  'Public leveling up (becoming undeniable)',
  'Granting position (you choose, they qualify)',
  'Sovereignty establishment (your kingdom, they visit)',
];

export const redFlagsTaught = [
  'Staying past expiration',
  'Begging disguised as ultimatum',
  'Self-improvement for validation',
  'Hoping to be chosen',
  'Desperation exposure',
];

export const templates: TemplatePool = {
  partner: ['Marcus', 'Daniel', 'James'],
  bestie: ['Cate', 'Victoria', 'Alexandra'],
};

export const characters: Character[] = [
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'Your partner. Comfortable. Maybe too comfortable.',
    traits: ['complacent', 'taking-for-granted', 'wake-up-potential'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'cate',
    name: 'Cate',
    description: 'Your ride-or-die. Married a CEO. Built her own empire.',
    traits: ['powerful', 'strategic', 'real'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'new-guy',
    name: 'Alexander',
    description: 'The man watching you from across the room.',
    traits: ['successful', 'interested', 'pursuing'],
    defaultEmotion: 'seductive',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut. The part that knows.',
    traits: ['honest', 'protective'],
    defaultEmotion: 'neutral',
  },
];
