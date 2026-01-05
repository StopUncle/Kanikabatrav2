// The Wedding Weekend - Metadata & Configuration
// Modular scenario structure for maintainability

import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, TemplatePool, SectionGoals } from '../../types';

export const SCENARIO_ID = 'wedding-weekend';

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
  title: 'The Wedding Weekend',
  tagline: 'Survive the weekend or lose everything.',
  description:
    "Three days at his best friend's destination wedding. The bride hates you. The ex is a bridesmaid. The alpha friend is testing you. His sister could save you or destroy you. Ethan won't protect you.",
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 25,
  difficulty: 'advanced' as Difficulty,
  category: 'healthy' as ScenarioCategory,
  xpReward: 200,
  badgeId: 'wedding-survivor',
  startSceneId: 'scene-1-arrival',
  prerequisites: PREREQUISITES,
};

export const tacticsLearned = [
  'Friend group infiltration',
  'Family navigation and sibling alliances',
  'Ex-partner management',
  'Self-respect preservation under social pressure',
  'Strategic silence vs. confrontation timing',
  'Alpha dynamics - earning respect',
];

export const redFlagsTaught = [
  'Partner who won\'t defend you publicly',
  'Friend group that excludes intentionally',
  'Bride/host using position for power plays',
  'Ex still treated as "one of us"',
  'Public humiliation disguised as jokes',
];

export const templates: TemplatePool = {
  boyfriend: ['Ethan'],
  bride: ['Sophia'],
  groom: ['Marcus'],
  ex: ['Danielle'],
  sister: ['Lily'],
  bestfriend: ['Priya'],
};

export const characters: Character[] = [
  {
    id: 'ethan',
    name: 'Ethan',
    description: 'Your boyfriend of 6 months. Conflict-avoidant. Loves you but won\'t rock the boat.',
    traits: ['passive', 'people-pleaser', 'caught between worlds'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'sophia',
    name: 'Sophia',
    description: 'The bride. Queen of this friend group. Sees you as a threat.',
    traits: ['territorial', 'strategic', 'passive-aggressive', 'socially dominant'],
    defaultEmotion: 'cold',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'The groom. Ethan\'s best friend. The alpha. His approval is everything.',
    traits: ['dominant', 'testing', 'competitive', 'respects strength'],
    defaultEmotion: 'smirking',
  },
  {
    id: 'danielle',
    name: 'Danielle',
    description: 'Ethan\'s ex of 3 years. Bridesmaid. Still beloved by the group.',
    traits: ['charming', 'graceful', 'ambiguous intentions'],
    defaultEmotion: 'happy',
  },
  {
    id: 'lily',
    name: 'Lily',
    description: 'Ethan\'s younger sister. Wildcard. Could be your greatest ally or loudest critic.',
    traits: ['observant', 'honest', 'messy', 'loyal'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'priya',
    name: 'Priya',
    description: 'Your best friend back home. Voice of reason via text.',
    traits: ['protective', 'practical', 'doesn\'t sugarcoat'],
    defaultEmotion: 'concerned',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut.',
    traits: ['intuitive'],
    defaultEmotion: 'neutral',
  },
];

// Goals displayed on-screen for each day
export const sectionGoals: SectionGoals = {
  day1: [
    { id: 'goal-sister', text: 'Establish connection with sister', completedBySceneId: 'scene-1c-confident' },
    { id: 'goal-bride', text: 'Survive bride\'s interrogation', completedBySceneId: 'scene-4-sophia-reveal' },
    { id: 'goal-ex', text: 'Handle ex gracefully', completedBySceneId: 'scene-5-danielle-confrontation' },
  ],
  day2: [
    { id: 'goal-slideshow', text: 'Navigate the slideshow incident', completedBySceneId: 'scene-19-roast' },
    { id: 'goal-groom', text: 'Win groom\'s respect', completedBySceneId: 'scene-20-respond' },
    { id: 'goal-defense', text: 'Get partner to defend you', completedBySceneId: 'scene-21-defend-request' },
  ],
  day3: [
    { id: 'goal-final', text: 'Pass the final test', completedBySceneId: 'scene-27-sophia-ultimatum' },
    { id: 'goal-alliance', text: 'Secure an alliance', completedBySceneId: 'scene-34-lily-finale' },
    { id: 'goal-dignity', text: 'Exit with dignity', completedBySceneId: 'ending-clean-win' },
  ],
};
