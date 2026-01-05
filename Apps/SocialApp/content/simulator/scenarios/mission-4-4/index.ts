import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { betrayalScenes } from './part1/betrayal';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...betrayalScenes, ...allEndings];
export const mission44: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission44;
