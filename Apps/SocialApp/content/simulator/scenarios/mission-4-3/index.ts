import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { conversationScenes } from './part1/conversations';
import { allEndings } from './endings';
const allScenes: ForkScene[] = [...conversationScenes, ...allEndings];
export const mission43: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };
export default mission43;
