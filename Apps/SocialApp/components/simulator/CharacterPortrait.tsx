// Character Portrait Component
// Full upper-body silhouette with emotion aura, glowing eyes, and speaking animations
// Enhanced with immersion toolkit: breathing patterns, entry/exit animations, color themes
// Enhanced with silhouette system: distinct body shapes, hair/hat overlays
import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  interpolate,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, emotionColors, emotionGlows } from '../../lib/theme';
import type { Character, EmotionType, SilhouetteType } from '../../content/simulator';
import {
  getCharacterTheme,
  getCharacterAnimation,
  ENTRY_TRANSFORMS,
  EXIT_TRANSFORMS,
  CharacterTheme,
} from '../../lib/immersion';
import {
  getSilhouetteConfig,
  getHeadBorderRadius,
  getHairDimensions,
  type HairOverlay,
} from '../../lib/silhouettes';

interface CharacterPortraitProps {
  character: Character;
  emotion?: EmotionType;
  speaking?: boolean;
  size?: 'small' | 'medium' | 'large';
  personalityType?: string;
  silhouetteType?: SilhouetteType;
  visible?: boolean;
  showName?: boolean; // Whether to show the built-in name label
  onEntryComplete?: () => void;
  onExitComplete?: () => void;
}

// Breathing patterns vary by emotion state
type BreathingPattern = 'calm' | 'nervous' | 'excited' | 'angry' | 'controlled' | 'seductive';

const BREATHING_CONFIGS: Record<BreathingPattern, { speed: number; intensity: number }> = {
  calm: { speed: 4000, intensity: 1.015 },
  nervous: { speed: 1500, intensity: 1.025 },
  excited: { speed: 2000, intensity: 1.03 },
  angry: { speed: 1000, intensity: 1.02 },
  controlled: { speed: 5000, intensity: 1.01 },
  seductive: { speed: 3000, intensity: 1.02 },
};

// Map emotion to breathing pattern
function getBreathingPattern(emotion: EmotionType): BreathingPattern {
  switch (emotion) {
    case 'angry':
      return 'angry';
    case 'confused':
    case 'pleading':
      return 'nervous';
    case 'happy':
    case 'curious':
    case 'hopeful':
      return 'excited';
    case 'cold':
    case 'serious':
    case 'knowing':
      return 'controlled';
    case 'seductive':
      return 'seductive';
    default:
      return 'calm';
  }
}

// Animation patterns per emotion
const EMOTION_ANIMATION: Record<EmotionType, {
  pulseSpeed: number;
  pulseIntensity: number;
  flickerAmount: number;
}> = {
  neutral: { pulseSpeed: 4000, pulseIntensity: 0.3, flickerAmount: 0 },
  happy: { pulseSpeed: 2000, pulseIntensity: 0.5, flickerAmount: 0 },
  angry: { pulseSpeed: 300, pulseIntensity: 0.8, flickerAmount: 0.3 },
  sad: { pulseSpeed: 3500, pulseIntensity: 0.4, flickerAmount: 0 },
  seductive: { pulseSpeed: 2500, pulseIntensity: 0.6, flickerAmount: 0 },
  cold: { pulseSpeed: 5000, pulseIntensity: 0.2, flickerAmount: 0.1 },
  confused: { pulseSpeed: 1500, pulseIntensity: 0.5, flickerAmount: 0.2 },
  smirking: { pulseSpeed: 3000, pulseIntensity: 0.4, flickerAmount: 0 },
  concerned: { pulseSpeed: 3000, pulseIntensity: 0.35, flickerAmount: 0 },
  knowing: { pulseSpeed: 2800, pulseIntensity: 0.45, flickerAmount: 0 },
  serious: { pulseSpeed: 4500, pulseIntensity: 0.25, flickerAmount: 0 },
  pleading: { pulseSpeed: 2200, pulseIntensity: 0.55, flickerAmount: 0 },
  curious: { pulseSpeed: 1800, pulseIntensity: 0.5, flickerAmount: 0.1 },
  hopeful: { pulseSpeed: 2500, pulseIntensity: 0.5, flickerAmount: 0 },
};

