import type {
  Character,
  SubscriptionTier,
  Difficulty,
  ScenarioCategory,
  PathInfo,
  ScenarioReward,
} from '../../types';

export const SCENARIO_ID = 'university-level-3';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The Gala',
  tagline: 'Everyone wants something. Everyone is watching.',
  description:
    'The charity gala where all networks collide. Maris is no longer watching. She\'s testing. Your choices from Level 1 and 2 come back to haunt or help you.',
  tier: 'vip' as SubscriptionTier,
  estimatedMinutes: 35,
  difficulty: 'advanced' as Difficulty,
  category: 'professional' as ScenarioCategory,
  xpReward: 450,
  badgeId: 'gala-survivor',
  startSceneId: 'gala-invitation-arrives',
};

export const tacticsLearned = [
  'High-stakes social navigation',
  'Reading predatory psychology in real-time',
  'Information as leverage',
  'Managing past relationships under pressure',
  'The cost of power vs. integrity',
  'Network positioning and alliance building',
];

export const redFlagsTaught = [
  'Tests disguised as conversation',
  'Information brokers with hidden agendas',
  'Old money vs. new power dynamics',
  'When "help" is actually recruitment',
  'Betrayal signs from former allies',
];

/**
 * Available paths in this scenario
 * Level 3 is mission-based with convergence
 */
export const availablePaths: PathInfo[] = [
  {
    id: 'entrance',
    name: 'The Entrance',
    difficulty: 'medium',
    targetNpc: 'victoria',
    description: 'First impressions at high-stakes events. Establish presence.',
  },
  {
    id: 'encounter',
    name: 'First Encounter',
    difficulty: 'hard',
    targetNpc: 'maris',
    description: 'She\'s not watching anymore. She\'s testing.',
  },
  {
    id: 'power',
    name: 'The Power Play',
    difficulty: 'hard',
    targetNpc: 'elena',
    description: 'Information as currency. Alliances as weapons.',
  },
  {
    id: 'ghost',
    name: 'The Ghost Returns',
    difficulty: 'hard',
    targetNpc: 'past',
    description: 'Someone from your past has unfinished business.',
  },
  {
    id: 'climax',
    name: 'The Final Choice',
    difficulty: 'hard',
    targetNpc: 'harrison',
    description: 'Every relationship tested. Inside or outside the circle?',
  },
  {
    id: 'secret',
    name: 'The Architect\'s Gambit',
    difficulty: 'hard',
    targetNpc: 'network',
    description: 'The real game revealed.',
    isSecret: true,
  },
];

/**
 * Reward for completing this scenario
 */
export const reward: ScenarioReward = {
  id: 'architects-circle',
  name: 'The Architect\'s Circle',
  description: 'Access to the global network. An invitation to The Island.',
  unlocksScenarioId: 'university-level-4',
};

/**
 * Characters in this scenario
 */
