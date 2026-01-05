// Dating Simulator Store
// Manages game state for visual novel scenarios

import { create } from 'zustand';
import { simulatorService } from '../services/simulatorService';
import { psychologyCardService } from '../services/psychologyCardService';
import { checkAndAwardScenarioReward } from '../services/avatarRewardService';
import { creditService } from '../services/creditService';
import { useGamificationStore } from './gamificationStore';
import { useNPCMemoryStore } from './npcMemoryStore';
import { logger } from '../lib/logger';
import type {
  Scenario,
  Scene,
  ScenarioProgress,
  OutcomeAnalysis,
  Choice,
  DialogueChoice,
  Character,
} from '../content/simulator';
import {
  getBehaviorContext,
  processDialogLine,
  processPlayerChoice,
  type ModifiedDialogLine,
  type ChoiceProcessingResult,
} from '../lib/npc';

interface SimulatorState {
  // Current game state
  activeScenario: Scenario | null;
  currentScene: Scene | null;
  progress: ScenarioProgress | null;

  // Dialog state
  currentDialogIndex: number;
  isDialogComplete: boolean;
  showingChoices: boolean;

  // Transitions
  isTransitioning: boolean;
  lastChoiceFeedback: string | null;
  pendingSceneTransition: Scene | null;
  pendingProgress: ScenarioProgress | null;

  // Outcome
  outcomeAnalysis: OutcomeAnalysis | null;

  // Behavior engine state
  lastBehaviorResult: ChoiceProcessingResult | null;
  interactionCount: number;

  // Actions
  startScenario: (scenarioId: string) => Promise<boolean>;
  resumeScenario: (scenarioId: string) => Promise<boolean>;
  advanceDialog: () => void;
  makeChoice: (choice: Choice) => Promise<void>;
  makeDialogueChoice: (choice: DialogueChoice, character: Character) => Promise<void>;
  dismissFeedback: () => void;
  completeScenario: () => Promise<OutcomeAnalysis | null>;
  restartScenario: () => Promise<void>;
  exitScenario: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  // Initial state
  activeScenario: null,
  currentScene: null,
  progress: null,
  currentDialogIndex: 0,
  isDialogComplete: false,
  showingChoices: false,
  isTransitioning: false,
  lastChoiceFeedback: null,
  pendingSceneTransition: null,
  pendingProgress: null,
  outcomeAnalysis: null,
  lastBehaviorResult: null,
  interactionCount: 0,

  // Start a new scenario - always starts fresh from beginning
  startScenario: async (scenarioId: string) => {
    const scenario = simulatorService.getScenario(scenarioId);
    if (!scenario) {
      return false;
    }

    // Always clear any existing progress and start fresh
    await simulatorService.clearProgress(scenarioId);

    // Create fresh progress
    const progress = simulatorService.createInitialProgress(scenario);
    const startScene = simulatorService.getScene(scenario, scenario.startSceneId, progress);

    if (!startScene || !progress) {
      return false;
    }

    // Initialize NPC memory for all characters in the scenario
    useNPCMemoryStore.getState().clearAllMemory();
    for (const character of scenario.characters) {
      useNPCMemoryStore.getState().initializeNPC(character.id);
    }

    set({
      activeScenario: scenario,
      currentScene: startScene,
      progress,
      currentDialogIndex: 0,
      isDialogComplete: false,
      showingChoices: false,
      isTransitioning: false,
      lastChoiceFeedback: null,
      outcomeAnalysis: null,
      lastBehaviorResult: null,
      interactionCount: 0,
    });

    await simulatorService.saveProgress(progress);
    return true;
  },

