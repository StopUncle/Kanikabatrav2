// Advisor Typing Indicator Component
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';

interface AdvisorTypingIndicatorProps {
  visible: boolean;
}

export function AdvisorTypingIndicator({ visible }: AdvisorTypingIndicatorProps) {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Animate dots
      const animateDots = () => {
        const duration = 400;
        const delay = 150;

        Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.sequence([
                Animated.timing(dot1Anim, {
                  toValue: 1,
                  duration,
                  useNativeDriver: true,
                }),
                Animated.timing(dot1Anim, {
                  toValue: 0,
                  duration,
                  useNativeDriver: true,
                }),
              ]),
              Animated.sequence([
                Animated.delay(delay),
                Animated.timing(dot2Anim, {
                  toValue: 1,
                  duration,
                  useNativeDriver: true,
                }),
                Animated.timing(dot2Anim, {
                  toValue: 0,
                  duration,
                  useNativeDriver: true,
                }),
              ]),
              Animated.sequence([
                Animated.delay(delay * 2),
                Animated.timing(dot3Anim, {
                  toValue: 1,
                  duration,
                  useNativeDriver: true,
                }),
                Animated.timing(dot3Anim, {
                  toValue: 0,
                  duration,
                  useNativeDriver: true,
                }),
              ]),
            ]),
          ])
        ).start();
      };

      animateDots();
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Reset dots
      dot1Anim.setValue(0);
      dot2Anim.setValue(0);
      dot3Anim.setValue(0);
    }
  }, [visible, fadeAnim, dot1Anim, dot2Anim, dot3Anim]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.bubble}>
        <Text style={styles.senderName}>Kanika</Text>
        <View style={styles.dotsContainer}>
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dot1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [
                  {
                    scale: dot1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dot2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [
                  {
                    scale: dot2Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: dot3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [
                  {
                    scale: dot3Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  bubble: {
    ...glass.medium,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderBottomLeftRadius: spacing.xs,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  senderName: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
});
