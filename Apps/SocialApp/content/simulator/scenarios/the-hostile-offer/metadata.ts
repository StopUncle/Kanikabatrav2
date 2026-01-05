// The Hostile Offer - Metadata & Configuration
// VIP scenario - M&A defense, negotiation under pressure, strategic decision-making

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-hostile-offer',
  title: 'The Hostile Offer',
  tagline: '$4.2 billion. 48 hours. Your move.',
  description: 'Sterling Capital wants your company. The premium is generous. The threat is real. As CEO, you have three options: accept, fight, or find a white knight. Everyone is watching what you do.',
  category: 'professional',
  difficulty: 'advanced',
  tier: 'vip',
  estimatedMinutes: 28,
  xpReward: 350,
  startSceneId: 'hostile-1',
  tacticsLearned: [
    'M&A Defense Strategies - Poison pills, white knights, proxy fights',
    'Fiduciary Duty Navigation - Board vs. shareholder interests',
    'High-Stakes Negotiation - When billions are on the line',
    'Stakeholder Management - Balancing competing interests',
    'Personal vs. Professional Calculus - Money vs. legacy',
  ],
  redFlagsTaught: [
    'Assuming the board will support you unconditionally',
    'Ignoring shareholder pressure until it\'s too late',
    'Letting ego drive strategic decisions',
    'Underestimating hostile acquirer determination',
    'Fighting when negotiation would serve better',
  ],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your strategic instinct',
    traits: ['calculating', 'honest'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'victor',
    name: 'Victor Sterling',
    description: 'CEO of Sterling Capital - The Predator',
    traits: ['charming', 'ruthless'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'victoria',
    name: 'Victoria',
    description: 'Board Chair',
    traits: ['fiduciary-minded', 'supportive'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: 'CFO - The Numbers Person',
    traits: ['analytical', 'pragmatic'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'chen',
    name: 'Chen',
    description: 'General Counsel',
    traits: ['legal-minded', 'strategic'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Board Member - Shareholder Advocate',
    traits: ['fiduciary-focused', 'challenging'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'alexandra',
    name: 'Alexandra',
    description: 'CEO of TechCorp - Potential White Knight',
    traits: ['calculating', 'fair'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'investor',
    name: 'Investor',
    description: 'Major Shareholder (8% stake)',
    traits: ['fiduciary-driven', 'demanding'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'assistant',
    name: 'Assistant',
    description: 'Your executive assistant',
    traits: ['efficient'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'employee',
    name: 'Employee',
    description: 'Company team member',
    traits: ['loyal'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  hostile_acquirer: ['Victor Sterling'],
  board_chair: ['Victoria'],
  cfo_name: ['Marcus'],
  counsel_name: ['Chen'],
  white_knight: ['Alexandra'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
