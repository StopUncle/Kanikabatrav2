/**
 * University Level 2: The Hunting Grounds
 *
 * Navigate post-university social scene: clubs, dating apps, frenemies, exes.
 * Sequential mission structure with cumulative consequences.
 */
import type { ForkScenario, ForkScene } from '../../types';
import {
  metadata,
  characters,
  tacticsLearned,
  redFlagsTaught,
  availablePaths,
} from './metadata';

// Act 1: Setup
import { setupScenes } from './act1-setup';

// Mission paths
import { clubScenes } from './club-path';
import { appScenes } from './app-path';
import { setupPathScenes } from './setup-path';
import { exScenes } from './ex-path';
import { climaxScenes } from './climax';
// import { secretScenes } from './secret-path';
// import { endingScenes } from './endings';

/**
 * Consolidate all scenes into single array
 */
const allScenes: ForkScene[] = [
  ...setupScenes,
  ...clubScenes,
  ...appScenes,
  ...setupPathScenes,
  ...exScenes,
  ...climaxScenes,
  // ...secretScenes,
  // ...endingScenes,
];

/**
 * Main scenario export
 */
export const universityLevel2: ForkScenario = {
  id: metadata.id,
  title: metadata.title,
  tagline: metadata.tagline,
  description: metadata.description,
  tier: metadata.tier,
  estimatedMinutes: metadata.estimatedMinutes,
  difficulty: metadata.difficulty,
  category: metadata.category,
  xpReward: metadata.xpReward,
  badgeId: metadata.badgeId,
  characters,
  scenes: allScenes,
  startSceneId: metadata.startSceneId,
  tacticsLearned,
  redFlagsTaught,
  availablePaths,
};

export default universityLevel2;
