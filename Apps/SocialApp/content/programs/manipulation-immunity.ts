// Manipulation Immunity
// 8 weeks to unshakeable psychological defenses

import type { TransformationProgram } from './types';

export const manipulationImmunity: TransformationProgram = {
  id: 'manipulation-immunity',
  slug: 'manipulation-immunity',
  title: 'Manipulation Immunity',
  tagline: '8 Weeks to Unshakeable Psychological Defenses',
  description:
    'Never be manipulated again. Learn to recognize every tactic used against you, ' +
    'build impenetrable psychological defenses, and turn manipulators\' own tactics ' +
    'back against them. This program makes you immune to psychological warfare.',
  icon: 'Shield',
  color: '#D4AF37',
  durationWeeks: 8,
  tier: 'premium',
  outcomes: [
    'Instant recognition of manipulation attempts',
    'Immunity to guilt-tripping and gaslighting',
    'Ability to reverse manipulation tactics',
    'Unshakeable sense of reality and self',
    'Protective boundaries that feel natural',
  ],
  forWhom: [
    'Survivors of narcissistic relationships',
    'Those who feel easily manipulated',
    'People in toxic work environments',
    'Anyone who wants to protect themselves',
    'Those who keep falling for the same tricks',
  ],
  weeks: [
    {
      weekNumber: 1,
      theme: 'The Manipulation Landscape',
      missionId: 'week-06-architecture-of-control', // Architecture of Control
      unlockRequirements: {
        previousWeekComplete: false,
      },
    },
    {
      weekNumber: 2,
      theme: 'Guilt & Shame Tactics',
      missionId: 'week-04-strategic-positioning', // Strategic Positioning
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 3,
      theme: 'Gaslighting Defense',
      missionId: 'week-01-doctrine-of-cold', // Doctrine of Cold
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 1,
      },
    },
    {
      weekNumber: 4,
      theme: 'Love Bombing & Idealization',
      missionId: 'week-05-the-rotation', // The Rotation
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 5,
      theme: 'The Reversal',
      missionId: 'week-07-transformation-protocol', // Transformation Protocol
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 2,
      },
    },
    {
      weekNumber: 6,
      theme: 'Exit Strategies',
      missionId: 'week-10-ghost-protocol', // Ghost Protocol
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 7,
      theme: 'Healing & Recovery',
      missionId: 'week-08-strategic-withdrawal', // Strategic Withdrawal
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 3,
      },
    },
    {
      weekNumber: 8,
      theme: 'Permanent Immunity',
      missionId: 'week-12-empress-endgame', // Empress Endgame
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 5,
      },
    },
  ],
  prerequisites: [], // None - can start directly
};
