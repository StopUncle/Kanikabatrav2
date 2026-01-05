import { renderHook, act } from '@testing-library/react-native';
import { useSimulatorStore, selectCurrentDialogLine, selectIsEnding, selectDialogProgress } from '../../stores/simulatorStore';

// Mock simulatorService
const mockScenario = {
  id: 'test-scenario',
  title: 'Test Scenario',
  startSceneId: 'scene-1',
  scenes: [
    {
      id: 'scene-1',
      dialog: [
        { speaker: 'narrator', text: 'Line 1' },
        { speaker: 'narrator', text: 'Line 2' },
      ],
      choices: [
        { id: 'choice-1', text: 'Option A', nextSceneId: 'scene-2', xpBonus: 10, isOptimal: true, feedback: 'Good choice!' },
        { id: 'choice-2', text: 'Option B', nextSceneId: 'scene-3', xpBonus: 0, isOptimal: false, feedback: 'Not optimal.' },
      ],
    },
    {
      id: 'scene-2',
      dialog: [{ speaker: 'narrator', text: 'Good outcome dialog' }],
      nextSceneId: 'ending-good',
    },
    {
      id: 'scene-3',
      dialog: [{ speaker: 'narrator', text: 'Bad outcome dialog' }],
      nextSceneId: 'ending-bad',
    },
    {
      id: 'ending-good',
      dialog: [{ speaker: 'narrator', text: 'Good ending!' }],
      isEnding: true,
      outcomeType: 'good',
    },
    {
      id: 'ending-bad',
      dialog: [{ speaker: 'narrator', text: 'Bad ending.' }],
      isEnding: true,
      outcomeType: 'bad',
    },
  ],
};

const mockProgress = {
  scenarioId: 'test-scenario',
  currentSceneId: 'scene-1',
  choicesMade: [],
  xpEarned: 0,
  startedAt: new Date().toISOString(),
};

jest.mock('../../services/simulatorService', () => ({
  simulatorService: {
    getScenario: jest.fn((id: string) => id === 'test-scenario' ? mockScenario : null),
    clearProgress: jest.fn(() => Promise.resolve()),
    createInitialProgress: jest.fn(() => mockProgress),
    getScene: jest.fn((scenario: any, sceneId: string) => scenario.scenes.find((s: any) => s.id === sceneId)),
    saveProgress: jest.fn(() => Promise.resolve()),
    recordChoice: jest.fn((progress: any, sceneId: string, choiceId: string, isOptimal: boolean, xpBonus: number) => ({
      ...progress,
      choicesMade: [...(progress.choicesMade || []), { sceneId, choiceId, isOptimal }],
      xpEarned: progress.xpEarned + xpBonus,
    })),
    markCompleted: jest.fn(() => Promise.resolve()),
    analyzeOutcome: jest.fn(() => ({
      outcome: 'good',
      totalChoices: 2,
      optimalChoices: 2,
      accuracy: 100,
      xpEarned: 50,
      tacticsUsed: ['Testing'],
      redFlagsMissed: [],
      lessonsLearned: ['Test passed'],
    })),
  },
}));

jest.mock('../../services/psychologyCardService', () => ({
  psychologyCardService: {
    awardCard: jest.fn(() => Promise.resolve(null)),
  },
}));

jest.mock('../../stores/gamificationStore', () => ({
  useGamificationStore: {
    getState: jest.fn(() => ({
      addXp: jest.fn(),
      earnBadge: jest.fn(),
      earnCard: jest.fn(),
    })),
  },
}));

// Note: We need to re-import after mock
import { simulatorService } from '../../services/simulatorService';