  // Resume a scenario from saved progress (checkpoint resume)
  resumeScenario: async (scenarioId: string) => {
    const scenario = simulatorService.getScenario(scenarioId);
    if (!scenario) {
      return false;
    }

    // Load saved progress
    const savedProgress = await simulatorService.loadProgress(scenarioId);
    if (!savedProgress || savedProgress.completedAt) {
      // No saved progress or already completed, start fresh
      return get().startScenario(scenarioId);
    }

    // Get the scene from saved progress
    const resumeScene = simulatorService.getScene(scenario, savedProgress.currentSceneId, savedProgress);

    if (!resumeScene) {
      // Invalid scene, start fresh
      return get().startScenario(scenarioId);
    }

    set({
      activeScenario: scenario,
      currentScene: resumeScene,
      progress: savedProgress,
      currentDialogIndex: 0,
      isDialogComplete: false,
      showingChoices: false,
      isTransitioning: false,
      lastChoiceFeedback: null,
      outcomeAnalysis: null,
    });

    return true;
  },

  // Advance to next dialog line or show choices
  advanceDialog: () => {
    const { currentScene, currentDialogIndex, isDialogComplete, activeScenario, progress } = get();
    if (!currentScene || !activeScenario || !progress) return;

    // If dialog complete, don't advance
    if (isDialogComplete) return;

    const nextIndex = currentDialogIndex + 1;

    // Check for standard choices or tactic choices (TacticScene uses tacticChoices)
    const scene = currentScene as Scene & { tacticChoices?: unknown[] };
    const hasChoices = (currentScene.choices && currentScene.choices.length > 0) ||
                       (scene.tacticChoices && scene.tacticChoices.length > 0);

    // Check if we've reached the end of dialog
    if (!currentScene.dialog || nextIndex >= currentScene.dialog.length) {
      // If scene has choices (standard or tactic), show them
      if (hasChoices) {
        set({
          isDialogComplete: true,
          showingChoices: true,
        });
      }
      // If scene has auto-advance
      else if (currentScene.nextSceneId) {
        const nextScene = simulatorService.getScene(activeScenario, currentScene.nextSceneId, progress);
        if (nextScene) {
          const newProgress = {
            ...progress,
            currentSceneId: nextScene.id,
          };

          set({
            currentScene: nextScene,
            progress: newProgress,
            currentDialogIndex: 0,
            isDialogComplete: false,
            showingChoices: false,
            lastChoiceFeedback: null,
          });

          simulatorService.saveProgress(newProgress);
        }
      }
      // If it's an ending scene
      else if (currentScene.isEnding) {
        set({ isDialogComplete: true });
      }
      // Fallback: No valid progression path - force to ending
      else {
        logger.warn(`Scene ${currentScene.id} has no progression path. Attempting recovery.`);
        const fallbackEnding = activeScenario.scenes.find(s => s.isEnding);
        if (fallbackEnding) {
          const newProgress = {
            ...progress,
            currentSceneId: fallbackEnding.id,
          };
          set({
            currentScene: fallbackEnding,
            progress: newProgress,
            currentDialogIndex: 0,
            isDialogComplete: false,
            showingChoices: false,
          });
          simulatorService.saveProgress(newProgress);
        }
      }
    } else {
      // Check if next line is inner-voice
      const nextLine = currentScene.dialog[nextIndex];
      const isNextInnerVoice = nextLine?.speakerId === 'inner-voice' || nextLine?.speakerId === 'inner';

      if (isNextInnerVoice && hasChoices) {
        // Skip inner-voice line - it will appear WITH choices
        set({
          isDialogComplete: true,
          showingChoices: true,
        });
      } else if (isNextInnerVoice && currentScene.isEnding) {
        // Skip inner-voice line on endings - go straight to ending screen
        set({ isDialogComplete: true });
      } else {
        set({ currentDialogIndex: nextIndex });
      }
    }
  },

