import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Target, Lock, Zap, TrendingUp, ClipboardList } from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { MissionCard } from '../../components/missions/MissionCard';
import { CurrentMissionHero } from '../../components/missions/CurrentMissionHero';
import { colors, spacing, typography, borderRadius, layout } from '../../lib/theme';
import { missionService } from '../../services/missionService';
import { missions, type WeeklyMission } from '../../content/missions';
import { useAuthStore } from '../../stores/authStore';
import { haptics } from '../../lib/haptics';

export default function TrainScreen() {
  const { user } = useAuthStore();
  const [currentMission, setCurrentMission] = useState<WeeklyMission | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [missionsWithStatus, setMissionsWithStatus] = useState<
    Array<{ mission: WeeklyMission; status: 'locked' | 'active' | 'completed' }>
  >([]);
  const [refreshing, setRefreshing] = useState(false);
  const [daysUntilNext, setDaysUntilNext] = useState(0);

  const userTier = user?.subscription_tier || 'free';

  useEffect(() => {
    void loadMissionData();
  }, [user]);

  const loadMissionData = async () => {
    await missionService.initialize();

    const started = missionService.hasStartedProgram();
    setHasStarted(started);

    if (started) {
      const current = missionService.getCurrentMission(userTier);
      setCurrentMission(current);

      if (current) {
        const progress = missionService.getCompletionPercentage(current.id);
        setCurrentProgress(progress);
      }

      const withStatus = missionService.getAllMissionsWithStatus(userTier);
      setMissionsWithStatus(withStatus);

      const daysLeft = missionService.getDaysUntilNextUnlock();
      setDaysUntilNext(daysLeft);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMissionData();
    setRefreshing(false);
  }, [userTier]);

  const handleStartProgram = async () => {
    haptics.medium();
    await missionService.startProgram();
    await loadMissionData();
  };

  const handleContinueMission = () => {
    if (currentMission) {
      haptics.light();
      router.push({
        pathname: '/missions/[id]',
        params: { id: currentMission.id },
      });
    }
  };

  const handleMissionPress = (mission: WeeklyMission) => {
    router.push({
      pathname: '/missions/[id]',
      params: { id: mission.id },
    });
  };

  // Calculate days remaining in current week
  const daysRemaining = 7 - (new Date().getDay() || 7);

  // Not started yet - show onboarding
  if (!hasStarted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Train</Text>
          <Text style={styles.subtitle}>Weekly psychological missions</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Onboarding Hero */}
          <Card variant="glassGold" glow style={styles.onboardingCard}>
            <View style={styles.onboardingIcon}>
              <Target size={48} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text style={styles.onboardingTitle}>
              12 Weeks to Mastery
            </Text>
            <Text style={styles.onboardingText}>
              Each week, you'll receive a new psychological mission. Complete real-world
              exercises, log your field reports, and track your transformation.
            </Text>
            <View style={styles.onboardingFeatures}>
              <View style={styles.featureRow}>
                <Zap size={16} color={colors.accent} />
                <Text style={styles.featureText}>Weekly tactical missions</Text>
              </View>
              <View style={styles.featureRow}>
                <Target size={16} color={colors.accent} />
                <Text style={styles.featureText}>Real-world field exercises</Text>
              </View>
              <View style={styles.featureRow}>
                <Lock size={16} color={colors.accent} />
                <Text style={styles.featureText}>New content unlocks every week</Text>
              </View>
            </View>
            <GradientButton
              title="Begin Your Training"
              onPress={handleStartProgram}
              glow
              fullWidth
            />
          </Card>

          {/* Preview of missions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mission Preview</Text>
            <Text style={styles.sectionSubtitle}>
              Here's what's waiting for you
            </Text>
            {missions.slice(0, 4).map((mission, index) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                status={index === 0 ? 'active' : 'locked'}
                compact
              />
            ))}
            <Text style={styles.moreText}>
              + {missions.length - 4} more weeks of training
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Train</Text>
          <Text style={styles.subtitle}>Weekly psychological missions</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            style={styles.headerButton}
            onPress={() => {
              haptics.light();
              router.push('/field-reports');
            }}
          >
            <ClipboardList size={20} color={colors.secondary} />
          </Pressable>
          <Pressable
            style={styles.headerButton}
            onPress={() => {
              haptics.light();
              router.push('/progress');
            }}
          >
            <TrendingUp size={20} color={colors.accent} />
          </Pressable>
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
        {/* Current Mission Hero */}
        {currentMission && (
          <CurrentMissionHero
            mission={currentMission}
            progress={currentProgress}
            daysRemaining={daysRemaining}
            onContinue={handleContinueMission}
          />
        )}

        {/* Next unlock countdown */}
        {daysUntilNext > 0 && (
          <Card style={styles.countdownCard}>
            <Lock size={20} color={colors.accent} />
            <View style={styles.countdownContent}>
              <Text style={styles.countdownTitle}>Next mission unlocks in</Text>
              <Text style={styles.countdownDays}>
                {daysUntilNext} day{daysUntilNext !== 1 ? 's' : ''}
              </Text>
            </View>
          </Card>
        )}

        {/* All Missions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Missions</Text>
          <View style={styles.missionsList}>
            {missionsWithStatus.map(({ mission, status }) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                status={status}
                progress={
                  status === 'active'
                    ? missionService.getCompletionPercentage(mission.id)
                    : status === 'completed'
                    ? 100
                    : 0
                }
                onPress={() => handleMissionPress(mission)}
                compact
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.screenPadding,
    gap: layout.sectionGap,
  },
  onboardingCard: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  onboardingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.accent,
    textAlign: 'center',
  },
  onboardingText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  onboardingFeatures: {
    gap: spacing.sm,
    width: '100%',
    paddingVertical: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    fontSize: typography.sm,
    color: colors.primary,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  sectionSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: -spacing.sm,
  },
  missionsList: {
    gap: spacing.sm,
  },
  moreText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  countdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  countdownContent: {
    flex: 1,
  },
  countdownTitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  countdownDays: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
});
