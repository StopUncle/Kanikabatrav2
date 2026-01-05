// Scene Resolver
// Resolves scene templates into final scenes based on relationship state and mood

import {
  RelationshipTier,
  SceneVariant,
  EmotionalPresentation,
  getRelationshipTier,
} from './types';
import { RelationshipTracker } from './RelationshipTracker';
import { MoodRandomizer } from './MoodRandomizer';
import type { Scene, DialogLine, Choice, EmotionType } from '../../content/simulator/types';

/**
 * Scene template with variants for different relationship states
 */
export interface SceneTemplate {
  baseScene: Scene;
  // Variants keyed by character ID + relationship tier
  variants: {
    characterId: string;
    // Which stat to check
    statType: 'rapport' | 'respect' | 'loyalty';
    // Variants for each tier
    high?: SceneVariant;
    medium?: SceneVariant;
    low?: SceneVariant;
  }[];
  // Mood-based dialog variations
  moodVariants?: {
    characterId: string;
    mood: EmotionalPresentation;
    dialogOverrides: { lineIndex: number; text: string; emotion?: string }[];
  }[];
}

/**
 * SceneResolver combines relationship state + mood to produce final scenes
 */
export class SceneResolver {
  constructor(
    private relationshipTracker: RelationshipTracker,
    private moodRandomizer: MoodRandomizer
  ) {}

  /**
   * Resolve a scene template into a final scene
   */
  resolveScene(template: SceneTemplate): Scene {
    // Start with base scene (deep clone)
    const resolved: Scene = JSON.parse(JSON.stringify(template.baseScene));

    // Apply relationship-based variants
    for (const variantConfig of template.variants) {
      const tier = this.getStatTier(variantConfig.characterId, variantConfig.statType);
      const variant = variantConfig[tier];

      if (variant) {
        this.applyVariant(resolved, variant);
      }
    }

    // Apply mood-based variants
    if (template.moodVariants) {
      for (const moodVariant of template.moodVariants) {
        const currentMood = this.moodRandomizer.getCurrentMood(moodVariant.characterId);
        if (currentMood === moodVariant.mood) {
          this.applyMoodVariant(resolved, moodVariant.dialogOverrides);
        }
      }
    }

    // Inject foreshadowing if applicable
    this.injectForeshadowing(resolved);

    return resolved;
  }

  /**
   * Get relationship tier for a stat
   */
  private getStatTier(
    characterId: string,
    statType: 'rapport' | 'respect' | 'loyalty'
  ): RelationshipTier {
    switch (statType) {
      case 'rapport':
        return this.relationshipTracker.getRapportTier(characterId);
      case 'respect':
        return this.relationshipTracker.getRespectTier(characterId);
      case 'loyalty':
        return this.relationshipTracker.getLoyaltyTier(characterId);
    }
  }

  /**
   * Apply a scene variant
   */
  private applyVariant(scene: Scene, variant: SceneVariant): void {
    // Apply dialog overrides
    for (const override of variant.dialogOverrides) {
      if (scene.dialog && scene.dialog[override.originalLineIndex]) {
        scene.dialog[override.originalLineIndex].text = override.variantText;
        if (override.variantEmotion) {
          scene.dialog[override.originalLineIndex].emotion = override.variantEmotion as EmotionType;
        }
      }
    }

    // Apply choice modifiers
    if (scene.choices) {
      for (const modifier of variant.choiceModifiers) {
        const choice = scene.choices.find(c => c.id === modifier.choiceId);
        if (!choice) continue;

        if (modifier.disabled) {
          // Remove the choice
          scene.choices = scene.choices.filter(c => c.id !== modifier.choiceId);
        } else {
          if (modifier.feedbackOverride) {
            choice.feedback = modifier.feedbackOverride;
          }
          // Note: delta overrides would be handled in the choice handler
          // We store them as custom properties for the handler to read
          if (modifier.rapportDeltaOverride !== undefined) {
            (choice as Choice & { rapportDelta?: number }).rapportDelta = modifier.rapportDeltaOverride;
          }
          if (modifier.respectDeltaOverride !== undefined) {
            (choice as Choice & { respectDelta?: number }).respectDelta = modifier.respectDeltaOverride;
          }
          if (modifier.loyaltyDeltaOverride !== undefined) {
            (choice as Choice & { loyaltyDelta?: number }).loyaltyDelta = modifier.loyaltyDeltaOverride;
          }
        }
      }
    }

    // Add foreshadowing to scene if present
    if (variant.foreshadowing && scene.dialog) {
      // Insert foreshadowing as subtle narration before last line
      const insertIndex = Math.max(0, scene.dialog.length - 1);
      scene.dialog.splice(insertIndex, 0, {
        text: variant.foreshadowing,
        // No speakerId = narration
      });
    }
  }

