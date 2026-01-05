import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { listScenes } from './part1/list';
import { allEndings } from './endings';

const allScenes: ForkScene[] = [...listScenes, ...allEndings];

export const mission15: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };

export default mission15;
