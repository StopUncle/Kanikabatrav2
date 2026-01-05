// The CEO Dinner - Metadata & Configuration
// VIP scenario - elite networking, executive rapport, high-stakes relationship building

import type { Scenario, Character } from '../../types';

export const metadata: Omit<Scenario, 'scenes' | 'characters' | 'templates'> = {
  id: 'the-ceo-dinner',
  title: 'The CEO Dinner',
  tagline: 'The room where it happens. You\'re invited.',
  description: 'Your CEO is hosting a dinner for 12 executives—Fortune 500 leaders, board members, and one investor worth $30 billion. You got an invitation. You\'re the most junior person in the room. For the next four hours, every word matters.',
  category: 'professional',
  difficulty: 'advanced',
  tier: 'vip',
  estimatedMinutes: 25,
  xpReward: 320,
  startSceneId: 'dinner-1',
  tacticsLearned: [
    'Elite Networking - Building relationships at the highest level',
    'Executive Presence in Social Settings - Informal ≠ unimportant',
    'Reading Room Dynamics - Power hierarchies and seating politics',
    'Strategic First Impressions - Memorable without arrogant',
    'Follow-Up Architecture - The dinner opens doors, you walk through them',
  ],
  redFlagsTaught: [
    'Assuming casual means unimportant',
    'Over-drinking in high-stakes settings',
    'Passive listening without contributing',
    'Trying too hard to impress',
    'Forgetting why you were invited',
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
    description: 'Your CEO - The Host',
    traits: ['commanding', 'intentional'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'alexandra',
    name: 'Alexandra',
    description: 'Tech CEO - The Skeptic',
    traits: ['direct', 'brilliant', 'challenging'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    description: '$30B Investor - Quiet Power',
    traits: ['observant', 'influential'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'victoria',
    name: 'Victoria',
    description: 'Board Chair - Power Broker',
    traits: ['warm-surface', 'evaluating'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'elena',
    name: 'Elena',
    description: 'CFO - The Numbers Person',
    traits: ['analytical', 'direct'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'james',
    name: 'James',
    description: 'Old Money - Connected',
    traits: ['patrician', 'testing'],
    defaultEmotion: 'neutral',
  },
];

export const templates = {
  ceo_name: ['Victor'],
  tech_ceo: ['Alexandra'],
  investor: ['Marcus'],
  board_chair: ['Victoria'],
};

export const tacticsLearned = metadata.tacticsLearned;
export const redFlagsTaught = metadata.redFlagsTaught;
