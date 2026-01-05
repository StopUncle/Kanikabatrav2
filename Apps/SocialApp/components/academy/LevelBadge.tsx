// Level Badge Component
// Displays user's current academy level with progress

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { Star } from 'lucide-react-native';
import { LevelDefinition } from '../../content/academy/types';
import { getIcon } from '../../lib/icons';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';

interface LevelBadgeProps {
  level: LevelDefinition;
  progress: number; // 0-100
  xpToNext: number;
  totalXp: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const SIZES = {
  sm: { badge: 48, icon: 20, stroke: 3 },
  md: { badge: 72, icon: 28, stroke: 4 },
  lg: { badge: 96, icon: 36, stroke: 5 },
};

export function LevelBadge({
  level,
  progress,
  xpToNext,
  totalXp,
  size = 'md',
  showDetails = true,
}: LevelBadgeProps) {
  // Guard against null/undefined level prop
  if (!level) {
    return null;
  }

  const dimensions = SIZES[size];
  const radius = (dimensions.badge - dimensions.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Math.max(0, Math.min(100, progress || 0));
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  // Get the icon component
  const IconComponent = getIcon(level.icon, Star);

  return (
    <View style={styles.container}>
      {/* Progress Ring */}
      <View style={[styles.badgeContainer, { width: dimensions.badge, height: dimensions.badge }]}>
        <Svg width={dimensions.badge} height={dimensions.badge}>
          {/* Background circle */}
          <Circle
            cx={dimensions.badge / 2}
            cy={dimensions.badge / 2}
            r={radius}
            stroke={colors.border}
            strokeWidth={dimensions.stroke}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={dimensions.badge / 2}
            cy={dimensions.badge / 2}
            r={radius}
            stroke={level.color}
            strokeWidth={dimensions.stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${dimensions.badge / 2} ${dimensions.badge / 2})`}
          />
        </Svg>

        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: `${level.color}20` }]}>
          <IconComponent size={dimensions.icon} color={level.color} />
        </View>
      </View>

      {/* Details */}
      {showDetails && (
        <View style={styles.details}>
          <Text style={[styles.levelName, { color: level.color }]}>{level.name}</Text>
          <Text style={styles.title}>{level.title}</Text>
          <View style={styles.xpRow}>
            <Text style={styles.xp}>{totalXp.toLocaleString()} XP</Text>
            {xpToNext > 0 && (
              <Text style={styles.xpToNext}>• {xpToNext.toLocaleString()} to next</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

// Compact inline version
export function LevelBadgeInline({
  level,
  totalXp,
}: {
  level: LevelDefinition;
  totalXp: number;
}) {
  // Guard against null/undefined level prop
  if (!level) {
    return null;
  }

  const IconComponent = getIcon(level.icon, Star);

  return (
    <View style={styles.inlineContainer}>
      <View style={[styles.inlineIcon, { backgroundColor: `${level.color}20` }]}>
        <IconComponent size={16} color={level.color} />
      </View>
      <View>
        <Text style={[styles.inlineName, { color: level.color }]}>{level.name}</Text>
        <Text style={styles.inlineXp}>{totalXp.toLocaleString()} XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  levelName: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
  },
  title: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  xp: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  xpToNext: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  // Inline styles
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inlineIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineName: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
  },
  inlineXp: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
});
