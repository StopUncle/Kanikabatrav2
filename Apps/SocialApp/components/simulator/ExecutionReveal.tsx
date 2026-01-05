// ExecutionReveal Component - Shows what happens after tactic selection
// Displays execution, inner voice, and control delta

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass, shadows } from '../../lib/theme';
import type { TacticType } from '../../content/simulator/types';
import { TACTIC_INFO } from '../../content/simulator/types';

interface ExecutionRevealProps {
  tacticUsed: TacticType;
  execution: string;
  innerVoice: string;
  controlDelta: number;
  feedback: string;
  onContinue?: () => void;
}

export function ExecutionReveal({
  tacticUsed,
  execution,
  innerVoice,
  controlDelta,
  feedback,
  onContinue,
}: ExecutionRevealProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const tacticInfo = TACTIC_INFO[tacticUsed];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 15,
        stiffness: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const getDeltaColor = () => {
    if (controlDelta > 0) return colors.success;
    if (controlDelta < 0) return colors.error;
    return colors.secondary;
  };

  const getDeltaIcon = () => {
    if (controlDelta > 0) return TrendingUp;
    if (controlDelta < 0) return TrendingDown;
    return Minus;
  };

  const DeltaIcon = getDeltaIcon();
  const deltaColor = getDeltaColor();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Tactic Header */}
      <View style={[styles.header, { borderLeftColor: tacticInfo?.color || colors.accent }]}>
        <Text style={styles.headerLabel}>YOUR MOVE</Text>
        <Text style={[styles.headerTactic, { color: tacticInfo?.color || colors.accent }]}>
          {tacticInfo?.name || tacticUsed}
        </Text>
      </View>

      {/* Execution */}
      <View style={styles.section}>
        <Text style={styles.execution}>"{execution}"</Text>
      </View>

      {/* Inner Voice */}
      <View style={styles.innerVoiceContainer}>
        <View style={styles.thoughtDots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotLarge]} />
        </View>
        <Text style={styles.innerVoice}>{innerVoice}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Control Delta */}
      <View style={styles.deltaContainer}>
        <View style={styles.deltaRow}>
          <DeltaIcon size={20} color={deltaColor} />
          <Text style={[styles.deltaValue, { color: deltaColor }]}>
            {controlDelta > 0 ? '+' : ''}{controlDelta} CONTROL
          </Text>
        </View>
        <Text style={styles.feedback}>{feedback}</Text>
      </View>

      {/* Continue Button */}
      {onContinue && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    overflow: 'hidden',
  },
  header: {
    padding: spacing.md,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  headerLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  headerTactic: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    padding: spacing.md,
    paddingTop: 0,
  },
  execution: {
    fontSize: typography.md,
    color: colors.primary,
    fontStyle: 'italic',
    lineHeight: typography.md * 1.5,
  },
  innerVoiceContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: 'rgba(201, 169, 97, 0.08)',
    borderRadius: borderRadius.md,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(201, 169, 97, 0.3)',
    position: 'relative',
  },
  thoughtDots: {
    position: 'absolute',
    left: spacing.sm,
    top: -8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
    opacity: 0.5,
  },
  dotLarge: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  innerVoice: {
    fontSize: typography.sm,
    color: colors.accent,
    fontStyle: 'italic',
    lineHeight: typography.sm * 1.5,
    opacity: 0.9,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  deltaContainer: {
    padding: spacing.md,
  },
  deltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  deltaValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    letterSpacing: 0.5,
  },
  feedback: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: typography.sm * 1.4,
  },
  continueButton: {
    backgroundColor: colors.accent,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.glow,
  },
  continueText: {
    color: colors.background,
    fontSize: typography.sm,
    fontWeight: typography.bold,
    letterSpacing: 1,
  },
});

export default ExecutionReveal;
