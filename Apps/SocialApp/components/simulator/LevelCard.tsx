// Level Card Component with Animations
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Play, CheckCircle, Sparkles } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  glass,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';

export interface StoryLevel {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  scenes: number | null;
  color: string;
  unlocked: boolean;
  scenarioId: string | null;
  requiresCompletion?: string;
  comingSoon?: boolean;
}

interface LevelCardProps {
  level: StoryLevel;
  isCompleted?: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function LevelCard({ level, isCompleted, onPress }: LevelCardProps) {
  // Animation values
  const glowOpacity = useSharedValue(0);
  const shakeX = useSharedValue(0);
  const scale = useSharedValue(1);

  // Glow pulse animation for unlocked levels
  useEffect(() => {
    if (level.unlocked && !level.comingSoon) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }
  }, [level.unlocked, level.comingSoon, glowOpacity]);

  // Shake animation for locked tap
  const triggerShake = () => {
    haptics.warning();
    shakeX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-4, { duration: 50 }),
      withTiming(4, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  // Press animation
  const handlePressIn = () => {
    if (level.unlocked && !level.comingSoon) {
      scale.value = withSpring(0.98, { damping: 15 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handlePress = () => {
    if (!level.unlocked || level.comingSoon) {
      triggerShake();
      return;
    }
    haptics.medium();
    onPress();
  };

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeX.value },
      { scale: scale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowOpacity.value, [0, 1], [0, 0.6]),
  }));

  const isLocked = !level.unlocked || level.comingSoon;
  const requiresLevel = level.requiresCompletion
    ? parseInt(level.requiresCompletion.replace('university-level-', ''), 10)
    : null;

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        containerStyle,
        isLocked && styles.containerLocked,
        !isLocked && { borderColor: level.color + '50' },
      ]}
    >
      {/* Glow effect for unlocked levels */}
      {!isLocked && (
        <Animated.View
          style={[
            styles.glowBorder,
            { borderColor: level.color },
            glowStyle,
          ]}
          pointerEvents="none"
        />
      )}

      {/* Background gradient */}
      <LinearGradient
        colors={
          isLocked
            ? ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.2)']
            : [`${level.color}15`, 'transparent']
        }
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.content}>
        {/* Level number badge */}
        <View
          style={[
            styles.levelBadge,
            isLocked
              ? styles.levelBadgeLocked
              : { backgroundColor: level.color + '20' },
          ]}
        >
          {isLocked ? (
            <Lock size={20} color={colors.tertiary} />
          ) : isCompleted ? (
            <CheckCircle size={20} color={level.color} />
          ) : (
            <Text style={[styles.levelNumber, { color: level.color }]}>
              {level.number}
            </Text>
          )}
        </View>

        {/* Level info */}
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text
              style={[styles.levelLabel, isLocked && styles.textLocked]}
            >
              LEVEL {level.number}
            </Text>
            {!isLocked && level.number === 1 && (
              <View style={styles.freeBadge}>
                <Sparkles size={10} color={colors.accent} />
                <Text style={styles.freeText}>FREE</Text>
              </View>
            )}
            {level.comingSoon && (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>COMING SOON</Text>
              </View>
            )}
          </View>

          <Text style={[styles.title, isLocked && styles.textLocked]}>
            {level.title}
          </Text>

          <Text style={[styles.subtitle, isLocked && styles.subtitleLocked]}>
            {isLocked && requiresLevel
              ? `Complete Level ${requiresLevel} to unlock`
              : level.scenes
                ? `${level.subtitle} \u2022 ${level.scenes} scenes`
                : level.subtitle}
          </Text>
        </View>

        {/* Play button */}
        <View
          style={[
            styles.playButton,
            isLocked
              ? styles.playButtonLocked
              : { backgroundColor: level.color + '20' },
          ]}
        >
          {isLocked ? (
            <Lock size={18} color={colors.tertiary} />
          ) : (
            <Play size={18} color={level.color} fill={level.color} />
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    position: 'relative',
  },
  containerLocked: {
    opacity: 0.7,
    borderColor: colors.border,
  },
  glowBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    pointerEvents: 'none',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  levelNumber: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 2,
  },
  levelLabel: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.secondary,
    letterSpacing: 1,
  },
  freeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: borderRadius.sm,
  },
  freeText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 0.5,
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: borderRadius.sm,
  },
  comingSoonText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: '#8B5CF6',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: 2,
  },
  textLocked: {
    color: colors.tertiary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  subtitleLocked: {
    color: colors.tertiary,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonLocked: {
    backgroundColor: colors.surfaceElevated,
  },
});
