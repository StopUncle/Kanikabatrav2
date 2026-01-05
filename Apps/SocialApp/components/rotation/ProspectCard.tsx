// Prospect Card Component
// List item for displaying a prospect in the rotation

import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import {
  User,
  Heart,
  AlertTriangle,
  Calendar,
  MessageSquare,
  ChevronRight,
  Clock,
} from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { Prospect } from '../../content/rotation/types';
import { STATUS_INFO, INTEREST_LEVELS, THREAT_LEVELS } from '../../content/rotation/suggestions';
import { formatLastContact } from '../../stores/rotationStore';

interface ProspectCardProps {
  prospect: Prospect;
  onPress: () => void;
  onLongPress?: () => void;
  compact?: boolean;
}

export function ProspectCard({
  prospect,
  onPress,
  onLongPress,
  compact = false,
}: ProspectCardProps) {
  const statusInfo = STATUS_INFO[prospect.status];
  const interestInfo = INTEREST_LEVELS.find(l => l.level === prospect.interestLevel);
  const threatInfo = THREAT_LEVELS[prospect.threatLevel];

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  const handleLongPress = () => {
    if (onLongPress) {
      haptics.medium();
      onLongPress();
    }
  };

  if (compact) {
    return (
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={({ pressed }) => [styles.compactCard, pressed && styles.pressed]}
      >
        <ProspectAvatar uri={prospect.photoUri} name={prospect.name} size={40} />
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>
            {prospect.nickname || prospect.name}
          </Text>
          <Text style={styles.compactMeta}>
            {formatLastContact(prospect.lastContact)}
          </Text>
        </View>
        <InterestDots level={prospect.interestLevel} />
      </Pressable>
    );
  }

  return (
    <GlassCard variant="medium" style={styles.card}>
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={({ pressed }) => [styles.cardContent, pressed && styles.pressed]}
      >
        {/* Header Row */}
        <View style={styles.header}>
          <ProspectAvatar uri={prospect.photoUri} name={prospect.name} size={56} />

          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name} numberOfLines={1}>
                {prospect.nickname || prospect.name}
              </Text>
              {prospect.nickname && prospect.name !== prospect.nickname && (
                <Text style={styles.realName}>({prospect.name})</Text>
              )}
            </View>

            <View style={styles.metaRow}>
              <View style={[styles.statusBadge, { backgroundColor: `${statusInfo.color}20` }]}>
                <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                <Text style={[styles.statusText, { color: statusInfo.color }]}>
                  {statusInfo.label}
                </Text>
              </View>

              <View style={styles.platformBadge}>
                <Text style={styles.platformText}>{prospect.platform}</Text>
              </View>
            </View>
          </View>

          <ChevronRight size={20} color={colors.tertiary} />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Interest Level */}
          <View style={styles.stat}>
            <Heart size={14} color={interestInfo?.color || colors.secondary} />
            <Text style={styles.statLabel}>Interest</Text>
            <InterestDots level={prospect.interestLevel} />
          </View>

          {/* Last Contact */}
          <View style={styles.stat}>
            <Clock size={14} color={colors.secondary} />
            <Text style={styles.statLabel}>Last Contact</Text>
            <Text style={styles.statValue}>{formatLastContact(prospect.lastContact)}</Text>
          </View>

          {/* Date Count */}
          <View style={styles.stat}>
            <Calendar size={14} color={colors.secondary} />
            <Text style={styles.statLabel}>Dates</Text>
            <Text style={styles.statValue}>{prospect.dateCount}</Text>
          </View>
        </View>

        {/* Flags Row */}
        {(prospect.redFlags.length > 0 || prospect.greenFlags.length > 0) && (
          <View style={styles.flagsRow}>
            {prospect.redFlags.length > 0 && (
              <View style={styles.flagBadge}>
                <AlertTriangle size={12} color="#EF4444" />
                <Text style={styles.flagText}>{prospect.redFlags.length} Red</Text>
              </View>
            )}
            {prospect.greenFlags.length > 0 && (
              <View style={[styles.flagBadge, styles.greenFlagBadge]}>
                <Heart size={12} color="#22C55E" />
                <Text style={[styles.flagText, { color: '#22C55E' }]}>
                  {prospect.greenFlags.length} Green
                </Text>
              </View>
            )}
            {prospect.threatLevel !== 'green' && (
              <View style={[styles.threatBadge, { backgroundColor: `${threatInfo.color}20` }]}>
                <Text style={[styles.threatText, { color: threatInfo.color }]}>
                  {threatInfo.label}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Notes Preview */}
        {prospect.generalNotes && (
          <Text style={styles.notesPreview} numberOfLines={1}>
            {prospect.generalNotes}
          </Text>
        )}
      </Pressable>
    </GlassCard>
  );
}

// Avatar component
function ProspectAvatar({
  uri,
  name,
  size,
}: {
  uri?: string;
  name: string;
  size: number;
}) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      />
    );
  }

  // Generate initials
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={[styles.avatarPlaceholder, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarInitials, { fontSize: size * 0.4 }]}>{initials}</Text>
    </View>
  );
}

// Interest dots component
function InterestDots({ level }: { level: number }) {
  return (
    <View style={styles.dotsContainer}>
      {[1, 2, 3, 4, 5].map(i => (
        <View
          key={i}
          style={[
            styles.dot,
            i <= level ? styles.dotFilled : styles.dotEmpty,
            i <= level && level >= 4 && styles.dotHot,
          ]}
        />
      ))}
    </View>
  );
}

// Flag badge for list items
export function FlagBadge({
  type,
  count,
}: {
  type: 'red' | 'green';
  count: number;
}) {
  const color = type === 'red' ? '#EF4444' : '#22C55E';
  const Icon = type === 'red' ? AlertTriangle : Heart;

  return (
    <View style={[styles.flagBadge, { backgroundColor: `${color}15` }]}>
      <Icon size={12} color={color} />
      <Text style={[styles.flagText, { color }]}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    padding: 0,
    overflow: 'hidden',
  },
  cardContent: {
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    marginRight: spacing.md,
  },
  avatarPlaceholder: {
    backgroundColor: colors.accentMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarInitials: {
    color: colors.accent,
    fontWeight: typography.bold,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  name: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    flex: 1,
  },
  realName: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
  },
  platformBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  platformText: {
    fontSize: typography.xs,
    color: colors.secondary,
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  statValue: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotFilled: {
    backgroundColor: colors.accent,
  },
  dotEmpty: {
    backgroundColor: colors.border,
  },
  dotHot: {
    backgroundColor: '#EF4444',
  },
  flagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  flagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  greenFlagBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  flagText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: '#EF4444',
  },
  threatBadge: {
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  threatText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
  },
  notesPreview: {
    fontSize: typography.xs,
    color: colors.tertiary,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  // Compact styles
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compactContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  compactName: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  compactMeta: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginTop: 2,
  },
});
