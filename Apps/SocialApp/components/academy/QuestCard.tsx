// Quest Card Component
// Display quest information and progress

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CheckCircle, Lock, ChevronRight, Circle, Check, Zap, Star } from 'lucide-react-native';
import { Quest, QuestProgress } from '../../content/academy/types';
import { getIcon } from '../../lib/icons';
import { QUEST_CATEGORIES } from '../../content/academy/quests';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { haptics } from '../../lib/haptics';

interface QuestCardProps {
  quest: Quest;
  progress?: QuestProgress;
  isCompleted?: boolean;
  isLocked?: boolean;
  onPress: () => void;
}

export function QuestCard({
  quest,
  progress,
  isCompleted = false,
  isLocked = false,
  onPress,
}: QuestCardProps) {
  const IconComponent = getIcon(quest.icon);
  const categoryInfo = QUEST_CATEGORIES[quest.category];

  const completedCount = progress?.completedObjectives.length ?? 0;
  const totalObjectives = quest.objectives.length;
  const progressPercent = (completedCount / totalObjectives) * 100;

  return (
    <GlassCard
      variant={isCompleted ? 'gold' : 'medium'}
      style={[styles.card, isLocked ? styles.cardLocked : undefined]}
    >
      <Pressable
        onPress={() => {
          if (!isLocked) {
            haptics.light();
            onPress();
          }
        }}
        style={styles.content}
      >
        {/* Category Badge */}
        <View style={[styles.categoryBadge, { backgroundColor: `${categoryInfo.color}20` }]}>
          <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
            {categoryInfo.label}
          </Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${categoryInfo.color}15` }]}>
            <IconComponent
              size={24}
              color={isLocked ? colors.tertiary : categoryInfo.color}
            />
            {isLocked && (
              <View style={styles.lockIcon}>
                <Lock size={12} color={colors.tertiary} />
              </View>
            )}
          </View>

          <View style={styles.headerText}>
            <Text style={[styles.title, isLocked && styles.titleLocked]}>
              {quest.title}
            </Text>
            <Text style={styles.subtitle}>{quest.subtitle}</Text>
          </View>

          {isCompleted && (
            <View style={styles.completedBadge}>
              <Check size={16} color="#22C55E" />
            </View>
          )}
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {quest.description}
        </Text>

        {/* Progress (if active) */}
        {progress && !isCompleted && (
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercent}%`, backgroundColor: categoryInfo.color },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {completedCount}/{totalObjectives} objectives
            </Text>
          </View>
        )}

        {/* Rewards */}
        <View style={styles.rewards}>
          <View style={styles.rewardItem}>
            <Zap size={14} color={colors.accent} />
            <Text style={styles.rewardText}>{quest.xpReward} XP</Text>
          </View>
          <View style={styles.rewardItem}>
            <Star size={14} color="#D4AF37" />
            <Text style={styles.rewardText}>{quest.skillPointsReward} SP</Text>
          </View>
          {quest.tier_required !== 'free' && (
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>
                {quest.tier_required === 'premium' ? 'Premium' : 'VIP'}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </GlassCard>
  );
}

// Compact quest list item
export function QuestListItem({
  quest,
  progress,
  isCompleted,
  onPress,
}: {
  quest: Quest;
  progress?: QuestProgress;
  isCompleted: boolean;
  onPress: () => void;
}) {
  const IconComponent = getIcon(quest.icon);
  const categoryInfo = QUEST_CATEGORIES[quest.category];

  const completedCount = progress?.completedObjectives.length ?? 0;
  const totalObjectives = quest.objectives.length;

  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress();
      }}
      style={styles.listItem}
    >
      <View style={[styles.listItemIcon, { backgroundColor: `${categoryInfo.color}15` }]}>
        <IconComponent size={20} color={categoryInfo.color} />
      </View>

      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{quest.title}</Text>
        {progress && !isCompleted ? (
          <Text style={styles.listItemProgress}>
            {completedCount}/{totalObjectives} complete
          </Text>
        ) : isCompleted ? (
          <Text style={[styles.listItemProgress, { color: '#22C55E' }]}>Completed</Text>
        ) : (
          <Text style={styles.listItemProgress}>{quest.xpReward} XP</Text>
        )}
      </View>

      {isCompleted ? (
        <CheckCircle size={20} color="#22C55E" />
      ) : progress ? (
        <View style={styles.listItemProgressRing}>
          <Text style={styles.listItemProgressPercent}>
            {Math.round((completedCount / totalObjectives) * 100)}%
          </Text>
        </View>
      ) : (
        <ChevronRight size={20} color={colors.tertiary} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  cardLocked: {
    opacity: 0.6,
  },
  content: {
    gap: spacing.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xs,
  },
  categoryText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lockIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 2,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  titleLocked: {
    color: colors.tertiary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  progressSection: {
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  rewards: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  tierBadge: {
    marginLeft: 'auto',
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  // List item styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  listItemProgress: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginTop: 2,
  },
  listItemProgressRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemProgressPercent: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.accent,
  },
});
