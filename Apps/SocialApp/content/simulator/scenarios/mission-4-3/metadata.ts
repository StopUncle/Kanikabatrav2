import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-4-3';
export const metadata = { id: SCENARIO_ID, title: 'Midnight Conversations', tagline: 'The real deals happen after dinner.', description: 'After-dinner gatherings. Private talks on terraces. Garden whispers. Millicent offers something genuine. Elena offers something transactional. The night reveals true faces.', tier: 'vip' as SubscriptionTier, estimatedMinutes: 17, difficulty: 'expert' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 180, badgeId: 'midnight-navigator', startSceneId: 'after-dinner' };
export const tacticsLearned = ['Reading genuine vs transactional offers', 'Alliance building', 'Information protection'];
export const redFlagsTaught = ['Intimacy as manipulation', 'False friendship offers', 'Information extraction techniques'];
export const reward: ScenarioReward = { id: 'midnight-pass', name: 'Night Navigator', description: 'You\'ve formed alliances. Now comes the test.', unlocksScenarioId: 'mission-4-4' };
export const characters: Character[] = [
  { id: 'millicent', name: 'Millicent Hayes', description: 'Genuine. Rare in this world.', traits: ['authentic', 'cautious'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'healthy', silhouetteType: 'female-elegant' },
  { id: 'elena', name: 'Elena Vance', description: 'Information broker. Everything has a price.', traits: ['calculating', 'transactional'], defaultEmotion: 'knowing', gender: 'female', personalityType: 'antisocial', silhouetteType: 'female-elegant' },
  { id: 'harrison', name: 'Harrison Cole', description: 'Watching. Always watching.', traits: ['observant', 'powerful'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'psychopath', silhouetteType: 'male-imposing' },
  { id: 'dominic', name: 'Dominic Reyes', description: 'New money. Seeking alliances.', traits: ['ambitious', 'direct'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'antisocial', silhouetteType: 'male-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
