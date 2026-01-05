/**
 * Setup Path - Dana's Setup
 * Mission 3: Navigate covert narcissist sabotage
 */
import { offerScenes } from './the-offer';
import { sabotageScenes } from './the-sabotage';
import { confrontationScenes } from './confrontation';

export const setupPathScenes = [
  ...offerScenes,
  ...sabotageScenes,
  ...confrontationScenes,
];
