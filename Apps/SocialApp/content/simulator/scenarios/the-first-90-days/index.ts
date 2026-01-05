import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { part1Scenes, WEEK_ONE_CHECKPOINT } from './part1';
import { part2Scenes, MONTH_ONE_CHECKPOINT } from './part2';
import { part3Scenes } from './part3';
import { allEndings } from './endings';

const allScenes = [
  ...part1Scenes,
  ...part2Scenes,
  ...part3Scenes,
  ...allEndings,
];

export const theFirst90DaysScenario: Scenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  templates,
};

// Export checkpoints for resume UI
export const CHECKPOINTS = {
  WEEK_ONE_END: WEEK_ONE_CHECKPOINT,
  MONTH_ONE_END: MONTH_ONE_CHECKPOINT,
};

export default theFirst90DaysScenario;
