// ScreenShake - Camera shake effect for emotional moments
// Wraps content and provides shake triggers for story beats

import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

export type ShakeIntensity = 'subtle' | 'medium' | 'heavy';
export type ShakeType = 'horizontal' | 'vertical' | 'chaos';

export interface ShakePreset {
  intensity: ShakeIntensity;
  type: ShakeType;
  duration: number;
  repeat?: boolean;
}

export const SHAKE_PRESETS: Record<string, ShakePreset> = {
  // Story moments
  shock: { intensity: 'heavy', type: 'horizontal', duration: 300 },
  threat: { intensity: 'subtle', type: 'vertical', duration: 500 },
  heartbeat: { intensity: 'subtle', type: 'vertical', duration: 600 }, // Single pulse, not infinite
  impact: { intensity: 'medium', type: 'chaos', duration: 200 },
  revelation: { intensity: 'medium', type: 'horizontal', duration: 400 },
  danger: { intensity: 'heavy', type: 'chaos', duration: 350 },
  nervousness: { intensity: 'subtle', type: 'chaos', duration: 400 }, // Single burst, not infinite
  victory: { intensity: 'medium', type: 'vertical', duration: 300 },
  defeat: { intensity: 'heavy', type: 'vertical', duration: 500 },
};

const INTENSITY_VALUES: Record<ShakeIntensity, number> = {
  subtle: 2,
  medium: 5,
  heavy: 10,
};

interface ScreenShakeProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface ScreenShakeRef {
  shake: (preset: keyof typeof SHAKE_PRESETS | ShakePreset) => void;
  stop: () => void;
}

export const ScreenShake = forwardRef<ScreenShakeRef, ScreenShakeProps>(
  ({ children, style }, ref) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const shake = useCallback(
      (presetOrConfig: keyof typeof SHAKE_PRESETS | ShakePreset) => {
        const config =
          typeof presetOrConfig === 'string'
            ? SHAKE_PRESETS[presetOrConfig]
            : presetOrConfig;

        if (!config) return;

        const amplitude = INTENSITY_VALUES[config.intensity];
        const duration = config.duration;
        const steps = Math.max(4, Math.floor(duration / 50));
        const stepDuration = duration / steps;

        // Create shake sequence based on type
        const createShakeSequence = (axis: 'x' | 'y') => {
          const values: number[] = [];

          for (let i = 0; i < steps; i++) {
            if (config.type === 'horizontal' && axis === 'y') {
              values.push(0);
            } else if (config.type === 'vertical' && axis === 'x') {
              values.push(0);
            } else {
              // Alternating with decay for chaos, or pure alternating for directional
              const decay = config.type === 'chaos' ? 1 - i / steps : 1;
              const direction = i % 2 === 0 ? 1 : -1;
              const randomFactor =
                config.type === 'chaos' ? 0.5 + Math.random() * 0.5 : 1;
              values.push(amplitude * direction * decay * randomFactor);
            }
          }
          values.push(0); // Return to center
          return values;
        };

        const xValues = createShakeSequence('x');
        const yValues = createShakeSequence('y');

        // Build animation sequence
        const xAnimations = xValues.map((val) =>
          withTiming(val, { duration: stepDuration, easing: Easing.linear })
        );
        const yAnimations = yValues.map((val) =>
          withTiming(val, { duration: stepDuration, easing: Easing.linear })
        );

        if (config.repeat) {
          translateX.value = withRepeat(
            withSequence(...xAnimations),
            -1, // Infinite
            false
          );
          translateY.value = withRepeat(
            withSequence(...yAnimations),
            -1,
            false
          );
        } else {
          translateX.value = withSequence(...xAnimations);
          translateY.value = withSequence(...yAnimations);
        }
      },
      [translateX, translateY]
    );

    const stop = useCallback(() => {
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      translateX.value = withTiming(0, { duration: 100 });
      translateY.value = withTiming(0, { duration: 100 });
    }, [translateX, translateY]);

    useImperativeHandle(ref, () => ({ shake, stop }), [shake, stop]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }));

    return (
      <Animated.View style={[styles.container, style, animatedStyle]}>
        {children}
      </Animated.View>
    );
  }
);

ScreenShake.displayName = 'ScreenShake';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenShake;
