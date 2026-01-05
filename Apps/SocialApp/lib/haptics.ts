import * as Haptics from 'expo-haptics';

// Centralized haptic feedback helpers
// Consistent tactile feedback across the app
// Note: We catch errors silently as haptics are non-critical enhancements

const safeHaptic = <T>(fn: () => Promise<T>): void => {
  fn().catch(() => {
    // Silently ignore haptic failures - they're non-critical
  });
};

export const haptics = {
  // Light feedback - tab selection, toggles, minor interactions
  light: () => safeHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),

  // Medium feedback - button press, form submit
  medium: () => safeHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),

  // Heavy feedback - destructive actions, major confirmations
  heavy: () => safeHaptic(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),

  // Success - action completed successfully
  success: () => safeHaptic(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),

  // Error - validation failed, action blocked
  error: () => safeHaptic(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),

  // Warning - caution needed
  warning: () => safeHaptic(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),

  // Selection changed - picker, slider changes
  selection: () => safeHaptic(() => Haptics.selectionAsync()),
};
