// Relationship Tracker
// Manages all relationship states for characters

import {
  RelationshipState,
  VisibleRelationship,
  HiddenRelationship,
  InteractionRecord,
  RelationshipTier,
  getRelationshipTier,
  BetrayalConfig,
} from './types';

/**
 * Clamp value between 0-100
 */
function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * RelationshipTracker manages all character relationship states
 */
export class RelationshipTracker {
  private relationships: Map<string, RelationshipState> = new Map();
  private betrayalConfigs: Map<string, BetrayalConfig> = new Map();
  private foreshadowingCallbacks: ((characterId: string, message: string) => void)[] = [];

  /**
   * Initialize relationship with a character
   */
  initializeRelationship(
    characterId: string,
    initialRapport = 50,
    initialRespect = 50,
    initialLoyalty = 50
  ): RelationshipState {
    const state: RelationshipState = {
      characterId,
      visible: {
        rapport: clamp(initialRapport),
        respect: clamp(initialRespect),
      },
      hidden: {
        trueLoyalty: clamp(initialLoyalty),
      },
      foreshadowingTriggered: [],
      interactionHistory: [],
    };

    this.relationships.set(characterId, state);
    return state;
  }

  /**
   * Get current relationship state
   */
  getRelationship(characterId: string): RelationshipState | undefined {
    return this.relationships.get(characterId);
  }

  /**
   * Get visible stats only (what player can see)
   */
  getVisibleStats(characterId: string): VisibleRelationship | undefined {
    return this.relationships.get(characterId)?.visible;
  }

  /**
   * Get relationship tier for scene variant selection
   */
  getRapportTier(characterId: string): RelationshipTier {
    const rel = this.relationships.get(characterId);
    if (!rel) return 'medium';
    return getRelationshipTier(rel.visible.rapport);
  }

  getRespectTier(characterId: string): RelationshipTier {
    const rel = this.relationships.get(characterId);
    if (!rel) return 'medium';
    return getRelationshipTier(rel.visible.respect);
  }

  getLoyaltyTier(characterId: string): RelationshipTier {
    const rel = this.relationships.get(characterId);
    if (!rel) return 'medium';
    return getRelationshipTier(rel.hidden.trueLoyalty);
  }

  /**
   * Record an interaction and update relationship
   */
  recordInteraction(
    characterId: string,
    sceneId: string,
    choiceId: string,
    rapportDelta: number,
    respectDelta: number,
    loyaltyDelta: number,
    description: string
  ): void {
    const rel = this.relationships.get(characterId);
    if (!rel) return;

    // Store previous loyalty for foreshadowing check
    const prevLoyalty = rel.hidden.trueLoyalty;

    // Update values
    rel.visible.rapport = clamp(rel.visible.rapport + rapportDelta);
    rel.visible.respect = clamp(rel.visible.respect + respectDelta);
    rel.hidden.trueLoyalty = clamp(rel.hidden.trueLoyalty + loyaltyDelta);

    // Record the interaction
    const record: InteractionRecord = {
      sceneId,
      choiceId,
      timestamp: Date.now(),
      rapportDelta,
      respectDelta,
      loyaltyDelta,
      description,
    };
    rel.interactionHistory.push(record);

    // Check for foreshadowing triggers
    this.checkForeshadowing(characterId, prevLoyalty, rel.hidden.trueLoyalty);
  }

  /**
   * Configure betrayal mechanic for a character
   */
  configureBetayal(config: BetrayalConfig): void {
    this.betrayalConfigs.set(config.characterId, config);
  }

  /**
   * Check if betrayal will occur
   */
  willBetray(characterId: string): boolean {
    const config = this.betrayalConfigs.get(characterId);
    const rel = this.relationships.get(characterId);
    if (!config || !rel) return false;

    return rel.hidden.trueLoyalty < config.loyaltyThreshold;
  }

