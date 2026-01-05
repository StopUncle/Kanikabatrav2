import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';

export const SCENARIO_ID = 'mission-1-3';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Study Group',
  tagline: 'Midterms are coming. So are the social games.',
  description: 'A study group forms around you. But not everyone is here to study. Someone wants to use you to get closer to Maris. Another is stealing ideas. Balance academics and alliance-building.',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 14,
  difficulty: 'intermediate' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 95,
  badgeId: 'study-survivor',
  startSceneId: 'library-invite',
};

export const tacticsLearned = ['Balancing social and academic goals', 'Recognizing idea theft', 'Strategic group dynamics'];
export const redFlagsTaught = ['Using others for access', 'Academic sabotage', 'Fake collaboration'];

export const reward: ScenarioReward = { id: 'academic-shield', name: 'Academic Shield', description: 'You protected your work and your grades.', unlocksScenarioId: 'mission-1-4' };

export const characters: Character[] = [
  { id: 'casey', name: 'Casey Chen', description: 'Your genuine study partner from the gala.', traits: ['intelligent', 'kind'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'anxious-attached', silhouetteType: 'female-soft' },
  { id: 'marcus', name: 'Marcus Webb', description: 'Smart but lazy. Known for "borrowing" others\' work.', traits: ['charming', 'opportunistic'], defaultEmotion: 'happy', gender: 'male', personalityType: 'competitor', silhouetteType: 'male-athletic' },
  { id: 'lisa', name: 'Lisa Park', description: 'Wants Maris access through you. Offers help in exchange.', traits: ['transactional', 'ambitious'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'competitor', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
