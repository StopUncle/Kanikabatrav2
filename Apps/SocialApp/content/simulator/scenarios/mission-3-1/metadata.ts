import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-3-1';
export const metadata = { id: SCENARIO_ID, title: 'The Dress Code', tagline: 'Look wrong, and you\'re invisible. Look desperate, and you\'re laughable.', description: 'The elite gala has an unwritten dress code. Prepare carefully—someone wants to help, someone wants to sabotage.', tier: 'premium' as SubscriptionTier, estimatedMinutes: 12, difficulty: 'intermediate' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 110, badgeId: 'dress-code-master', startSceneId: 'prep-begin' };
export const tacticsLearned = ['Reading unwritten codes', 'Accepting genuine help', 'Spotting sabotage'];
export const redFlagsTaught = ['Help that harms', 'Status anxiety exploitation', 'The setup'];
export const reward: ScenarioReward = { id: 'gala-ready', name: 'Gala Ready', description: 'You know how to present yourself.', unlocksScenarioId: 'mission-3-2' };
export const characters: Character[] = [
  { id: 'kai', name: 'Kai Chen', description: 'Your sponsor. Offers guidance.', traits: ['exacting', 'helpful'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'borderline', silhouetteType: 'female-elegant' },
  { id: 'victoria', name: 'Victoria Sterling', description: 'Offers to "help" with your outfit. Suspicious.', traits: ['manipulative', 'territorial'], defaultEmotion: 'happy', gender: 'female', personalityType: 'narcissist', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
