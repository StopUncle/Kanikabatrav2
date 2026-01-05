import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LucideIcons from 'lucide-react-native';
import { AuroraBackground } from '../effects/AuroraBackground';
import { GradientButton } from '../ui/GradientButton';
import { colors, spacing, typography, borderRadius, shadows, gradients } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { WeeklyMission } from '../../content/missions';
import { ChevronRight, Clock, Target } from 'lucide-react-native';

interface CurrentMissionHeroProps {
  mission: WeeklyMission;
  progress: number; // 0-100
  daysRemaining: number;
  onContinue: () => void;
}

export function CurrentMissionHero({
  mission,
  progress,
  daysRemaining,
  onContinue,
}: CurrentMissionHeroProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size: number; color: string; strokeWidth?: number }>>)[mission.icon] || LucideIcons.Target;

  const exercisesCompleted = Math.round((progress / 100) * mission.fieldExercises.length);
  const totalExercises = mission.fieldExercises.length;

  return (
    <View style={[styles.container, shadows.glow]}>
      <AuroraBackground style={styles.aurora} intensity="strong">
        <View style={styles.content}>
          {/* Week Badge */}
          <View style={styles.weekBadge}>
            <Text style={styles.weekText}>WEEK {mission.week}</Text>
          </View>

          {/* Icon */}
          <View style={[styles.iconContainer, shadows.glowIntense]}>
            <LinearGradient
              colors={[mission.color, `${mission.color}CC`]}
              style={styles.iconGradient}
            >
              <IconComponent size={36} color="#FFFFFF" strokeWidth={1.5} />
            </LinearGradient>
          </View>

          {/* Title */}
          <Text style={styles.title}>{mission.title}</Text>
          <Text style={styles.subtitle}>{mission.subtitle}</Text>

          {/* Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <Target size={16} color={colors.accent} />
                <Text style={styles.statText}>
                  {exercisesCompleted}/{totalExercises} exercises
                </Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color={colors.secondary} />
                <Text style={styles.statText}>
                  {daysRemaining} days left
                </Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <LinearGradient
                colors={gradients.goldPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressPercent}>{progress}% complete</Text>
          </View>

          {/* CTA */}
          <GradientButton
            title={progress > 0 ? 'Continue Mission' : 'Start Mission'}
            onPress={() => {
              haptics.medium();
              onContinue();
            }}
            glow
            fullWidth
            icon={<ChevronRight size={18} color={colors.background} />}
          />
        </View>
      </AuroraBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  aurora: {
    borderRadius: borderRadius.xl,
  },
  content: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  weekBadge: {
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  weekText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 2,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  progressSection: {
    width: '100%',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
    textAlign: 'center',
  },
});
