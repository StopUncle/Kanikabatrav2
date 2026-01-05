import type {
  Character,
  SubscriptionTier,
  Difficulty,
  ScenarioCategory,
  PathInfo,
  ScenarioReward,
} from '../../types';

export const SCENARIO_ID = 'university-level-2';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Hunting Grounds',
  tagline: 'Navigate the social scene. Everyone wants something.',
  description:
    'Post-university life. Clubs, dating apps, frenemies, exes. The rules are different here. The stakes are higher. And Maris is watching.',
  tier: 'premium' as SubscriptionTier,
  estimatedMinutes: 25,
  difficulty: 'intermediate' as Difficulty,
  category: 'social-dynamics' as ScenarioCategory,
  xpReward: 300,
  badgeId: 'social-navigator',
  startSceneId: 'morning-after-intro',
};

export const tacticsLearned = [
  'Reading histrionic validation-seeking',
  'Detecting covert sabotage from "helpful" friends',
  'Handling dismissive avoidant push-pull',
  'Navigating triangulation attempts',
  'Building genuine social proof',
];

export const redFlagsTaught = [
  'Excessive flattery with hidden agenda',
  '"Helpful" advice that undermines you',
  'Hot-cold communication patterns',
  'Using exes as weapons',
  'Creating competition where none exists',
];

/**
 * Available paths in this scenario
 * Level 2 is sequential missions, not a single fork
 */
export const availablePaths: PathInfo[] = [
  {
    id: 'club',
    name: 'The Club',
    difficulty: 'medium',
    targetNpc: 'tyler',
    description: 'Navigate nightlife dynamics with a validation-hungry promoter.',
  },
  {
    id: 'app',
    name: 'Dating Apps',
    difficulty: 'medium',
    targetNpc: 'matches',
    description: 'Digital dating dynamics. Someone isn\'t who they claim.',
  },
  {
    id: 'setup',
    name: 'The Setup',
    difficulty: 'hard',
    targetNpc: 'dana',
    description: 'A "friend" wants to help. Her motives are not what they seem.',
  },
  {
    id: 'ex',
    name: 'The Ex Returns',
    difficulty: 'hard',
    targetNpc: 'marcus',
    description: 'Someone\'s ex shows up. Triangulation begins.',
  },
  {
    id: 'climax',
    name: 'Social Proof',
    difficulty: 'hard',
    targetNpc: 'maris',
    description: 'The big event. Everyone\'s there. Including her.',
  },
  {
    id: 'secret',
    name: 'The Inner Circle',
    difficulty: 'hard',
    targetNpc: 'network',
    description: 'The afterparty nobody talks about.',
    isSecret: true,
  },
];

/**
 * Reward for completing this scenario
 */
export const reward: ScenarioReward = {
  id: 'inner-circle-access',
  name: 'Inner Circle Access',
  description: 'Grants entry to exclusive networking events.',
  unlocksScenarioId: 'university-level-3',
};

/**
 * Characters in this scenario
 */
