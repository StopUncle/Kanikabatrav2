// AtmosphereLayer - Master component that combines all immersion effects
// Wraps scene content and provides unified control

import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ScreenShake, ScreenShakeRef, SHAKE_PRESETS } from './ScreenShake';
import { DynamicBlur, BlurOverlay, BLUR_PRESETS } from './DynamicBlur';
import { DangerVignette } from './DangerVignette';
import { MoodParticles, MoodType } from './MoodParticles';
import { CharacterTheme } from '../../../lib/immersion/characterThemes';
import { immersiveHaptics, HapticPattern } from '../../../lib/immersion/hapticPatterns';

interface AtmosphereLayerProps {
  children: React.ReactNode;

  // Effect states
  particles?: MoodType | null;
  particleIntensity?: number;
  vignette?: boolean;
  blur?: number;
  blurTint?: 'dark' | 'light' | 'default';
  controlScore?: number;
  characterTheme?: CharacterTheme;

  // Global toggles
  effectsEnabled?: boolean;

  style?: ViewStyle;
}

export interface AtmosphereLayerRef {
  // Shake triggers
  shake: (preset: keyof typeof SHAKE_PRESETS) => void;
  stopShake: () => void;

  // Haptic triggers
  haptic: (pattern: HapticPattern) => Promise<void>;

  // Story moment helpers
  onManipulationDetected: () => Promise<void>;
  onRedFlagRevealed: () => Promise<void>;
  onOptimalChoice: () => Promise<void>;
  onTrapChoice: () => Promise<void>;
  onColdMoment: () => Promise<void>;
  onShock: () => Promise<void>;
  onIntimateMessage: () => Promise<void>;
  onVictory: () => Promise<void>;
  onDefeat: () => Promise<void>;
}

export const AtmosphereLayer = forwardRef<AtmosphereLayerRef, AtmosphereLayerProps>(
  (
    {
      children,
      particles = null,
      particleIntensity = 1,
      vignette = true,
      blur = 0,
      blurTint = 'dark',
      controlScore = 0,
      characterTheme,
      effectsEnabled = true,
      style,
    },
    ref
  ) => {
    const shakeRef = useRef<ScreenShakeRef>(null);

    // Shake methods
    const shake = useCallback((preset: keyof typeof SHAKE_PRESETS) => {
      if (!effectsEnabled) return;
      shakeRef.current?.shake(preset);
    }, [effectsEnabled]);

    const stopShake = useCallback(() => {
      shakeRef.current?.stop();
    }, []);

    // Haptic wrapper
    const haptic = useCallback(
      async (pattern: HapticPattern) => {
        if (!effectsEnabled) return;
        await immersiveHaptics[pattern]?.();
      },
      [effectsEnabled]
    );

    // Story moment helpers - combine shake + haptic
    const onManipulationDetected = useCallback(async () => {
      if (!effectsEnabled) return;
      shake('revelation');
      await immersiveHaptics.manipulationDetected();
    }, [effectsEnabled, shake]);

    const onRedFlagRevealed = useCallback(async () => {
      if (!effectsEnabled) return;
      shake('impact');
      await immersiveHaptics.redFlagRevealed();
    }, [effectsEnabled, shake]);

    const onOptimalChoice = useCallback(async () => {
      if (!effectsEnabled) return;
      await immersiveHaptics.optimalChoice();
    }, [effectsEnabled]);

    const onTrapChoice = useCallback(async () => {
      if (!effectsEnabled) return;
      shake('impact');
      await immersiveHaptics.trapChoice();
    }, [effectsEnabled, shake]);

    const onColdMoment = useCallback(async () => {
      if (!effectsEnabled) return;
      shake('threat');
      await immersiveHaptics.coldMoment();
    }, [effectsEnabled, shake]);

    const onShock = useCallback(async () => {
      if (!effectsEnabled) return;
      shake('shock');
      await immersiveHaptics.shock();
    }, [effectsEnabled, shake]);

    const onIntimateMessage = useCallback(async () => {
      if (!effectsEnabled) return;
      await immersiveHaptics.intimate();
    }, [effectsEnabled]);

    const onVictory = useCallback(async () => {
      if (!effectsEnabled) return;
      shake('victory');
      await immersiveHaptics.victory();
    }, [effectsEnabled, shake]);

    const onDefeat = useCallback(async () => {
      if (!effectsEnabled) return;
      shake('defeat');
      await immersiveHaptics.trapChoice();
    }, [effectsEnabled, shake]);

    useImperativeHandle(
      ref,
      () => ({
        shake,
        stopShake,
        haptic,
        onManipulationDetected,
        onRedFlagRevealed,
        onOptimalChoice,
        onTrapChoice,
        onColdMoment,
        onShock,
        onIntimateMessage,
        onVictory,
        onDefeat,
      }),
      [
        shake,
        stopShake,
        haptic,
        onManipulationDetected,
        onRedFlagRevealed,
        onOptimalChoice,
        onTrapChoice,
        onColdMoment,
        onShock,
        onIntimateMessage,
        onVictory,
        onDefeat,
      ]
    );

    return (
      <View style={[styles.container, style]}>
        <ScreenShake ref={shakeRef}>
          {/* Main content */}
          {children}

          {/* Blur overlay */}
          {effectsEnabled && blur > 0 && (
            <BlurOverlay intensity={blur} tint={blurTint} visible={blur > 0} />
          )}

          {/* Mood particles */}
          {effectsEnabled && (
            <MoodParticles
              mood={particles}
              intensity={particleIntensity}
              enabled={effectsEnabled}
            />
          )}

          {/* Danger vignette */}
          {effectsEnabled && vignette && (
            <DangerVignette
              controlScore={controlScore}
              characterTheme={characterTheme}
              enabled={vignette}
            />
          )}
        </ScreenShake>
      </View>
    );
  }
);

AtmosphereLayer.displayName = 'AtmosphereLayer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AtmosphereLayer;
