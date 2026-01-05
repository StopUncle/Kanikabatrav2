import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { intelScenes } from './part1/intel';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...intelScenes, ...allEndings];
export const mission32: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission32;
