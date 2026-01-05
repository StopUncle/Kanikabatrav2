// Mood Randomizer
// Randomizes character emotional presentations per playthrough
// Prevents memorization - same character, different mask

import {
  EmotionalPresentation,
  CharacterMoodState,
  MoodTrigger,
  RelationshipCharacter,
  CharacterArchetype,
} from './types';

/**
 * Seeded random number generator for reproducible randomness
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }

  pick<T>(array: T[]): T {
    return array[this.nextInt(array.length)];
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

/**
 * Default presentation options by archetype
 * These represent how different personality types might present
 */
const ARCHETYPE_PRESENTATIONS: Record<CharacterArchetype, EmotionalPresentation[]> = {
  narcissist: ['cold', 'warm', 'vulnerable', 'charming'], // Many masks
  avoidant: ['cold', 'neutral', 'charming'],              // Fewer, more guarded
  anxious: ['warm', 'vulnerable', 'aggressive'],          // Emotionally reactive
  secure: ['warm', 'neutral', 'charming'],                // Consistent, healthy
  manipulator: ['warm', 'charming', 'vulnerable', 'cold'], // Whatever works
  genuine: ['warm', 'neutral'],                           // What you see is what you get
};

/**
 * Default mood triggers by archetype
 */
const ARCHETYPE_TRIGGERS: Record<CharacterArchetype, MoodTrigger[]> = {
  narcissist: [
    { condition: 'embarrassed_public', resultMood: 'cold', probability: 0.9 },
    { condition: 'challenged_authority', resultMood: 'aggressive', probability: 0.7 },
    { condition: 'given_attention', resultMood: 'charming', probability: 0.8 },
    { condition: 'ignored', resultMood: 'vulnerable', probability: 0.5 },
  ],
  avoidant: [
    { condition: 'pressured_commitment', resultMood: 'cold', probability: 0.9 },
    { condition: 'given_space', resultMood: 'warm', probability: 0.6 },
    { condition: 'emotional_demand', resultMood: 'cold', probability: 0.8 },
  ],
  anxious: [
    { condition: 'reassured', resultMood: 'warm', probability: 0.8 },
    { condition: 'ignored', resultMood: 'aggressive', probability: 0.7 },
    { condition: 'criticized', resultMood: 'vulnerable', probability: 0.9 },
  ],
  secure: [
    { condition: 'disrespected', resultMood: 'cold', probability: 0.5 },
    { condition: 'appreciated', resultMood: 'warm', probability: 0.7 },
  ],
  manipulator: [
    { condition: 'caught_lying', resultMood: 'aggressive', probability: 0.6 },
    { condition: 'target_vulnerable', resultMood: 'charming', probability: 0.9 },
    { condition: 'target_strong', resultMood: 'vulnerable', probability: 0.7 },
  ],
  genuine: [
    { condition: 'lied_to', resultMood: 'cold', probability: 0.8 },
    { condition: 'treated_well', resultMood: 'warm', probability: 0.9 },
  ],
};

/**
 * MoodRandomizer handles character presentation randomization
 */
export class MoodRandomizer {
  private random: SeededRandom;
  private characterMoods: Map<string, CharacterMoodState> = new Map();

  constructor(seed?: number) {
    // Use current timestamp if no seed provided
    this.random = new SeededRandom(seed ?? Date.now());
  }

  /**
   * Initialize mood state for a character
   * Call at start of playthrough
   */
  initializeCharacterMood(character: RelationshipCharacter): CharacterMoodState {
    // Get possible presentations (from character config or archetype default)
    const presentations = character.possiblePresentations.length > 0
      ? character.possiblePresentations
      : ARCHETYPE_PRESENTATIONS[character.archetype];

    // Randomly select initial presentation
    const initialPresentation = this.random.pick(presentations);

    // Get mood triggers for this archetype
    const triggers = ARCHETYPE_TRIGGERS[character.archetype];

    // Calculate stability based on archetype
    const stability = this.calculateStability(character.archetype);

    const state: CharacterMoodState = {
      characterId: character.id,
      currentPresentation: initialPresentation,
      stability,
      moodTriggers: triggers,
    };

    this.characterMoods.set(character.id, state);
    return state;
  }

  /**
   * Get current mood for a character
   */
  getCurrentMood(characterId: string): EmotionalPresentation {
    return this.characterMoods.get(characterId)?.currentPresentation ?? 'neutral';
  }

  /**
   * Get full mood state
   */
  getMoodState(characterId: string): CharacterMoodState | undefined {
    return this.characterMoods.get(characterId);
  }

  /**
   * Check if an event triggers a mood shift
   */
  checkMoodTrigger(characterId: string, eventCondition: string): EmotionalPresentation | null {
    const state = this.characterMoods.get(characterId);
    if (!state) return null;

    // Find matching trigger
    const trigger = state.moodTriggers.find(t => t.condition === eventCondition);
    if (!trigger) return null;

    // Check probability (modified by stability)
    const effectiveProbability = trigger.probability * (1 - state.stability / 200);
    if (this.random.next() > effectiveProbability) return null;

    // Mood shifts
    state.currentPresentation = trigger.resultMood;
    return trigger.resultMood;
  }

  /**
   * Force a mood (for story-critical moments)
   */
  setMood(characterId: string, mood: EmotionalPresentation): void {
    const state = this.characterMoods.get(characterId);
    if (state) {
      state.currentPresentation = mood;
    }
  }

  /**
   * Get stability based on archetype
   * Higher stability = harder to shift mood
   */
  private calculateStability(archetype: CharacterArchetype): number {
    const stabilityMap: Record<CharacterArchetype, number> = {
      narcissist: 40,    // Shifts when ego threatened
      avoidant: 70,      // Very stable (guarded)
      anxious: 20,       // Very reactive
      secure: 80,        // Stable but can shift
      manipulator: 30,   // Adapts to situation
      genuine: 90,       // What you see is what you get
    };
    return stabilityMap[archetype];
  }

  /**
   * Get description of current presentation for UI/narration
   */
  getPresentationDescription(characterId: string): string {
    const mood = this.getCurrentMood(characterId);
    const descriptions: Record<EmotionalPresentation, string> = {
      cold: 'distant and dismissive',
      warm: 'friendly and open',
      vulnerable: 'uncertain and seeking reassurance',
      neutral: 'measured and observant',
      aggressive: 'confrontational and challenging',
      charming: 'smooth and engaging',
    };
    return descriptions[mood];
  }

  /**
   * Export state for persistence
   */
  exportState(): Map<string, CharacterMoodState> {
    return new Map(this.characterMoods);
  }

  /**
   * Import state from persistence
   */
  importState(state: Map<string, CharacterMoodState>): void {
    this.characterMoods = new Map(state);
  }

  /**
   * Get the seed for this randomizer (for save/load)
   */
  getSeed(): number {
    return this.random['seed'];
  }

  /**
   * Reset all moods
   */
  reset(): void {
    this.characterMoods.clear();
  }
}

// Factory function for creating new randomizer per playthrough
export function createMoodRandomizer(seed?: number): MoodRandomizer {
  return new MoodRandomizer(seed);
}
