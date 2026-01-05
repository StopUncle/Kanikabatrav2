// Level 2: The Social Scene - Post-University Dating World
import type { Character } from '../../../types';
import type { LevelId } from '../types';

export const LEVEL_ID: LevelId = 'social-scene';

export const levelMetadata = {
  id: LEVEL_ID,
  name: 'The Social Scene',
  description: 'You\'ve graduated from the training grounds. Now it\'s the real world - clubs, dating apps, social events. The targets are more sophisticated. The stakes are higher. Time to level up.',
  unlockCondition: 'Complete 4/5 University missions',
  tier: 'free' as const,
};

export const characters: Character[] = [
  {
    id: 'player',
    name: 'You',
    description: 'Experienced now. Ready for bigger games.',
    traits: ['strategic', 'charming'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'jamie',
    name: 'Jamie',
    description: 'The club regular. Knows everyone, tests everyone.',
    traits: ['social', 'selective'],
    defaultEmotion: 'smirking',
  },
  {
    id: 'quinn',
    name: 'Quinn',
    description: 'Dating app match. Sophisticated, skeptical.',
    traits: ['intelligent', 'guarded'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'avery',
    name: 'Avery',
    description: 'The setup. Friend of a friend. High social proof.',
    traits: ['connected', 'curious'],
    defaultEmotion: 'happy',
  },
  {
    id: 'drew',
    name: 'Drew',
    description: 'Your ex. Complicated history. Still around.',
    traits: ['familiar', 'manipulative'],
    defaultEmotion: 'smirking',
    personalityType: 'narcissist',
  },
  {
    id: 'skyler',
    name: 'Skyler',
    description: 'The catch. Everyone wants them. High difficulty.',
    traits: ['beautiful', 'strategic'],
    defaultEmotion: 'cold',
  },
  {
    id: 'blake',
    name: 'Blake',
    description: 'Your wingman. Loyal but competitive.',
    traits: ['supportive', 'ambitious'],
    defaultEmotion: 'happy',
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
  'mission-6': null,
  'mission-7': 'mission-6',
  'mission-8': 'mission-7',
  'mission-9': 'mission-8',
  'mission-10': 'mission-9',
  'secret': ['mission-10-optimal-10b', 'mission-10-optimal-10c'],
};

export const levelCompletion = {
  requiredMissions: 4,
  totalMissions: 5,
  nextLevel: 'gala' as LevelId,
};
