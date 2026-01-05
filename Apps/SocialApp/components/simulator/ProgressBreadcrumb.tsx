// Progress Breadcrumb Component
// Shows chapter/part progress in the simulator UI

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import type { ChapterInfo, ScenarioCategory } from '../../content/simulator/types';
import { categoryColors } from '../../lib/theme';

interface ProgressBreadcrumbProps {
  chapter?: ChapterInfo;
  category?: ScenarioCategory;
}

export function ProgressBreadcrumb({ chapter, category }: ProgressBreadcrumbProps) {
  // Don't render if no chapter info
  if (!chapter) return null;

  // Get category accent color (fallback to gold)
  const categoryAccent = category ? categoryColors[category]?.accent : colors.accent;
  const categoryGlow = category ? categoryColors[category]?.glow : 'rgba(201, 169, 97, 0.25)';

  return (
    <View style={[styles.container, { borderColor: categoryAccent }]}>
      {/* Chapter name */}
      <Text style={[styles.chapterName, { color: categoryAccent }]} numberOfLines={1}>
        {chapter.name}
      </Text>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {chapter.index}/{chapter.total}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    ...glass.dark,
    borderWidth: 1,
    gap: spacing.xs,
  },
  chapterName: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    maxWidth: 80,
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  progressText: {
    fontSize: typography.xs - 1,
    fontWeight: typography.semibold,
    color: colors.secondary,
  },
});
