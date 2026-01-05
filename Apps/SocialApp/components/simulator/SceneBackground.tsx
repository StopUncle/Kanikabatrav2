// Scene Background Component
// Enhanced with particles, vignette, and location-specific ambient effects
// Supports optional background images with gradient overlay
import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { colors, locationAmbient } from '../../lib/theme';
import type { BackgroundId } from '../../content/simulator';

interface SceneBackgroundProps {
  backgroundId?: BackgroundId;
  backgroundImage?: ImageSourcePropType;
  children: React.ReactNode;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PARTICLE_COUNT = 15;

// Background colors for different scene types
const BACKGROUND_COLORS: Record<BackgroundId, readonly [string, string, string]> = {
  'coffee-shop': ['#2D1810', '#1A0F0A', '#0A0A0A'] as const,
  'restaurant': ['#1A1520', '#0F0A15', '#0A0A0A'] as const,
  'apartment': ['#151520', '#0A0A15', '#0A0A0A'] as const,
  'park': ['#102015', '#0A150A', '#0A0A0A'] as const,
  'office': ['#151518', '#0A0A0D', '#0A0A0A'] as const,
  'bar': ['#201515', '#150A0A', '#0A0A0A'] as const,
  'text-screen': ['#0A0A15', '#050510', '#0A0A0A'] as const,
  // University backgrounds
  'dorm-room': ['#1A1818', '#0F0D0D', '#0A0A0A'] as const,
  'party': ['#201020', '#150A15', '#0A0A0A'] as const,
  'study-hall': ['#1A1815', '#0F0D0A', '#0A0A0A'] as const,
  'campus-quad': ['#101815', '#0A0F0A', '#0A0A0A'] as const,
  'hallway': ['#181818', '#0D0D0D', '#0A0A0A'] as const,
  'common-room': ['#1A1612', '#0F0C08', '#0A0A0A'] as const,
};

// Particle component for floating dust/light effects
function Particle({
  index,
  particleColor,
  delayMs = 0,
}: {
  index: number;
  particleColor: string;
  delayMs?: number;
}) {
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Random starting position - useRef ensures stable values across re-renders
  const startX = useRef(Math.random() * SCREEN_WIDTH).current;
  const startY = useRef(Math.random() * SCREEN_HEIGHT).current;
  const size = useRef(2 + Math.random() * 4).current;
  const duration = useRef(5000 + Math.random() * 4000).current;
  const driftX = useRef((Math.random() - 0.5) * 60).current;
  const driftY = useRef(-30 - Math.random() * 50).current; // Float upward

  useEffect(() => {
    // Start animation with staggered delay
    progress.value = withDelay(
      delayMs + index * 200,
      withRepeat(
        withTiming(1, { duration, easing: Easing.linear }),
        -1,
        false
      )
    );

    // Fade in/out animation
    opacity.value = withDelay(
      delayMs + index * 200,
      withRepeat(
        withSequence(
          withTiming(0.6, { duration: duration * 0.3 }),
          withTiming(0.6, { duration: duration * 0.4 }),
          withTiming(0, { duration: duration * 0.3 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const x = startX + interpolate(progress.value, [0, 1], [0, driftX]);
    const y = startY + interpolate(progress.value, [0, 1], [0, driftY]);

    return {
      transform: [
        { translateX: x },
        { translateY: y },
      ],
      opacity: opacity.value,
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
          backgroundColor: particleColor,
          shadowColor: particleColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: size,
        },
      ]}
    />
  );
}

// Ambient glow effect for specific locations
function AmbientGlow({
  backgroundId,
  accentColor,
}: {
  backgroundId: BackgroundId;
  accentColor: string;
}) {
  const pulseValue = useSharedValue(0);

  useEffect(() => {
    // Different pulse patterns per location
    const duration = backgroundId === 'bar' ? 2000 :
                    backgroundId === 'restaurant' ? 3000 : 4000;

    pulseValue.value = withRepeat(
      withSequence(
        withTiming(1, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [backgroundId]);

  const glowStyle = useAnimatedStyle(() => {
    const baseOpacity = backgroundId === 'bar' ? 0.15 :
                       backgroundId === 'restaurant' ? 0.1 : 0.08;

    return {
      opacity: interpolate(pulseValue.value, [0, 1], [baseOpacity * 0.5, baseOpacity]),
    };
  });

  // Position based on location type (using numeric values for Reanimated compatibility)
  const glowPosition = useMemo(() => {
    switch (backgroundId) {
      case 'restaurant':
        return { bottom: -50, left: SCREEN_WIDTH * 0.3 }; // Candlelight from bottom
      case 'bar':
        return { top: 0, right: -50 }; // Neon from top-right
      case 'apartment':
        return { top: SCREEN_HEIGHT * 0.2, left: -30 }; // Lamp from side
      default:
        return { bottom: -30, left: SCREEN_WIDTH * 0.4 };
    }
  }, [backgroundId]);

  return (
    <Animated.View
      style={[
        styles.ambientGlow,
        glowStyle,
        glowPosition,
        { backgroundColor: accentColor },
      ]}
    />
  );
}

// Scanline effect for text-screen
function Scanlines() {
  const scanPosition = useSharedValue(0);

  useEffect(() => {
    scanPosition.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const scanStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(scanPosition.value, [0, 1], [-20, SCREEN_HEIGHT + 20]) }
      ],
    };
  });

  return (
    <View style={styles.scanlinesContainer}>
      <Animated.View style={[styles.scanline, scanStyle]} />
      {/* Static scanline pattern */}
      <View style={styles.staticScanlines} />
    </View>
  );
}

const DEFAULT_GRADIENT: readonly [string, string, string] = ['#0A0A0A', '#0A0A0A', '#0A0A0A'] as const;

export function SceneBackground({ backgroundId, backgroundImage, children }: SceneBackgroundProps) {
  const gradientColors: readonly [string, string, string] = backgroundId && BACKGROUND_COLORS[backgroundId]
    ? BACKGROUND_COLORS[backgroundId]
    : DEFAULT_GRADIENT;

  const ambient = backgroundId ? locationAmbient[backgroundId] : null;
  const particleColor = ambient?.particle || '#FFFFFF';
  const accentColor = ambient?.accent || '#C9A961';

  const isTextScreen = backgroundId === 'text-screen';
  const hasBackgroundImage = !!backgroundImage;

  return (
    <View style={styles.container}>
      {/* Optional background image layer */}
      {hasBackgroundImage && (
        <Image
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      )}

      {/* Base gradient - more transparent if image present */}
      <LinearGradient
        colors={gradientColors}
        style={[
          StyleSheet.absoluteFill,
          hasBackgroundImage && styles.gradientOverImage,
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Vignette overlay - darker edges */}
      <View style={styles.vignetteTop} />
      <View style={styles.vignetteBottom} />
      <View style={styles.vignetteLeft} />
      <View style={styles.vignetteRight} />

      {/* Ambient glow for certain locations */}
      {backgroundId && !isTextScreen && (
        <AmbientGlow backgroundId={backgroundId} accentColor={accentColor} />
      )}

      {/* Floating particles */}
      {backgroundId && !isTextScreen && (
        <View style={styles.particlesContainer} pointerEvents="none">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <Particle key={i} index={i} particleColor={particleColor} />
          ))}
        </View>
      )}

      {/* Text screen special effects */}
      {isTextScreen && <Scanlines />}

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  gradientOverImage: {
    opacity: 0.7, // Allow background image to show through
  },
  content: {
    flex: 1,
  },
  // Vignette edges
  vignetteTop: {
    ...StyleSheet.absoluteFillObject,
    height: 120,
    bottom: undefined,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    opacity: 0.6,
    // Gradient simulation via multiple shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 60 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
  },
  vignetteBottom: {
    ...StyleSheet.absoluteFillObject,
    height: 150,
    top: undefined,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -75 },
    shadowOpacity: 0.9,
    shadowRadius: 75,
  },
  vignetteLeft: {
    ...StyleSheet.absoluteFillObject,
    width: 80,
    right: undefined,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 40, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
  },
  vignetteRight: {
    ...StyleSheet.absoluteFillObject,
    width: 80,
    left: undefined,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: -40, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
  },
  // Particles
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
  },
  // Ambient glow
  ambientGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  // Scanlines for text-screen
  scanlinesContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0, 191, 255, 0.1)',
  },
  staticScanlines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
    // Simulated scanline pattern via thin borders
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
