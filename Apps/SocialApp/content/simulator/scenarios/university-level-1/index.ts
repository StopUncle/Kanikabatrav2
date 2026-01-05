import type { ForkScenario, ForkScene } from '../../types';
import {
  metadata,
  characters,
  tacticsLearned,
  redFlagsTaught,
  availablePaths,
  reward,
} from './metadata';
import { act1Scenes } from './act1-setup';
import { partyPathScenes } from './party-path';
import { studyPathScenes } from './study-path';
import { secretPathScenes } from './secret-path';
import { allEndings } from './endings';

// Combine all scenes
const allScenes: ForkScene[] = [
  ...act1Scenes,
  ...partyPathScenes,
  ...studyPathScenes,
  ...secretPathScenes,
  ...allEndings,
];

export const universityLevel1: ForkScenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  availablePaths,
  reward,
};

// Named exports for individual scene groups
export {
  act1Scenes,
  partyPathScenes,
  studyPathScenes,
  secretPathScenes,
  allEndings,
};

export default universityLevel1;
