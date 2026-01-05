import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-4-4';
export const metadata = { id: SCENARIO_ID, title: 'Blake\'s Betrayal', tagline: 'The friend who sold you out. What now?', description: 'Blake betrayed you. Harrison set it up as a test. Now comes the choice—destroy Blake for Harrison\'s approval, or forgive and lose Harrison\'s interest. Either way, everything changes.', tier: 'vip' as SubscriptionTier, estimatedMinutes: 17, difficulty: 'expert' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 185, badgeId: 'betrayal-handler', startSceneId: 'discovery' };
export const tacticsLearned = ['Handling betrayal strategically', 'Power vs humanity', 'Long-game thinking'];
export const redFlagsTaught = ['Loyalty tests', 'Manufactured betrayals', 'Power as corruption'];
export const reward: ScenarioReward = { id: 'betrayal-pass', name: 'True Face', description: 'You\'ve shown who you are under pressure.', unlocksScenarioId: 'mission-4-5' };
export const characters: Character[] = [
  { id: 'blake', name: 'Blake Chen', description: 'Your friend. Who betrayed you.', traits: ['conflicted', 'guilty'], defaultEmotion: 'sad', gender: 'male', personalityType: 'anxious-attached', silhouetteType: 'male-lean' },
  { id: 'harrison', name: 'Harrison Cole', description: 'The architect of the test.', traits: ['cold', 'evaluating'], defaultEmotion: 'cold', gender: 'male', personalityType: 'psychopath', silhouetteType: 'male-imposing' },
  { id: 'kai', name: 'Kai Chen', description: 'Your sponsor. Watching.', traits: ['volatile', 'protective'], defaultEmotion: 'concerned', gender: 'female', personalityType: 'borderline', silhouetteType: 'female-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
