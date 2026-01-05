/**
 * Mission 11: The Entrance
 * First impressions at high-stakes events
 */
import { arrivalScenes } from './arrival';
import { gatekeepersScenes } from './the-gatekeepers';
import { roomScenes } from './the-room';

export const entranceScenes = [
  ...arrivalScenes,
  ...gatekeepersScenes,
  ...roomScenes,
];
