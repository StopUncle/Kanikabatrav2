/**
 * University Level 4: The Invitation
 *
 * Private island escalation. The network reveals itself.
 * Blake's loyalty is tested. The real game begins.
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
import { arrivalScenes } from './arrival-path';
import { dayOneScenes } from './day-one';
import { networkTestScenes } from './network-tests';
import { ghostScenes } from './ghost-path';
import { crisisScenes } from './crisis-path';
import { climaxScenes } from './climax-path';
import { endingScenes } from './endings';

/**
 * Consolidate all scenes into single array
 */
const allScenes: ForkScene[] = [
  ...setupScenes,
  ...arrivalScenes,
  ...dayOneScenes,
  ...networkTestScenes,
  ...ghostScenes,
  ...crisisScenes,
  ...climaxScenes,
  ...endingScenes,
];

/**
 * Main scenario export
 */
export const universityLevel4: ForkScenario = {
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

export default universityLevel4;
