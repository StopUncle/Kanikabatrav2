import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { studyScenes } from './part1/study';
import { allEndings } from './endings';

const allScenes: ForkScene[] = [...studyScenes, ...allEndings];

export const mission13: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };

export default mission13;
