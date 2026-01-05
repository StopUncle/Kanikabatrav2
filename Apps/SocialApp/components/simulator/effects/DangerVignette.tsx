// DangerVignette - Edge darkness based on control score
// Creates claustrophobic feeling when losing control

import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import type { CharacterTheme } from '../../../lib/immersion/characterThemes';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DangerVignetteProps {
  controlScore: number; // -100 to +100
  characterTheme?: CharacterTheme;
  enabled?: boolean;
  style?: ViewStyle;
}

/**
 * Vignette intensity based on control score:
 * - +50 to +100: No vignette (you're in control)
 * - 0 to +50: Very subtle
 * - -50 to 0: Noticeable
 * - -100 to -50: Heavy, claustrophobic
 */
export function DangerVignette({
  controlScore,
  characterTheme,
  enabled = true,
  style,
}: DangerVignetteProps) {
  const intensity = useSharedValue(0);

  useEffect(() => {
    if (!enabled) {
      intensity.value = withTiming(0, { duration: 300 });
      return;
    }

    // Map control score to vignette intensity
    // High control = low vignette, low control = high vignette
    let targetIntensity = 0;

    if (controlScore >= 50) {
      targetIntensity = 0;
    } else if (controlScore >= 0) {
      // 0-50: very subtle (0-0.15)
      targetIntensity = interpolate(controlScore, [0, 50], [0.15, 0]);
    } else if (controlScore >= -50) {
      // -50 to 0: noticeable (0.15-0.35)
      targetIntensity = interpolate(controlScore, [-50, 0], [0.35, 0.15]);
    } else {
      // -100 to -50: heavy (0.35-0.6)
      targetIntensity = interpolate(controlScore, [-100, -50], [0.6, 0.35]);
    }

    intensity.value = withTiming(targetIntensity, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, [controlScore, enabled, intensity]);

  // Get vignette color from character theme or default
  const vignetteColor = characterTheme?.danger
    ? characterTheme.primary
    : '#000000';

  const topStyle = useAnimatedStyle(() => ({
    opacity: intensity.value,
  }));

  const bottomStyle = useAnimatedStyle(() => ({
    opacity: intensity.value * 1.2, // Slightly stronger at bottom
  }));

  const leftStyle = useAnimatedStyle(() => ({
    opacity: intensity.value * 0.8,
  }));

  const rightStyle = useAnimatedStyle(() => ({
    opacity: intensity.value * 0.8,
  }));

  // Corner accents for extra claustrophobia
  const cornerStyle = useAnimatedStyle(() => ({
    opacity: intensity.value * 0.5,
  }));

  if (!enabled) return null;

  return (
    <View style={[styles.container, style]} pointerEvents="none">
      {/* Top vignette */}
      <Animated.View style={[styles.top, topStyle]}>
        <LinearGradient
          colors={[vignetteColor, 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Bottom vignette */}
      <Animated.View style={[styles.bottom, bottomStyle]}>
        <LinearGradient
          colors={['transparent', vignetteColor]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Left vignette */}
      <Animated.View style={[styles.left, leftStyle]}>
        <LinearGradient
          colors={[vignetteColor, 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>

      {/* Right vignette */}
      <Animated.View style={[styles.right, rightStyle]}>
        <LinearGradient
          colors={['transparent', vignetteColor]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>

      {/* Corner accents for extra intensity at extreme low control */}
      <Animated.View style={[styles.cornerTopLeft, cornerStyle]}>
        <LinearGradient
          colors={[vignetteColor, 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.cornerTopRight, cornerStyle]}>
        <LinearGradient
          colors={[vignetteColor, 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.cornerBottomLeft, cornerStyle]}>
        <LinearGradient
          colors={[vignetteColor, 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>

      <Animated.View style={[styles.cornerBottomRight, cornerStyle]}>
        <LinearGradient
          colors={[vignetteColor, 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
      </Animated.View>
    </View>
  );
}

const EDGE_SIZE = SCREEN_HEIGHT * 0.15;
const CORNER_SIZE = SCREEN_WIDTH * 0.3;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: EDGE_SIZE,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: EDGE_SIZE * 1.2,
  },
  left: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: EDGE_SIZE * 0.7,
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: EDGE_SIZE * 0.7,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
});

export default DangerVignette;
