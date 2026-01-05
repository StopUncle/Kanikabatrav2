// Day 3: Sunday - All Scenes
// Wedding Morning, Ceremony, Reception

import type { Scene } from '../../../types';
import { weddingMorningScenes } from './morning';
import { ceremonyScenes } from './ceremony';
import { receptionScenes } from './reception';

export const day3Scenes: Scene[] = [
  ...weddingMorningScenes,
  ...ceremonyScenes,
  ...receptionScenes,
];
