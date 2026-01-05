// DynamicBlur - Animated blur overlay for emotional intensity
// Creates focus effect during intimate/tense moments

import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

export type BlurTint = 'dark' | 'light' | 'default';

export interface BlurPreset {
  intensity: number;
  tint: BlurTint;
}

export const BLUR_PRESETS: Record<string, BlurPreset> = {
  // Story moments
  intimate: { intensity: 12, tint: 'dark' }, // Close conversation
  danger: { intensity: 8, tint: 'dark' }, // Threatening moment
  dreamy: { intensity: 15, tint: 'light' }, // Romantic
  focus: { intensity: 0, tint: 'default' }, // Choice time - clear
  tense: { intensity: 6, tint: 'dark' }, // Building tension
  memory: { intensity: 20, tint: 'light' }, // Flashback
  confusion: { intensity: 10, tint: 'default' }, // Disoriented
};

interface DynamicBlurProps {
  intensity: number; // 0-100
  tint?: BlurTint;
  animationDuration?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

export function DynamicBlur({
  intensity,
  tint = 'dark',
  animationDuration = 300,
  style,
  children,
}: DynamicBlurProps) {
  const blurValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    blurValue.value = withTiming(intensity, {
      duration: animationDuration,
      easing: Easing.out(Easing.ease),
    });
    opacityValue.value = withTiming(intensity > 0 ? 1 : 0, {
      duration: animationDuration,
      easing: Easing.out(Easing.ease),
    });
  }, [intensity, animationDuration, blurValue, opacityValue]);

  const overlayStyle = useAnimatedStyle(() => {
    // On Android, BlurView performance is poor, use semi-transparent overlay
    if (Platform.OS === 'android') {
      return {
        opacity: interpolate(blurValue.value, [0, 100], [0, 0.7]),
      };
    }
    return {
      opacity: opacityValue.value,
    };
  });

  const blurIntensity = Platform.OS === 'ios' ? Math.min(intensity, 100) : 0;

  return (
    <View style={[styles.container, style]}>
      {children}

      {/* Blur overlay */}
      <Animated.View style={[styles.blurOverlay, overlayStyle]} pointerEvents="none">
        {Platform.OS === 'ios' ? (
          <BlurView
            intensity={blurIntensity}
            tint={tint}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          // Android fallback - semi-transparent overlay
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor:
                  tint === 'dark'
                    ? 'rgba(0, 0, 0, 0.5)'
                    : tint === 'light'
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(128, 128, 128, 0.3)',
              },
            ]}
          />
        )}
      </Animated.View>
    </View>
  );
}

// Controlled blur that can be animated from outside
interface BlurOverlayProps {
  intensity: number;
  tint?: BlurTint;
  visible?: boolean;
}

export function BlurOverlay({
  intensity,
  tint = 'dark',
  visible = true,
}: BlurOverlayProps) {
  const opacityValue = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    opacityValue.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [visible, opacityValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
  }));

  if (intensity === 0) return null;

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, animatedStyle]}
      pointerEvents="none"
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={Math.min(intensity, 100)}
          tint={tint}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor:
                tint === 'dark'
                  ? `rgba(0, 0, 0, ${intensity / 100 * 0.7})`
                  : tint === 'light'
                  ? `rgba(255, 255, 255, ${intensity / 100 * 0.5})`
                  : `rgba(128, 128, 128, ${intensity / 100 * 0.4})`,
            },
          ]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DynamicBlur;
