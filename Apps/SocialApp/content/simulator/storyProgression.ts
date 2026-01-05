// Story Progression - Complete mission structure for the University saga
// Defines major levels and sub-missions in chronological order

import type { Difficulty } from './types';

export type ProgressionItemType = 'level' | 'mission';

export interface ProgressionItem {
  id: string;
  type: ProgressionItemType;
  scenarioId: string | null; // null = coming soon
  requiresCompletion: string | null; // scenario ID that must be completed first
}

export interface LevelItem extends ProgressionItem {
  type: 'level';
  number: number;
  title: string;
  subtitle: string;
  scenes: number | null;
  color: string;
  comingSoon?: boolean;
}

export interface MissionItem extends ProgressionItem {
  type: 'mission';
  number: string; // e.g., "1.1", "1.2"
  title: string;
  duration: string;
  difficulty: Difficulty;
}

export type StoryProgressionItem = LevelItem | MissionItem;

// Chapter 1: The University
export const CHAPTER_1_PROGRESSION: StoryProgressionItem[] = [
  // Level 1: The Caldwell Gala
  {
    id: 'level-1',
    type: 'level',
    number: 1,
    title: 'The Caldwell Gala',
    subtitle: 'Your first encounter',
    scenes: 83,
    color: '#C9A961',
    scenarioId: 'university-level-1',
    requiresCompletion: null,
  },
  // Post-Level 1 Missions
  {
    id: 'mission-1-1',
    type: 'mission',
    number: '1.1',
    title: 'The Morning After',
    duration: '8-10 min',
    difficulty: 'beginner',
    scenarioId: null, // Coming soon
    requiresCompletion: 'university-level-1',
  },
  {
    id: 'mission-1-2',
    type: 'mission',
    number: '1.2',
    title: 'Campus Currents',
    duration: '10-12 min',
    difficulty: 'beginner',
    scenarioId: null,
    requiresCompletion: 'mission-1-1',
  },
  {
    id: 'mission-1-3',
    type: 'mission',
    number: '1.3',
    title: 'The Study Group',
    duration: '12-15 min',
    difficulty: 'intermediate',
    scenarioId: null,
    requiresCompletion: 'mission-1-2',
  },
  {
    id: 'mission-1-4',
    type: 'mission',
    number: '1.4',
    title: 'First Warning Signs',
    duration: '10-12 min',
    difficulty: 'intermediate',
    scenarioId: null,
    requiresCompletion: 'mission-1-3',
  },
  {
    id: 'mission-1-5',
    type: 'mission',
    number: '1.5',
    title: 'The Invitation List',
    duration: '12-15 min',
    difficulty: 'intermediate',
    scenarioId: null,
    requiresCompletion: 'mission-1-4',
  },
  // Level 2: The Hunting Grounds
  {
    id: 'level-2',
    type: 'level',
    number: 2,
    title: 'The Hunting Grounds',
    subtitle: 'The dating scene',
    scenes: 70,
    color: '#E11D48',
    scenarioId: 'university-level-2',
    requiresCompletion: 'mission-1-5',
  },
  // Post-Level 2 Missions
  {
    id: 'mission-2-1',
    type: 'mission',
    number: '2.1',
    title: 'Digital Minefield',
    duration: '10-12 min',
    difficulty: 'intermediate',
    scenarioId: null,
    requiresCompletion: 'university-level-2',
  },
  {
    id: 'mission-2-2',
    type: 'mission',
    number: '2.2',
    title: 'The Wingman Test',
    duration: '12-15 min',
    difficulty: 'intermediate',
    scenarioId: null,
    requiresCompletion: 'mission-2-1',
  },
  {
    id: 'mission-2-3',
    type: 'mission',
    number: '2.3',
    title: "Dana's Favor",
    duration: '12-15 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-2-2',
  },
  {
    id: 'mission-2-4',
    type: 'mission',
    number: '2.4',
    title: 'The Ex Appears',
    duration: '15-18 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-2-3',
  },
  {
    id: 'mission-2-5',
    type: 'mission',
    number: '2.5',
    title: 'Club Politics',
    duration: '15-18 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-2-4',
  },
];

