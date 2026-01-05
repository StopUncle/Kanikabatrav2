// MoodIndicator Component - Shows NPC's current emotional state
// Surface emotion with optional hidden emotion reveal

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius, typography, emotionColors } from '../../lib/theme';
import type { EmotionType } from '../../content/simulator/types';

interface MoodIndicatorProps {
  surfaceMood: EmotionType;
  hiddenMood?: EmotionType;
  showHidden?: boolean;
  compact?: boolean;
}

const EMOTION_LABELS: Record<EmotionType, string> = {
  neutral: 'NEUTRAL',
  happy: 'HAPPY',
  angry: 'ANGRY',
  sad: 'SAD',
  seductive: 'CHARMING',
  cold: 'COLD',
  confused: 'CONFUSED',
  smirking: 'SMIRKING',
  concerned: 'CONCERNED',
  knowing: 'KNOWING',
  serious: 'SERIOUS',
  pleading: 'PLEADING',
  curious: 'CURIOUS',
  hopeful: 'HOPEFUL',
};

export function MoodIndicator({
  surfaceMood,
  hiddenMood,
  showHidden = false,
  compact = false,
}: MoodIndicatorProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const revealAnim = useRef(new Animated.Value(showHidden ? 1 : 0)).current;

  useEffect(() => {
    // Subtle pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  useEffect(() => {
    Animated.timing(revealAnim, {
      toValue: showHidden ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showHidden, revealAnim]);

  const surfaceColor = emotionColors[surfaceMood] || emotionColors.neutral;
  const hiddenColor = hiddenMood ? emotionColors[hiddenMood] : null;

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Animated.View
          style={[
            styles.compactDot,
            {
              backgroundColor: surfaceColor,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
        <Text style={[styles.compactLabel, { color: surfaceColor }]}>
          {EMOTION_LABELS[surfaceMood]}
        </Text>
        {showHidden && hiddenMood && hiddenColor && (
          <Animated.View style={{ opacity: revealAnim, flexDirection: 'row', alignItems: 'center', marginLeft: spacing.xs }}>
            <Text style={styles.compactHiddenArrow}> → </Text>
            <View style={[styles.compactDot, { backgroundColor: hiddenColor }]} />
          </Animated.View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Surface Mood */}
      <View style={styles.moodRow}>
        <Animated.View
          style={[
            styles.glowDot,
            {
              backgroundColor: surfaceColor,
              shadowColor: surfaceColor,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
        <View style={styles.moodInfo}>
          <Text style={styles.moodType}>SURFACE</Text>
          <Text style={[styles.moodLabel, { color: surfaceColor }]}>
            {EMOTION_LABELS[surfaceMood]}
          </Text>
        </View>
      </View>

      {/* Hidden Mood (if revealed) */}
      {hiddenMood && hiddenColor && (
        <Animated.View
          style={[
            styles.moodRow,
            styles.hiddenRow,
            { opacity: revealAnim },
          ]}
        >
          <View
            style={[
              styles.glowDot,
              styles.hiddenDot,
              { backgroundColor: hiddenColor },
            ]}
          />
          <View style={styles.moodInfo}>
            <Text style={[styles.moodType, styles.hiddenType]}>HIDDEN</Text>
            <Text style={[styles.moodLabel, { color: hiddenColor }]}>
              ({EMOTION_LABELS[hiddenMood]})
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  glowDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
  },
  moodInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  moodType: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 0.5,
  },
  moodLabel: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
  },
  hiddenRow: {
    marginTop: spacing.xs,
  },
  hiddenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
  },
  hiddenType: {
    fontStyle: 'italic',
    opacity: 0.8,
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  compactDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  compactLabel: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    letterSpacing: 0.5,
  },
  compactHiddenArrow: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
});

export default MoodIndicator;
