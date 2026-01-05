// InnerVoiceBubble Component - Distinct styling for player's gut reactions
// Visually different from character speech

import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import type { InnerVoiceEmotion } from '../../content/simulator/types';

interface InnerVoiceBubbleProps {
  text: string;
  emotion?: InnerVoiceEmotion;
  typewriter?: boolean;
  typewriterSpeed?: number;
  onComplete?: () => void;
}

const EMOTION_COLORS: Record<InnerVoiceEmotion, { text: string; border: string; bg: string }> = {
  neutral: {
    text: colors.secondary,
    border: 'rgba(168, 168, 168, 0.3)',
    bg: 'rgba(30, 30, 30, 0.6)',
  },
  warning: {
    text: colors.warning,
    border: 'rgba(255, 176, 32, 0.3)',
    bg: 'rgba(255, 176, 32, 0.1)',
  },
  insight: {
    text: colors.accent,
    border: 'rgba(201, 169, 97, 0.3)',
    bg: 'rgba(201, 169, 97, 0.1)',
  },
  cold: {
    text: '#607D8B',
    border: 'rgba(96, 125, 139, 0.3)',
    bg: 'rgba(96, 125, 139, 0.1)',
  },
};

export function InnerVoiceBubble({
  text,
  emotion = 'neutral',
  typewriter = false,
  typewriterSpeed = 30,
  onComplete,
}: InnerVoiceBubbleProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [displayedText, setDisplayedText] = useState(typewriter ? '' : text);
  const emotionStyle = EMOTION_COLORS[emotion];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (!typewriter) {
      setDisplayedText(text);
      onComplete?.();
      return;
    }

    setDisplayedText('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, typewriterSpeed);

    return () => clearInterval(interval);
  }, [text, typewriter, typewriterSpeed, onComplete]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          backgroundColor: emotionStyle.bg,
          borderColor: emotionStyle.border,
        },
      ]}
    >
      {/* Thought indicator */}
      <View style={styles.thoughtIndicator}>
        <View style={[styles.dot, styles.dotSmall, { backgroundColor: emotionStyle.text }]} />
        <View style={[styles.dot, styles.dotMedium, { backgroundColor: emotionStyle.text }]} />
      </View>

      {/* Text content */}
      <Text style={[styles.text, { color: emotionStyle.text }]}>
        {displayedText}
        {typewriter && displayedText.length < text.length && (
          <Text style={styles.cursor}>|</Text>
        )}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    position: 'relative',
  },
  thoughtIndicator: {
    position: 'absolute',
    left: spacing.md,
    top: -12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  dot: {
    borderRadius: 999,
    opacity: 0.6,
  },
  dotSmall: {
    width: 6,
    height: 6,
  },
  dotMedium: {
    width: 10,
    height: 10,
  },
  text: {
    fontSize: typography.sm,
    fontStyle: 'italic',
    lineHeight: typography.sm * 1.5,
  },
  cursor: {
    opacity: 0.5,
  },
});

export default InnerVoiceBubble;
