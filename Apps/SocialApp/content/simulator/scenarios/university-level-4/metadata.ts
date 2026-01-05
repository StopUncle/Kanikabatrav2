/**
 * University Level 4: The Invitation
 *
 * Private island escalation. The network reveals itself.
 * Blake's loyalty is tested. The real game begins.
 */
import type {
  Character,
  SubscriptionTier,
  Difficulty,
  ScenarioCategory,
  PathInfo,
} from '../../types';

export const metadata = {
  id: 'university-level-4',
  title: 'The Invitation',
  tagline: 'The island reveals who you really are.',
  description:
    'Harrison Cole\'s private island. The network\'s inner circle gathers. You\'ve proven you can navigate elite circles. Now prove you understand power at scale. Everyone here has secrets. Everyone here has leverage. And Blake is about to learn what happens when loyalty meets ambition.',
  tier: 'vip' as SubscriptionTier,
  estimatedMinutes: 40,
  difficulty: 'advanced' as Difficulty,
  category: 'professional' as ScenarioCategory,
  xpReward: 500,
  badgeId: 'island-survivor',
  startSceneId: 'aftermath-intro',
};

/**
 * Characters - Returning evolved + New power players
 */
export const characters: Character[] = [
  // === RETURNING CHARACTERS (Evolved) ===
  {
    id: 'harrison',
    name: 'Harrison Cole',
    description: 'The Architect. Runs the network above Maris. Evaluates you directly.',
    traits: ['calculating', 'omniscient', 'patient'],
    defaultEmotion: 'neutral',
    personalityType: 'psychopath',
    silhouetteType: 'male-imposing',
  },
  {
    id: 'maris',
    name: 'Maris Caldwell',
    description: 'Different here. Softer? More dangerous? Hard to tell.',
    traits: ['unpredictable', 'watchful', 'evolved'],
    defaultEmotion: 'neutral',
    personalityType: 'psychopath',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'elena',
    name: 'Elena Vance',
    description: 'Information broker with higher stakes. Everything has a price.',
    traits: ['knowing', 'transactional', 'dangerous'],
    defaultEmotion: 'smirking',
    personalityType: 'antisocial',
    silhouetteType: 'female-athletic',
  },
  {
    id: 'kai',
    name: 'Kai Chen',
    description: 'Your sponsor. If you fail here, she fails too. The stakes are personal.',
    traits: ['volatile', 'invested', 'anxious'],
    defaultEmotion: 'concerned',
    personalityType: 'borderline',
    silhouetteType: 'female-athletic',
  },
  {
    id: 'victoria',
    name: 'Victoria Ashworth',
    description: 'Old money. Maris\'s rival. May ally or oppose depending on L3 choices.',
    traits: ['territorial', 'calculating', 'aristocratic'],
    defaultEmotion: 'cold',
    personalityType: 'narcissist',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'millicent',
    name: 'Millicent Caldwell',
    description: 'Maris\'s twin. The "good" one. Reveals truths about the family.',
    traits: ['genuine', 'conflicted', 'observant'],
    defaultEmotion: 'neutral',
    personalityType: 'secure',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'blake',
    name: 'Blake Rivera',
    description: 'Your loyal friend. Out of his depth. About to face impossible pressure.',
    traits: ['loyal', 'overwhelmed', 'conflicted'],
    defaultEmotion: 'concerned',
    personalityType: 'secure',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'casey',
    name: 'Casey Chen',
    description: 'Kai\'s cousin. Your past with her matters. Now an insider.',
    traits: ['observant', 'quiet', 'evolved'],
    defaultEmotion: 'neutral',
    personalityType: 'anxious-attached',
    silhouetteType: 'female-soft',
  },
  {
    id: 'tyler',
    name: 'Tyler Vance',
    description: 'Elena\'s brother. Still dramatic. His gossip is valuable.',
    traits: ['attention-seeking', 'connected', 'useful'],
    defaultEmotion: 'happy',
    personalityType: 'histrionic',
    silhouetteType: 'male-lean',
  },
  {
    id: 'marcus',
    name: 'Marcus Webb',
    description: 'Wild card. The ex everyone still wants. Reappears with agenda.',
    traits: ['charming', 'non-committal', 'mysterious'],
    defaultEmotion: 'smirking',
    personalityType: 'dismissive-avoidant',
    silhouetteType: 'male-athletic',
  },
  {
    id: 'dana',
    name: 'Dana Morrison',
    description: 'The saboteur evolved. Full antagonist or managed threat.',
    traits: ['sweet-faced', 'vindictive', 'patient'],
    defaultEmotion: 'happy',
    personalityType: 'covert-narcissist',
    silhouetteType: 'female-soft',
  },

  // === NEW CHARACTERS ===
  {
    id: 'victor',
    name: 'Victor Ashworth',
    description: 'Victoria\'s father. Old money patriarch. The real power behind the family.',
    traits: ['patrician', 'dismissive', 'calculating'],
    defaultEmotion: 'cold',
    personalityType: 'narcissist',
    silhouetteType: 'male-imposing',
  },
  {
    id: 'dominic',
    name: 'Dominic Reyes',
    description: 'Tech billionaire. New money. Sees people as data points.',
    traits: ['analytical', 'cold', 'efficient'],
    defaultEmotion: 'neutral',
    personalityType: 'antisocial',
    silhouetteType: 'male-lean',
  },
  {
    id: 'isabelle',
    name: 'Isabelle Laurent',
    description: 'French financier. International player. Elegant and lethal.',
    traits: ['sophisticated', 'strategic', 'patient'],
    defaultEmotion: 'smirking',
    personalityType: 'psychopath',
    silhouetteType: 'female-elegant',
  },
  {
    id: 'james',
    name: 'James Whitmore',
    description: 'Foundation host. Appears neutral. Knows everyone\'s secrets.',
    traits: ['diplomatic', 'observant', 'connected'],
    defaultEmotion: 'neutral',
    personalityType: 'authority',
    silhouetteType: 'male-athletic',
  },

  // === INNER VOICE ===
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your gut instinct. Sharper now. Darker.',
    traits: ['analytical', 'wary', 'evolved'],
    defaultEmotion: 'knowing',
    personalityType: 'neutral',
    silhouetteType: 'default',
  },
];

