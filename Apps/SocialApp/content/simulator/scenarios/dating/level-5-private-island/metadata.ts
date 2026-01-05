// Level 5: Private Island - The Endgame
import type { Character } from '../../../types';
import type { LevelId } from '../types';

export const LEVEL_ID: LevelId = 'private-island';

export const levelMetadata = {
  id: LEVEL_ID,
  name: 'Private Island',
  description: 'The final arena. Billionaires, power brokers, and other apex predators. This is where you prove you\'re the ultimate player. The endgame begins.',
  unlockCondition: 'Complete 4/4 Escalation missions',
  tier: 'vip' as const,
};

export const characters: Character[] = [
  { id: 'player', name: 'You', description: 'The final test awaits.', traits: ['apex', 'calculating'], defaultEmotion: 'neutral' },
  { id: 'host', name: 'The Host', description: 'Owns the island. Controls everything.', traits: ['omniscient', 'ruthless'], defaultEmotion: 'cold' },
  { id: 'alpha', name: 'The Alpha', description: 'Your main competition for the crown.', traits: ['dominant', 'dangerous'], defaultEmotion: 'cold' },
  { id: 'ally', name: 'The Ally', description: 'Potential partner or inevitable betrayer.', traits: ['strategic', 'ambitious'], defaultEmotion: 'smirking' },
  { id: 'wildcard', name: 'The Wildcard', description: 'Chaos incarnate. Could help or destroy.', traits: ['unpredictable', 'fascinating'], defaultEmotion: 'seductive' },
  { id: 'betrayer', name: 'The Betrayer', description: 'Someone will betray. Will it be them?', traits: ['hidden', 'calculating'], defaultEmotion: 'neutral' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];

export const missionUnlocks = {
  'mission-20': null,
  'mission-21': 'mission-20',
  'mission-22': 'mission-21',
  'mission-23': 'mission-22',
  'mission-24': 'mission-23',
  'secret': ['mission-24-optimal-24b', 'mission-24-optimal-24c'],
};

export const levelCompletion = {
  requiredMissions: 5,
  totalMissions: 5,
  nextLevel: null,
};