export const characters: Character[] = [
  // PRIMARY CHARACTERS (New for Level 3)
  {
    id: 'victoria',
    name: 'Victoria Ashworth',
    description:
      'Old money. Maris\'s rival. Sees everyone as pawns in her game. The kind of wealth that doesn\'t need to prove itself—and resents those who try.',
    traits: ['grandiose', 'territorial', 'condescending', 'powerful', 'traditional'],
    defaultEmotion: 'cold',
    gender: 'female',
    personalityType: 'narcissist',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'harrison',
    name: 'Harrison Cole',
    description:
      'The Architect. Runs the network Maris reports to. Watches everything, controls from shadows. When he speaks, everyone listens. When he moves, fortunes shift.',
    traits: ['machiavellian', 'patient', 'calculating', 'powerful', 'mysterious'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'psychopath',
    silhouetteType: 'male-imposing',
  },
  {
    id: 'elena',
    name: 'Elena Vance',
    description:
      'Information broker. Everyone\'s secret-keeper—for a price. She knows where the bodies are buried because she helped dig some of the graves.',
    traits: ['seductive', 'dangerous', 'connected', 'transactional', 'sharp'],
    defaultEmotion: 'seductive',
    gender: 'female',
    personalityType: 'antisocial',
    silhouetteType: 'female-athletic',
  },
  {
    id: 'charles',
    name: 'Charles Whitmore',
    description:
      'Gala host. Victoria\'s husband. Wealthy, well-meaning, completely oblivious to the games being played under his roof. The perfect cover.',
    traits: ['oblivious', 'generous', 'traditional', 'naive', 'wealthy'],
    defaultEmotion: 'happy',
    gender: 'male',
    personalityType: 'healthy',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'millicent',
    name: 'Millicent Caldwell',
    description:
      'Maris\'s twin sister. The "good" one. Warm, genuine, concerned about her sister. A glimpse into who Maris could have been—if the darkness hadn\'t won.',
    traits: ['warm', 'genuine', 'concerned', 'intelligent', 'kind'],
    defaultEmotion: 'concerned',
    gender: 'female',
    personalityType: 'secure',
    silhouetteType: 'female-soft',
  },

  // RETURNING CHARACTERS (Evolved from L1-L2)
  {
    id: 'maris',
    name: 'Maris Caldwell',
    description:
      'No longer watching. Testing. Evaluating. She\'ll decide if you\'re worthy of the next tier—or if you\'re just another disappointment to dismiss.',
    traits: ['psychopath', 'brilliant', 'predatory', 'refined', 'dangerous'],
    defaultEmotion: 'smirking',
    gender: 'female',
    personalityType: 'psychopath',
    silhouetteType: 'maris-caldwell',
  },
  {
    id: 'kai',
    name: 'Kai Chen',
    description:
      'Your sponsor into the circle. She vouched for you. If you fail, she fails. Her loyalty will be tested—and so will yours.',
    traits: ['intense', 'passionate', 'loyal', 'volatile', 'invested'],
    defaultEmotion: 'serious',
    gender: 'female',
    personalityType: 'borderline',
    silhouetteType: 'female-athletic',
  },
  {
    id: 'tyler',
    name: 'Tyler Vance',
    description:
      'Elena\'s brother. Still needs validation. Still dramatic. But here, his gossip is actually valuable. If you can stomach the performance.',
    traits: ['dramatic', 'attention-seeking', 'connected', 'useful', 'volatile'],
    defaultEmotion: 'happy',
    gender: 'male',
    personalityType: 'histrionic',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'dana',
    name: 'Dana Morrison',
    description:
      'She\'s here. And she remembers everything. The sweetness is gone. What\'s left is sharp, cold, and patient. She\'s been waiting for this.',
    traits: ['vengeful', 'patient', 'calculating', 'wounded', 'dangerous'],
    defaultEmotion: 'neutral',
    gender: 'female',
    personalityType: 'covert-narcissist',
    silhouetteType: 'female-soft',
  },
  {
    id: 'marcus',
    name: 'Marcus Webb',
    description:
      'Wild card. On someone\'s arm tonight—but whose? The dismissive avoidant who pushes everyone away... until they might be useful.',
    traits: ['attractive', 'non-committal', 'unpredictable', 'charming', 'distant'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'dismissive-avoidant',
    silhouetteType: 'male-lean',
  },
  {
    id: 'casey',
    name: 'Casey Chen',
    description:
      'Kai\'s cousin. She\'s grown. But is she here as a friend... or was she placed to watch you? The genuine ones are hardest to read.',
    traits: ['intelligent', 'kind', 'observant', 'conflicted', 'growing'],
    defaultEmotion: 'neutral',
    gender: 'female',
    personalityType: 'secure',
    silhouetteType: 'female-soft',
  },
  {
    id: 'blake',
    name: 'Blake Rivera',
    description:
      'Your plus-one. Loyal, supportive, but completely out of his depth here. He\'s trying to help, but he might just make things worse.',
    traits: ['loyal', 'supportive', 'overwhelmed', 'genuine', 'competitive'],
    defaultEmotion: 'concerned',
    gender: 'male',
    personalityType: 'friend',
    silhouetteType: 'male-lean',
  },

  // SUPPORT CHARACTERS
  {
    id: 'security',
    name: 'Security',
    description:
      'The gatekeepers. They\'ve seen everyone try to talk their way in. They respect confidence, smell desperation.',
    traits: ['observant', 'stern', 'professional'],
    defaultEmotion: 'neutral',
    gender: 'male',
    personalityType: 'authority',
    silhouetteType: 'male-imposing',
  },
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct. Short, punchy observations.',
    traits: ['intuitive', 'observant'],
    defaultEmotion: 'neutral',
  },
];
