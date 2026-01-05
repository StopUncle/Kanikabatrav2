import type {
  Character,
  SubscriptionTier,
  Difficulty,
  ScenarioCategory,
  TemplatePool,
} from '../../types';

export const SCENARIO_ID = 'the-first-90-days';

export const metadata = {
  id: SCENARIO_ID,
  title: 'The First 90 Days',
  tagline: 'Your new job starts now. So does the game.',
  description:
    'Day one. New badge. Thirty faces you don\'t know, all deciding if you\'re a threat, an ally, or irrelevant. The next 90 days will determine whether you rise, stall, or become invisible. Map the politics. Find your wins. Build your network. The clock is ticking.',
  tier: 'free' as SubscriptionTier,
  estimatedMinutes: 20,
  difficulty: 'beginner' as Difficulty,
  category: 'professional' as ScenarioCategory,
  xpReward: 250,
  badgeId: 'first-90-days',
  startSceneId: 'day-one-1',
};

export const tacticsLearned = [
  'Political landscape mapping',
  'First impression calibration',
  'Admin relationship building',
  'Early win identification',
  'Predecessor narrative control',
  'Threat neutralization',
];

export const redFlagsTaught = [
  'Smiling competitors who wanted your job',
  'The "water under the bridge" lie',
  'Staying too quiet = becoming invisible',
  'Over-eagerness reads as desperation',
  'Criticizing too early = arrogance',
];

// Templates for dialog text replacement
export const templates: TemplatePool = {
  manager_name: ['Harper'],
  ally_name: ['Devon'],
  threat_name: ['Cameron'],
  admin_name: ['Morgan'],
  director_name: ['Victor'],
};

export const characters: Character[] = [
  {
    id: 'inner-voice',
    name: 'Inner Voice',
    description: 'Your strategic instincts',
    traits: ['observant', 'calculating'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'harper',
    name: 'Harper',
    description: 'Your direct manager - hired you, reputation tied to your success',
    traits: ['professional', 'supportive', 'evaluating'],
    defaultEmotion: 'happy',
  },
  {
    id: 'devon',
    name: 'Devon',
    description: 'Peer and potential ally - genuinely helpful, good intel source',
    traits: ['friendly', 'knowledgeable', 'secure'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'cameron',
    name: 'Cameron',
    description: 'Peer and potential threat - wanted your job, didn\'t get it',
    traits: ['charming', 'watchful', 'calculating'],
    defaultEmotion: 'happy',
  },
  {
    id: 'morgan',
    name: 'Morgan',
    description: 'Executive assistant - knows everything, controls access',
    traits: ['observant', 'discreet', 'connected'],
    defaultEmotion: 'neutral',
  },
  {
    id: 'victor',
    name: 'Victor',
    description: 'Senior Director - real power, forms opinions quickly',
    traits: ['powerful', 'direct', 'evaluating'],
    defaultEmotion: 'neutral',
  },
];
