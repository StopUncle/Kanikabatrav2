// Phase 1: The Decision
// The breakup conversation and leaving

import type { Scene } from '../../../types';
import { conversationScenes } from './conversation';
import { leavingScenes } from './leaving';

export const phase1Scenes: Scene[] = [
  ...conversationScenes,
  ...leavingScenes,
];

// Checkpoint after leaving (end of Phase 1)
export const PHASE1_CHECKPOINT = 'scene-7-out';
