// Male-Targeted Scenario Registry
// Adapted versions with male-specific psychology

import type { Scenario } from '../../types';

// BEGINNER scenarios
import { maleHealthyConnectionScenario } from './healthy-connection';
import { maleNarcissistTrapScenario } from './narcissist-trap';
import { maleInvestmentTestScenario } from './investment-test';

// INTERMEDIATE scenarios
import { maleAvoidantDanceScenario } from './avoidant-dance';
import { maleRotationMasterScenario } from './rotation-master';

// ADVANCED scenarios
import { maleGaslighterEscapeScenario } from './gaslighter-escape';
import { malePowerPlayScenario } from './power-play';
import { emperorMoveScenario } from './emperor-move';
import { maleTheGhostScenario } from './the-ghost';
import { familyIntroductionMaleScenario } from './family-introduction';

// All male scenarios
export const maleScenarios: Record<string, Scenario> = {
  // BEGINNER
  'male-healthy-connection': maleHealthyConnectionScenario,
  'male-narcissist-trap': maleNarcissistTrapScenario,
  'male-investment-test': maleInvestmentTestScenario,
  // INTERMEDIATE
  'male-avoidant-dance': maleAvoidantDanceScenario,
  'male-rotation-master': maleRotationMasterScenario,
  // ADVANCED
  'male-gaslighter-escape': maleGaslighterEscapeScenario,
  'male-power-play': malePowerPlayScenario,
  'male-emperor-move': emperorMoveScenario,
  'male-the-ghost': maleTheGhostScenario,
  'family-introduction-male': familyIntroductionMaleScenario,
};

// Helper functions
export function getMaleScenario(id: string): Scenario | null {
  return maleScenarios[id] || null;
}

export function getAllMaleScenarios(): Scenario[] {
  return Object.values(maleScenarios);
}

export function getMaleScenariosByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Scenario[] {
  return Object.values(maleScenarios).filter(s => s.difficulty === difficulty);
}

// Metadata for male scenarios
export const maleScenarioMetadata: Record<string, {
  icon: string;
  color: string;
  categoryLabel: string;
}> = {
  // BEGINNER
  'male-healthy-connection': {
    icon: 'Heart',
    color: '#4CAF50',
    categoryLabel: 'Healthy Standards',
  },
  'male-narcissist-trap': {
    icon: 'AlertTriangle',
    color: '#E91E63',
    categoryLabel: 'Narcissist Defense',
  },
  'male-investment-test': {
    icon: 'Scale',
    color: '#FF9800',
    categoryLabel: 'Investment Calibration',
  },
  // INTERMEDIATE
  'male-avoidant-dance': {
    icon: 'Shuffle',
    color: '#9C27B0',
    categoryLabel: 'Hot & Cold Patterns',
  },
  'male-rotation-master': {
    icon: 'Users',
    color: '#2196F3',
    categoryLabel: 'Building Options',
  },
  // ADVANCED
  'male-gaslighter-escape': {
    icon: 'CloudFog',
    color: '#607D8B',
    categoryLabel: 'Reality Defense',
  },
  'male-power-play': {
    icon: 'Briefcase',
    color: '#795548',
    categoryLabel: 'Corporate Manipulation',
  },
  'male-emperor-move': {
    icon: 'Crown',
    color: '#FFD700',
    categoryLabel: 'Sovereignty & Standards',
  },
  'male-the-ghost': {
    icon: 'Ghost',
    color: '#9E9E9E',
    categoryLabel: 'Clean Exit Protocol',
  },
  'family-introduction-male': {
    icon: 'Users',
    color: '#8B4513',
    categoryLabel: 'Family Dynamics',
  },
};

// Re-export individual scenarios for direct imports
export {
  maleHealthyConnectionScenario,
  maleNarcissistTrapScenario,
  maleInvestmentTestScenario,
  maleAvoidantDanceScenario,
  maleRotationMasterScenario,
  maleGaslighterEscapeScenario,
  malePowerPlayScenario,
  emperorMoveScenario,
  maleTheGhostScenario,
  familyIntroductionMaleScenario,
};
