/**
 * Arrival Path - Private jet and island landing
 */
import { jetScenes } from './private-jet';
import { landingScenes } from './island-landing';
import { roomScenes } from './room-assignment';

export const arrivalScenes = [
  ...jetScenes,
  ...landingScenes,
  ...roomScenes,
];
