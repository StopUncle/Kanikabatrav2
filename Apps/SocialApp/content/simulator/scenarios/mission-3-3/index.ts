import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { charityScenes } from './part1/charity';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...charityScenes, ...allEndings];
export const mission33: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission33;
