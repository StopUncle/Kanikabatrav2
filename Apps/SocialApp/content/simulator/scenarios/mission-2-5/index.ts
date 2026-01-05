import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { clubScenes } from './part1/club';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...clubScenes, ...allEndings];
export const mission25: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission25;
