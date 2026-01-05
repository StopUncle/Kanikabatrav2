import { useState, useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import {
  Target,
  BookOpen,
  Award,
  CheckCircle,
  UserPlus,
  Star,
  Activity,
  ChevronRight,
  Users,
} from 'lucide-react-native';
import { Card } from '../ui/Card';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { activityService, ActivityFeedItem } from '../../services/activityService';
import { useAuthStore } from '../../stores/authStore';

type FeedFilter = 'all' | 'following';

const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string; strokeWidth?: number }>> = {
  target: Target,
  'book-open': BookOpen,
  award: Award,
  'check-circle': CheckCircle,
  'user-plus': UserPlus,
  star: Star,
  activity: Activity,
};

const ActivityItem = memo(function ActivityItem({ item, isNew }: { item: ActivityFeedItem; isNew?: boolean }) {
  const fadeAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;
  const slideAnim = useRef(new Animated.Value(isNew ? -20 : 0)).current;

  useEffect(() => {
    if (isNew) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isNew, fadeAnim, slideAnim]);

  const IconComponent = ICON_MAP[item.icon] || Activity;
  const firstName = item.user?.full_name?.split(' ')[0] || 'Someone';

  // Get color based on activity type
  const getActivityColor = () => {
    switch (item.type) {
      case 'quiz_completed':
        return colors.warning;
      case 'course_started':
        return colors.accent;
      case 'course_completed':
        return colors.success;
      case 'lesson_completed':
        return colors.accent;
      case 'user_joined':
        return colors.success;
      case 'badge_earned':
        return colors.warning;
      default:
        return colors.tertiary;
    }
  };

  const accentColor = getActivityColor();

  return (
    <Animated.View
      style={[
        styles.activityItem,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Avatar/Icon */}
      <View style={[styles.activityIcon, { backgroundColor: `${accentColor}20` }]}>
        <IconComponent size={16} color={accentColor} strokeWidth={2} />
      </View>

      {/* Content */}
      <View style={styles.activityContent}>
        <Text style={styles.activityText} numberOfLines={2}>
          <Text style={styles.activityName}>{firstName}</Text>
          {' '}
          {item.actionText.replace(`${firstName} `, '')}
        </Text>
        <Text style={styles.activityTime}>{item.timeAgo}</Text>
      </View>

      {/* Score badge for quizzes */}
      {item.type === 'quiz_completed' && item.metadata?.score != null && (
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>{String(item.metadata.score)}%</Text>
        </View>
      )}
    </Animated.View>
  );
});

interface ActivityFeedProps {
  limit?: number;
  showHeader?: boolean;
  showFilter?: boolean;
  onSeeAll?: () => void;
}

export function ActivityFeed({ limit = 5, showHeader = true, showFilter = true, onSeeAll }: ActivityFeedProps) {
  const { user } = useAuthStore();
  const currentUserId = user?.id;

  const [activities, setActivities] = useState<ActivityFeedItem[]>([]);
  const [newActivityIds, setNewActivityIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FeedFilter>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load activities for current filter
    const doLoad = async () => {
      setLoading(true);
      let data: ActivityFeedItem[];

      if (filter === 'following' && currentUserId) {
        data = await activityService.getFollowingActivity(currentUserId, limit);
      } else {
        data = await activityService.getRecentActivity(limit);
      }

      setActivities(data);
      setLoading(false);
    };

    doLoad();

    // Initialize cleanup function to prevent memory leaks
    let unsubscribe: (() => void) | undefined;
    const animationTimeouts: NodeJS.Timeout[] = [];

    // Subscribe to real-time updates (only for "all" filter)
    if (filter === 'all') {
      unsubscribe = activityService.subscribeToActivity((newActivity) => {
        setActivities((prev) => [newActivity, ...prev].slice(0, limit));
        setNewActivityIds((prev) => new Set(prev).add(newActivity.id));

        // Clear "new" status after animation
        const timeoutId = setTimeout(() => {
          setNewActivityIds((prev) => {
            const next = new Set(prev);
            next.delete(newActivity.id);
            return next;
          });
        }, 500);
        animationTimeouts.push(timeoutId);
      });
    }

    // Always return cleanup - call unsubscribe and clear timeouts
    return () => {
      unsubscribe?.();
      animationTimeouts.forEach(id => clearTimeout(id));
    };
  }, [limit, filter, currentUserId]);

  const handleFilterChange = (newFilter: FeedFilter) => {
    if (newFilter === filter) return;
    haptics.light();
    setFilter(newFilter);
  };

  if (activities.length === 0 && filter === 'all') {
    return null;
  }

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.title}>Community Activity</Text>
          </View>
          {onSeeAll && (
            <Pressable
              style={styles.seeAllButton}
              onPress={() => {
                haptics.light();
                onSeeAll();
              }}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={14} color={colors.accent} />
            </Pressable>
          )}
        </View>
      )}

      {/* Filter Toggle */}
      {showFilter && currentUserId && (
        <View style={styles.filterRow}>
          <Pressable
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => handleFilterChange('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All
            </Text>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === 'following' && styles.filterButtonActive]}
            onPress={() => handleFilterChange('following')}
          >
            <Users size={14} color={filter === 'following' ? colors.accent : colors.tertiary} />
            <Text style={[styles.filterText, filter === 'following' && styles.filterTextActive]}>
              Following
            </Text>
          </Pressable>
        </View>
      )}

      <Card variant="glass" style={styles.feedCard}>
        {activities.length > 0 ? (
          activities.map((item, index) => (
            <View key={item.id}>
              <ActivityItem
                item={item}
                isNew={newActivityIds.has(item.id)}
              />
              {index < activities.length - 1 && <View style={styles.divider} />}
            </View>
          ))
        ) : filter === 'following' ? (
          <View style={styles.emptyFollowing}>
            <Users size={24} color={colors.tertiary} />
            <Text style={styles.emptyText}>
              No activity from people you follow
            </Text>
            <Text style={styles.emptyHint}>
              Follow members to see their activity here
            </Text>
          </View>
        ) : null}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  liveText: {
    fontSize: 9,
    fontWeight: typography.bold,
    color: colors.success,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: typography.sm,
    color: colors.accent,
    fontWeight: typography.medium,
  },
  feedCard: {
    marginHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: 0,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
    gap: 2,
  },
  activityText: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 18,
  },
  activityName: {
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  activityTime: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  scoreBadge: {
    backgroundColor: colors.accentMuted,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  scoreText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
  },
  filterText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    fontWeight: typography.medium,
  },
  filterTextActive: {
    color: colors.accent,
  },
  emptyFollowing: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
  },
});
