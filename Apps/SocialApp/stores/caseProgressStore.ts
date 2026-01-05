// Case Progress Store
// Manages user progression through case files

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '../lib/logger';
import {
  getCaseFile,
  getAllCases,
  getCaseSummary,
  isCaseUnlocked,
  getNextCase,
} from '../content/cases';
import type {
  CaseFile,
  CaseProgress,
  CaseSummary,
  ChapterResult,
  CaseStatus,
} from '../content/cases/types';
import type { OutcomeType } from '../content/simulator/types';

const STORAGE_KEY = 'case_progress';

interface CaseProgressState {
  // Progress for all cases
  caseProgress: Record<string, CaseProgress>;
  completedCases: string[];

  // Loading state
  isLoaded: boolean;

  // Actions
  loadProgress: () => Promise<void>;
  saveProgress: () => Promise<void>;

  // Case management
  startCase: (caseId: string) => void;
  completeChapter: (result: ChapterResult) => void;
  markLessonCompleted: (caseId: string) => void;
  retryChapter: (caseId: string) => void;

  // Queries
  getCaseProgress: (caseId: string) => CaseProgress | null;
  getCaseSummaries: () => CaseSummary[];
  isCaseAvailable: (caseId: string, userTier: 'free' | 'premium' | 'vip') => boolean;
  getActiveCases: () => CaseSummary[];
  getStalledCases: () => CaseSummary[];
}

function createDefaultProgress(caseId: string): CaseProgress {
  return {
    caseId,
    status: 'available',
    currentChapter: 1,
    chapterOutcomes: {},
  };
}

export const useCaseProgressStore = create<CaseProgressState>((set, get) => ({
  caseProgress: {},
  completedCases: [],
  isLoaded: false,

  // Load progress from storage
  loadProgress: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        set({
          caseProgress: data.caseProgress || {},
          completedCases: data.completedCases || [],
          isLoaded: true,
        });
      } else {
        set({ isLoaded: true });
      }
    } catch (error) {
      logger.error('Failed to load case progress:', error);
      set({ isLoaded: true });
    }
  },

  // Save progress to storage
  saveProgress: async () => {
    try {
      const { caseProgress, completedCases } = get();
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ caseProgress, completedCases })
      );
    } catch (error) {
      logger.error('Failed to save case progress:', error);
    }
  },

  // Start a case
  startCase: (caseId: string) => {
    const { caseProgress, completedCases } = get();
    const caseFile = getCaseFile(caseId);

    if (!caseFile) return;
    if (!isCaseUnlocked(caseFile, completedCases)) return;

    const existing = caseProgress[caseId];
    if (existing && existing.status === 'in_progress') return;

    const newProgress: CaseProgress = existing || createDefaultProgress(caseId);
    newProgress.status = 'in_progress';
    newProgress.startedAt = newProgress.startedAt || new Date().toISOString();

    set({
      caseProgress: { ...caseProgress, [caseId]: newProgress },
    });

    get().saveProgress();
  },

  // Complete a chapter with result
  completeChapter: (result: ChapterResult) => {
    const { caseProgress, completedCases } = get();
    const { caseId, chapterNumber, outcome, passed, lessonRequired, caseCompleted } = result;

    const progress = caseProgress[caseId];
    if (!progress) return;

    const caseFile = getCaseFile(caseId);
    if (!caseFile) return;

    // Record chapter outcome
    const newChapterOutcomes = {
      ...progress.chapterOutcomes,
      [chapterNumber]: outcome,
    };

    let newStatus: CaseStatus = progress.status;
    let stalledAt: number | undefined;
    let requiredLesson: string | undefined;
    let newCurrentChapter = progress.currentChapter;
    let newCompletedCases = [...completedCases];
    let completedAt: string | undefined;

    if (!passed) {
      // Failed - case stalls
      newStatus = 'stalled';
      stalledAt = chapterNumber;
      requiredLesson = lessonRequired;
    } else if (caseCompleted) {
      // Case completed successfully
      newStatus = 'completed';
      completedAt = new Date().toISOString();
      if (!newCompletedCases.includes(caseId)) {
        newCompletedCases.push(caseId);
      }
    } else {
      // Advance to next chapter
      newCurrentChapter = chapterNumber + 1;
    }

    const updatedProgress: CaseProgress = {
      ...progress,
      status: newStatus,
      currentChapter: newCurrentChapter,
      chapterOutcomes: newChapterOutcomes,
      stalledAt,
      requiredLesson,
      completedAt,
    };

    set({
      caseProgress: { ...caseProgress, [caseId]: updatedProgress },
      completedCases: newCompletedCases,
    });

    get().saveProgress();
  },

  // Mark required lesson as completed
  markLessonCompleted: (caseId: string) => {
    const { caseProgress } = get();
    const progress = caseProgress[caseId];

    if (!progress || progress.status !== 'stalled') return;

    const updatedProgress: CaseProgress = {
      ...progress,
      lessonCompleted: true,
    };

    set({
      caseProgress: { ...caseProgress, [caseId]: updatedProgress },
    });

    get().saveProgress();
  },

  // Retry after completing lesson
  retryChapter: (caseId: string) => {
    const { caseProgress } = get();
    const progress = caseProgress[caseId];

    if (!progress || progress.status !== 'stalled') return;
    if (!progress.lessonCompleted) return;

    // Reset to retry the stalled chapter
    const updatedProgress: CaseProgress = {
      ...progress,
      status: 'in_progress',
      stalledAt: undefined,
      requiredLesson: undefined,
      lessonCompleted: undefined,
    };

    set({
      caseProgress: { ...caseProgress, [caseId]: updatedProgress },
    });

    get().saveProgress();
  },

  // Get progress for a specific case
  getCaseProgress: (caseId: string) => {
    return get().caseProgress[caseId] || null;
  },

  // Get all case summaries
  getCaseSummaries: () => {
    const { caseProgress, completedCases } = get();
    return getAllCases().map((caseFile) =>
      getCaseSummary(caseFile, caseProgress[caseFile.id] || null, completedCases)
    );
  },

  // Check if case is available (unlocked + tier check)
  isCaseAvailable: (caseId: string, userTier: 'free' | 'premium' | 'vip') => {
    const { completedCases } = get();
    const caseFile = getCaseFile(caseId);

    if (!caseFile) return false;

    // Check unlock requirement
    if (!isCaseUnlocked(caseFile, completedCases)) return false;

    // Check tier
    const tierHierarchy = { free: 0, premium: 1, vip: 2 };
    return tierHierarchy[userTier] >= tierHierarchy[caseFile.tier];
  },

  // Get cases in progress
  getActiveCases: () => {
    const { caseProgress, completedCases } = get();

    return getAllCases()
      .filter((c) => {
        const progress = caseProgress[c.id];
        return progress && progress.status === 'in_progress';
      })
      .map((caseFile) =>
        getCaseSummary(caseFile, caseProgress[caseFile.id], completedCases)
      );
  },

  // Get stalled cases (need lesson)
  getStalledCases: () => {
    const { caseProgress, completedCases } = get();

    return getAllCases()
      .filter((c) => {
        const progress = caseProgress[c.id];
        return progress && progress.status === 'stalled';
      })
      .map((caseFile) =>
        getCaseSummary(caseFile, caseProgress[caseFile.id], completedCases)
      );
  },
}));
