// Day 1: Friday - All Scenes
// Arrival, Welcome Drinks, Dinner

import type { Scene } from '../../../types';
import { arrivalScenes } from './arrival';
import { welcomeDrinksScenes } from './welcome-drinks';
import { interrogationScenes } from './interrogation';
import { dinnerScenes } from './dinner';

export const day1Scenes: Scene[] = [
  ...arrivalScenes,
  ...welcomeDrinksScenes,
  ...interrogationScenes,
  ...dinnerScenes,
];

// Day 1 ends at scene-day1-end (checkpoint opportunity)
export const DAY1_CHECKPOINT = 'scene-day1-end';
