// Scenario Registry - Power Plays + Dating Simulator
import type { Scenario, SubscriptionTier, TargetGender, ForkScenario, ForkScene, Choice, Scene } from '../types';
import { powerPlayScenario } from './power-play';
// Power Plays scenarios
import { theInterviewScenario } from './the-interview';
import { theFirst90DaysScenario } from './the-first-90-days';
import { theRaiseNegotiationScenario } from './the-raise-negotiation';
import { theImpossibleBossScenario } from './the-impossible-boss';
import { theProblemEmployeeScenario } from './the-problem-employee';
import { theLayoffLotteryScenario } from './the-layoff-lottery';
import { theExecutivePresentationScenario } from './the-executive-presentation';
import { theHostileOfferScenario } from './the-hostile-offer';
import { theCeoDinner as theCEODinnerScenario } from './the-ceo-dinner';
import { theCrisisScenario } from './the-crisis';
import { theCreditThiefScenario } from './the-credit-thief';

// Fork-based scenarios (new game structure)
import { universityLevel1 } from './university-level-1';
import { universityLevel2 } from './university-level-2';
import { universityLevel3 } from './university-level-3';
import { universityLevel4 } from './university-level-4';

// Mission scenarios (post-level content)
import { mission11 } from './mission-1-1';
import { mission12 } from './mission-1-2';
import { mission13 } from './mission-1-3';
import { mission14 } from './mission-1-4';
import { mission15 } from './mission-1-5';
import { mission21 } from './mission-2-1';
import { mission22 } from './mission-2-2';
import { mission23 } from './mission-2-3';
import { mission24 } from './mission-2-4';
import { mission25 } from './mission-2-5';
import { mission31 } from './mission-3-1';
import { mission32 } from './mission-3-2';
import { mission33 } from './mission-3-3';
import { mission34 } from './mission-3-4';
import { mission35 } from './mission-3-5';
import { mission41 } from './mission-4-1';
import { mission42 } from './mission-4-2';
import { mission43 } from './mission-4-3';
import { mission44 } from './mission-4-4';
import { mission45 } from './mission-4-5';

// ARCHIVED: Old dating scenarios - replaced by university-level-1 story-driven scenarios
// import { allScenariosWithSecrets as datingScenarios } from './dating';
// import type { DatingScenario } from './dating/types';
//
// function convertDatingScenario(ds: DatingScenario): Scenario { ... }
// const datingScenarioMap: Record<string, Scenario> = {};
// for (const ds of datingScenarios) { datingScenarioMap[ds.id] = convertDatingScenario(ds); }

// Convert ForkScenario to Scenario format for backward compatibility
// This allows the existing UI to work with the new fork-based scenarios
function convertForkScenario(fs: ForkScenario): Scenario {
  // Convert ForkScene[] to Scene[] by transforming dialogueChoices/actionChoices to choices
  const convertedScenes: Scene[] = fs.scenes.map((forkScene): Scene => {
    const choices: Choice[] = [];

    // Convert actionChoices (path branching)
    if (forkScene.actionChoices) {
      for (const ac of forkScene.actionChoices) {
        choices.push({
          id: ac.id,
          text: ac.text,
          nextSceneId: ac.nextSceneId,
          feedback: ac.subtext || `Path: ${ac.difficulty}`,
        });
      }
    }

    // Convert dialogueChoices (performance-based)
    if (forkScene.dialogueChoices) {
      for (const dc of forkScene.dialogueChoices) {
        choices.push({
          id: dc.id,
          text: dc.text,
          nextSceneId: dc.nextSceneId,
          isOptimal: dc.isOptimal,
          tactic: dc.tactic,
          // Show NPC reaction as feedback instead of explicit labels
          feedback: dc.reaction.bodyLanguage || dc.reaction.text,
          xpBonus: dc.reaction.scoreImpact > 0 ? dc.reaction.scoreImpact : undefined,
        });
      }
    }

    // Use existing choices if present (backward compat)
    const finalChoices = choices.length > 0 ? choices : forkScene.choices;

    return {
      id: forkScene.id,
      backgroundId: forkScene.backgroundId,
      dialog: forkScene.dialog,
      choices: finalChoices,
      nextSceneId: forkScene.nextSceneId,
      isEnding: forkScene.isEnding,
      outcomeType: forkScene.outcomeType,
      endingTitle: forkScene.endingTitle,
      endingSummary: forkScene.endingSummary,
      chapter: forkScene.chapter,
      mood: forkScene.mood,
    };
  });

  return {
    id: fs.id,
    title: fs.title,
    tagline: fs.tagline,
    description: fs.description,
    tier: fs.tier,
    estimatedMinutes: fs.estimatedMinutes,
    difficulty: fs.difficulty,
    category: fs.category,
    xpReward: fs.xpReward,
    badgeId: fs.badgeId,
    characters: fs.characters,
    scenes: convertedScenes,
    startSceneId: fs.startSceneId,
    tacticsLearned: fs.tacticsLearned,
    redFlagsTaught: fs.redFlagsTaught,
  };
}

