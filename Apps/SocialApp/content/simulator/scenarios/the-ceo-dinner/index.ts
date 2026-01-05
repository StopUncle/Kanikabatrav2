import type { Scenario } from '../../types';
import {
  metadata,
  characters,
  templates,
  tacticsLearned,
  redFlagsTaught,
} from './metadata';
import { part1Scenes } from './part1';
import { part2Scenes } from './part2';
import { part3Scenes } from './part3';
import { allEndings } from './endings';

const allScenes = [
  ...part1Scenes,
  ...part2Scenes,
  ...part3Scenes,
  ...allEndings,
];

export const theCeoDinner: Scenario = {
  ...metadata,
  characters,
  scenes: allScenes,
  tacticsLearned,
  redFlagsTaught,
  templates,
};

export default theCeoDinner;
