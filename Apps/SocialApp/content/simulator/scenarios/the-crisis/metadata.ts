// The Crisis - Metadata & Configuration
// VIP scenario - crisis management, narrative control, reputation defense

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-crisis',
  title: 'The Crisis',
  tagline: 'The first narrative wins. Make it yours.',
  description: '6 AM. Your phone explodes. A major news outlet is running a story in two hours—alleging your division falsified safety data. The accusations are partially true, more false, and entirely career-ending. You have 120 minutes to respond, and everyone is watching to see who survives this.',
  category: 'professional',
  difficulty: 'advanced',
  tier: 'vip',
  estimatedMinutes: 30,
  xpReward: 350,
  startSceneId: 'crisis-1',
  tacticsLearned: [
    'Crisis Communications - Controlling narrative under pressure',
    'Evidence Preservation - Documenting before it disappears',
    'Personal Counsel Strategy - Company lawyers serve the company, not you',
    'Scapegoat Avoidance - Protect yourself when organizations seek sacrifice',
    'Board Management During Scandal - Stakeholder communication under fire',
  ],
  redFlagsTaught: [
    'Trusting company counsel with your defense',
    'Waiting for the story to break before acting',
    'Ignoring internal enemies during crisis',
    'Letting others define your narrative',
    'Destroying evidence instead of preserving it',
  ],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your strategic awareness',
    traits: ['observant', 'calculating'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'victor',
    name: 'Victor',
    description: 'CEO - Protects the company first',
    traits: ['strategic', 'ruthless'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'victoria',
    name: 'Victoria',
    description: 'General Counsel - Serves the company, not you',
    traits: ['careful', 'protective'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'Board Chair - Demands accountability',
    traits: ['cold', 'fiduciary-focused'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'elena',
    name: 'Elena',
    description: 'COO - Your rival, smells blood',
    traits: ['ambitious', 'maneuvering'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'james',
    name: 'James',
    description: 'Reporter - Breaking the story',
    traits: ['aggressive', 'fair'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Your Direct Report - Named in emails',
    traits: ['scared', 'protective'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  ceo_name: ['Victor'],
  counsel_name: ['Victoria'],
  board_chair: ['Marcus'],
  rival_name: ['Elena'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
