import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-2-2';
export const metadata = { id: SCENARIO_ID, title: 'The Wingman Test', tagline: 'Friends help friends. Unless they\'re competing.', description: 'Blake offers to be your wingman. Sounds simple. But Blake has his own interests. Are you helping each other or competing?', tier: 'premium' as SubscriptionTier, estimatedMinutes: 14, difficulty: 'intermediate' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 105, badgeId: 'wingman-wisdom', startSceneId: 'night-out' };
export const tacticsLearned = ['Reading wingman dynamics', 'Spotting covert competition', 'Mutual benefit vs. exploitation'];
export const redFlagsTaught = ['Sabotage disguised as help', 'Competitive friends', 'Undermining compliments'];
export const reward: ScenarioReward = { id: 'social-navigation', name: 'Social Navigation', description: 'You can read group dynamics now.', unlocksScenarioId: 'mission-2-3' };
export const characters: Character[] = [
  { id: 'blake', name: 'Blake Torres', description: 'Your wingman for the night. Or is he?', traits: ['charming', 'competitive'], defaultEmotion: 'happy', gender: 'male', personalityType: 'neutral', silhouetteType: 'male-lean' },
  { id: 'morgan', name: 'Morgan', description: 'Someone interesting. Both you and Blake notice.', traits: ['attractive', 'perceptive'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'healthy', silhouetteType: 'female-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
