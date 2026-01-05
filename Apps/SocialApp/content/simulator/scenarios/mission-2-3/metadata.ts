import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-2-3';
export const metadata = { id: SCENARIO_ID, title: "Dana's Favor", tagline: 'Her help always has a cost.', description: 'Dana needs a "small favor." She\'s been so nice to you. But something feels off. The favor isn\'t what it seems.', tier: 'premium' as SubscriptionTier, estimatedMinutes: 14, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 115, badgeId: 'favor-dodger', startSceneId: 'dana-call' };
export const tacticsLearned = ['Recognizing manipulative favors', 'Setting boundaries with persistent people', 'Evaluating true costs'];
export const redFlagsTaught = ['Favors that implicate you', 'Guilt as manipulation', 'The helpful predator'];
export const reward: ScenarioReward = { id: 'boundary-master', name: 'Boundary Master', description: 'You can spot transactional traps.', unlocksScenarioId: 'mission-2-4' };
export const characters: Character[] = [
  { id: 'dana', name: 'Dana Morrison', description: 'Caleb\'s sister. The favor she asks is never simple.', traits: ['manipulative', 'persistent'], defaultEmotion: 'happy', gender: 'female', personalityType: 'narcissist', silhouetteType: 'female-elegant' },
  { id: 'priya', name: 'Priya Sharma', description: 'Your ally. Warns you about Dana.', traits: ['protective', 'wise'], defaultEmotion: 'concerned', gender: 'female', personalityType: 'friend', silhouetteType: 'female-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
