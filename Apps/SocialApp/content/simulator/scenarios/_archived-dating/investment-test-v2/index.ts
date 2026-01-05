import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { openingScenes } from './opening';
import { timeScenes } from './path-a';
import { statusScenes } from './path-b';
import { allEndings } from './endings';

const allScenes = [
  ...openingScenes,
  ...timeScenes,
  ...statusScenes,
  ...allEndings,
];

export const investmentTestScenario: Scenario = {
  ...metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
  scenes: allScenes,
};

export default investmentTestScenario;
