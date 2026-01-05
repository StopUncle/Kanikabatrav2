/**
 * useNPCBehavior Hook
 *
 * Provides NPC behavior modifications for the simulator.
 * Use this hook in SimulatorScene to get behavior-modified dialogue
 * and to process player choices through the behavior engine.
 */

import { useCallback, useMemo } from 'react';
import { useSimulatorStore } from '../stores/simulatorStore';
import { useNPCMemoryStore } from '../stores/npcMemoryStore';
import type { Character, DialogLine, DialogueChoice, ForkScene } from '../content/simulator/types';
import {
  getBehaviorContext,
  processDialogLine,
  processPlayerChoice,
  initializeNPCMemory,
  type ModifiedDialogLine,
  type ChoiceProcessingResult,
} from '../lib/npc';
import {
  getObsessionState,
  getObsessionWarning,
  type ObsessionState,
} from '../lib/npc/obsessionTracker';
import { getInnerVoiceHint, assessLieLikelihood } from '../lib/npc/lieInjector';
import { getPersonalityBehavior } from '../lib/npc/personalityBehaviors';

export interface NPCBehaviorState {
  /** Get modified dialog line with behavior injections */
  getModifiedDialogLine: (line: DialogLine, characterId: string) => ModifiedDialogLine;

  /** Process a dialogue choice and update NPC memory */
  handleDialogueChoice: (choice: DialogueChoice, characterId: string) => ChoiceProcessingResult;

  /** Get inner voice hint for current situation */
  getInnerVoiceHint: (characterId: string, statement?: string) => string | null;

  /** Get obsession state for an NPC */
  getObsessionState: (characterId: string) => ObsessionState | null;

  /** Check if an NPC statement is likely a lie */
  assessStatementTruth: (characterId: string, statement: string) => {
    isLikelyLie: boolean;
    confidence: number;
    likelyType: string | null;
  };

  /** Initialize NPC memory for scenario characters */
  initializeScenarioNPCs: (characters: Character[]) => void;

  /** Clear NPC memory when scenario ends */
  clearScenarioNPCs: () => void;

  /** Get current interaction count for an NPC */
  getInteractionCount: (characterId: string) => number;
}

/**
 * Hook to access NPC behavior engine functionality
 */
