// Transformation Program Types
// 8-week structured transformation journeys

import type { WeeklyMission } from '../missions/types';

export interface ProgramWeek {
  weekNumber: number;
  theme: string;
  missionId: string;        // Reference to a weekly mission
  unlockRequirements: {
    previousWeekComplete: boolean;
    minFieldReports?: number;
  };
}

export interface TransformationProgram {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;              // Lucide icon name
  color: string;             // Theme color
  durationWeeks: number;
  tier: 'free' | 'premium' | 'vip';
  weeks: ProgramWeek[];
  prerequisites?: string[];  // Other program IDs required first
  outcomes: string[];        // What you'll achieve
  forWhom: string[];         // Who this program is for
}

export interface ProgramProgress {
  programId: string;
  enrolledAt: string;
  currentWeek: number;
  weeksCompleted: string[];  // Week IDs
  isComplete: boolean;
  completedAt?: string;
}

export interface UserProgramState {
  enrolledPrograms: string[];
  completedPrograms: string[];
  activeProgram?: string;
}