  // Make a choice and show feedback (wait for user to dismiss)
  makeChoice: async (choice: Choice) => {
    // FIRST: Check and set transition flag atomically to prevent double-tap
    const { isTransitioning } = get();
    if (isTransitioning) return;
    set({ isTransitioning: true }); // Block further calls immediately

    const { activeScenario, currentScene, progress } = get();
    if (!activeScenario || !currentScene || !progress) {
      set({ isTransitioning: false });
      return;
    }

    // Record the choice - debug log to verify isOptimal is passed correctly
    logger.debug('[SimulatorStore] makeChoice:', {
      choiceId: choice.id,
      isOptimal: choice.isOptimal,
      xpBonus: choice.xpBonus,
      sceneId: currentScene.id,
    });

    const updatedProgress = simulatorService.recordChoice(
      progress,
      currentScene.id,
      choice.id,
      choice.isOptimal || false,
      choice.xpBonus || 0
    );

    // Get next scene (pass progress for template resolution)
    const nextScene = simulatorService.getScene(activeScenario, choice.nextSceneId, updatedProgress);
    if (!nextScene) {
      logger.error(`Scene not found: ${choice.nextSceneId} - attempting recovery`);
      // Try to find any valid ending scene as fallback
      const fallbackEnding = activeScenario.scenes.find(s => s.isEnding && s.outcomeType === 'neutral');
      const anyEnding = fallbackEnding || activeScenario.scenes.find(s => s.isEnding);
      if (anyEnding) {
        const fallbackProgress = {
          ...updatedProgress,
          currentSceneId: anyEnding.id,
        };
        set({
          currentScene: anyEnding,
          progress: fallbackProgress,
          currentDialogIndex: 0,
          isDialogComplete: false,
          showingChoices: false,
          isTransitioning: false,
          lastChoiceFeedback: 'Something went wrong. Redirecting to ending...',
        });
        return;
      }
      set({ isTransitioning: false, lastChoiceFeedback: null });
      return;
    }

    // Update progress with new scene
    const newProgress = {
      ...updatedProgress,
      currentSceneId: nextScene.id,
    };

    // Show feedback and store pending transition (user must tap to continue)
    set({
      isTransitioning: true,
      lastChoiceFeedback: choice.feedback || null,
      pendingSceneTransition: nextScene,
      pendingProgress: newProgress,
    });
  },

  // Make a dialogue choice (fork system) - processes through behavior engine
  makeDialogueChoice: async (choice: DialogueChoice, character: Character) => {
    // Check and set transition flag to prevent double-tap
    const { isTransitioning, interactionCount } = get();
    if (isTransitioning) return;
    set({ isTransitioning: true });

    const { activeScenario, currentScene, progress } = get();
    if (!activeScenario || !currentScene || !progress) {
      set({ isTransitioning: false });
      return;
    }

    // Get behavior context for this NPC
    const behaviorContext = getBehaviorContext(character, currentScene.id, interactionCount);

    // Process choice through behavior engine if context available
    let behaviorResult: ChoiceProcessingResult | null = null;
    if (behaviorContext) {
      behaviorResult = processPlayerChoice(choice, behaviorContext);
      logger.debug('[SimulatorStore] Behavior engine result:', {
        contradictionDetected: behaviorResult.contradictionDetected,
        triggersObsession: behaviorResult.triggersObsession,
        triggersMaskSlip: behaviorResult.triggersMaskSlip,
        adjustedEmotion: behaviorResult.adjustedEmotion,
      });
    }

    // Record the choice (convert DialogueChoice to standard format)
    const updatedProgress = simulatorService.recordChoice(
      progress,
      currentScene.id,
      choice.id,
      choice.isOptimal || false,
      choice.reaction?.scoreImpact || 0
    );

    // Get next scene
    const nextScene = simulatorService.getScene(activeScenario, choice.nextSceneId, updatedProgress);
    if (!nextScene) {
      logger.error(`Scene not found: ${choice.nextSceneId}`);
      set({ isTransitioning: false });
      return;
    }

    // Update progress with new scene
    const newProgress = {
      ...updatedProgress,
      currentSceneId: nextScene.id,
    };

    // Store behavior result and increment interaction count
    set({
      isTransitioning: true,
      lastChoiceFeedback: null, // DialogueChoice uses reaction, not feedback
      pendingSceneTransition: nextScene,
      pendingProgress: newProgress,
      lastBehaviorResult: behaviorResult,
      interactionCount: interactionCount + 1,
    });
  },

