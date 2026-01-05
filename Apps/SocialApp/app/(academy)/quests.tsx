// Quests Screen
// View all available and active quests

import React, { useState, useCallback } from 'react';
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
  Scroll,
  Check,
} from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import { QuestCard, QuestListItem } from '../../components/academy/QuestCard';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useAuthStore } from '../../stores/authStore';
import { useAcademyStore } from '../../stores/academyStore';
import { Quest, QuestProgress } from '../../content/academy/types';
import { QUEST_CATEGORIES, QUESTS } from '../../content/academy/quests';

type TabId = 'active' | 'available' | 'completed';

export default function QuestsScreen() {
  const tier = useAuthStore((s) => s.user?.subscription_tier ?? 'free');

  const {
    progress,
    getActiveQuests,
    getAvailableQuests,
    startQuest,
    completeObjective,
  } = useAcademyStore();

  const [activeTab, setActiveTab] = useState<TabId>('active');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const handleBack = () => {
    if (selectedQuest) {
      setSelectedQuest(null);
    } else {
      haptics.light();
      router.replace('/(academy)');
    }
  };

  const activeQuests = getActiveQuests();
  const availableQuests = getAvailableQuests(tier as 'free' | 'premium' | 'vip');

  const handleStartQuest = useCallback(async (questId: string) => {
    const result = await startQuest(questId);
    if (result.success) {
      haptics.success();
      setActiveTab('active');
    } else {
      Alert.alert('Error', result.error || 'Failed to start quest');
    }
  }, [startQuest]);

  const handleCompleteObjective = useCallback(async (questId: string, objectiveId: string) => {
    const result = await completeObjective(questId, objectiveId);
    if (result.success) {
      haptics.success();
      if (result.questCompleted) {
        Alert.alert(
          'Quest Complete!',
          `You earned ${result.xpGained} XP and ${result.skillPointsGained} Skill Points!`
        );
      }
    }
  }, [completeObjective]);

  // Get quest progress for selected quest
  const selectedQuestProgress = selectedQuest
    ? progress?.questProgress[selectedQuest.id]
    : undefined;

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
          <Scroll size={22} color={colors.accent} />
          <Text style={styles.title}>
            {selectedQuest ? selectedQuest.title : 'Quests'}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {selectedQuest ? (
        // Quest Detail View
        <QuestDetailView
          quest={selectedQuest}
          progress={selectedQuestProgress}
          isActive={activeQuests.some((q) => q.quest.id === selectedQuest.id)}
          isCompleted={progress?.completedQuests.includes(selectedQuest.id) ?? false}
          onStart={() => handleStartQuest(selectedQuest.id)}
          onCompleteObjective={(objId) => handleCompleteObjective(selectedQuest.id, objId)}
          onClose={() => setSelectedQuest(null)}
        />
      ) : (
        // Quest List View
        <>
          {/* Tabs */}
          <View style={styles.tabs}>
            <TabButton
              label="Active"
              count={activeQuests.length}
              isActive={activeTab === 'active'}
              onPress={() => setActiveTab('active')}
            />
            <TabButton
              label="Available"
              count={availableQuests.length}
              isActive={activeTab === 'available'}
              onPress={() => setActiveTab('available')}
            />
            <TabButton
              label="Completed"
              count={progress?.completedQuests.length ?? 0}
              isActive={activeTab === 'completed'}
              onPress={() => setActiveTab('completed')}
            />
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === 'active' &&
              (activeQuests.length > 0 ? (
                activeQuests.map(({ quest, progress: qProgress }) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    progress={qProgress}
                    onPress={() => setSelectedQuest(quest)}
                  />
                ))
              ) : (
                <EmptyState
                  message="No active quests. Start one from the Available tab!"
                  icon={<Scroll size={48} color={colors.tertiary} />}
                />
              ))}

            {activeTab === 'available' &&
              (availableQuests.length > 0 ? (
                availableQuests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onPress={() => setSelectedQuest(quest)}
                  />
                ))
              ) : (
                <EmptyState
                  message="Complete more quests to unlock new ones!"
                  icon={<Scroll size={48} color={colors.tertiary} />}
                />
              ))}

            {activeTab === 'completed' &&
              (progress?.completedQuests.length ?? 0) > 0 ? (
              progress?.completedQuests.map((questId) => {
                // Look up from QUESTS constant (not availableQuests which excludes completed)
                const quest = QUESTS.find((q) => q.id === questId);
                if (!quest) return null;
                return (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    isCompleted
                    onPress={() => setSelectedQuest(quest)}
                  />
                );
              })
            ) : activeTab === 'completed' ? (
              <EmptyState
                message="No completed quests yet. Start your journey!"
                icon={<Check size={48} color={colors.tertiary} />}
              />
            ) : null}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

