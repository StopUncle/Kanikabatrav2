import type { Character, SubscriptionTier, Difficulty, ScenarioCategory, ScenarioReward } from '../../types';
export const SCENARIO_ID = 'mission-2-5';
export const metadata = { id: SCENARIO_ID, title: 'Club Politics', tagline: 'The club has rules. Learn them or lose.', description: 'The exclusive club. Tyler controls access. But there\'s someone else watching—Kai Chen. By night\'s end, you\'ll make an ally or enemy.', tier: 'premium' as SubscriptionTier, estimatedMinutes: 17, difficulty: 'advanced' as Difficulty, category: 'social-dynamics' as ScenarioCategory, xpReward: 125, badgeId: 'club-navigator', startSceneId: 'club-entrance' };
export const tacticsLearned = ['Club hierarchy navigation', 'Reading powerful observers', 'Making strategic impressions'];
export const redFlagsTaught = ['Gatekeepers with agendas', 'Observers who test', 'Invisible social lines'];
export const reward: ScenarioReward = { id: 'elite-access', name: 'Elite Access', description: 'Kai noticed. The door to Level 3 opens.', unlocksScenarioId: 'university-level-3' };
export const characters: Character[] = [
  { id: 'tyler', name: 'Tyler Vance', description: 'Controls who gets where. Needs to feel important.', traits: ['gatekeeper', 'dramatic'], defaultEmotion: 'happy', gender: 'male', personalityType: 'histrionic', silhouetteType: 'male-athletic' },
  { id: 'kai', name: 'Kai Chen', description: 'Watching from VIP. Intense. Interested. What does she want?', traits: ['powerful', 'observant', 'volatile'], defaultEmotion: 'neutral', gender: 'female', personalityType: 'borderline', silhouetteType: 'female-elegant' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];
