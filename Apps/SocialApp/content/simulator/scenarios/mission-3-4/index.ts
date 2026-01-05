import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { crisisScenes } from './part1/crisis';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...crisisScenes, ...allEndings];
export const mission34: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission34;
