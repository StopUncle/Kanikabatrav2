// Skill Node Component
// Individual skill in the skill tree

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Lock, Check, X } from 'lucide-react-native';
import { Skill } from '../../content/academy/types';
import { getIcon } from '../../lib/icons';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

interface SkillNodeProps {
  skill: Skill;
  isUnlocked: boolean;
  canUnlock: boolean;
  treeColor: string;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: { node: 48, icon: 20 },
  md: { node: 64, icon: 28 },
  lg: { node: 80, icon: 36 },
};

export function SkillNode({
  skill,
  isUnlocked,
  canUnlock,
  treeColor,
  onPress,
  size = 'md',
}: SkillNodeProps) {
  const dimensions = SIZES[size];
  const IconComponent = getIcon(skill.icon);

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  const nodeStyle = isUnlocked
    ? { backgroundColor: treeColor, borderColor: treeColor }
    : canUnlock
    ? { backgroundColor: `${treeColor}30`, borderColor: treeColor }
    : { backgroundColor: colors.surface, borderColor: colors.border };

  const iconColor = isUnlocked
    ? colors.background
    : canUnlock
    ? treeColor
    : colors.tertiary;

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View
        style={[
          styles.node,
          {
            width: dimensions.node,
            height: dimensions.node,
            borderRadius: dimensions.node / 2,
          },
          nodeStyle,
        ]}
      >
        <IconComponent size={dimensions.icon} color={iconColor} />

        {/* Lock icon for locked skills */}
        {!isUnlocked && !canUnlock && (
          <View style={styles.lockOverlay}>
            <Lock size={12} color={colors.tertiary} />
          </View>
        )}

        {/* Tier indicator */}
        {skill.tier_required !== 'free' && !isUnlocked && (
          <View style={[styles.tierBadge, skill.tier_required === 'vip' && styles.vipBadge]}>
            <Text style={styles.tierText}>
              {skill.tier_required === 'premium' ? 'P' : 'V'}
            </Text>
          </View>
        )}
      </View>

      {/* Skill name */}
      <Text
        style={[
          styles.name,
          isUnlocked && { color: treeColor },
          !isUnlocked && !canUnlock && styles.nameLocked,
        ]}
        numberOfLines={2}
      >
        {skill.name}
      </Text>

      {/* Cost badge */}
      {!isUnlocked && skill.xpCost > 0 && (
        <View style={styles.costBadge}>
          <Text style={styles.costText}>{skill.xpCost} SP</Text>
        </View>
      )}
    </Pressable>
  );
}

// Skill detail card when selected
export function SkillDetailCard({
  skill,
  isUnlocked,
  canUnlock,
  skillPoints,
  treeColor,
  onUnlock,
  onClose,
  missingPrerequisites = [],
}: {
  skill: Skill;
  isUnlocked: boolean;
  canUnlock: boolean;
  skillPoints: number;
  treeColor: string;
  onUnlock: () => void;
  onClose: () => void;
  missingPrerequisites?: string[];
}) {
  const IconComponent = getIcon(skill.icon);

  return (
    <View style={[styles.detailCard, { borderColor: treeColor }]}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <View style={[styles.detailIcon, { backgroundColor: `${treeColor}20` }]}>
          <IconComponent size={28} color={treeColor} />
        </View>
        <View style={styles.detailHeaderText}>
          <Text style={[styles.detailName, { color: treeColor }]}>{skill.name}</Text>
          <Text style={styles.detailTier}>Tier {skill.tier}</Text>
        </View>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <X size={20} color={colors.tertiary} />
        </Pressable>
      </View>

      {/* Description */}
      <Text style={styles.detailDescription}>{skill.description}</Text>

      {/* Effects */}
      <View style={styles.effectsSection}>
        <Text style={styles.effectsTitle}>Effects:</Text>
        {skill.effects.map((effect, index) => (
          <View key={index} style={styles.effectRow}>
            <Check size={14} color={treeColor} />
            <Text style={styles.effectText}>{effect}</Text>
          </View>
        ))}
      </View>

      {/* Action */}
      {isUnlocked ? (
        <View style={[styles.unlockedBadge, { backgroundColor: `${treeColor}20` }]}>
          <Check size={16} color={treeColor} />
          <Text style={[styles.unlockedText, { color: treeColor }]}>Unlocked</Text>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            haptics.medium();
            onUnlock();
          }}
          disabled={!canUnlock}
          style={[
            styles.unlockButton,
            canUnlock
              ? { backgroundColor: treeColor }
              : { backgroundColor: colors.surface },
          ]}
        >
          <Text
            style={[
              styles.unlockButtonText,
              !canUnlock && { color: colors.tertiary },
            ]}
          >
            {canUnlock
              ? `Unlock (${skill.xpCost} SP)`
              : skillPoints < skill.xpCost
              ? `Need ${skill.xpCost - skillPoints} more SP`
              : missingPrerequisites.length > 0
              ? `Unlock ${missingPrerequisites.join(', ')} first`
              : 'Prerequisites required'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
    marginBottom: spacing.md,
  },
  node: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tierBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vipBadge: {
    backgroundColor: '#D4AF37',
  },
  tierText: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.background,
  },
  name: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 14,
  },
  nameLocked: {
    color: colors.tertiary,
  },
  costBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginTop: 4,
  },
  costText: {
    fontSize: 10,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  // Detail card styles
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    marginHorizontal: spacing.md,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  detailIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailHeaderText: {
    flex: 1,
  },
  detailName: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
  },
  detailTier: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  detailDescription: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  effectsSection: {
    marginBottom: spacing.lg,
  },
  effectsTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  effectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  effectText: {
    fontSize: typography.sm,
    color: colors.secondary,
    flex: 1,
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  unlockedText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  unlockButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  unlockButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.background,
  },
});
