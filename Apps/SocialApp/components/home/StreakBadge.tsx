import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Flame } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useGamificationStore } from '../../stores/gamificationStore';
import { useAuthStore } from '../../stores/authStore';

interface StreakBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

export function StreakBadge({ size = 'md', onPress }: StreakBadgeProps) {
  const { user } = useAuthStore();
  const { currentStreak, streakJustIncreased, checkStreak } = useGamificationStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Check streak on mount
  useEffect(() => {
    if (user?.id) checkStreak();
  }, [user?.id, checkStreak]);

  // Animate when streak increases
  useEffect(() => {
    if (streakJustIncreased) {
      haptics.success();

      // Pulse animation
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Glow animation
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
        ]),
        { iterations: 3 }
      ).start();
    }
  }, [streakJustIncreased, pulseAnim, glowAnim]);

  const sizeStyles = {
    sm: {
      container: styles.containerSm,
      icon: 14,
      text: styles.textSm,
    },
    md: {
      container: styles.containerMd,
      icon: 16,
      text: styles.textMd,
    },
    lg: {
      container: styles.containerLg,
      icon: 20,
      text: styles.textLg,
    },
  };

  const currentSize = sizeStyles[size];

  // Determine flame color based on streak
  const getFlameColor = () => {
    if (currentStreak >= 30) return '#FF4500'; // Red-orange for hot streaks
    if (currentStreak >= 7) return '#FF8C00';  // Dark orange
    if (currentStreak >= 3) return '#FFA500';  // Orange
    return colors.accent; // Gold for starting
  };

  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  if (currentStreak === 0) {
    return null; // Don't show badge if no streak
  }

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <Pressable
        style={[styles.container, currentSize.container]}
        onPress={handlePress}
        disabled={!onPress}
      >
        <Animated.View
          style={[
            styles.glowOverlay,
            {
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
              }),
            },
          ]}
        />
        <Flame size={currentSize.icon} color={getFlameColor()} fill={getFlameColor()} />
        <Text style={[styles.text, currentSize.text]}>{currentStreak}</Text>
      </Pressable>
    </Animated.View>
  );
}

// Compact inline version for headers
export function StreakBadgeInline() {
  const { currentStreak } = useGamificationStore();

  if (currentStreak === 0) return null;

  return (
    <View style={styles.inline}>
      <Flame size={12} color="#FF8C00" fill="#FF8C00" />
      <Text style={styles.inlineText}>{currentStreak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 140, 0, 0.15)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 0, 0.3)',
    overflow: 'hidden',
  },
  containerSm: {
    paddingVertical: spacing.xs - 2,
    paddingHorizontal: spacing.sm,
    gap: 4,
  },
  containerMd: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    gap: 6,
  },
  containerLg: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: 8,
  },
  text: {
    fontWeight: typography.bold,
    color: '#FF8C00',
  },
  textSm: {
    fontSize: typography.xs,
  },
  textMd: {
    fontSize: typography.sm,
  },
  textLg: {
    fontSize: typography.md,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FF8C00',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  inlineText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: '#FF8C00',
  },
});
