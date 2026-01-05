// The Problem Employee - Metadata & Configuration
// Premium scenario - managing down, documentation, performance management

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-problem-employee',
  title: 'The Problem Employee',
  tagline: 'Coach them up or manage them out.',
  description: 'One of your direct reports is a problem. Underperforming, toxic, or both. Everyone knows it. Nothing has been done. Now it\'s your job to handle it—because the whole team is watching.',
  category: 'professional',
  difficulty: 'advanced',
  tier: 'premium',
  estimatedMinutes: 22,
  xpReward: 280,
  startSceneId: 'emp-1',
  tacticsLearned: [
    'Diagnosing employee types - Underperformer vs Toxic Star',
    'Building documentation - Paper trail for protection',
    'The Performance Improvement Plan - Rehab or exit tool',
    'Having difficult conversations - Clear, documented, witnessed',
    'Team management during crisis - Shield without lying',
  ],
  redFlagsTaught: [
    'Terminating without documentation',
    'Tolerating toxic behavior for results',
    'Letting A-players leave to keep problem employees',
    'Going to HR without a paper trail',
    'Coaching when boundaries are needed',
  ],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your leadership instinct',
    traits: ['observant', 'direct'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'casey',
    name: 'Casey',
    description: 'The Problem Employee',
    traits: ['varies by type'],
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
    id: 'morgan',
    name: 'Morgan',
    description: 'Team Member affected by Casey',
    traits: ['frustrated', 'loyal'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Your Manager',
    traits: ['results-focused', 'direct'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  problem_employee: ['Casey'],
  hr_partner: ['Jordan'],
  team_member: ['Morgan'],
  your_manager: ['Alex'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