  /**
   * Apply mood-based dialog variations
   */
  private applyMoodVariant(
    scene: Scene,
    overrides: { lineIndex: number; text: string; emotion?: string }[]
  ): void {
    for (const override of overrides) {
      if (scene.dialog && scene.dialog[override.lineIndex]) {
        scene.dialog[override.lineIndex].text = override.text;
        if (override.emotion) {
          scene.dialog[override.lineIndex].emotion = override.emotion as EmotionType;
        }
      }
    }
  }

  /**
   * Inject any pending foreshadowing messages
   */
  private injectForeshadowing(scene: Scene): void {
    // This would be called with queued foreshadowing from RelationshipTracker
    // For now, we handle this via the callback system in RelationshipTracker
  }

  /**
   * Check if a choice should have modified consequences based on relationships
   */
  resolveChoiceConsequences(
    choice: Choice,
    targetCharacterId: string
  ): {
    rapportDelta: number;
    respectDelta: number;
    loyaltyDelta: number;
  } {
    // Default values
    let rapportDelta = 0;
    let respectDelta = 0;
    let loyaltyDelta = 0;

    // Check for relationship-modified values
    const choiceWithDeltas = choice as Choice & {
      rapportDelta?: number;
      respectDelta?: number;
      loyaltyDelta?: number;
    };

    if (choiceWithDeltas.rapportDelta !== undefined) {
      rapportDelta = choiceWithDeltas.rapportDelta;
    }
    if (choiceWithDeltas.respectDelta !== undefined) {
      respectDelta = choiceWithDeltas.respectDelta;
    }
    if (choiceWithDeltas.loyaltyDelta !== undefined) {
      loyaltyDelta = choiceWithDeltas.loyaltyDelta;
    }

    // XP bonus can influence respect
    if (choice.isOptimal) {
      respectDelta += 5;
    }

    return { rapportDelta, respectDelta, loyaltyDelta };
  }
}

/**
 * Helper to create scene templates from existing scenes
 */
export function createSceneTemplate(
  baseScene: Scene,
  variants: SceneTemplate['variants'] = [],
  moodVariants: SceneTemplate['moodVariants'] = []
): SceneTemplate {
  return {
    baseScene,
    variants,
    moodVariants,
  };
}

/**
 * Helper to create a variant configuration
 */
export function createVariant(
  characterId: string,
  statType: 'rapport' | 'respect' | 'loyalty',
  variants: {
    high?: Partial<SceneVariant>;
    medium?: Partial<SceneVariant>;
    low?: Partial<SceneVariant>;
  }
): SceneTemplate['variants'][0] {
  const defaultVariant: SceneVariant = {
    tier: 'medium',
    dialogOverrides: [],
    choiceModifiers: [],
  };

  return {
    characterId,
    statType,
    high: variants.high ? { ...defaultVariant, tier: 'high', ...variants.high } : undefined,
    medium: variants.medium ? { ...defaultVariant, tier: 'medium', ...variants.medium } : undefined,
    low: variants.low ? { ...defaultVariant, tier: 'low', ...variants.low } : undefined,
  };
}
