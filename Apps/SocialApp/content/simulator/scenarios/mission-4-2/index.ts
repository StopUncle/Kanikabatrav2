import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { dinnerScenes } from './part1/dinner';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...dinnerScenes, ...allEndings];
export const mission42: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission42;
