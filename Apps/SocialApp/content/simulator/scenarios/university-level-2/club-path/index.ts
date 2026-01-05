/**
 * Club Path - The Velvet Room
 * Mission 1: Navigate Tyler (HPD) and gain VIP access
 */
import { arrivalScenes } from './arrival';
import { firstEncounterScenes } from './first-encounter';
import { tylerInteractionScenes } from './tyler-interaction';
import { vipSectionScenes } from './vip-section';
import { clubEndingScenes } from './endings';

export const clubScenes = [
  ...arrivalScenes,
  ...firstEncounterScenes,
  ...tylerInteractionScenes,
  ...vipSectionScenes,
  ...clubEndingScenes,
];
