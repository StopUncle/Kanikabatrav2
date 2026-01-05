import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { openingScenes } from './opening';
import { buildScenes } from './path-a';
import { seriousScenes } from './path-b';
import { caughtScenes } from './path-c';
import { endings } from './endings';

const allScenes = [
  ...openingScenes,
  ...buildScenes,
  ...seriousScenes,
  ...caughtScenes,
  ...endings,
];

export const rotationMasterScenario: Scenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  templates,
};

export default rotationMasterScenario;
