// Phase 2: The Aftermath
// Text floods, flying monkeys, extraction, and safety

import type { Scene } from '../../../types';
import { textFloodScenes } from './text-flood';
import { flyingMonkeyScenes } from './flying-monkey';
import { extractionScenes } from './extraction';

export const phase2Scenes: Scene[] = [
  ...textFloodScenes,
  ...flyingMonkeyScenes,
  ...extractionScenes,
];

// Checkpoint after safety planning (end of Phase 2)
export const PHASE2_CHECKPOINT = 'scene-17-locks-changed';
