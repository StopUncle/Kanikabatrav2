import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { openingScenes } from './opening';
import { victimScenes } from './path-a';
import { humbleScenes } from './path-b';
import { saviorScenes } from './path-c';
import { endings } from './endings';

const allScenes = [
  ...openingScenes,
  ...victimScenes,
  ...humbleScenes,
  ...saviorScenes,
  ...endings,
];

export const covertNarcissistScenario: Scenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  templates,
};

export default covertNarcissistScenario;
