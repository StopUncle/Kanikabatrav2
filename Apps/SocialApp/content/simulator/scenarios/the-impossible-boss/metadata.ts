// The Impossible Boss - Metadata & Configuration
// Free scenario - managing up under difficult managers

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-impossible-boss',
  title: 'The Impossible Boss',
  tagline: 'You can\'t fire your boss. But you can manage them.',
  description: 'Your manager makes every day harder than it needs to be. Whether they micromanage, steal credit, disappear, or attack - learn to survive, adapt, and thrive despite them.',
  category: 'professional',
  difficulty: 'intermediate',
  tier: 'free',
  estimatedMinutes: 18,
  xpReward: 200,
  startSceneId: 'boss-1',
  tacticsLearned: [
    'Diagnosing boss types - The four impossible managers',
    'Proactive communication - Calming the micromanager',
    'Visibility building - Defeating the credit thief',
    'Self-structure - Surviving absent management',
    'Documentation - Protecting against hostility',
  ],
  redFlagsTaught: [
    'Confronting without documentation',
    'Going to HR without protection',
    'Waiting too long to build exit options',
    'Fighting every battle instead of choosing wisely',
    'Burning out instead of adapting strategy',
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
    id: 'jordan',
    name: 'Jordan',
    description: 'Your Impossible Boss',
    traits: ['varies by type'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'casey',
    name: 'Casey',
    description: 'Skip Level - Jordan\'s Boss',
    traits: ['observant', 'political'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'sam',
    name: 'Sam',
    description: 'HR Partner',
    traits: ['procedural', 'company-focused'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'morgan',
    name: 'Morgan',
    description: 'Trusted Colleague',
    traits: ['supportive', 'honest'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  boss_name: ['Jordan'],
  skip_level: ['Casey'],
  hr_name: ['Sam'],
  colleague_name: ['Morgan'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
