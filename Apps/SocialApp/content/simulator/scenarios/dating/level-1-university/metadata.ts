// Level 1: University - Starting Point
import type { Character, CharacterProfile, ThreatLevel, SilhouetteType } from '../../../types';
import type { Level, LevelId } from '../types';

export const LEVEL_ID: LevelId = 'university';

export const levelMetadata = {
  id: LEVEL_ID,
  name: 'University',
  description: 'You\'re a new student in a major city. No friends, no connections. Starting from zero. Learn the basics: charm, observation, target selection, and frame establishment.',
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
    personalityType: 'healthy', // Green - the protagonist
    silhouetteType: 'default',
  },
  {
    id: 'alex',
    name: 'Alex',
    description: 'Your roommate. Could be ally or obstacle.',
    traits: ['friendly', 'naive'],
    defaultEmotion: 'happy',
    personalityType: 'eager', // Orange - eager competitor
    silhouetteType: 'male-athletic', // Broad shoulders, athletic build
  },
  {
    id: 'jordan',
    name: 'Jordan',
    description: 'The RA. Authority figure watching the floor.',
    traits: ['responsible', 'perceptive'],
    defaultEmotion: 'neutral',
    personalityType: 'gatekeeper', // Blue - authority figure
    silhouetteType: 'authority-cap', // RA with cap
  },
  {
    id: 'riley',
    name: 'Riley',
    description: 'The popular one. High social value, many orbiters.',
    traits: ['confident', 'selective'],
    defaultEmotion: 'smirking',
    personalityType: 'magnet', // Orange - social status
    silhouetteType: 'hair-styled', // Stylish hair, popular look
  },
  {
    id: 'casey',
    name: 'Casey',
    description: 'The lonely one. Underestimated, potentially valuable.',
    traits: ['quiet', 'intelligent'],
    defaultEmotion: 'neutral',
    personalityType: 'wallflower', // Slate - avoidant/withdrawn
    silhouetteType: 'female-soft', // Smaller, softer presence
  },
  {
    id: 'morgan',
    name: 'Morgan',
    description: 'The powerful one. Connected family, knows everyone.',
    traits: ['entitled', 'strategic'],
    defaultEmotion: 'cold',
    personalityType: 'narcissist', // Purple - covert narcissist
    silhouetteType: 'male-imposing', // Wide, dominant presence
  },
  {
    id: 'taylor',
    name: 'Taylor',
    description: 'The beautiful one. Used to attention, tests everyone.',
    traits: ['attractive', 'guarded'],
    defaultEmotion: 'seductive',
    personalityType: 'avoidant', // Slate - dismissive avoidant
    silhouetteType: 'hair-ponytail', // Distinctive ponytail
  },
  {
    id: 'sam',
    name: 'Sam',
    description: 'The rival. Competes for the same targets.',
    traits: ['competitive', 'charming'],
    defaultEmotion: 'smirking',
    personalityType: 'chameleon', // Orange - social chameleon
    silhouetteType: 'hair-short', // Short spiky hair
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct.',
    traits: ['intuitive', 'honest'],
    defaultEmotion: 'neutral',
    personalityType: 'friend', // Gold - your inner voice
    silhouetteType: 'default',
  },
];

// Mission unlock requirements
export const missionUnlocks = {
  'mission-1': null, // Always available
  'mission-2': 'mission-1',
  'mission-3': 'mission-2',
  'mission-4': 'mission-3',
  'mission-5': 'mission-4',
  'secret': ['mission-5-optimal-5b', 'mission-5-optimal-5c'], // Both optimal choices required
};

// Level completion requirements
export const levelCompletion = {
  requiredMissions: 4, // 4 out of 5 to unlock next level
  totalMissions: 5,
  nextLevel: 'social-scene' as LevelId,
};

// ============================================
// CHARACTER PROFILES - For Tactic-Based UI
// ============================================

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
  morgan: {
    id: 'morgan',
    name: 'Morgan',
    age: 20,
    personalityType: 'Covert Narcissist (The Strategist)',
    threatLevel: 'high' as ThreatLevel,
    weakness: 'Needs to feel superior. Crumbles when ignored.',
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor',
    age: 19,
    personalityType: 'Dismissive Avoidant (The Prize)',
    threatLevel: 'medium' as ThreatLevel,
    weakness: 'Tests everyone. Respects boundaries only.',
  },
};
