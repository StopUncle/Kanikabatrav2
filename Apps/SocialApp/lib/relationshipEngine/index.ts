// Relationship Engine
// Pluggable system for relationship tracking, mood randomization, and story convergence
//
// Usage:
//   import { createRelationshipEngine } from '../lib/relationshipEngine';
//   const engine = createRelationshipEngine(scenarioConfig);

export * from './types';
export { RelationshipTracker, relationshipTracker } from './RelationshipTracker';
export { MoodRandomizer, createMoodRandomizer } from './MoodRandomizer';
export { SceneResolver, createSceneTemplate, createVariant } from './SceneResolver';
export { StoryConvergenceManager, createConvergencePoint } from './StoryConvergence';

import { RelationshipTracker } from './RelationshipTracker';
import { MoodRandomizer } from './MoodRandomizer';
import { SceneResolver } from './SceneResolver';
import { StoryConvergenceManager } from './StoryConvergence';
import {
  RelationshipCharacter,
  RelationshipGameState,
  BetrayalConfig,
  ConvergencePoint,
} from './types';

/**
 * Scenario configuration for relationship engine
 */
export interface RelationshipEngineConfig {
  scenarioId: string;
  // Characters with their archetypes and traits
  characters: RelationshipCharacter[];
  // Betrayal configurations (optional)
  betrayals?: BetrayalConfig[];
  // Convergence points (optional)
  convergencePoints?: ConvergencePoint[];
  // Initial relationship values (optional, defaults to 50)
  initialRelationships?: {
    characterId: string;
    rapport?: number;
    respect?: number;
    loyalty?: number;
  }[];
  // Seed for randomization (optional, uses timestamp if not provided)
  seed?: number;
}

/**
 * RelationshipEngine is the main interface for scenarios
 */
export class RelationshipEngine {
  public readonly tracker: RelationshipTracker;
  public readonly mood: MoodRandomizer;
  public readonly resolver: SceneResolver;
  public readonly convergence: StoryConvergenceManager;

  private config: RelationshipEngineConfig;
  private sessionId: string;

  constructor(config: RelationshipEngineConfig) {
    this.config = config;
    this.sessionId = `${config.scenarioId}-${Date.now()}`;

    // Initialize components
    this.tracker = new RelationshipTracker();
    this.mood = new MoodRandomizer(config.seed);
    this.resolver = new SceneResolver(this.tracker, this.mood);
    this.convergence = new StoryConvergenceManager(this.tracker);

    // Initialize characters
    this.initializeCharacters();

    // Configure betrayals
    if (config.betrayals) {
      for (const betrayal of config.betrayals) {
        this.tracker.configureBetayal(betrayal);
      }
    }

    // Register convergence points
    if (config.convergencePoints) {
      for (const point of config.convergencePoints) {
        this.convergence.registerConvergencePoint(point);
      }
    }
  }

  /**
   * Initialize all characters with relationships and moods
   */
  private initializeCharacters(): void {
    for (const character of this.config.characters) {
      // Find initial values or use defaults
      const initial = this.config.initialRelationships?.find(
        r => r.characterId === character.id
      );

      // Initialize relationship
      this.tracker.initializeRelationship(
        character.id,
        initial?.rapport ?? 50,
        initial?.respect ?? 50,
        initial?.loyalty ?? 50
      );

      // Initialize mood (randomized per playthrough)
      this.mood.initializeCharacterMood(character);
    }
  }

  /**
   * Handle a player choice and update all systems
   */
  handleChoice(
    sceneId: string,
    choiceId: string,
    targetCharacterId: string,
    description: string,
    deltas: {
      rapport?: number;
      respect?: number;
      loyalty?: number;
    } = {}
  ): void {
    // Record interaction
    this.tracker.recordInteraction(
      targetCharacterId,
      sceneId,
      choiceId,
      deltas.rapport ?? 0,
      deltas.respect ?? 0,
      deltas.loyalty ?? 0,
      description
    );

    // Check for mood triggers based on the choice
    // (implementation depends on choice metadata)

    // Apply ripple effects to connected characters
    const character = this.config.characters.find(c => c.id === targetCharacterId);
    if (character && character.relationships.length > 0) {
      this.tracker.applyRippleEffect(
        targetCharacterId,
        character.relationships.map(r => ({
          targetId: r.targetCharacterId,
          multiplier: r.rippleEffect,
        })),
        deltas.rapport ?? 0,
        deltas.respect ?? 0
      );
    }
  }

