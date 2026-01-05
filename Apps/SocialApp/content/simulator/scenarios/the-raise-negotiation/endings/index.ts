// Endings Index for The Raise Negotiation

import type { Scene } from '../../../types';
import { goodEndings } from './good';
import { neutralEndings } from './neutral';
import { badEndings } from './bad';

export const allEndings: Scene[] = [
  ...goodEndings,
  ...neutralEndings,
  ...badEndings,
];
