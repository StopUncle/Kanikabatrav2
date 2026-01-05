/**
 * NPC Behavior Engine
 * Core orchestration module that modifies NPC responses based on personality + memory.
 * Layers dynamic behavior on top of authored content without breaking storylines.
 */

import type { DialogLine, DialogueChoice, EmotionType, Character } from '../../content/simulator/types';
import type { NPCMemory, ClaimRecord } from '../../stores/npcMemoryStore';
import { useNPCMemoryStore } from '../../stores/npcMemoryStore';
import {
  getPersonalityBehavior,
  isInLoveBombingPhase,
  isObsessed,
  shouldMaskSlip,
  getLoveBombingPhrase,
  getDevaluationPhrase,
  getMaskSlipPhrase,
  type PersonalityBehavior,
  type MaskSlipTrigger,
  type LieType,
} from './personalityBehaviors';

// ============================================
// TYPES
// ============================================

/**
 * Result of processing a dialogue line through the behavior engine
 */
export interface ModifiedDialogLine extends DialogLine {
  /** Whether this line was modified by the behavior engine */
  wasModified: boolean;
  /** Type of modification applied */
  modificationType?: 'love-bomb' | 'devaluation' | 'mask-slip' | 'confrontation' | 'obsession' | 'lie';
  /** Original text before modification (for debugging) */
  originalText?: string;
}

/**
 * Result of processing a player choice through the behavior engine
 */
export interface ChoiceProcessingResult {
  /** Whether a contradiction was detected */
  contradictionDetected: boolean;
  /** The contradiction record if detected */
  contradiction?: {
    originalClaim: string;
    newClaim: string;
  };
  /** Whether NPC should confront the player about the lie */
  shouldConfront: boolean;
  /** Whether this choice triggers obsession */
  triggersObsession: boolean;
  /** Whether this choice triggers mask slip */
  triggersMaskSlip: boolean;
  /** Updated emotion based on behavior */
  adjustedEmotion?: EmotionType;
}

/**
 * Context for behavior processing
 */
export interface BehaviorContext {
  /** The NPC character */
  character: Character;
  /** NPC's memory state */
  memory: NPCMemory;
  /** Personality behavior definition */
  behavior: PersonalityBehavior;
  /** Current scene ID */
  sceneId: string;
  /** Number of interactions in this session */
  interactionCount: number;
}

// ============================================
// CORE ENGINE FUNCTIONS
// ============================================

/**
 * Initialize NPC memory for a character if not already initialized
 */
export function initializeNPCMemory(characterId: string): void {
  useNPCMemoryStore.getState().initializeNPC(characterId);
}

/**
 * Get behavior context for an NPC
 */
export function getBehaviorContext(
  character: Character,
  sceneId: string,
  interactionCount: number = 0
): BehaviorContext | null {
  const personalityType = character.personalityType || 'neutral';
  const behavior = getPersonalityBehavior(personalityType);

  if (!behavior) {
    return null;
  }

  // Get or initialize memory
  const memoryStore = useNPCMemoryStore.getState();
  memoryStore.initializeNPC(character.id);
  const memory = memoryStore.getMemory(character.id);

  if (!memory) {
    return null;
  }

  return {
    character,
    memory,
    behavior,
    sceneId,
    interactionCount,
  };
}

/**
 * Process a dialogue line through the behavior engine
 * Modifies text/emotion based on NPC state and personality
 */
