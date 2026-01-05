// Level 1: University - Starting Point (Apple-Safe Version)
import type { Character, CharacterProfile, ThreatLevel, SilhouetteType } from '../../../types';
import type { Level, LevelId } from '../types';

export const LEVEL_ID: LevelId = 'university';

export const levelMetadata = {
  id: LEVEL_ID,
  name: 'University',
  description: 'You\'re a new student in a major city. No friends, no connections. Starting from zero. Learn the basics: reading people, setting boundaries, and recognizing red flags.',
  unlockCondition: 'Starting level - always available',
  tier: 'free' as const,
};

export const characters: Character[] = [
  {
    id: 'player',
    name: 'You',
    description: 'The protagonist. New to campus, ready to learn.',
    traits: ['adaptable', 'observant'],
    defaultEmotion: 'neutral',
    personalityType: 'healthy',
    silhouetteType: 'default',
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Your roommate. Could be ally or obstacle.',
    traits: ['friendly', 'naive'],
    defaultEmotion: 'happy',
    personalityType: 'eager',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    description: 'The RA. Authority figure watching the floor.',
    traits: ['responsible', 'perceptive'],
    defaultEmotion: 'neutral',
    personalityType: 'gatekeeper',
    silhouetteType: 'authority-cap',
  },
  {
    id: 'riley',
    name: 'Riley',
    description: 'The popular one. High social value, many connections.',
    traits: ['confident', 'selective'],
    defaultEmotion: 'smirking',
    personalityType: 'magnet',
    silhouetteType: 'hair-styled',
  },
  {
    id: 'casey',
    name: 'Casey',
    description: 'The quiet one. Underestimated, potentially valuable ally.',
    traits: ['quiet', 'intelligent'],
    defaultEmotion: 'neutral',
    personalityType: 'wallflower',
    silhouetteType: 'female-soft',
  },
  {
    id: 'maris',
    name: 'Maris',
    description: 'The dangerous one. Hotelier family wealth, med student. Tests loyalty. Calculated charm.',
    traits: ['calculating', 'seductive', 'entitled'],
    defaultEmotion: 'cold',
    personalityType: 'narcissist',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'taylor',
    name: 'Taylor',
    description: 'The guarded one. Used to attention, tests everyone.',
    traits: ['attractive', 'guarded'],
    defaultEmotion: 'neutral',
    personalityType: 'avoidant',
    silhouetteType: 'hair-ponytail',
  },
  {
    id: 'sam',
    name: 'Sam',
    description: 'The rival. Competes for the same social circles.',
    traits: ['competitive', 'charming'],
    defaultEmotion: 'smirking',
    personalityType: 'chameleon',
    silhouetteType: 'hair-short',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct.',
    traits: ['intuitive', 'honest'],
    defaultEmotion: 'neutral',
    personalityType: 'friend',
    silhouetteType: 'default',
  },
  {
    id: 'caleb',
    name: 'Caleb',
    description: 'Maris\'s orbiter. Learned helplessness personified.',
    traits: ['eager', 'submissive', 'hopeful'],
    defaultEmotion: 'neutral',
    personalityType: 'dependent',
    silhouetteType: 'male-lean',
  },
  {
    id: 'priya',
    name: 'Priya',
    description: 'Someone who got burned. Potential ally with inside knowledge.',
    traits: ['bitter', 'knowing', 'cautious'],
    defaultEmotion: 'neutral',
    personalityType: 'friend',
    silhouetteType: 'hair-ponytail',
  },
];

export const missionUnlocks = {
  'mission-1': null,
  'mission-2': 'mission-1',
  'mission-3': 'mission-2',
  'mission-4': 'mission-3',
  'mission-5': 'mission-4',
  'secret': ['mission-5-optimal-5b', 'mission-5-optimal-5c'],
};

export const levelCompletion = {
  requiredMissions: 4,
  totalMissions: 5,
  nextLevel: 'social-scene' as LevelId,
};

export const characterProfiles: Record<string, CharacterProfile> = {
  jordan: {
    id: 'jordan',
    name: 'Jordan',
    age: 24,
    personalityType: 'Authority Figure (The Gatekeeper)',
    threatLevel: 'low' as ThreatLevel,
    weakness: 'Respects maturity. Dislikes neediness.',
  },
  alex: {
    id: 'alex',
    name: 'Alex',
    age: 18,
    personalityType: 'Friendly Competitor (The Eager One)',
    threatLevel: 'low' as ThreatLevel,
    weakness: 'Wants to be liked. Will fold if you stay cool.',
  },
  riley: {
    id: 'riley',
    name: 'Riley',
    age: 19,
    personalityType: 'Social Status Holder (The Magnet)',
    threatLevel: 'medium' as ThreatLevel,
    weakness: 'Bored by chasers. Intrigued by indifference.',
  },
  casey: {
    id: 'casey',
    name: 'Casey',
    age: 18,
    personalityType: 'Undervalued Asset (The Wallflower)',
    threatLevel: 'low' as ThreatLevel,
    weakness: 'Starved for attention. Loyalty for acknowledgment.',
  },
  sam: {
    id: 'sam',
    name: 'Sam',
    age: 19,
    personalityType: 'Social Chameleon (The Networker)',
    threatLevel: 'low' as ThreatLevel,
    weakness: 'Neutral player. Will follow social proof.',
  },
  maris: {
    id: 'maris',
    name: 'Maris',
    age: 23,
    personalityType: 'NPD (Grandiose)',
    threatLevel: 'high' as ThreatLevel,
    weakness: 'Needs adoration and control. Calculated charm masks emptiness. Crumbles when truly seen.',
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor',
    age: 19,
    personalityType: 'Dismissive Avoidant (The Guarded)',
    threatLevel: 'medium' as ThreatLevel,
    weakness: 'Tests everyone. Respects boundaries only.',
  },
};
