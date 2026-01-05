// Empress Academy Dashboard
// Main hub for skills, quests, and progression

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Crown,
  Target,
  Scroll,
  Flame,
  Zap,
  Star,
  ChevronRight,
} from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import { LevelBadge } from '../../components/academy/LevelBadge';
import { SkillTreeCard } from '../../components/academy/SkillTree';
import { QuestListItem } from '../../components/academy/QuestCard';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useAuthStore, useHasAccess } from '../../stores/authStore';
import {
  useAcademyStore,
  useCurrentLevel,
  useLevelProgress,
  useSkillPoints,
  useStreak,
} from '../../stores/academyStore';
import { SKILL_TREES, getTreeProgress } from '../../content/academy/skills';
import { SkillTreeId } from '../../content/academy/types';

export default function AcademyDashboardScreen() {
  const tier = useAuthStore((s) => s.user?.subscription_tier ?? 'free');
  const hasPremiumAccess = useHasAccess('premium');

  const {
    isInitialized,
    isLoading,
    progress,
    initialize,
    getActiveQuests,
    getDailyChallenges,
  } = useAcademyStore();

  const currentLevel = useCurrentLevel();
  const levelProgress = useLevelProgress();
  const skillPoints = useSkillPoints();
  const streakInfo = useStreak();

  useEffect(() => {
    if (!isInitialized) {
      void initialize();
    }
  }, [isInitialized, initialize]);

  const handleBack = () => {
    haptics.light();
    router.replace('/(tabs)/learn');
  };

  const activeQuests = getActiveQuests();
  const dailyChallenges = getDailyChallenges(tier as 'free' | 'premium' | 'vip');

  // Get tree progress for all trees
  const treeProgress = Object.keys(SKILL_TREES).reduce((acc, treeId) => {
    acc[treeId as SkillTreeId] = getTreeProgress(
      treeId as SkillTreeId,
      progress?.unlockedSkills ?? []
    );
    return acc;
  }, {} as Record<SkillTreeId, number>);

  if (!isInitialized || !currentLevel) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Crown size={48} color={colors.accent} />
          <Text style={styles.loadingText}>Loading Academy...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Crown size={22} color={colors.accent} />
          <Text style={styles.title}>Empress Academy</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Level Card */}
        <GlassCard variant="gold" style={styles.levelCard}>
          <LevelBadge
            level={currentLevel}
            progress={levelProgress.progress}
            xpToNext={levelProgress.xpToNext}
            totalXp={levelProgress.totalXp}
            size="lg"
          />
        </GlassCard>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatBox
            icon={<Star size={18} color="#D4AF37" />}
            value={skillPoints}
            label="Skill Points"
          />
          <StatBox
            icon={<Flame size={18} color="#EF4444" />}
            value={streakInfo.currentStreak}
            label="Day Streak"
          />
          <StatBox
            icon={<Scroll size={18} color={colors.accent} />}
            value={progress?.completedQuests.length ?? 0}
            label="Quests Done"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <ActionCard
            icon={<Target size={24} color="#8B5CF6" />}
            title="Skill Trees"
            subtitle="Unlock new abilities"
            onPress={() => router.push('/(academy)/skill-tree')}
          />
          <ActionCard
            icon={<Scroll size={24} color="#0EA5E9" />}
            title="Quests"
            subtitle={`${activeQuests.length} active`}
            onPress={() => router.push('/(academy)/quests')}
          />
          <ActionCard
            icon={<Flame size={24} color="#EF4444" />}
            title="Challenges"
            subtitle={`${dailyChallenges.length} today`}
            onPress={() => router.push('/(academy)/challenges')}
          />
        </View>

        {/* Active Quests Preview */}
        {activeQuests.length > 0 && (
          <View style={styles.section}>
            <SectionHeader
              title="Active Quests"
              onSeeAll={() => router.push('/(academy)/quests')}
            />
            {activeQuests.slice(0, 2).map(({ quest, progress: qProgress }) => (
              <QuestListItem
                key={quest.id}
                quest={quest}
                progress={qProgress}
                isCompleted={false}
                onPress={() => router.push('/(academy)/quests')}
              />
            ))}
          </View>
        )}

        {/* Skill Trees Preview */}
        <View style={styles.section}>
          <SectionHeader
            title="Skill Trees"
            onSeeAll={() => router.push('/(academy)/skill-tree')}
          />
          {Object.values(SKILL_TREES).slice(0, 3).map((tree) => {
            const isLocked =
              tree.tier_required === 'premium' && !hasPremiumAccess;

            return (
              <SkillTreeCard
                key={tree.id}
                tree={tree}
                progress={treeProgress[tree.id]}
                isLocked={isLocked}
                onPress={() => router.push('/(academy)/skill-tree')}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Stat box component
function StatBox({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <View style={styles.statBox}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// Action card component
function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        haptics.light();
        onPress();
      }}
      style={({ pressed }) => [styles.actionCard, pressed && styles.actionCardPressed]}
    >
      {icon}
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

// Section header component
function SectionHeader({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable
        onPress={() => {
          haptics.light();
          onSeeAll();
        }}
        style={styles.seeAllButton}
      >
        <Text style={styles.seeAllText}>See All</Text>
        <ChevronRight size={16} color={colors.accent} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: typography.md,
    color: colors.secondary,
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
  levelCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  actionCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  actionTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
});