export function processDialogLine(
  line: DialogLine,
  context: BehaviorContext
): ModifiedDialogLine {
  const { behavior, memory, interactionCount } = context;

  // Start with unmodified line
  const result: ModifiedDialogLine = {
    ...line,
    wasModified: false,
  };

  // Skip narration (no speaker)
  if (!line.speakerId || line.speakerId === 'inner-voice') {
    return result;
  }

  // Only process if this is the NPC we have context for
  if (line.speakerId !== context.character.id) {
    return result;
  }

  // ===== MASK SLIP CHECK =====
  if (memory.maskHasSlipped) {
    const maskSlipPhrase = getMaskSlipPhrase(behavior);
    if (maskSlipPhrase && Math.random() < 0.3) { // 30% chance to inject mask slip language
      result.text = injectMaskSlipLanguage(line.text, maskSlipPhrase, behavior);
      result.emotion = 'angry';
      result.wasModified = true;
      result.modificationType = 'mask-slip';
      result.originalText = line.text;
      return result;
    }
  }

  // ===== OBSESSION CHECK =====
  if (memory.isObsessed) {
    const obsessionModified = applyObsessionModifier(line, behavior);
    if (obsessionModified) {
      result.text = obsessionModified.text;
      result.emotion = obsessionModified.emotion;
      result.wasModified = true;
      result.modificationType = 'obsession';
      result.originalText = line.text;
      return result;
    }
  }

  // ===== LOVE-BOMBING CHECK =====
  if (isInLoveBombingPhase(behavior, interactionCount)) {
    const loveBombPhrase = getLoveBombingPhrase(behavior);
    if (loveBombPhrase && Math.random() < 0.4) { // 40% chance to inject love-bombing
      result.text = injectLoveBombing(line.text, loveBombPhrase);
      result.emotion = 'seductive';
      result.wasModified = true;
      result.modificationType = 'love-bomb';
      result.originalText = line.text;
      return result;
    }
  }

  // ===== DEVALUATION CHECK =====
  const isDevaluing = memory.currentPhase === 'devaluation' || memory.currentPhase === 'discard';
  if (isDevaluing) {
    const devaluationPhrase = getDevaluationPhrase(behavior);
    if (devaluationPhrase && Math.random() < 0.35) { // 35% chance to inject devaluation
      result.text = injectDevaluation(line.text, devaluationPhrase);
      result.emotion = 'cold';
      result.wasModified = true;
      result.modificationType = 'devaluation';
      result.originalText = line.text;
      return result;
    }
  }

  // ===== CONFRONTATION CHECK =====
  const unconfronted = memory.detectedContradictions.filter(c => !c.confronted);
  if (unconfronted.length > 0 && Math.random() < 0.5) { // 50% chance to confront
    const contradiction = unconfronted[0];
    result.text = generateConfrontationDialogue(line.text, contradiction.originalClaimType, behavior);
    result.emotion = behavior.functioningLevel === 'high' ? 'cold' : 'angry';
    result.wasModified = true;
    result.modificationType = 'confrontation';
    result.originalText = line.text;

    // Mark as confronted
    useNPCMemoryStore.getState().markContradictionConfronted(
      context.character.id,
      contradiction.originalClaimType
    );

    return result;
  }

  return result;
}

/**
 * Process a player's choice and update NPC memory accordingly
 */
export function processPlayerChoice(
  choice: DialogueChoice,
  context: BehaviorContext
): ChoiceProcessingResult {
  const { behavior, memory, character, sceneId } = context;
  const memoryStore = useNPCMemoryStore.getState();

  const result: ChoiceProcessingResult = {
    contradictionDetected: false,
    shouldConfront: false,
    triggersObsession: false,
    triggersMaskSlip: false,
  };

  // ===== RECORD CLAIM =====
  if (choice.claimType) {
    const claim: ClaimRecord = {
      claimType: choice.claimType,
      claimText: choice.text,
      sceneId,
      timestamp: Date.now(),
      witnessedBy: character.id,
    };
    memoryStore.recordClaim(claim, [character.id]);
  }

  // ===== CHECK CONTRADICTION =====
  if (choice.contradicts && choice.contradicts.length > 0) {
    const contradiction = memoryStore.checkForContradiction(
      character.id,
      choice.claimType || choice.id,
      choice.contradicts
    );

    if (contradiction) {
      result.contradictionDetected = true;
      result.contradiction = {
        originalClaim: contradiction.originalClaimType,
        newClaim: choice.claimType || choice.id,
      };
      // High functioning NPCs wait to confront, low functioning confront immediately
      result.shouldConfront = behavior.functioningLevel === 'low';
    }
  }

  // ===== OBSESSION TRACKING =====
  if (choice.obsessionImpact) {
    memoryStore.adjustObsession(character.id, choice.obsessionImpact);
    const updatedMemory = memoryStore.getMemory(character.id);
    if (updatedMemory && isObsessed(behavior, updatedMemory.obsessionLevel)) {
      result.triggersObsession = true;
      memoryStore.triggerObsession(character.id, choice.id);
    }
  }

  // ===== INTERACTION TYPE TRACKING =====
  if (choice.interactionType) {
    memoryStore.recordInteraction(character.id, choice.interactionType);

    // Check for mask slip triggers based on interaction type
    if (choice.interactionType === 'rejection' && shouldMaskSlip(behavior, 'rejection')) {
      result.triggersMaskSlip = true;
      memoryStore.triggerMaskSlip(character.id);
    }
    if (choice.interactionType === 'boundary' && shouldMaskSlip(behavior, 'boundary-setting')) {
      result.triggersMaskSlip = true;
      memoryStore.triggerMaskSlip(character.id);
    }
  }

  // ===== EXPLICIT MASK SLIP TRIGGER =====
  if (choice.triggersMaskSlip) {
    result.triggersMaskSlip = true;
    memoryStore.triggerMaskSlip(character.id);
  }

  // ===== LOVE BOMB TRIGGER =====
  if (choice.triggersLoveBomb && behavior.loveBombingEnabled) {
    memoryStore.setPhase(character.id, 'idealization');
  }

  // ===== ADJUST EMOTION BASED ON STATE =====
  const updatedMemory = memoryStore.getMemory(character.id);
  if (updatedMemory) {
    result.adjustedEmotion = getAdjustedEmotion(
      choice.reaction.emotion,
      behavior,
      updatedMemory
    );
  }

  return result;
}

