import { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Target, BookOpen, Flame, Clock } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { logger } from '../../lib/logger';
import { useGamificationStore } from '../../stores/gamificationStore';
import { useAuthStore } from '../../stores/authStore';
import { activityService, ActivityFeedItem } from '../../services/activityService';

interface WeeklyStats {
  quizzesCompleted: number;
  lessonsCompleted: number;
  minutesLearned: number;
}

export function WeeklyProgress() {
  const { user } = useAuthStore();
  const { currentStreak } = useGamificationStore();
  const [stats, setStats] = useState<WeeklyStats>({
    quizzesCompleted: 0,
    lessonsCompleted: 0,
    minutesLearned: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeeklyStats();
  }, [user?.id]);

  const loadWeeklyStats = async () => {
    if (!user?.id) {
      // Demo stats
      setStats({
        quizzesCompleted: 2,
        lessonsCompleted: 5,
        minutesLearned: 45,
      });
      setLoading(false);
      return;
    }

    try {
      // Get activities from the past 7 days
      const activities = await activityService.getRecentActivity(50);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const thisWeek = activities.filter((a: ActivityFeedItem) =>
        a.user_id === user.id && new Date(a.created_at) >= weekAgo
      );

      const quizzesCompleted = thisWeek.filter((a: ActivityFeedItem) => a.type === 'quiz_completed').length;
      const lessonsCompleted = thisWeek.filter((a: ActivityFeedItem) => a.type === 'lesson_completed').length;

      // Estimate minutes (5 min per quiz, 10 min per lesson)
      const minutesLearned = (quizzesCompleted * 5) + (lessonsCompleted * 10);

      setStats({
        quizzesCompleted,
        lessonsCompleted,
        minutesLearned,
      });
    } catch (error) {
      logger.error('Error loading weekly stats:', error);
    }

    setLoading(false);
  };

  if (loading) {
    return null;
  }

  const hasActivity = stats.quizzesCompleted > 0 || stats.lessonsCompleted > 0 || currentStreak > 0;

  if (!hasActivity) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionTitle}>This Week</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.statsGrid}>
          {/* Streak */}
          <StatItem
            icon={<Flame size={20} color="#FF8C00" />}
            value={currentStreak}
            label="Day Streak"
            color="#FF8C00"
          />

          {/* Quizzes */}
          <StatItem
            icon={<Target size={20} color={colors.warning} />}
            value={stats.quizzesCompleted}
            label="Quizzes"
            color={colors.warning}
          />

          {/* Lessons */}
          <StatItem
            icon={<BookOpen size={20} color={colors.accent} />}
            value={stats.lessonsCompleted}
            label="Lessons"
            color={colors.accent}
          />

          {/* Time */}
          <StatItem
            icon={<Clock size={20} color="#2196F3" />}
            value={stats.minutesLearned}
            label="Minutes"
            color="#2196F3"
          />
        </View>

        {/* Progress message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            {getProgressMessage(stats, currentStreak)}
          </Text>
        </View>
      </Card>
    </View>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}

const StatItem = memo(function StatItem({ icon, value, label, color }: StatItemProps) {
  return (
    <View
      style={styles.statItem}
      accessible={true}
      accessibilityLabel={`${value} ${label}`}
      accessibilityRole="text"
    >
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
});

function getProgressMessage(stats: WeeklyStats, streak: number): string {
  const total = stats.quizzesCompleted + stats.lessonsCompleted;

  if (streak >= 7) {
    return "You're on fire! One week streak achieved!";
  }

  if (total >= 10) {
    return "Incredible progress this week! Keep it up!";
  }

  if (total >= 5) {
    return "Great momentum! You're building strong habits.";
  }

  if (total >= 1) {
    return "Good start! Try to complete one more activity today.";
  }

  if (streak >= 1) {
    return "Your streak is alive! Complete something to grow it.";
  }

  return "Start learning to begin your streak!";
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.accent,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  card: {
    gap: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  messageContainer: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  messageText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
});
