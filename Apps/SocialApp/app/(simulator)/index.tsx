// Scenario Selection Screen
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ChevronLeft,
  Clock,
  Lock,
  CheckCircle,
  Play,
  Zap,
  Trophy,
  RotateCcw,
  Heart,
  User,
  Sparkles,
  ChevronRight,
  GraduationCap,
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
import { useCreditStore, formatCooldownTime } from '../../stores/creditStore';
import { CreditBadge } from '../../components/simulator/CreditDisplay';
import { LevelCard, StoryLevel } from '../../components/simulator/LevelCard';
import { MissionCard, Mission } from '../../components/simulator/MissionCard';
import type { Scenario, OutcomeType, TargetGender } from '../../content/simulator';
import { getScenariosByGender } from '../../content/simulator/scenarios';
import {
  STORY_PROGRESSION,
  isLevelItem,
  isMissionItem,
  type LevelItem,
  type MissionItem,
} from '../../content/simulator/storyProgression';

// Story progression is now imported from storyProgression.ts

const GENDER_PREFERENCE_KEY = 'simulator_gender_preference';

// DEV MODE: Set to true to unlock all scenarios regardless of progression
// Toggle this to false before production builds
const DEV_MODE_UNLOCK_ALL = true;

// Difficulty colors
const DIFFICULTY_COLORS = {
  beginner: colors.success,
  intermediate: colors.warning,
  advanced: colors.error,
};

// Category icons would go here
const CATEGORY_LABELS: Record<string, string> = {
  narcissist: 'Narcissism',
  avoidant: 'Avoidant',
  gaslighter: 'Gaslighting',
  healthy: 'Healthy',
  professional: 'Professional',
  'dating-tactics': 'Dating Tactics',
  'social-dynamics': 'Social Dynamics',
};