/**
 * Check if NPC should lie about something
 */
export function shouldNPCLie(
  behavior: PersonalityBehavior,
  lieType: LieType
): boolean {
  if (!behavior.lieTypes.includes(lieType)) {
    return false;
  }
  return Math.random() < behavior.lieProbability;
}

/**
 * Determine the appropriate mask slip trigger based on player action
 */
export function detectMaskSlipTrigger(
  choice: DialogueChoice
): MaskSlipTrigger | null {
  const text = choice.text.toLowerCase();

  // Check for narcissistic injury (ego attacks)
  if (text.includes('not impressive') || text.includes('not that special') || text.includes('overrated')) {
    return 'narcissistic-injury';
  }

  // Check for rejection
  if (text.includes('not interested') || text.includes('no thanks') || text.includes('leave me alone')) {
    return 'rejection';
  }

  // Check for boundary setting
  if (text.includes('i need space') || text.includes('stop') || text.includes('boundary')) {
    return 'boundary-setting';
  }

  // Check for calling out lies
  if (text.includes('lying') || text.includes('not true') || text.includes('manipulating')) {
    return 'caught-lying';
  }

  // Check for public humiliation
  if (choice.reaction?.bodyLanguage?.toLowerCase().includes('public') ||
      choice.reaction?.bodyLanguage?.toLowerCase().includes('crowd')) {
    return 'public-humiliation';
  }

  return null;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Inject love-bombing language into dialogue
 */
function injectLoveBombing(originalText: string, loveBombPhrase: string): string {
  // Add before or after based on sentence structure
  if (originalText.endsWith('?')) {
    return `${loveBombPhrase} ${originalText}`;
  }
  return `${originalText} ${loveBombPhrase}`;
}

/**
 * Inject devaluation language into dialogue
 */
function injectDevaluation(originalText: string, devaluationPhrase: string): string {
  // Usually append devaluation as an aside
  return `${originalText} ${devaluationPhrase}`;
}

/**
 * Inject mask slip language into dialogue
 */
function injectMaskSlipLanguage(
  originalText: string,
  maskSlipPhrase: string,
  behavior: PersonalityBehavior
): string {
  // Low functioning: replace entirely
  // High functioning: append with control
  if (behavior.functioningLevel === 'low') {
    return maskSlipPhrase;
  }
  return `${originalText} ${maskSlipPhrase}`;
}

/**
 * Apply obsession modifiers to dialogue
 */
function applyObsessionModifier(
  line: DialogLine,
  behavior: PersonalityBehavior
): { text: string; emotion: EmotionType } | null {
  const obsessionBehaviors = behavior.obsessionBehaviors;

  if (obsessionBehaviors.includes('possessive-language')) {
    return {
      text: `${line.text} You know I've been thinking about you. A lot.`,
      emotion: 'seductive',
    };
  }

  if (obsessionBehaviors.includes('jealousy-probing')) {
    return {
      text: `${line.text} By the way, who were you talking to earlier?`,
      emotion: 'neutral',
    };
  }

  if (obsessionBehaviors.includes('abandonment-panic')) {
    return {
      text: `${line.text} You're not leaving, are you? You can't leave.`,
      emotion: 'pleading',
    };
  }

  if (obsessionBehaviors.includes('predatory-focus')) {
    return {
      text: `${line.text} I've been watching you. You're very... interesting.`,
      emotion: 'cold',
    };
  }

  return null;
}

/**
 * Generate dialogue for confronting a lie
 */
function generateConfrontationDialogue(
  originalText: string,
  originalClaimType: string,
  behavior: PersonalityBehavior
): string {
  // Claim type to readable phrase
  const claimPhrases: Record<string, string> = {
    'no-agenda': 'you had no agenda',
    'not-interested': 'you weren\'t interested',
    'promised-loyalty': 'you were loyal',
    'no-gala-interest': 'you didn\'t care about the gala',
    'just-studying': 'you were just here to study',
  };

  const claimPhrase = claimPhrases[originalClaimType] || 'something different';

  if (behavior.functioningLevel === 'high') {
    return `Wait. ${originalText} But didn't you tell me ${claimPhrase}? I remember everything.`;
  }

  return `You told me ${claimPhrase}! You lied to me!`;
}

/**
 * Adjust emotion based on NPC state
 */
function getAdjustedEmotion(
  baseEmotion: EmotionType,
  behavior: PersonalityBehavior,
  memory: NPCMemory
): EmotionType {
  // Mask slip overrides everything
  if (memory.maskHasSlipped) {
    return behavior.functioningLevel === 'high' ? 'cold' : 'angry';
  }

  // Obsession affects emotion
  if (memory.isObsessed) {
    if (behavior.obsessionBehaviors.includes('abandonment-panic')) {
      return 'pleading';
    }
    if (behavior.obsessionBehaviors.includes('predatory-focus')) {
      return 'cold';
    }
    return 'seductive';
  }

  // Phase affects emotion
  switch (memory.currentPhase) {
    case 'idealization':
      return 'seductive';
    case 'devaluation':
      return 'cold';
    case 'discard':
      return 'neutral';
    case 'hoover':
      return 'seductive';
    default:
      return baseEmotion;
  }
}

/**
 * Calculate relationship phase transition based on memory state
 */
export function updateRelationshipPhase(context: BehaviorContext): void {
  const { behavior, memory, character } = context;
  const memoryStore = useNPCMemoryStore.getState();

  // Check for phase transitions based on behavior patterns
  switch (memory.currentPhase) {
    case 'assessment':
      // Move to idealization after enough positive interactions
      if (memory.validationCount >= 3 && behavior.loveBombingEnabled) {
        memoryStore.setPhase(character.id, 'idealization');
      }
      break;

    case 'idealization':
      // Move to devaluation after triggers or time
      if (memory.boundaryCount >= 2 || memory.rejectionCount >= 1) {
        memoryStore.setPhase(character.id, 'devaluation');
      }
      break;

    case 'devaluation':
      // Move to discard after sustained rejection
      if (memory.rejectionCount >= 3 || memory.boundaryCount >= 4) {
        memoryStore.setPhase(character.id, 'discard');
      }
      break;

    case 'discard':
      // Move to hoover if player shows renewed interest
      if (memory.validationCount > memory.rejectionCount + 3) {
        memoryStore.setPhase(character.id, 'hoover');
      }
      break;

    case 'hoover':
      // Back to idealization if successful
      if (memory.supplyCount >= 2) {
        memoryStore.setPhase(character.id, 'idealization');
      }
      break;
  }
}

/**
 * Get current NPC state summary for debugging/display
 */
export function getNPCStateSummary(characterId: string): {
  phase: string;
  trust: number;
  obsession: number;
  isObsessed: boolean;
  maskSlipped: boolean;
  contradictions: number;
} | null {
  const memory = useNPCMemoryStore.getState().getMemory(characterId);
  if (!memory) return null;

  return {
    phase: memory.currentPhase,
    trust: memory.trustLevel,
    obsession: memory.obsessionLevel,
    isObsessed: memory.isObsessed,
    maskSlipped: memory.maskHasSlipped,
    contradictions: memory.detectedContradictions.length,
  };
}
