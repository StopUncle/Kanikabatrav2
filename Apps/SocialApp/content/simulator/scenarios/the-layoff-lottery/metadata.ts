// The Layoff Lottery - Metadata & Configuration
// Premium scenario - survival positioning, indispensability, political navigation

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-layoff-lottery',
  title: 'The Layoff Lottery',
  tagline: 'Cuts are coming. Make sure you\'re still standing.',
  description: 'The rumors are true. 15% of the department. Maybe more. You have four weeks to position yourself. This isn\'t about doing good work anymore. This is about survival.',
  category: 'professional',
  difficulty: 'advanced',
  tier: 'premium',
  estimatedMinutes: 22,
  xpReward: 280,
  startSceneId: 'layoff-1',
  tacticsLearned: [
    'Reading layoff signals - The phrases that mean cuts',
    'The Indispensability Paradox - Critical but not expensive',
    'The Sponsor Shield - Protection from the powerful',
    'Visibility calculus - When to be seen vs. hide',
    'Graceful exits - How leaving well opens doors',
  ],
  redFlagsTaught: [
    'Assuming good work protects you',
    'Ignoring the political game',
    'Having no sponsor when cuts come',
    'Burning bridges when cut',
    'Waiting until scared to build relationships',
  ],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your survival instinct',
    traits: ['observant', 'strategic'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'VP, Decision Maker',
    traits: ['results-focused', 'political'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'chen',
    name: 'Chen',
    description: 'Your Manager',
    traits: ['supportive', 'uncertain'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'priya',
    name: 'Priya',
    description: 'The Connected Insider',
    traits: ['well-informed', 'discreet'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    description: 'HR Partner',
    traits: ['procedural', 'company-focused'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Threatened Colleague',
    traits: ['anxious', 'ally'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'ceo',
    name: 'CEO',
    description: 'Company CEO',
    traits: ['corporate', 'distant'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Director of Operations',
    traits: ['connected', 'helpful'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'colleague',
    name: 'Colleague',
    description: 'Fellow team member',
    traits: ['sympathetic'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  vp_name: ['Marcus'],
  manager_name: ['Chen'],
  insider_name: ['Priya'],
  hr_name: ['Jordan'],
  colleague_name: ['Alex'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
