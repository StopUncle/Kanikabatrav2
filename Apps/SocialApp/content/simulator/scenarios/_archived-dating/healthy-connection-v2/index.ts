import type { Scenario } from '../../types';
import {
  SCENARIO_ID,
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { openingScenes } from './opening';
import { earlyScenes } from './path-a';
import { conflictScenes } from './path-b';
import { familyScenes } from './path-c';
import { allEndings } from './endings';

const allScenes = [
  ...openingScenes,
  ...earlyScenes,
  ...conflictScenes,
  ...familyScenes,
  ...allEndings,
];

export const healthyConnectionScenario: Scenario = {
  ...metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
  scenes: allScenes,
};

export default healthyConnectionScenario;
