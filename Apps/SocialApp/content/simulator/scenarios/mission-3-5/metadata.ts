import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-3-5';
export const metadata = { id: SCENARIO_ID, title: 'The Harrison Test', tagline: 'The gatekeeper evaluates. Every word matters.', description: 'Harrison Cole wants to see you. Alone. This is the final test before Level 4. He already knows more about you than you know about yourself.', tier: 'premium' as SubscriptionTier, estimatedMinutes: 14, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 140, badgeId: 'harrison-approved', startSceneId: 'harrison-summons' };
export const tacticsLearned = ['High-stakes conversations', 'Reading evaluators', 'Authentic confidence'];
export const redFlagsTaught = ['Tests disguised as conversations', 'Leverage-seeking questions', 'The power of silence'];
export const reward: ScenarioReward = { id: 'harrison-pass', name: 'Harrison\'s Approval', description: 'You passed. Level 4 unlocked.', unlocksScenarioId: 'university-level-4' };
export const characters: Character[] = [
  { id: 'harrison', name: 'Harrison Cole', description: 'The architect of the network. ASPD Factor 1. Evaluating your worth.', traits: ['calculating', 'cold', 'predatory'], defaultEmotion: 'cold', gender: 'male', personalityType: 'psychopath', silhouetteType: 'male-imposing' },
  { id: 'maris', name: 'Maris Caldwell', description: 'Your sponsor. In the room. Observing. Her recommendation matters.', traits: ['calculating', 'dangerous', 'unpredictable'], defaultEmotion: 'knowing', gender: 'female', personalityType: 'psychopath', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
