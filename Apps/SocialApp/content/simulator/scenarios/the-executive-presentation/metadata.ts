// The Executive Presentation - Metadata & Configuration
// Premium scenario - executive presence, high-stakes delivery, hostile questions

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-executive-presentation',
  title: 'The Executive Presentation',
  tagline: 'Fifteen minutes. The C-suite. One chance.',
  description: 'The board room. The C-suite watching. One chance to prove you belong at the next level. Your slides are ready. But they\'re not evaluating your slides—they\'re evaluating YOU.',
  category: 'professional',
  difficulty: 'advanced',
  tier: 'premium',
  estimatedMinutes: 20,
  xpReward: 320,
  startSceneId: 'exec-1',
  tacticsLearned: [
    'Executive presence - Gravitas, command, composure',
    'The power opening - First 30 seconds set everything',
    'Handling hostile questions - HOW matters more than WHAT',
    'Recovery over perfection - Everyone stumbles, not everyone recovers',
    'The strong close - Weak endings erase strong presentations',
  ],
  redFlagsTaught: [
    'Jumping straight to content without presence',
    'Defensive responses to challenges',
    'Freezing when you don\'t know an answer',
    'Mumbling through the close',
    'Reading from slides instead of commanding the room',
  ],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your strategic instinct',
    traits: ['observant', 'coaching'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'victoria',
    name: 'Victoria',
    description: 'CEO - Final authority',
    traits: ['poker-faced', 'intimidating', 'few-words'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'CFO - The numbers person',
    traits: ['detail-oriented', 'skeptical'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'elena',
    name: 'Elena',
    description: 'COO - Operations focused',
    traits: ['practical', 'no-nonsense'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'chen',
    name: 'Chen',
    description: 'Your Champion - Senior Director',
    traits: ['supportive', 'invested'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  ceo_name: ['Victoria'],
  cfo_name: ['Marcus'],
  coo_name: ['Elena'],
  champion_name: ['Chen'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