  /**
   * Get appropriate outcome for betrayal scene
   */
  getBetrayalOutcome(characterId: string): 'betrayal' | 'warning' | null {
    const config = this.betrayalConfigs.get(characterId);
    const rel = this.relationships.get(characterId);
    if (!config || !rel) return null;

    return rel.hidden.trueLoyalty < config.loyaltyThreshold
      ? 'betrayal'
      : 'warning';
  }

  /**
   * Register callback for foreshadowing messages
   */
  onForeshadowing(callback: (characterId: string, message: string) => void): void {
    this.foreshadowingCallbacks.push(callback);
  }

  /**
   * Check and trigger foreshadowing based on loyalty changes
   */
  private checkForeshadowing(characterId: string, prevLoyalty: number, newLoyalty: number): void {
    const config = this.betrayalConfigs.get(characterId);
    const rel = this.relationships.get(characterId);
    if (!config || !rel) return;

    const threshold = config.loyaltyThreshold;
    const messages = config.foreshadowingMessages;

    let foreshadowMessage: string | null = null;

    // Loyalty dropping
    if (newLoyalty < prevLoyalty && newLoyalty < 60) {
      const droppingMessages = messages.dropping.filter(
        m => !rel.foreshadowingTriggered.includes(m)
      );
      if (droppingMessages.length > 0) {
        foreshadowMessage = droppingMessages[0];
      }
    }

    // Critical territory (near threshold)
    if (newLoyalty <= threshold + 10 && newLoyalty > threshold) {
      const criticalMessages = messages.critical.filter(
        m => !rel.foreshadowingTriggered.includes(m)
      );
      if (criticalMessages.length > 0) {
        foreshadowMessage = criticalMessages[0];
      }
    }

    // Loyalty rising
    if (newLoyalty > prevLoyalty && prevLoyalty < 60) {
      const risingMessages = messages.rising.filter(
        m => !rel.foreshadowingTriggered.includes(m)
      );
      if (risingMessages.length > 0) {
        foreshadowMessage = risingMessages[0];
      }
    }

    // Trigger foreshadowing
    if (foreshadowMessage) {
      rel.foreshadowingTriggered.push(foreshadowMessage);
      this.foreshadowingCallbacks.forEach(cb => cb(characterId, foreshadowMessage!));
    }
  }

  /**
   * Get post-betrayal teaching - what went wrong
   */
  getPostBetrayalAnalysis(characterId: string): string[] {
    const rel = this.relationships.get(characterId);
    if (!rel) return [];

    // Find interactions that hurt loyalty
    const damaging = rel.interactionHistory.filter(i => i.loyaltyDelta < 0);
    return damaging.map(i =>
      `Remember when you ${i.description}? They never forgot.`
    );
  }

  /**
   * Apply ripple effects to connected characters
   */
  applyRippleEffect(
    sourceCharacterId: string,
    connections: { targetId: string; multiplier: number }[],
    rapportDelta: number,
    respectDelta: number
  ): void {
    for (const conn of connections) {
      const targetRel = this.relationships.get(conn.targetId);
      if (!targetRel) continue;

      const rippleRapport = Math.round(rapportDelta * conn.multiplier);
      const rippleRespect = Math.round(respectDelta * conn.multiplier);

      if (rippleRapport !== 0 || rippleRespect !== 0) {
        targetRel.visible.rapport = clamp(targetRel.visible.rapport + rippleRapport);
        targetRel.visible.respect = clamp(targetRel.visible.respect + rippleRespect);
      }
    }
  }

  /**
   * Export state for persistence
   */
  exportState(): Map<string, RelationshipState> {
    return new Map(this.relationships);
  }

  /**
   * Import state from persistence
   */
  importState(state: Map<string, RelationshipState>): void {
    this.relationships = new Map(state);
  }

  /**
   * Reset all relationships
   */
  reset(): void {
    this.relationships.clear();
  }
}

// Singleton instance
export const relationshipTracker = new RelationshipTracker();
