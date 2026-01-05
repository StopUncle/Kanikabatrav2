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
import { walkAwayScenes } from './path-a';
import { ultimatumScenes } from './path-b';
import { upgradeScenes } from './path-c';
import { allEndings } from './endings';

const allScenes = [
  ...openingScenes,
  ...walkAwayScenes,
  ...ultimatumScenes,
  ...upgradeScenes,
  ...allEndings,
];

export const empressMoveScenario: Scenario = {
  ...metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
  scenes: allScenes,
};

export default empressMoveScenario;
