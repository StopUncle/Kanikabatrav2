import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-3-3';
export const metadata = { id: SCENARIO_ID, title: "Victoria's Territory", tagline: 'Her domain. Her rules. One wrong move ends you.', description: 'Victoria\'s charity event. You must navigate without making an enemy—or becoming a pawn.', tier: 'premium' as SubscriptionTier, estimatedMinutes: 16, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 130, badgeId: 'territory-survivor', startSceneId: 'charity-arrival' };
export const tacticsLearned = ['Navigating hostile territory', 'Reading territorial behavior', 'Strategic neutrality'];
export const redFlagsTaught = ['DARVO tactics', 'Public humiliation as control', 'False allies'];
export const reward: ScenarioReward = { id: 'victoria-survived', name: 'Victoria Survived', description: 'You passed through unscathed.', unlocksScenarioId: 'mission-3-4' };
export const characters: Character[] = [
  { id: 'victoria', name: 'Victoria Sterling', description: 'Queen of this event. Testing everyone.', traits: ['territorial', 'ruthless'], defaultEmotion: 'happy', gender: 'female', personalityType: 'narcissist', silhouetteType: 'female-elegant' },
  { id: 'millicent', name: 'Millicent Caldwell', description: 'Maris\'s twin sister. The "good" one. Actually helpful.', traits: ['genuine', 'perceptive'], defaultEmotion: 'concerned', gender: 'female', personalityType: 'healthy', silhouetteType: 'female-elegant' },
  { id: 'maris', name: 'Maris Caldwell', description: 'Your sponsor. Watching. Waiting. Testing.', traits: ['calculating', 'dangerous', 'unpredictable'], defaultEmotion: 'knowing', gender: 'female', personalityType: 'psychopath', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
