import type { ForkScene } from '../../../types';
import { goodEnding } from './good';
import { badBragEnding } from './bad-brag';
import { badInfoEnding } from './bad-info';

export const allEndings: ForkScene[] = [
  goodEnding,
  badBragEnding,
  badInfoEnding,
];

export { goodEnding, badBragEnding, badInfoEnding };
