// NPC Memory Store
// Tracks NPC memories, relationship states, and player claims for behavior engine

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RelationshipPhase } from '../lib/npc/personalityBehaviors';

/**
 * A claim the player made that NPCs can remember
 */
export interface ClaimRecord {
  /** Unique claim type identifier (e.g., 'no-gala-interest', 'promised-loyalty') */
  claimType: string;
  /** The actual text of what was said */
  claimText: string;
  /** Scene where this claim was made */
  sceneId: string;
  /** Timestamp of the claim */
  timestamp: number;
  /** Which NPC witnessed this claim (if any specific one) */
  witnessedBy?: string;
}

/**
 * Record of a detected contradiction
 */
export interface ContradictionRecord {
  /** Original claim type that was contradicted */
  originalClaimType: string;
  /** New claim/action that contradicted it */
  contradictingChoiceId: string;
  /** Scene where contradiction occurred */
  sceneId: string;
  /** Timestamp of detection */
  detectedAt: number;
  /** Whether NPC has confronted player about this */
  confronted: boolean;
}

/**
 * Memory state for a single NPC
 */
export interface NPCMemory {
  /** NPC character ID */
  npcId: string;

  // ===== Claim Tracking =====
  /** Claims player has made that this NPC witnessed */
  witnessedClaims: ClaimRecord[];
  /** Contradictions this NPC has detected */
  detectedContradictions: ContradictionRecord[];

  // ===== Relationship State =====
  /** Trust level from -100 (enemy) to +100 (devoted) */
  trustLevel: number;
  /** Current relationship phase with player */
  currentPhase: RelationshipPhase;
  /** How many scenes into the current phase */
  phaseProgress: number;

  // ===== Obsession State =====
  /** Obsession level from 0 to 100 */
  obsessionLevel: number;
  /** Whether obsession threshold has been crossed */
  isObsessed: boolean;
  /** What triggered the obsession */
  obsessionTriggers: string[];

  // ===== Interaction History =====
  /** Times player has validated/complimented this NPC */
  validationCount: number;
  /** Times player has rejected/criticized this NPC */
  rejectionCount: number;
  /** Times player has set boundaries */
  boundaryCount: number;
  /** Times player gave narcissistic supply (attention, admiration) */
  supplyCount: number;
  /** Last interaction sentiment */
  lastInteraction: 'positive' | 'negative' | 'neutral' | 'boundary';
  /** Last interaction timestamp */
  lastInteractionAt: number;

  // ===== Mask State =====
  /** Whether NPC's mask has slipped in current session */
  maskHasSlipped: boolean;
  /** How many times mask has slipped total */
  maskSlipCount: number;
}

/**
 * Global player claims (not NPC-specific)
 */
export interface GlobalClaims {
  /** All claims player has made across all scenes */
  allClaims: ClaimRecord[];
}

interface NPCMemoryState {
  // Memory by NPC ID
  memories: Record<string, NPCMemory>;

  // Global player claims
  globalClaims: GlobalClaims;

  // Current scenario context
  currentScenarioId: string | null;

  // Actions - Memory Management
  initializeNPC: (npcId: string) => void;
  getMemory: (npcId: string) => NPCMemory | undefined;
  clearScenarioMemory: (scenarioId: string) => void;
  clearAllMemory: () => void;

  // Actions - Claims
  recordClaim: (claim: ClaimRecord, witnessNpcIds?: string[]) => void;
  checkForContradiction: (npcId: string, claimType: string, contradicts: string[]) => ContradictionRecord | null;
  markContradictionConfronted: (npcId: string, originalClaimType: string) => void;

  // Actions - Relationship
  adjustTrust: (npcId: string, delta: number) => void;
  setPhase: (npcId: string, phase: RelationshipPhase) => void;
  advancePhase: (npcId: string) => void;

  // Actions - Obsession
  adjustObsession: (npcId: string, delta: number) => void;
  triggerObsession: (npcId: string, trigger: string) => void;

  // Actions - Interactions
  recordInteraction: (
    npcId: string,
    type: 'validation' | 'rejection' | 'boundary' | 'supply' | 'neutral'
  ) => void;

  // Actions - Mask
  triggerMaskSlip: (npcId: string) => void;
  recoverMask: (npcId: string) => void;

