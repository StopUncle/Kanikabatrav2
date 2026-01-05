import type {
  Character,
  SubscriptionTier,
  Difficulty,
  ScenarioCategory,
  TemplatePool,
} from '../../types';

export const SCENARIO_ID = 'the-credit-thief';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Credit Thief',
  tagline: 'You built it. They took it. Now what?',
  description:
    'You stayed late. You figured out what no one else could. And in the meeting with the VP, your colleague smiled and said "we" while presenting YOUR slides. Everyone now thinks it was them. Credit is currency—and someone just picked your pocket.',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 18,
  difficulty: 'intermediate' as Difficulty,
  category: 'professional' as ScenarioCategory,
  xpReward: 200,
  badgeId: 'credit-thief',
  startSceneId: 'theft-setup-1',
};

export const tacticsLearned = [
  'Documentation as armor',
  'Strategic credit reclamation',
  'The "we" weapon defense',
  'Evidence-based confrontation',
  'Future-proofing your work',
];

export const redFlagsTaught = [
  'The "we" and "team effort" blur',
  'Deflection and DARVO when confronted',
  '"Territorial" accusation flip',
  'Retaliation patterns after confrontation',
];

export const templates: TemplatePool = {
  thief_name: ['Alex'],
  manager_name: ['Priya'],
  vp_name: ['Marcus'],
  witness_name: ['Jordan'],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your strategic instincts',
    traits: ['observant', 'protective'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'The credit thief - smooth, calculated, knows what they\'re doing',
    traits: ['charming', 'calculating', 'defensive'],
    defaultEmotion: 'happy',
  },
  {
    id: 'priya',
    name: 'Priya',
    description: 'Your manager - can help or hinder',
    traits: ['professional', 'fair', 'political'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'VP who witnessed the theft - his perception matters',
    traits: ['busy', 'influential', 'results-focused'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    description: 'Trusted colleague who witnessed everything',
    traits: ['loyal', 'observant', 'supportive'],
    defaultEmotion: 'concerned',
  },
];
