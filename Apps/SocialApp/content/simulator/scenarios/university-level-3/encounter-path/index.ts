/**
 * Mission 12: First Encounter
 * Maris is no longer watching. She's testing.
 */
import { approachScenes } from './the-approach';
import { testScenes } from './the-test';
import { verdictScenes } from './the-verdict';

export const encounterScenes = [
  ...approachScenes,
  ...testScenes,
  ...verdictScenes,
];
