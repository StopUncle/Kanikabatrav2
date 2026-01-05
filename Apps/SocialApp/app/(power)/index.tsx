// Power Plays - Scenario Selection Screen
import React, { useEffect, useState } from 'react';
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
import {
  ChevronLeft,
  Clock,
  Lock,
  CheckCircle,
  Play,
  Zap,
  Trophy,
  RotateCcw,
  Briefcase,
  Crown,
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
import type { Scenario, OutcomeType } from '../../content/simulator';
import { getPowerScenarios } from '../../content/simulator/scenarios';

// Difficulty colors
const DIFFICULTY_COLORS = {
  beginner: colors.success,
  intermediate: colors.warning,
  advanced: colors.error,
};

export default function PowerSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tier: subscriptionTier } = useAuthStore();

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [completedMap, setCompletedMap] = useState<
    Record<string, OutcomeType | null>
  >({});

  // Load scenarios and completion status
  useEffect(() => {
    const loadData = async () => {
      const powerScenarios = getPowerScenarios();
      setScenarios(powerScenarios);

      // Check completion status for each
      const completed = await simulatorService.getCompletedScenarios();
      const map: Record<string, OutcomeType | null> = {};
      for (const record of completed) {
        map[record.scenarioId] = record.outcome;
      }
      setCompletedMap(map);
    };

    void loadData();
  }, []);

  const handleBack = () => {
    haptics.light();
    router.replace('/(tabs)');
  };

  // Separate VIP from non-VIP
  const vipScenarios = scenarios.filter((s) => s.tier === 'vip');
  const otherScenarios = scenarios.filter((s) => s.tier !== 'vip');

  const handleSelectScenario = (scenario: Scenario) => {
    haptics.medium();

    // Check tier access
    const hasAccess =
      scenario.tier === 'free' ||
      (scenario.tier === 'premium' && (subscriptionTier === 'premium' || subscriptionTier === 'vip')) ||
      (scenario.tier === 'vip' && subscriptionTier === 'vip');

    if (!hasAccess) {
      router.push('/(subscription)');
      return;
    }

    // Use simulator routes for playback
    router.push(`/(simulator)/${scenario.id}`);
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
          <View style={styles.headerTitleRow}>
            <Briefcase size={24} color="#1E40AF" />
            <Text style={styles.headerTitle}>Power Plays</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Corporate & professional dynamics
          </Text>
        </View>
      </View>

      {/* Scenario List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* VIP Section */}
        {vipScenarios.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Crown size={16} color={colors.accent} />
              <Text style={[styles.sectionTitle, { color: colors.accent }]}>VIP Exclusive</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Advanced corporate mastery scenarios
            </Text>
            {vipScenarios.map((scenario) => {
              const hasAccess = subscriptionTier === 'vip';
              return (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  completedOutcome={completedMap[scenario.id] || null}
                  onSelect={() => handleSelectScenario(scenario)}
                  locked={!hasAccess}
                  isVip
                />
              );
            })}
          </View>
        )}

        {/* Premium/Free Section */}
        {otherScenarios.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Power Scenarios</Text>
            <Text style={styles.sectionSubtitle}>
              Professional dynamics & office politics
            </Text>
            {otherScenarios.map((scenario) => {
              const hasAccess =
                scenario.tier === 'free' ||
                subscriptionTier === 'premium' ||
                subscriptionTier === 'vip';
              return (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  completedOutcome={completedMap[scenario.id] || null}
                  onSelect={() => handleSelectScenario(scenario)}
                  locked={!hasAccess}
                />
              );
            })}
          </View>
        )}

        {/* Empty state if no scenarios */}
        {scenarios.length === 0 && (
          <View style={styles.emptyState}>
            <Briefcase size={48} color={colors.tertiary} />
            <Text style={styles.emptyText}>Power scenarios coming soon</Text>
            <Text style={styles.emptySubtext}>
              Master interviews, negotiations, and office dynamics
            </Text>
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
  isVip?: boolean;
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
  isVip = false,
}: ScenarioCardProps) {
  const difficultyColor = DIFFICULTY_COLORS[scenario.difficulty];
  const outcomeConfig = completedOutcome ? OUTCOME_CONFIG[completedOutcome] : null;
  const accentColor = isVip ? colors.accent : '#1E40AF';

  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        styles.card,
        pressed && !locked && styles.cardPressed,
        locked && styles.cardLocked,
        completedOutcome && {
          borderColor: outcomeConfig?.borderColor,
          borderWidth: 1.5,
        },
        isVip && { borderColor: 'rgba(201, 169, 97, 0.3)' },
      ]}
    >
      {/* Gradient overlay */}
      <LinearGradient
        colors={
          locked
            ? ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.2)']
            : completedOutcome
              ? [outcomeConfig?.bgColor || 'transparent', 'transparent']
              : isVip
                ? ['rgba(201, 169, 97, 0.08)', 'transparent']
                : ['rgba(30, 64, 175, 0.08)', 'transparent']
        }
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.cardContent}>
        {/* Header row */}
        <View style={styles.cardHeader}>
          <View style={[styles.categoryBadge, locked && styles.categoryBadgeLocked, { backgroundColor: isVip ? colors.accentMuted : 'rgba(30, 64, 175, 0.15)' }]}>
            <Briefcase size={12} color={locked ? colors.tertiary : accentColor} />
            <Text style={[styles.categoryText, locked && styles.categoryTextLocked, { color: locked ? colors.tertiary : accentColor }]}>
              {isVip ? 'VIP' : 'Power'}
            </Text>
          </View>

          {locked && (
            <View style={styles.lockBadge}>
              <Lock size={12} color={isVip ? colors.accent : '#1E40AF'} />
              <Text style={[styles.lockText, { color: isVip ? colors.accent : '#1E40AF' }]}>
                {isVip ? 'VIP Only' : 'Premium'}
              </Text>
            </View>
          )}

          {/* Completion badge */}
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
        <Text style={[styles.cardTitle, locked && styles.cardTitleLocked]}>{scenario.title}</Text>
        <Text style={[styles.cardTagline, locked && styles.cardTaglineLocked, { color: locked ? colors.tertiary : accentColor }]}>{scenario.tagline}</Text>
        <Text style={[styles.cardDescription, locked && styles.cardDescriptionLocked]} numberOfLines={2}>
          {scenario.description}
        </Text>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={14} color={locked ? colors.tertiary : colors.secondary} />
              <Text style={[styles.metaText, locked && styles.metaTextLocked]}>{scenario.estimatedMinutes} min</Text>
            </View>
            <View style={styles.metaItem}>
              <Zap size={14} color={locked ? colors.tertiary : accentColor} />
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
          <View style={[styles.playButton, locked && styles.playButtonLocked, { backgroundColor: locked ? colors.surfaceElevated : isVip ? colors.accentMuted : 'rgba(30, 64, 175, 0.15)' }]}>
            {locked ? (
              <Lock size={16} color={colors.tertiary} />
            ) : completedOutcome ? (
              <RotateCcw size={16} color={accentColor} />
            ) : (
              <Play size={16} color={accentColor} fill={accentColor} />
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
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: '#1E40AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginBottom: spacing.md,
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
    borderColor: '#1E40AF',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  categoryBadgeLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  categoryText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
  },
  categoryTextLocked: {
    color: colors.tertiary,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  lockText: {
    fontSize: typography.xs,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonLocked: {
    backgroundColor: colors.surfaceElevated,
  },
  emptyState: {
    padding: spacing.xl * 2,
    alignItems: 'center',
    gap: spacing.md,
  },
  emptyText: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.secondary,
  },
  emptySubtext: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
  },
});
