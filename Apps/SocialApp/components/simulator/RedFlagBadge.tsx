// RedFlagBadge Component - Red flag indicator
// Shows individual red flags spotted during the scenario

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Flag, AlertOctagon, Info } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';

interface RedFlagBadgeProps {
  text: string;
  severity?: 'warning' | 'danger' | 'critical';
  onPress?: () => void;
  showIcon?: boolean;
  compact?: boolean;
  animated?: boolean;
}

const SEVERITY_CONFIG = {
  warning: {
    color: colors.warning,
    bgColor: 'rgba(255, 176, 32, 0.15)',
    icon: Info,
  },
  danger: {
    color: colors.error,
    bgColor: 'rgba(229, 69, 69, 0.15)',
    icon: Flag,
  },
  critical: {
    color: '#B71C1C',
    bgColor: 'rgba(183, 28, 28, 0.2)',
    icon: AlertOctagon,
  },
};

export function RedFlagBadge({
  text,
  severity = 'danger',
  onPress,
  showIcon = true,
  compact = false,
  animated = true,
}: RedFlagBadgeProps) {
  const scaleAnim = useRef(new Animated.Value(animated ? 0.8 : 1)).current;
  const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const config = SEVERITY_CONFIG[severity];
  const Icon = config.icon;

  useEffect(() => {
    if (animated) {
      // Pop-in animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 10,
          stiffness: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Shake for critical severity
      if (severity === 'critical') {
        Animated.sequence([
          Animated.delay(300),
          Animated.loop(
            Animated.sequence([
              Animated.timing(shakeAnim, {
                toValue: 3,
                duration: 50,
                useNativeDriver: true,
              }),
              Animated.timing(shakeAnim, {
                toValue: -3,
                duration: 50,
                useNativeDriver: true,
              }),
              Animated.timing(shakeAnim, {
                toValue: 2,
                duration: 50,
                useNativeDriver: true,
              }),
              Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
              }),
            ]),
            { iterations: 2 }
          ),
        ]).start();
      }
    }
  }, [animated, severity, scaleAnim, fadeAnim, shakeAnim]);

  const content = (
    <Animated.View
      style={[
        compact ? styles.compactContainer : styles.container,
        {
          backgroundColor: config.bgColor,
          borderColor: config.color,
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateX: shakeAnim },
          ],
        },
      ]}
    >
      {showIcon && (
        <Icon
          size={compact ? 12 : 16}
          color={config.color}
        />
      )}
      <Text
        style={[
          compact ? styles.compactText : styles.text,
          { color: config.color },
        ]}
        numberOfLines={compact ? 1 : undefined}
      >
        {text}
      </Text>
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

// Inline variant for embedding in text
export function RedFlagInline({
  text,
  severity = 'danger',
}: {
  text: string;
  severity?: 'warning' | 'danger' | 'critical';
}) {
  const config = SEVERITY_CONFIG[severity];

  return (
    <View style={styles.inlineContainer}>
      <Flag size={10} color={config.color} />
      <Text style={[styles.inlineText, { color: config.color }]}>
        {text}
      </Text>
    </View>
  );
}

// Counter badge showing total red flags spotted
export function RedFlagCounter({
  count,
  max,
  showLabel = true,
}: {
  count: number;
  max?: number;
  showLabel?: boolean;
}) {
  const percentage = max ? (count / max) * 100 : 0;
  const color = count === 0
    ? colors.tertiary
    : percentage >= 75
    ? colors.success
    : percentage >= 50
    ? colors.warning
    : colors.error;

  return (
    <View style={styles.counterContainer}>
      <View style={[styles.counterBadge, { backgroundColor: color + '20' }]}>
        <Flag size={14} color={color} />
        <Text style={[styles.counterText, { color }]}>
          {count}{max ? `/${max}` : ''}
        </Text>
      </View>
      {showLabel && (
        <Text style={styles.counterLabel}>
          RED FLAGS {count > 0 ? 'SPOTTED' : ''}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  compactText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
  },
  // Inline styles
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginHorizontal: 2,
  },
  inlineText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
  },
  // Counter styles
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  counterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  counterText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
  },
  counterLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 0.5,
  },
});

export default RedFlagBadge;
