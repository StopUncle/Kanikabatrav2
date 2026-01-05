// The First Date from Hell - Complete Scenario
// Modular structure: metadata + part1 + part2 + part3 + endings

import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { part1Scenes } from './part1';
import { part2Scenes } from './part2';
import { part3Scenes } from './part3';
import { allEndings } from './endings';

// Combine all scenes in order
const allScenes = [
  ...part1Scenes,
  ...part2Scenes,
  ...part3Scenes,
  ...allEndings,
];

// Export the complete scenario
export const firstDateFromHellScenario: Scenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  templates,
};

// Re-export metadata for easy access
export { metadata, characters, templates };

export default firstDateFromHellScenario;
