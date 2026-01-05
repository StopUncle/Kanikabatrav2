/**
 * Act 1: Setup
 * Establishes context from Level 1 and presents mission choices
 */
import { morningAfterScenes } from './the-morning-after';
import { forkScenes } from './the-fork';

export const setupScenes = [...morningAfterScenes, ...forkScenes];
