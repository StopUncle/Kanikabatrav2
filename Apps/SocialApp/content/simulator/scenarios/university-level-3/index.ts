/**
 * University Level 3: The Gala
 *
 * The charity gala where all networks collide.
 * Maris is no longer watching. She's testing.
 * Mission-based structure with convergence and dynamic ghost path.
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
import { entranceScenes } from './entrance-path';
import { encounterScenes } from './encounter-path';
import { powerScenes } from './power-path';
import { ghostScenes } from './ghost-path';
import { climaxScenes } from './climax-path';
import { endingScenes } from './endings';

/**
 * Consolidate all scenes into single array
 */
const allScenes: ForkScene[] = [
  ...setupScenes,
  ...entranceScenes,
  ...encounterScenes,
  ...powerScenes,
  ...ghostScenes,
  ...climaxScenes,
  ...endingScenes,
];

/**
 * Main scenario export
 */
export const universityLevel3: ForkScenario = {
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

export default universityLevel3;
