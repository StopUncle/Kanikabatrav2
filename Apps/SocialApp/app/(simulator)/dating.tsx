// Dating Simulator - Level & Mission Selection
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Clock,
  Lock,
  CheckCircle,
  Play,
  Zap,
  Trophy,
  Crown,
  Star,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  glass,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { simulatorService } from '../../services/simulatorService';
import { useAuthStore } from '../../stores/authStore';
import type { OutcomeType } from '../../content/simulator';

// Import dating simulator data
import {
  levels,
  getScenariosForLevel,
  getSecretScenarioForLevel,
  isLevelUnlocked,
  createInitialProgress,
  type Level,
  type LevelId,
  type DatingScenario,
  type GameProgress,
} from '../../content/simulator/scenarios/dating';

const DATING_PROGRESS_KEY = '@dark_mirror_dating_progress';

// Level theme colors
const LEVEL_COLORS: Record<LevelId, { primary: string; bg: string }> = {
  university: { primary: '#4CAF50', bg: 'rgba(76, 175, 80, 0.15)' },
  'social-scene': { primary: '#2196F3', bg: 'rgba(33, 150, 243, 0.15)' },
  gala: { primary: '#9C27B0', bg: 'rgba(156, 39, 176, 0.15)' },
  escalation: { primary: '#FF5722', bg: 'rgba(255, 87, 34, 0.15)' },
  'private-island': { primary: '#C9A961', bg: 'rgba(201, 169, 97, 0.15)' },
};

// Tier to level mapping
const TIER_ACCESS: Record<LevelId, 'free' | 'premium' | 'vip'> = {
  university: 'free',
  'social-scene': 'premium',
  gala: 'premium',
  escalation: 'vip',
  'private-island': 'vip',
};

