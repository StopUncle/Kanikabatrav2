// The Cold Protocol
// 8 weeks to emotional sovereignty

import type { TransformationProgram } from './types';

export const coldProtocol: TransformationProgram = {
  id: 'cold-protocol',
  slug: 'cold-protocol',
  title: 'The Cold Protocol',
  tagline: '8 Weeks to Emotional Sovereignty',
  description:
    'Master the art of emotional detachment. Learn to observe without reaction, ' +
    'respond without emotion, and maintain unshakeable calm in any situation. ' +
    'This foundational program builds the psychological armor every strategic ' +
    'individual needs.',
  icon: 'Snowflake',
  color: '#4A90D9',
  durationWeeks: 8,
  tier: 'premium', // Week 1-2 free, rest premium
  outcomes: [
    'Complete emotional control in high-pressure situations',
    'Ability to observe without automatic reaction',
    'Strategic calm that others find magnetic',
    'Freedom from emotional manipulation',
    'Clear thinking unaffected by external chaos',
  ],
  forWhom: [
    'People who react emotionally and regret it later',
    'Those easily triggered by others\' behavior',
    'Anyone who wants to project calm authority',
    'Those recovering from emotional manipulation',
    'Leaders who need to stay composed under pressure',
  ],
  weeks: [
    {
      weekNumber: 1,
      theme: 'The Observer\'s Mind',
      missionId: 'week-01-doctrine-of-cold', // The Doctrine of Cold
      unlockRequirements: {
        previousWeekComplete: false,
      },
    },
    {
      weekNumber: 2,
      theme: 'The Power of Pause',
      missionId: 'week-02-investment-ladder', // Investment Ladder
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 3,
      theme: 'Reading the Room',
      missionId: 'week-03-predators-gaze', // The Predator's Gaze
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 1,
      },
    },
    {
      weekNumber: 4,
      theme: 'Fortifying Your Walls',
      missionId: 'week-04-strategic-positioning', // Strategic Positioning
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 2,
      },
    },
    {
      weekNumber: 5,
      theme: 'Tactical Withdrawal',
      missionId: 'week-10-ghost-protocol', // Ghost Protocol
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 6,
      theme: 'The Recovery Protocol',
      missionId: 'week-08-strategic-withdrawal', // Strategic Withdrawal
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 3,
      },
    },
    {
      weekNumber: 7,
      theme: 'Resilience Under Fire',
      missionId: 'week-04-strategic-positioning', // Reusing Strategic Positioning for depth
      unlockRequirements: {
        previousWeekComplete: true,
      },
    },
    {
      weekNumber: 8,
      theme: 'Integration & Mastery',
      missionId: 'week-12-empress-endgame', // Empress Endgame
      unlockRequirements: {
        previousWeekComplete: true,
        minFieldReports: 5,
      },
    },
  ],
};
