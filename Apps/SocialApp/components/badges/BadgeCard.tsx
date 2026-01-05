import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolate,
  cancelAnimation,
} from 'react-native-reanimated';
import {
  Target,
  Crosshair,
  Award,
  BookOpen,
  GraduationCap,
  Swords,
  Flame,
  Users,
  Star,
  Crown,
  Sparkles,
  Brain,
  Lock,
  type LucideIcon,
} from 'lucide-react-native';
import { colors, spacing, typography } from '../../lib/theme';
import { BadgeDefinition } from '../../lib/badges';
import { haptics } from '../../lib/haptics';

interface BadgeCardProps {
  badge: BadgeDefinition & { earned: boolean; earnedAt?: string };
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  showDescription?: boolean;
}

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Target,
  Crosshair,
  Award,
  BookOpen,
  GraduationCap,
  Swords,
  Flame,
  Users,
  Star,
  Crown,
  Sparkles,
  Brain,
};

export function BadgeCard({ badge, size = 'md', onPress, showDescription = true }: BadgeCardProps) {
  const Icon = iconMap[badge.icon] || Award;
  const isLocked = !badge.earned;

  const sizeConfig = {
    sm: { iconSize: 24, containerSize: 48, fontSize: typography.xs },
    md: { iconSize: 32, containerSize: 64, fontSize: typography.sm },
    lg: { iconSize: 40, containerSize: 80, fontSize: typography.md },
  };

  const config = sizeConfig[size];

  // Animation values for earned badges
  const glowPulse = useSharedValue(0);
  const shimmer = useSharedValue(0);

  useEffect(() => {
    if (!isLocked) {
      // Subtle glow pulse for earned badges
      glowPulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      // Occasional shimmer effect
      shimmer.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 4000 }),
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        false
      );
    }

    return () => {
      cancelAnimation(glowPulse);
      cancelAnimation(shimmer);
    };
  }, [isLocked]);

  const glowStyle = useAnimatedStyle(() => {
    if (isLocked) return {};

    const opacity = interpolate(glowPulse.value, [0, 1], [0.3, 0.6]);
    return {
      shadowOpacity: opacity,
    };
  });

  const shimmerStyle = useAnimatedStyle(() => {
    if (isLocked) return { opacity: 0 };

    return {
      opacity: shimmer.value * 0.4,
    };
  });

  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  return (
    <Pressable
      style={[styles.container, size === 'sm' && styles.containerSm]}
      onPress={handlePress}
      disabled={!onPress}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          glowStyle,
          {
            width: config.containerSize,
            height: config.containerSize,
            borderRadius: config.containerSize / 2,
            backgroundColor: isLocked ? colors.surfaceElevated : badge.color + '20',
            borderColor: isLocked ? colors.border : badge.color,
            shadowColor: badge.color,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 12,
          },
        ]}
      >
        {/* Shimmer overlay for earned badges */}
        {!isLocked && (
          <Animated.View
            style={[
              styles.shimmerOverlay,
              shimmerStyle,
              {
                width: config.containerSize,
                height: config.containerSize,
                borderRadius: config.containerSize / 2,
                backgroundColor: 'white',
              },
            ]}
          />
        )}
        {isLocked ? (
          <Lock size={config.iconSize * 0.6} color={colors.tertiary} />
        ) : (
          <Icon size={config.iconSize} color={badge.color} />
        )}
      </Animated.View>

      <Text
        style={[
          styles.name,
          { fontSize: config.fontSize },
          isLocked && styles.nameLocked,
        ]}
        numberOfLines={2}
      >
        {badge.name}
      </Text>

      {showDescription && size !== 'sm' && (
        <Text style={[styles.description, isLocked && styles.descriptionLocked]} numberOfLines={2}>
          {badge.description}
        </Text>
      )}

      {badge.earned && badge.earnedAt && size === 'lg' && (
        <Text style={styles.earnedDate}>
          Earned {formatDate(badge.earnedAt)}
        </Text>
      )}
    </Pressable>
  );
}

// Grid of badges
interface BadgeGridProps {
  badges: Array<BadgeDefinition & { earned: boolean; earnedAt?: string }>;
  columns?: number;
  onBadgePress?: (badge: BadgeDefinition) => void;
}

export function BadgeGrid({ badges, columns = 4, onBadgePress }: BadgeGridProps) {
  return (
    <View style={styles.grid}>
      {badges.map(badge => (
        <View key={badge.id} style={{ width: `${100 / columns}%`, padding: spacing.xs }}>
          <BadgeCard
            badge={badge}
            size="sm"
            onPress={onBadgePress ? () => onBadgePress(badge) : undefined}
            showDescription={false}
          />
        </View>
      ))}
    </View>
  );
}

// Featured badge row (horizontal scroll)
interface FeaturedBadgesProps {
  badges: Array<BadgeDefinition & { earned: boolean }>;
  title?: string;
}

export function FeaturedBadges({ badges, title = 'Your Badges' }: FeaturedBadgesProps) {
  const earnedBadges = badges.filter(b => b.earned);

  if (earnedBadges.length === 0) {
    return null;
  }

  return (
    <View style={styles.featuredSection}>
      <Text style={styles.featuredTitle}>{title}</Text>
      <View style={styles.featuredRow}>
        {earnedBadges.slice(0, 5).map(badge => (
          <View key={badge.id} style={styles.featuredBadge}>
            <BadgeCard badge={{ ...badge, earnedAt: undefined }} size="sm" showDescription={false} />
          </View>
        ))}
        {earnedBadges.length > 5 && (
          <View style={styles.moreBadges}>
            <Text style={styles.moreBadgesText}>+{earnedBadges.length - 5}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
  },
  containerSm: {
    padding: spacing.xs,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
  },
  name: {
    fontWeight: typography.semibold,
    color: colors.primary,
    textAlign: 'center',
  },
  nameLocked: {
    color: colors.tertiary,
  },
  description: {
    fontSize: typography.xs,
    color: colors.secondary,
    textAlign: 'center',
  },
  descriptionLocked: {
    color: colors.tertiary,
  },
  earnedDate: {
    fontSize: typography.xs,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featuredSection: {
    gap: spacing.sm,
  },
  featuredTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    paddingHorizontal: spacing.xs,
  },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredBadge: {
    marginRight: spacing.xs,
  },
  moreBadges: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  moreBadgesText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.secondary,
  },
});
