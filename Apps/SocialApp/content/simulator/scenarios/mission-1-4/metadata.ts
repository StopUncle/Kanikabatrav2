import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';

export const SCENARIO_ID = 'mission-1-4';

export const metadata = {
  id: SCENARIO_ID,
  title: 'First Warning Signs',
  tagline: 'Some patterns repeat. Learn to see them.',
  description: 'A smaller gathering. Caleb is there, still orbiting Maris. You meet someone new who is... too charming, too fast. The pattern recognition begins. Can you see it before it\'s too late?',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 100,
  badgeId: 'pattern-spotter',
  startSceneId: 'party-arrival',
};

export const tacticsLearned = ['Recognizing love-bombing', 'Pattern recognition across people', 'Trusting your gut'];
export const redFlagsTaught = ['Too much too fast', 'Excessive charm early on', 'Guilt by association'];

export const reward: ScenarioReward = { id: 'red-flag-radar', name: 'Red Flag Radar', description: 'You can spot the warning signs now.', unlocksScenarioId: 'mission-1-5' };

export const characters: Character[] = [
  { id: 'caleb', name: 'Caleb Morrison', description: 'Maris\'s shadow. Apologetic, deferring. A cautionary tale.', traits: ['dependent', 'broken'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'dependent', silhouetteType: 'male-lean' },
  { id: 'ryan', name: 'Ryan Cole', description: 'New face. Magnetic. Intense attention. Too perfect too fast.', traits: ['charming', 'love-bombing', 'narcissist'], defaultEmotion: 'seductive', gender: 'male', personalityType: 'narcissist', silhouetteType: 'male-athletic' },
  { id: 'priya', name: 'Priya Sharma', description: 'Your ally. Watching from the edges.', traits: ['observant', 'protective'], defaultEmotion: 'concerned', gender: 'female', personalityType: 'friend', silhouetteType: 'female-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