// Chapter 2: The Elite World
export const CHAPTER_2_PROGRESSION: StoryProgressionItem[] = [
  // Level 3: The Gala
  {
    id: 'level-3',
    type: 'level',
    number: 3,
    title: 'The Gala',
    subtitle: 'Enter the elite',
    scenes: 85,
    color: '#8B5CF6',
    scenarioId: 'university-level-3',
    requiresCompletion: 'mission-2-5',
  },
  // Post-Level 3 Missions
  {
    id: 'mission-3-1',
    type: 'mission',
    number: '3.1',
    title: 'The Dress Code',
    duration: '10-12 min',
    difficulty: 'intermediate',
    scenarioId: null,
    requiresCompletion: 'university-level-3',
  },
  {
    id: 'mission-3-2',
    type: 'mission',
    number: '3.2',
    title: "Elena's Price",
    duration: '12-15 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-3-1',
  },
  {
    id: 'mission-3-3',
    type: 'mission',
    number: '3.3',
    title: "Victoria's Territory",
    duration: '15-18 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-3-2',
  },
  {
    id: 'mission-3-4',
    type: 'mission',
    number: '3.4',
    title: "Kai's Crisis",
    duration: '15-18 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-3-3',
  },
  {
    id: 'mission-3-5',
    type: 'mission',
    number: '3.5',
    title: 'The Harrison Test',
    duration: '12-15 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-3-4',
  },
  // Level 4: The Invitation
  {
    id: 'level-4',
    type: 'level',
    number: 4,
    title: 'The Invitation',
    subtitle: 'The inner circle',
    scenes: 90,
    color: '#0EA5E9',
    scenarioId: 'university-level-4',
    requiresCompletion: 'mission-3-5',
  },
  // Post-Level 4 Missions
  {
    id: 'mission-4-1',
    type: 'mission',
    number: '4.1',
    title: 'Island Arrival',
    duration: '12-15 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'university-level-4',
  },
  {
    id: 'mission-4-2',
    type: 'mission',
    number: '4.2',
    title: 'The Dinner Table',
    duration: '15-18 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-4-1',
  },
  {
    id: 'mission-4-3',
    type: 'mission',
    number: '4.3',
    title: 'Midnight Conversations',
    duration: '15-18 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-4-2',
  },
  {
    id: 'mission-4-4',
    type: 'mission',
    number: '4.4',
    title: "Blake's Betrayal",
    duration: '15-18 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-4-3',
  },
  {
    id: 'mission-4-5',
    type: 'mission',
    number: '4.5',
    title: 'The Final Test',
    duration: '18-22 min',
    difficulty: 'advanced',
    scenarioId: null,
    requiresCompletion: 'mission-4-4',
  },
  // Level 5: Coming Soon
  {
    id: 'level-5',
    type: 'level',
    number: 5,
    title: 'The Reckoning',
    subtitle: 'The final chapter',
    scenes: null,
    color: '#DC2626',
    scenarioId: null,
    requiresCompletion: 'mission-4-5',
    comingSoon: true,
  },
];

// Complete story progression
export const STORY_PROGRESSION: StoryProgressionItem[] = [
  ...CHAPTER_1_PROGRESSION,
  ...CHAPTER_2_PROGRESSION,
];

// Helper functions
export function isLevelItem(item: StoryProgressionItem): item is LevelItem {
  return item.type === 'level';
}

export function isMissionItem(item: StoryProgressionItem): item is MissionItem {
  return item.type === 'mission';
}

export function getItemByScenarioId(scenarioId: string): StoryProgressionItem | undefined {
  return STORY_PROGRESSION.find(item => item.scenarioId === scenarioId);
}

export function getNextItem(currentScenarioId: string): StoryProgressionItem | undefined {
  const currentIndex = STORY_PROGRESSION.findIndex(item => item.scenarioId === currentScenarioId);
  if (currentIndex === -1 || currentIndex >= STORY_PROGRESSION.length - 1) return undefined;
  return STORY_PROGRESSION[currentIndex + 1];
}

export function getChapter1Items(): StoryProgressionItem[] {
  return CHAPTER_1_PROGRESSION;
}

export function getChapter2Items(): StoryProgressionItem[] {
  return CHAPTER_2_PROGRESSION;
}
