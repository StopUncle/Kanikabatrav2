import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-4-1';
export const metadata = { id: SCENARIO_ID, title: 'Island Arrival', tagline: 'The private jet lands. First impressions are permanent.', description: 'Private jet. Private island. The real players. First impressions here last forever. Victor, Dominic, Isabelle—each evaluating you.', tier: 'vip' as SubscriptionTier, estimatedMinutes: 14, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 145, badgeId: 'island-arrival', startSceneId: 'jet-landing' };
export const tacticsLearned = ['Elite first impressions', 'Reading old vs new money', 'Positioning among power'];
export const redFlagsTaught = ['Contempt disguised as politeness', 'Charm as assessment', 'Status games'];
export const reward: ScenarioReward = { id: 'island-pass', name: 'Island Pass', description: 'You\'re in. Not marked as tourist.', unlocksScenarioId: 'mission-4-2' };
export const characters: Character[] = [
  { id: 'victor', name: 'Victor Ashworth', description: 'Old money. Subtle contempt for newcomers.', traits: ['aristocratic', 'dismissive'], defaultEmotion: 'cold', gender: 'male', personalityType: 'narcissist', silhouetteType: 'male-imposing' },
  { id: 'dominic', name: 'Dominic Reyes', description: 'New money. Calculating. Evaluating your usefulness.', traits: ['calculating', 'transactional'], defaultEmotion: 'neutral', gender: 'male', personalityType: 'antisocial', silhouetteType: 'male-athletic' },
  { id: 'isabelle', name: 'Isabelle Laurent', description: 'International. Dangerous charm.', traits: ['seductive', 'dangerous'], defaultEmotion: 'seductive', gender: 'female', personalityType: 'predator', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
