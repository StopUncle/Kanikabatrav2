// useImmersion - Central hook for controlling all immersion effects
// Provides unified API for triggering effects from story events

import { useRef, useCallback, useState, useMemo } from 'react';
import type { AtmosphereLayerRef } from '../../components/simulator/effects/AtmosphereLayer';
import type { MoodType } from '../../components/simulator/effects/MoodParticles';
import type { InnerVoiceEmotion } from '../../components/simulator/effects/InnerVoiceFloat';
import { getCharacterTheme, CharacterTheme, PersonalityCategory } from './characterThemes';
import { getTypingPattern, TypingPattern, TypingPatternType } from './typingPatterns';
import { getCharacterAnimation, CharacterAnimation, EntryAnimation, ExitAnimation } from './characterAnimations';
import { immersiveHaptics, HapticPattern } from './hapticPatterns';
import { SHAKE_PRESETS } from '../../components/simulator/effects/ScreenShake';

export interface ImmersionState {
  // Current effect states
  particles: MoodType | null;
  particleIntensity: number;
  blur: number;
  blurTint: 'dark' | 'light' | 'default';
  vignette: boolean;
  controlScore: number;
  characterTheme: CharacterTheme | undefined;

  // Derived from character
  typingPattern: TypingPattern | null;
  characterAnimation: CharacterAnimation | null;
}

export interface UseImmersionReturn {
  // Ref to pass to AtmosphereLayer
  atmosphereRef: React.RefObject<AtmosphereLayerRef | null>;

  // Current state for AtmosphereLayer props
  state: ImmersionState;

  // State setters
  setParticles: (mood: MoodType | null, intensity?: number) => void;
  setBlur: (intensity: number, tint?: 'dark' | 'light' | 'default') => void;
  setVignette: (enabled: boolean) => void;
  setControlScore: (score: number) => void;
  setCharacterTheme: (personalityType: string | PersonalityCategory | null) => void;

  // Effect triggers (via ref)
  triggerShake: (preset: keyof typeof SHAKE_PRESETS) => void;
  triggerHaptic: (pattern: HapticPattern) => Promise<void>;

  // Story event helpers (combine multiple effects)
  onManipulationDetected: () => Promise<void>;
  onRedFlagRevealed: () => Promise<void>;
  onOptimalChoice: () => Promise<void>;
  onTrapChoice: () => Promise<void>;
  onControlChange: (delta: number, currentScore: number) => Promise<void>;
  onColdMoment: () => Promise<void>;
  onIntimateMessage: () => Promise<void>;
  onShock: () => Promise<void>;
  onVictory: () => Promise<void>;
  onDefeat: () => Promise<void>;
  onCharacterEnter: (personalityType: string) => void;
  onCharacterExit: () => void;
  onSceneTransition: (mood?: MoodType) => void;

  // Utilities
  getTypingPatternForCharacter: (personalityType: string) => TypingPattern;
  getAnimationForCharacter: (personalityType: string) => CharacterAnimation;
  getInnerVoiceEmotion: (controlScore: number) => InnerVoiceEmotion;
}