// Tab button component
function TabButton({
  label,
  count,
  isActive,
  onPress,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress();
      }}
      style={[styles.tab, isActive && styles.tabActive]}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
        {label}
      </Text>
      {count > 0 && (
        <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
          <Text style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}>
            {count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

// Empty state component
function EmptyState({
  message,
  icon,
}: {
  message: string;
  icon: React.ReactNode;
}) {
  return (
    <View style={styles.emptyState}>
      {icon}
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

// Quest detail view component
function QuestDetailView({
  quest,
  progress,
  isActive,
  isCompleted,
  onStart,
  onCompleteObjective,
  onClose,
}: {
  quest: Quest;
  progress?: QuestProgress;
  isActive: boolean;
  isCompleted: boolean;
  onStart: () => void;
  onCompleteObjective: (objectiveId: string) => void;
  onClose: () => void;
}) {
  const categoryInfo = QUEST_CATEGORIES[quest.category];

  return (
    <ScrollView
      style={styles.content}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Category Badge */}
      <View style={[styles.categoryBadge, { backgroundColor: `${categoryInfo.color}20` }]}>
        <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
          {categoryInfo.label}
        </Text>
      </View>

      <Text style={styles.questTitle}>{quest.title}</Text>
      <Text style={styles.questSubtitle}>{quest.subtitle}</Text>
      <Text style={styles.questDescription}>{quest.description}</Text>

      {/* Objectives */}
      <GlassCard variant="medium" style={styles.objectivesCard}>
        <Text style={styles.objectivesTitle}>Objectives</Text>
        {quest.objectives.map((objective) => {
          const isObjCompleted =
            progress?.completedObjectives.includes(objective.id) ?? false;

          return (
            <Pressable
              key={objective.id}
              onPress={() => {
                if (isActive && !isObjCompleted) {
                  haptics.light();
                  onCompleteObjective(objective.id);
                }
              }}
              disabled={!isActive || isObjCompleted}
              style={[
                styles.objectiveRow,
                isObjCompleted && styles.objectiveRowCompleted,
              ]}
            >
              <View
                style={[
                  styles.objectiveCheck,
                  isObjCompleted && styles.objectiveCheckCompleted,
                ]}
              >
                {isObjCompleted && <Check size={14} color={colors.background} />}
              </View>
              <View style={styles.objectiveContent}>
                <Text
                  style={[
                    styles.objectiveText,
                    isObjCompleted && styles.objectiveTextCompleted,
                  ]}
                >
                  {objective.text}
                </Text>
                <Text style={styles.objectiveType}>{objective.type}</Text>
              </View>
            </Pressable>
          );
        })}
      </GlassCard>

      {/* Rewards */}
      <GlassCard variant="medium" style={styles.rewardsCard}>
        <Text style={styles.rewardsTitle}>Rewards</Text>
        <View style={styles.rewardsRow}>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardValue}>{quest.xpReward}</Text>
            <Text style={styles.rewardLabel}>XP</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardValue}>{quest.skillPointsReward}</Text>
            <Text style={styles.rewardLabel}>Skill Points</Text>
          </View>
        </View>
      </GlassCard>

      {/* Action Button */}
      {!isActive && !isCompleted && (
        <Button
          variant="gradient"
          onPress={() => {
            haptics.medium();
            onStart();
          }}
          style={styles.actionButton}
        >
          Start Quest
        </Button>
      )}

      {isCompleted && (
        <View style={styles.completedBanner}>
          <Check size={20} color="#22C55E" />
          <Text style={styles.completedText}>Quest Completed</Text>
        </View>
      )}
    </ScrollView>
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: layout.screenPadding,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tabText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  tabTextActive: {
    color: colors.background,
  },
  tabBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.tertiary,
  },
  tabBadgeTextActive: {
    color: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
    gap: spacing.md,
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
  },
  // Quest detail styles
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  categoryText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    textTransform: 'uppercase',
  },
  questTitle: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  questSubtitle: {
    fontSize: typography.lg,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  questDescription: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  objectivesCard: {
    marginBottom: spacing.md,
  },
  objectivesTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  objectiveRowCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  objectiveCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  objectiveCheckCompleted: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveText: {
    fontSize: typography.md,
    color: colors.primary,
    lineHeight: 22,
  },
  objectiveTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.secondary,
  },
  objectiveType: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  rewardsCard: {
    marginBottom: spacing.lg,
  },
  rewardsTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  rewardsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  rewardItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: borderRadius.md,
  },
  rewardValue: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  rewardLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  actionButton: {
    marginTop: spacing.md,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  completedText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: '#22C55E',
  },
});