  /**
   * Check for betrayal outcome at climax
   */
  checkBetrayal(characterId: string): 'betrayal' | 'warning' | null {
    return this.tracker.getBetrayalOutcome(characterId);
  }

  /**
   * Get post-betrayal teaching text
   */
  getPostBetrayalTeaching(characterId: string): string[] {
    return this.tracker.getPostBetrayalAnalysis(characterId);
  }

  /**
   * Determine entry path to convergence point
   */
  getConvergenceEntry(convergenceId: string): { pathId: string; flavor: string } | null {
    return this.convergence.determineEntryPath(convergenceId);
  }

  /**
   * Get visible relationship stats for UI
   */
  getVisibleStats(characterId: string) {
    return this.tracker.getVisibleStats(characterId);
  }

  /**
   * Get current character mood for dialogue resolution
   */
  getCharacterMood(characterId: string) {
    return this.mood.getCurrentMood(characterId);
  }

  /**
   * Get mood description for narration
   */
  getMoodDescription(characterId: string): string {
    return this.mood.getPresentationDescription(characterId);
  }

  /**
   * Set a story flag
   */
  setFlag(flag: string): void {
    this.convergence.setFlag(flag);
  }

  /**
   * Check if flag is set
   */
  hasFlag(flag: string): boolean {
    return this.convergence.hasFlag(flag);
  }

  /**
   * Export complete state for save
   */
  exportState(): RelationshipGameState {
    return {
      sessionId: this.sessionId,
      scenarioId: this.config.scenarioId,
      relationships: this.tracker.exportState(),
      characterMoods: this.mood.exportState(),
      flags: new Set(this.convergence.exportState().flags),
      convergenceProgress: new Map(
        this.convergence.exportState().paths.map(p => [p.convergenceId, true])
      ),
      seed: this.mood.getSeed(),
    };
  }

  /**
   * Import state from save
   */
  importState(state: Partial<RelationshipGameState>): void {
    if (state.relationships) {
      this.tracker.importState(state.relationships);
    }
    if (state.characterMoods) {
      this.mood.importState(state.characterMoods);
    }
    if (state.flags) {
      this.convergence.importState({
        flags: Array.from(state.flags),
        paths: state.convergenceProgress
          ? Array.from(state.convergenceProgress).map(([id]) => ({
              convergenceId: id,
              pathId: '',
              entryFlavor: '',
              timestamp: 0,
            }))
          : [],
      });
    }
  }

  /**
   * Reset engine for new playthrough
   */
  reset(): void {
    this.tracker.reset();
    this.mood.reset();
    this.convergence.reset();
    this.sessionId = `${this.config.scenarioId}-${Date.now()}`;
    this.initializeCharacters();
  }

  /**
   * Generate end-of-game summary
   */
  generateSummary(): {
    pathsTaken: string[];
    relationships: { characterId: string; rapport: number; respect: number }[];
  } {
    return {
      pathsTaken: this.convergence.generatePathSummary(),
      relationships: this.config.characters.map(c => {
        const stats = this.tracker.getVisibleStats(c.id);
        return {
          characterId: c.id,
          rapport: stats?.rapport ?? 50,
          respect: stats?.respect ?? 50,
        };
      }),
    };
  }
}

/**
 * Factory function to create a relationship engine for a scenario
 */
export function createRelationshipEngine(config: RelationshipEngineConfig): RelationshipEngine {
  return new RelationshipEngine(config);
}
