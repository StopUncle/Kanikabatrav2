import type { ForkScenario, ForkScene } from '../../types';
import { metadata, characters, tacticsLearned, redFlagsTaught, reward } from './metadata';
import { partyScenes } from './part1/party';
import { allEndings } from './endings';

const allScenes: ForkScene[] = [...partyScenes, ...allEndings];

export const mission14: ForkScenario = { ...metadata, characters, scenes: allScenes, tacticsLearned, redFlagsTaught, reward };

export default mission14;