describe('SimulatorStore', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    // Reset store state
    const { result } = renderHook(() => useSimulatorStore());
    await act(async () => {
      await result.current.exitScenario();
    });
  });

  describe('initial state', () => {
    it('should start with null values', () => {
      const { result } = renderHook(() => useSimulatorStore());

      expect(result.current.activeScenario).toBeNull();
      expect(result.current.currentScene).toBeNull();
      expect(result.current.progress).toBeNull();
      expect(result.current.currentDialogIndex).toBe(0);
      expect(result.current.isDialogComplete).toBe(false);
      expect(result.current.showingChoices).toBe(false);
      expect(result.current.outcomeAnalysis).toBeNull();
    });
  });

  describe('startScenario', () => {
    it('should return false for non-existent scenario', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      let success = false;
      await act(async () => {
        success = await result.current.startScenario('non-existent');
      });

      expect(success).toBe(false);
      expect(result.current.activeScenario).toBeNull();
    });

    it('should initialize scenario correctly', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      let success = false;
      await act(async () => {
        success = await result.current.startScenario('test-scenario');
      });

      expect(success).toBe(true);
      expect(result.current.activeScenario).toBe(mockScenario);
      expect(result.current.currentScene).toBeDefined();
      expect(result.current.currentDialogIndex).toBe(0);
      expect(result.current.isDialogComplete).toBe(false);
    });

    it('should clear previous progress on start', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      expect(simulatorService.clearProgress).toHaveBeenCalledWith('test-scenario');
    });
  });

  describe('advanceDialog', () => {
    it('should advance dialog index', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      expect(result.current.currentDialogIndex).toBe(0);

      act(() => {
        result.current.advanceDialog();
      });

      expect(result.current.currentDialogIndex).toBe(1);
    });

    it('should show choices when dialog ends', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      // Advance through both dialog lines
      act(() => {
        result.current.advanceDialog(); // Line 1 -> Line 2
        result.current.advanceDialog(); // Line 2 -> show choices
      });

      expect(result.current.isDialogComplete).toBe(true);
      expect(result.current.showingChoices).toBe(true);
    });

    it('should not advance if already complete', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      // Complete dialog
      act(() => {
        result.current.advanceDialog();
        result.current.advanceDialog();
      });

      expect(result.current.isDialogComplete).toBe(true);
      const indexBeforeAdvance = result.current.currentDialogIndex;

      act(() => {
        result.current.advanceDialog(); // Should not advance
      });

      // Should remain the same
      expect(result.current.isDialogComplete).toBe(true);
    });
  });

  describe('makeChoice', () => {
    it('should set feedback and transition state', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      // Complete dialog to show choices
      act(() => {
        result.current.advanceDialog();
        result.current.advanceDialog();
      });

      const choice = mockScenario.scenes[0]!.choices![0]!;

      await act(async () => {
        await result.current.makeChoice(choice);
      });

      expect(result.current.isTransitioning).toBe(true);
      expect(result.current.lastChoiceFeedback).toBe('Good choice!');
      expect(result.current.pendingSceneTransition).toBeDefined();
    });

    it('should record choice with simulatorService', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      act(() => {
        result.current.advanceDialog();
        result.current.advanceDialog();
      });

      const choice = mockScenario.scenes[0]!.choices![0]!;

      await act(async () => {
        await result.current.makeChoice(choice);
      });

      expect(simulatorService.recordChoice).toHaveBeenCalled();
    });
  });

  describe('dismissFeedback', () => {
    it('should transition to next scene after choice feedback', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      act(() => {
        result.current.advanceDialog();
        result.current.advanceDialog();
      });

      const choice = mockScenario.scenes[0]!.choices![0]!;

      await act(async () => {
        await result.current.makeChoice(choice);
      });

      expect(result.current.isTransitioning).toBe(true);

      act(() => {
        result.current.dismissFeedback();
      });

      expect(result.current.isTransitioning).toBe(false);
      expect(result.current.lastChoiceFeedback).toBeNull();
      expect(result.current.currentScene?.id).toBe('scene-2');
    });

    it('should clear feedback when no pending transition', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      act(() => {
        result.current.dismissFeedback();
      });

      expect(result.current.isTransitioning).toBe(false);
      expect(result.current.lastChoiceFeedback).toBeNull();
    });
  });

  describe('exitScenario', () => {
    it('should reset all state', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      expect(result.current.activeScenario).not.toBeNull();

      await act(async () => {
        await result.current.exitScenario();
      });

      expect(result.current.activeScenario).toBeNull();
      expect(result.current.currentScene).toBeNull();
      expect(result.current.progress).toBeNull();
      expect(result.current.currentDialogIndex).toBe(0);
      expect(result.current.outcomeAnalysis).toBeNull();
    });
  });

  describe('restartScenario', () => {
    it('should restart from beginning', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      // Advance some dialog
      act(() => {
        result.current.advanceDialog();
      });

      expect(result.current.currentDialogIndex).toBe(1);

      await act(async () => {
        await result.current.restartScenario();
      });

      expect(result.current.currentDialogIndex).toBe(0);
      expect(result.current.currentScene?.id).toBe('scene-1');
    });
  });

  describe('completeScenario', () => {
    it('should return null if no active scenario', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      let outcome = null;
      await act(async () => {
        outcome = await result.current.completeScenario();
      });

      expect(outcome).toBeNull();
    });

    it('should return analysis on completion', async () => {
      const { result } = renderHook(() => useSimulatorStore());

      await act(async () => {
        await result.current.startScenario('test-scenario');
      });

      await act(async () => {
        await result.current.completeScenario();
      });

      expect(result.current.outcomeAnalysis).toBeDefined();
      expect(result.current.outcomeAnalysis?.outcome).toBe('good');
    });
  });

  describe('selectors', () => {
    describe('selectCurrentDialogLine', () => {
      it('should return null when no scene', () => {
        const state = {
          currentScene: null,
          currentDialogIndex: 0,
        } as any;

        expect(selectCurrentDialogLine(state)).toBeNull();
      });

      it('should return current dialog line', () => {
        const state = {
          currentScene: {
            dialog: [
              { speaker: 'narrator', text: 'Line 1' },
              { speaker: 'narrator', text: 'Line 2' },
            ],
          },
          currentDialogIndex: 1,
        } as any;

        const line = selectCurrentDialogLine(state);
        expect(line?.text).toBe('Line 2');
      });
    });

    describe('selectIsEnding', () => {
      it('should return false when no scene', () => {
        const state = { currentScene: null } as any;
        expect(selectIsEnding(state)).toBe(false);
      });

      it('should return true for ending scene', () => {
        const state = {
          currentScene: { isEnding: true },
        } as any;
        expect(selectIsEnding(state)).toBe(true);
      });
    });

    describe('selectDialogProgress', () => {
      it('should return empty progress when no scene', () => {
        const state = { currentScene: null } as any;
        const progress = selectDialogProgress(state);
        expect(progress).toEqual({ current: 0, total: 0 });
      });

      it('should return correct progress', () => {
        const state = {
          currentScene: {
            dialog: [
              { speaker: 'narrator', text: 'Line 1' },
              { speaker: 'narrator', text: 'Line 2' },
              { speaker: 'narrator', text: 'Line 3' },
            ],
          },
          currentDialogIndex: 1,
        } as any;

        const progress = selectDialogProgress(state);
        expect(progress.current).toBe(2); // 1-indexed
        expect(progress.total).toBe(3);
      });
    });
  });
});
