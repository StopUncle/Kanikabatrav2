import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LucideIcons from 'lucide-react-native';
import { Lock, CheckCircle2, ChevronRight, Clock } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { TransformationProgram, ProgramProgress } from '../../content/programs';

interface ProgramCardProps {
  program: TransformationProgram;
  status: 'locked' | 'available' | 'enrolled' | 'completed';
  progress?: ProgramProgress;
  lockReason?: string;
  onPress?: () => void;
}

export function ProgramCard({
  program,
  status,
  progress,
  lockReason,
  onPress,
}: ProgramCardProps) {
  const IconComponent =
    (LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size: number; color: string; strokeWidth?: number }>
    >)[program.icon] || LucideIcons.Target;

  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isEnrolled = status === 'enrolled';

  const handlePress = () => {
    if (isLocked) return;
    haptics.light();
    onPress?.();
  };

  const weeksCompleted = progress?.weeksCompleted.length || 0;
  const progressPercent = Math.round((weeksCompleted / program.durationWeeks) * 100);

  return (
    <Pressable onPress={handlePress} disabled={isLocked}>
      <Card
        style={StyleSheet.flatten([
          styles.card,
          isLocked && styles.lockedCard,
          isCompleted && styles.completedCard,
          isEnrolled && styles.enrolledCard,
        ])}
        variant={isEnrolled ? 'glassGold' : 'glass'}
        glow={isEnrolled}
      >
        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isLocked ? colors.border : `${program.color}20` },
            ]}
          >
            {isLocked ? (
              <Lock size={28} color={colors.tertiary} />
            ) : isCompleted ? (
              <CheckCircle2 size={28} color={colors.success} />
            ) : (
              <IconComponent size={28} color={program.color} />
            )}
          </View>
          <View style={styles.tierBadge}>
            <Text style={styles.tierText}>{program.tier.toUpperCase()}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, isLocked && styles.lockedText]}>
          {program.title}
        </Text>
        <Text style={[styles.tagline, isLocked && styles.lockedText]}>
          {program.tagline}
        </Text>

        {/* Description */}
        <Text style={[styles.description, isLocked && styles.lockedText]} numberOfLines={2}>
          {program.description}
        </Text>

        {/* Progress (if enrolled) */}
        {isEnrolled && progress && (
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={gradients.goldPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              Week {progress.currentWeek} of {program.durationWeeks}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.durationBadge}>
            <Clock size={14} color={colors.secondary} />
            <Text style={styles.durationText}>{program.durationWeeks} weeks</Text>
          </View>

          {isLocked && lockReason && (
            <Text style={styles.lockReason}>{lockReason}</Text>
          )}

          {!isLocked && (
            <View style={styles.ctaRow}>
              <Text style={[styles.ctaText, isEnrolled && styles.ctaTextActive]}>
                {isCompleted ? 'Review' : isEnrolled ? 'Continue' : 'Start Program'}
              </Text>
              <ChevronRight
                size={16}
                color={isEnrolled ? colors.accent : colors.secondary}
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
    gap: spacing.sm,
  },
  lockedCard: {
    opacity: 0.6,
  },
  completedCard: {
    borderColor: colors.success,
    borderWidth: 1,
  },
  enrolledCard: {
    borderColor: colors.accent,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  tagline: {
    fontSize: typography.md,
    color: colors.accent,
    marginTop: -spacing.xs,
  },
  description: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  lockedText: {
    color: colors.tertiary,
  },
  progressSection: {
    gap: spacing.xs,
    paddingTop: spacing.sm,
  },
  progressBar: {
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
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  lockReason: {
    fontSize: typography.xs,
    color: colors.tertiary,
    fontStyle: 'italic',
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
