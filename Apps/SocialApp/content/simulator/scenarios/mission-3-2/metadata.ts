import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-3-2';
export const metadata = { id: SCENARIO_ID, title: "Elena's Price", tagline: 'Information has a cost. So does ignorance.', description: 'Elena Vance knows everything about who\'s who at the gala. She\'ll share—for a price. What are you willing to trade?', tier: 'premium' as SubscriptionTier, estimatedMinutes: 14, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 120, badgeId: 'intel-negotiator', startSceneId: 'elena-meet' };
export const tacticsLearned = ['Negotiating for information', 'Understanding intel value', 'Protecting your own data'];
export const redFlagsTaught = ['Information brokers remember debts', 'Giving info = giving power', 'Fair trades vs exploitation'];
export const reward: ScenarioReward = { id: 'intel-acquired', name: 'Intel Acquired', description: 'You know who\'s who now.', unlocksScenarioId: 'mission-3-3' };
export const characters: Character[] = [
  { id: 'elena', name: 'Elena Vance', description: 'Information broker. ASPD Factor 2. Everything is transactional.', traits: ['calculating', 'cold', 'transactional'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'antisocial', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