// Size configurations for full upper-body silhouette
const SIZE_CONFIG = {
  small: {
    headWidth: 50,
    headHeight: 60,
    eyeSize: 4,
    eyeGap: 12,
    mouthWidth: 14,
    neckWidth: 16,
    neckHeight: 12,
    shoulderWidth: 80,
    torsoHeight: 50,
    auraSize: 120,
  },
  medium: {
    headWidth: 65,
    headHeight: 78,
    eyeSize: 5,
    eyeGap: 16,
    mouthWidth: 18,
    neckWidth: 20,
    neckHeight: 16,
    shoulderWidth: 100,
    torsoHeight: 65,
    auraSize: 150,
  },
  large: {
    headWidth: 80,
    headHeight: 96,
    eyeSize: 6,
    eyeGap: 20,
    mouthWidth: 22,
    neckWidth: 24,
    neckHeight: 20,
    shoulderWidth: 130,
    torsoHeight: 85,
    auraSize: 200,
  },
};

// Hair/Hat overlay component
interface HairOverlayProps {
  overlay: HairOverlay;
  dimensions: { width: number; height: number; offsetX: number; offsetY: number };
  themeColor?: string;
}

function HairOverlayView({ overlay, dimensions, themeColor }: HairOverlayProps) {
  const baseColor = '#0D0D0D';
  const highlightColor = themeColor ? `${themeColor}15` : 'rgba(255,255,255,0.03)';

  switch (overlay) {
    case 'cap':
      // Baseball cap shape: main body + brim (centered on head)
      return (
        <View
          style={{
            position: 'absolute',
            top: dimensions.offsetY,
            left: dimensions.offsetX,
            alignItems: 'center',
          }}
          pointerEvents="none"
        >
          {/* Cap crown */}
          <View
            style={{
              width: dimensions.width,
              height: dimensions.height * 0.7,
              backgroundColor: baseColor,
              borderTopLeftRadius: dimensions.width * 0.4,
              borderTopRightRadius: dimensions.width * 0.4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.05)',
            }}
          />
          {/* Cap brim */}
          <View
            style={{
              width: dimensions.width * 1.15,
              height: dimensions.height * 0.25,
              backgroundColor: baseColor,
              marginTop: -2,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.03)',
            }}
          />
        </View>
      );

    case 'styled':
      // Styled hair: asymmetric volume on one side
      return (
        <View
          style={{
            position: 'absolute',
            top: dimensions.offsetY,
            left: dimensions.offsetX,
            flexDirection: 'row',
          }}
          pointerEvents="none"
        >
          {/* Main hair volume */}
          <View
            style={{
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: baseColor,
              borderRadius: dimensions.width * 0.5,
              transform: [{ rotate: '-15deg' }],
              borderWidth: 1,
              borderColor: highlightColor,
            }}
          />
          {/* Secondary volume */}
          <View
            style={{
              width: dimensions.width * 0.6,
              height: dimensions.height * 0.8,
              backgroundColor: baseColor,
              borderRadius: dimensions.width * 0.3,
              marginLeft: -dimensions.width * 0.3,
              marginTop: dimensions.height * 0.1,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.02)',
            }}
          />
        </View>
      );

    case 'ponytail':
      // Ponytail: bun at back + tail extending down
      return (
        <View
          style={{
            position: 'absolute',
            top: dimensions.offsetY,
            left: dimensions.offsetX,
            alignItems: 'center',
          }}
          pointerEvents="none"
        >
          {/* Bun */}
          <View
            style={{
              width: dimensions.width * 1.5,
              height: dimensions.width * 1.5,
              backgroundColor: baseColor,
              borderRadius: dimensions.width * 0.75,
              borderWidth: 1,
              borderColor: highlightColor,
            }}
          />
          {/* Tail */}
          <View
            style={{
              width: dimensions.width * 0.6,
              height: dimensions.height * 0.6,
              backgroundColor: baseColor,
              borderRadius: 4,
              marginTop: -4,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.02)',
            }}
          />
        </View>
      );

    case 'short':
      // Short hair: spiky top (centered on head)
      return (
        <View
          style={{
            position: 'absolute',
            top: dimensions.offsetY,
            left: dimensions.offsetX,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          pointerEvents="none"
        >
          {/* Multiple spikes */}
          {[-25, -10, 5, 20].map((rotation, i) => (
            <View
              key={i}
              style={{
                width: dimensions.width * 0.22,
                height: dimensions.height * (0.8 + (i % 2) * 0.4),
                backgroundColor: baseColor,
                borderRadius: 3,
                marginHorizontal: 1,
                transform: [{ rotate: `${rotation}deg` }],
                borderWidth: 1,
                borderColor: i === 1 ? highlightColor : 'rgba(255,255,255,0.02)',
              }}
            />
          ))}
        </View>
      );

    case 'flowing':
      // Elegant side-swept hair - clean and simple
      return (
        <View
          style={{
            position: 'absolute',
            top: dimensions.offsetY,
            left: dimensions.offsetX,
          }}
          pointerEvents="none"
        >
          {/* Top volume - sits above head */}
          <View
            style={{
              width: dimensions.width * 1.3,
              height: dimensions.height * 0.4,
              backgroundColor: baseColor,
              borderTopLeftRadius: dimensions.width * 0.6,
              borderTopRightRadius: dimensions.width * 0.8,
              borderBottomLeftRadius: dimensions.width * 0.3,
              borderBottomRightRadius: dimensions.width * 0.1,
              borderWidth: 1,
              borderColor: highlightColor,
            }}
          />
          {/* Side cascade - flows down right side */}
          <View
            style={{
              position: 'absolute',
              top: dimensions.height * 0.25,
              left: dimensions.width * 0.9,
              width: dimensions.width * 0.35,
              height: dimensions.height * 0.8,
              backgroundColor: baseColor,
              borderTopRightRadius: dimensions.width * 0.15,
              borderBottomRightRadius: dimensions.width * 0.2,
              borderBottomLeftRadius: dimensions.width * 0.1,
              transform: [{ rotate: '15deg' }],
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.02)',
            }}
          />
        </View>
      );

    default:
      return null;
  }
}

