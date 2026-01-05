import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LucideIcons from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius, shadows, gradients } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { WeeklyMission } from '../../content/missions';
import { Lock, CheckCircle2, ChevronRight } from 'lucide-react-native';

interface MissionCardProps {
  mission: WeeklyMission;
  status: 'locked' | 'active' | 'completed';
  progress?: number; // 0-100
  onPress?: () => void;
  compact?: boolean;
}

export function MissionCard({
  mission,
  status,
  progress = 0,
  onPress,
  compact = false,
}: MissionCardProps) {
  // Get the icon component dynamically
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size: number; color: string; strokeWidth?: number }>>)[mission.icon] || LucideIcons.Target;

  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isActive = status === 'active';

  const handlePress = () => {
    if (isLocked) return;
    haptics.light();
    onPress?.();
  };

  if (compact) {
    return (
      <Pressable onPress={handlePress} disabled={isLocked}>
        <Card
          style={StyleSheet.flatten([
            styles.compactCard,
            isLocked && styles.lockedCard,
            isCompleted && styles.completedCard,
          ])}
        >
          <View style={[styles.compactIconContainer, { backgroundColor: `${mission.color}20` }]}>
            {isLocked ? (
              <Lock size={18} color={colors.tertiary} />
            ) : isCompleted ? (
              <CheckCircle2 size={18} color={colors.success} />
            ) : (
              <IconComponent size={18} color={mission.color} />
            )}
          </View>
          <View style={styles.compactContent}>
            <Text style={[styles.compactWeek, isLocked && styles.lockedText]}>
              Week {mission.week}
            </Text>
            <Text
              style={[styles.compactTitle, isLocked && styles.lockedText]}
              numberOfLines={1}
            >
              {mission.title}
            </Text>
          </View>
          {!isLocked && (
            <ChevronRight size={18} color={colors.tertiary} />
          )}
        </Card>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} disabled={isLocked}>
      <Card
        style={StyleSheet.flatten([
          styles.card,
          isLocked && styles.lockedCard,
          isActive && styles.activeCard,
          isCompleted && styles.completedCard,
        ])}
        variant={isActive ? 'glassGold' : 'glass'}
        glow={isActive}
      >
        {/* Week Badge */}
        <View style={styles.header}>
          <View style={[styles.weekBadge, isActive && styles.weekBadgeActive]}>
            <Text style={[styles.weekText, isActive && styles.weekTextActive]}>
              WEEK {mission.week}
            </Text>
          </View>
          {isLocked && (
            <View style={styles.lockedBadge}>
              <Lock size={12} color={colors.tertiary} />
              <Text style={styles.lockedBadgeText}>Locked</Text>
            </View>
          )}
          {isCompleted && (
            <View style={styles.completedBadge}>
              <CheckCircle2 size={12} color={colors.success} />
              <Text style={styles.completedBadgeText}>Completed</Text>
            </View>
          )}
        </View>

        {/* Icon and Title */}
        <View style={styles.titleRow}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isLocked ? colors.border : `${mission.color}20` },
            ]}
          >
            {isLocked ? (
              <Lock size={24} color={colors.tertiary} />
            ) : (
              <IconComponent size={24} color={mission.color} />
            )}
          </View>
          <View style={styles.titleContent}>
            <Text
              style={[styles.title, isLocked && styles.lockedText]}
              numberOfLines={1}
            >
              {mission.title}
            </Text>
            <Text
              style={[styles.subtitle, isLocked && styles.lockedText]}
              numberOfLines={1}
            >
              {mission.subtitle}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text
          style={[styles.description, isLocked && styles.lockedText]}
          numberOfLines={2}
        >
          {mission.description}
        </Text>

        {/* Progress Bar (for active missions) */}
        {isActive && progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={gradients.goldPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {mission.fieldExercises.length} exercises
            </Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>
              {mission.tier === 'free' ? 'Free' : mission.tier === 'premium' ? 'Premium' : 'VIP'}
            </Text>
          </View>
          {!isLocked && (
            <View style={styles.ctaRow}>
              <Text style={[styles.ctaText, isActive && styles.ctaTextActive]}>
                {isCompleted ? 'Review' : 'Start Mission'}
              </Text>
              <ChevronRight
                size={16}
                color={isActive ? colors.accent : colors.secondary}
              />
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  lockedCard: {
    opacity: 0.6,
  },
  activeCard: {
    borderColor: colors.accent,
    borderWidth: 1,
  },
  completedCard: {
    borderColor: colors.success,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  weekBadgeActive: {
    backgroundColor: colors.accentMuted,
  },
  weekText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.secondary,
    letterSpacing: 1,
  },
  weekTextActive: {
    color: colors.accent,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  lockedBadgeText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  completedBadgeText: {
    fontSize: typography.xs,
    color: colors.success,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContent: {
    flex: 1,
    gap: 2,
  },
  compactContent: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  compactTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  compactWeek: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  lockedText: {
    color: colors.tertiary,
  },
  description: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
    width: 36,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  metaDot: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ctaText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  ctaTextActive: {
    color: colors.accent,
  },
});
