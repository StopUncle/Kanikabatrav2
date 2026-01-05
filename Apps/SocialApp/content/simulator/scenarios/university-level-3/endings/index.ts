/**
 * Level 3 Endings
 * Multiple paths to conclude the gala night
 */
import { goodEndings } from './good';
import { neutralEndings } from './neutral';
import { badEndings } from './bad';

export const endingScenes = [
  ...goodEndings,
  ...neutralEndings,
  ...badEndings,
];