export function CharacterPortrait({
  character,
  emotion = 'neutral',
  speaking = false,
  size = 'medium',
  personalityType,
  silhouetteType,
  visible = true,
  showName = true,
  onEntryComplete,
  onExitComplete,
}: CharacterPortraitProps) {
  const emotionColor = emotionColors[emotion];
  const emotionGlow = emotionGlows[emotion];
  const animConfig = EMOTION_ANIMATION[emotion];
  const baseSizeConfig = SIZE_CONFIG[size];

  // Get silhouette config - use character's type, prop override, or default
  const effectiveSilhouetteType = silhouetteType || character.silhouetteType || 'default';
  const silhouetteConfig = useMemo(
    () => getSilhouetteConfig(effectiveSilhouetteType),
    [effectiveSilhouetteType]
  );

  // Apply silhouette multipliers to size config
  const sizeConfig = useMemo(() => ({
    headWidth: Math.round(baseSizeConfig.headWidth * silhouetteConfig.headWidthMult),
    headHeight: Math.round(baseSizeConfig.headHeight * silhouetteConfig.headHeightMult),
    eyeSize: baseSizeConfig.eyeSize,
    eyeGap: baseSizeConfig.eyeGap,
    mouthWidth: baseSizeConfig.mouthWidth,
    neckWidth: Math.round(baseSizeConfig.neckWidth * silhouetteConfig.neckWidthMult),
    neckHeight: Math.round(baseSizeConfig.neckHeight * silhouetteConfig.neckHeightMult),
    shoulderWidth: Math.round(baseSizeConfig.shoulderWidth * silhouetteConfig.shoulderWidthMult),
    torsoHeight: Math.round(baseSizeConfig.torsoHeight * silhouetteConfig.torsoHeightMult),
    auraSize: baseSizeConfig.auraSize,
  }), [baseSizeConfig, silhouetteConfig]);

  // Calculate head border radius based on shape
  const headBorderRadius = useMemo(
    () => getHeadBorderRadius(silhouetteConfig.headShape, sizeConfig.headWidth, sizeConfig.headHeight),
    [silhouetteConfig.headShape, sizeConfig.headWidth, sizeConfig.headHeight]
  );

  // Get hair overlay dimensions if applicable
  const hairDimensions = useMemo(
    () => getHairDimensions(silhouetteConfig.hairOverlay, sizeConfig.headWidth, sizeConfig.headHeight),
    [silhouetteConfig.hairOverlay, sizeConfig.headWidth, sizeConfig.headHeight]
  );

  // Get character theme and animations based on personality
  const characterTheme = personalityType ? getCharacterTheme(personalityType) : null;
  const characterAnim = personalityType ? getCharacterAnimation(personalityType) : null;

  // Track visibility state for entry/exit
  const [isVisible, setIsVisible] = useState(visible);

  // Animation values
  const glowPulse = useSharedValue(0);
  const eyeGlow = useSharedValue(0.6);
  const flicker = useSharedValue(1);

  // Breathing animation (body) - now emotion-aware
  const breathe = useSharedValue(1);
  const breathingPattern = getBreathingPattern(emotion);
  const breathingConfig = BREATHING_CONFIGS[breathingPattern];

  // Entry/exit animation values
  const entryOpacity = useSharedValue(visible ? 1 : 0);
  const entryTranslateX = useSharedValue(0);
  const entryTranslateY = useSharedValue(0);
  const entryScale = useSharedValue(1);

  // Speaking animations
  const headBob = useSharedValue(0);
  const mouthOpen = useSharedValue(0);
  const speakingScale = useSharedValue(1);

  // Eye color transition for expression changes
  const [prevEmotion, setPrevEmotion] = useState(emotion);
  const eyeColorProgress = useSharedValue(1);

  // Emotion-based glow animation
  useEffect(() => {
    cancelAnimation(glowPulse);
    cancelAnimation(flicker);

    glowPulse.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: animConfig.pulseSpeed / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: animConfig.pulseSpeed / 2,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      false
    );

    if (animConfig.flickerAmount > 0) {
      flicker.value = withRepeat(
        withSequence(
          withTiming(1 - animConfig.flickerAmount, { duration: 80 }),
          withTiming(1, { duration: 80 }),
          withTiming(1 - animConfig.flickerAmount * 0.5, { duration: 50 }),
          withTiming(1, { duration: 100 })
        ),
        -1,
        false
      );
    } else {
      flicker.value = 1;
    }

    return () => {
      cancelAnimation(glowPulse);
      cancelAnimation(flicker);
    };
  }, [emotion]);

  // Breathing animation - varies by emotion state
  useEffect(() => {
    cancelAnimation(breathe);

    breathe.value = withRepeat(
      withSequence(
        withTiming(breathingConfig.intensity, {
          duration: breathingConfig.speed / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1, {
          duration: breathingConfig.speed / 2,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      false
    );

    return () => cancelAnimation(breathe);
  }, [breathingConfig.intensity, breathingConfig.speed]);

  // Entry/exit animations based on character personality
  useEffect(() => {
    if (visible && !isVisible) {
      // Entry animation
      setIsVisible(true);

      const entryType = characterAnim?.entry || 'fade-center';
      const transforms = ENTRY_TRANSFORMS[entryType];
      const duration = characterAnim?.entryDuration || 300;

      // Set initial values
      entryOpacity.value = transforms.initialOpacity;
      entryTranslateX.value = transforms.initialTranslateX;
      entryTranslateY.value = transforms.initialTranslateY;
      entryScale.value = transforms.initialScale;

      // Animate to final values
      entryOpacity.value = withTiming(1, { duration, easing: characterAnim?.entryEasing || Easing.out(Easing.ease) });
      entryTranslateX.value = withTiming(0, { duration, easing: characterAnim?.entryEasing || Easing.out(Easing.ease) });
      entryTranslateY.value = withTiming(0, { duration, easing: characterAnim?.entryEasing || Easing.out(Easing.ease) });
      entryScale.value = withTiming(1, {
        duration,
        easing: characterAnim?.entryEasing || Easing.out(Easing.ease),
      }, () => {
        if (onEntryComplete) {
          runOnJS(onEntryComplete)();
        }
      });
    } else if (!visible && isVisible) {
      // Exit animation
      const exitType = characterAnim?.exit || 'fade';
      const transforms = EXIT_TRANSFORMS[exitType];
      const duration = characterAnim?.exitDuration || 250;

      entryOpacity.value = withTiming(transforms.finalOpacity, { duration });
      entryTranslateX.value = withTiming(transforms.finalTranslateX, { duration });
      entryTranslateY.value = withTiming(transforms.finalTranslateY, { duration });
      entryScale.value = withTiming(transforms.finalScale, { duration }, () => {
        runOnJS(setIsVisible)(false);
        if (onExitComplete) {
          runOnJS(onExitComplete)();
        }
      });
    }
  }, [visible]);

  // Eye color transition when emotion changes
  useEffect(() => {
    if (emotion !== prevEmotion) {
      eyeColorProgress.value = 0;
      eyeColorProgress.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
      setPrevEmotion(emotion);
    }
  }, [emotion, prevEmotion]);

  // Speaking animations
  useEffect(() => {
    cancelAnimation(headBob);
    cancelAnimation(mouthOpen);
    cancelAnimation(speakingScale);
    cancelAnimation(eyeGlow);

    if (speaking) {
      // Head bob - subtle up/down movement
      headBob.value = withRepeat(
        withSequence(
          withTiming(-3, { duration: 300, easing: Easing.inOut(Easing.ease) }),
          withTiming(2, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      // Mouth animation - opens and closes
      mouthOpen.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 150 }),
          withTiming(0.3, { duration: 100 }),
          withTiming(0.8, { duration: 120 }),
          withTiming(0.2, { duration: 130 }),
          withTiming(1, { duration: 100 }),
          withTiming(0, { duration: 200 })
        ),
        -1,
        false
      );

      // Subtle scale pulse
      speakingScale.value = withRepeat(
        withSequence(
          withSpring(1.03, { damping: 12, stiffness: 150 }),
          withSpring(1, { damping: 12, stiffness: 150 })
        ),
        -1,
        false
      );

      // Eyes brighter when speaking
      eyeGlow.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.75, { duration: 400 })
        ),
        -1,
        false
      );
    } else {
      headBob.value = withTiming(0, { duration: 300 });
      mouthOpen.value = withTiming(0, { duration: 200 });
      speakingScale.value = withSpring(1);
      eyeGlow.value = withTiming(0.6, { duration: 300 });
    }

    return () => {
      cancelAnimation(headBob);
      cancelAnimation(mouthOpen);
      cancelAnimation(speakingScale);
      cancelAnimation(eyeGlow);
    };
  }, [speaking]);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    opacity: entryOpacity.value,
    transform: [
      { translateX: entryTranslateX.value },
      { translateY: entryTranslateY.value },
      { scale: entryScale.value * speakingScale.value },
    ],
  }));

  const auraStyle = useAnimatedStyle(() => {
    const baseOpacity = 0.3 + animConfig.pulseIntensity * 0.4;
    const pulseOpacity = interpolate(
      glowPulse.value,
      [0, 1],
      [baseOpacity * 0.5, baseOpacity]
    );

    return {
      opacity: pulseOpacity * flicker.value,
      shadowOpacity: pulseOpacity * 0.8,
    };
  });

  const headStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headBob.value }],
  }));

  const eyeStyle = useAnimatedStyle(() => ({
    opacity: eyeGlow.value * flicker.value,
    shadowOpacity: eyeGlow.value,
  }));

  const mouthStyle = useAnimatedStyle(() => {
    const height = interpolate(mouthOpen.value, [0, 1], [2, 6]);
    const width = interpolate(mouthOpen.value, [0, 1], [sizeConfig.mouthWidth * 0.6, sizeConfig.mouthWidth]);
    return {
      height,
      width,
      opacity: 0.6 + mouthOpen.value * 0.4,
    };
  });

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: breathe.value }],
  }));

  const innerGlowStyle = useAnimatedStyle(() => {
    const intensity = interpolate(glowPulse.value, [0, 1], [0.1, 0.25]);
    return {
      opacity: intensity * flicker.value,
    };
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, containerStyle]}>
        {/* Outer aura glow - uses character theme color when available */}
        <Animated.View
          style={[
            styles.aura,
            auraStyle,
            {
              width: sizeConfig.auraSize,
              height: sizeConfig.auraSize * 1.3,
              borderRadius: sizeConfig.auraSize / 2,
              backgroundColor: characterTheme
                ? `${characterTheme.primary}20` // Theme color with low opacity
                : 'rgba(74, 74, 74, 0.25)',
              shadowColor: characterTheme?.primary || emotionColor,
              shadowRadius: sizeConfig.auraSize * 0.15,
              shadowOpacity: characterTheme?.danger ? 0.25 : 0.15,
            },
          ]}
        />

        {/* Body container - breathing animation */}
        <Animated.View style={[styles.bodyContainer, bodyStyle]}>
          {/* Head with eyes and mouth */}
          <Animated.View style={[styles.headContainer, headStyle]}>
            <View
              style={[
                styles.head,
                {
                  width: sizeConfig.headWidth,
                  height: sizeConfig.headHeight,
                  borderRadius: headBorderRadius,
                },
              ]}
            >
              <LinearGradient
                colors={['#1A1A1A', '#0A0A0A', '#050505']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />

              {/* Inner glow overlay - very subtle */}
              <Animated.View
                style={[
                  styles.innerGlow,
                  innerGlowStyle,
                  { backgroundColor: emotionGlow, opacity: 0.03 },
                ]}
              />

              {/* Eyes */}
              <View style={[styles.eyesContainer, { gap: sizeConfig.eyeGap }]}>
                <Animated.View
                  style={[
                    styles.eye,
                    eyeStyle,
                    {
                      width: sizeConfig.eyeSize,
                      height: sizeConfig.eyeSize,
                      borderRadius: sizeConfig.eyeSize / 2,
                      backgroundColor: emotionColor,
                      shadowColor: emotionColor,
                      shadowRadius: sizeConfig.eyeSize * 2,
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.eye,
                    eyeStyle,
                    {
                      width: sizeConfig.eyeSize,
                      height: sizeConfig.eyeSize,
                      borderRadius: sizeConfig.eyeSize / 2,
                      backgroundColor: emotionColor,
                      shadowColor: emotionColor,
                      shadowRadius: sizeConfig.eyeSize * 2,
                    },
                  ]}
                />
              </View>

              {/* Mouth - animated line (neutral color) */}
              <Animated.View
                style={[
                  styles.mouth,
                  mouthStyle,
                  {
                    backgroundColor: '#4A4A4A',
                    shadowColor: '#4A4A4A',
                  },
                ]}
              />
            </View>

            {/* Hair/Hat Overlay */}
            {hairDimensions && (
              <HairOverlayView
                overlay={silhouetteConfig.hairOverlay!}
                dimensions={hairDimensions}
                themeColor={characterTheme?.primary}
              />
            )}
          </Animated.View>

          {/* Neck */}
          <View
            style={[
              styles.neck,
              {
                width: sizeConfig.neckWidth,
                height: sizeConfig.neckHeight,
              },
            ]}
          >
            <LinearGradient
              colors={['#0A0A0A', '#080808']}
              style={StyleSheet.absoluteFill}
            />
          </View>

          {/* Shoulders and torso */}
          <View
            style={[
              styles.torso,
              {
                width: sizeConfig.shoulderWidth,
                height: sizeConfig.torsoHeight,
                borderTopLeftRadius: silhouetteConfig.shoulderRounding,
                borderTopRightRadius: silhouetteConfig.shoulderRounding,
              },
            ]}
          >
            <LinearGradient
              colors={['#0F0F0F', '#080808', '#050505']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />

            {/* Inner glow on torso - very subtle */}
            <Animated.View
              style={[
                styles.torsoGlow,
                innerGlowStyle,
                { backgroundColor: emotionGlow, opacity: 0.02 },
              ]}
            />
          </View>
        </Animated.View>

        {/* Speaking indicator ring - subtle neutral */}
        {speaking && (
          <View
            style={[
              styles.speakingRing,
              {
                width: sizeConfig.auraSize + 16,
                height: sizeConfig.auraSize * 1.3 + 16,
                borderRadius: sizeConfig.auraSize / 2,
                borderColor: 'rgba(201, 169, 97, 0.3)',
              },
            ]}
          />
        )}
      </Animated.View>

      {/* Character name - neutral styling (can be hidden via showName prop) */}
      {showName && (
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.name,
              {
                color: speaking ? colors.accent : colors.primary,
                textShadowColor: speaking ? 'rgba(201, 169, 97, 0.5)' : 'transparent',
                textShadowRadius: speaking ? 6 : 0,
              },
            ]}
            numberOfLines={1}
          >
            {character.name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  aura: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
  },
  bodyContainer: {
    alignItems: 'center',
    transformOrigin: 'bottom',
  },
  headContainer: {
    zIndex: 2,
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  innerGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
  },
  eyesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -12,
  },
  eye: {
    shadowOffset: { width: 0, height: 0 },
  },
  mouth: {
    marginTop: 8,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  neck: {
    marginTop: -4,
    zIndex: 1,
    overflow: 'hidden',
  },
  torso: {
    marginTop: -6,
    // borderTopLeftRadius and borderTopRightRadius set dynamically by silhouette config
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  torsoGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  speakingRing: {
    position: 'absolute',
    borderWidth: 1.5,
    opacity: 0.5,
  },
  nameContainer: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  name: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    textShadowOffset: { width: 0, height: 0 },
  },
});
