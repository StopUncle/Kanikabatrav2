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
import { router, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Target,
  FileText,
  TrendingUp,
  Zap,
  Award,
  Calendar,
  Star,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { PsychProfile } from '../../components/progress/PsychProfile';
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
import {
  progressService,
  type ProgressStats,
} from '../../services/progressService';
import { useAuthStore } from '../../stores/authStore';

const ACHIEVEMENT_DATA: Record<string, { icon: string; title: string; description: string }> = {
  first_mission: { icon: 'Target', title: 'First Blood', description: 'Completed your first mission' },
  month_one: { icon: 'Calendar', title: 'Month One', description: 'Completed 4 weeks of training' },
  month_two: { icon: 'Calendar', title: 'Month Two', description: 'Completed 8 weeks of training' },
  full_program: { icon: 'Award', title: 'Graduate', description: 'Completed the full 12-week program' },
  first_report: { icon: 'FileText', title: 'Field Agent', description: 'Submitted your first field report' },
  field_veteran: { icon: 'FileText', title: 'Field Veteran', description: 'Submitted 10 field reports' },
  tactical_master: { icon: 'FileText', title: 'Tactical Master', description: 'Submitted 25 field reports' },
  high_performer: { icon: 'Star', title: 'High Performer', description: 'Average report rating of 4+' },
  elite_operator: { icon: 'Star', title: 'Elite Operator', description: 'Average report rating of 4.5+' },
  rising_power: { icon: 'Zap', title: 'Rising Power', description: 'Reached power level 50' },
  dominant_force: { icon: 'Zap', title: 'Dominant Force', description: 'Reached power level 75' },
  psychological_sovereign: { icon: 'Zap', title: 'Psychological Sovereign', description: 'Reached power level 90' },
  week_streak: { icon: 'TrendingUp', title: 'Week Warrior', description: '7-day activity streak' },
  month_streak: { icon: 'TrendingUp', title: 'Month Master', description: '30-day activity streak' },
};

export default function ProgressScreen() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userTier = user?.subscription_tier || 'free';

  useEffect(() => {
    void loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    const userStats = await progressService.getProgressStats(user.id, userTier);
    setStats(userStats);

    const userAchievements = progressService.getAchievements(userStats);
    setAchievements(userAchievements);

    setIsLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [user]);

  if (!stats || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading progress...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              haptics.light();
              router.replace('/(tabs)/profile');
            }}
          >
            <ArrowLeft size={24} color={colors.primary} />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Your Progress</Text>
            <Text style={styles.subtitle}>Track your transformation</Text>
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
          {/* Power Level Hero */}
          <View style={[styles.powerContainer, shadows.glow]}>
            <AuroraBackground style={styles.aurora} intensity="strong">
              <View style={styles.powerContent}>
                <Text style={styles.powerLabel}>POWER LEVEL</Text>
                <View style={styles.powerValue}>
                  <Text style={styles.powerNumber}>{stats.powerLevel}</Text>
                  <Text style={styles.powerMax}>/100</Text>
                </View>
                <View style={styles.powerBar}>
                  <LinearGradient
                    colors={gradients.goldPrimary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.powerFill, { width: `${stats.powerLevel}%` }]}
                  />
                </View>
                <View style={styles.powerMeta}>
                  <View style={styles.metaItem}>
                    <Calendar size={14} color={colors.secondary} />
                    <Text style={styles.metaText}>{stats.daysActive} days active</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Zap size={14} color={colors.accent} />
                    <Text style={styles.metaText}>{stats.streak} day streak</Text>
                  </View>
                </View>
              </View>
            </AuroraBackground>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Target size={24} color={colors.accent} />
              <Text style={styles.statValue}>{stats.missions.completed}</Text>
              <Text style={styles.statLabel}>Missions</Text>
              <Text style={styles.statMeta}>of {stats.missions.total}</Text>
            </Card>
            <Card style={styles.statCard}>
              <FileText size={24} color={colors.accent} />
              <Text style={styles.statValue}>{stats.fieldReports.total}</Text>
              <Text style={styles.statLabel}>Field Reports</Text>
              <Text style={styles.statMeta}>{stats.fieldReports.thisMonth} this month</Text>
            </Card>
            <Card style={styles.statCard}>
              <Star size={24} color={colors.accent} />
              <Text style={styles.statValue}>{stats.fieldReports.averageRating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
              <Text style={styles.statMeta}>out of 5</Text>
            </Card>
            <Card style={styles.statCard}>
              <TrendingUp size={24} color={colors.accent} />
              <Text style={styles.statValue}>{stats.missions.completionRate}%</Text>
              <Text style={styles.statLabel}>Completion</Text>
              <Text style={styles.statMeta}>rate</Text>
            </Card>
          </View>

          {/* Psychological Profile */}
          <PsychProfile profile={stats.psychProfile} />

          {/* Achievements */}
          <Card style={styles.achievementsCard}>
            <View style={styles.achievementsHeader}>
              <Award size={20} color={colors.accent} />
              <Text style={styles.achievementsTitle}>Achievements</Text>
              <Text style={styles.achievementsCount}>
                {achievements.length}/{Object.keys(ACHIEVEMENT_DATA).length}
              </Text>
            </View>

            <View style={styles.achievementsList}>
              {Object.entries(ACHIEVEMENT_DATA).map(([key, data]) => {
                const isUnlocked = achievements.includes(key);
                return (
                  <View
                    key={key}
                    style={[
                      styles.achievementItem,
                      !isUnlocked && styles.achievementLocked,
                    ]}
                  >
                    <View
                      style={[
                        styles.achievementIcon,
                        isUnlocked && styles.achievementIconUnlocked,
                      ]}
                    >
                      <Award
                        size={16}
                        color={isUnlocked ? colors.accent : colors.tertiary}
                      />
                    </View>
                    <View style={styles.achievementContent}>
                      <Text
                        style={[
                          styles.achievementTitle,
                          !isUnlocked && styles.achievementTextLocked,
                        ]}
                      >
                        {data.title}
                      </Text>
                      <Text
                        style={[
                          styles.achievementDesc,
                          !isUnlocked && styles.achievementTextLocked,
                        ]}
                      >
                        {data.description}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Card>

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
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: layout.screenPadding,
    gap: spacing.lg,
  },
  powerContainer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  aurora: {
    borderRadius: borderRadius.xl,
  },
  powerContent: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  powerLabel: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 2,
  },
  powerValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  powerNumber: {
    fontSize: 64,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  powerMax: {
    fontSize: typography.lg,
    color: colors.secondary,
    marginLeft: 4,
  },
  powerBar: {
    width: '100%',
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  powerFill: {
    height: '100%',
    borderRadius: 6,
  },
  powerMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.xs,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  statMeta: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  achievementsCard: {
    gap: spacing.md,
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  achievementsTitle: {
    flex: 1,
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  achievementsCount: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.semibold,
  },
  achievementsList: {
    gap: spacing.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconUnlocked: {
    backgroundColor: colors.accentMuted,
  },
  achievementContent: {
    flex: 1,
    gap: 2,
  },
  achievementTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  achievementDesc: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  achievementTextLocked: {
    color: colors.tertiary,
  },
});
