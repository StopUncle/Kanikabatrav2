import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool } from '../../types';

export const SCENARIO_ID = 'covert-narcissist';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Hidden Predator',
  tagline: 'When charm hides something darker',
  description:
    "They seem so kind. So humble. So caring. But something feels off. Learn to spot the three faces of covert narcissism before they drain you dry.",
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 12,
  difficulty: 'advanced' as Difficulty,
  category: 'narcissist' as ScenarioCategory,
  xpReward: 150,
  badgeId: 'covert-narc-expert',
  startSceneId: 'opening-1',
};

export const tacticsLearned = [
  'Covert narcissism recognition',
  'Victim narrative detection',
  'Humble bragging patterns',
  'Control disguised as care',
  'Strategic disengagement',
];

export const redFlagsTaught = [
  'Perpetual victimhood',
  'Backhanded compliments',
  'Unsolicited "help" that controls',
  'Conversations always redirect to them',
  'Guilt when setting boundaries',
];

export const templates: TemplatePool = {
  friend: ['Maya', 'Cate', 'Sarah'],
};

export const characters: Character[] = [
  {
    id: 'alex',
    name: 'Alex',
    description: 'The Victim. Always suffering, always needing you.',
    traits: ['covert-narcissist', 'victim-player', 'emotional-vampire'],
    defaultEmotion: 'sad',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    description: 'The Humble Bragger. So blessed, so grateful, so better than you.',
    traits: ['covert-narcissist', 'humble-bragger', 'virtue-signaler'],
    defaultEmotion: 'happy',
  },
  {
    id: 'taylor',
    name: 'Taylor',
    description: 'The Savior. Just wants to help. By controlling everything.',
    traits: ['covert-narcissist', 'savior-complex', 'controller'],
    defaultEmotion: 'concerned',
  },
  {
    id: 'maya',
    name: 'Maya',
    description: 'Your best friend who sees through the fog.',
    traits: ['wise', 'direct', 'supportive'],
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
