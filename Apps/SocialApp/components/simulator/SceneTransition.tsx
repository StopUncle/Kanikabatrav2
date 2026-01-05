// SceneTransition Component - Time/location breaks
// Shows transitions between acts, time skips, and location changes

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Clock, MapPin, ChevronRight, Milestone } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import type { TransitionType } from '../../content/simulator/types';

interface SceneTransitionProps {
  type: TransitionType;
  title: string;
  subtitle?: string;
  onComplete?: () => void;
  duration?: number;  // ms to show before auto-advancing
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TRANSITION_CONFIG: Record<TransitionType, {
  icon: typeof Clock;
  color: string;
  bgPattern: string;
}> = {
  'time-skip': {
    icon: Clock,
    color: colors.accent,
    bgPattern: 'linear',
  },
  'location-change': {
    icon: MapPin,
    color: colors.success,
    bgPattern: 'radial',
  },
  'act-break': {
    icon: Milestone,
    color: colors.primary,
    bgPattern: 'dramatic',
  },
};

export function SceneTransition({
  type,
  title,
  subtitle,
  onComplete,
  duration = 2500,
}: SceneTransitionProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const lineAnim = useRef(new Animated.Value(0)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;

  const config = TRANSITION_CONFIG[type];
  const Icon = config.icon;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 15,
        stiffness: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // Line animation
    Animated.timing(lineAnim, {
      toValue: 1,
      duration: 1000,
      delay: 300,
      useNativeDriver: false,
    }).start();

    // Icon rotation for time-skip
    if (type === 'time-skip') {
      Animated.loop(
        Animated.timing(iconRotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }

    // Auto-advance
    if (onComplete) {
      const timer = setTimeout(() => {
        // Exit animation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onComplete();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [type, fadeAnim, slideAnim, lineAnim, iconRotateAnim, duration, onComplete]);

  const iconRotate = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      {/* Background gradient effect */}
      <View style={styles.bgOverlay} />

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            { borderColor: config.color },
            type === 'time-skip' && { transform: [{ rotate: iconRotate }] },
          ]}
        >
          <Icon size={28} color={config.color} />
        </Animated.View>

        {/* Decorative line */}
        <View style={styles.lineContainer}>
          <Animated.View
            style={[
              styles.line,
              {
                backgroundColor: config.color,
                width: lineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100],
                }),
              },
            ]}
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: config.color }]}>
          {title}
        </Text>

        {/* Subtitle */}
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}

        {/* Continue indicator */}
        <View style={styles.continueIndicator}>
          <ChevronRight size={16} color={colors.tertiary} />
          <ChevronRight size={16} color={colors.tertiary} style={{ marginLeft: -10, opacity: 0.7 }} />
          <ChevronRight size={16} color={colors.tertiary} style={{ marginLeft: -10, opacity: 0.4 }} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// Quick transition badge for inline use
export function TransitionBadge({
  type,
  text,
}: {
  type: TransitionType;
  text: string;
}) {
  const config = TRANSITION_CONFIG[type];
  const Icon = config.icon;

  return (
    <View style={[styles.badge, { borderColor: config.color + '40' }]}>
      <Icon size={12} color={config.color} />
      <Text style={[styles.badgeText, { color: config.color }]}>
        {text}
      </Text>
    </View>
  );
}

// Chapter/Act divider
export function ActDivider({
  actNumber,
  actTitle,
}: {
  actNumber: number;
  actTitle: string;
}) {
  return (
    <View style={styles.actDivider}>
      <View style={styles.actLine} />
      <View style={styles.actContent}>
        <Text style={styles.actNumber}>ACT {actNumber}</Text>
        <Text style={styles.actTitle}>{actTitle}</Text>
      </View>
      <View style={styles.actLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: spacing.lg,
  },
  lineContainer: {
    height: 2,
    width: 100,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 1,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  line: {
    height: '100%',
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: spacing.xl,
  },
  continueIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5,
  },
  // Badge styles
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignSelf: 'center',
  },
  badgeText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    letterSpacing: 0.5,
  },
  // Act divider styles
  actDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  actLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  actContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  actNumber: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.bold,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  actTitle: {
    fontSize: typography.lg,
    color: colors.primary,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
  },
});

export default SceneTransition;
