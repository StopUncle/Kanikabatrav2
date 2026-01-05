import type {
  Character,
  SubscriptionTier,
  Difficulty,
  ScenarioCategory,
  ScenarioReward,
} from '../../types';

export const SCENARIO_ID = 'mission-1-1';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Morning After',
  tagline: 'The gala is over. The game has just begun.',
  description:
    'You wake up the day after the Caldwell Gala. Your phone is buzzing with messages from people you met—and people you didn\'t know were watching. How you handle this attention will define your next move.',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 10,
  difficulty: 'beginner' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 75,
  badgeId: 'morning-survivor',
  startSceneId: 'wake-up',
};

export const tacticsLearned = [
  'Managing post-event social capital',
  'Information as currency',
  'Strategic silence vs. engagement',
];

export const redFlagsTaught = [
  'People fishing for information',
  'False friendliness with ulterior motives',
];

export const reward: ScenarioReward = {
  id: 'campus-credibility',
  name: 'Campus Credibility',
  description: 'You handled the aftermath without self-sabotage.',
  unlocksScenarioId: 'mission-1-2',
};

export const characters: Character[] = [
  {
    id: 'alex',
    name: 'Alex Torres',
    description: 'Your roommate. Didn\'t get into the gala. Seething with jealousy disguised as curiosity.',
    traits: ['competitive', 'jealous', 'probing'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'competitor',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    description: 'Met her briefly at the gala. She\'s texting you now. What does she want?',
    traits: ['observant', 'strategic', 'friendly'],
    defaultEmotion: 'neutral',
    gender: 'female',
    personalityType: 'friend',
    silhouetteType: 'female-athletic',
  },
  {
    id: 'stranger',
    name: 'Unknown Number',
    description: 'Someone from the gala. You don\'t recognize the number.',
    traits: ['mysterious', 'probing'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'neutral',
    silhouetteType: 'male-lean',
  },
  {
    id: 'dana',
    name: 'Dana Morrison',
    description: 'Caleb\'s sister. She approaches you at the coffee shop. Too friendly, too fast.',
    traits: ['calculating', 'charming', 'dangerous'],
    defaultEmotion: 'happy',
    gender: 'female',
    personalityType: 'narcissist',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct.',
    traits: ['intuitive'],
    defaultEmotion: 'neutral',
  },
];
