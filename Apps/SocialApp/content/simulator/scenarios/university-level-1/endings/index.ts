import type { ForkScene } from '../../../types';
import { successEndings } from './success';
import { failureEndings } from './failure';

export const allEndings: ForkScene[] = [
  ...successEndings,
  ...failureEndings,
];

export { successEndings, failureEndings };
