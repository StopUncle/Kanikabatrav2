import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { finaleScenes } from './part1/finale';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...finaleScenes, ...allEndings];
export const mission45: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission45;
