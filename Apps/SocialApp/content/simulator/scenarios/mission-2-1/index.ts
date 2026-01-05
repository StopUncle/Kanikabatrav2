import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { appScenes } from './part1/apps';
import { allEndings } from './endings';

const allScenes: ForkScene[] = [...appScenes, ...allEndings];

export const mission21: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };

export default mission21;
