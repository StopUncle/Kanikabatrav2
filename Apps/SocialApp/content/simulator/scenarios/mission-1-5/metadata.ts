import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';

export const SCENARIO_ID = 'mission-1-5';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Invitation List',
  tagline: 'Everyone wants to be on the list. Few understand the cost.',
  description: 'THE party of the semester is coming. Tyler Vance controls who gets in. How do you play this? Through Tyler directly? Through Dana\'s "help"? Through Blake who knows everyone? Each path has costs.',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 15,
  difficulty: 'intermediate' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 110,
  badgeId: 'list-navigator',
  startSceneId: 'party-buzz',
};

export const tacticsLearned = ['Navigating gatekeepers', 'Recognizing transactional relationships', 'Strategic social positioning'];
export const redFlagsTaught = ['Help that comes with strings', 'Validation-seeking gatekeepers', 'Playing intermediary as power move'];

export const reward: ScenarioReward = { id: 'party-access', name: 'Party Access', description: 'You\'re on the list. The real game begins.', unlocksScenarioId: 'university-level-2' };

export const characters: Character[] = [
  { id: 'tyler', name: 'Tyler Vance', description: 'Controls the list. Needs constant validation. HPD traits.', traits: ['dramatic', 'insecure', 'gatekeeper'], defaultEmotion: 'happy', gender: 'male', personalityType: 'histrionic', silhouetteType: 'male-athletic' },
  { id: 'dana', name: 'Dana Morrison', description: 'Offers to help. Her help always has costs.', traits: ['calculating', 'transactional'], defaultEmotion: 'happy', gender: 'female', personalityType: 'narcissist', silhouetteType: 'female-elegant' },
  { id: 'blake', name: 'Blake Torres', description: 'Knows everyone. Actually genuine. Potential real ally.', traits: ['connected', 'charming', 'genuine'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'friend', silhouetteType: 'male-lean' },
  { id: 'priya', name: 'Priya Sharma', description: 'Your ally. Offers perspective.', traits: ['observant'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'friend', silhouetteType: 'female-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
