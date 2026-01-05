// Story Convergence Manager
// Handles Telltale-style "different paths → same destinations"
// Manages key story beats that all paths must reach

import {
  ConvergencePoint,
  EntryCondition,
} from './types';
import { RelationshipTracker } from './RelationshipTracker';

/**
 * Path record - how player arrived at a convergence point
 */
export interface PathRecord {
  convergenceId: string;
  pathId: string;
  entryFlavor: string;
  timestamp: number;
}

/**
 * StoryConvergenceManager handles path convergence and tracking
 */
export class StoryConvergenceManager {
  private convergencePoints: Map<string, ConvergencePoint> = new Map();
  private pathRecords: PathRecord[] = [];
  private flags: Set<string> = new Set();

  constructor(private relationshipTracker: RelationshipTracker) {}

  /**
   * Register a convergence point
   */
  registerConvergencePoint(point: ConvergencePoint): void {
    this.convergencePoints.set(point.id, point);
  }

  /**
   * Set a story flag
   */
  setFlag(flag: string): void {
    this.flags.add(flag);
  }

  /**
   * Check if a flag is set
   */
  hasFlag(flag: string): boolean {
    return this.flags.has(flag);
  }

  /**
   * Clear a flag
   */
  clearFlag(flag: string): void {
    this.flags.delete(flag);
  }

  /**
   * Determine which path the player takes to a convergence point
   * Returns the path ID and entry flavor text
   */
  determineEntryPath(convergenceId: string): { pathId: string; flavor: string } | null {
    const point = this.convergencePoints.get(convergenceId);
    if (!point) return null;

    // Check conditions in order (first match wins)
    for (const condition of point.entryConditions) {
      if (this.meetsConditions(condition)) {
        // Record this path
        this.pathRecords.push({
          convergenceId,
          pathId: condition.pathId,
          entryFlavor: condition.entryFlavor,
          timestamp: Date.now(),
        });

        return {
          pathId: condition.pathId,
          flavor: condition.entryFlavor,
        };
      }
    }

    // No conditions met - use first available as fallback
    const fallback = point.entryConditions[0];
    if (fallback) {
      this.pathRecords.push({
        convergenceId,
        pathId: fallback.pathId,
        entryFlavor: fallback.entryFlavor,
        timestamp: Date.now(),
      });
      return {
        pathId: fallback.pathId,
        flavor: fallback.entryFlavor,
      };
    }

    return null;
  }

  /**
   * Check if player meets entry conditions
   */
  private meetsConditions(condition: EntryCondition): boolean {
    const req = condition.requirements;

    // Check minimum rapport
    if (req.minRapport) {
      const stats = this.relationshipTracker.getVisibleStats(req.minRapport.characterId);
      if (!stats || stats.rapport < req.minRapport.value) return false;
    }

    // Check maximum rapport
    if (req.maxRapport) {
      const stats = this.relationshipTracker.getVisibleStats(req.maxRapport.characterId);
      if (!stats || stats.rapport > req.maxRapport.value) return false;
    }

    // Check flags that must be set
    if (req.flagsSet) {
      for (const flag of req.flagsSet) {
        if (!this.flags.has(flag)) return false;
      }
    }

    // Check flags that must NOT be set
    if (req.flagsNotSet) {
      for (const flag of req.flagsNotSet) {
        if (this.flags.has(flag)) return false;
      }
    }

    return true;
  }

  /**
   * Get path history for end-of-game summary
   */
  getPathHistory(): PathRecord[] {
    return [...this.pathRecords];
  }

  /**
   * Get how player arrived at a specific convergence
   */
  getPathRecord(convergenceId: string): PathRecord | undefined {
    return this.pathRecords.find(r => r.convergenceId === convergenceId);
  }

  /**
   * Check if player has reached a convergence point
   */
  hasReachedConvergence(convergenceId: string): boolean {
    return this.pathRecords.some(r => r.convergenceId === convergenceId);
  }

  /**
   * Generate end-of-game path summary
   */
  generatePathSummary(): string[] {
    return this.pathRecords.map(r => r.entryFlavor);
  }

  /**
   * Export state for persistence
   */
  exportState(): { flags: string[]; paths: PathRecord[] } {
    return {
      flags: Array.from(this.flags),
      paths: Array.from(this.pathRecords),
    };
  }

  /**
   * Import state from persistence
   */
  importState(state: { flags: string[]; paths: PathRecord[] }): void {
    this.flags = new Set(state.flags);
    this.pathRecords = [...state.paths];
  }

  /**
   * Reset all state
   */
  reset(): void {
    this.flags.clear();
    this.pathRecords = [];
  }
}

/**
 * Helper to create convergence point configurations
 */
export function createConvergencePoint(
  id: string,
  sceneId: string,
  entries: {
    pathId: string;
    flavor: string;
    minRapport?: { characterId: string; value: number };
    maxRapport?: { characterId: string; value: number };
    flagsSet?: string[];
    flagsNotSet?: string[];
  }[]
): ConvergencePoint {
  return {
    id,
    sceneId,
    required: true,
    entryConditions: entries.map(e => ({
      pathId: e.pathId,
      requirements: {
        minRapport: e.minRapport,
        maxRapport: e.maxRapport,
        flagsSet: e.flagsSet,
        flagsNotSet: e.flagsNotSet,
      },
      entryFlavor: e.flavor,
    })),
  };
}

// Example usage:
/*
const partyConvergence = createConvergencePoint(
  'end-level-1-party',
  'scene-party-arrival',
  [
    {
      pathId: 'manipulated-way-in',
      flavor: 'You manipulated your way in. But at what cost?',
      flagsSet: ['manipulated_casey'],
    },
    {
      pathId: 'earned-invite',
      flavor: 'Your genuine connections paid off.',
      minRapport: { characterId: 'riley', value: 60 },
    },
    {
      pathId: 'snuck-in',
      flavor: 'You found another way in. Creative.',
      flagsSet: ['found_back_entrance'],
    },
    {
      pathId: 'brought-by-friend',
      flavor: 'A friend brought you along.',
      minRapport: { characterId: 'alex', value: 70 },
    },
  ]
);
*/
