// The Clean Break - Metadata & Configuration
// A scenario about leaving someone who won't let you go

import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'clean-break';

// Intermediate scenarios that must be completed first (need 3+)
export const PREREQUISITES = [
  'avoidant-dance',
  'gaslighter-escape',
  'investment-test',
  'rotation-master',
  'family-introduction',
  'beige-escape',
  'the-ghost',
  'empress-move',
];

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Clean Break',
  tagline: 'Leaving is not a negotiation.',
  description:
    "You've decided it's over. They haven't. Between the tears, the rage, the promises, and the threats - you have to get out. Your stuff is at their place. You share friends. They know where you work. How do you leave someone who won't let you go?",
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 18,
  difficulty: 'advanced' as Difficulty,
  category: 'healthy' as ScenarioCategory,
  xpReward: 175,
  badgeId: 'clean-break',
  startSceneId: 'scene-1-conversation',
  prerequisites: PREREQUISITES,
};

export const tacticsLearned = [
  'Breakups don\'t require agreement',
  'Recognizing manipulation during breakups',
  'Safety planning when leaving',
  'Managing flying monkeys',
  'Resisting the hoover attempt',
  'Practical extraction strategies',
];

export const redFlagsTaught = [
  'DARVO (Deny, Attack, Reverse Victim/Offender)',
  'Cycling through tears, rage, promises',
  'Using belongings as leverage',
  'Recruiting friends to pressure you',
  'Threats disguised as predictions',
  'The hoover "I\'ve changed" attempt',
];

export const templates: TemplatePool = {
  ex: ['Drew', 'Jordan', 'Taylor', 'Riley'],
  bestfriend: ['Morgan', 'Casey', 'Sam', 'Alex'],
  flyingmonkey: ['Quinn', 'Jamie', 'Avery', 'Reese'],
};

export const characters: Character[] = [
  {
    id: 'drew',
    name: 'Drew',
    description: 'Your partner of 8 months. You\'ve decided it\'s over. They haven\'t accepted that.',
    traits: ['manipulative', 'cycling', 'can\'t accept rejection', 'escalates'],
    defaultEmotion: 'sad',
  },
  {
    id: 'morgan',
    name: 'Morgan',
    description: 'Your ride-or-die who\'s helping you get out.',
    traits: ['protective', 'practical', 'has been waiting for this', 'supportive'],
    defaultEmotion: 'concerned',
  },
  {
    id: 'quinn',
    name: 'Quinn',
    description: 'Drew\'s friend who gets recruited to pressure you.',
    traits: ['well-meaning', 'manipulated', 'thinks they\'re helping'],
    defaultEmotion: 'concerned',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut. Keeping you grounded when the manipulation intensifies.',
    traits: ['intuitive', 'protective'],
    defaultEmotion: 'neutral',
  },
];
