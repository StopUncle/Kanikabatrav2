// CharacterCard Component - Shows who you're dealing with at a glance
// Displays name, age, personality type, threat level, and weakness

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { User, AlertTriangle, Shield, ShieldAlert, ShieldOff } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import type { CharacterProfile, ThreatLevel } from '../../content/simulator/types';

interface CharacterCardProps {
  profile: CharacterProfile;
  compact?: boolean;
  showWeakness?: boolean;
  animated?: boolean;
}

const THREAT_CONFIG: Record<ThreatLevel, {
  icon: typeof Shield;
  color: string;
  label: string;
}> = {
  low: {
    icon: Shield,
    color: colors.success,
    label: 'LOW',
  },
  medium: {
    icon: ShieldAlert,
    color: colors.warning,
    label: 'MEDIUM',
  },
  high: {
    icon: ShieldOff,
    color: colors.error,
    label: 'HIGH',
  },
};

export function CharacterCard({
  profile,
  compact = false,
  showWeakness = true,
  animated = true,
}: CharacterCardProps) {
  const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const scaleAnim = useRef(new Animated.Value(animated ? 0.95 : 1)).current;

  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 15,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animated, fadeAnim, scaleAnim]);

  const threatConfig = THREAT_CONFIG[profile.threatLevel];
  const ThreatIcon = threatConfig.icon;

  if (compact) {
    return (
      <Animated.View
        style={[
          styles.compactContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.compactAvatar}>
          {profile.avatarUrl ? (
            <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImage} />
          ) : (
            <User size={20} color={colors.secondary} />
          )}
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactName}>{profile.name}</Text>
          <Text style={styles.compactType} numberOfLines={1}>
            {profile.personalityType}
          </Text>
        </View>
        <View style={[styles.compactThreat, { backgroundColor: threatConfig.color + '20' }]}>
          <ThreatIcon size={14} color={threatConfig.color} />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Header Row */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {profile.avatarUrl ? (
            <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImageLarge} />
          ) : (
            <User size={28} color={colors.secondary} />
          )}
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.name}</Text>
            {profile.age && (
              <Text style={styles.age}>{profile.age}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Personality Type */}
      <View style={styles.row}>
        <Text style={styles.label}>TYPE</Text>
        <Text style={styles.personalityType}>{profile.personalityType}</Text>
      </View>

      {/* Threat Level */}
      <View style={styles.row}>
        <Text style={styles.label}>THREAT</Text>
        <View style={[styles.threatBadge, { backgroundColor: threatConfig.color + '20' }]}>
          <ThreatIcon size={14} color={threatConfig.color} />
          <Text style={[styles.threatText, { color: threatConfig.color }]}>
            {threatConfig.label}
          </Text>
        </View>
      </View>

      {/* Weakness */}
      {showWeakness && profile.weakness && (
        <View style={styles.weaknessContainer}>
          <View style={styles.weaknessHeader}>
            <AlertTriangle size={12} color={colors.warning} />
            <Text style={styles.weaknessLabel}>WEAKNESS</Text>
          </View>
          <Text style={styles.weaknessText}>{profile.weakness}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  avatarImageLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  name: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  age: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.tertiary,
    letterSpacing: 0.5,
    width: 60,
  },
  personalityType: {
    flex: 1,
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  threatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  threatText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    letterSpacing: 0.5,
  },
  weaknessContainer: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: 'rgba(255, 176, 32, 0.1)',
    borderRadius: borderRadius.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.warning,
  },
  weaknessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  weaknessLabel: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.warning,
    letterSpacing: 0.5,
  },
  weaknessText: {
    fontSize: typography.sm,
    color: colors.warning,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  // Compact styles
  compactContainer: {
    ...glass.light,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  compactAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactInfo: {
    flex: 1,
  },
  compactName: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  compactType: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  compactThreat: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CharacterCard;
