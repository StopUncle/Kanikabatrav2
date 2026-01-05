import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { testScenes } from './part1/test';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...testScenes, ...allEndings];
export const mission35: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission35;
