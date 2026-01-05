// RelationshipDynamic Component - Investment tracker
// Shows the balance of investment between player and NPC

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { TrendingUp, TrendingDown, Scale, Heart, AlertCircle } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';

interface InvestmentState {
  yours: number;      // 0-100 how much you've invested
  theirs: number;     // 0-100 how much they've invested
}

interface RelationshipDynamicProps {
  investment: InvestmentState;
  showLabels?: boolean;
  compact?: boolean;
  animated?: boolean;
}

function getDynamicState(investment: InvestmentState): {
  state: 'you-chasing' | 'balanced' | 'they-chasing';
  label: string;
  color: string;
  icon: typeof Scale;
} {
  const diff = investment.yours - investment.theirs;

  if (diff > 20) {
    return {
      state: 'you-chasing',
      label: 'OVER-INVESTED',
      color: colors.error,
      icon: TrendingDown,
    };
  }
  if (diff < -20) {
    return {
      state: 'they-chasing',
      label: 'OPTIMAL POSITION',
      color: colors.success,
      icon: TrendingUp,
    };
  }
  return {
    state: 'balanced',
    label: 'BALANCED',
    color: colors.accent,
    icon: Scale,
  };
}

export function RelationshipDynamic({
  investment,
  showLabels = true,
  compact = false,
  animated = true,
}: RelationshipDynamicProps) {
  const yoursAnim = useRef(new Animated.Value(0)).current;
  const theirsAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;

  const dynamic = getDynamicState(investment);
  const DynamicIcon = dynamic.icon;

  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(yoursAnim, {
          toValue: investment.yours,
          damping: 15,
          stiffness: 80,
          useNativeDriver: false,
        }),
        Animated.spring(theirsAnim, {
          toValue: investment.theirs,
          damping: 15,
          stiffness: 80,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      yoursAnim.setValue(investment.yours);
      theirsAnim.setValue(investment.theirs);
    }
  }, [animated, investment.yours, investment.theirs, fadeAnim, yoursAnim, theirsAnim]);

  if (compact) {
    return (
      <Animated.View style={[styles.compactContainer, { opacity: fadeAnim }]}>
        <View style={styles.compactBars}>
          <View style={styles.compactBarWrapper}>
            <Text style={styles.compactLabel}>YOU</Text>
            <View style={styles.compactBarBg}>
              <Animated.View
                style={[
                  styles.compactBarFill,
                  styles.compactBarYours,
                  {
                    width: yoursAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.compactBarWrapper}>
            <Text style={styles.compactLabel}>THEM</Text>
            <View style={styles.compactBarBg}>
              <Animated.View
                style={[
                  styles.compactBarFill,
                  styles.compactBarTheirs,
                  {
                    width: theirsAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </View>
        </View>
        <View style={[styles.compactStatus, { backgroundColor: dynamic.color + '20' }]}>
          <DynamicIcon size={12} color={dynamic.color} />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Status header */}
      <View style={styles.statusRow}>
        <DynamicIcon size={16} color={dynamic.color} />
        <Text style={[styles.statusLabel, { color: dynamic.color }]}>
          {dynamic.label}
        </Text>
      </View>

      {/* Investment bars */}
      <View style={styles.barsContainer}>
        {/* Your investment */}
        <View style={styles.barRow}>
          <View style={styles.barLabelContainer}>
            <Heart size={12} color={colors.secondary} />
            <Text style={styles.barLabel}>YOUR INVESTMENT</Text>
          </View>
          <View style={styles.barWrapper}>
            <View style={styles.barBackground}>
              <Animated.View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: investment.yours > investment.theirs + 20
                      ? colors.error
                      : colors.secondary,
                    width: yoursAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.barValue}>{investment.yours}%</Text>
          </View>
        </View>

        {/* Their investment */}
        <View style={styles.barRow}>
          <View style={styles.barLabelContainer}>
            <Heart size={12} color={colors.accent} />
            <Text style={styles.barLabel}>THEIR INVESTMENT</Text>
          </View>
          <View style={styles.barWrapper}>
            <View style={styles.barBackground}>
              <Animated.View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: colors.accent,
                    width: theirsAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.barValue}>{investment.theirs}%</Text>
          </View>
        </View>
      </View>

      {/* Warning message for over-investment */}
      {showLabels && dynamic.state === 'you-chasing' && (
        <View style={styles.warningContainer}>
          <AlertCircle size={14} color={colors.error} />
          <Text style={styles.warningText}>
            You're investing more than they are. Pull back.
          </Text>
        </View>
      )}

      {/* Success message for optimal position */}
      {showLabels && dynamic.state === 'they-chasing' && (
        <View style={styles.successContainer}>
          <TrendingUp size={14} color={colors.success} />
          <Text style={styles.successText}>
            They're chasing. Maintain this position.
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

// Mini badge showing just the ratio
export function InvestmentRatioBadge({
  yours,
  theirs,
}: {
  yours: number;
  theirs: number;
}) {
  const dynamic = getDynamicState({ yours, theirs });
  const DynamicIcon = dynamic.icon;

  return (
    <View style={[styles.ratioBadge, { borderColor: dynamic.color }]}>
      <DynamicIcon size={12} color={dynamic.color} />
      <Text style={[styles.ratioText, { color: dynamic.color }]}>
        {yours}:{theirs}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...glass.light,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statusLabel: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    letterSpacing: 0.5,
  },
  barsContainer: {
    gap: spacing.md,
  },
  barRow: {
    gap: spacing.xs,
  },
  barLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  barLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 0.5,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  barValue: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.secondary,
    minWidth: 36,
    textAlign: 'right',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: 'rgba(229, 69, 69, 0.1)',
    borderRadius: borderRadius.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.error,
  },
  warningText: {
    flex: 1,
    fontSize: typography.xs,
    color: colors.error,
    lineHeight: typography.xs * 1.4,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: borderRadius.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.success,
  },
  successText: {
    flex: 1,
    fontSize: typography.xs,
    color: colors.success,
    lineHeight: typography.xs * 1.4,
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  compactBars: {
    flex: 1,
    gap: spacing.xs,
  },
  compactBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  compactLabel: {
    fontSize: 9,
    color: colors.tertiary,
    letterSpacing: 0.5,
    width: 30,
  },
  compactBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  compactBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  compactBarYours: {
    backgroundColor: colors.secondary,
  },
  compactBarTheirs: {
    backgroundColor: colors.accent,
  },
  compactStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Ratio badge
  ratioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  ratioText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
  },
});

export default RelationshipDynamic;
