import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';

export const SCENARIO_ID = 'mission-2-1';

export const metadata = {
  id: SCENARIO_ID,
  title: 'Digital Minefield',
  tagline: 'Everyone is online. Not everyone is real.',
  description: 'The dating apps are calling. But not everyone is who they seem. Catfish lurk. Oversharing is weaponized. Can you spot the red flags through a screen?',
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 12,
  difficulty: 'intermediate' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 100,
  badgeId: 'digital-defender',
  startSceneId: 'app-swipe',
};

export const tacticsLearned = ['Digital red flag detection', 'Information protection online', 'Authentic self-presentation'];
export const redFlagsTaught = ['Too perfect profiles', 'Rushing to meet', 'Excessive personal questions early'];

export const reward: ScenarioReward = { id: 'digital-wisdom', name: 'Digital Wisdom', description: 'You can read screens like people now.', unlocksScenarioId: 'mission-2-2' };

export const characters: Character[] = [
  { id: 'jordan-match', name: 'Jordan', description: 'A match. Seems genuine. Asks good questions.', traits: ['authentic', 'curious'], defaultEmotion: 'happy', gender: 'male', personalityType: 'healthy', silhouetteType: 'male-lean' },
  { id: 'sam-catfish', name: 'Sam', description: 'Too perfect. Too fast. Something is off.', traits: ['fake', 'rushing'], defaultEmotion: 'seductive', gender: 'female', personalityType: 'predator', silhouetteType: 'female-elegant' },
  { id: 'riley-overshare', name: 'Riley', description: 'Asks too many personal questions too fast. Gathering intel.', traits: ['probing', 'intense', 'collector'], defaultEmotion: 'curious', gender: 'male', personalityType: 'predator', silhouetteType: 'male-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
