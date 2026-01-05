// InnerVoiceFloat - Distinct styling for inner voice/gut feeling
// Appears as floating text with glow, different from speech bubbles

import React, { useEffect } from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { colors, typography, spacing } from '../../../lib/theme';

export type InnerVoiceEmotion =
  | 'neutral'
  | 'warning'
  | 'knowing'
  | 'urgent'
  | 'confident'
  | 'doubtful';

interface InnerVoiceFloatProps {
  text: string;
  emotion?: InnerVoiceEmotion;
  visible?: boolean;
  onComplete?: () => void;
  style?: ViewStyle;
}

const EMOTION_COLORS: Record<InnerVoiceEmotion, { text: string; glow: string }> = {
  neutral: {
    text: colors.accent, // Gold
    glow: 'rgba(201, 169, 97, 0.4)',
  },
  warning: {
    text: '#FF6B6B',
    glow: 'rgba(255, 107, 107, 0.4)',
  },
  knowing: {
    text: '#A78BFA', // Purple
    glow: 'rgba(167, 139, 250, 0.4)',
  },
  urgent: {
    text: '#F97316', // Orange
    glow: 'rgba(249, 115, 22, 0.4)',
  },
  confident: {
    text: '#22C55E', // Green
    glow: 'rgba(34, 197, 94, 0.4)',
  },
  doubtful: {
    text: '#94A3B8', // Muted
    glow: 'rgba(148, 163, 184, 0.3)',
  },
};

export function InnerVoiceFloat({
  text,
  emotion = 'neutral',
  visible = true,
  onComplete,
  style,
}: InnerVoiceFloatProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const scale = useSharedValue(0.95);
  const glowPulse = useSharedValue(1);

  const emotionStyle = EMOTION_COLORS[emotion];

  useEffect(() => {
    if (visible) {
      // Fade in from below
      opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.back(1.1)),
      });
      scale.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });

      // Gentle glow pulse
      glowPulse.value = withDelay(
        500,
        withSequence(
          withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        )
      );

      // Call onComplete after animation
      const timeout = setTimeout(() => {
        onComplete?.();
      }, 600);

      return () => clearTimeout(timeout);
    } else {
      // Fade out
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(-20, { duration: 300 });
      scale.value = withTiming(0.95, { duration: 300 });
    }
  }, [visible, opacity, translateY, scale, glowPulse, onComplete]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [1, 1.2], [0.3, 0.5]),
    transform: [{ scale: glowPulse.value }],
  }));

  if (!text) return null;

  return (
    <Animated.View style={[styles.container, containerStyle, style]}>
      {/* Glow effect behind text */}
      <Animated.View
        style={[
          styles.glow,
          glowStyle,
          { backgroundColor: emotionStyle.glow },
        ]}
      />

      {/* Main text */}
      <Text
        style={[
          styles.text,
          { color: emotionStyle.text, textShadowColor: emotionStyle.glow },
        ]}
      >
        {text}
      </Text>

      {/* Label */}
      <Text style={styles.label}>YOUR GUT</Text>
    </Animated.View>
  );
}

// Simplified inline version for use within other components
interface InnerVoiceInlineProps {
  text: string;
  emotion?: InnerVoiceEmotion;
}

export function InnerVoiceInline({ text, emotion = 'neutral' }: InnerVoiceInlineProps) {
  const emotionStyle = EMOTION_COLORS[emotion];

  return (
    <Text
      style={[
        styles.inlineText,
        { color: emotionStyle.text, textShadowColor: emotionStyle.glow },
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  glow: {
    position: 'absolute',
    width: '120%',
    height: '150%',
    borderRadius: 100,
    opacity: 0.3,
  },
  text: {
    fontSize: typography.md,
    fontStyle: 'italic',
    fontWeight: typography.medium,
    textAlign: 'center',
    lineHeight: typography.md * 1.5,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  label: {
    marginTop: spacing.sm,
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.tertiary,
    letterSpacing: 1.5,
    opacity: 0.6,
  },
  inlineText: {
    fontSize: typography.sm,
    fontStyle: 'italic',
    fontWeight: typography.medium,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});

export default InnerVoiceFloat;
