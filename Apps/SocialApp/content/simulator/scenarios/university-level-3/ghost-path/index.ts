/**
 * Mission 14: Ghosts of the Past
 * A figure from Level 2 reappears - which one depends on player history
 * Dynamic routing based on L2 outcomes
 */
import { ghostIntroScenes } from './ghost-intro';
import { ghostDanaScenes } from './ghost-dana';
import { ghostMarcusScenes } from './ghost-marcus';
import { ghostTylerScenes } from './ghost-tyler-past';
import { ghostCaseyScenes } from './ghost-casey';

export const ghostScenes = [
  ...ghostIntroScenes,
  ...ghostDanaScenes,
  ...ghostMarcusScenes,
  ...ghostTylerScenes,
  ...ghostCaseyScenes,
];
