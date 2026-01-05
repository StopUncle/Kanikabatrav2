// Scenario Intro Screen
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Clock,
  Play,
  Zap,
  Users,
  CheckCircle,
  RotateCcw,
  Lock,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  colors,
  spacing,
  borderRadius,
  typography,
} from '../../../lib/theme';
import { haptics } from '../../../lib/haptics';
import { simulatorService } from '../../../services/simulatorService';
import { useSimulatorStore } from '../../../stores/simulatorStore';
import type { Scenario, OutcomeType, ScenarioProgress } from '../../../content/simulator';

// Difficulty colors
const DIFFICULTY_COLORS = {
  beginner: colors.success,
  intermediate: colors.warning,
  advanced: colors.error,
};

export default function ScenarioIntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { scenarioId } = useLocalSearchParams<{ scenarioId: string }>();

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [bestOutcome, setBestOutcome] = useState<OutcomeType | null>(null);
  const [savedProgress, setSavedProgress] = useState<ScenarioProgress | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null); // null = loading

  const { startScenario, resumeScenario } = useSimulatorStore();

  // Load scenario data
  useEffect(() => {
    const loadData = async () => {
      if (!scenarioId) return;

      const scenarioData = simulatorService.getScenario(scenarioId);
      setScenario(scenarioData);

      // Check if scenario is unlocked
      const unlocked = await simulatorService.isScenarioUnlocked(scenarioId);
      setIsUnlocked(unlocked);

      // Check best outcome
      const best = await simulatorService.getBestOutcome(scenarioId);
      setBestOutcome(best);

      // Check for saved progress (for resume functionality)
      const progress = await simulatorService.loadProgress(scenarioId);
      // Only show resume if progress exists and isn't completed
      if (progress && !progress.completedAt) {
        setSavedProgress(progress);
      }
    };

    void loadData();
  }, [scenarioId]);

  const handleBack = () => {
    haptics.light();
    router.replace('/(simulator)');
  };

  const handleStartScenario = async () => {
    if (!scenarioId) return;

    haptics.medium();

    const success = await startScenario(scenarioId);
    if (success) {
      router.push(`/(simulator)/${scenarioId}/play`);
    }
  };

  const handleResumeScenario = async () => {
    if (!scenarioId) return;

    haptics.medium();

    const success = await resumeScenario(scenarioId);
    if (success) {
      router.push(`/(simulator)/${scenarioId}/play`);
    }
  };

  if (!scenario || isUnlocked === null) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Show locked state if scenario is not unlocked
  if (!isUnlocked) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
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
        </View>
        <View style={styles.lockedContainer}>
          <View style={styles.lockedIconContainer}>
            <Lock size={48} color={colors.secondary} />
          </View>
          <Text style={styles.lockedTitle}>Scenario Locked</Text>
          <Text style={styles.lockedDescription}>
            Complete the previous scenario to unlock this challenge.
          </Text>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.lockedButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.lockedButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const difficultyColor = DIFFICULTY_COLORS[scenario.difficulty];
  // Filter to main characters (exclude "Inner Voice" type characters)
  const mainCharacters = scenario.characters.filter(
    c => !c.name.toLowerCase().includes('inner') && !c.name.toLowerCase().includes('voice')
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient */}
      <LinearGradient
        colors={['rgba(201, 169, 97, 0.08)', 'transparent', 'transparent']}
        style={StyleSheet.absoluteFill}
      />

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
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Meta row */}
        <View style={styles.metaRow}>
          <View
            style={[styles.difficultyBadge, { borderColor: difficultyColor }]}
          >
            <Text style={[styles.difficultyText, { color: difficultyColor }]}>
              {scenario.difficulty}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color={colors.secondary} />
            <Text style={styles.metaText}>{scenario.estimatedMinutes} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Zap size={14} color={colors.accent} />
            <Text style={styles.metaText}>+{scenario.xpReward} XP</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{scenario.title}</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>{scenario.tagline}</Text>

        {/* Description */}
        <Text style={styles.description}>{scenario.description}</Text>

        {/* Characters - compact chips */}
        {mainCharacters.length > 0 && (
          <View style={styles.charactersSection}>
            <View style={styles.characterHeader}>
              <Users size={14} color={colors.secondary} />
              <Text style={styles.characterLabel}>Characters</Text>
            </View>
            <View style={styles.characterChips}>
              {mainCharacters.map((character) => (
                <View key={character.id} style={styles.characterChip}>
                  <Text style={styles.characterName}>{character.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Best outcome badge */}
        {bestOutcome && (
          <View style={styles.outcomeSection}>
            <View
              style={[
                styles.outcomeBadge,
                {
                  backgroundColor:
                    bestOutcome === 'passed'
                      ? 'rgba(76, 175, 80, 0.15)'
                      : 'rgba(229, 69, 69, 0.15)',
                  borderColor:
                    bestOutcome === 'passed'
                      ? colors.success
                      : colors.error,
                },
              ]}
            >
              <CheckCircle
                size={16}
                color={
                  bestOutcome === 'passed'
                    ? colors.success
                    : colors.error
                }
              />
              <Text
                style={[
                  styles.outcomeText,
                  {
                    color:
                      bestOutcome === 'passed'
                        ? colors.success
                        : colors.error,
                  },
                ]}
              >
                {bestOutcome === 'passed'
                  ? 'Completed'
                  : 'Lesson Learned'}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Action buttons */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom + spacing.md }]}>
        {savedProgress ? (
          <View style={styles.buttonRow}>
            <Pressable
              onPress={handleResumeScenario}
              style={({ pressed }) => [
                styles.primaryButton,
                styles.flexButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Play size={18} color={colors.background} />
              <Text style={styles.primaryButtonText}>Continue</Text>
            </Pressable>
            <Pressable
              onPress={handleStartScenario}
              style={({ pressed }) => [
                styles.secondaryButton,
                styles.flexButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <RotateCcw size={18} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Start Over</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={handleStartScenario}
            style={({ pressed }) => [
              styles.primaryButton,
              styles.fullWidthButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Play size={18} color={colors.background} />
            <Text style={styles.primaryButtonText}>Begin Scenario</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: typography.sm,
    color: colors.secondary,
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
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.md,
    color: colors.accent,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.md,
    color: colors.secondary,
    lineHeight: typography.md * 1.6,
    marginBottom: spacing.lg,
  },
  charactersSection: {
    marginBottom: spacing.lg,
  },
  characterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  characterLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  characterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  characterChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  characterName: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  outcomeSection: {
    marginTop: spacing.sm,
  },
  outcomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  outcomeText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  fullWidthButton: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  flexButton: {
    flex: 1,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.background,
  },
  secondaryButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  lockedIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lockedTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold as any,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  lockedDescription: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: typography.md * 1.5,
    marginBottom: spacing.xl,
  },
  lockedButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lockedButtonText: {
    fontSize: typography.md,
    fontWeight: typography.semibold as any,
    color: colors.primary,
  },
});