export default function SimulatorSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tier: subscriptionTier } = useAuthStore();

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [completedMap, setCompletedMap] = useState<
    Record<string, OutcomeType | null>
  >({});
  const [selectedGender, setSelectedGender] = useState<TargetGender>('female');
  const [cooldownRefreshKey, setCooldownRefreshKey] = useState(0);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkCooldown = useCreditStore((s) => s.checkCooldown);

  // Load saved gender preference on mount
  useEffect(() => {
    const loadGenderPreference = async () => {
      try {
        const savedGender = await AsyncStorage.getItem(GENDER_PREFERENCE_KEY);
        if (savedGender === 'male' || savedGender === 'female') {
          setSelectedGender(savedGender);
          setIsLoading(false);
        } else {
          // No saved preference - show modal
          setShowGenderModal(true);
          setIsLoading(false);
        }
      } catch {
        setShowGenderModal(true);
        setIsLoading(false);
      }
    };
    void loadGenderPreference();
  }, []);

  // Handle gender selection from modal
  const handleGenderSelect = async (gender: TargetGender) => {
    haptics.medium();
    setSelectedGender(gender);
    setShowGenderModal(false);
    try {
      await AsyncStorage.setItem(GENDER_PREFERENCE_KEY, gender);
    } catch {
      // Preference will work for this session
    }
  };

  // Get cooldown for a scenario
  const getCooldownMs = useCallback((scenarioId: string): number => {
    const result = checkCooldown(scenarioId);
    return result.remainingMs;
  }, [checkCooldown, cooldownRefreshKey]);

  // Refresh cooldown state when a credit is spent
  const handleCooldownSkipped = useCallback(() => {
    setCooldownRefreshKey((k) => k + 1);
  }, []);

  // Load scenarios and completion status
  useEffect(() => {
    if (isLoading) return;

    const loadData = async () => {
      const genderScenarios = getScenariosByGender(selectedGender);
      // Filter out professional/Power Plays scenarios - only show social/relationship content
      const relationshipScenarios = genderScenarios.filter(
        (s) => s.category !== 'professional'
      );
      setScenarios(relationshipScenarios);

      // Check completion status for each
      const completed = await simulatorService.getCompletedScenarios();
      const map: Record<string, OutcomeType | null> = {};
      for (const record of completed) {
        map[record.scenarioId] = record.outcome;
      }
      setCompletedMap(map);
    };

    void loadData();
  }, [selectedGender, isLoading]);

  const handleBack = () => {
    haptics.light();
    router.replace('/(tabs)');
  };

  const handleGenderToggle = async (gender: TargetGender) => {
    haptics.light();
    setSelectedGender(gender);
    try {
      await AsyncStorage.setItem(GENDER_PREFERENCE_KEY, gender);
    } catch {
      // Preference will work for this session
    }
  };

  // Check if all free scenarios are completed
  const freeScenarios = scenarios.filter((s) => s.tier === 'free');
  const allFreeCompleted = DEV_MODE_UNLOCK_ALL || (freeScenarios.length > 0 &&
    freeScenarios.every((s) => completedMap[s.id] != null));

  // Split premium scenarios into intermediate and advanced
  const intermediateScenarios = scenarios.filter(
    (s) => s.tier !== 'free' && s.difficulty !== 'advanced'
  );
  const advancedScenarios = scenarios.filter(
    (s) => s.tier !== 'free' && s.difficulty === 'advanced'
  );

  // Check prerequisite completion for advanced scenarios
  const getPrerequisitesMet = (scenario: Scenario): number => {
    if (!scenario.prerequisites || scenario.prerequisites.length === 0) return 0;
    return scenario.prerequisites.filter((id) => completedMap[id] != null).length;
  };

  const isAdvancedUnlocked = (scenario: Scenario): boolean => {
    if (DEV_MODE_UNLOCK_ALL) return true;
    if (!scenario.prerequisites || scenario.prerequisites.length === 0) return true;
    return getPrerequisitesMet(scenario) >= 3;
  };

  const handleSelectScenario = (scenario: Scenario, sectionLocked: boolean, prereqLocked: boolean = false) => {
    haptics.medium();

    // Check section progression lock
    if (sectionLocked || prereqLocked) {
      // Could show a toast here - for now just don't navigate
      return;
    }

    // Check tier access
    const hasAccess =
      scenario.tier === 'free' ||
      subscriptionTier === 'premium' ||
      subscriptionTier === 'vip';

    if (!hasAccess) {
      router.push('/(subscription)');
      return;
    }

    router.push(`/(simulator)/${scenario.id}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Gender Selection Modal */}
      <Modal
        visible={showGenderModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Welcome to the Simulator</Text>
            <Text style={styles.modalSubtitle}>
              Choose your perspective to see scenarios tailored for you
            </Text>

            <View style={styles.genderOptions}>
              <Pressable
                style={({ pressed }) => [
                  styles.genderOption,
                  pressed && styles.genderOptionPressed,
                ]}
                onPress={() => handleGenderSelect('female')}
              >
                <LinearGradient
                  colors={['rgba(236, 72, 153, 0.2)', 'rgba(236, 72, 153, 0.05)']}
                  style={styles.genderOptionGradient}
                >
                  <View style={styles.genderIconContainer}>
                    <Heart size={32} color="#EC4899" fill="#EC4899" />
                  </View>
                  <Text style={styles.genderOptionTitle}>I'm a Woman</Text>
                  <Text style={styles.genderOptionDesc}>
                    See scenarios from her perspective
                  </Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.genderOption,
                  pressed && styles.genderOptionPressed,
                ]}
                onPress={() => handleGenderSelect('male')}
              >
                <LinearGradient
                  colors={['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.05)']}
                  style={styles.genderOptionGradient}
                >
                  <View style={[styles.genderIconContainer, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                    <User size={32} color="#3B82F6" />
                  </View>
                  <Text style={styles.genderOptionTitle}>I'm a Man</Text>
                  <Text style={styles.genderOptionDesc}>
                    See scenarios from his perspective
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>

            <Text style={styles.modalNote}>
              You can change this anytime using the toggle
            </Text>
          </View>
        </View>
      </Modal>

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
          <Text style={styles.headerTitle}>Relationship Simulator</Text>
          <Text style={styles.headerSubtitle}>
            Master social dynamics
          </Text>
        </View>

        <View style={styles.headerRight}>
          <CreditBadge />
        </View>
      </View>

      {/* Gender Toggle - Hidden for now (Caldwell Gala is not gender-specific) */}
      {/* Will be restored when gender-specific scenarios are added */}

      {/* Scenario List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Story Progression - Levels and Missions */}
        <View style={styles.section}>
          <View style={styles.levelHeader}>
            <View style={styles.levelHeaderIcon}>
              <GraduationCap size={20} color={colors.accent} />
            </View>
            <View>
              <Text style={styles.levelHeaderTitle}>Story Mode</Text>
              <Text style={styles.levelHeaderSubtitle}>
                Navigate the social elite through levels and missions
              </Text>
            </View>
          </View>

          {STORY_PROGRESSION.map((item) => {
            // Check completion status for this item
            const isCompleted = item.scenarioId ? completedMap[item.scenarioId] === 'passed' : false;
            const isFailed = item.scenarioId ? completedMap[item.scenarioId] === 'failed' : false;

            // Calculate unlocked state based on previous completion
            const isUnlocked = DEV_MODE_UNLOCK_ALL || (
              item.requiresCompletion
                ? completedMap[item.requiresCompletion] === 'passed'
                : true
            );

            // Render Level Card
            if (isLevelItem(item)) {
              const levelData: StoryLevel = {
                id: item.id,
                number: item.number,
                title: item.title,
                subtitle: item.subtitle,
                scenes: item.scenes,
                color: item.color,
                unlocked: isUnlocked,
                scenarioId: item.scenarioId,
                requiresCompletion: item.requiresCompletion || undefined,
                comingSoon: DEV_MODE_UNLOCK_ALL ? false : item.comingSoon,
              };

              return (
                <LevelCard
                  key={item.id}
                  level={levelData}
                  isCompleted={isCompleted}
                  onPress={() => {
                    if (item.scenarioId) {
                      router.push(`/(simulator)/${item.scenarioId}`);
                    } else {
                      Alert.alert(
                        `Level ${item.number}: ${item.title}`,
                        'This level is coming soon!',
                        [{ text: 'OK' }]
                      );
                    }
                  }}
                />
              );
            }

            // Render Mission Card
            if (isMissionItem(item)) {
              const missionData: Mission = {
                id: item.id,
                number: item.number,
                title: item.title,
                duration: item.duration,
                difficulty: item.difficulty,
                scenarioId: item.scenarioId,
                unlocked: isUnlocked,
                requiresCompletion: item.requiresCompletion || undefined,
              };

              return (
                <MissionCard
                  key={item.id}
                  mission={missionData}
                  isCompleted={isCompleted}
                  isFailed={isFailed}
                  onPress={() => {
                    if (item.scenarioId) {
                      router.push(`/(simulator)/${item.scenarioId}`);
                    } else {
                      Alert.alert(
                        `Mission ${item.number}: ${item.title}`,
                        'This mission is coming soon!',
                        [{ text: 'OK' }]
                      );
                    }
                  }}
                />
              );
            }

            return null;
          })}
        </View>

        {/* Test Visuals Button - DEV ONLY */}
        {DEV_MODE_UNLOCK_ALL && (
          <Pressable
            onPress={() => {
              haptics.medium();
              router.push('/(simulator)/test-visuals');
            }}
            style={({ pressed }) => [
              styles.testButton,
              pressed && styles.testButtonPressed,
            ]}
          >
            <Text style={styles.testButtonText}>🧪 Test Visuals</Text>
          </Pressable>
        )}

        {/* Apple Safe Version Test Button - DEV ONLY */}
        {DEV_MODE_UNLOCK_ALL && (
          <Pressable
            onPress={() => {
              haptics.medium();
              router.push('/(simulator)/dating-apple-safe');
            }}
            style={({ pressed }) => [
              styles.appleSafeButton,
              pressed && styles.appleSafeButtonPressed,
            ]}
          >
            <Text style={styles.appleSafeButtonText}>🍎 Apple Safe Version (Test)</Text>
          </Pressable>
        )}

        {/* Intermediate scenarios section */}
        {intermediateScenarios.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Intermediate Scenarios</Text>
              {!allFreeCompleted && (
                <View style={styles.progressionLockBadge}>
                  <Lock size={12} color={colors.warning} />
                  <Text style={styles.progressionLockText}>
                    Complete free first
                  </Text>
                </View>
              )}
            </View>
            {intermediateScenarios.map((scenario) => {
              const hasAccess =
                subscriptionTier === 'premium' || subscriptionTier === 'vip';
              const sectionLocked = !allFreeCompleted;
              return (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  completedOutcome={completedMap[scenario.id] || null}
                  onSelect={() => handleSelectScenario(scenario, sectionLocked)}
                  locked={!hasAccess || sectionLocked}
                  progressionLocked={sectionLocked}
                  cooldownRemainingMs={getCooldownMs(scenario.id)}
                  onCooldownSkipped={handleCooldownSkipped}
                />
              );
            })}
          </View>
        )}

        {/* Advanced scenarios section */}
        {advancedScenarios.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Advanced Scenarios</Text>
              {!allFreeCompleted && (
                <View style={styles.progressionLockBadge}>
                  <Lock size={12} color={colors.warning} />
                  <Text style={styles.progressionLockText}>
                    Complete free first
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.sectionSubtitle}>
              Complete 3+ intermediate scenarios to unlock
            </Text>
            {advancedScenarios.map((scenario) => {
              const hasAccess =
                subscriptionTier === 'premium' || subscriptionTier === 'vip';
              const sectionLocked = !allFreeCompleted;
              const prereqLocked = !isAdvancedUnlocked(scenario);
              const prereqsMet = getPrerequisitesMet(scenario);
              const prereqsNeeded = Math.max(0, 3 - prereqsMet);
              return (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  completedOutcome={completedMap[scenario.id] || null}
                  onSelect={() => handleSelectScenario(scenario, sectionLocked, prereqLocked)}
                  locked={!hasAccess || sectionLocked || prereqLocked}
                  progressionLocked={sectionLocked}
                  prereqLocked={prereqLocked}
                  prereqsNeeded={prereqsNeeded}
                  cooldownRemainingMs={getCooldownMs(scenario.id)}
                  onCooldownSkipped={handleCooldownSkipped}
                />
              );
            })}
          </View>
        )}

        {/* Empty state if no scenarios */}
        {scenarios.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No scenarios available yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Scenario Card Component
interface ScenarioCardProps {
  scenario: Scenario;
  completedOutcome: OutcomeType | null;
  onSelect: () => void;
  locked: boolean;
  progressionLocked?: boolean;
  prereqLocked?: boolean;
  prereqsNeeded?: number;
  cooldownRemainingMs?: number;
  onCooldownSkipped?: () => void;
}

// Outcome display config - binary pass/fail
const OUTCOME_CONFIG: Record<OutcomeType, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  passed: {
    label: 'Complete',
    color: colors.success,
    bgColor: 'rgba(76, 175, 80, 0.15)',
    borderColor: 'rgba(76, 175, 80, 0.4)',
  },
  failed: {
    label: 'Failed',
    color: colors.error,
    bgColor: 'rgba(229, 69, 69, 0.15)',
    borderColor: 'rgba(229, 69, 69, 0.4)',
  },
};

function ScenarioCard({
  scenario,
  completedOutcome,
  onSelect,
  locked,
  progressionLocked = false,
  prereqLocked = false,
  prereqsNeeded = 0,
  cooldownRemainingMs = 0,
  onCooldownSkipped,
}: ScenarioCardProps) {
  const difficultyColor = DIFFICULTY_COLORS[scenario.difficulty];
  const categoryLabel =
    CATEGORY_LABELS[scenario.category] || scenario.category;
  const outcomeConfig = completedOutcome ? OUTCOME_CONFIG[completedOutcome] : null;
  const isOnCooldown = cooldownRemainingMs > 0;
  const credits = useCreditStore((s) => s.credits);
  const spendCredit = useCreditStore((s) => s.spendCredit);

  const handleSkipCooldown = () => {
    if (credits < 1) return;
    haptics.medium();
    const success = spendCredit(scenario.id);
    if (success && onCooldownSkipped) {
      onCooldownSkipped();
    }
  };

  return (
    <Pressable
      onPress={isOnCooldown ? undefined : onSelect}
      style={({ pressed }) => [
        styles.card,
        pressed && !locked && !isOnCooldown && styles.cardPressed,
        (locked || isOnCooldown) && styles.cardLocked,
        completedOutcome && !isOnCooldown && {
          borderColor: outcomeConfig?.borderColor,
          borderWidth: 1.5,
        },
        isOnCooldown && styles.cardCooldown,
      ]}
    >
      {/* Gradient overlay for visual interest */}
      <LinearGradient
        colors={
          locked
            ? ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.2)'] as const
            : completedOutcome && outcomeConfig
              ? [outcomeConfig.bgColor, 'transparent'] as const
              : ['rgba(201, 169, 97, 0.05)', 'transparent'] as const
        }
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.cardContent}>
        {/* Header row */}
        <View style={styles.cardHeader}>
          <View style={[styles.categoryBadge, locked && styles.categoryBadgeLocked]}>
            <Text style={[styles.categoryText, locked && styles.categoryTextLocked]}>{categoryLabel}</Text>
          </View>

          {progressionLocked && (
            <View style={styles.lockBadge}>
              <Lock size={12} color={colors.warning} />
              <Text style={[styles.lockText, { color: colors.warning }]}>Locked</Text>
            </View>
          )}

          {!progressionLocked && prereqLocked && (
            <View style={styles.lockBadge}>
              <Lock size={12} color={colors.warning} />
              <Text style={[styles.lockText, { color: colors.warning }]}>
                {prereqsNeeded} more to unlock
              </Text>
            </View>
          )}

          {!progressionLocked && !prereqLocked && locked && (
            <View style={styles.lockBadge}>
              <Lock size={12} color={colors.accent} />
              <Text style={styles.lockText}>Premium</Text>
            </View>
          )}

          {/* Completion badge - more prominent */}
          {completedOutcome && outcomeConfig && (
            <View
              style={[
                styles.completedBadge,
                { backgroundColor: outcomeConfig.bgColor },
              ]}
            >
              {completedOutcome === 'passed' ? (
                <Trophy size={12} color={outcomeConfig.color} />
              ) : (
                <CheckCircle size={12} color={outcomeConfig.color} />
              )}
              <Text style={[styles.completedText, { color: outcomeConfig.color }]}>
                {outcomeConfig.label}
              </Text>
            </View>
          )}
        </View>

        {/* Title and tagline */}
        <Text style={[styles.cardTitle, (locked || isOnCooldown) && styles.cardTitleLocked]}>{scenario.title}</Text>
        <Text style={[styles.cardTagline, (locked || isOnCooldown) && styles.cardTaglineLocked]}>{scenario.tagline}</Text>
        <Text style={[styles.cardDescription, (locked || isOnCooldown) && styles.cardDescriptionLocked]} numberOfLines={2}>
          {scenario.description}
        </Text>

        {/* Cooldown overlay */}
        {isOnCooldown && (
          <View style={styles.cooldownContainer}>
            <View style={styles.cooldownRow}>
              <Clock size={16} color={colors.warning} />
              <Text style={styles.cooldownText}>
                Available in {formatCooldownTime(cooldownRemainingMs)}
              </Text>
            </View>
            {credits >= 1 && (
              <Pressable style={styles.skipCooldownButton} onPress={handleSkipCooldown}>
                <Zap size={14} color={colors.accent} />
                <Text style={styles.skipCooldownText}>Use 1 Credit</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={14} color={locked ? colors.tertiary : colors.secondary} />
              <Text style={[styles.metaText, locked && styles.metaTextLocked]}>{scenario.estimatedMinutes} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Zap size={14} color={locked ? colors.tertiary : colors.accent} />
              <Text style={[styles.metaText, locked && styles.metaTextLocked]}>+{scenario.xpReward} XP</Text>
            </View>
            <View
              style={[styles.difficultyBadge, { borderColor: locked ? colors.tertiary : difficultyColor }]}
            >
              <Text style={[styles.difficultyText, { color: locked ? colors.tertiary : difficultyColor }]}>
                {scenario.difficulty}
              </Text>
            </View>
          </View>

          {/* Play/Replay button */}
          <View style={[styles.playButton, locked && styles.playButtonLocked]}>
            {locked ? (
              <Lock size={16} color={colors.tertiary} />
            ) : completedOutcome ? (
              <RotateCcw size={16} color={colors.accent} />
            ) : (
              <Play size={16} color={colors.accent} fill={colors.accent} />
            )}
          </View>
        </View>
      </View>
    </Pressable>
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
  headerRight: {
    marginLeft: 'auto',
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
  genderToggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  genderToggle: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  genderToggleActive: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
  },
  genderToggleText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  genderToggleTextActive: {
    color: colors.accent,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  // Level header styles
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  levelHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelHeaderTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  levelHeaderSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  progressionLockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 176, 32, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  progressionLockText: {
    fontSize: typography.xs,
    color: colors.warning,
    fontWeight: typography.medium,
  },
  card: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: {
    opacity: 0.9,
    borderColor: colors.accent,
  },
  cardLocked: {
    opacity: 0.6,
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  categoryBadgeLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  categoryText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  categoryTextLocked: {
    color: colors.tertiary,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(201, 169, 97, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  lockText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginLeft: 'auto',
  },
  completedText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
  },
  cardTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  cardTitleLocked: {
    color: colors.tertiary,
  },
  cardTagline: {
    fontSize: typography.sm,
    color: colors.accent,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  cardTaglineLocked: {
    color: colors.tertiary,
  },
  cardDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: typography.sm * 1.6,
    marginBottom: spacing.lg,
  },
  cardDescriptionLocked: {
    color: colors.tertiary,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  metaTextLocked: {
    color: colors.tertiary,
  },
  difficultyBadge: {
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    textTransform: 'capitalize',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  // Cooldown styles
  cardCooldown: {
    borderColor: colors.warning + '40',
    borderWidth: 1.5,
  },
  cooldownContainer: {
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  cooldownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  cooldownText: {
    fontSize: typography.sm,
    color: colors.warning,
    fontWeight: typography.medium,
  },
  skipCooldownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.accent + '20',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.accent + '40',
    alignSelf: 'flex-start',
  },
  skipCooldownText: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: typography.semibold,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.sm * 1.5,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
    marginBottom: spacing.lg,
  },
  genderOption: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  genderOptionPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  genderOptionGradient: {
    padding: spacing.lg,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  genderIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  genderOptionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  genderOptionDesc: {
    fontSize: typography.xs,
    color: colors.secondary,
    textAlign: 'center',
  },
  modalNote: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Test Button styles
  testButton: {
    backgroundColor: 'rgba(147, 51, 234, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.5)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  testButtonPressed: {
    backgroundColor: 'rgba(147, 51, 234, 0.3)',
  },
  testButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: '#A855F7',
  },
  // Apple Safe Button styles
  appleSafeButton: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.6)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  appleSafeButtonPressed: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  appleSafeButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: '#22C55E',
  },
  // Dating Banner styles
  datingBanner: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  datingBannerPressed: {
    opacity: 0.9,
    borderColor: colors.accent,
  },
  datingBannerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  datingBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  datingBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  datingBannerText: {
    flex: 1,
  },
  datingBannerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: 2,
  },
  datingBannerSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
});
