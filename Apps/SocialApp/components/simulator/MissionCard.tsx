// Mission Card Component - Compact card for sub-missions between major levels
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Play, CheckCircle, Clock, AlertTriangle } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  glass,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { Difficulty } from '../../content/simulator/types';

export interface Mission {
  id: string;
  number: string; // e.g., "1.1", "1.2", "2.1"
  title: string;
  duration: string; // e.g., "10-12 min"
  difficulty: Difficulty;
  scenarioId: string | null;
  unlocked: boolean;
  requiresCompletion?: string; // scenario ID that must be completed first
}

interface MissionCardProps {
  mission: Mission;
  isCompleted?: boolean;
  isFailed?: boolean; // Show if player failed this mission before
  onPress: () => void;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { color: string; label: string }> = {
  beginner: { color: '#22C55E', label: 'Easy' },
  intermediate: { color: '#F59E0B', label: 'Medium' },
  advanced: { color: '#EF4444', label: 'Hard' },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function MissionCard({ mission, isCompleted, isFailed, onPress }: MissionCardProps) {
  const shakeX = useSharedValue(0);
  const scale = useSharedValue(1);

  const difficultyConfig = DIFFICULTY_CONFIG[mission.difficulty];
  const isLocked = !mission.unlocked;

  // Shake animation for locked tap
  const triggerShake = () => {
    haptics.warning();
    shakeX.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const handlePressIn = () => {
    if (!isLocked) {
      scale.value = withSpring(0.98, { damping: 15 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handlePress = () => {
    if (isLocked) {
      triggerShake();
      return;
    }
    haptics.medium();
    onPress();
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeX.value },
      { scale: scale.value },
    ],
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        containerStyle,
        isLocked && styles.containerLocked,
        isCompleted && styles.containerCompleted,
        isFailed && !isCompleted && styles.containerFailed,
      ]}
    >
      {/* Background gradient */}
      <LinearGradient
        colors={
          isLocked
            ? ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.15)']
            : isCompleted
              ? ['rgba(76, 175, 80, 0.1)', 'transparent']
              : isFailed
                ? ['rgba(239, 68, 68, 0.08)', 'transparent']
                : ['rgba(201, 169, 97, 0.05)', 'transparent']
        }
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.content}>
        {/* Mission number badge */}
        <View
          style={[
            styles.numberBadge,
            isLocked && styles.numberBadgeLocked,
            isCompleted && styles.numberBadgeCompleted,
            isFailed && !isCompleted && styles.numberBadgeFailed,
          ]}
        >
          {isLocked ? (
            <Lock size={14} color={colors.tertiary} />
          ) : isCompleted ? (
            <CheckCircle size={14} color={colors.success} />
          ) : isFailed ? (
            <AlertTriangle size={14} color={colors.error} />
          ) : (
            <Text style={styles.numberText}>{mission.number}</Text>
          )}
        </View>

        {/* Mission info */}
        <View style={styles.info}>
          <Text
            style={[styles.title, isLocked && styles.textLocked]}
            numberOfLines={1}
          >
            {mission.title}
          </Text>

          <View style={styles.metaRow}>
            {/* Duration */}
            <View style={styles.metaItem}>
              <Clock size={10} color={isLocked ? colors.tertiary : colors.secondary} />
              <Text style={[styles.metaText, isLocked && styles.textLocked]}>
                {mission.duration}
              </Text>
            </View>

            {/* Difficulty */}
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: isLocked ? colors.surfaceElevated : difficultyConfig.color + '20' },
              ]}
            >
              <Text
                style={[
                  styles.difficultyText,
                  { color: isLocked ? colors.tertiary : difficultyConfig.color },
                ]}
              >
                {difficultyConfig.label}
              </Text>
            </View>
          </View>
        </View>

        {/* Play/Lock indicator */}
        <View
          style={[
            styles.actionButton,
            isLocked && styles.actionButtonLocked,
            isCompleted && styles.actionButtonCompleted,
          ]}
        >
          {isLocked ? (
            <Lock size={14} color={colors.tertiary} />
          ) : isCompleted ? (
            <Play size={14} color={colors.success} fill={colors.success} />
          ) : (
            <Play size={14} color={colors.accent} fill={colors.accent} />
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.light,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  containerLocked: {
    opacity: 0.6,
  },
  containerCompleted: {
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  containerFailed: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accentMuted,
  },
  numberBadgeLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  numberBadgeCompleted: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  numberBadgeFailed: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  numberText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: 2,
  },
  textLocked: {
    color: colors.tertiary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 9,
    fontWeight: typography.bold,
    letterSpacing: 0.3,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accentMuted,
  },
  actionButtonLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  actionButtonCompleted: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
});
