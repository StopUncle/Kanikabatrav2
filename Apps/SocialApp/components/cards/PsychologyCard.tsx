// Psychology Card Component
// Trading card-style collectible from simulator scenarios

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
  interpolate,
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  HeartOff,
  Flag,
  RefreshCw,
  Anchor,
  Vault,
  DoorOpen,
  Briefcase,
  GitBranch,
  Users,
  Ghost,
  Crown,
  Lock,
  Shield,
  Eye,
  Zap,
  Scale,
  type LucideIcon,
} from 'lucide-react-native';
import { colors, spacing, typography } from '../../lib/theme';
import {
  type PsychologyCardDefinition,
  type EarnedCard,
  RARITY_CONFIG,
  THEME_COLORS,
} from '../../lib/psychologyCards';
import { haptics } from '../../lib/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PsychologyCardProps {
  card: PsychologyCardDefinition;
  earned?: boolean;
  earnedData?: EarnedCard;
  size?: 'small' | 'medium' | 'large';
  showStats?: boolean;
  onPress?: () => void;
  animated?: boolean;
}

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  HeartOff,
  Flag,
  RefreshCw,
  Anchor,
  Vault,
  DoorOpen,
  Briefcase,
  GitBranch,
  Users,
  Ghost,
  Crown,
  Shield,
  Eye,
  Zap,
  Scale,
};

// Theme icons for card background
const themeIconMap: Record<string, LucideIcon> = {
  defense: Shield,
  awareness: Eye,
  power: Zap,
  balance: Scale,
  mastery: Crown,
};

// Size configurations
const SIZE_CONFIG = {
  small: {
    width: 100,
    height: 140,
    iconSize: 28,
    nameFontSize: 10,
    padding: spacing.xs,
    statHeight: 3,
  },
  medium: {
    width: 140,
    height: 200,
    iconSize: 36,
    nameFontSize: 12,
    padding: spacing.sm,
    statHeight: 4,
  },
  large: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 1.0,
    iconSize: 56,
    nameFontSize: 16,
    padding: spacing.md,
    statHeight: 6,
  },
};

// Stat labels
const STAT_LABELS = {
  manipulation_resistance: 'MR',
  pattern_recognition: 'PR',
  emotional_armor: 'EA',
  strategic_thinking: 'ST',
};

const STAT_COLORS = {
  manipulation_resistance: '#E91E63',
  pattern_recognition: '#2196F3',
  emotional_armor: '#4CAF50',
  strategic_thinking: '#FF9800',
};

