import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-4-5';
export const metadata = { id: SCENARIO_ID, title: 'The Final Game', tagline: 'Last day on the island. Who will you become?', description: 'The island weekend ends. Harrison makes his final offer. Victor judges. Isabelle watches. What you choose defines everything that comes next.', tier: 'vip' as SubscriptionTier, estimatedMinutes: 18, difficulty: 'expert' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 200, badgeId: 'island-master', startSceneId: 'final-morning' };
export const tacticsLearned = ['Long-term positioning', 'Walking away from power', 'Defining your own game'];
export const redFlagsTaught = ['Golden cage offers', 'Power\'s true cost', 'Identity absorption'];
export const reward: ScenarioReward = { id: 'level-master', name: 'Island Survivor', description: 'You survived the island. Now you choose what\'s next.' };
export const characters: Character[] = [
  { id: 'harrison', name: 'Harrison Cole', description: 'The architect. Making his final move.', traits: ['calculating', 'seductive-power'], defaultEmotion: 'cold', gender: 'male', personalityType: 'psychopath', silhouetteType: 'male-imposing' },
  { id: 'victor', name: 'Victor Ashworth', description: 'Old money. Rendering final judgment.', traits: ['aristocratic', 'dismissive'], defaultEmotion: 'cold', gender: 'male', personalityType: 'narcissist', silhouetteType: 'male-imposing' },
  { id: 'isabelle', name: 'Isabelle Laurent', description: 'The observer. Still playing her own game.', traits: ['seductive', 'calculating'], defaultEmotion: 'seductive', gender: 'female', personalityType: 'predator', silhouetteType: 'female-elegant' },
  { id: 'kai', name: 'Kai Chen', description: 'Your original sponsor. Worried about you.', traits: ['loyal', 'volatile'], defaultEmotion: 'concerned', gender: 'female', personalityType: 'borderline', silhouetteType: 'female-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
