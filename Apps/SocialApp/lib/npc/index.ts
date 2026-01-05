/**
 * NPC Behavior Engine Module
 *
 * Provides dynamic NPC behavior based on personality disorders:
 * - Lying, deception, and gaslighting
 * - Love-bombing and devaluation cycles
 * - Obsession tracking and behaviors
 * - Memory of player claims and contradiction detection
 * - Mask slip mechanics for high/low functioning personalities
 *
 * Usage:
 * ```typescript
 * import {
 *   getBehaviorContext,
 *   processDialogLine,
 *   processPlayerChoice
 * } from '@/lib/npc';
 *
 * // Get context for an NPC
 * const context = getBehaviorContext(character, sceneId);
 *
 * // Process dialogue through behavior engine
 * const modifiedLine = processDialogLine(line, context);
 *
 * // Process player choice and update memory
 * const result = processPlayerChoice(choice, context);
 * ```
 */

// Core behavior definitions
export {
  type LieType,
  type RelationshipPhase,
  type FunctioningLevel,
  type ObsessionBehavior,
  type MaskSlipTrigger,
  type PersonalityBehavior,
  PERSONALITY_BEHAVIORS,
  getPersonalityBehavior,
  isInLoveBombingPhase,
  isObsessed,
  shouldMaskSlip,
  getRandomLieType,
  getLoveBombingPhrase,
  getDevaluationPhrase,
  getMaskSlipPhrase,
} from './personalityBehaviors';

// Core behavior engine
export {
  type ModifiedDialogLine,
  type ChoiceProcessingResult,
  type BehaviorContext,
  initializeNPCMemory,
  getBehaviorContext,
  processDialogLine,
  processPlayerChoice,
  shouldNPCLie,
  detectMaskSlipTrigger,
  updateRelationshipPhase,
  getNPCStateSummary,
} from './behaviorEngine';

// Lie injection
export {
  type GeneratedLie,
  type LieContext,
  generateLie,
  injectLieIntoDialogue,
  generateTriangulationLie,
  generateGaslightingResponse,
  generateVictimResponse,
  assessLieLikelihood,
  getInnerVoiceHint,
} from './lieInjector';

// Obsession tracking
export {
  type ObsessionEvent,
  type ObsessionState,
  type ObsessionTriggerAction,
  getObsessionState,
  processObsessionTrigger,
  generateObsessionEvent,
  injectObsessionIntoDialogue,
  getObsessionWarning,
  calculateObsessionImpact,
  shouldOfferEscapeOption,
} from './obsessionTracker';
