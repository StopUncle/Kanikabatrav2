// Endings Index for The Impossible Boss

import type { Scene } from '../../../types';
import { goodEndings } from './good';
import { neutralEndings } from './neutral';
import { badEndings } from './bad';

export const allEndings: Scene[] = [
  ...goodEndings,
  ...neutralEndings,
  ...badEndings,
];
