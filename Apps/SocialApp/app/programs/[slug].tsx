import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as LucideIcons from 'lucide-react-native';
import {
  ArrowLeft,
  Check,
  Lock,
  Clock,
  Target,
  Users,
  ChevronRight,
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
import { getProgramBySlug, type TransformationProgram } from '../../content/programs';
import { programService } from '../../services/programService';
import { useAuthStore } from '../../stores/authStore';

export default function ProgramDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { user } = useAuthStore();
  const [program, setProgram] = useState<TransformationProgram | null>(null);
  const [status, setStatus] = useState<'locked' | 'available' | 'enrolled' | 'completed'>('locked');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weeksCompleted, setWeeksCompleted] = useState<string[]>([]);
  const [lockReason, setLockReason] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userTier = user?.subscription_tier || 'free';

  useEffect(() => {
    if (slug) {
      void loadProgram();
    }
  }, [slug]);

  const loadProgram = async () => {
    if (!slug) return;

    const programData = getProgramBySlug(slug);
    if (programData) {
      setProgram(programData);

      // Get status
      await programService.initialize();
      const allPrograms = await programService.getAllProgramsWithStatus(userTier);
      const thisProgram = allPrograms.find((p) => p.program.id === programData.id);

      if (thisProgram) {
        setStatus(thisProgram.status);
        setLockReason(thisProgram.lockReason);

        if (thisProgram.progress) {
          setCurrentWeek(thisProgram.progress.currentWeek);
          setWeeksCompleted(thisProgram.progress.weeksCompleted);
        }
      }
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProgram();
    setRefreshing(false);
  }, [slug]);

  const handleEnroll = async () => {
    if (!program) return;

    setIsLoading(true);
    haptics.medium();

    const result = await programService.enrollInProgram(program.id, userTier);

    if (result.success) {
      haptics.success();
      await loadProgram();
    } else {
      haptics.error();
    }

    setIsLoading(false);
  };

  const handleWeekPress = (weekNumber: number, missionId: string) => {
    haptics.light();
    router.push({
      pathname: '/missions/[id]',
      params: { id: missionId },
    });
  };

  if (!program) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading program...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const IconComponent =
    (LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size: number; color: string; strokeWidth?: number }>
    >)[program.icon] || LucideIcons.Target;

  const progressPercent = Math.round(
    (weeksCompleted.length / program.durationWeeks) * 100
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace('/programs');
            }}
          >
            <ArrowLeft size={24} color={colors.primary} />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {program.title}
            </Text>
          </View>
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
          {/* Hero */}
          <View style={[styles.heroContainer, shadows.glow]}>
            <AuroraBackground style={styles.aurora} intensity="strong">
              <View style={styles.heroContent}>
                <LinearGradient
                  colors={[program.color, `${program.color}CC`]}
                  style={styles.iconGradient}
                >
                  <IconComponent size={48} color="#FFFFFF" strokeWidth={1.5} />
                </LinearGradient>
                <Text style={styles.heroTagline}>{program.tagline}</Text>
                <Text style={styles.heroDescription}>{program.description}</Text>

                {/* Progress (if enrolled) */}
                {status === 'enrolled' && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={gradients.goldPrimary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressFill, { width: `${progressPercent}%` }]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      Week {currentWeek} of {program.durationWeeks} • {progressPercent}% complete
                    </Text>
                  </View>
                )}

                {/* Tier & Duration */}
                <View style={styles.metaRow}>
                  <View style={styles.metaBadge}>
                    <Clock size={14} color={colors.secondary} />
                    <Text style={styles.metaText}>{program.durationWeeks} weeks</Text>
                  </View>
                  <View style={[styles.metaBadge, styles.tierBadge]}>
                    <Text style={styles.tierText}>{program.tier.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </AuroraBackground>
          </View>

          {/* Outcomes */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>What You'll Achieve</Text>
            <View style={styles.listSection}>
              {program.outcomes.map((outcome, index) => (
                <View key={index} style={styles.listItem}>
                  <Check size={16} color={colors.success} />
                  <Text style={styles.listText}>{outcome}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* For Whom */}
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Users size={18} color={colors.accent} />
              <Text style={styles.sectionTitle}>This Program Is For</Text>
            </View>
            <View style={styles.listSection}>
              {program.forWhom.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <Target size={14} color={colors.accent} />
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Weekly Curriculum */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>8-Week Curriculum</Text>
            <View style={styles.weeksList}>
              {program.weeks.map((week) => {
                const weekId = `${program.id}-week-${week.weekNumber}`;
                const isWeekCompleted = weeksCompleted.includes(weekId);
                const isCurrentWeek = status === 'enrolled' && week.weekNumber === currentWeek;
                const isLocked = status !== 'enrolled' || week.weekNumber > currentWeek;

                return (
                  <Pressable
                    key={week.weekNumber}
                    style={[
                      styles.weekItem,
                      isWeekCompleted && styles.weekCompleted,
                      isCurrentWeek && styles.weekCurrent,
                      isLocked && styles.weekLocked,
                    ]}
                    onPress={() => {
                      if (!isLocked) {
                        handleWeekPress(week.weekNumber, week.missionId);
                      }
                    }}
                    disabled={isLocked}
                  >
                    <View
                      style={[
                        styles.weekNumber,
                        isWeekCompleted && styles.weekNumberCompleted,
                        isCurrentWeek && styles.weekNumberCurrent,
                      ]}
                    >
                      {isWeekCompleted ? (
                        <Check size={14} color={colors.success} />
                      ) : (
                        <Text
                          style={[
                            styles.weekNumberText,
                            isCurrentWeek && styles.weekNumberTextCurrent,
                          ]}
                        >
                          {week.weekNumber}
                        </Text>
                      )}
                    </View>
                    <View style={styles.weekContent}>
                      <Text
                        style={[
                          styles.weekTheme,
                          isLocked && styles.weekTextLocked,
                        ]}
                      >
                        {week.theme}
                      </Text>
                    </View>
                    {isLocked ? (
                      <Lock size={16} color={colors.tertiary} />
                    ) : (
                      <ChevronRight size={16} color={colors.secondary} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Card>

          {/* CTA */}
          {status === 'available' && (
            <GradientButton
              title={isLoading ? 'Enrolling...' : 'Start This Program'}
              onPress={handleEnroll}
              disabled={isLoading}
              fullWidth
              glow
            />
          )}

          {status === 'locked' && lockReason && (
            <Card style={styles.lockedCard}>
              <Lock size={24} color={colors.tertiary} />
              <Text style={styles.lockedText}>{lockReason}</Text>
            </Card>
          )}

          {status === 'enrolled' && (
            <GradientButton
              title="Continue to Current Week"
              onPress={() => {
                const currentWeekData = program.weeks.find(
                  (w) => w.weekNumber === currentWeek
                );
                if (currentWeekData) {
                  handleWeekPress(currentWeek, currentWeekData.missionId);
                }
              }}
              fullWidth
              glow
            />
          )}

          {status === 'completed' && (
            <Card variant="glassGold" style={styles.completedCard}>
              <Check size={32} color={colors.success} />
              <Text style={styles.completedTitle}>Program Complete!</Text>
              <Text style={styles.completedText}>
                You've completed all 8 weeks. Review any week to reinforce your learning.
              </Text>
            </Card>
          )}

          {/* Bottom spacing */}
          <View style={{ height: spacing.xl }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
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
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTagline: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.accent,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressSection: {
    width: '100%',
    gap: spacing.sm,
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
    color: colors.accent,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  metaText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  tierBadge: {
    backgroundColor: colors.accentMuted,
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 0.5,
  },
  sectionCard: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  listSection: {
    gap: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  listText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  weeksList: {
    gap: spacing.xs,
  },
  weekItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  weekCompleted: {
    backgroundColor: `${colors.success}10`,
  },
  weekCurrent: {
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  weekLocked: {
    opacity: 0.5,
  },
  weekNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekNumberCompleted: {
    backgroundColor: colors.success,
  },
  weekNumberCurrent: {
    backgroundColor: colors.accent,
  },
  weekNumberText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.secondary,
  },
  weekNumberTextCurrent: {
    color: colors.background,
  },
  weekContent: {
    flex: 1,
  },
  weekTheme: {
    fontSize: typography.md,
    color: colors.primary,
  },
  weekTextLocked: {
    color: colors.tertiary,
  },
  lockedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  lockedText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  completedCard: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  completedTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.success,
  },
  completedText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
