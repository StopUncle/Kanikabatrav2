// Level 4: Escalation - Bridge to the Elite
import type { Character } from '../../../types';
import type { LevelId } from '../types';

export const LEVEL_ID: LevelId = 'escalation';

export const levelMetadata = {
  id: LEVEL_ID,
  name: 'Escalation',
  description: 'You\'ve proven yourself at the gala. Now the stakes are global. Private jets, exclusive invitations, billionaire circles. The bridge to ultimate power.',
  unlockCondition: 'Complete 4/5 Gala missions',
  tier: 'vip' as const,
};

export const characters: Character[] = [
  { id: 'player', name: 'You', description: 'Rising among the elite.', traits: ['powerful', 'calculated'], defaultEmotion: 'neutral' },
  { id: 'patron', name: 'The Patron', description: 'Your sponsor into the upper echelon.', traits: ['wealthy', 'demanding'], defaultEmotion: 'neutral' },
  { id: 'competitor', name: 'The Competitor', description: 'Another rising star. Threat.', traits: ['ambitious', 'ruthless'], defaultEmotion: 'cold' },
  { id: 'insider', name: 'The Insider', description: 'Knows the real rules. Potential ally.', traits: ['connected', 'strategic'], defaultEmotion: 'smirking' },
  { id: 'target-elite', name: 'The Elite Target', description: 'Billionaire tier. Ultimate prize.', traits: ['powerful', 'selective'], defaultEmotion: 'cold' },
  { id: 'inner-voice', name: 'Inner Voice', description: 'Your gut instinct.', traits: ['intuitive'], defaultEmotion: 'neutral' },
];

export const missionUnlocks = {
  'mission-16': null,
  'mission-17': 'mission-16',
  'mission-18': 'mission-17',
  'mission-19': 'mission-18',
  'secret': ['mission-19-optimal-19b', 'mission-19-optimal-19c'],
};

export const levelCompletion = {
  requiredMissions: 4,
  totalMissions: 4,
  nextLevel: 'private-island' as LevelId,
};
