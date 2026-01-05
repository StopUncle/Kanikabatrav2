// Speech Bubble Component
// Floating dialog bubble that appears near the character
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  Easing,
  interpolate,
  cancelAnimation,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, typography, glass, emotionGlows, emotionColors } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { getCharacterTheme } from '../../lib/immersion';
import type { DialogLine, Character, EmotionType } from '../../content/simulator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUBBLE_MAX_WIDTH = SCREEN_WIDTH - spacing.lg * 2;

interface SpeechBubbleProps {
  line: DialogLine;
  characters: Character[];
  onComplete: () => void;
  onTap: () => void;
  isComplete: boolean;
}

export function SpeechBubble({
  line,
  characters,
  onComplete,
  onTap,
  isComplete,
}: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animation values
  const fadeIn = useSharedValue(0);
  const scaleIn = useSharedValue(0.9);
  const accentLineWidth = useSharedValue(0);

  const speaker = line.speakerId && characters?.length
    ? characters.find((c) => c.id === line.speakerId)
    : null;

  const isNarrator = !line.speakerId;
  const emotion: EmotionType = line.emotion || 'neutral';
  const emotionGlow = emotionGlows[emotion] ?? emotionGlows.neutral;
  const emotionColor = emotionColors[emotion] ?? emotionColors.neutral;

  // Use character theme color for speaker name/accent (if personality type set)
  const characterTheme = speaker?.personalityType
    ? getCharacterTheme(speaker.personalityType)
    : null;
  const speakerColor = characterTheme?.primary || emotionColor;

  // Typewriter effect + animations
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setDisplayedText('');
    setIsTyping(true);

    // Cancel any running animations to prevent glitches
    cancelAnimation(fadeIn);
    cancelAnimation(scaleIn);
    cancelAnimation(accentLineWidth);

    // Smooth transition: fade out briefly then animate in (prevents instant reset flash)
    fadeIn.value = withSequence(
      withTiming(0, { duration: 50 }),
      withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) })
    );
    scaleIn.value = withSequence(
      withTiming(0.95, { duration: 50 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );
    accentLineWidth.value = 0;

    // Accent line draws across
    if (speaker) {
      accentLineWidth.value = withDelay(
        100,
        withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) })
      );
    }

    const text = line.text;
    let currentIndex = 0;
    const typingSpeed = 20;

    intervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTyping(false);
        onComplete();
      }
    }, typingSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [line.text, fadeIn, scaleIn, accentLineWidth, onComplete, speaker]);

  const handleTap = () => {
    if (isTyping) {
      setDisplayedText(line.text);
      setIsTyping(false);
      onComplete();
    } else if (!isComplete) {
      haptics.light();
      onTap();
    }
  };

  // Animated styles
  const bubbleStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [
      { scale: scaleIn.value },
      { translateY: interpolate(fadeIn.value, [0, 1], [10, 0]) },
    ],
  }));

  const accentLineStyle = useAnimatedStyle(() => ({
    width: `${accentLineWidth.value * 100}%`,
    opacity: accentLineWidth.value,
  }));

  return (
    <Pressable onPress={handleTap} style={styles.container}>
      <Animated.View style={[styles.bubble, bubbleStyle]}>
        {/* Pointer pointing up to character */}
        <View style={styles.pointerContainer}>
          <View style={[styles.pointer, { borderBottomColor: 'rgba(20, 20, 20, 0.85)' }]} />
          <View style={[styles.pointerGlow, { backgroundColor: emotionGlow }]} />
        </View>

        {/* Glow behind bubble */}
        <View
          style={[styles.glowBehind, { backgroundColor: emotionGlow }]}
          pointerEvents="none"
        />

        {/* Speaker name with accent line - uses character theme color */}
        {speaker && (
          <View style={styles.speakerContainer}>
            <Text style={[styles.speakerName, { color: speakerColor }]}>
              {speaker.name}
            </Text>
            <Animated.View
              style={[styles.accentLine, accentLineStyle, { backgroundColor: speakerColor }]}
            />
          </View>
        )}

        {/* Dialog text */}
        <Text style={[styles.dialogText, isNarrator && styles.narratorText]}>
          {displayedText}
          {isTyping && <Text style={[styles.cursor, { color: emotionColor }]}>|</Text>}
        </Text>

        {/* Tap indicator */}
        {!isTyping && !isComplete && (
          <View style={styles.tapIndicator}>
            <Text style={styles.tapText}>Tap</Text>
            <View style={[styles.tapDot, { backgroundColor: emotionColor }]} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.md,
  },
  bubble: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    paddingTop: spacing.md + 8,
    maxWidth: BUBBLE_MAX_WIDTH,
    minWidth: 200,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 97, 0.3)',
    // Glow effect
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  pointerContainer: {
    position: 'absolute',
    top: -14,
    alignSelf: 'center',
    alignItems: 'center',
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  pointerGlow: {
    position: 'absolute',
    top: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    opacity: 0.3,
    transform: [{ scaleY: 0.5 }],
  },
  glowBehind: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: borderRadius.lg + 20,
    opacity: 0.15,
    transform: [{ scaleY: 0.6 }],
  },
  speakerContainer: {
    marginBottom: spacing.xs,
  },
  speakerName: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  accentLine: {
    height: 1.5,
    marginTop: spacing.xs / 2,
    borderRadius: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  dialogText: {
    fontSize: typography.sm,
    color: colors.primary,
    lineHeight: typography.sm * 1.5,
  },
  narratorText: {
    fontStyle: 'italic',
    color: colors.secondary,
  },
  cursor: {
    fontWeight: typography.bold,
  },
  tapIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  tapText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  tapDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0.7,
  },
});
