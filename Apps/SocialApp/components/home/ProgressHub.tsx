import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import {
  Target,
  BookOpen,
  MessageCircle,
  UserPlus,
  Brain,
  Clock,
  CheckCircle,
  Star,
  Flame,
  type LucideIcon,
} from 'lucide-react-native';
import { colors, spacing, typography, borderRadius, layout } from '../../lib/theme';
import { logger } from '../../lib/logger';
import { challengeService, DailyChallenge as ChallengeType } from '../../services/challengeService';
import { useGamificationStore } from '../../stores/gamificationStore';
import { useAuthStore } from '../../stores/authStore';
import { activityService, ActivityFeedItem } from '../../services/activityService';
import { haptics } from '../../lib/haptics';
import { router } from 'expo-router';

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Target,
  BookOpen,
  MessageCircle,
  UserPlus,
  Brain,
};

interface WeeklyStats {
  quizzesCompleted: number;
  lessonsCompleted: number;
  minutesLearned: number;
}

export function ProgressHub() {
  const { user } = useAuthStore();
  const { currentStreak } = useGamificationStore();
  const [stats, setStats] = useState<WeeklyStats>({
    quizzesCompleted: 0,
    lessonsCompleted: 0,
    minutesLearned: 0,
  });
  const [challenge, setChallenge] = useState<ChallengeType | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadData();
    const interval = setInterval(updateTimeRemaining, 60000);
    return () => clearInterval(interval);
  }, [user?.id]);

  useEffect(() => {
    if (challenge) {
      const progress = challenge.current / challenge.target;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [challenge?.current]);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadWeeklyStats(), loadChallenge()]);
    setLoading(false);
  };

  const loadWeeklyStats = async () => {
    if (!user?.id) {
      setStats({ quizzesCompleted: 2, lessonsCompleted: 5, minutesLearned: 45 });
      return;
    }

    try {
      const activities = await activityService.getRecentActivity(50);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const thisWeek = activities.filter((a: ActivityFeedItem) =>
        a.user_id === user.id && new Date(a.created_at) >= weekAgo
      );

      const quizzesCompleted = thisWeek.filter((a: ActivityFeedItem) => a.type === 'quiz_completed').length;
      const lessonsCompleted = thisWeek.filter((a: ActivityFeedItem) => a.type === 'lesson_completed').length;
      const minutesLearned = (quizzesCompleted * 5) + (lessonsCompleted * 10);

      setStats({ quizzesCompleted, lessonsCompleted, minutesLearned });
    } catch (error) {
      logger.error('Error loading weekly stats:', error);
    }
  };

  const loadChallenge = async () => {
    const data = await challengeService.getTodaysChallenge();
    setChallenge(data);
    await updateTimeRemaining();
  };

  const updateTimeRemaining = async () => {
    const time = await challengeService.getTimeRemaining();
    setTimeRemaining(time);
  };

  const handleChallengePress = () => {
    if (!challenge) return;
    haptics.light();

    switch (challenge.type) {
      case 'quiz':
        router.push('/(quiz)');
        break;
      case 'lesson':
        router.push('/(tabs)/learn');
        break;
      case 'message':
        router.push('/(tabs)/community');
        break;
      case 'follow':
        router.push('/(discover)');
        break;
    }
  };

  if (loading) return null;

  const hasActivity = stats.quizzesCompleted > 0 || stats.lessonsCompleted > 0 || currentStreak > 0 || challenge;
  if (!hasActivity) return null;

  const Icon = challenge ? (iconMap[challenge.icon] || Target) : Target;
  const isCompleted = challenge ? challenge.current >= challenge.target : false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>This Week</Text>
        {timeRemaining && (
          <View style={styles.timeContainer}>
            <Clock size={12} color={colors.tertiary} />
            <Text style={styles.timeText}>Resets {timeRemaining}</Text>
          </View>
        )}
      </View>

      {/* Stats Grid - 2x2 */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: 'rgba(255, 140, 0, 0.08)' }]}>
          <View style={[styles.statIconWrap, { backgroundColor: 'rgba(255, 140, 0, 0.15)' }]}>
            <Flame size={20} color="#FF8C00" />
          </View>
          <Text style={styles.statValue}>{currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: 'rgba(255, 176, 32, 0.08)' }]}>
          <View style={[styles.statIconWrap, { backgroundColor: 'rgba(255, 176, 32, 0.15)' }]}>
            <Target size={20} color={colors.warning} />
          </View>
          <Text style={styles.statValue}>{stats.quizzesCompleted}</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: 'rgba(76, 175, 80, 0.08)' }]}>
          <View style={[styles.statIconWrap, { backgroundColor: 'rgba(76, 175, 80, 0.15)' }]}>
            <BookOpen size={20} color={colors.success} />
          </View>
          <Text style={styles.statValue}>{stats.lessonsCompleted}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: 'rgba(33, 150, 243, 0.08)' }]}>
          <View style={[styles.statIconWrap, { backgroundColor: 'rgba(33, 150, 243, 0.15)' }]}>
            <Clock size={20} color="#2196F3" />
          </View>
          <Text style={styles.statValue}>{stats.minutesLearned}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
      </View>

      {/* Daily Challenge Card */}
      {challenge && (
        <Pressable
          onPress={handleChallengePress}
          disabled={isCompleted}
          style={({ pressed }) => [
            styles.challengeCard,
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
          ]}
        >
          <View style={styles.challengeTop}>
            <View style={[styles.challengeIcon, { backgroundColor: isCompleted ? 'rgba(76, 175, 80, 0.15)' : 'rgba(201, 169, 97, 0.15)' }]}>
              {isCompleted ? (
                <CheckCircle size={22} color={colors.success} />
              ) : (
                <Icon size={22} color={colors.accent} />
              )}
            </View>

            <View style={styles.challengeInfo}>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeLabel}>Daily Challenge</Text>
                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <CheckCircle size={10} color={colors.background} />
                    <Text style={styles.completedText}>Complete</Text>
                  </View>
                )}
              </View>
              <Text style={styles.challengeTitle} numberOfLines={1}>{challenge.title}</Text>
            </View>

            <View style={[styles.rewardBadge, isCompleted && { backgroundColor: 'rgba(76, 175, 80, 0.15)' }]}>
              <Star size={14} color={isCompleted ? colors.success : colors.accent} fill={isCompleted ? colors.success : 'transparent'} />
              <Text style={[styles.rewardText, isCompleted && { color: colors.success }]}>+{challenge.xpReward} XP</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: isCompleted ? colors.success : colors.accent,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{challenge.current}/{challenge.target}</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius.full,
  },
  timeText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  // Stats Grid - 2x2
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    width: '48%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  // Challenge Card
  challengeCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  challengeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeInfo: {
    flex: 1,
    gap: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  challengeLabel: {
    fontSize: 10,
    fontWeight: typography.semibold,
    color: colors.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  challengeTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.secondary,
    minWidth: 32,
    textAlign: 'right',
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.accentMuted,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: borderRadius.full,
  },
  rewardText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.success,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: borderRadius.full,
  },
  completedText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.background,
  },
});
