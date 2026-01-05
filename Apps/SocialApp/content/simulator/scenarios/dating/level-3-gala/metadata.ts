// Level 3: The Gala - High Society
import type { Character } from '../../../types';
import type { LevelId } from '../types';

export const LEVEL_ID: LevelId = 'gala';

export const levelMetadata = {
  id: LEVEL_ID,
  name: 'The Gala',
  description: 'An exclusive charity gala. High-net-worth individuals, potential allies, future targets. This is where you transition from player to predator.',
  unlockCondition: 'Complete 4/5 Social Scene missions',
  tier: 'premium' as const,
};

export const characters: Character[] = [
  {
    id: 'player',
    name: 'You',
    description: 'Rising star. Invited to the big leagues.',
    traits: ['refined', 'strategic'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'mentor',
    name: 'The Mentor',
    description: 'Senior executive who invited you. Expects a return.',
    traits: ['powerful', 'calculating'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'alex-gala',
    name: 'Alex',
    description: 'The ambitious one. Sees you as competition.',
    traits: ['driven', 'jealous'],
    defaultEmotion: 'smirking',
  },
  {
    id: 'jordan-gala',
    name: 'Jordan',
    description: 'The mysterious one. Old money, new power.',
    traits: ['enigmatic', 'wealthy'],
    defaultEmotion: 'cold',
  },
  {
    id: 'casey-gala',
    name: 'Casey',
    description: 'The wildcard. Could be ally or threat.',
    traits: ['unpredictable', 'charming'],
    defaultEmotion: 'seductive',
  },
  {
    id: 'target-ex',
    name: 'The Ex',
    description: 'Your target\'s ex. Complication incoming.',
    traits: ['bitter', 'manipulative'],
    defaultEmotion: 'angry',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct.',
    traits: ['intuitive', 'honest'],
    defaultEmotion: 'neutral',
  },
];

export const missionUnlocks = {
  'mission-11': null,
  'mission-12': 'mission-11',
  'mission-13': 'mission-12',
  'mission-14': 'mission-13',
  'mission-15': 'mission-14',
  'secret': ['mission-15-optimal-15b', 'mission-15-optimal-15c'],
};

export const levelCompletion = {
  requiredMissions: 4,
  totalMissions: 5,
  nextLevel: 'escalation' as LevelId,
};
