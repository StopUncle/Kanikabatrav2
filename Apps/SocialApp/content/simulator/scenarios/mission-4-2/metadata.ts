import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-4-2';
export const metadata = { id: SCENARIO_ID, title: 'The Dinner Table', tagline: 'Every seat tells a story. Every word is weighed.', description: 'Formal dinner on the island. Seating is strategy. Conversation is warfare. Victor tests with contempt. Isabelle tests with charm. Harrison watches everything.', tier: 'vip' as SubscriptionTier, estimatedMinutes: 17, difficulty: 'expert' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 175, badgeId: 'dinner-survivor', startSceneId: 'approaching-dining' };
export const tacticsLearned = ['Seating politics', 'Table conversation strategy', 'Reading power dynamics'];
export const redFlagsTaught = ['Status tests disguised as small talk', 'Charm as intelligence gathering', 'Subtle exclusion tactics'];
export const reward: ScenarioReward = { id: 'dinner-pass', name: 'Inner Circle', description: 'You survived the dinner. Now for the real conversations.', unlocksScenarioId: 'mission-4-3' };
export const characters: Character[] = [
  { id: 'victor', name: 'Victor Ashworth', description: 'Old money. Testing your pedigree.', traits: ['aristocratic', 'dismissive'], defaultEmotion: 'cold', gender: 'male', personalityType: 'narcissist', silhouetteType: 'male-imposing' },
  { id: 'isabelle', name: 'Isabelle Laurent', description: 'International intrigue. Every question has purpose.', traits: ['seductive', 'calculating'], defaultEmotion: 'seductive', gender: 'female', personalityType: 'predator', silhouetteType: 'female-elegant' },
  { id: 'harrison', name: 'Harrison Cole', description: 'The architect. Missing nothing.', traits: ['observant', 'powerful'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'psychopath', silhouetteType: 'male-imposing' },
  { id: 'maris', name: 'Maris Caldwell', description: 'Your sponsor. Watching how you perform. Every move evaluated.', traits: ['calculating', 'dangerous'], defaultEmotion: 'cold', gender: 'female', personalityType: 'psychopath', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