// All scenarios
export const scenarios: Record<string, Scenario> = {
  'power-play': powerPlayScenario,
  // Power Plays scenarios
  'the-interview': theInterviewScenario,
  'the-first-90-days': theFirst90DaysScenario,
  'the-raise-negotiation': theRaiseNegotiationScenario,
  'the-impossible-boss': theImpossibleBossScenario,
  'the-problem-employee': theProblemEmployeeScenario,
  'the-layoff-lottery': theLayoffLotteryScenario,
  'the-executive-presentation': theExecutivePresentationScenario,
  'the-hostile-offer': theHostileOfferScenario,
  'the-ceo-dinner': theCEODinnerScenario,
  'the-crisis': theCrisisScenario,
  'the-credit-thief': theCreditThiefScenario,
  // Fork-based scenarios (new game structure)
  'university-level-1': convertForkScenario(universityLevel1),
  'university-level-2': convertForkScenario(universityLevel2),
  'university-level-3': convertForkScenario(universityLevel3),
  'university-level-4': convertForkScenario(universityLevel4),
  // Mission scenarios
  'mission-1-1': convertForkScenario(mission11),
  'mission-1-2': convertForkScenario(mission12),
  'mission-1-3': convertForkScenario(mission13),
  'mission-1-4': convertForkScenario(mission14),
  'mission-1-5': convertForkScenario(mission15),
  'mission-2-1': convertForkScenario(mission21),
  'mission-2-2': convertForkScenario(mission22),
  'mission-2-3': convertForkScenario(mission23),
  'mission-2-4': convertForkScenario(mission24),
  'mission-2-5': convertForkScenario(mission25),
  'mission-3-1': convertForkScenario(mission31),
  'mission-3-2': convertForkScenario(mission32),
  'mission-3-3': convertForkScenario(mission33),
  'mission-3-4': convertForkScenario(mission34),
  'mission-3-5': convertForkScenario(mission35),
  'mission-4-1': convertForkScenario(mission41),
  'mission-4-2': convertForkScenario(mission42),
  'mission-4-3': convertForkScenario(mission43),
  'mission-4-4': convertForkScenario(mission44),
  'mission-4-5': convertForkScenario(mission45),
};

// Helper functions
export function getScenario(id: string): Scenario | null {
  return scenarios[id] || null;
}

export function getAllScenarios(): Scenario[] {
  return Object.values(scenarios);
}

export function getScenariosByTier(tier: SubscriptionTier): Scenario[] {
  const tierHierarchy: Record<SubscriptionTier, number> = {
    free: 0,
    premium: 1,
    vip: 2,
  };

  const userLevel = tierHierarchy[tier];

  return getAllScenarios().filter((scenario) => {
    const scenarioLevel = tierHierarchy[scenario.tier];
    return scenarioLevel <= userLevel;
  });
}

export function getScenariosByCategory(category: string): Scenario[] {
  return getAllScenarios().filter((s) => s.category === category);
}

export function getFreeScenarios(): Scenario[] {
  return getAllScenarios().filter((s) => s.tier === 'free');
}

export function getPremiumScenarios(): Scenario[] {
  return getAllScenarios().filter((s) => s.tier === 'premium');
}

export function getVipScenarios(): Scenario[] {
  return getAllScenarios().filter((s) => s.tier === 'vip');
}

// Gender-based filtering for dating scenarios
// Professional scenarios (no targetGender) are shown to everyone
export function getScenariosByGender(gender: TargetGender): Scenario[] {
  return getAllScenarios().filter((s) => {
    // Professional scenarios without targetGender are shown to everyone
    if (!s.targetGender) return true;
    // Dating scenarios are filtered by target gender
    return s.targetGender === gender;
  });
}

// Power Plays - professional/corporate scenarios only
export function getPowerScenarios(): Scenario[] {
  return getAllScenarios().filter((s) => s.category === 'professional');
}

// Scenario metadata for UI
export const scenarioMetadata: Record<string, {
  icon: string;
  color: string;
  categoryLabel: string;
}> = {
  'power-play': {
    icon: 'Briefcase',
    color: '#FF9800',
    categoryLabel: 'Professional',
  },
  // Power Plays scenarios
  'the-interview': {
    icon: 'Briefcase',
    color: '#1E40AF',
    categoryLabel: 'Corporate VIP',
  },
  'the-first-90-days': {
    icon: 'Calendar',
    color: '#10B981',
    categoryLabel: 'New Job',
  },
  'the-raise-negotiation': {
    icon: 'TrendingUp',
    color: '#22C55E',
    categoryLabel: 'Compensation',
  },
  'the-impossible-boss': {
    icon: 'UserX',
    color: '#DC2626',
    categoryLabel: 'Managing Up',
  },
  'the-problem-employee': {
    icon: 'UserMinus',
    color: '#F97316',
    categoryLabel: 'Managing Down',
  },
  'the-layoff-lottery': {
    icon: 'Scissors',
    color: '#7C3AED',
    categoryLabel: 'Survival',
  },
  'the-executive-presentation': {
    icon: 'Presentation',
    color: '#4F46E5',
    categoryLabel: 'Executive Presence',
  },
  'the-hostile-offer': {
    icon: 'Shield',
    color: '#B91C1C',
    categoryLabel: 'M&A Defense',
  },
  'the-ceo-dinner': {
    icon: 'Users',
    color: '#C9A961',
    categoryLabel: 'Executive Networking',
  },
  'the-crisis': {
    icon: 'AlertTriangle',
    color: '#DC2626',
    categoryLabel: 'Crisis Management',
  },
  'the-credit-thief': {
    icon: 'Award',
    color: '#F59E0B',
    categoryLabel: 'Credit Reclamation',
  },
  // Fork-based scenarios
  'university-level-1': {
    icon: 'GraduationCap',
    color: '#8B5CF6',
    categoryLabel: 'Social Strategy',
  },
  'university-level-2': {
    icon: 'Sparkles',
    color: '#EC4899',
    categoryLabel: 'Social Dynamics',
  },
  'university-level-3': {
    icon: 'Crown',
    color: '#C9A961',
    categoryLabel: 'Elite Networks',
  },
  'university-level-4': {
    icon: 'Building',
    color: '#F97316',
    categoryLabel: 'The Network',
  },
};
