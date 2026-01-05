// The Raise Negotiation - Metadata & Configuration
// Premium scenario - compensation negotiation mastery

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-raise-negotiation',
  title: 'The Raise Negotiation',
  tagline: 'Stop asking. Start negotiating.',
  description: 'You\'ve outperformed your peers for two years. You\'re paid like someone who just walked in. Today, that changes. Learn to build leverage, anchor high, and get what you deserve.',
  category: 'professional',
  difficulty: 'intermediate',
  tier: 'premium',
  estimatedMinutes: 20,
  xpReward: 350,
  startSceneId: 'raise-1',
  tacticsLearned: [
    'BATNA - Building alternatives before you negotiate',
    'Anchoring - First number sets the range',
    'Documentation - Evidence beats emotion',
    'Escalation timing - When to go above your manager',
    'Counter-offers - Never accept the first number',
  ],
  redFlagsTaught: [
    'The "budget is tight" deflection',
    'Empty promises without documentation',
    'Managers who feel threatened by your success',
    'Bluffing without a real alternative',
    'Accepting the first offer',
  ],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your strategic instinct',
    traits: ['calculating', 'observant'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'derek',
    name: 'Derek',
    description: 'Your Manager',
    traits: ['varies', 'gatekeeper'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'VP - Derek\'s Boss',
    traits: ['direct', 'decisive', 'powerful'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'priya',
    name: 'Priya',
    description: 'HR Partner',
    traits: ['procedural', 'gatekeeper'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    description: 'The Recruiter',
    traits: ['persistent', 'opportunity'],
    defaultEmotion: 'happy',
  },
  {
    id: 'sam',
    name: 'Sam',
    description: 'Trusted Colleague',
    traits: ['honest', 'informed', 'ally'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  manager_name: ['Derek'],
  vp_name: ['Marcus'],
  hr_name: ['Priya'],
  recruiter_name: ['Jordan'],
  colleague_name: ['Sam'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
