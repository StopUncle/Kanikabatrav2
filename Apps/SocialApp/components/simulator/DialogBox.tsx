// Dialog Box Component with Typewriter Effect
// Enhanced with scene dimming, gold accents, and emotion glow
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, typography, glass, emotionGlows, emotionColors } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import type { DialogLine, Character, EmotionType } from '../../content/simulator';

interface DialogBoxProps {
  line: DialogLine;
  characters: Character[];
  onComplete: () => void;
  onTap: () => void;
  isComplete: boolean;
}

export function DialogBox({
  line,
  characters,
  onComplete,
  onTap,
  isComplete,
}: DialogBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep ref in sync with prop without causing effect reruns
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Animation values
  const fadeIn = useSharedValue(0);
  const dimOverlay = useSharedValue(0);
  const accentLineWidth = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  const speaker = line.speakerId && characters?.length
    ? characters.find((c) => c.id === line.speakerId)
    : null;

  const isNarrator = !line.speakerId;
  const emotion: EmotionType = line.emotion || 'neutral';
  const emotionGlow = emotionGlows[emotion] ?? emotionGlows.neutral;
  const emotionColor = emotionColors[emotion] ?? emotionColors.neutral;

  // Typewriter effect + animations
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setDisplayedText('');
    setIsTyping(true);

    // Reset and animate in
    fadeIn.value = 0;
    dimOverlay.value = 0;
    accentLineWidth.value = 0;
    glowOpacity.value = 0;

    // Staggered entrance
    fadeIn.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) });
    dimOverlay.value = withTiming(0.3, { duration: 300 });
    glowOpacity.value = withDelay(100, withTiming(0.6, { duration: 400 }));

    // Gold accent line draws across
    if (speaker) {
      accentLineWidth.value = withDelay(
        150,
        withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })
      );
    }

    const text = line.text;
    let currentIndex = 0;
    const typingSpeed = 20; // ms per character (faster)

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
        onCompleteRef.current();
      }
    }, typingSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [line.text, fadeIn, dimOverlay, accentLineWidth, glowOpacity, speaker]);

  const handleTap = () => {
    if (isTyping) {
      // Skip to full text - clear interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayedText(line.text);
      setIsTyping(false);
      onCompleteRef.current();
    } else if (!isComplete) {
      haptics.light();
      onTap();
    }
  };

  // Animated styles
  const dimStyle = useAnimatedStyle(() => ({
    opacity: dimOverlay.value,
  }));

  const boxStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [
      { translateY: interpolate(fadeIn.value, [0, 1], [20, 0]) },
    ],
  }));

  const accentLineStyle = useAnimatedStyle(() => ({
    width: `${accentLineWidth.value * 100}%`,
    opacity: accentLineWidth.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Pressable onPress={handleTap} style={styles.container}>
      {/* Scene dim overlay */}
      <Animated.View style={[styles.dimOverlay, dimStyle]} pointerEvents="none" />

      {/* Emotion glow behind box */}
      <Animated.View
        style={[
          styles.emotionGlow,
          glowStyle,
          { backgroundColor: emotionGlow },
        ]}
        pointerEvents="none"
      />

      <Animated.View style={[styles.box, boxStyle]}>
        {/* Speech bubble pointer - connects dialog to character */}
        {speaker && (
          <View style={styles.pointerContainer}>
            <View style={[styles.pointer, { borderBottomColor: 'rgba(20, 20, 20, 0.85)' }]} />
            <View style={[styles.pointerGlow, { backgroundColor: emotionGlow }]} />
          </View>
        )}

        {/* Speaker name with gold accent line */}
        {speaker && (
          <View style={styles.speakerContainer}>
            <View style={styles.speakerRow}>
              <Text style={styles.speakerName}>{speaker.name}</Text>
            </View>
            {/* Animated gold accent line */}
            <Animated.View style={[styles.accentLine, accentLineStyle]} />
          </View>
        )}

        {/* Dialog text */}
        <Text style={[styles.dialogText, isNarrator && styles.narratorText]}>
          {displayedText}
          {isTyping && <Text style={styles.cursor}>|</Text>}
        </Text>

        {/* Tap indicator with pulse */}
        {!isTyping && !isComplete && (
          <View style={styles.tapIndicator}>
            <Text style={styles.tapText}>Tap to continue</Text>
            <View style={[styles.tapDot, { backgroundColor: emotionColor }]} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  emotionGlow: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    height: 200,
    borderRadius: 100,
    // Blur effect simulation
    transform: [{ scaleY: 0.5 }],
  },
  box: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    paddingTop: spacing.lg + 8, // Extra space for pointer
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 97, 0.3)',
    minHeight: 120,
    // Subtle inner glow
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  pointerContainer: {
    position: 'absolute',
    top: -12,
    left: '50%',
    marginLeft: -12,
    alignItems: 'center',
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor set inline with box color
  },
  pointerGlow: {
    position: 'absolute',
    top: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.4,
    transform: [{ scaleY: 0.6 }],
  },
  speakerContainer: {
    marginBottom: spacing.sm,
  },
  speakerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  speakerName: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  accentLine: {
    height: 2,
    backgroundColor: colors.accent,
    marginTop: spacing.xs,
    borderRadius: 1,
    // Gold glow
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  dialogText: {
    fontSize: typography.md,
    color: colors.primary,
    lineHeight: typography.md * 1.6,
  },
  narratorText: {
    fontStyle: 'italic',
    color: colors.secondary,
  },
  cursor: {
    color: colors.accent,
  },
  tapIndicator: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tapText: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  tapDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.7,
  },
});
