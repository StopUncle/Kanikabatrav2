// Case Card Component
// Displays a case file with progress and status

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { CaseSummary } from '../../content/cases/types';

interface CaseCardProps {
  caseSummary: CaseSummary;
  onPress?: () => void;
  userTier?: 'free' | 'premium' | 'vip';
}

export function CaseCard({ caseSummary, onPress, userTier = 'free' }: CaseCardProps) {
  const { caseFile, progress, isUnlocked, chaptersCompleted, totalChapters } = caseSummary;
  const { status } = progress;

  // Check tier access
  const tierHierarchy = { free: 0, premium: 1, vip: 2 };
  const hasTierAccess = tierHierarchy[userTier] >= tierHierarchy[caseFile.tier];
  const isLocked = !isUnlocked || !hasTierAccess;
  const isCompleted = status === 'completed';
  const isStalled = status === 'stalled';
  const isActive = status === 'in_progress';
  const isAvailable = status === 'available' && isUnlocked && hasTierAccess;

  const progressPercent = totalChapters > 0
    ? Math.round((chaptersCompleted / totalChapters) * 100)
    : 0;

  const handlePress = () => {
    if (isLocked) return;
    haptics.light();
    onPress?.();
  };

  const accentColor = caseFile.accentColor || colors.accent;

  return (
    <Pressable onPress={handlePress} disabled={isLocked}>
      <Card
        style={StyleSheet.flatten([
          styles.card,
          isLocked && styles.lockedCard,
          isActive && { borderColor: accentColor, borderWidth: 1 },
          isCompleted && styles.completedCard,
          isStalled && styles.stalledCard,
        ])}
        variant={isActive ? 'glassGold' : 'glass'}
        glow={isActive}
      >
        {/* Header: Case Number + Status */}
        <View style={styles.header}>
          <View style={[styles.caseBadge, isActive && { backgroundColor: `${accentColor}30` }]}>
            <Text style={[styles.caseNumber, isActive && { color: accentColor }]}>
              CASE #{caseFile.caseNumber}
            </Text>
          </View>

          {isLocked && !hasTierAccess && (
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>
                {caseFile.tier.toUpperCase()}
              </Text>
            </View>
          )}

          {isLocked && hasTierAccess && (
            <View style={styles.statusBadge}>
              <Lock size={12} color={colors.tertiary} />
              <Text style={styles.statusText}>Locked</Text>
            </View>
          )}

          {isCompleted && (
            <View style={styles.completedBadge}>
              <CheckCircle2 size={12} color={colors.success} />
              <Text style={styles.completedText}>CASE CLOSED</Text>
            </View>
          )}

          {isStalled && (
            <View style={styles.stalledBadge}>
              <AlertCircle size={12} color={colors.warning} />
              <Text style={styles.stalledText}>Study Required</Text>
            </View>
          )}
        </View>

        {/* Icon + Title */}
        <View style={styles.titleRow}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isLocked ? colors.border : `${accentColor}20` },
            ]}
          >
            {isLocked ? (
              <Lock size={24} color={colors.tertiary} />
            ) : (
              <Text style={styles.iconEmoji}>{caseFile.iconEmoji || '📁'}</Text>
            )}
          </View>
          <View style={styles.titleContent}>
            <Text
              style={[styles.title, isLocked && styles.lockedText]}
              numberOfLines={1}
            >
              {caseFile.title}
            </Text>
            <Text
              style={[styles.subtitle, isLocked && styles.lockedText]}
              numberOfLines={1}
            >
              {caseFile.subtitle}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text
          style={[styles.description, isLocked && styles.lockedText]}
          numberOfLines={2}
        >
          {caseFile.description}
        </Text>

        {/* Progress Bar (for active/stalled cases) */}
        {(isActive || isStalled || isCompleted) && totalChapters > 1 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={isCompleted ? ['#10B981', '#059669'] : isStalled ? ['#F59E0B', '#D97706'] : gradients.goldPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <Text style={[styles.progressText, isStalled && { color: colors.warning }]}>
              Ch {chaptersCompleted}/{totalChapters}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {totalChapters} chapter{totalChapters !== 1 ? 's' : ''}
            </Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>
              {caseFile.tier === 'free' ? 'Free' : caseFile.tier === 'premium' ? 'Premium' : 'VIP'}
            </Text>
          </View>

          {!isLocked && (
            <View style={styles.ctaRow}>
              <Text style={[styles.ctaText, isActive && { color: accentColor }]}>
                {isCompleted
                  ? 'Review'
                  : isStalled
                    ? 'Study'
                    : isActive
                      ? 'Continue'
                      : 'Start Case'}
              </Text>
              <ChevronRight
                size={16}
                color={isActive ? accentColor : colors.secondary}
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
    gap: spacing.md,
  },
  lockedCard: {
    opacity: 0.6,
  },
  completedCard: {
    borderColor: colors.success,
    borderWidth: 1,
  },
  stalledCard: {
    borderColor: colors.warning,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caseBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  caseNumber: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.secondary,
    letterSpacing: 1,
  },
  tierBadge: {
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  completedText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.success,
    letterSpacing: 0.5,
  },
  stalledBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  stalledText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.warning,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  titleContent: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  lockedText: {
    color: colors.tertiary,
  },
  description: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
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
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
    minWidth: 50,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  metaDot: {
    fontSize: typography.xs,
    color: colors.tertiary,
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
});
