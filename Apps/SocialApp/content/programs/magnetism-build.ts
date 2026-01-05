// The Magnetism Build
// 8 weeks to strategic presence and influence

import type { TransformationProgram } from './types';

export const magnetismBuild: TransformationProgram = {
  id: 'magnetism-build',
  slug: 'magnetism-build',
  title: 'The Magnetism Build',
  tagline: '8 Weeks to Strategic Presence & Influence',
  description:
    'Become the person others are drawn to. Build genuine charisma, master the art of ' +
    'influence without manipulation, and develop the kind of presence that commands ' +
    'rooms. This advanced program transforms you into a natural center of gravity.',
  icon: 'Magnet',
  color: '#9B59B6',
  durationWeeks: 8,
  tier: 'vip',
  outcomes: [
    'Natural charisma that draws people in',
    'Mastery of ethical influence techniques',
    'Commanding presence in any social situation',
    'Ability to build instant rapport',
    'Strategic social intelligence',
  ],
  forWhom: [
    'Aspiring leaders and executives',
    'Entrepreneurs building their network',
    'Those who feel invisible in social settings',
    'People who want to be more memorable',
    'Anyone ready for advanced social mastery',
  ],
  weeks: [
    {
      weekNumber: 1,
      theme: 'The Foundation of Presence',
      missionId: 'week-01-doctrine-of-cold', // Doctrine of Cold - Calm foundation
      unlockRequirements: {
        previousWeekComplete: false,
      },
    },
    {
      weekNumber: 2,
      theme: 'Strategic Communication',
      missionId: 'week-02-investment-ladder', // Investment Ladder
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 3,
      theme: 'Reading & Mirroring',
      missionId: 'week-03-predators-gaze', // The Predator's Gaze
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 1,
      },
    },
    {
      weekNumber: 4,
      theme: 'Scarcity & Value',
      missionId: 'week-05-the-rotation', // The Rotation
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 5,
      theme: 'Social Mapping',
      missionId: 'week-09-family-colonization', // Family Colonization
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 2,
      },
    },
    {
      weekNumber: 6,
      theme: 'The Push-Pull Dynamic',
      missionId: 'week-10-ghost-protocol', // Ghost Protocol
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 7,
      theme: 'Adaptive Personas',
      missionId: 'week-11-digital-domination', // Digital Domination
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 3,
      },
    },
    {
      weekNumber: 8,
      theme: 'Magnetic Integration',
      missionId: 'week-12-empress-endgame', // Empress Endgame
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 5,
      },
    },
  ],
  prerequisites: ['cold-protocol'], // Requires emotional foundation first
};
