import type { ForkScene } from '../../../types';
import { noticeBoardScenes } from './notice-board';
import { circleScenes } from './the-circle';

/**
 * Secret Path - Jordan's Underground Network
 *
 * The hidden third path that unlocks after the player learns about Maris's
 * "twin sister" mention or achieves 80%+ accuracy on Maris's tests.
 *
 * Flow:
 * notice board (secret-path-start) → common room → the circle → intel → the offer → ticket
 *
 * Reward: Gala ticket + intel about Maris's playbook + connection to The Watchers
 * Advantage: Player enters Level 2 with knowledge of Maris's patterns
 */
export const secretPathScenes: ForkScene[] = [
  ...noticeBoardScenes,
  ...circleScenes,
];
