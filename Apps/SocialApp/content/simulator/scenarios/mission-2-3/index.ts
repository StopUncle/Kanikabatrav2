import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { favorScenes } from './part1/favor';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...favorScenes, ...allEndings];
export const mission23: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission23;
