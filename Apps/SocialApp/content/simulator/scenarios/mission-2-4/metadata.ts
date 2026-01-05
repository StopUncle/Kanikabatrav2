import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-2-4';
export const metadata = { id: SCENARIO_ID, title: 'The Ex Appears', tagline: 'Past meets present. Handle with care.', description: 'Marcus is everywhere suddenly. Your dismissive-avoidant ex. Push-pull energy. Can you handle seeing him without losing yourself?', tier: 'premium' as SubscriptionTier, estimatedMinutes: 16, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 120, badgeId: 'ex-handler', startSceneId: 'party-shock' };
export const tacticsLearned = ['Managing ex encounters', 'Recognizing push-pull patterns', 'Emotional regulation'];
export const redFlagsTaught = ['Dismissive-avoidant tactics', 'Hot-cold cycles', 'Using jealousy as control'];
export const reward: ScenarioReward = { id: 'emotional-armor', name: 'Emotional Armor', description: 'Past can\'t touch you now.', unlocksScenarioId: 'mission-2-5' };
export const characters: Character[] = [
  { id: 'marcus-ex', name: 'Marcus', description: 'Your ex. Dismissive-avoidant. Still knows how to get to you.', traits: ['avoidant', 'hot-cold', 'magnetic'], defaultEmotion: 'cold', gender: 'male', personalityType: 'dismissive-avoidant', silhouetteType: 'male-athletic' },
  { id: 'priya', name: 'Priya Sharma', description: 'Your anchor. Keeps you grounded.', traits: ['supportive', 'wise'], defaultEmotion: 'concerned', gender: 'female', personalityType: 'friend', silhouetteType: 'female-athletic' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
