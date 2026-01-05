import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-3-4';
export const metadata = { id: SCENARIO_ID, title: "Kai's Crisis", tagline: 'Your sponsor is spiraling. Choose carefully.', description: 'Kai sponsored you into this world. Now she\'s having a crisis. BPD intensity. How do you help without being consumed?', tier: 'premium' as SubscriptionTier, estimatedMinutes: 16, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 135, badgeId: 'crisis-navigator', startSceneId: 'kai-call' };
export const tacticsLearned = ['Managing BPD volatility', 'Boundaries with sponsors', 'Compassion without consumption'];
export const redFlagsTaught = ['Fear of abandonment triggers', 'Splitting behavior', 'Intensity as control'];
export const reward: ScenarioReward = { id: 'kai-stabilized', name: 'Relationship Maintained', description: 'Kai trusts you more now.', unlocksScenarioId: 'mission-3-5' };
export const characters: Character[] = [
  { id: 'kai', name: 'Kai Chen', description: 'Your sponsor. Currently unstable. Needs help—but too much help traps you.', traits: ['volatile', 'intense', 'afraid'], defaultEmotion: 'sad', gender: 'female', personalityType: 'borderline', silhouetteType: 'female-elegant' },
  { id: 'maris', name: 'Maris Caldwell', description: 'Watches from the shadows. Did she cause this crisis?', traits: ['calculating', 'dangerous'], defaultEmotion: 'knowing', gender: 'female', personalityType: 'psychopath', silhouetteType: 'female-elegant' },
  { id: 'blake', name: 'Blake Torres', description: 'Witnesses the situation. Could help or complicate.', traits: ['observant'], defaultEmotion: 'concerned', gender: 'male', personalityType: 'neutral', silhouetteType: 'male-lean' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