  // Dismiss feedback and transition to next scene
  dismissFeedback: () => {
    const { pendingSceneTransition, pendingProgress } = get();

    if (pendingSceneTransition && pendingProgress) {
      set({
        currentScene: pendingSceneTransition,
        progress: pendingProgress,
        currentDialogIndex: 0,
        isDialogComplete: false,
        showingChoices: false,
        isTransitioning: false,
        lastChoiceFeedback: null,
        pendingSceneTransition: null,
        pendingProgress: null,
      });

      simulatorService.saveProgress(pendingProgress);
    } else {
      // No pending transition, just clear feedback
      set({
        isTransitioning: false,
        lastChoiceFeedback: null,
      });
    }
  },

  // Complete the scenario and get outcome
  completeScenario: async () => {
    const { activeScenario, currentScene, progress } = get();
    if (!activeScenario || !currentScene || !progress) return null;

    try {
      // Analyze the outcome
      const analysis = simulatorService.analyzeOutcome(activeScenario, progress);

      // These operations can fail without breaking the flow
      try {
        // Calculate diminishing returns for repeated plays (same day)
        const completionsToday = await simulatorService.getCompletionsTodayCount(activeScenario.id);
        const xpMultiplier = completionsToday === 0 ? 1
          : completionsToday === 1 ? 0.5
          : completionsToday === 2 ? 0.25
          : 0.1;
        const adjustedXp = Math.floor(analysis.xpEarned * xpMultiplier);

        await simulatorService.markCompleted(
          activeScenario.id,
          analysis.outcome,
          adjustedXp
        );
        await simulatorService.clearProgress(activeScenario.id);
        useGamificationStore.getState().addXp(adjustedXp);

        // Update analysis for display
        analysis.xpEarned = adjustedXp;

        if (analysis.badgeEarned) {
          useGamificationStore.getState().earnBadge(analysis.badgeEarned);
        }

        // Award psychology card on passing outcomes
        if (analysis.outcome === 'passed') {
          const card = await psychologyCardService.awardCard(
            activeScenario.id,
            100 // Pass 100 for passed outcomes since we no longer track accuracy
          );
          if (card) {
            analysis.cardEarned = card.id;
            useGamificationStore.getState().earnCard(card.id);
          }

          // Check for avatar reward on pass
          const avatarResult = await checkAndAwardScenarioReward(
            activeScenario.id,
            100, // Pass 100 for passed outcomes
            true // Consider pass as "perfect" for rewards
          );
          if (avatarResult.awarded && avatarResult.reward) {
            analysis.avatarRewardEarned = avatarResult.reward.id;
            useGamificationStore.getState().earnAvatarReward(avatarResult.reward.id);
          }

          // Award mastery credits on pass
          await creditService.awardMasteryCredits(activeScenario.id);
        }

        // Set scenario cooldown (tier-based, VIP has no cooldown)
        creditService.setScenarioCooldown(activeScenario.id);
      } catch (e) {
        logger.warn('Non-critical error saving scenario completion:', e);
      }

      set({ outcomeAnalysis: analysis });
      return analysis;
    } catch (error) {
      logger.error('Failed to complete scenario:', error);
      // Set fallback outcome so user isn't stuck on black screen
      const fallbackAnalysis: OutcomeAnalysis = {
        outcome: 'failed',
        xpEarned: 0,
        lessonsLearned: ['Something went wrong analyzing your results.'],
      };
      set({ outcomeAnalysis: fallbackAnalysis });
      return fallbackAnalysis;
    }
  },

  // Restart the current scenario
  restartScenario: async () => {
    const { activeScenario } = get();
    if (!activeScenario) return;

    await simulatorService.clearProgress(activeScenario.id);
    await get().startScenario(activeScenario.id);
  },