export function PsychologyCard({
  card,
  earned = false,
  earnedData,
  size = 'medium',
  showStats = true,
  onPress,
  animated = true,
}: PsychologyCardProps) {
  const config = SIZE_CONFIG[size];
  const rarityConfig = RARITY_CONFIG[card.rarity];
  const themeColors = THEME_COLORS[card.theme];
  const Icon = iconMap[card.iconName] || Shield;
  const ThemeIcon = themeIconMap[card.theme] || Shield;

  // Animation values
  const shimmer = useSharedValue(0);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    if (!animated || !earned) return;

    cancelAnimation(shimmer);
    cancelAnimation(glowPulse);

    // Shimmer animation for rare+ cards
    if (card.rarity !== 'common') {
      shimmer.value = withRepeat(
        withTiming(1, { duration: 3000, easing: Easing.linear }),
        -1,
        false
      );
    }

    // Glow pulse for epic/legendary
    if (card.rarity === 'epic' || card.rarity === 'legendary') {
      glowPulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }

    return () => {
      cancelAnimation(shimmer);
      cancelAnimation(glowPulse);
    };
  }, [animated, earned, card.rarity]);

  const shimmerStyle = useAnimatedStyle(() => {
    if (card.rarity === 'common' || !earned) return { opacity: 0 };

    const translateX = interpolate(
      shimmer.value,
      [0, 1],
      [-config.width, config.width * 2]
    );

    return {
      transform: [{ translateX }, { rotate: '25deg' }],
      opacity: 0.3,
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    if (card.rarity === 'common' || card.rarity === 'rare' || !earned) {
      return { shadowOpacity: 0 };
    }

    const opacity = interpolate(
      glowPulse.value,
      [0, 1],
      [rarityConfig.glowIntensity * 0.5, rarityConfig.glowIntensity]
    );

    return {
      shadowOpacity: opacity,
    };
  });

  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  const borderColors = earned
    ? rarityConfig.borderGradient
    : ['#2D3748', '#1A202C'];

  return (
    <Pressable onPress={handlePress} disabled={!onPress}>
      <Animated.View
        style={[
          styles.cardOuter,
          glowStyle,
          {
            width: config.width + 4,
            height: config.height + 4,
            borderRadius: 12,
            shadowColor: rarityConfig.glowColor,
            shadowRadius: 20,
          },
        ]}
      >
        <LinearGradient
          colors={borderColors as [string, string, ...string[]]}
          style={[styles.borderGradient, { borderRadius: 12 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View
            style={[
              styles.cardInner,
              {
                width: config.width,
                height: config.height,
                borderRadius: 10,
                padding: config.padding,
              },
            ]}
          >
            <LinearGradient
              colors={earned ? ['#1A1A1A', '#0D0D0D', '#050505'] : ['#15151A', '#0D0D10', '#080808']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />

            {/* Shimmer overlay */}
            {earned && card.rarity !== 'common' && (
              <Animated.View style={[styles.shimmer, shimmerStyle]}>
                <LinearGradient
                  colors={['transparent', 'rgba(255,255,255,0.15)', 'transparent']}
                  style={{ width: 40, height: config.height * 2 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            )}

            {/* Rarity badge */}
            <View style={[styles.rarityBadge, { backgroundColor: earned ? rarityConfig.labelColor + '20' : 'transparent' }]}>
              <Text
                style={[
                  styles.rarityText,
                  {
                    color: earned ? rarityConfig.labelColor : colors.tertiary,
                    fontSize: size === 'large' ? 10 : 8,
                  },
                ]}
              >
                {earned ? rarityConfig.badgeText : 'LOCKED'}
              </Text>
            </View>

            {/* Icon area */}
            <View style={styles.iconArea}>
              {earned ? (
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: themeColors.primary + '20',
                      width: config.iconSize * 1.6,
                      height: config.iconSize * 1.6,
                      borderRadius: config.iconSize * 0.8,
                    },
                  ]}
                >
                  <Icon size={config.iconSize} color={themeColors.primary} />
                </View>
              ) : (
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: colors.surfaceElevated,
                      width: config.iconSize * 1.6,
                      height: config.iconSize * 1.6,
                      borderRadius: config.iconSize * 0.8,
                    },
                  ]}
                >
                  <Lock size={config.iconSize * 0.7} color={colors.tertiary} />
                </View>
              )}
            </View>

            {/* Card name */}
            <Text
              style={[
                styles.cardName,
                {
                  fontSize: config.nameFontSize,
                  color: earned ? colors.primary : colors.tertiary,
                },
              ]}
              numberOfLines={size === 'small' ? 1 : 2}
            >
              {card.name}
            </Text>

            {/* Subtitle (medium/large only) */}
            {size !== 'small' && (
              <Text
                style={[
                  styles.subtitle,
                  { color: earned ? colors.secondary : colors.tertiary },
                ]}
                numberOfLines={1}
              >
                {card.subtitle}
              </Text>
            )}

            {/* Stats (large only or if showStats) */}
            {showStats && size === 'large' && earned && (
              <View style={styles.statsContainer}>
                {(Object.entries(STAT_LABELS) as [keyof typeof STAT_LABELS, string][]).map(
                  ([key, label]) => (
                    <View key={key} style={styles.statRow}>
                      <Text style={[styles.statLabel, { width: 24 }]}>{label}</Text>
                      <View style={styles.statBarBg}>
                        <View
                          style={[
                            styles.statBarFill,
                            {
                              width: `${card.stats[key] * 10}%`,
                              backgroundColor: STAT_COLORS[key],
                              height: config.statHeight,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.statValue}>{card.stats[key]}</Text>
                    </View>
                  )
                )}
              </View>
            )}

            {/* Flavor text (large only) */}
            {size === 'large' && earned && (
              <View style={styles.flavorContainer}>
                <Text style={styles.flavorText} numberOfLines={2}>
                  {card.flavorText}
                </Text>
              </View>
            )}

            {/* Perfect badge */}
            {earnedData?.isPerfect && size !== 'small' && (
              <View style={styles.perfectBadge}>
                <Text style={styles.perfectText}>PERFECT</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

// Grid of cards
interface CardGridProps {
  cards: Array<PsychologyCardDefinition & { earned: boolean; earnedData?: EarnedCard }>;
  columns?: number;
  onCardPress?: (card: PsychologyCardDefinition) => void;
}

export function CardGrid({ cards, columns = 3, onCardPress }: CardGridProps) {
  const cardWidth = (SCREEN_WIDTH - spacing.lg * 2 - spacing.sm * (columns - 1)) / columns;

  return (
    <View style={styles.grid}>
      {cards.map((card) => (
        <View key={card.id} style={{ marginBottom: spacing.sm, marginRight: spacing.sm }}>
          <PsychologyCard
            card={card}
            earned={card.earned}
            earnedData={card.earnedData}
            size="small"
            showStats={false}
            onPress={onCardPress ? () => onCardPress(card) : undefined}
          />
        </View>
      ))}
    </View>
  );
}

// Featured cards row
interface FeaturedCardsProps {
  cards: Array<PsychologyCardDefinition & { earned: boolean; earnedData?: EarnedCard }>;
  title?: string;
  onCardPress?: (card: PsychologyCardDefinition) => void;
}

export function FeaturedCards({
  cards,
  title = 'Psychology Cards',
  onCardPress,
}: FeaturedCardsProps) {
  const earnedCards = cards.filter((c) => c.earned);

  if (earnedCards.length === 0) {
    return null;
  }

  return (
    <View style={styles.featuredSection}>
      <Text style={styles.featuredTitle}>{title}</Text>
      <View style={styles.featuredRow}>
        {earnedCards.slice(0, 4).map((card) => (
          <View key={card.id} style={styles.featuredCard}>
            <PsychologyCard
              card={card}
              earned
              earnedData={card.earnedData}
              size="small"
              showStats={false}
              onPress={onCardPress ? () => onCardPress(card) : undefined}
            />
          </View>
        ))}
        {earnedCards.length > 4 && (
          <View style={styles.moreCards}>
            <Text style={styles.moreCardsText}>+{earnedCards.length - 4}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    shadowOffset: { width: 0, height: 0 },
  },
  borderGradient: {
    padding: 2,
  },
  cardInner: {
    overflow: 'hidden',
    alignItems: 'center',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
  rarityBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  rarityText: {
    fontWeight: typography.bold,
    letterSpacing: 1,
  },
  iconArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    fontWeight: typography.bold,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  subtitle: {
    fontSize: typography.xs,
    textAlign: 'center',
    marginTop: 2,
  },
  statsContainer: {
    width: '100%',
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: typography.semibold,
    color: colors.tertiary,
  },
  statBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  statBarFill: {
    borderRadius: 3,
  },
  statValue: {
    fontSize: 10,
    fontWeight: typography.bold,
    color: colors.secondary,
    width: 16,
    textAlign: 'right',
  },
  flavorContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
  },
  flavorText: {
    fontSize: typography.xs,
    fontStyle: 'italic',
    color: colors.tertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
  perfectBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.accent + '30',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  perfectText: {
    fontSize: 8,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 0.5,
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
  featuredCard: {
    marginRight: spacing.xs,
  },
  moreCards: {
    width: 60,
    height: 84,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  moreCardsText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.secondary,
  },
});
