import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { campusScenes } from './part1/campus';
import { allEndings } from './endings';

const allScenes: ForkScene[] = [...campusScenes, ...allEndings];

export const mission12: ForkScenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  reward,
};

export default mission12;