  // Exit with auto-save
  exitScenario: async () => {
    const { progress } = get();
    // Auto-save progress before clearing - only clear if save succeeds
    if (progress) {
      try {
        await simulatorService.saveProgress(progress);
      } catch (error) {
        // Save failed - don't clear state to preserve user progress
        console.error('Failed to save progress on exit:', error);
        return; // Don't clear state, user can retry
      }
    }
    set({
      activeScenario: null,
      currentScene: null,
      progress: null,
      currentDialogIndex: 0,
      isDialogComplete: false,
      showingChoices: false,
      isTransitioning: false,
      lastChoiceFeedback: null,
      pendingSceneTransition: null,
      pendingProgress: null,
      outcomeAnalysis: null,
    });
  },
}));

// Stable empty object for selectors (prevents infinite loops with useSyncExternalStore)
const EMPTY_PROGRESS = { current: 0, total: 0 } as const;

// Selectors
export const selectCurrentDialogLine = (state: SimulatorState) => {
  if (!state.currentScene) return null;
  return state.currentScene.dialog[state.currentDialogIndex] || null;
};

export const selectIsEnding = (state: SimulatorState) => {
  return state.currentScene?.isEnding || false;
};

// Note: This selector returns a new object - use with shallow equality or memoize in component
export const selectDialogProgress = (state: SimulatorState) => {
  if (!state.currentScene) return EMPTY_PROGRESS;
  return {
    current: state.currentDialogIndex + 1,
    total: state.currentScene.dialog.length,
  };
};

// Get inner voice text when showing choices (last dialog line if inner-voice)
export const selectInnerVoiceForChoices = (state: SimulatorState) => {
  if (!state.currentScene || !state.showingChoices) return null;
  const lastLine = state.currentScene.dialog[state.currentScene.dialog.length - 1];
  if (lastLine?.speakerId === 'inner-voice' || lastLine?.speakerId === 'inner') {
    return lastLine.text;
  }
  return null;
};

// Get the last NPC line (for keeping visible during choices)
export const selectLastNPCLine = (state: SimulatorState) => {
  if (!state.currentScene) return null;
  for (let i = state.currentScene.dialog.length - 1; i >= 0; i--) {
    const line = state.currentScene.dialog[i];
    if (line.speakerId !== 'inner-voice' && line.speakerId !== 'inner') {
      return line;
    }
  }
  return null;
};
// Get the last speaking character ID (for keeping portrait visible during narration)
export const selectLastSpeakerId = (state: SimulatorState) => {
  if (!state.currentScene) return null;
  // Look backwards from current dialog index to find the last character who spoke
  for (let i = state.currentDialogIndex; i >= 0; i--) {
    const line = state.currentScene.dialog[i];
    if (line.speakerId && line.speakerId !== 'inner-voice' && line.speakerId !== 'inner') {
      return line.speakerId;
    }
  }
  return null;
};

// Get last behavior engine result (for displaying dynamic NPC responses)
export const selectLastBehaviorResult = (state: SimulatorState) => {
  return state.lastBehaviorResult;
};

// Get interaction count (for behavior engine phase tracking)
export const selectInteractionCount = (state: SimulatorState) => {
  return state.interactionCount;
};

/**
 * Process current dialog line through behavior engine
 * Returns modified line if NPC behavior should alter it, otherwise original
 */
export const selectProcessedDialogLine = (
  state: SimulatorState,
  speakingCharacter?: Character
): ModifiedDialogLine | null => {
  if (!state.currentScene || !state.activeScenario) return null;

  const originalLine = state.currentScene.dialog[state.currentDialogIndex];
  if (!originalLine) return null;

  // If no speaker or inner voice, return as unmodified
  if (!originalLine.speakerId || originalLine.speakerId === 'inner-voice') {
    return { ...originalLine, wasModified: false };
  }

  // If we have a character, try to process through behavior engine
  if (speakingCharacter) {
    const context = getBehaviorContext(
      speakingCharacter,
      state.currentScene.id,
      state.interactionCount
    );

    if (context) {
      return processDialogLine(originalLine, context);
    }
  }

  // No behavior context, return unmodified
  return { ...originalLine, wasModified: false };
};
