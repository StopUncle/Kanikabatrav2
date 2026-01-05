// Mission Content Index
// Weekly drip content - the core retention loop

import { week01Mission } from './week-01';
import { week02Mission } from './week-02';
import { week03Mission } from './week-03';
import { week04Mission } from './week-04';
import { week05Mission } from './week-05';
import { week06Mission } from './week-06';
import { week07Mission } from './week-07';
import { week08Mission } from './week-08';
import { week09Mission } from './week-09';
import { week10Mission } from './week-10';
import { week11Mission } from './week-11';
import { week12Mission } from './week-12';

export * from './types';
export * from './week-01';
export * from './week-02';
export * from './week-03';
export * from './week-04';
export * from './week-05';
export * from './week-06';
export * from './week-07';
export * from './week-08';
export * from './week-09';
export * from './week-10';
export * from './week-11';
export * from './week-12';

// Mission Registry - ordered by week
export const missions = [
  week01Mission,
  week02Mission,
  week03Mission,
  week04Mission,
  week05Mission,
  week06Mission,
  week07Mission,
  week08Mission,
  week09Mission,
  week10Mission,
  week11Mission,
  week12Mission,
] as const;

// Mission lookup by ID
export const missionRegistry = {
  'week-01-doctrine-of-cold': week01Mission,
  'week-02-investment-ladder': week02Mission,
  'week-03-predators-gaze': week03Mission,
  'week-04-strategic-positioning': week04Mission,
  'week-05-the-rotation': week05Mission,
  'week-06-architecture-of-control': week06Mission,
  'week-07-transformation-protocol': week07Mission,
  'week-08-strategic-withdrawal': week08Mission,
  'week-09-family-colonization': week09Mission,
  'week-10-ghost-protocol': week10Mission,
  'week-11-digital-domination': week11Mission,
  'week-12-empress-endgame': week12Mission,
} as const;

export type MissionId = keyof typeof missionRegistry;

// Get mission by week number
export function getMissionByWeek(week: number) {
  return missions.find((m) => m.week === week) || null;
}

// Get mission by ID
export function getMission(missionId: string) {
  return missionRegistry[missionId as MissionId] || null;
}

// Get missions by tier
export function getMissionsByTier(tier: 'free' | 'premium' | 'vip') {
  return missions.filter((m) => m.tier === tier);
}

// Get available missions for user tier
export function getAvailableMissions(userTier: 'free' | 'premium' | 'vip') {
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  const userLevel = tierHierarchy[userTier];

  return missions.filter((m) => tierHierarchy[m.tier] <= userLevel);
}

// Get unlocked missions based on user's current week
export function getUnlockedMissions(
  currentWeek: number,
  userTier: 'free' | 'premium' | 'vip'
) {
  const available = getAvailableMissions(userTier);
  return available.filter((m) => m.week <= currentWeek);
}

// Calculate user's current week based on program start date
export function calculateCurrentWeek(programStartDate: string): number {
  const start = new Date(programStartDate);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;
  return Math.min(week, 12); // Cap at 12 weeks
}

// Mission metadata for UI
export const missionMetadata = {
  totalWeeks: 12,
  freeWeeks: [1, 2, 3], // Weeks 1-3 are free
  premiumWeeks: [4, 5, 6, 7, 8], // Weeks 4-8 are premium
  vipWeeks: [9, 10, 11, 12], // Weeks 9-12 are VIP
};

// Get next mission for user
export function getNextMission(
  completedMissions: string[],
  userTier: 'free' | 'premium' | 'vip'
) {
  const available = getAvailableMissions(userTier);
  return available.find((m) => !completedMissions.includes(m.id)) || null;
}

// Calculate mission progress percentage
export function calculateMissionProgress(
  missionId: string,
  exercisesCompleted: string[]
): number {
  const mission = getMission(missionId);
  if (!mission) return 0;

  const totalExercises = mission.fieldExercises.length;
  const completed = exercisesCompleted.filter((id) =>
    mission.fieldExercises.some((e) => e.id === id)
  ).length;

  return Math.round((completed / totalExercises) * 100);
}

// Check if mission is complete
export function isMissionComplete(
  missionId: string,
  exercisesCompleted: string[],
  reflectionCompleted: boolean
): boolean {
  const mission = getMission(missionId);
  if (!mission) return false;

  const completedCount = exercisesCompleted.filter((id) =>
    mission.fieldExercises.some((e) => e.id === id)
  ).length;

  const exercisesPass = completedCount >= mission.requirements.minExercisesCompleted;
  const reflectionPass = !mission.requirements.reflectionRequired || reflectionCompleted;

  return exercisesPass && reflectionPass;
}
