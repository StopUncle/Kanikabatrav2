// Level 2: The Social Scene - Post-University (Apple-Safe Version)
// DEFENSIVE FRAMING: Learn to RECOGNIZE manipulation tactics, not execute them
import type { Character, CharacterProfile, ThreatLevel, SilhouetteType } from '../../../types';
import type { LevelId } from '../types';

export const LEVEL_ID: LevelId = 'social-scene';

export const levelMetadata = {
  id: LEVEL_ID,
  name: 'The Social Scene',
  description: 'You\'ve graduated from the training grounds. Now it\'s the real world - clubs, dating apps, social events. The manipulators are more sophisticated. Learn to spot their tactics before they spot you.',
  unlockCondition: 'Complete 4/5 University missions',
  tier: 'free' as const,
};

export const characters: Character[] = [
  {
    id: 'player',
    name: 'You',
    description: 'Learning to recognize manipulation patterns.',
    traits: ['observant', 'learning'],
    defaultEmotion: 'neutral',
    personalityType: 'healthy',
    silhouetteType: 'default',
  },
  {
    id: 'jamie',
    name: 'Jamie',
    description: 'The genuine one. Tests you, but fairly. What healthy connection looks like.',
    traits: ['genuine', 'direct'],
    defaultEmotion: 'neutral',
    personalityType: 'secure',
    silhouetteType: 'hair-styled',
  },
  {
    id: 'quinn',
    name: 'Quinn',
    description: 'Your dating app match. Too intense too fast. Red flags everywhere.',
    traits: ['intense', 'overwhelming'],
    defaultEmotion: 'happy',
    personalityType: 'anxious-attached',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'avery',
    name: 'Avery',
    description: 'The setup. Charming performance, but something feels off.',
    traits: ['charming', 'performative'],
    defaultEmotion: 'happy',
    personalityType: 'histrionic',
    silhouetteType: 'hair-ponytail',
  },
  {
    id: 'drew',
    name: 'Drew',
    description: 'Your ex. NPD classic. Hoovering, triangulation, DARVO.',
    traits: ['manipulative', 'strategic'],
    defaultEmotion: 'smirking',
    personalityType: 'narcissist',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'skyler',
    name: 'Skyler',
    description: 'The catch everyone wants. Working the room with preselection tactics.',
    traits: ['calculating', 'cold'],
    defaultEmotion: 'cold',
    personalityType: 'psychopath',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'blake',
    name: 'Blake',
    description: 'Your friend. Means well but enables. Pushes you toward setups.',
    traits: ['supportive', 'blind'],
    defaultEmotion: 'happy',
    personalityType: 'friend',
    silhouetteType: 'male-lean',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct. Spots patterns you might miss.',
    traits: ['intuitive', 'protective'],
    defaultEmotion: 'knowing',
    personalityType: 'friend',
    silhouetteType: 'default',
  },
  // Secret mission characters
  {
    id: 'aristocrat',
    name: 'The Aristocrat',
    description: 'Gatekeeper to the "inner circle." Tests your worthiness.',
    traits: ['refined', 'discerning'],
    defaultEmotion: 'neutral',
    personalityType: 'narcissist',
    silhouetteType: 'male-imposing',
  },
  {
    id: 'connector',
    name: 'The Connector',
    description: 'Recruiter for the group. Makes you feel special.',
    traits: ['social', 'strategic'],
    defaultEmotion: 'happy',
    personalityType: 'psychopath',
    silhouetteType: 'female-elegant',
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

export const characterProfiles: Record<string, CharacterProfile> = {
  jamie: {
    id: 'jamie',
    name: 'Jamie',
    age: 25,
    personalityType: 'Secure Attachment (Healthy)',
    threatLevel: 'low' as ThreatLevel,
    weakness: 'None. This is what healthy looks like. Learn the contrast.',
  },
  quinn: {
    id: 'quinn',
    name: 'Quinn',
    age: 27,
    personalityType: 'Anxious Attachment (Love Bomber)',
    threatLevel: 'medium' as ThreatLevel,
    weakness: 'Too much too fast. Future faking. "Soulmate" talk on day one.',
  },
  avery: {
    id: 'avery',
    name: 'Avery',
    age: 26,
    personalityType: 'Histrionic (The Performer)',
    threatLevel: 'medium' as ThreatLevel,
    weakness: 'Charming but shallow. Performance over substance.',
  },
  drew: {
    id: 'drew',
    name: 'Drew',
    age: 28,
    personalityType: 'NPD (Covert Narcissist)',
    threatLevel: 'high' as ThreatLevel,
    weakness: 'Classic hoover tactics. DARVO when caught. Never accepts blame.',
  },
  skyler: {
    id: 'skyler',
    name: 'Skyler',
    age: 29,
    personalityType: 'ASPD Factor 1 (High-Functioning)',
    threatLevel: 'high' as ThreatLevel,
    weakness: 'Preselection master. Creates competition for sport. Empty inside.',
  },
  blake: {
    id: 'blake',
    name: 'Blake',
    age: 26,
    personalityType: 'Enabler (Well-Meaning)',
    threatLevel: 'low' as ThreatLevel,
    weakness: 'Can\'t see manipulation. Thinks everyone deserves a chance.',
  },
  aristocrat: {
    id: 'aristocrat',
    name: 'The Aristocrat',
    age: 45,
    personalityType: 'Grandiose Narcissist (Gatekeeper)',
    threatLevel: 'high' as ThreatLevel,
    weakness: 'Needs to feel superior. Has conditional acceptance.',
  },
  connector: {
    id: 'connector',
    name: 'The Connector',
    age: 32,
    personalityType: 'Psychopathic Recruiter',
    threatLevel: 'high' as ThreatLevel,
    weakness: 'Cult tactics. Love bombs new recruits. Expects loyalty in return.',
  },
};
