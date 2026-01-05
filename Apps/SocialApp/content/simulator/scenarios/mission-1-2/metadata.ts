import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';

export const SCENARIO_ID = 'mission-1-2';

export const metadata = {
  id: SCENARIO_ID,
  title: 'Campus Currents',
  tagline: 'Everyone is watching. Not everyone is friendly.',
  description: 'Campus has heard about the gala. Some people look at you differently now. Others are too interested. Dana Morrison wants to be your new best friend. Alex is acting strange. Navigate the shifting social landscape.',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 12,
  difficulty: 'beginner' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 85,
  badgeId: 'current-reader',
  startSceneId: 'campus-walk',
};

export const tacticsLearned = ['Reading changed social dynamics', 'Identifying false friendliness', 'Strategic alliance building'];
export const redFlagsTaught = ['Too-fast friendships', 'Information fishing disguised as interest', 'Jealousy masked as support'];

export const reward: ScenarioReward = {
  id: 'social-awareness',
  name: 'Social Awareness',
  description: 'You can read the currents now.',
  unlocksScenarioId: 'mission-1-3',
};

export const characters: Character[] = [
  { id: 'alex', name: 'Alex Torres', description: 'Your roommate. Something is off.', traits: ['jealous', 'passive-aggressive'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'competitor', silhouetteType: 'male-athletic' },
  { id: 'dana', name: 'Dana Morrison', description: 'Caleb\'s sister. Very interested in being your friend. Too interested.', traits: ['calculating', 'charming'], defaultEmotion: 'happy', gender: 'female', personalityType: 'narcissist', silhouetteType: 'female-elegant' },
  { id: 'priya', name: 'Priya Sharma', description: 'Your genuine ally. Offers quiet guidance.', traits: ['observant', 'loyal'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'friend', silhouetteType: 'female-athletic' },
  { id: 'jordan', name: 'Jordan Park', description: 'The RA. Watches everything.', traits: ['protective', 'fair'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'authority', silhouetteType: 'male-lean' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
