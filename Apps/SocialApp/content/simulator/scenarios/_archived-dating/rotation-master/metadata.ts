import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'rotation-master';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Rotation Master',
  tagline: 'Options eliminate desperation.',
  description:
    "Fixation kills your power. Options restore it. Learn to build, manage, and navigate a rotation—including when things get complicated.",
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as Difficulty,
  category: 'dating-tactics' as ScenarioCategory,
  xpReward: 150,
  badgeId: 'options-queen',
  startSceneId: 'opening-1',
};

export const tacticsLearned = [
  'The Three-Minimum Rule',
  'Breaking intermittent reinforcement',
  'Genuine scarcity through options',
  'Handling the exclusivity conversation',
  'Managing discovery situations',
];

export const redFlagsTaught = [
  'Hot/cold cycling (intermittent reinforcement)',
  'Minimum-effort responses',
  'Pressure for premature exclusivity',
  'Possessiveness disguised as love',
];

export const templates: TemplatePool = {
  friend: ['Sarah', 'Maya', 'Cate'],
};

export const characters: Character[] = [
  {
    id: 'marcus',
    name: 'Marcus',
    description: "Hot and cold. The one you can't stop thinking about.",
    traits: ['inconsistent', 'charming', 'unavailable'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'david',
    name: 'David',
    description: 'Consistent. Plans real dates. Actually tries.',
    traits: ['consistent', 'attentive', 'genuine'],
    defaultEmotion: 'happy',
  },
  {
    id: 'chris',
    name: 'Chris',
    description: 'Fun, casual, confident. No pressure.',
    traits: ['funny', 'casual', 'confident'],
    defaultEmotion: 'smirking',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Your best friend. Calls out your bullshit.',
    traits: ['honest', 'supportive', 'direct'],
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
