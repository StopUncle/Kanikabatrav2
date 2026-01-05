// Daily Challenges Screen
// View and complete daily challenges

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Flame,
  Zap,
  Check,
  Target,
} from 'lucide-react-native';
import { getIcon } from '../../lib/icons';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useAuthStore } from '../../stores/authStore';
import { useAcademyStore, useStreak } from '../../stores/academyStore';
import { DailyChallenge } from '../../content/academy/types';
import { CHALLENGE_CATEGORIES } from '../../content/academy/dailyChallenges';

export default function ChallengesScreen() {
  const tier = useAuthStore((s) => s.user?.subscription_tier ?? 'free');

  const { progress, getDailyChallenges, completeDailyChallenge } = useAcademyStore();
  const streakInfo = useStreak();

  const challenges = getDailyChallenges(tier as 'free' | 'premium' | 'vip');
  const completedToday = progress?.dailyChallengesCompleted ?? [];

  const handleBack = () => {
    haptics.light();
    router.replace('/(academy)');
  };

  const handleCompleteChallenge = async (challengeId: string) => {
    const result = await completeDailyChallenge(challengeId);
    if (result.success) {
      haptics.success();
      Alert.alert(
        'Challenge Complete!',
        `You earned ${result.xpGained} XP!${
          result.streakDays === 7 ? '\n\nBonus: 7-day streak reward!' : ''
        }${result.streakDays === 30 ? '\n\nBonus: 30-day streak reward!' : ''}`
      );
    } else {
      haptics.error();
      Alert.alert('Error', 'Failed to complete challenge. Please try again.');
    }
  };

  // Get max challenges based on tier
  const maxChallenges = tier === 'free' ? 1 : tier === 'premium' ? 3 : 5;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={20} color={colors.primary} />}
          onPress={handleBack}
        />
        <View style={styles.headerTitle}>
          <Flame size={22} color="#EF4444" />
          <Text style={styles.title}>Daily Challenges</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Card */}
        <GlassCard variant="gold" style={styles.streakCard}>
          <View style={styles.streakContent}>
            <View style={styles.streakIcon}>
              <Flame size={32} color="#EF4444" />
            </View>
            <View style={styles.streakInfo}>
              <Text style={styles.streakValue}>{streakInfo.currentStreak}</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </View>
            <View style={styles.streakProgress}>
              <Text style={styles.completedCount}>
                {completedToday.length}/{maxChallenges}
              </Text>
              <Text style={styles.completedLabel}>Today</Text>
            </View>
          </View>

          {/* Streak milestones */}
          <View style={styles.milestones}>
            <MilestoneMarker
              day={7}
              isReached={streakInfo.currentStreak >= 7}
              bonus="+50 XP"
            />
            <MilestoneMarker
              day={14}
              isReached={streakInfo.currentStreak >= 14}
              bonus="Badge"
            />
            <MilestoneMarker
              day={30}
              isReached={streakInfo.currentStreak >= 30}
              bonus="+200 XP"
            />
          </View>
        </GlassCard>

        {/* Tier Info */}
        {tier === 'free' && (
          <GlassCard variant="medium" style={styles.tierInfo}>
            <Text style={styles.tierText}>
              Free tier: 1 challenge per day.{' '}
              <Text style={styles.tierUpgrade}>Upgrade for more!</Text>
            </Text>
          </GlassCard>
        )}

        {/* Challenge List */}
        <Text style={styles.sectionTitle}>Today's Challenges</Text>

        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isCompleted={completedToday.includes(challenge.id)}
              onComplete={() => handleCompleteChallenge(challenge.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Check size={48} color="#22C55E" />
            <Text style={styles.emptyTitle}>All Done!</Text>
            <Text style={styles.emptyText}>
              You've completed all available challenges for today
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Milestone marker component
function MilestoneMarker({
  day,
  isReached,
  bonus,
}: {
  day: number;
  isReached: boolean;
  bonus: string;
}) {
  return (
    <View style={styles.milestone}>
      <View
        style={[
          styles.milestoneDot,
          isReached && styles.milestoneDotReached,
        ]}
      >
        {isReached && <Check size={12} color={colors.background} />}
      </View>
      <Text style={styles.milestoneDay}>{day}d</Text>
      <Text style={styles.milestoneBonus}>{bonus}</Text>
    </View>
  );
}

// Challenge card component
function ChallengeCard({
  challenge,
  isCompleted,
  onComplete,
}: {
  challenge: DailyChallenge;
  isCompleted: boolean;
  onComplete: () => void;
}) {
  const categoryInfo = CHALLENGE_CATEGORIES[challenge.category];
  const IconComponent = getIcon(challenge.icon, Target);

  const difficultyColors = {
    easy: '#22C55E',
    medium: '#F59E0B',
    hard: '#EF4444',
  };

  return (
    <GlassCard
      variant={isCompleted ? 'gold' : 'medium'}
      style={styles.challengeCard}
    >
      <View style={styles.challengeContent}>
        {/* Icon */}
        <View
          style={[
            styles.challengeIcon,
            { backgroundColor: `${categoryInfo.color}15` },
          ]}
        >
          <IconComponent
            size={24}
            color={isCompleted ? colors.tertiary : categoryInfo.color}
          />
        </View>

        {/* Info */}
        <View style={styles.challengeInfo}>
          <View style={styles.challengeHeader}>
            <Text
              style={[
                styles.challengeTitle,
                isCompleted && styles.challengeTitleCompleted,
              ]}
            >
              {challenge.title}
            </Text>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: `${difficultyColors[challenge.difficulty]}20` },
              ]}
            >
              <Text
                style={[
                  styles.difficultyText,
                  { color: difficultyColors[challenge.difficulty] },
                ]}
              >
                {challenge.difficulty}
              </Text>
            </View>
          </View>
          <Text
            style={styles.challengeDescription}
            numberOfLines={2}
          >
            {challenge.description}
          </Text>
          <View style={styles.challengeMeta}>
            <View style={styles.rewardBadge}>
              <Zap size={12} color={colors.accent} />
              <Text style={styles.rewardText}>{challenge.xpReward} XP</Text>
            </View>
            <Text style={styles.categoryTag}>{categoryInfo.label}</Text>
          </View>
        </View>

        {/* Action */}
        {isCompleted ? (
          <View style={styles.completedCheck}>
            <Check size={20} color="#22C55E" />
          </View>
        ) : (
          <Pressable
            onPress={() => {
              haptics.medium();
              onComplete();
            }}
            style={styles.completeButton}
          >
            <Text style={styles.completeButtonText}>Done</Text>
          </Pressable>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.sm,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxl,
  },
  streakCard: {
    marginBottom: spacing.md,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  streakIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  streakValue: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  streakLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  streakProgress: {
    alignItems: 'center',
  },
  completedCount: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  completedLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  milestones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  milestone: {
    alignItems: 'center',
    gap: 4,
  },
  milestoneDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneDotReached: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  milestoneDay: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  milestoneBonus: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  tierInfo: {
    marginBottom: spacing.md,
  },
  tierText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  tierUpgrade: {
    color: colors.accent,
    fontWeight: typography.medium,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  challengeCard: {
    marginBottom: spacing.sm,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  challengeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 4,
  },
  challengeTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    flex: 1,
  },
  challengeTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.tertiary,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
  },
  challengeDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  challengeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  categoryTag: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textTransform: 'capitalize',
  },
  completedCheck: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  completeButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.background,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: '#22C55E',
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
});
