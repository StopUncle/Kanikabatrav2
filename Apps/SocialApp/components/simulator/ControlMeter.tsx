// ControlMeter Component - Visual bar showing who has power in the interaction
// Score from -100 (they control) to +100 (you control)
// Enhanced with tug-of-war visualization and character theme colors

import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import type { DynamicState } from '../../content/simulator/types';
import type { CharacterTheme } from '../../lib/immersion/characterThemes';

interface ControlMeterProps {
  score: number; // -100 to +100, 0 = balanced
  showLabel?: boolean;
  animated?: boolean;
  compact?: boolean;
  // Tug-of-war mode props
  tugOfWar?: boolean;
  characterTheme?: CharacterTheme;
  showDelta?: boolean;
  lastDelta?: number;
}

function getStateFromScore(score: number): DynamicState {
  if (score < -15) return 'chasing';
  if (score > 15) return 'being-chased';
  return 'balanced';
}

const STATE_CONFIG: Record<DynamicState, { label: string; color: string }> = {
  chasing: {
    label: "YOU'RE CHASING",
    color: colors.error,
  },
  balanced: {
    label: 'BALANCED',
    color: colors.accent,
  },
  'being-chased': {
    label: "THEY'RE CHASING",
    color: colors.success,
  },
};

export function ControlMeter({
  score,
  showLabel = true,
  animated = true,
  compact = false,
  tugOfWar = false,
  characterTheme,
  showDelta = false,
  lastDelta = 0,
}: ControlMeterProps) {
  const positionAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;

  // Pulse animation for extreme values
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Delta flash animation
  const deltaOpacity = useRef(new Animated.Value(0)).current;
  const deltaScale = useRef(new Animated.Value(0.5)).current;

  // Fill animations for tug-of-war mode
  const leftFillAnim = useRef(new Animated.Value(50)).current;
  const rightFillAnim = useRef(new Animated.Value(50)).current;

  // Convert score (-100 to +100) to position (0 to 100)
  const position = Math.max(0, Math.min(100, ((score + 100) / 200) * 100));
  const state = getStateFromScore(score);
  const config = STATE_CONFIG[state];

  // Track previous score for delta display
  const [displayDelta, setDisplayDelta] = useState<number | null>(null);

  // Get colors for tug-of-war mode
  const theirColor = characterTheme?.primary || colors.error;
  const yourColor = colors.accent; // Gold for player

  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(positionAnim, {
          toValue: position,
          damping: 12,
          stiffness: 120,
          useNativeDriver: false,
        }),
      ]).start();

      // Tug-of-war fill animations
      if (tugOfWar) {
        // Their side fills from left (0-50)
        const theirFill = Math.max(0, Math.min(50, 50 - position));
        // Your side fills from right (50-100)
        const yourFill = Math.max(0, Math.min(50, position - 50));

        Animated.parallel([
          Animated.spring(leftFillAnim, {
            toValue: theirFill,
            damping: 15,
            stiffness: 100,
            useNativeDriver: false,
          }),
          Animated.spring(rightFillAnim, {
            toValue: yourFill,
            damping: 15,
            stiffness: 100,
            useNativeDriver: false,
          }),
        ]).start();
      }

      // Pulse at extremes
      if (Math.abs(score) > 60) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.15,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else {
        pulseAnim.setValue(1);
      }
    } else {
      positionAnim.setValue(position);
      leftFillAnim.setValue(Math.max(0, 50 - position));
      rightFillAnim.setValue(Math.max(0, position - 50));
    }
  }, [animated, position, score, fadeAnim, positionAnim, tugOfWar, leftFillAnim, rightFillAnim, pulseAnim]);

  // Show delta flash when score changes significantly
  useEffect(() => {
    if (showDelta && lastDelta !== 0) {
      setDisplayDelta(lastDelta);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(deltaOpacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.delay(800),
          Animated.timing(deltaOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.spring(deltaScale, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.delay(800),
          Animated.timing(deltaScale, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setDisplayDelta(null);
      });
    }
  }, [lastDelta, showDelta, deltaOpacity, deltaScale]);

  if (compact) {
    return (
      <Animated.View style={[styles.compactContainer, { opacity: fadeAnim }]}>
        <View style={styles.compactBar}>
          <Animated.View
            style={[
              styles.compactIndicator,
              {
                backgroundColor: config.color,
                left: positionAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={[styles.compactScore, { color: config.color }]}>
          {score > 0 ? '+' : ''}{score}
        </Text>
      </Animated.View>
    );
  }

  // Tug-of-war mode render
  if (tugOfWar) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Labels with theme colors */}
        <View style={styles.labelRow}>
          <Text style={[styles.sideLabel, { color: theirColor }]}>THEM</Text>
          <Text style={[styles.sideLabel, { color: yourColor }]}>YOU</Text>
        </View>

        {/* Tug-of-war bar */}
        <Animated.View style={[styles.barContainer, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.tugBar}>
            {/* Their fill (from left) */}
            <Animated.View
              style={[
                styles.tugFillLeft,
                {
                  backgroundColor: theirColor,
                  width: leftFillAnim.interpolate({
                    inputRange: [0, 50],
                    outputRange: ['0%', '50%'],
                  }),
                },
              ]}
            />

            {/* Your fill (from right) */}
            <Animated.View
              style={[
                styles.tugFillRight,
                {
                  backgroundColor: yourColor,
                  width: rightFillAnim.interpolate({
                    inputRange: [0, 50],
                    outputRange: ['0%', '50%'],
                  }),
                },
              ]}
            />

            {/* Center divider */}
            <View style={styles.tugCenter} />
          </View>

          {/* Indicator */}
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: score < 0 ? theirColor : yourColor,
                left: positionAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          >
            <View style={[styles.indicatorGlow, { shadowColor: score < 0 ? theirColor : yourColor }]} />
          </Animated.View>
        </Animated.View>

        {/* Delta display */}
        {displayDelta !== null && (
          <Animated.View
            style={[
              styles.deltaContainer,
              {
                opacity: deltaOpacity,
                transform: [{ scale: deltaScale }],
              },
            ]}
          >
            <Text
              style={[
                styles.deltaText,
                { color: displayDelta > 0 ? yourColor : theirColor },
              ]}
            >
              {displayDelta > 0 ? '+' : ''}{displayDelta}
            </Text>
          </Animated.View>
        )}

        {/* State Label */}
        {showLabel && (
          <View style={styles.stateLabelContainer}>
            <Text style={[styles.stateLabel, { color: config.color }]}>
              {config.label}
            </Text>
            <Text style={[styles.scoreText, { color: config.color }]}>
              ({score > 0 ? '+' : ''}{score})
            </Text>
          </View>
        )}
      </Animated.View>
    );
  }

  // Standard mode render
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Labels */}
      <View style={styles.labelRow}>
        <Text style={styles.sideLabel}>THEM</Text>
        <Text style={styles.sideLabel}>YOU</Text>
      </View>

      {/* Bar Container */}
      <Animated.View style={[styles.barContainer, { transform: [{ scale: pulseAnim }] }]}>
        {/* Bar Background */}
        <View style={styles.bar}>
          {/* Left gradient (their control) */}
          <View style={[styles.barSection, styles.barLeft]} />
          {/* Center zone (balanced) */}
          <View style={[styles.barSection, styles.barCenter]} />
          {/* Right gradient (your control) */}
          <View style={[styles.barSection, styles.barRight]} />
        </View>

        {/* Indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: config.color,
              left: positionAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <View style={[styles.indicatorGlow, { shadowColor: config.color }]} />
        </Animated.View>

        {/* Center Mark */}
        <View style={styles.centerMark} />
      </Animated.View>

      {/* Delta display */}
      {displayDelta !== null && (
        <Animated.View
          style={[
            styles.deltaContainer,
            {
              opacity: deltaOpacity,
              transform: [{ scale: deltaScale }],
            },
          ]}
        >
          <Text
            style={[
              styles.deltaText,
              { color: displayDelta > 0 ? colors.success : colors.error },
            ]}
          >
            {displayDelta > 0 ? '+' : ''}{displayDelta}
          </Text>
        </Animated.View>
      )}

      {/* State Label */}
      {showLabel && (
        <View style={styles.stateLabelContainer}>
          <Text style={[styles.stateLabel, { color: config.color }]}>
            {config.label}
          </Text>
          <Text style={[styles.scoreText, { color: config.color }]}>
            ({score > 0 ? '+' : ''}{score})
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  sideLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 0.5,
  },
  barContainer: {
    height: 20,
    position: 'relative',
    justifyContent: 'center',
  },
  bar: {
    height: 6,
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
  },
  barSection: {
    flex: 1,
  },
  barLeft: {
    backgroundColor: 'rgba(229, 69, 69, 0.3)',
  },
  barCenter: {
    backgroundColor: 'rgba(201, 169, 97, 0.3)',
  },
  barRight: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
  },
  indicator: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8, // Center the indicator on the position
    top: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorGlow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  centerMark: {
    position: 'absolute',
    left: '50%',
    marginLeft: -1,
    width: 2,
    height: 12,
    backgroundColor: colors.tertiary,
    opacity: 0.5,
    top: 4,
  },
  stateLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  stateLabel: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    letterSpacing: 0.5,
  },
  scoreText: {
    fontSize: typography.xs,
    opacity: 0.8,
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  compactBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 2,
    position: 'relative',
  },
  compactIndicator: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: -5,
    top: -3,
  },
  compactScore: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    minWidth: 36,
    textAlign: 'right',
  },
  // Tug-of-war styles
  tugBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceElevated,
    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
  },
  tugFillLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    opacity: 0.6,
  },
  tugFillRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.6,
  },
  tugCenter: {
    position: 'absolute',
    left: '50%',
    marginLeft: -1,
    width: 2,
    height: '100%',
    backgroundColor: colors.tertiary,
    opacity: 0.8,
  },
  // Delta display styles
  deltaContainer: {
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -25,
    width: 50,
    alignItems: 'center',
  },
  deltaText: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

export default ControlMeter;