export function useNPCBehavior(): NPCBehaviorState {
  const activeScenario = useSimulatorStore((state) => state.activeScenario);
  const currentScene = useSimulatorStore((state) => state.currentScene);
  const { memories, initializeNPC, clearAllMemory } = useNPCMemoryStore();

  // Get character from scenario
  const getCharacter = useCallback((characterId: string): Character | null => {
    if (!activeScenario) return null;
    return activeScenario.characters.find((c) => c.id === characterId) || null;
  }, [activeScenario]);

  // Get interaction count from memory
  const getInteractionCount = useCallback((characterId: string): number => {
    const memory = memories[characterId];
    if (!memory) return 0;
    return memory.validationCount + memory.rejectionCount + memory.boundaryCount + memory.supplyCount;
  }, [memories]);

  // Initialize NPC memory for scenario characters
  const initializeScenarioNPCs = useCallback((characters: Character[]) => {
    for (const character of characters) {
      initializeNPCMemory(character.id);
    }
  }, []);

  // Clear NPC memory
  const clearScenarioNPCs = useCallback(() => {
    clearAllMemory();
  }, [clearAllMemory]);

  // Get modified dialog line
  const getModifiedDialogLine = useCallback((
    line: DialogLine,
    characterId: string
  ): ModifiedDialogLine => {
    const character = getCharacter(characterId);
    if (!character) {
      return { ...line, wasModified: false };
    }

    const sceneId = currentScene?.id || '';
    const interactionCount = getInteractionCount(characterId);
    const context = getBehaviorContext(character, sceneId, interactionCount);

    if (!context) {
      return { ...line, wasModified: false };
    }

    return processDialogLine(line, context);
  }, [getCharacter, currentScene, getInteractionCount]);

  // Handle dialogue choice
  const handleDialogueChoice = useCallback((
    choice: DialogueChoice,
    characterId: string
  ): ChoiceProcessingResult => {
    const character = getCharacter(characterId);
    if (!character) {
      return {
        contradictionDetected: false,
        shouldConfront: false,
        triggersObsession: false,
        triggersMaskSlip: false,
      };
    }

    const sceneId = currentScene?.id || '';
    const interactionCount = getInteractionCount(characterId);
    const context = getBehaviorContext(character, sceneId, interactionCount);

    if (!context) {
      return {
        contradictionDetected: false,
        shouldConfront: false,
        triggersObsession: false,
        triggersMaskSlip: false,
      };
    }

    return processPlayerChoice(choice, context);
  }, [getCharacter, currentScene, getInteractionCount]);

  // Get inner voice hint
  const getInnerVoiceHintForNPC = useCallback((
    characterId: string,
    statement?: string
  ): string | null => {
    const character = getCharacter(characterId);
    if (!character) return null;

    const behavior = getPersonalityBehavior(character.personalityType || 'neutral');
    if (!behavior) return null;

    // Check for obsession warning
    const obsessionState = getObsessionState(characterId, behavior);
    const obsessionWarning = getObsessionWarning(obsessionState, behavior);
    if (obsessionWarning) {
      return obsessionWarning;
    }

    // Check for lie hint if statement provided
    if (statement && behavior.lieProbability > 0.3) {
      const assessment = assessLieLikelihood(statement, behavior);
      if (assessment.isLikelyLie && assessment.likelyType) {
        const hint = getInnerVoiceHint(assessment.likelyType, assessment.confidence);
        if (hint) return hint;
      }
    }

    return null;
  }, [getCharacter]);

  // Get obsession state
  const getObsessionStateForNPC = useCallback((characterId: string): ObsessionState | null => {
    const character = getCharacter(characterId);
    if (!character) return null;

    const behavior = getPersonalityBehavior(character.personalityType || 'neutral');
    if (!behavior) return null;

    return getObsessionState(characterId, behavior);
  }, [getCharacter]);

  // Assess if statement is likely a lie
  const assessStatementTruth = useCallback((
    characterId: string,
    statement: string
  ): { isLikelyLie: boolean; confidence: number; likelyType: string | null } => {
    const character = getCharacter(characterId);
    if (!character) {
      return { isLikelyLie: false, confidence: 0, likelyType: null };
    }

    const behavior = getPersonalityBehavior(character.personalityType || 'neutral');
    if (!behavior) {
      return { isLikelyLie: false, confidence: 0, likelyType: null };
    }

    return assessLieLikelihood(statement, behavior);
  }, [getCharacter]);

  return {
    getModifiedDialogLine,
    handleDialogueChoice,
    getInnerVoiceHint: getInnerVoiceHintForNPC,
    getObsessionState: getObsessionStateForNPC,
    assessStatementTruth,
    initializeScenarioNPCs,
    clearScenarioNPCs,
    getInteractionCount,
  };
}

/**
 * Hook to get behavior-modified dialog for current scene
 * Automatically processes dialog through behavior engine
 */
export function useModifiedDialog() {
  const currentScene = useSimulatorStore((state) => state.currentScene) as ForkScene | null;
  const currentDialogIndex = useSimulatorStore((state) => state.currentDialogIndex);
  const activeScenario = useSimulatorStore((state) => state.activeScenario);
  const { getModifiedDialogLine } = useNPCBehavior();

  return useMemo(() => {
    if (!currentScene || !currentScene.dialog) {
      return null;
    }

    const currentLine = currentScene.dialog[currentDialogIndex];
    if (!currentLine) {
      return null;
    }

    // If no speaker or inner voice, return as-is
    if (!currentLine.speakerId || currentLine.speakerId === 'inner-voice') {
      return { ...currentLine, wasModified: false } as ModifiedDialogLine;
    }

    // Get the character
    const character = activeScenario?.characters.find(c => c.id === currentLine.speakerId);
    if (!character) {
      return { ...currentLine, wasModified: false } as ModifiedDialogLine;
    }

    // Process through behavior engine
    return getModifiedDialogLine(currentLine, character.id);
  }, [currentScene, currentDialogIndex, activeScenario, getModifiedDialogLine]);
}

/**
 * Hook to get NPC state summary for debugging/display
 */
export function useNPCStateSummary(characterId: string | null) {
  const { memories } = useNPCMemoryStore();

  return useMemo(() => {
    if (!characterId) return null;

    const memory = memories[characterId];
    if (!memory) return null;

    return {
      trustLevel: memory.trustLevel,
      phase: memory.currentPhase,
      obsessionLevel: memory.obsessionLevel,
      isObsessed: memory.isObsessed,
      maskSlipped: memory.maskHasSlipped,
      contradictions: memory.detectedContradictions.length,
      validations: memory.validationCount,
      rejections: memory.rejectionCount,
    };
  }, [characterId, memories]);
}
