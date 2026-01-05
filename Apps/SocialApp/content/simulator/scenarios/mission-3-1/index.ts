import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { prepScenes } from './part1/prep';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...prepScenes, ...allEndings];
export const mission31: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission31;