export function useImmersion(): UseImmersionReturn {
  const atmosphereRef = useRef<AtmosphereLayerRef>(null);

  // State
  const [particles, setParticlesState] = useState<MoodType | null>(null);
  const [particleIntensity, setParticleIntensity] = useState(1);
  const [blur, setBlurState] = useState(0);
  const [blurTint, setBlurTint] = useState<'dark' | 'light' | 'default'>('dark');
  const [vignette, setVignetteState] = useState(true);
  const [controlScore, setControlScoreState] = useState(0);
  const [characterTheme, setCharacterThemeState] = useState<CharacterTheme | undefined>(undefined);
  const [typingPattern, setTypingPattern] = useState<TypingPattern | null>(null);
  const [characterAnimation, setCharacterAnimation] = useState<CharacterAnimation | null>(null);

  // Memoized state object
  const state = useMemo<ImmersionState>(
    () => ({
      particles,
      particleIntensity,
      blur,
      blurTint,
      vignette,
      controlScore,
      characterTheme,
      typingPattern,
      characterAnimation,
    }),
    [particles, particleIntensity, blur, blurTint, vignette, controlScore, characterTheme, typingPattern, characterAnimation]
  );

  // State setters
  const setParticles = useCallback((mood: MoodType | null, intensity = 1) => {
    setParticlesState(mood);
    setParticleIntensity(intensity);
  }, []);

  const setBlur = useCallback((intensity: number, tint: 'dark' | 'light' | 'default' = 'dark') => {
    setBlurState(intensity);
    setBlurTint(tint);
  }, []);

  const setVignette = useCallback((enabled: boolean) => {
    setVignetteState(enabled);
  }, []);

  const setControlScore = useCallback((score: number) => {
    setControlScoreState(Math.max(-100, Math.min(100, score)));
  }, []);

  const setCharacterTheme = useCallback((personalityType: string | PersonalityCategory | null) => {
    if (!personalityType) {
      setCharacterThemeState(undefined);
      setTypingPattern(null);
      setCharacterAnimation(null);
      return;
    }
    setCharacterThemeState(getCharacterTheme(personalityType));
    setTypingPattern(getTypingPattern(personalityType));
    setCharacterAnimation(getCharacterAnimation(personalityType));
  }, []);

  // Effect triggers
  const triggerShake = useCallback((preset: keyof typeof SHAKE_PRESETS) => {
    atmosphereRef.current?.shake(preset);
  }, []);

  const triggerHaptic = useCallback(async (pattern: HapticPattern) => {
    await atmosphereRef.current?.haptic(pattern);
  }, []);

  // Story event helpers
  const onManipulationDetected = useCallback(async () => {
    await atmosphereRef.current?.onManipulationDetected();
    setParticlesState('tense');
  }, []);

  const onRedFlagRevealed = useCallback(async () => {
    await atmosphereRef.current?.onRedFlagRevealed();
  }, []);

  const onOptimalChoice = useCallback(async () => {
    await atmosphereRef.current?.onOptimalChoice();
  }, []);

  const onTrapChoice = useCallback(async () => {
    await atmosphereRef.current?.onTrapChoice();
    setParticlesState('danger');
  }, []);

  const onControlChange = useCallback(
    async (delta: number, currentScore: number) => {
      setControlScore(currentScore);

      if (delta > 0) {
        await immersiveHaptics.controlGained(delta);
      } else if (delta < 0) {
        await immersiveHaptics.controlLost(Math.abs(delta));
        if (currentScore < -30) {
          triggerShake('threat');
        }
      }
    },
    [setControlScore, triggerShake]
  );

  const onColdMoment = useCallback(async () => {
    await atmosphereRef.current?.onColdMoment();
    setBlurState(8);
    setTimeout(() => setBlurState(0), 1500);
  }, []);

  const onIntimateMessage = useCallback(async () => {
    await atmosphereRef.current?.onIntimateMessage();
    setBlurState(12);
    setParticlesState('romantic');
  }, []);

  const onShock = useCallback(async () => {
    await atmosphereRef.current?.onShock();
  }, []);

  const onVictory = useCallback(async () => {
    await atmosphereRef.current?.onVictory();
    setParticlesState('party');
  }, []);

  const onDefeat = useCallback(async () => {
    await atmosphereRef.current?.onDefeat();
    setParticlesState('danger');
    setBlurState(15);
  }, []);

  const onCharacterEnter = useCallback(
    (personalityType: string) => {
      setCharacterTheme(personalityType);

      // Set appropriate mood particles
      const theme = getCharacterTheme(personalityType);
      if (theme.danger) {
        setParticles('mysterious', 0.5);
      } else if (theme.id === 'friend' || theme.id === 'healthy') {
        setParticles('peaceful', 0.3);
      }
    },
    [setCharacterTheme, setParticles]
  );

  const onCharacterExit = useCallback(() => {
    setCharacterTheme(null);
    setParticles(null);
    setBlur(0);
  }, [setCharacterTheme, setParticles, setBlur]);

  const onSceneTransition = useCallback(
    (mood?: MoodType) => {
      triggerHaptic('sceneTransition');
      if (mood) {
        setParticles(mood);
      }
    },
    [triggerHaptic, setParticles]
  );

  // Utilities
  const getTypingPatternForCharacter = useCallback((personalityType: string) => {
    return getTypingPattern(personalityType);
  }, []);

  const getAnimationForCharacter = useCallback((personalityType: string) => {
    return getCharacterAnimation(personalityType);
  }, []);

  const getInnerVoiceEmotion = useCallback((score: number): InnerVoiceEmotion => {
    if (score >= 50) return 'confident';
    if (score >= 20) return 'knowing';
    if (score >= -20) return 'neutral';
    if (score >= -50) return 'doubtful';
    return 'warning';
  }, []);

  return {
    atmosphereRef,
    state,
    setParticles,
    setBlur,
    setVignette,
    setControlScore,
    setCharacterTheme,
    triggerShake,
    triggerHaptic,
    onManipulationDetected,
    onRedFlagRevealed,
    onOptimalChoice,
    onTrapChoice,
    onControlChange,
    onColdMoment,
    onIntimateMessage,
    onShock,
    onVictory,
    onDefeat,
    onCharacterEnter,
    onCharacterExit,
    onSceneTransition,
    getTypingPatternForCharacter,
    getAnimationForCharacter,
    getInnerVoiceEmotion,
  };
}

export default useImmersion;
