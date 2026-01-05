// Dating Simulator - Main Index
// Progressive level system: University → Social Scene → Gala → Escalation → Private Island
import type { Level, LevelId, DatingScenario, PlayerStats, GameProgress } from './types';

// Import all levels
import universityLevel, {
  universityScenarios,
  universitySecretScenario,
  allUniversityScenes,
} from './level-1-university';

import socialSceneLevel, {
  socialSceneScenarios,
  socialSceneSecretScenario,
  allSocialSceneScenes,
} from './level-2-social-scene';

import galaLevel, {
  galaScenarios,
  galaSecretScenario,
  allGalaScenes,
} from './level-3-gala';

import escalationLevel, {
  escalationScenarios,
  escalationSecretScenario,
  allEscalationScenes,
} from './level-4-escalation';

import privateIslandLevel, {
  privateIslandScenarios,
  privateIslandSecretScenario,
  allPrivateIslandScenes,
} from './level-5-private-island';

// All levels in progression order
export const levels: Level[] = [
  universityLevel,
  socialSceneLevel,
  galaLevel,
  escalationLevel,
  privateIslandLevel,
];

// All scenarios (excluding secrets)
export const allScenarios: DatingScenario[] = [
  ...universityScenarios,
  ...socialSceneScenarios,
  ...galaScenarios,
  ...escalationScenarios,
  ...privateIslandScenarios,
];

// All secret scenarios
export const secretScenarios: DatingScenario[] = [
  universitySecretScenario,
  socialSceneSecretScenario,
  galaSecretScenario,
  escalationSecretScenario,
  privateIslandSecretScenario,
];

// Combined scenarios (for full registry)
export const allScenariosWithSecrets: DatingScenario[] = [
  ...allScenarios,
  ...secretScenarios,
];

// All scenes combined (for graph validation)
export const allScenes = [
  ...allUniversityScenes,
  ...allSocialSceneScenes,
  ...allGalaScenes,
  ...allEscalationScenes,
  ...allPrivateIslandScenes,
];

// Level lookup by ID
export const levelsById: Record<LevelId, Level> = {
  university: universityLevel,
  'social-scene': socialSceneLevel,
  gala: galaLevel,
  escalation: escalationLevel,
  'private-island': privateIslandLevel,
};

// Scenario lookup by ID
export const scenariosById: Record<string, DatingScenario> = {};
allScenariosWithSecrets.forEach((scenario) => {
  scenariosById[scenario.id] = scenario;
});

// Helper functions
export function getLevel(id: LevelId): Level | null {
  return levelsById[id] || null;
}

export function getScenario(id: string): DatingScenario | null {
  return scenariosById[id] || null;
}

export function getScenariosForLevel(levelId: LevelId): DatingScenario[] {
  switch (levelId) {
    case 'university':
      return universityScenarios;
    case 'social-scene':
      return socialSceneScenarios;
    case 'gala':
      return galaScenarios;
    case 'escalation':
      return escalationScenarios;
    case 'private-island':
      return privateIslandScenarios;
    default:
      return [];
  }
}

export function getSecretScenarioForLevel(levelId: LevelId): DatingScenario | null {
  switch (levelId) {
    case 'university':
      return universitySecretScenario;
    case 'social-scene':
      return socialSceneSecretScenario;
    case 'gala':
      return galaSecretScenario;
    case 'escalation':
      return escalationSecretScenario;
    case 'private-island':
      return privateIslandSecretScenario;
    default:
      return null;
  }
}

export function getNextLevel(currentLevelId: LevelId): LevelId | null {
  const levelOrder: LevelId[] = ['university', 'social-scene', 'gala', 'escalation', 'private-island'];
  const currentIndex = levelOrder.indexOf(currentLevelId);
  if (currentIndex === -1 || currentIndex === levelOrder.length - 1) {
    return null;
  }
  return levelOrder[currentIndex + 1];
}

export function isLevelUnlocked(levelId: LevelId, progress: GameProgress): boolean {
  if (levelId === 'university') return true; // Always unlocked

  const levelOrder: LevelId[] = ['university', 'social-scene', 'gala', 'escalation', 'private-island'];
  const levelIndex = levelOrder.indexOf(levelId);
  if (levelIndex <= 0) return true;

  const previousLevelId = levelOrder[levelIndex - 1];
  const previousLevel = levelsById[previousLevelId];
  const previousProgress = progress.levels[previousLevelId];

  if (!previousProgress) return false;

  // Need to complete required missions to unlock next level
  const requiredMissions = previousLevel.missions.length >= 5 ? 4 : previousLevel.missions.length;
  return previousProgress.missionsCompleted.length >= requiredMissions;
}

// Initial progress state
export function createInitialProgress(): GameProgress {
  return {
    currentLevel: 'university',
    levels: {
      university: { levelId: 'university', missionsCompleted: [], secretUnlocked: false, bestStats: { power: 0, mask: 0, vision: 0 } },
      'social-scene': { levelId: 'social-scene', missionsCompleted: [], secretUnlocked: false, bestStats: { power: 0, mask: 0, vision: 0 } },
      gala: { levelId: 'gala', missionsCompleted: [], secretUnlocked: false, bestStats: { power: 0, mask: 0, vision: 0 } },
      escalation: { levelId: 'escalation', missionsCompleted: [], secretUnlocked: false, bestStats: { power: 0, mask: 0, vision: 0 } },
      'private-island': { levelId: 'private-island', missionsCompleted: [], secretUnlocked: false, bestStats: { power: 0, mask: 0, vision: 0 } },
    },
    totalStats: { power: 0, mask: 0, vision: 0 },
    endingsUnlocked: [],
  };
}

// Game statistics
export const gameStats = {
  totalLevels: 5,
  totalMissions: 24,
  totalSecretMissions: 5,
  totalScenes: allScenes.length,
  totalChoicePoints: allScenes.filter((s) => s.choices && s.choices.length > 0).length * 4,
  estimatedPlaytime: '8-12 hours',
};

// Export types
export type { Level, LevelId, DatingScenario, PlayerStats, GameProgress } from './types';

// Default export
export default {
  levels,
  allScenarios,
  secretScenarios,
  allScenariosWithSecrets,
  levelsById,
  scenariosById,
  getLevel,
  getScenario,
  getScenariosForLevel,
  getSecretScenarioForLevel,
  getNextLevel,
  isLevelUnlocked,
  createInitialProgress,
  gameStats,
};
