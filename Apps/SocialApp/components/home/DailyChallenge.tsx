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
  type LucideIcon,
} from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { challengeService, DailyChallenge as ChallengeType } from '../../services/challengeService';
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

export function DailyChallengeCard() {
  const [challenge, setChallenge] = useState<ChallengeType | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadChallenge();

    // Update time remaining every minute
    const interval = setInterval(updateTimeRemaining, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const loadChallenge = async () => {
    setLoading(true);
    const data = await challengeService.getTodaysChallenge();
    setChallenge(data);
    await updateTimeRemaining();
    setLoading(false);
  };

  const updateTimeRemaining = async () => {
    const time = await challengeService.getTimeRemaining();
    setTimeRemaining(time);
  };

  const handlePress = () => {
    if (!challenge) return;
    haptics.light();

    // Navigate based on challenge type
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

  if (loading || !challenge) {
    return null;
  }

  const Icon = iconMap[challenge.icon] || Target;
  const isCompleted = challenge.current >= challenge.target;
  const progress = challenge.current / challenge.target;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionAccent} />
        <Text style={styles.sectionTitle}>Daily Challenge</Text>
        <View style={styles.timeContainer}>
          <Clock size={12} color={colors.tertiary} />
          <Text style={styles.timeText}>{timeRemaining}</Text>
        </View>
      </View>

      <Pressable onPress={handlePress} disabled={isCompleted}>
        <Card style={StyleSheet.flatten([styles.card, isCompleted && styles.cardCompleted])}>
          <View style={styles.content}>
            <View style={[styles.iconContainer, { backgroundColor: isCompleted ? colors.success + '20' : colors.accent + '20' }]}>
              {isCompleted ? (
                <CheckCircle size={24} color={colors.success} />
              ) : (
                <Icon size={24} color={colors.accent} />
              )}
            </View>

            <View style={styles.info}>
              <Text style={styles.title}>{challenge.title}</Text>
              <Text style={styles.description}>{challenge.description}</Text>

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
                <Text style={styles.progressText}>
                  {challenge.current}/{challenge.target}
                </Text>
              </View>
            </View>

            {/* XP Reward */}
            <View style={styles.rewardContainer}>
              <Star size={14} color={isCompleted ? colors.success : colors.accent} fill={isCompleted ? colors.success : 'transparent'} />
              <Text style={[styles.rewardText, isCompleted && styles.rewardCompleted]}>
                +{challenge.xpReward} XP
              </Text>
            </View>
          </View>

          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed!</Text>
            </View>
          )}
        </Card>
      </Pressable>
    </View>
  );
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
    flex: 1,
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  card: {
    overflow: 'hidden',
  },
  cardCompleted: {
    borderColor: colors.success,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  description: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.secondary,
    minWidth: 30,
  },
  rewardContainer: {
    alignItems: 'center',
    gap: 2,
  },
  rewardText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  rewardCompleted: {
    color: colors.success,
  },
  completedBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.success,
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  completedText: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.background,
  },
});
