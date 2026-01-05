import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { exScenes } from './part1/ex';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...exScenes, ...allEndings];
export const mission24: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission24;
