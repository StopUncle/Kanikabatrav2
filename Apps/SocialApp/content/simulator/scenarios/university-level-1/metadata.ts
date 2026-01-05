import type {
  Character,
  SubscriptionTier,
  Difficulty,
  ScenarioCategory,
  PathInfo,
  ScenarioReward,
} from '../../types';

export const SCENARIO_ID = 'university-level-1';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Caldwell Gala',
  tagline: 'Get your ticket. By any means necessary.',
  description:
    'First week of university. The Caldwell Gala is THE networking event of the year. Tickets are invitation-only. You need one.',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 15,
  difficulty: 'beginner' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 150,
  badgeId: 'gala-infiltrator',
  startSceneId: 'dorm-room-intro',
};

export const tacticsLearned = [
  'Reading psychopath charm signals',
  'Recognizing false promises',
  'Maintaining boundaries under pressure',
  'Rapport building with insecure types',
  'Knowing when to disengage',
];

export const redFlagsTaught = [
  'Love-bombing followed by withdrawal',
  'Promises without commitment',
  'Subtle humiliation with plausible deniability',
  'Using vulnerability as a weapon',
];

/**
 * Available paths in this scenario
 */
export const availablePaths: PathInfo[] = [
  {
    id: 'party',
    name: "Maris's Party",
    difficulty: 'hard',
    targetNpc: 'maris',
    description: 'Navigate the psychopath to earn her favor... and a ticket.',
  },
  {
    id: 'study-hall',
    name: 'Study Hall',
    difficulty: 'easy',
    targetNpc: 'casey',
    description: 'Build rapport with Casey to get access to spare tickets.',
  },
  {
    id: 'secret',
    name: 'The Notice Board',
    difficulty: 'medium',
    targetNpc: 'jordan',
    description: 'A hidden path. Requires prior knowledge.',
    isSecret: true,
  },
];

/**
 * Reward for completing this scenario
 */
export const reward: ScenarioReward = {
  id: 'gala-ticket',
  name: 'Caldwell Gala Ticket',
  description: 'Grants access to the exclusive networking event.',
  unlocksScenarioId: 'university-level-2-gala',
};

/**
 * Characters in this scenario
 */
export const characters: Character[] = [
  {
    id: 'maris',
    name: 'Maris Caldwell',
    description:
      'Heir to the Caldwell empire. Effortlessly charming. Devastatingly beautiful. She collects people like trophies—promises everything, delivers nothing, and watches them break with a smile.',
    traits: ['psychopath', 'wealthy', 'charming', 'ruthless', 'manipulative'],
    defaultEmotion: 'seductive',
    gender: 'female',
    personalityType: 'psychopath',
    silhouetteType: 'maris-caldwell',
  },
  {
    id: 'casey',
    name: 'Casey Chen',
    description:
      'Quiet, overlooked, but brilliant. Works the gala registration desk and has access to spare tickets. Desperately wants genuine connection.',
    traits: ['insecure', 'intelligent', 'kind', 'lonely'],
    defaultEmotion: 'neutral',
    gender: 'female',
    personalityType: 'anxious-attached',
    silhouetteType: 'female-soft',
  },
  {
    id: 'jordan',
    name: 'Jordan Park',
    description:
      'The Resident Advisor. Knows everyone and everything. Can be helpful or a hindrance depending on how you treat them.',
    traits: ['observant', 'fair', 'protective', 'connected'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'authority',
    silhouetteType: 'male-lean',
  },
  {
    id: 'alex',
    name: 'Alex Torres',
    description:
      'Your roommate. Eager, competitive, always trying to one-up everyone. Currently obsessed with getting into the gala.',
    traits: ['competitive', 'ambitious', 'insecure', 'loud'],
    defaultEmotion: 'happy',
    gender: 'male',
    personalityType: 'competitor',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'caleb',
    name: 'Caleb Morrison',
    description:
      'Maris\'s shadow. Soft-spoken, apologetic, constantly deferring. Does her homework, runs her errands, takes her abuse with a smile. Everyone finds him pathetic—but he seems content. A cautionary tale of what "supply" looks like.',
    traits: ['dependent', 'submissive', 'intelligent', 'broken'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'dependent',
    silhouetteType: 'male-lean',
  },
  {
    id: 'priya',
    name: 'Priya',
    description:
      'A girl who tried to crack Maris\'s circle and failed. Now watches from the edges, bitter but observant. Offers intel to those willing to listen.',
    traits: ['burned', 'observant', 'bitter', 'helpful'],
    defaultEmotion: 'neutral',
    gender: 'female',
    personalityType: 'friend',
    silhouetteType: 'female-athletic',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct. Short, punchy observations.',
    traits: ['intuitive', 'observant'],
    defaultEmotion: 'neutral',
  },
];