/**
 * Tactics taught in this level
 */
export const tacticsLearned = [
  'Network thinking over individual manipulation',
  'Reading power hierarchies',
  'Managing information as currency',
  'Betrayal recognition and recovery',
  'Commitment vs. performance',
  'Leverage identification',
];

/**
 * Red flags to recognize
 */
export const redFlagsTaught = [
  'Isolation on private territory',
  'Tests disguised as hospitality',
  'Information extraction through intimacy',
  'Loyalty pressure tactics',
  'Commitment escalation',
  'The "no exit" framework',
];

/**
 * Available paths through the scenario
 */
export const availablePaths: PathInfo[] = [
  {
    id: 'setup',
    name: 'The Setup',
    difficulty: 'easy',
    targetNpc: 'blake',
    description: 'Post-gala fallout and island invitation',
  },
  {
    id: 'arrival',
    name: 'The Arrival',
    difficulty: 'medium',
    targetNpc: 'dominic',
    description: 'Private jet and island landing',
  },
  {
    id: 'day-one',
    name: 'Day One',
    difficulty: 'medium',
    targetNpc: 'harrison',
    description: 'Dinner and after-party dynamics',
  },
  {
    id: 'network',
    name: 'The Tests',
    difficulty: 'hard',
    targetNpc: 'harrison',
    description: 'Harrison and Maris evaluate you',
  },
  {
    id: 'ghost',
    name: 'Ghosts',
    difficulty: 'medium',
    targetNpc: 'kai',
    description: 'Past relationships resurface',
  },
  {
    id: 'crisis',
    name: 'The Crisis',
    difficulty: 'hard',
    targetNpc: 'blake',
    description: 'Blake faces impossible pressure',
  },
  {
    id: 'climax',
    name: 'The Verdict',
    difficulty: 'hard',
    targetNpc: 'harrison',
    description: 'Harrison delivers final judgment',
  },
];
