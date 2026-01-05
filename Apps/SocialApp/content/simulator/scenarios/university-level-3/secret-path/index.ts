/**
 * Secret Mission: The Architect's Gambit
 * The real game revealed.
 * Unlock: Optimal at 15B + 15C + Maris approval
 */
import { secretInvitationScenes } from './the-invitation';
import { innerSanctumScenes } from './the-inner-sanctum';
import { finalTestScenes } from './the-test';

export const secretScenes = [
  ...secretInvitationScenes,
  ...innerSanctumScenes,
  ...finalTestScenes,
];
