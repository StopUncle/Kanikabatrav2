// The Clean Break - Complete Scenario
// Modular structure: metadata + phase1 + phase2 + phase3 + endings

import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { phase1Scenes, PHASE1_CHECKPOINT } from './phase1';
import { phase2Scenes, PHASE2_CHECKPOINT } from './phase2';
import { phase3Scenes } from './phase3';
import { allEndings } from './endings';

// Combine all scenes in order
const allScenes = [
  ...phase1Scenes,
  ...phase2Scenes,
  ...phase3Scenes,
  ...allEndings,
];

// Export the complete scenario
export const cleanBreakScenario: Scenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  templates,
};

// Export checkpoints for resume functionality
export const CHECKPOINTS = {
  PHASE1_END: PHASE1_CHECKPOINT,
  PHASE2_END: PHASE2_CHECKPOINT,
};

// Re-export metadata for easy access
export { metadata, characters, templates };

export default cleanBreakScenario;
