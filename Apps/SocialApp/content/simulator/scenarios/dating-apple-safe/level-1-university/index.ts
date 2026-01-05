/**
 * University Level 1 - Complete Export (Apple-Safe Version)
 *
 * A defensive relationship simulator teaching pattern recognition and boundary-setting.
 *
 * Paths:
 * - Party Path: Learning to recognize narcissistic manipulation (Maris)
 * - Study Path: Understanding anxious attachment patterns (Casey)
 * - Secret Path: Recognizing dangerous social networks
 *
 * Core Teaching:
 * - Red flag recognition
 * - Boundary setting
 * - Healthy vs. unhealthy connection patterns
 * - When to walk away
 */

// Metadata and characters
export * from './metadata';

// Party Path - Maris encounter (narcissist patterns)
export { partyPathScenes } from './party-path';
export {
  arrivalScenes as partyArrivalScenes,
  firstEncounterScenes as partyFirstEncounterScenes,
  calebEncounterScenes as partyCalebScenes,
  theTestScenes as partyTestScenes,
  partyEndingScenes,
} from './party-path';

// Study Path - Casey encounter (anxious attachment patterns)
export { studyPathScenes } from './study-path';
export {
  arrivalScenes as studyArrivalScenes,
  meetingCaseyScenes,
  theRevealScenes as studyRevealScenes,
  studyEndingScenes,
} from './study-path';

// Secret Path - Network recognition (already complete)
export * from './secret-red-flags-network';

// Combined scenes for easy loading
import { partyPathScenes } from './party-path';
import { studyPathScenes } from './study-path';
import type { ForkScene } from '../../../types';

export const allScenes: ForkScene[] = [
  ...partyPathScenes,
  ...studyPathScenes,
];

// Scene ID lookup for navigation
export const sceneMap = new Map<string, ForkScene>(
  allScenes.map((scene) => [scene.id, scene])
);

// Entry points for each path
export const pathEntryPoints = {
  party: 'party-arrival',
  study: 'study-hall-arrival',
  secret: 'secret-network-entry', // From secret-red-flags-network
};

// Teaching summary for this level
export const levelTeaching = {
  patterns: [
    'Love-bombing and instant intensity',
    'The "you\'re different" line',
    'Over-giving as a warning sign',
    'Masks slipping under pressure',
    'Supply dynamics (Caleb example)',
    'Anxious attachment compensation',
  ],
  skills: [
    'Pattern recognition',
    'Boundary setting',
    'Genuine vs. transactional connection',
    'Strategic observation',
    'Knowing when to walk away',
  ],
  redFlags: [
    'Too fast intimacy',
    'Claiming you before knowing you',
    'Treating people as utility',
    'Mask drops when challenged',
    'Earning connection through service',
    'Preemptive self-deprecation',
  ],
};