export const characters: Character[] = [
  // PRIMARY CHARACTERS (New for Level 2)
  {
    id: 'tyler',
    name: 'Tyler Vance',
    description:
      'Club promoter. Lives for attention. Dramatic entrances, dramatic exits, and dramatic meltdowns when ignored. Useful connections if you play his game. Dangerous enemy if you don\'t.',
    traits: ['dramatic', 'attention-seeking', 'connected', 'volatile', 'charming'],
    defaultEmotion: 'happy',
    gender: 'male',
    personalityType: 'histrionic',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'dana',
    name: 'Dana Morrison',
    description:
      'The sweetest person you\'ll ever meet. Always offering help. Always there for you. Quietly sabotaging every opportunity you have. Jealous, competitive, and armed with plausible deniability.',
    traits: ['sweet', 'helpful', 'jealous', 'manipulative', 'covert'],
    defaultEmotion: 'happy',
    gender: 'female',
    personalityType: 'covert-narcissist',
    silhouetteType: 'female-soft',
  },
  {
    id: 'marcus',
    name: 'Marcus Webb',
    description:
      'The ex everyone still wants. Pushes away then pulls back. Creates chaos just by existing. Enjoys the attention, commits to nothing. A masterclass in dismissive avoidant behavior.',
    traits: ['attractive', 'distant', 'non-committal', 'charming', 'unavailable'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'dismissive-avoidant',
    silhouetteType: 'male-lean',
  },
  {
    id: 'kai',
    name: 'Kai Chen',
    description:
      'Intense. Passionate. Either your closest ally or your worst enemy, depending on the hour. Swings between adoration and suspicion. Handle with care.',
    traits: ['intense', 'passionate', 'unpredictable', 'loyal', 'volatile'],
    defaultEmotion: 'curious',
    gender: 'female',
    personalityType: 'borderline',
    silhouetteType: 'female-athletic',
  },

  // RETURNING CHARACTERS (From Level 1)
  {
    id: 'maris',
    name: 'Maris Caldwell',
    description:
      'She remembers you from the Gala. Watches from across the room. Smiles like you\'re old friends. Says nothing. Just... observes.',
    traits: ['psychopath', 'wealthy', 'charming', 'ruthless', 'observant'],
    defaultEmotion: 'smirking',
    gender: 'female',
    personalityType: 'psychopath',
    silhouetteType: 'maris-caldwell',
  },
  {
    id: 'casey',
    name: 'Casey Chen',
    description:
      'If you built rapport in Level 1, she\'s a genuine ally now. If not, she\'s moved on. Either way, she\'s grown more confident.',
    traits: ['intelligent', 'kind', 'growing', 'loyal'],
    defaultEmotion: 'neutral',
    gender: 'female',
    personalityType: 'secure',
    silhouetteType: 'female-soft',
  },
  {
    id: 'alex',
    name: 'Alex Torres',
    description:
      'Your former roommate. Still competitive, still ambitious. Depending on Level 1 choices, either a useful contact or a bitter rival.',
    traits: ['competitive', 'ambitious', 'connected', 'grudge-holding'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'competitor',
    silhouetteType: 'male-athletic',
  },

  // SUPPORT CHARACTERS
  {
    id: 'blake',
    name: 'Blake Rivera',
    description:
      'Your wingman. Loyal, supportive, but also competitive in subtle ways. Genuinely wants you to succeed... as long as you don\'t succeed more than him.',
    traits: ['loyal', 'supportive', 'competitive', 'honest'],
    defaultEmotion: 'happy',
    gender: 'male',
    personalityType: 'friend',
    silhouetteType: 'male-lean',
  },
  {
    id: 'bouncer',
    name: 'The Bouncer',
    description:
      'Gatekeepers the VIP section. Respects confidence, dismisses desperation.',
    traits: ['observant', 'stern', 'fair'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'authority',
    silhouetteType: 'male-imposing',
  },
  {
    id: 'match-1',
    name: 'Jordan',
    description:
      'Dating app match. Seems too good to be true. Because they are.',
    traits: ['charming', 'mysterious', 'evasive'],
    defaultEmotion: 'seductive',
    gender: 'male',
    personalityType: 'neutral',
    silhouetteType: 'male-lean',
  },
  {
    id: 'match-2',
    name: 'Sam',
    description:
      'Dating app match. Genuine, awkward, trying too hard. Not dangerous, just nervous.',
    traits: ['genuine', 'awkward', 'eager'],
    defaultEmotion: 'happy',
    gender: 'female',
    personalityType: 'anxious-attached',
    silhouetteType: 'female-soft',
  },
  {
    id: 'match-3',
    name: 'Riley',
    description:
      'Dating app match. Direct, confident, no games. Refreshingly honest.',
    traits: ['direct', 'confident', 'honest'],
    defaultEmotion: 'neutral',
    gender: 'female',
    personalityType: 'secure',
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
