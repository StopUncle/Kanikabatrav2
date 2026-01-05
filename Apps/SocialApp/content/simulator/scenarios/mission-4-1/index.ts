import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { arrivalScenes } from './part1/arrival';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...arrivalScenes, ...allEndings];
export const mission41: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission41;
