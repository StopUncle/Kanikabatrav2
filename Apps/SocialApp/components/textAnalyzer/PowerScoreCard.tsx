// Power Score Card
// Dual gauge visualization showing power balance between you and them

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, User, TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius, gradients } from '../../lib/theme';
import { PowerScore, PowerBalance } from '../../content/powerDynamics/types';
import { getPowerBalanceColor } from '../../stores/textAnalysisStore';

interface PowerScoreCardProps {
  powerScore: PowerScore;
  animated?: boolean;
}

export function PowerScoreCard({ powerScore, animated = true }: PowerScoreCardProps) {
  const youAnim = useRef(new Animated.Value(0)).current;
  const themAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.spring(youAnim, {
          toValue: powerScore.you,
          useNativeDriver: false,
          tension: 40,
          friction: 8,
        }),
        Animated.spring(themAnim, {
          toValue: powerScore.them,
          useNativeDriver: false,
          tension: 40,
          friction: 8,
        }),
      ]).start();
    } else {
      youAnim.setValue(powerScore.you);
      themAnim.setValue(powerScore.them);
    }
  }, [powerScore.you, powerScore.them, animated]);

  const balanceColor = getPowerBalanceColor(powerScore.balance);
  const BalanceIcon = getBalanceIcon(powerScore.balance);

  return (
    <GlassCard variant="gold" glow style={styles.container}>
      <View style={styles.header}>
        <Crown size={20} color={colors.accent} />
        <Text style={styles.title}>Power Dynamic</Text>
      </View>

      <View style={styles.scoresContainer}>
        {/* Your Score */}
        <View style={styles.scoreColumn}>
          <View style={styles.scoreHeader}>
            <User size={16} color={colors.accent} />
            <Text style={styles.scoreLabel}>You</Text>
          </View>
          <AnimatedScore value={youAnim} maxValue={10} color={colors.accent} />
          <Text style={styles.scoreNumber}>{powerScore.you.toFixed(1)}</Text>
        </View>

        {/* VS Divider */}
        <View style={styles.divider}>
          <Text style={styles.vsText}>vs</Text>
        </View>

        {/* Their Score */}
        <View style={styles.scoreColumn}>
          <View style={styles.scoreHeader}>
            <User size={16} color={colors.secondary} />
            <Text style={styles.scoreLabel}>Them</Text>
          </View>
          <AnimatedScore value={themAnim} maxValue={10} color={colors.secondary} />
          <Text style={styles.scoreNumber}>{powerScore.them.toFixed(1)}</Text>
        </View>
      </View>

      {/* Balance Indicator */}
      <View style={[styles.balanceContainer, { borderColor: balanceColor }]}>
        <BalanceIcon size={18} color={balanceColor} />
        <Text style={[styles.balanceText, { color: balanceColor }]}>
          {powerScore.balanceLabel}
        </Text>
      </View>

      {/* Chase Ratio Bar */}
      <View style={styles.chaseContainer}>
        <Text style={styles.chaseLabel}>Chase Ratio</Text>
        <ChaseRatioBar ratio={powerScore.chaseRatio} />
        <View style={styles.chaseLabels}>
          <Text style={styles.chaseLabelText}>You chasing</Text>
          <Text style={styles.chaseLabelText}>They chasing</Text>
        </View>
      </View>
    </GlassCard>
  );
}

// Animated circular score indicator
function AnimatedScore({
  value,
  maxValue,
  color,
}: {
  value: Animated.Value;
  maxValue: number;
  color: string;
}) {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedStrokeDashoffset = value.interpolate({
    inputRange: [0, maxValue],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.gaugeContainer, { width: size, height: size }]}>
      {/* Background circle */}
      <View
        style={[
          styles.gaugeBackground,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: colors.border,
          },
        ]}
      />
      {/* Progress arc - simplified with View for RN */}
      <Animated.View
        style={[
          styles.gaugeProgress,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: color,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            transform: [
              {
                rotate: value.interpolate({
                  inputRange: [0, maxValue],
                  outputRange: ['0deg', '360deg'],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}

// Chase ratio bar
function ChaseRatioBar({ ratio }: { ratio: number }) {
  // ratio: -1 (you chasing) to 1 (they chasing), 0 = balanced
  const position = ((ratio + 1) / 2) * 100; // Convert to 0-100%

  return (
    <View style={styles.chaseBar}>
      <LinearGradient
        colors={['#EF4444', '#F59E0B', '#22C55E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.chaseGradient}
      />
      <View style={[styles.chaseIndicator, { left: `${position}%` }]}>
        <View style={styles.chaseIndicatorDot} />
      </View>
    </View>
  );
}

// Get icon based on balance
function getBalanceIcon(balance: PowerBalance) {
  switch (balance) {
    case 'strong':
      return TrendingUp;
    case 'weak':
    case 'submissive':
      return TrendingDown;
    default:
      return Minus;
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  scoreColumn: {
    alignItems: 'center',
    flex: 1,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  scoreLabel: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  scoreNumber: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  divider: {
    width: 40,
    alignItems: 'center',
  },
  vsText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    fontWeight: typography.medium,
  },
  gaugeContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugeBackground: {
    position: 'absolute',
  },
  gaugeProgress: {
    position: 'absolute',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  balanceText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  chaseContainer: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chaseLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  chaseBar: {
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.border,
    position: 'relative',
    overflow: 'visible',
  },
  chaseGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.full,
  },
  chaseIndicator: {
    position: 'absolute',
    top: -4,
    marginLeft: -8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chaseIndicatorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },
  chaseLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  chaseLabelText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
});
