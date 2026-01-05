// The First Date from Hell - Metadata & Configuration
// A gateway scenario teaching early red flag recognition and exit strategies

import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'first-date-from-hell';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The First Date from Hell',
  tagline: 'Politeness is not more important than safety.',
  description:
    "Twenty minutes in and you already know this is wrong. But you're stuck at a restaurant. They drove. They're getting weird. How do you get out safely - without 'being rude'? A crash course in trusting your gut.",
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as Difficulty,
  category: 'dating-tactics' as ScenarioCategory,
  xpReward: 100,
  badgeId: 'first-date-survivor',
  startSceneId: 'scene-1-arriving',
};

export const tacticsLearned = [
  'Early red flag recognition',
  'Trusting discomfort before articulating why',
  'Practical exit strategies',
  'Using staff as allies',
  'The fake emergency exit',
  'Direct boundary-setting',
];

export const redFlagsTaught = [
  'Interrupting and dominating conversation',
  'Touching without consent',
  'Sexual comments too early',
  'Dismissing your boundaries',
  'Using logistics as control',
  'Anger when challenged',
];

export const templates: TemplatePool = {
  date: ['Blake', 'Jordan', 'Taylor', 'Morgan'],
  friend: ['Alex', 'Sam', 'Jamie', 'Casey'],
};

export const characters: Character[] = [
  {
    id: 'blake',
    name: 'Blake',
    description: 'Your first date. Met on an app. Seemed normal. Isn\'t.',
    traits: ['boundary-pusher', 'dismissive', 'escalating', 'uses charm as cover'],
    defaultEmotion: 'seductive',
  },
  {
    id: 'friend',
    name: 'Alex',
    description: 'Your emergency contact. The one who answers when you need out.',
    traits: ['protective', 'no-nonsense', 'reliable'],
    defaultEmotion: 'concerned',
  },
  {
    id: 'server',
    name: 'Server',
    description: 'A potential ally in the restaurant.',
    traits: ['observant', 'helpful'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut. Registering red flags before you can name them.',
    traits: ['intuitive', 'protective'],
    defaultEmotion: 'neutral',
  },
];
