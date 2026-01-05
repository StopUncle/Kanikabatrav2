// Day 2: Saturday - All Scenes
// Morning, Rehearsal, Rehearsal Dinner

import type { Scene } from '../../../types';
import { morningScenes } from './morning';
import { rehearsalScenes } from './rehearsal';
import { rehearsalDinnerScenes } from './rehearsal-dinner';

export const day2Scenes: Scene[] = [
  ...morningScenes,
  ...rehearsalScenes,
  ...rehearsalDinnerScenes,
];

// Day 2 ends at scene-day2-end (checkpoint opportunity)
export const DAY2_CHECKPOINT = 'scene-day2-end';
