// ManipulationAlert Component - Tactic detection popup
// Flashes when NPC uses a manipulation tactic you should recognize

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { AlertTriangle, Eye, X } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import type { DetectedManipulation, ManipulationSeverity } from '../../content/simulator/types';

interface ManipulationAlertProps {
  manipulation: DetectedManipulation;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}

const SEVERITY_CONFIG: Record<ManipulationSeverity, {
  color: string;
  bgColor: string;
  icon: typeof AlertTriangle;
  label: string;
}> = {
  subtle: {
    color: colors.warning,
    bgColor: 'rgba(255, 176, 32, 0.15)',
    icon: Eye,
    label: 'SUBTLE',
  },
  moderate: {
    color: '#FF9800',
    bgColor: 'rgba(255, 152, 0, 0.15)',
    icon: AlertTriangle,
    label: 'MODERATE',
  },
  severe: {
    color: colors.error,
    bgColor: 'rgba(229, 69, 69, 0.15)',
    icon: AlertTriangle,
    label: 'SEVERE',
  },
};

export function ManipulationAlert({
  manipulation,
  onDismiss,
  autoDismiss = true,
  autoDismissDelay = 4000,
}: ManipulationAlertProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const config = SEVERITY_CONFIG[manipulation.severity];
  const Icon = config.icon;

  useEffect(() => {
    // Slide in from top
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 15,
        stiffness: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto dismiss
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismissDelay);
      return () => clearTimeout(timer);
    }
  }, [slideAnim, fadeAnim, pulseAnim, autoDismiss, autoDismissDelay]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: config.bgColor,
          borderColor: config.color,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: config.color + '30',
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Icon size={20} color={config.color} />
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.label, { color: config.color }]}>
            MANIPULATION DETECTED
          </Text>
          <View style={[styles.severityBadge, { backgroundColor: config.color + '30' }]}>
            <Text style={[styles.severityText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
        </View>
        <Text style={styles.tacticName}>{manipulation.tacticName}</Text>
        <Text style={styles.description}>{manipulation.description}</Text>
      </View>

      {/* Dismiss button */}
      {onDismiss && (
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={handleDismiss}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={18} color={colors.tertiary} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    letterSpacing: 1,
  },
  severityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  severityText: {
    fontSize: 10,
    fontWeight: typography.bold,
    letterSpacing: 0.5,
  },
  tacticName: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: typography.sm * 1.4,
  },
  dismissButton: {
    padding: spacing.xs,
  },
});

export default ManipulationAlert;
