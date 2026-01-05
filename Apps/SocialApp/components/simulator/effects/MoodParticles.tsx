// MoodParticles - Floating ambient particles that match scene mood
// Subtle visual enhancement that adds atmosphere

import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  interpolate,
  cancelAnimation,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export type MoodType =
  | 'romantic'
  | 'danger'
  | 'party'
  | 'cold'
  | 'peaceful'
  | 'tense'
  | 'mysterious'
  | 'professional';

interface ParticleConfig {
  count: number;
  colors: string[];
  sizeRange: [number, number];
  speed: 'slow' | 'medium' | 'fast';
  type: 'float' | 'fall' | 'sparkle' | 'drift' | 'pulse';
  opacity: number;
}

const PARTICLE_CONFIGS: Record<MoodType, ParticleConfig> = {
  romantic: {
    count: 15,
    colors: ['#FFD700', '#FFC0CB', '#FFE4B5'],
    sizeRange: [3, 6],
    speed: 'slow',
    type: 'float',
    opacity: 0.4,
  },
  danger: {
    count: 20,
    colors: ['#444444', '#666666', '#333333'],
    sizeRange: [2, 4],
    speed: 'medium',
    type: 'fall',
    opacity: 0.3,
  },
  party: {
    count: 25,
    colors: ['#FFD700', '#FF69B4', '#00CED1', '#9370DB', '#FF6347'],
    sizeRange: [3, 5],
    speed: 'fast',
    type: 'sparkle',
    opacity: 0.5,
  },
  cold: {
    count: 12,
    colors: ['#E0E7FF', '#B8C6FF', '#FFFFFF'],
    sizeRange: [2, 4],
    speed: 'slow',
    type: 'drift',
    opacity: 0.35,
  },
  peaceful: {
    count: 10,
    colors: ['#90EE90', '#98FB98', '#ADFF2F'],
    sizeRange: [3, 5],
    speed: 'slow',
    type: 'float',
    opacity: 0.3,
  },
  tense: {
    count: 8,
    colors: ['#FF4444', '#FF6666', '#CC3333'],
    sizeRange: [2, 3],
    speed: 'slow',
    type: 'pulse',
    opacity: 0.25,
  },
  mysterious: {
    count: 15,
    colors: ['#8B5CF6', '#A78BFA', '#7C3AED'],
    sizeRange: [2, 5],
    speed: 'slow',
    type: 'drift',
    opacity: 0.35,
  },
  professional: {
    count: 8,
    colors: ['#64748B', '#94A3B8', '#475569'],
    sizeRange: [2, 3],
    speed: 'slow',
    type: 'drift',
    opacity: 0.2,
  },
};

const SPEED_VALUES = {
  slow: { base: 8000, variance: 4000 },
  medium: { base: 5000, variance: 2000 },
  fast: { base: 2500, variance: 1000 },
};

interface ParticleProps {
  config: ParticleConfig;
  index: number;
}

function Particle({ config, index }: ParticleProps) {
  const progress = useSharedValue(0);
  const pulseValue = useSharedValue(1);

  // Random initial position and properties
  const startX = useMemo(() => Math.random() * SCREEN_WIDTH, []);
  const startY = useMemo(
    () =>
      config.type === 'fall'
        ? -20
        : Math.random() * SCREEN_HEIGHT,
    [config.type]
  );
  const size = useMemo(
    () =>
      config.sizeRange[0] +
      Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
    [config.sizeRange]
  );
  const color = useMemo(
    () => config.colors[Math.floor(Math.random() * config.colors.length)],
    [config.colors]
  );
  const delay = useMemo(() => Math.random() * 3000, []);
  const duration = useMemo(() => {
    const speedConfig = SPEED_VALUES[config.speed];
    return speedConfig.base + Math.random() * speedConfig.variance;
  }, [config.speed]);
  const driftX = useMemo(() => (Math.random() - 0.5) * 100, []);

  useEffect(() => {
    // Main movement animation
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );

    // Pulse animation for tense mood
    if (config.type === 'pulse') {
      pulseValue.value = withRepeat(
        withSequence(
          withTiming(1.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }

    // Sparkle animation
    if (config.type === 'sparkle') {
      pulseValue.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 200 }),
          withTiming(1, { duration: 200 }),
          withTiming(0.5, { duration: 300 }),
          withTiming(1, { duration: 300 })
        ),
        -1,
        false
      );
    }

    return () => {
      cancelAnimation(progress);
      cancelAnimation(pulseValue);
    };
  }, [progress, pulseValue, delay, duration, config.type]);

  const animatedStyle = useAnimatedStyle(() => {
    let translateX = startX;
    let translateY = startY;

    switch (config.type) {
      case 'float':
        // Gentle upward float with horizontal sway
        translateY = interpolate(
          progress.value,
          [0, 1],
          [startY, startY - SCREEN_HEIGHT * 0.3]
        );
        translateX =
          startX +
          Math.sin(progress.value * Math.PI * 2) * 20 +
          progress.value * driftX;
        break;

      case 'fall':
        // Falling down with slight drift
        translateY = interpolate(
          progress.value,
          [0, 1],
          [-20, SCREEN_HEIGHT + 20]
        );
        translateX =
          startX +
          Math.sin(progress.value * Math.PI * 4) * 15 +
          progress.value * driftX;
        break;

      case 'drift':
        // Slow horizontal drift with subtle vertical movement
        translateX = interpolate(
          progress.value,
          [0, 0.5, 1],
          [startX, startX + driftX, startX]
        );
        translateY =
          startY +
          Math.sin(progress.value * Math.PI * 2) * 30;
        break;

      case 'sparkle':
      case 'pulse':
        // Mostly stationary with slight movement
        translateX =
          startX +
          Math.sin(progress.value * Math.PI * 4) * 5;
        translateY =
          startY +
          Math.cos(progress.value * Math.PI * 4) * 5;
        break;
    }

    // Opacity fade in/out at edges
    const fadeProgress = progress.value;
    const opacity =
      config.type === 'sparkle' || config.type === 'pulse'
        ? config.opacity * pulseValue.value
        : config.opacity *
          (fadeProgress < 0.1
            ? fadeProgress * 10
            : fadeProgress > 0.9
            ? (1 - fadeProgress) * 10
            : 1);

    return {
      transform: [
        { translateX },
        { translateY },
        { scale: pulseValue.value },
      ],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        animatedStyle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: size,
        },
      ]}
    />
  );
}

interface MoodParticlesProps {
  mood: MoodType | null;
  intensity?: number; // 0-1, multiplies particle count
  enabled?: boolean;
}

export function MoodParticles({
  mood,
  intensity = 1,
  enabled = true,
}: MoodParticlesProps) {
  if (!enabled || !mood) return null;

  const config = PARTICLE_CONFIGS[mood];
  const particleCount = Math.floor(config.count * intensity);

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: particleCount }).map((_, index) => (
        <Particle key={`${mood}-${index}`} config={config} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
  },
});

export default MoodParticles;
