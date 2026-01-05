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
import { niceGuyScenes } from './path-a';
import { rutScenes } from './path-b';
import { sunkCostScenes } from './path-c';
import { allEndings } from './endings';

const allScenes = [
  ...openingScenes,
  ...niceGuyScenes,
  ...rutScenes,
  ...sunkCostScenes,
  ...allEndings,
];

export const beigeEscapeScenario: Scenario = {
  ...metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
  scenes: allScenes,
};

export default beigeEscapeScenario;
