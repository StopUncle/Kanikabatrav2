// The Wedding Weekend - Complete Scenario
// Modular structure: metadata + day1 + day2 + day3 + endings

import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
  sectionGoals,
} from './metadata';
import { day1Scenes, DAY1_CHECKPOINT } from './day1';
import { day2Scenes, DAY2_CHECKPOINT } from './day2';
import { day3Scenes } from './day3';
import { allEndings } from './endings';

// Combine all scenes in order
const allScenes = [
  ...day1Scenes,
  ...day2Scenes,
  ...day3Scenes,
  ...allEndings,
];

// Export the complete scenario
export const weddingWeekendScenario: Scenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  templates,
  sectionGoals,
};

// Export checkpoints for resume functionality
export const CHECKPOINTS = {
  DAY1_END: DAY1_CHECKPOINT,
  DAY2_END: DAY2_CHECKPOINT,
};

// Re-export metadata for easy access
export { metadata, characters, templates };

export default weddingWeekendScenario;