  // Selectors
  hasUnconfrontedContradiction: (npcId: string) => boolean;
  getContradictionsForNPC: (npcId: string) => ContradictionRecord[];
  getTrustLevel: (npcId: string) => number;
  getObsessionLevel: (npcId: string) => number;
  isNPCObsessed: (npcId: string) => boolean;
  getCurrentPhase: (npcId: string) => RelationshipPhase;
}

/**
 * Create default memory for a new NPC
 */
function createDefaultMemory(npcId: string): NPCMemory {
  return {
    npcId,
    witnessedClaims: [],
    detectedContradictions: [],
    trustLevel: 0,
    currentPhase: 'assessment',
    phaseProgress: 0,
    obsessionLevel: 0,
    isObsessed: false,
    obsessionTriggers: [],
    validationCount: 0,
    rejectionCount: 0,
    boundaryCount: 0,
    supplyCount: 0,
    lastInteraction: 'neutral',
    lastInteractionAt: Date.now(),
    maskHasSlipped: false,
    maskSlipCount: 0,
  };
}

export const useNPCMemoryStore = create<NPCMemoryState>()(
  persist(
    (set, get) => ({
      memories: {},
      globalClaims: { allClaims: [] },
      currentScenarioId: null,

      // ===== Memory Management =====

      initializeNPC: (npcId: string) => {
        const { memories } = get();
        if (!memories[npcId]) {
          set({
            memories: {
              ...memories,
              [npcId]: createDefaultMemory(npcId),
            },
          });
        }
      },

      getMemory: (npcId: string) => {
        return get().memories[npcId];
      },

      clearScenarioMemory: (_scenarioId: string) => {
        // For now, clear all memories when scenario ends
        // In future, could persist cross-scenario memories for recurring NPCs
        set({
          memories: {},
          globalClaims: { allClaims: [] },
        });
      },

      clearAllMemory: () => {
        set({
          memories: {},
          globalClaims: { allClaims: [] },
          currentScenarioId: null,
        });
      },

      // ===== Claims =====

      recordClaim: (claim: ClaimRecord, witnessNpcIds?: string[]) => {
        const { globalClaims, memories } = get();

        // Add to global claims
        const newGlobalClaims = {
          allClaims: [...globalClaims.allClaims, claim],
        };

        // Add to each witnessing NPC's memory
        const updatedMemories = { ...memories };
        if (witnessNpcIds) {
          for (const npcId of witnessNpcIds) {
            if (!updatedMemories[npcId]) {
              updatedMemories[npcId] = createDefaultMemory(npcId);
            }
            updatedMemories[npcId] = {
              ...updatedMemories[npcId],
              witnessedClaims: [...updatedMemories[npcId].witnessedClaims, claim],
            };
          }
        }

        set({
          globalClaims: newGlobalClaims,
          memories: updatedMemories,
        });
      },

      checkForContradiction: (npcId: string, _claimType: string, contradicts: string[]) => {
        const { memories, globalClaims } = get();
        const memory = memories[npcId];

        if (!memory || contradicts.length === 0) return null;

        // Check if any of the contradicting claims exist in global claims
        for (const contradictedType of contradicts) {
          const originalClaim = globalClaims.allClaims.find(
            c => c.claimType === contradictedType
          );

          if (originalClaim) {
            // Found a contradiction!
            const contradiction: ContradictionRecord = {
              originalClaimType: contradictedType,
              contradictingChoiceId: _claimType,
              sceneId: '', // Will be filled by caller
              detectedAt: Date.now(),
              confronted: false,
            };

            // Record the contradiction
            const updatedMemory = {
              ...memory,
              detectedContradictions: [...memory.detectedContradictions, contradiction],
              trustLevel: Math.max(-100, memory.trustLevel - 15), // Trust penalty
            };

            set({
              memories: {
                ...memories,
                [npcId]: updatedMemory,
              },
            });

            return contradiction;
          }
        }

        return null;
      },

      markContradictionConfronted: (npcId: string, originalClaimType: string) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        const updatedContradictions = memory.detectedContradictions.map(c =>
          c.originalClaimType === originalClaimType ? { ...c, confronted: true } : c
        );

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              detectedContradictions: updatedContradictions,
            },
          },
        });
      },

      // ===== Relationship =====

      adjustTrust: (npcId: string, delta: number) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        const newTrust = Math.max(-100, Math.min(100, memory.trustLevel + delta));

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              trustLevel: newTrust,
            },
          },
        });
      },

      setPhase: (npcId: string, phase: RelationshipPhase) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              currentPhase: phase,
              phaseProgress: 0,
            },
          },
        });
      },

      advancePhase: (npcId: string) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        const phaseOrder: RelationshipPhase[] = [
          'assessment',
          'idealization',
          'devaluation',
          'discard',
          'hoover',
        ];

        const currentIndex = phaseOrder.indexOf(memory.currentPhase);
        if (currentIndex < phaseOrder.length - 1) {
          set({
            memories: {
              ...memories,
              [npcId]: {
                ...memory,
                currentPhase: phaseOrder[currentIndex + 1],
                phaseProgress: 0,
              },
            },
          });
        }
      },

      // ===== Obsession =====

      adjustObsession: (npcId: string, delta: number) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        const newLevel = Math.max(0, Math.min(100, memory.obsessionLevel + delta));
        const nowObsessed = newLevel >= 60; // Default threshold

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              obsessionLevel: newLevel,
              isObsessed: nowObsessed,
            },
          },
        });
      },

      triggerObsession: (npcId: string, trigger: string) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              isObsessed: true,
              obsessionLevel: Math.max(60, memory.obsessionLevel),
              obsessionTriggers: [...memory.obsessionTriggers, trigger],
            },
          },
        });
      },

      // ===== Interactions =====

      recordInteraction: (
        npcId: string,
        type: 'validation' | 'rejection' | 'boundary' | 'supply' | 'neutral'
      ) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        const updates: Partial<NPCMemory> = {
          lastInteractionAt: Date.now(),
        };

        switch (type) {
          case 'validation':
            updates.validationCount = memory.validationCount + 1;
            updates.lastInteraction = 'positive';
            break;
          case 'rejection':
            updates.rejectionCount = memory.rejectionCount + 1;
            updates.lastInteraction = 'negative';
            break;
          case 'boundary':
            updates.boundaryCount = memory.boundaryCount + 1;
            updates.lastInteraction = 'boundary';
            break;
          case 'supply':
            updates.supplyCount = memory.supplyCount + 1;
            updates.lastInteraction = 'positive';
            break;
          case 'neutral':
            updates.lastInteraction = 'neutral';
            break;
        }

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              ...updates,
            },
          },
        });
      },

      // ===== Mask =====

      triggerMaskSlip: (npcId: string) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              maskHasSlipped: true,
              maskSlipCount: memory.maskSlipCount + 1,
            },
          },
        });
      },

      recoverMask: (npcId: string) => {
        const { memories } = get();
        const memory = memories[npcId];
        if (!memory) return;

        set({
          memories: {
            ...memories,
            [npcId]: {
              ...memory,
              maskHasSlipped: false,
            },
          },
        });
      },

      // ===== Selectors =====

      hasUnconfrontedContradiction: (npcId: string) => {
        const memory = get().memories[npcId];
        if (!memory) return false;
        return memory.detectedContradictions.some(c => !c.confronted);
      },

      getContradictionsForNPC: (npcId: string) => {
        const memory = get().memories[npcId];
        return memory?.detectedContradictions || [];
      },

      getTrustLevel: (npcId: string) => {
        const memory = get().memories[npcId];
        return memory?.trustLevel || 0;
      },

      getObsessionLevel: (npcId: string) => {
        const memory = get().memories[npcId];
        return memory?.obsessionLevel || 0;
      },

      isNPCObsessed: (npcId: string) => {
        const memory = get().memories[npcId];
        return memory?.isObsessed || false;
      },

      getCurrentPhase: (npcId: string) => {
        const memory = get().memories[npcId];
        return memory?.currentPhase || 'assessment';
      },
    }),
    {
      name: 'npc-memory-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist essential data, not computed state
      partialize: (state) => ({
        memories: state.memories,
        globalClaims: state.globalClaims,
      }),
    }
  )
);

// Convenience selectors for use in components
export const selectNPCMemory = (npcId: string) => (state: NPCMemoryState) =>
  state.memories[npcId];

export const selectGlobalClaims = (state: NPCMemoryState) => state.globalClaims;

export const selectHasLied = (state: NPCMemoryState) =>
  Object.values(state.memories).some(m => m.detectedContradictions.length > 0);
