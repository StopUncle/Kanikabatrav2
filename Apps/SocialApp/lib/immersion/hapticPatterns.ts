// Haptic Patterns - Vibration feedback for story moments
// Creates physical connection to emotional beats

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Utility delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Check if haptics are available
const hapticsAvailable = Platform.OS === 'ios' || Platform.OS === 'android';

/**
 * Immersive haptic patterns for story beats
 */
export const immersiveHaptics = {
  // ============================================
  // STORY BEAT HAPTICS
  // ============================================

  /**
   * Manipulation detected - sharp warning
   * Use when: Player spots a manipulation tactic
   */
  manipulationDetected: async () => {
    if (!hapticsAvailable) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    await delay(100);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },

  /**
   * Red flag revealed - rapid warning pulses
   * Use when: A red flag is explicitly called out
   */
  redFlagRevealed: async () => {
    if (!hapticsAvailable) return;
    for (let i = 0; i < 3; i++) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await delay(80);
    }
  },

  /**
   * Optimal choice made - satisfying success
   * Use when: Player makes the best choice
   */
  optimalChoice: async () => {
    if (!hapticsAvailable) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },

  /**
   * Trap choice made - ominous rumble
   * Use when: Player falls for a trap
   */
  trapChoice: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await delay(150);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },

  /**
   * Control gained - rising intensity
   * Use when: Player gains power in the dynamic
   */
  controlGained: async (amount: number = 10) => {
    if (!hapticsAvailable) return;
    if (amount > 15) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else if (amount > 5) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  /**
   * Control lost - falling fade
   * Use when: Player loses power in the dynamic
   */
  controlLost: async (amount: number = 10) => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await delay(100);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },

  /**
   * Cold moment - single ominous thump
   * Use when: Character becomes cold/threatening
   */
  coldMoment: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  },

  /**
   * Heart racing - heartbeat pattern
   * Use when: Tense/romantic moment
   */
  heartRacing: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await delay(150);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },

  /**
   * Shock/surprise - sharp impact
   * Use when: Unexpected revelation
   */
  shock: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },

  /**
   * Intimate moment - gentle pulse
   * Use when: Romantic/vulnerable moment
   */
  intimate: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    await delay(300);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  },

  // ============================================
  // UI FEEDBACK HAPTICS
  // ============================================

  /**
   * Button tap - standard selection
   */
  tap: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },

  /**
   * Choice selected - confirming selection
   */
  choiceSelect: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },

  /**
   * Dialog advance - subtle tick
   */
  dialogTick: async () => {
    if (!hapticsAvailable) return;
    await Haptics.selectionAsync();
  },

  /**
   * Scene transition - whoosh feel
   */
  sceneTransition: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await delay(50);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  },

  /**
   * Error/blocked action
   */
  error: async () => {
    if (!hapticsAvailable) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },

  // ============================================
  // COMPOUND PATTERNS
  // ============================================

  /**
   * Danger escalation - building threat
   * Use for: Escalating dangerous situation
   */
  dangerEscalation: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await delay(200);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await delay(150);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },

  /**
   * Victory sequence - triumphant pattern
   * Use for: Major win/breakthrough
   */
  victory: async () => {
    if (!hapticsAvailable) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await delay(200);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await delay(100);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },

  /**
   * Mask slip - when someone reveals true nature
   * Use for: Character reveals their manipulation
   */
  maskSlip: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    await delay(100);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },

  /**
   * Pattern recognition - player spots the game
   * Use for: When player correctly identifies tactic
   */
  patternRecognized: async () => {
    if (!hapticsAvailable) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await delay(150);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
};

// Type for haptic pattern names
export type HapticPattern = keyof typeof immersiveHaptics;

/**
 * Trigger haptic by name
 */
export async function triggerHaptic(pattern: HapticPattern, ...args: number[]) {
  const hapticFn = immersiveHaptics[pattern];
  if (typeof hapticFn === 'function') {
    await hapticFn(...args);
  }
}

/**
 * Check if haptics are supported
 */
export function isHapticsSupported(): boolean {
  return hapticsAvailable;
}

export default immersiveHaptics;
