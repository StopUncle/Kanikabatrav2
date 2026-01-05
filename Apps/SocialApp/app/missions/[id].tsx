import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as LucideIcons from 'lucide-react-native';
import {
  ArrowLeft,
  Target,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Lightbulb,
  FileText,
  Send,
  Lock,
  ClipboardList,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { AuroraBackground } from '../../components/effects/AuroraBackground';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  gradients,
  layout,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { getMission, type WeeklyMission } from '../../content/missions';
import { missionService } from '../../services/missionService';
import { useAuthStore } from '../../stores/authStore';

export default function MissionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();
  const [mission, setMission] = useState<WeeklyMission | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brief: true,
    exercises: true,
    reflection: false,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const userTier = user?.subscription_tier || 'free';

  useEffect(() => {
    if (id) {
      void loadMission();
    }
  }, [id]);

  const loadMission = async () => {
    if (!id) return;

    await missionService.initialize();

    const missionData = getMission(id);
    if (!missionData) {
      setNotFound(true);
      return;
    }

    if (missionData) {
      setMission(missionData);

      // Check if locked
      const currentWeek = missionService.getCurrentWeek();
      const tierHierarchy = { free: 0, premium: 1, vip: 2 };
      const userLevel = tierHierarchy[userTier as keyof typeof tierHierarchy] || 0;
      const missionLevel = tierHierarchy[missionData.tier];
      const locked = missionData.week > currentWeek || missionLevel > userLevel;
      setIsLocked(locked);

      // Load progress
      const progress = missionService.getMissionProgress(id);
      if (progress) {
        setCompletedExercises(progress.exercisesCompleted);
        if (progress.reflectionAnswers) {
          setReflectionAnswers(progress.reflectionAnswers);
        }
        setIsCompleted(progress.status === 'completed');
      } else if (!locked) {
        // Activate mission if not locked and not started
        await missionService.activateMission(id);
      }
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMission();
    setRefreshing(false);
  }, [id]);

  const toggleSection = (section: string) => {
    haptics.light();
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleExercise = async (exerciseId: string) => {
    if (!id || isLocked) return;
    haptics.medium();

    const isCompleted = completedExercises.includes(exerciseId);

    if (isCompleted) {
      await missionService.uncompleteExercise(id, exerciseId);
      setCompletedExercises((prev) => prev.filter((e) => e !== exerciseId));
    } else {
      await missionService.completeExercise(id, exerciseId);
      setCompletedExercises((prev) => [...prev, exerciseId]);
    }
  };

  const handleReflectionChange = (promptIndex: number, value: string) => {
    setReflectionAnswers((prev) => ({
      ...prev,
      [`prompt_${promptIndex}`]: value,
    }));
  };

  const handleSubmitReflection = async () => {
    if (!id || !mission || isLocked) return;

    // Check if all prompts are answered
    const allAnswered = mission.reflectionPrompts.every(
      (_, index) => reflectionAnswers[`prompt_${index}`]?.trim()
    );

    if (!allAnswered) {
      haptics.error();
      return;
    }

    haptics.success();
    // submitReflection returns whether mission is now complete
    const completed = await missionService.submitReflection(id, reflectionAnswers);
    if (completed) {
      setIsCompleted(true);
    }
  };

  const progress = mission
    ? Math.round((completedExercises.length / mission.fieldExercises.length) * 100)
    : 0;

  const reflectionComplete = mission?.reflectionPrompts.every(
    (_, index) => reflectionAnswers[`prompt_${index}`]?.trim()
  );

  if (notFound) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Mission not found</Text>
          <Pressable
            style={styles.backButtonLarge}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!mission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading mission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ size: number; color: string; strokeWidth?: number }>>)[
      mission.icon
    ] || Target;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => {
                haptics.light();
                router.replace('/(tabs)');
              }}
            >
              <ArrowLeft size={24} color={colors.primary} />
            </Pressable>
            <View style={styles.headerContent}>
              <Text style={styles.headerWeek}>WEEK {mission.week}</Text>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {mission.title}
              </Text>
            </View>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <CheckCircle2 size={20} color={colors.success} />
              </View>
            )}
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.accent}
              />
            }
          >
            {/* Hero Section */}
            <View style={[styles.heroContainer, shadows.glow]}>
              <AuroraBackground style={styles.aurora} intensity="strong">
                <View style={styles.heroContent}>
                  <LinearGradient
                    colors={[mission.color, `${mission.color}CC`]}
                    style={styles.iconGradient}
                  >
                    <IconComponent size={40} color="#FFFFFF" strokeWidth={1.5} />
                  </LinearGradient>
                  <Text style={styles.heroSubtitle}>{mission.subtitle}</Text>
                  <Text style={styles.heroDescription}>{mission.description}</Text>

                  {/* Progress Bar */}
                  {!isLocked && (
                    <View style={styles.progressSection}>
                      <View style={styles.progressBar}>
                        <LinearGradient
                          colors={gradients.goldPrimary}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[styles.progressFill, { width: `${progress}%` }]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {completedExercises.length}/{mission.fieldExercises.length} exercises
                        completed
                      </Text>
                    </View>
                  )}

                  {isLocked && (
                    <View style={styles.lockedOverlay}>
                      <Lock size={32} color={colors.tertiary} />
                      <Text style={styles.lockedText}>
                        {mission.tier !== 'free' && userTier === 'free'
                          ? `Upgrade to ${mission.tier} to unlock`
                          : `Unlocks in Week ${mission.week}`}
                      </Text>
                    </View>
                  )}
                </View>
              </AuroraBackground>
            </View>

            {/* Objectives */}
            <Card style={styles.objectivesCard}>
              <Text style={styles.sectionLabel}>Mission Objectives</Text>
              <View style={styles.objectivesList}>
                {mission.objectives.map((obj, index) => (
                  <View key={index} style={styles.objectiveItem}>
                    <Target size={16} color={colors.accent} />
                    <Text style={styles.objectiveText}>{obj.text}</Text>
                  </View>
                ))}
              </View>
            </Card>

            {/* Tactical Brief - Collapsible */}
            <Card style={styles.sectionCard}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection('brief')}
              >
                <View style={styles.sectionTitleRow}>
                  <BookOpen size={20} color={colors.accent} />
                  <Text style={styles.sectionTitle}>Tactical Brief</Text>
                </View>
                {expandedSections.brief ? (
                  <ChevronUp size={20} color={colors.secondary} />
                ) : (
                  <ChevronDown size={20} color={colors.secondary} />
                )}
              </Pressable>

              {expandedSections.brief && (
                <View style={styles.sectionContent}>
                  <Text style={styles.briefOpening}>{mission.tacticalBrief.opening}</Text>

                  {mission.tacticalBrief.concepts.map((concept, index) => (
                    <View key={index} style={styles.conceptCard}>
                      <View style={styles.conceptHeader}>
                        <Lightbulb size={16} color={colors.accent} />
                        <Text style={styles.conceptTitle}>{concept.title}</Text>
                      </View>
                      <Text style={styles.conceptExplanation}>{concept.content}</Text>
                    </View>
                  ))}

                  <View style={styles.takeawaysSection}>
                    <Text style={styles.takeawaysTitle}>Key Takeaways</Text>
                    {mission.tacticalBrief.keyTakeaways.map((takeaway, index) => (
                      <View key={index} style={styles.takeawayItem}>
                        <View style={styles.takeawayBullet} />
                        <Text style={styles.takeawayText}>{takeaway}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </Card>

            {/* Field Exercises - Collapsible */}
            <Card style={styles.sectionCard}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection('exercises')}
              >
                <View style={styles.sectionTitleRow}>
                  <Target size={20} color={colors.accent} />
                  <Text style={styles.sectionTitle}>Field Exercises</Text>
                  <View style={styles.exerciseCount}>
                    <Text style={styles.exerciseCountText}>
                      {completedExercises.length}/{mission.fieldExercises.length}
                    </Text>
                  </View>
                </View>
                {expandedSections.exercises ? (
                  <ChevronUp size={20} color={colors.secondary} />
                ) : (
                  <ChevronDown size={20} color={colors.secondary} />
                )}
              </Pressable>

              {expandedSections.exercises && (
                <View style={styles.sectionContent}>
                  {mission.fieldExercises.map((exercise, index) => {
                    const isExerciseCompleted = completedExercises.includes(exercise.id);
                    return (
                      <Pressable
                        key={exercise.id}
                        style={[
                          styles.exerciseCard,
                          isExerciseCompleted && styles.exerciseCompleted,
                          isLocked && styles.exerciseLocked,
                        ]}
                        onPress={() => toggleExercise(exercise.id)}
                        disabled={isLocked}
                      >
                        <View style={styles.exerciseCheckbox}>
                          {isExerciseCompleted ? (
                            <CheckCircle2 size={24} color={colors.success} />
                          ) : (
                            <Circle size={24} color={colors.tertiary} />
                          )}
                        </View>
                        <View style={styles.exerciseContent}>
                          <Text
                            style={[
                              styles.exerciseTask,
                              isExerciseCompleted && styles.exerciseTaskCompleted,
                            ]}
                          >
                            {exercise.task}
                          </Text>
                          <Text style={styles.exerciseContext}>{exercise.context}</Text>
                          <View style={styles.successCriteria}>
                            <Text style={styles.successLabel}>Success:</Text>
                            <Text style={styles.successText}>
                              {exercise.successCriteria}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </Card>

            {/* Field Report CTA */}
            {!isLocked && completedExercises.length > 0 && (
              <Card style={styles.fieldReportCta}>
                <ClipboardList size={24} color={colors.accent} />
                <View style={styles.fieldReportContent}>
                  <Text style={styles.fieldReportTitle}>Log a Field Report</Text>
                  <Text style={styles.fieldReportHint}>
                    Document what happened when you applied these tactics
                  </Text>
                </View>
                <Pressable
                  style={styles.fieldReportButton}
                  onPress={() => {
                    haptics.medium();
                    router.push({
                      pathname: '/field-reports/new',
                      params: { missionId: id },
                    });
                  }}
                >
                  <Text style={styles.fieldReportButtonText}>Log Report</Text>
                </Pressable>
              </Card>
            )}

            {/* Reflection - Collapsible */}
            <Card style={styles.sectionCard}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection('reflection')}
              >
                <View style={styles.sectionTitleRow}>
                  <FileText size={20} color={colors.accent} />
                  <Text style={styles.sectionTitle}>Weekly Reflection</Text>
                  {reflectionComplete && (
                    <CheckCircle2 size={16} color={colors.success} />
                  )}
                </View>
                {expandedSections.reflection ? (
                  <ChevronUp size={20} color={colors.secondary} />
                ) : (
                  <ChevronDown size={20} color={colors.secondary} />
                )}
              </Pressable>

              {expandedSections.reflection && (
                <View style={styles.sectionContent}>
                  <Text style={styles.reflectionIntro}>
                    Complete these reflection prompts to solidify your learning and track your
                    growth.
                  </Text>

                  {mission.reflectionPrompts.map((prompt, index) => (
                    <View key={index} style={styles.reflectionPrompt}>
                      <Text style={styles.promptText}>{prompt}</Text>
                      <TextInput
                        style={[
                          styles.reflectionInput,
                          isLocked && styles.inputLocked,
                        ]}
                        placeholder="Your reflection..."
                        placeholderTextColor={colors.tertiary}
                        multiline
                        numberOfLines={4}
                        value={reflectionAnswers[`prompt_${index}`] || ''}
                        onChangeText={(value) => handleReflectionChange(index, value)}
                        editable={!isLocked && !isCompleted}
                      />
                    </View>
                  ))}

                  {!isLocked && !isCompleted && (
                    <GradientButton
                      title="Submit Reflection"
                      onPress={handleSubmitReflection}
                      disabled={!reflectionComplete}
                      fullWidth
                      icon={<Send size={18} color={colors.background} />}
                    />
                  )}

                  {isCompleted && (
                    <View style={styles.completedMessage}>
                      <CheckCircle2 size={24} color={colors.success} />
                      <Text style={styles.completedText}>
                        Mission Complete! Your reflection has been saved.
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </Card>

            {/* Bottom spacing */}
            <View style={{ height: spacing.xl }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  backButtonLarge: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  backButtonText: {
    fontSize: typography.md,
    color: colors.accent,
    fontWeight: typography.semibold,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  headerContent: {
    flex: 1,
  },
  headerWeek: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  completedBadge: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.screenPadding,
    gap: spacing.md,
  },
  heroContainer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  aurora: {
    borderRadius: borderRadius.xl,
  },
  heroContent: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSubtitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressSection: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  lockedOverlay: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: `${colors.background}80`,
    borderRadius: borderRadius.md,
  },
  lockedText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
  },
  objectivesCard: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  objectivesList: {
    gap: spacing.sm,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  objectiveText: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
    lineHeight: 22,
  },
  sectionCard: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  exerciseCount: {
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  exerciseCountText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  sectionContent: {
    gap: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  briefOpening: {
    fontSize: typography.md,
    color: colors.primary,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  conceptCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  conceptTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  conceptExplanation: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 22,
  },
  exampleBox: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  exampleLabel: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.tertiary,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  takeawaysSection: {
    gap: spacing.sm,
  },
  takeawaysTitle: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  takeawayBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 7,
  },
  takeawayText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.primary,
    lineHeight: 20,
  },
  exerciseCard: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseCompleted: {
    borderColor: colors.success,
    backgroundColor: `${colors.success}10`,
  },
  exerciseLocked: {
    opacity: 0.5,
  },
  exerciseCheckbox: {
    paddingTop: 2,
  },
  exerciseContent: {
    flex: 1,
    gap: spacing.xs,
  },
  exerciseTask: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    lineHeight: 22,
  },
  exerciseTaskCompleted: {
    textDecorationLine: 'line-through',
    color: colors.secondary,
  },
  exerciseContext: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  successCriteria: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: spacing.xs,
  },
  successLabel: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  successText: {
    fontSize: typography.xs,
    color: colors.secondary,
    flex: 1,
  },
  reflectionIntro: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  reflectionPrompt: {
    gap: spacing.sm,
  },
  promptText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
    lineHeight: 22,
  },
  reflectionInput: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputLocked: {
    opacity: 0.5,
  },
  completedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: `${colors.success}15`,
    borderRadius: borderRadius.md,
  },
  completedText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.success,
    fontWeight: typography.medium,
  },
  fieldReportCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
    borderWidth: 1,
  },
  fieldReportContent: {
    flex: 1,
    gap: 2,
  },
  fieldReportTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  fieldReportHint: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  fieldReportButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  fieldReportButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.background,
  },
});
