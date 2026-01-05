import { useState, useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { router } from 'expo-router';
import {
  Target,
  BookOpen,
  Award,
  CheckCircle,
  UserPlus,
  Star,
  Activity,
  ChevronRight,
  MessageCircle,
} from 'lucide-react-native';
import { Card } from '../ui/Card';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius, layout } from '../../lib/theme';
import { activityService, ActivityFeedItem } from '../../services/activityService';

const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string; strokeWidth?: number }>> = {
  target: Target,
  'book-open': BookOpen,
  award: Award,
  'check-circle': CheckCircle,
  'user-plus': UserPlus,
  star: Star,
  activity: Activity,
};

const CompactActivityItem = memo(function CompactActivityItem({ item }: { item: ActivityFeedItem }) {
  const IconComponent = ICON_MAP[item.icon] || Activity;
  const firstName = item.user?.full_name?.split(' ')[0] || 'Someone';

  const getActivityColor = () => {
    switch (item.type) {
      case 'quiz_completed':
        return colors.warning;
      case 'course_started':
      case 'lesson_completed':
        return colors.success;
      case 'course_completed':
        return colors.success;
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
    <View style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: `${accentColor}15` }]}>
        <IconComponent size={14} color={accentColor} strokeWidth={2} />
      </View>
      <Text style={styles.activityText} numberOfLines={1} ellipsizeMode="tail">
        <Text style={styles.activityName}>{firstName}</Text>
        {' '}
        {item.actionText.replace(`${firstName} `, '')}
      </Text>
      <Text style={styles.activityTime}>{item.timeAgo}</Text>
    </View>
  );
});

interface CommunityHubProps {
  onlineCount?: number;
}

export function CommunityHub({ onlineCount = 42 }: CommunityHubProps) {
  const [activities, setActivities] = useState<ActivityFeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Pulsing LIVE dot
  const livePulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadActivities();

    // Animate LIVE pulse - store reference for cleanup
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(livePulse, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(livePulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Subscribe to real-time updates
    const unsubscribe = activityService.subscribeToActivity((newActivity) => {
      setActivities((prev) => [newActivity, ...prev].slice(0, 3));
    });

    return () => {
      pulseAnimation.stop(); // Stop animation on unmount
      unsubscribe();
    };
  }, [livePulse]);

  const loadActivities = async () => {
    setLoading(true);
    const data = await activityService.getRecentActivity(3);
    setActivities(data);
    setLoading(false);
  };

  const handleJoinPress = () => {
    haptics.medium();
    router.push('/(tabs)/community');
  };

  if (loading && activities.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.liveIndicator}>
          <Animated.View
            style={[styles.liveDot, { transform: [{ scale: livePulse }] }]}
          />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <Text style={styles.title}>Community</Text>
        <View style={styles.onlineCount}>
          <MessageCircle size={12} color={colors.secondary} />
          <Text style={styles.onlineText}>{onlineCount} online</Text>
        </View>
      </View>

      <Card variant="glass" style={styles.card}>
        {/* Compact Activity List */}
        {activities.length > 0 ? (
          <View style={styles.activitiesList}>
            {activities.map((item, index) => (
              <View key={item.id}>
                <CompactActivityItem item={item} />
                {index < activities.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Be the first to join today!</Text>
          </View>
        )}

        {/* Join Button */}
        <Pressable
          style={({ pressed }) => [
            styles.joinButton,
            pressed && styles.joinButtonPressed,
          ]}
          onPress={handleJoinPress}
        >
          <Text style={styles.joinText}>Join the Conversation</Text>
          <ChevronRight size={16} color={colors.accent} />
        </Pressable>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: layout.screenPadding,
    gap: layout.internalGap,
  },
  header: {
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
    flex: 1,
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  onlineCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  activitiesList: {
    paddingVertical: spacing.xs,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  activityIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.secondary,
  },
  activityName: {
    color: colors.primary,
    fontWeight: typography.semibold,
  },
  activityTime: {
    fontSize: 10,
    color: colors.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  emptyState: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surfaceElevated,
  },
  joinButtonPressed: {
    opacity: 0.8,
  },
  joinText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
});
