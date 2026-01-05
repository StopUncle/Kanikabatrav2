import type { ForkScenario, ForkScene } from '../../types';
import {
  metadata,
  characters,
  tacticsLearned,
  redFlagsTaught,
  reward,
} from './metadata';
import { morningScenes } from './part1/morning';
import { coffeeScenes } from './part2/coffee';
import { allEndings } from './endings';

// Combine all scenes
const allScenes: ForkScene[] = [
  ...morningScenes,
  ...coffeeScenes,
  ...allEndings,
];

export const mission11: ForkScenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  reward,
};

export default mission11;
