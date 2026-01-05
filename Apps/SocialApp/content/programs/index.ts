// Programs Index
// Registry of all transformation programs

import { coldProtocol } from './cold-protocol';
import { manipulationImmunity } from './manipulation-immunity';
import { magnetismBuild } from './magnetism-build';
import type { TransformationProgram, ProgramProgress, UserProgramState } from './types';

// All programs
export const programs: TransformationProgram[] = [
  coldProtocol,
  manipulationImmunity,
  magnetismBuild,
];

// Get program by ID
export function getProgram(id: string): TransformationProgram | undefined {
  return programs.find((p) => p.id === id);
}

// Get program by slug
export function getProgramBySlug(slug: string): TransformationProgram | undefined {
  return programs.find((p) => p.slug === slug);
}

// Get programs available for a user tier
export function getAvailablePrograms(
  userTier: 'free' | 'premium' | 'vip'
): TransformationProgram[] {
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  const userLevel = tierHierarchy[userTier];

  return programs.filter((program) => {
    const programLevel = tierHierarchy[program.tier];
    return programLevel <= userLevel;
  });
}

// Check if user can enroll in a program
export function canEnrollInProgram(
  program: TransformationProgram,
  completedPrograms: string[],
  userTier: 'free' | 'premium' | 'vip'
): { canEnroll: boolean; reason?: string } {
  // Check tier
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  if (tierHierarchy[program.tier] > tierHierarchy[userTier]) {
    return {
      canEnroll: false,
      reason: `Requires ${program.tier} subscription`,
    };
  }

  // Check prerequisites
  if (program.prerequisites && program.prerequisites.length > 0) {
    const missingPrereqs = program.prerequisites.filter(
      (prereq) => !completedPrograms.includes(prereq)
    );
    if (missingPrereqs.length > 0) {
      const missingNames = missingPrereqs
        .map((id) => getProgram(id)?.title || id)
        .join(', ');
      return {
        canEnroll: false,
        reason: `Complete first: ${missingNames}`,
      };
    }
  }

  return { canEnroll: true };
}

// Export types
export type { TransformationProgram, ProgramProgress, UserProgramState };