export default function DatingSimulatorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tier: subscriptionTier } = useAuthStore();

  const [expandedLevel, setExpandedLevel] = useState<LevelId | null>('university');
  const [gameProgress, setGameProgress] = useState<GameProgress>(createInitialProgress());
  const [completedMissions, setCompletedMissions] = useState<Record<string, OutcomeType>>({});

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        // Load game progress
        const stored = await AsyncStorage.getItem(DATING_PROGRESS_KEY);
        if (stored) {
          setGameProgress(JSON.parse(stored));
        }

        // Load completion status from simulator service
        const completed = await simulatorService.getCompletedScenarios();
        const map: Record<string, OutcomeType> = {};
        for (const record of completed) {
          map[record.scenarioId] = record.outcome;
        }
        setCompletedMissions(map);
      } catch (error) {
        console.error('Error loading dating progress:', error);
      }
    };
    void loadProgress();
  }, []);

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const toggleLevel = (levelId: LevelId) => {
    haptics.light();
    setExpandedLevel(expandedLevel === levelId ? null : levelId);
  };

  const handleSelectMission = (mission: DatingScenario, levelId: LevelId) => {
    haptics.medium();

    // Check tier access
    const requiredTier = TIER_ACCESS[levelId];
    const hasAccess =
      requiredTier === 'free' ||
      (requiredTier === 'premium' && (subscriptionTier === 'premium' || subscriptionTier === 'vip')) ||
      (requiredTier === 'vip' && subscriptionTier === 'vip');

    if (!hasAccess) {
      router.push('/(subscription)');
      return;
    }

    // Check level unlock
    if (!isLevelUnlocked(levelId, gameProgress)) {
      return;
    }

    // Navigate to scenario intro
    router.push(`/(simulator)/${mission.id}`);
  };

  const getMissionStatus = (missionId: string, missionNumber: number, levelId: LevelId) => {
    const levelProgress = gameProgress.levels[levelId];
    const isCompleted = completedMissions[missionId] != null;

    // First mission always unlocked, others require previous mission
    if (missionNumber === 1) return { unlocked: true, completed: isCompleted };

    const previousMissionCompleted = levelProgress.missionsCompleted.includes(
      `mission-${missionNumber - 1}`
    ) || completedMissions[`mission-${missionNumber - 1}-${levelId.split('-')[0]}`] != null;

    // For now, just check if we have any completions at this level or lower mission numbers
    const anyPreviousCompleted = Object.keys(completedMissions).some(id => {
      // Check if any mission from this level with lower number is completed
      if (id.includes(levelId.split('-')[0])) {
        const match = id.match(/mission-(\d+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          return num < missionNumber;
        }
      }
      return false;
    });

    return {
      unlocked: isCompleted || anyPreviousCompleted || missionNumber <= 1,
      completed: isCompleted,
    };
  };

  const getLevelStats = (levelId: LevelId) => {
    const missions = getScenariosForLevel(levelId);
    const completed = missions.filter(m => completedMissions[m.id] != null).length;
    return { completed, total: missions.length };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <ChevronLeft size={24} color={colors.primary} />
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Dating Simulator</Text>
          <Text style={styles.headerSubtitle}>
            Master social dynamics through practice
          </Text>
        </View>
      </View>

      {/* Level List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {levels.map((level, index) => {
          const isExpanded = expandedLevel === level.id;
          const levelColor = LEVEL_COLORS[level.id];
          const isUnlocked = isLevelUnlocked(level.id, gameProgress);
          const requiredTier = TIER_ACCESS[level.id];
          const hasAccess =
            requiredTier === 'free' ||
            (requiredTier === 'premium' && (subscriptionTier === 'premium' || subscriptionTier === 'vip')) ||
            (requiredTier === 'vip' && subscriptionTier === 'vip');
          const stats = getLevelStats(level.id);
          const missions = getScenariosForLevel(level.id);
          const secretMission = getSecretScenarioForLevel(level.id);

          return (
            <View key={level.id} style={styles.levelContainer}>
              {/* Level Header */}
              <Pressable
                onPress={() => isUnlocked && hasAccess && toggleLevel(level.id)}
                style={({ pressed }) => [
                  styles.levelHeader,
                  pressed && isUnlocked && hasAccess && styles.levelHeaderPressed,
                  !isUnlocked && styles.levelLocked,
                ]}
              >
                <LinearGradient
                  colors={
                    isUnlocked && hasAccess
                      ? [levelColor.bg, 'transparent']
                      : ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.2)']
                  }
                  style={styles.levelGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />

                <View style={styles.levelInfo}>
                  <View style={styles.levelTitleRow}>
                    <View
                      style={[
                        styles.levelNumber,
                        { backgroundColor: isUnlocked && hasAccess ? levelColor.primary : colors.tertiary },
                      ]}
                    >
                      <Text style={styles.levelNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.levelTitleContainer}>
                      <Text
                        style={[
                          styles.levelTitle,
                          (!isUnlocked || !hasAccess) && styles.levelTitleLocked,
                        ]}
                      >
                        {level.name}
                      </Text>
                      <Text
                        style={[
                          styles.levelDescription,
                          (!isUnlocked || !hasAccess) && styles.levelDescriptionLocked,
                        ]}
                        numberOfLines={1}
                      >
                        {level.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.levelMeta}>
                    {!hasAccess && (
                      <View style={styles.tierBadge}>
                        <Crown size={12} color={colors.accent} />
                        <Text style={styles.tierText}>
                          {requiredTier === 'vip' ? 'VIP' : 'Premium'}
                        </Text>
                      </View>
                    )}
                    {!isUnlocked && hasAccess && (
                      <View style={styles.lockBadge}>
                        <Lock size={12} color={colors.warning} />
                        <Text style={styles.lockText}>Locked</Text>
                      </View>
                    )}
                    {isUnlocked && hasAccess && (
                      <View style={styles.progressBadge}>
                        <Text style={[styles.progressText, { color: levelColor.primary }]}>
                          {stats.completed}/{stats.total}
                        </Text>
                      </View>
                    )}
                    {isUnlocked && hasAccess && (
                      isExpanded ? (
                        <ChevronDown size={20} color={levelColor.primary} />
                      ) : (
                        <ChevronRight size={20} color={levelColor.primary} />
                      )
                    )}
                  </View>
                </View>
              </Pressable>

              {/* Missions List (Expanded) */}
              {isExpanded && isUnlocked && hasAccess && (
                <View style={styles.missionsContainer}>
                  {missions.map((mission) => {
                    const status = getMissionStatus(mission.id, mission.missionNumber, level.id);
                    const outcome = completedMissions[mission.id];

                    return (
                      <MissionCard
                        key={mission.id}
                        mission={mission}
                        levelColor={levelColor.primary}
                        unlocked={status.unlocked}
                        completed={status.completed}
                        outcome={outcome}
                        onSelect={() => handleSelectMission(mission, level.id)}
                      />
                    );
                  })}

                  {/* Secret Mission */}
                  {secretMission && (
                    <View style={styles.secretSection}>
                      <View style={styles.secretDivider}>
                        <View style={styles.secretLine} />
                        <Star size={14} color={colors.accent} />
                        <Text style={styles.secretLabel}>Secret Mission</Text>
                        <Star size={14} color={colors.accent} />
                        <View style={styles.secretLine} />
                      </View>
                      <MissionCard
                        mission={secretMission}
                        levelColor={colors.accent}
                        unlocked={gameProgress.levels[level.id]?.secretUnlocked || false}
                        completed={completedMissions[secretMission.id] != null}
                        outcome={completedMissions[secretMission.id]}
                        onSelect={() => handleSelectMission(secretMission, level.id)}
                        isSecret
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// Mission Card Component
interface MissionCardProps {
  mission: DatingScenario;
  levelColor: string;
  unlocked: boolean;
  completed: boolean;
  outcome?: OutcomeType;
  onSelect: () => void;
  isSecret?: boolean;
}

function MissionCard({
  mission,
  levelColor,
  unlocked,
  completed,
  outcome,
  onSelect,
  isSecret = false,
}: MissionCardProps) {
  const outcomeConfig = outcome ? getOutcomeConfig(outcome) : null;

  return (
    <Pressable
      onPress={unlocked ? onSelect : undefined}
      style={({ pressed }) => [
        styles.missionCard,
        pressed && unlocked && styles.missionCardPressed,
        !unlocked && styles.missionCardLocked,
        isSecret && styles.missionCardSecret,
        completed && outcomeConfig && {
          borderColor: outcomeConfig.borderColor,
          borderWidth: 1.5,
        },
      ]}
    >
      <View style={styles.missionContent}>
        {/* Mission Number */}
        <View
          style={[
            styles.missionNumber,
            { backgroundColor: unlocked ? levelColor : colors.tertiary },
            isSecret && { backgroundColor: colors.accent },
          ]}
        >
          {isSecret ? (
            <Star size={14} color={colors.background} fill={colors.background} />
          ) : (
            <Text style={styles.missionNumberText}>{mission.missionNumber}</Text>
          )}
        </View>

        {/* Mission Info */}
        <View style={styles.missionInfo}>
          <Text
            style={[
              styles.missionTitle,
              !unlocked && styles.missionTitleLocked,
            ]}
          >
            {mission.title}
          </Text>
          <Text
            style={[
              styles.missionObjective,
              !unlocked && styles.missionObjectiveLocked,
            ]}
            numberOfLines={2}
          >
            {mission.objective}
          </Text>

          {/* Mission Meta */}
          <View style={styles.missionMeta}>
            <View style={styles.missionMetaItem}>
              <Clock size={12} color={unlocked ? colors.secondary : colors.tertiary} />
              <Text style={[styles.missionMetaText, !unlocked && styles.missionMetaTextLocked]}>
                {mission.estimatedMinutes} min
              </Text>
            </View>
            <View style={styles.missionMetaItem}>
              <Zap size={12} color={unlocked ? colors.accent : colors.tertiary} />
              <Text style={[styles.missionMetaText, !unlocked && styles.missionMetaTextLocked]}>
                +{mission.rewards.power + mission.rewards.mask + mission.rewards.vision} stats
              </Text>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.missionStatus}>
          {!unlocked ? (
            <Lock size={18} color={colors.tertiary} />
          ) : completed && outcomeConfig ? (
            <View style={[styles.outcomeBadge, { backgroundColor: outcomeConfig.bgColor }]}>
              {outcomeConfig.icon === 'trophy' ? (
                <Trophy size={14} color={outcomeConfig.color} />
              ) : (
                <CheckCircle size={14} color={outcomeConfig.color} />
              )}
            </View>
          ) : (
            <View style={[styles.playButton, { backgroundColor: levelColor + '20' }]}>
              <Play size={14} color={levelColor} fill={levelColor} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

function getOutcomeConfig(outcome: OutcomeType) {
  const configs: Record<OutcomeType, {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: 'trophy' | 'check';
  }> = {
    passed: {
      label: 'Complete',
      color: colors.success,
      bgColor: 'rgba(76, 175, 80, 0.15)',
      borderColor: 'rgba(76, 175, 80, 0.4)',
      icon: 'trophy',
    },
    failed: {
      label: 'Failed',
      color: colors.error,
      bgColor: 'rgba(229, 69, 69, 0.15)',
      borderColor: 'rgba(229, 69, 69, 0.4)',
      icon: 'check',
    },
  };
  return configs[outcome];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  headerContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  levelContainer: {
    marginBottom: spacing.sm,
  },
  levelHeader: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelHeaderPressed: {
    opacity: 0.9,
  },
  levelLocked: {
    opacity: 0.6,
  },
  levelGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  levelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  levelNumberText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.background,
  },
  levelTitleContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  levelTitleLocked: {
    color: colors.tertiary,
  },
  levelDescription: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
  },
  levelDescriptionLocked: {
    color: colors.tertiary,
  },
  levelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(201, 169, 97, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  tierText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 176, 32, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  lockText: {
    fontSize: typography.xs,
    color: colors.warning,
    fontWeight: typography.medium,
  },
  progressBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  progressText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
  },
  missionsContainer: {
    marginTop: spacing.sm,
    paddingLeft: spacing.md,
    gap: spacing.sm,
  },
  missionCard: {
    ...glass.light,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  missionCardPressed: {
    opacity: 0.9,
    borderColor: colors.accent,
  },
  missionCardLocked: {
    opacity: 0.5,
  },
  missionCardSecret: {
    borderColor: 'rgba(201, 169, 97, 0.3)',
  },
  missionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  missionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  missionNumberText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.background,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: 2,
  },
  missionTitleLocked: {
    color: colors.tertiary,
  },
  missionObjective: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  missionObjectiveLocked: {
    color: colors.tertiary,
  },
  missionMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  missionMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  missionMetaText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  missionMetaTextLocked: {
    color: colors.tertiary,
  },
  missionStatus: {
    marginLeft: spacing.sm,
  },
  outcomeBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secretSection: {
    marginTop: spacing.sm,
  },
  secretDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  secretLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.accent + '40',
  },
  secretLabel: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.medium,
  },
});
