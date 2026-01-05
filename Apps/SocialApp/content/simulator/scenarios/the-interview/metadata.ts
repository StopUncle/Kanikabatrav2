// The Interview - Metadata & Configuration
// VIP-only scenario with Premium sneak peek

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-interview',
  title: 'The Interview',
  tagline: 'Three rounds. One offer. Every word matters.',
  description: 'Master the psychology of job interviews and salary negotiation. From waiting room to offer letter, learn to control the narrative.',
  category: 'professional',
  difficulty: 'intermediate',
  tier: 'vip',
  estimatedMinutes: 25,
  xpReward: 500,
  startSceneId: 'interview-1',
  tacticsLearned: [
    'The Primacy Effect - First impressions in 30 seconds',
    'Strategic Vulnerability - Weakness questions as opportunities',
    'Anchoring - Control the salary negotiation',
    'Reading the Room - Body language interpretation',
    'The Power Close - Exit with impact',
  ],
  redFlagsTaught: [
    'Salary trap questions in early rounds',
    'Hostile interviewer tactics',
    'Behavioral question landmines',
    'Desperate acceptance patterns',
    'Low anchor acceptance',
  ],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct',
    traits: ['observant', 'strategic'],
    defaultEmotion: 'neutral',
    personalityType: 'friend', // Gold color for inner voice
  },
  {
    id: 'victoria',
    name: 'Victoria',
    description: 'HR Gatekeeper',
    traits: ['professional', 'observant', 'friendly'],
    defaultEmotion: 'happy',
    personalityType: 'gatekeeper', // Blue authority theme
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'Hiring Manager',
    traits: ['direct', 'analytical', 'challenging'],
    defaultEmotion: 'neutral',
    personalityType: 'authority', // Blue authority - challenging
  },
  {
    id: 'diana',
    name: 'Diana',
    description: 'Senior Director',
    traits: ['powerful', 'unreadable', 'decisive'],
    defaultEmotion: 'neutral',
    personalityType: 'authority', // Blue authority - powerful
  },
  {
    id: 'james',
    name: 'James',
    description: 'The Competition',
    traits: ['confident', 'polished'],
    defaultEmotion: 'smirking',
    personalityType: 'competitor', // Orange rival theme
  },
  {
    id: 'rachel',
    name: 'Rachel',
    description: 'Inside Contact',
    traits: ['helpful', 'connected'],
    defaultEmotion: 'neutral',
    personalityType: 'friend', // Gold friendly theme
  },
  {
    id: 'receptionist',
    name: 'Receptionist',
    description: 'Front Desk Staff',
    traits: ['polite', 'observant'],
    defaultEmotion: 'neutral',
    personalityType: 'neutral', // Gray neutral
  },
];

// Templates for dialog text replacement
// Character names are fixed above, these replace placeholders in dialog text
export const templates = {
  hr_name: ['Victoria'],
  manager_name: ['Marcus'],
  director_name: ['Diana'],
  competitor_name: ['James'],
  contact_name: ['Rachel'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
