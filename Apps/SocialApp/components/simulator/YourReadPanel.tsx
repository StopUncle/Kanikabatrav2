// YourReadPanel Component - Intelligence briefing showing personality analysis
// Displays player's "read" of the NPC

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Eye, Target, Crosshair, AlertTriangle } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import type { YourRead } from '../../content/simulator/types';

interface YourReadPanelProps {
  read: YourRead;
  isRevealed?: boolean;
  animated?: boolean;
}

export function YourReadPanel({
  read,
  isRevealed = true,
  animated = true,
}: YourReadPanelProps) {
  const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const slideAnim = useRef(new Animated.Value(animated ? -20 : 0)).current;

  useEffect(() => {
    if (isRevealed && animated) {
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
    }
  }, [isRevealed, animated, fadeAnim, slideAnim]);

  if (!isRevealed) {
    return null;
  }

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
      {/* Header */}
      <View style={styles.header}>
        <Eye size={16} color={colors.accent} />
        <Text style={styles.headerText}>YOUR READ</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Content Grid */}
      <View style={styles.content}>
        {/* Type */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Target size={12} color={colors.tertiary} />
            <Text style={styles.label}>TYPE</Text>
          </View>
          <Text style={styles.value} numberOfLines={1}>
            {read.personalityType}
          </Text>
        </View>

        {/* Move */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Crosshair size={12} color={colors.tertiary} />
            <Text style={styles.label}>MOVE</Text>
          </View>
          <Text style={styles.value} numberOfLines={1}>
            {read.currentMove}
          </Text>
        </View>

        {/* Goal */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Target size={12} color={colors.tertiary} />
            <Text style={styles.label}>GOAL</Text>
          </View>
          <Text style={styles.value} numberOfLines={1}>
            {read.theirGoal}
          </Text>
        </View>

        {/* Weakness */}
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <AlertTriangle size={12} color={colors.warning} />
            <Text style={[styles.label, { color: colors.warning }]}>WEAKNESS</Text>
          </View>
          <Text style={[styles.value, styles.weaknessValue]} numberOfLines={2}>
            {read.weakness}
          </Text>
        </View>
      </View>

      {/* Bottom Divider */}
      <View style={styles.divider} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.gold,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  headerText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(201, 169, 97, 0.3)',
  },
  content: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    width: 90,
    flexShrink: 0,
  },
  label: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.tertiary,
    letterSpacing: 0.5,
  },
  value: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.medium,
  },
  weaknessValue: {
    color: colors.warning,
    fontStyle: 'italic',
  },
});

export default YourReadPanel;
