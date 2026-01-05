import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { nightScenes } from './part1/night';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...nightScenes, ...allEndings];
export const mission22: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission22;
