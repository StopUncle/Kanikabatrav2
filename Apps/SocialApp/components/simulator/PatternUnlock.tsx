// PatternUnlock Component - Achievement celebration
// Shows when player successfully recognizes a manipulation pattern

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Unlock, Brain, Star, Zap } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../../lib/theme';
import type { PatternRecognition } from '../../content/simulator/types';

interface PatternUnlockProps {
  pattern: PatternRecognition;
  onDismiss?: () => void;
  onContinue?: () => void;
}

export function PatternUnlock({
  pattern,
  onDismiss,
  onContinue,
}: PatternUnlockProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const starScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main card animation
    Animated.sequence([
      // Pop in
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 8,
          stiffness: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // Icon unlock animation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Stars pop
      Animated.spring(starScaleAnim, {
        toValue: 1,
        damping: 5,
        stiffness: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim, rotateAnim, fadeAnim, glowAnim, starScaleAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.overlay,
        { opacity: fadeAnim },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Decorative stars */}
        <Animated.View style={[styles.star, styles.starTopLeft, { transform: [{ scale: starScaleAnim }] }]}>
          <Star size={16} color={colors.accent} fill={colors.accent} />
        </Animated.View>
        <Animated.View style={[styles.star, styles.starTopRight, { transform: [{ scale: starScaleAnim }] }]}>
          <Zap size={14} color={colors.accent} fill={colors.accent} />
        </Animated.View>
        <Animated.View style={[styles.star, styles.starBottomLeft, { transform: [{ scale: starScaleAnim }] }]}>
          <Star size={12} color={colors.accent} fill={colors.accent} />
        </Animated.View>

        {/* Icon with glow */}
        <View style={styles.iconWrapper}>
          <Animated.View
            style={[
              styles.iconGlow,
              {
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.iconContainer,
              { transform: [{ rotate }] },
            ]}
          >
            <Unlock size={32} color={colors.accent} />
          </Animated.View>
        </View>

        {/* Header */}
        <Text style={styles.header}>PATTERN UNLOCKED</Text>

        {/* Pattern name */}
        <View style={styles.patternBadge}>
          <Brain size={16} color={colors.background} />
          <Text style={styles.patternName}>{pattern.patternName}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{pattern.description}</Text>

        {/* XP reward */}
        <View style={styles.xpContainer}>
          <Text style={styles.xpLabel}>REWARD</Text>
          <View style={styles.xpBadge}>
            <Zap size={14} color={colors.accent} fill={colors.accent} />
            <Text style={styles.xpValue}>+{pattern.xpReward} XP</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonRow}>
          {onDismiss && (
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={onDismiss}
              activeOpacity={0.7}
            >
              <Text style={styles.dismissText}>DISMISS</Text>
            </TouchableOpacity>
          )}
          {onContinue && (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// Compact version for inline display
export function PatternUnlockBadge({
  patternName,
  xpReward,
  onPress,
}: {
  patternName: string;
  xpReward?: number;
  onPress?: () => void;
}) {
  const content = (
    <View style={styles.badgeContainer}>
      <Unlock size={12} color={colors.accent} />
      <Text style={styles.badgeText}>{patternName}</Text>
      {xpReward && (
        <Text style={styles.badgeXp}>+{xpReward}</Text>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    maxWidth: 320,
    borderWidth: 2,
    borderColor: colors.accent,
    ...shadows.glow,
    position: 'relative',
    overflow: 'visible',
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  iconGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent,
    top: -8,
    left: -8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  header: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  patternBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  patternName: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.background,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: typography.sm * 1.5,
    marginBottom: spacing.lg,
  },
  xpContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  xpLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(201, 169, 97, 0.2)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  xpValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  dismissButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  dismissText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  continueButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  continueText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.background,
    letterSpacing: 0.5,
  },
  // Decorative stars
  star: {
    position: 'absolute',
  },
  starTopLeft: {
    top: -8,
    left: -8,
  },
  starTopRight: {
    top: 20,
    right: -6,
  },
  starBottomLeft: {
    bottom: 40,
    left: -4,
  },
  // Badge styles
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(201, 169, 97, 0.15)',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  badgeText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  badgeXp: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    opacity: 0.8,
  },
});

export default PatternUnlock;
