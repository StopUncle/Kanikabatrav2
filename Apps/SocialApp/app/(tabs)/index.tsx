import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { logger } from '../../lib/logger';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BookOpen,
  Target,
  Calendar,
  Crown,
  ChevronRight,
  Scan,
  Gamepad2,
  MessageCircle,
  Play,
  Briefcase,
} from 'lucide-react-native';
import { Card } from '../../components/ui/Card';
import { StreakBadge } from '../../components/home/StreakBadge';
import { ProgressHub } from '../../components/home/ProgressHub';
import { CommunityHub } from '../../components/home/CommunityHub';
import { UpgradePromptCard } from '../../components/upgrade/UpgradePromptCard';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, gradients, layout } from '../../lib/theme';
import { getTodaysInsight } from '../../lib/dailyContent';
import { useAuthStore } from '../../stores/authStore';
import { courseService } from '../../services/courseService';

interface InProgressCourse {
  id: string;
  title: string;
  lesson: string;
  progress: number;
}

export default function HomeScreen() {
  const { user } = useAuthStore();

  const [inProgressCourse, setInProgressCourse] = useState<InProgressCourse | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const displayName = user?.full_name?.split(' ')[0] || 'User';
  const tier = user?.subscription_tier || 'free';

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const loadHomeData = useCallback(async () => {
    try {
      // Load courses and find in-progress course
      const coursesData = await courseService.getCourses();

      if (user?.id && coursesData.length > 0) {
        const firstCourse = coursesData[0];
        const progress = await courseService.getUserProgress(user.id, firstCourse.id);

        if (progress.length > 0) {
          const completedCount = progress.filter(p => p.completed).length;
          const progressPercent = Math.round((completedCount / firstCourse.lesson_count) * 100);

          if (progressPercent > 0 && progressPercent < 100) {
            setInProgressCourse({
              id: firstCourse.id,
              title: firstCourse.title,
              lesson: `Lesson ${completedCount + 1} of ${firstCourse.lesson_count}`,
              progress: progressPercent,
            });
          }
        }
      }
    } catch (error) {
      logger.error('Error loading home data:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    void loadHomeData();
  }, [loadHomeData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  }, [loadHomeData]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTime}>{getGreeting()}</Text>
          <Text style={styles.greetingName}>{displayName} 👋</Text>
        </View>
        <View style={styles.headerRight}>
          <StreakBadge size="sm" />
          <View style={styles.tierBadge}>
            {tier !== 'free' && <Crown size={12} color={colors.accent} />}
            <Text style={styles.tierText}>{tier.toUpperCase()}</Text>
          </View>
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
            colors={[colors.accent]}
          />
        }
      >
        {/* 1. CORE FEATURES - Hero Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionAccent, { backgroundColor: colors.accent }]} />
            <Text style={styles.sectionTitle}>Your Tools</Text>
          </View>

          {/* Dating Simulator - Hero Card */}
          <Pressable
            style={({ pressed }) => [
              styles.heroCard,
              pressed && { transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => {
              haptics.medium();
              router.push('/(simulator)');
            }}
            accessibilityRole="button"
            accessibilityLabel="Dating Simulator"
          >
            <LinearGradient
              colors={['rgba(233, 30, 99, 0.2)', 'rgba(233, 30, 99, 0.05)'] as const}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={[styles.heroIconContainer, { backgroundColor: 'rgba(233, 30, 99, 0.25)' }]}>
              <Gamepad2 size={32} color="#E91E63" />
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Dating Simulator</Text>
              <Text style={styles.heroDescription}>
                Practice spotting red flags in interactive scenarios
              </Text>
            </View>
            <View style={[styles.heroAction, { backgroundColor: 'rgba(233, 30, 99, 0.2)' }]}>
              <Play size={20} color="#E91E63" fill="#E91E63" />
            </View>
          </Pressable>

          {/* Power Plays - Hero Card */}
          <Pressable
            style={({ pressed }) => [
              styles.heroCard,
              { borderColor: 'rgba(30, 64, 175, 0.3)' },
              pressed && { transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => {
              haptics.medium();
              router.push('/(power)');
            }}
            accessibilityRole="button"
            accessibilityLabel="Power Plays"
          >
            <LinearGradient
              colors={['rgba(30, 64, 175, 0.2)', 'rgba(30, 64, 175, 0.05)'] as const}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={[styles.heroIconContainer, { backgroundColor: 'rgba(30, 64, 175, 0.25)' }]}>
              <Briefcase size={32} color="#1E40AF" />
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Power Plays</Text>
              <Text style={styles.heroDescription}>
                Master negotiations, interviews & office dynamics
              </Text>
            </View>
            <View style={[styles.heroAction, { backgroundColor: 'rgba(30, 64, 175, 0.2)' }]}>
              <Play size={20} color="#1E40AF" fill="#1E40AF" />
            </View>
          </Pressable>

          {/* 2x2 Grid: Kanika, Scanner, Quizzes, Courses */}
          <View style={styles.coreGrid}>
            {/* Pocket Kanika */}
            <Pressable
              style={({ pressed }) => [
                styles.coreCard,
                pressed && { transform: [{ scale: 0.96 }] }
              ]}
              onPress={() => {
                haptics.medium();
                router.push('/(advisor)');
              }}
              accessibilityRole="button"
              accessibilityLabel="Pocket Kanika"
            >
              <LinearGradient
                colors={['rgba(201, 169, 97, 0.15)', 'transparent'] as const}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={[styles.coreIconContainer, { backgroundColor: colors.accentMuted }]}>
                <MessageCircle size={26} color={colors.accent} />
              </View>
              <Text style={styles.coreTitle}>Pocket Kanika</Text>
              <Text style={styles.coreDescription}>AI Advisor</Text>
            </Pressable>

            {/* Scanner */}
            <Pressable
              style={({ pressed }) => [
                styles.coreCard,
                pressed && { transform: [{ scale: 0.96 }] }
              ]}
              onPress={() => {
                haptics.medium();
                router.push('/(tools)/manipulation-scanner');
              }}
              accessibilityRole="button"
              accessibilityLabel="Manipulation Scanner"
            >
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.15)', 'transparent'] as const}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={[styles.coreIconContainer, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Scan size={26} color="#8B5CF6" />
              </View>
              <Text style={styles.coreTitle}>Scanner</Text>
              <Text style={styles.coreDescription}>Detect Manipulation</Text>
            </Pressable>

            {/* Quizzes */}
            <Pressable
              style={({ pressed }) => [
                styles.coreCard,
                pressed && { transform: [{ scale: 0.96 }] }
              ]}
              onPress={() => {
                haptics.medium();
                router.push('/(quiz)');
              }}
              accessibilityRole="button"
              accessibilityLabel="Quizzes"
            >
              <LinearGradient
                colors={['rgba(255, 176, 32, 0.15)', 'transparent'] as const}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={[styles.coreIconContainer, { backgroundColor: 'rgba(255, 176, 32, 0.2)' }]}>
                <Target size={26} color={colors.warning} />
              </View>
              <Text style={styles.coreTitle}>Quizzes</Text>
              <Text style={styles.coreDescription}>Assessments</Text>
            </Pressable>

            {/* Courses */}
            <Pressable
              style={({ pressed }) => [
                styles.coreCard,
                pressed && { transform: [{ scale: 0.96 }] }
              ]}
              onPress={() => {
                haptics.medium();
                router.push('/(tabs)/learn');
              }}
              accessibilityRole="button"
              accessibilityLabel="Courses"
            >
              <LinearGradient
                colors={['rgba(76, 175, 80, 0.15)', 'transparent'] as const}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={[styles.coreIconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
                <BookOpen size={26} color={colors.success} />
              </View>
              <Text style={styles.coreTitle}>Courses</Text>
              <Text style={styles.coreDescription}>Learn More</Text>
            </Pressable>
          </View>
        </View>

        {/* 2. Continue Learning (if in progress) */}
        {inProgressCourse && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Continue Learning</Text>
            </View>
            <Card
              variant="glassGold"
              style={styles.progressCard}
              onPress={() => router.push(`/(course)/${inProgressCourse.id}`)}
            >
              <View style={styles.progressHeader}>
                <View style={styles.progressIconContainer}>
                  <BookOpen size={18} color={colors.accent} strokeWidth={2} />
                </View>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressTitle} numberOfLines={1}>{inProgressCourse.title}</Text>
                  <Text style={styles.progressLesson}>{inProgressCourse.lesson}</Text>
                </View>
                <ChevronRight size={18} color={colors.tertiary} />
              </View>
              <View style={styles.progressBarContainer}>
                <LinearGradient
                  colors={gradients.goldPrimary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBar, { width: `${inProgressCourse.progress}%` }]}
                />
              </View>
            </Card>
          </View>
        )}

        {/* 3. PROGRESS HUB: Stats + Daily Challenge */}
        <ProgressHub />

        {/* 4. Quick Access: Train */}
        <View style={styles.section}>
          <Pressable
            style={({ pressed }) => [
              styles.trainCard,
              pressed && { transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => {
              haptics.light();
              router.push('/(tabs)/train');
            }}
            accessibilityRole="button"
            accessibilityLabel="Weekly Training"
          >
            <View style={[styles.trainIcon, { backgroundColor: 'rgba(76, 175, 80, 0.15)' }]}>
              <Calendar size={22} color={colors.success} strokeWidth={2} />
            </View>
            <View style={styles.trainContent}>
              <Text style={styles.trainTitle}>Weekly Training</Text>
              <Text style={styles.trainDescription}>Complete daily missions</Text>
            </View>
            <ChevronRight size={18} color={colors.tertiary} />
          </Pressable>
        </View>

        {/* 5. UPGRADE PROMPT (free users only) */}
        {tier === 'free' && (
          <View style={styles.section}>
            <UpgradePromptCard variant="compact" />
          </View>
        )}

        {/* 6. DISCOVERY - Lower priority */}
        <CommunityHub />

        {/* 7. DAILY INSIGHT - De-emphasized at bottom */}
        {(() => {
          const insight = getTodaysInsight();
          return (
            <View style={styles.insightBanner}>
              <Text style={styles.insightLabel}>DAILY INSIGHT</Text>
              <Text style={styles.insightText}>
                "{insight.quote}"
              </Text>
              <Text style={styles.insightAuthor}>— {insight.author}</Text>
            </View>
          );
        })()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greetingContainer: {
    gap: 2,
  },
  greetingTime: {
    fontSize: typography.xs,
    color: colors.tertiary,
    fontWeight: typography.medium,
  },
  greetingName: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accentMuted,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  tierText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.md,
    gap: layout.sectionGap,
  },
  section: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionAccent: {
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: colors.tertiary,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  progressCard: {
    gap: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressInfo: {
    flex: 1,
    gap: 2,
  },
  progressTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  progressLesson: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  insightBanner: {
    marginHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.tertiary,
    gap: spacing.xs,
  },
  insightLabel: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.tertiary,
    letterSpacing: 1.5,
  },
  insightText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  insightAuthor: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  // Hero Card (Dating Simulator)
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(233, 30, 99, 0.3)',
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  heroIconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    flex: 1,
    marginLeft: spacing.md,
    gap: 4,
  },
  heroTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  heroDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  heroAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Core Features Grid
  coreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  coreCard: {
    width: '48.5%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  coreIconContainer: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  coreDescription: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  // Train Card
  trainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  trainIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trainContent: {
    flex: 1,
    marginLeft: spacing.md,
    gap: 2,
  },
  trainTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  trainDescription: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
});
