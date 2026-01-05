// Simulator Scene Component - Visual Novel Style
// Based on test-visuals approach with continuous dialogue flow
import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { ChevronLeft, MapPin } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import {
  useSimulatorStore,
  selectCurrentDialogLine,
  selectIsEnding,
  selectInnerVoiceForChoices,
  selectLastNPCLine,
  selectLastSpeakerId,
} from '../../stores/simulatorStore';
import { useSimulatorSettings } from '../../stores/settingsStore';
import { SceneBackground } from './SceneBackground';
import { CharacterPortrait } from './CharacterPortrait';
import { MoodParticles, type MoodType } from './effects/MoodParticles';
import { DangerVignette } from './effects/DangerVignette';
import { ScreenShake, type ScreenShakeRef } from './effects/ScreenShake';
import { immersiveHaptics } from '../../lib/immersion/hapticPatterns';
import { getDisplayLabel, getShortLabel, getCharacterTheme } from '../../lib/immersion/characterThemes';
import type { BackgroundId, Choice, Character, EmotionType } from '../../content/simulator';

// ============================================
// CONSTANTS
// ============================================

// Map scene moods to MoodParticles moods
const MOOD_TO_PARTICLES: Record<string, MoodType> = {
  romantic: 'romantic',
  tense: 'tense',
  party: 'party',
  professional: 'professional',
  mysterious: 'mysterious',
  peaceful: 'peaceful',
};

// Character accent colors for visual differentiation
const CHARACTER_COLORS: Record<string, string> = {
  maris: '#7F1D1D', // Dark red for psychopath
  taylor: '#4169E1',
  casey: '#98FB98',
  jordan: '#FFD700',
  alex: '#FF8C00',
  riley: '#FF69B4',
  sam: '#87CEEB',
  // Professional scenarios
  marcus: '#8B0000',
  jennifer: '#4169E1',
  david: '#FFD700',
  sarah: '#FF69B4',
  michael: '#FF8C00',
};

// Attitude calculation
type AttitudeLevel = 'unknown' | 'hostile' | 'cold' | 'guarded' | 'neutral' | 'curious' | 'warming' | 'friendly' | 'trusting';

const ATTITUDE_DISPLAY: Record<AttitudeLevel, { text: string; color: string }> = {
  unknown: { text: 'Reading you...', color: colors.tertiary },
  hostile: { text: 'Sees you as a threat', color: '#FF4444' },
  cold: { text: 'Dismissive', color: '#6699CC' },
  guarded: { text: 'Wary of you', color: '#AA8866' },
  neutral: { text: 'Sizing you up', color: colors.secondary },
  curious: { text: 'Curious about you', color: '#88AA88' },
  warming: { text: 'Warming up to you', color: '#DDAA55' },
  friendly: { text: 'Sees you as an ally', color: '#66BB66' },
  trusting: { text: 'Trusts you', color: '#44DD88' },
};

function calculateAttitude(sceneIndex: number, characterId: string): AttitudeLevel {
  // Simple calculation based on scene progression
  if (sceneIndex < 2) return 'unknown';
  if (sceneIndex < 4) return 'neutral';
  if (sceneIndex < 6) return 'curious';
  if (sceneIndex < 8) return 'warming';
  return 'friendly';
}

// ============================================
// COMPONENT
// ============================================

interface SimulatorSceneProps {
  onComplete: () => void;
  onExit: () => void;
}

export function SimulatorScene({ onComplete, onExit }: SimulatorSceneProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const simulatorSettings = useSimulatorSettings();
  const innerVoiceEnabled = simulatorSettings?.innerVoiceEnabled ?? true;

  // Refs
  const prevSpeakerId = useRef<string | null>(null);
  const screenShakeRef = useRef<ScreenShakeRef>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  // Local state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [charactersMet, setCharactersMet] = useState<Set<string>>(new Set());

  // Animation values
  const sceneFade = useSharedValue(1);
  const characterX = useSharedValue(0);
  const characterOpacity = useSharedValue(1);
  const dialogueOpacity = useSharedValue(1);
  const choicesOpacity = useSharedValue(0);
  const feedbackOpacity = useSharedValue(0);

  // Store state
  const {
    activeScenario,
    currentScene,
    showingChoices,
    isDialogComplete,
    isTransitioning,
    lastChoiceFeedback,
    advanceDialog,
    makeChoice,
    dismissFeedback,
    completeScenario,
    currentDialogIndex,
  } = useSimulatorStore();

  const currentDialogLine = useSimulatorStore(selectCurrentDialogLine);
  const isEnding = useSimulatorStore(selectIsEnding);
  const innerVoiceForChoices = useSimulatorStore(selectInnerVoiceForChoices);
  const lastNPCLine = useSimulatorStore(selectLastNPCLine);
  const lastSpeakerId = useSimulatorStore(selectLastSpeakerId);

  // Derived state
  const isInnerVoiceSpeaking =
    currentDialogLine?.speakerId === 'inner-voice' ||
    currentDialogLine?.speakerId === 'inner';

  const currentSpeakerId = currentDialogLine?.speakerId;
  const displaySpeakerId = (currentSpeakerId && currentSpeakerId !== 'inner-voice' && currentSpeakerId !== 'inner')
    ? currentSpeakerId
    : lastSpeakerId;

  const currentSpeaker = displaySpeakerId
    ? activeScenario?.characters.find((c) => c.id === displaySpeakerId)
    : null;

  const fullText = currentDialogLine?.text || '';

  // Get scene mood for particles
  const sceneMood = (currentScene as any)?.mood || 'mysterious';
  const particleMood = MOOD_TO_PARTICLES[sceneMood] || 'mysterious';
  const controlScore = sceneMood === 'tense' ? -30 : sceneMood === 'mysterious' ? -10 : 20;

  // Characters present in current scene
  const charactersPresent = activeScenario?.characters || [];

  // ============================================
  // EFFECTS
  // ============================================

  // Character transition animation
  useEffect(() => {
    const newSpeakerId = displaySpeakerId || null;

    if (prevSpeakerId.current !== newSpeakerId && prevSpeakerId.current !== null && newSpeakerId !== null) {
      // Cancel any running character animations first
      cancelAnimation(characterOpacity);
      cancelAnimation(characterX);

      // Character crossfade - faster, tighter timing
      characterOpacity.value = withSequence(
        withTiming(0, { duration: 100 }),
        withTiming(1, { duration: 150 })
      );
      characterX.value = withSequence(
        withTiming(-15, { duration: 100, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) })
      );
    } else if (newSpeakerId && !prevSpeakerId.current) {
      // Fade in from right - faster entrance
      cancelAnimation(characterOpacity);
      cancelAnimation(characterX);
      characterOpacity.value = 0;
      characterX.value = 25;
      characterOpacity.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) });
      characterX.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
    }

    prevSpeakerId.current = newSpeakerId;

    // Mark character as met
    if (newSpeakerId && !charactersMet.has(newSpeakerId)) {
      setCharactersMet(prev => new Set([...prev, newSpeakerId]));
    }

    // Cleanup: cancel animations when effect re-runs
    return () => {
      cancelAnimation(characterOpacity);
      cancelAnimation(characterX);
    };
  }, [displaySpeakerId]);

  // Typewriter effect
  useEffect(() => {
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
    }

    if (fullText.length > 0) {
      setDisplayedText(fullText.charAt(0));
      setIsTyping(true);

      screenShakeRef.current?.stop();

      // Haptics based on emotion
      if (currentDialogLine?.emotion) {
        switch (currentDialogLine.emotion) {
          case 'cold':
            immersiveHaptics.coldMoment();
            if (fullText.toLowerCase().includes('destroy') || fullText.toLowerCase().includes('threat')) {
              screenShakeRef.current?.shake('threat');
            }
            break;
          case 'seductive':
            immersiveHaptics.intimate();
            screenShakeRef.current?.shake('heartbeat');
            break;
          case 'angry':
            immersiveHaptics.dangerEscalation();
            screenShakeRef.current?.shake('impact');
            break;
          case 'happy':
            immersiveHaptics.victory();
            break;
          case 'sad':
            screenShakeRef.current?.shake('defeat');
            break;
          case 'confused':
            immersiveHaptics.heartRacing();
            screenShakeRef.current?.shake('nervousness');
            break;
          case 'smirking':
            screenShakeRef.current?.shake('revelation');
            break;
        }
      }
    } else {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    let charIndex = 1;
    const typeSpeed = 25;

    typewriterRef.current = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        if (typewriterRef.current) {
          clearInterval(typewriterRef.current);
        }
        setIsTyping(false);
      }
    }, typeSpeed);

    return () => {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
      }
    };
  }, [fullText, currentDialogIndex]);

  // Choices fade animation - synchronized timing to prevent blank screen
  useEffect(() => {
    if (showingChoices) {
      // Dialogue fades out first
      dialogueOpacity.value = withTiming(0, { duration: 120 });
      // Choices fade in with delay (starts at 80ms, overlapping slightly for smoothness)
      choicesOpacity.value = withDelay(80, withTiming(1, { duration: 200 }));
    } else {
      // Choices fade out first
      choicesOpacity.value = withTiming(0, { duration: 120 });
      // Dialogue fades back in with delay
      dialogueOpacity.value = withDelay(80, withTiming(1, { duration: 180 }));
    }
  }, [showingChoices]);

  // Feedback fade animation
  useEffect(() => {
    if (lastChoiceFeedback) {
      feedbackOpacity.value = withTiming(1, { duration: 250 });
    } else {
      feedbackOpacity.value = withTiming(0, { duration: 150 });
    }
  }, [lastChoiceFeedback]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleTap = useCallback(() => {
    haptics.light();

    if (isTransitioning && lastChoiceFeedback) {
      dismissFeedback();
      return;
    }

    if (showingChoices) return;

    // Skip typewriter if still typing
    if (isTyping) {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
      }
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    // Cancel any running animations before advancing
    cancelAnimation(dialogueOpacity);
    cancelAnimation(sceneFade);

    // Fade out dialogue FIRST, then advance, then fade back in
    // This prevents the flash of new text
    dialogueOpacity.value = withTiming(0, { duration: 80, easing: Easing.out(Easing.ease) });

    // Delay the state change until fade out completes
    setTimeout(() => {
      advanceDialog();
      // Fade dialogue back in after state updates
      dialogueOpacity.value = withTiming(1, { duration: 120, easing: Easing.in(Easing.ease) });
    }, 80);
  }, [advanceDialog, isTransitioning, showingChoices, isTyping, fullText, lastChoiceFeedback, dismissFeedback, dialogueOpacity, sceneFade]);

  const handleChoice = useCallback(async (choice: Choice) => {
    if (choice.isOptimal) {
      await immersiveHaptics.optimalChoice();
    } else if (choice.feedback?.includes('TRAP')) {
      await immersiveHaptics.trapChoice();
    } else {
      await immersiveHaptics.choiceSelect();
    }

    sceneFade.value = withTiming(0.5, { duration: 200 });
    await makeChoice(choice);
    sceneFade.value = withTiming(1, { duration: 300 });
  }, [makeChoice]);

  const handleEndingComplete = useCallback(async () => {
    const analysis = await completeScenario();
    if (analysis) {
      haptics.success();
      onComplete();
    }
  }, [completeScenario, onComplete]);

  const handleExit = useCallback(() => {
    haptics.light();
    screenShakeRef.current?.stop();
    onExit();
  }, [onExit]);

  // ============================================
  // ANIMATED STYLES
  // ============================================

  const sceneStyle = useAnimatedStyle(() => ({
    opacity: sceneFade.value,
  }));

  const characterStyle = useAnimatedStyle(() => ({
    opacity: characterOpacity.value,
    transform: [{ translateX: characterX.value }],
  }));

  const dialogueStyle = useAnimatedStyle(() => ({
    opacity: dialogueOpacity.value,
  }));

  const choicesStyle = useAnimatedStyle(() => ({
    opacity: choicesOpacity.value,
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    opacity: feedbackOpacity.value,
  }));

  // ============================================
  // HELPERS
  // ============================================

  const getDialogueStyle = () => {
    if (!currentDialogLine) return styles.narrationText;
    if (isInnerVoiceSpeaking) return styles.innerVoiceText;
    if (currentDialogLine.speakerId) return styles.speechText;
    return styles.narrationText;
  };

  const getCharacterColor = (charId: string) => {
    return CHARACTER_COLORS[charId] || colors.accent;
  };

  // ============================================
  // RENDER
  // ============================================

  if (!activeScenario || !currentScene) {
    return null;
  }

  return (
    <SceneBackground backgroundId={currentScene.backgroundId as BackgroundId}>
      <ScreenShake ref={screenShakeRef}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <StatusBar barStyle="light-content" />

          {/* Atmospheric particles */}
          <MoodParticles mood={particleMood} intensity={0.7} />

          {/* Danger vignette for tense scenes */}
          <DangerVignette controlScore={controlScore} enabled={sceneMood === 'tense'} />

          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleExit} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.primary} />
            </Pressable>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle} numberOfLines={1}>{activeScenario.title}</Text>
              <View style={styles.locationBadge}>
                <MapPin size={12} color={colors.accent} />
                <Text style={styles.locationText}>{currentScene.backgroundId}</Text>
              </View>
            </View>
            <View style={styles.backButton} />
          </View>

          {/* Main Content */}
          <Pressable style={styles.content} onPress={handleTap}>
            <Animated.View style={[styles.sceneContent, sceneStyle]}>
              {/* Character Presence Strip - Left Side */}
              <View style={styles.presenceStrip}>
                {charactersPresent.slice(0, 4).map((char) => {
                  const isSpeaking = displaySpeakerId === char.id;
                  const charColor = getCharacterColor(char.id);
                  const hasMet = charactersMet.has(char.id);

                  return (
                    <View
                      key={char.id}
                      style={[
                        styles.presenceItem,
                        isSpeaking && styles.presenceItemActive,
                      ]}
                    >
                      <View style={styles.presenceSilhouette}>
                        <CharacterPortrait
                          character={char}
                          emotion={isSpeaking ? currentDialogLine?.emotion : char.defaultEmotion}
                          size="small"
                          speaking={isSpeaking && isTyping}
                          showName={false}
                        />
                      </View>
                      {isSpeaking && (
                        <View style={[styles.speakingGlow, { backgroundColor: charColor + '40' }]} />
                      )}
                      {!isSpeaking && (
                        <>
                          <Text style={styles.presenceName}>
                            {hasMet ? char.name : '???'}
                          </Text>
                          <Text style={[
                            styles.presenceTypeLabel,
                            { color: getCharacterTheme(char.personalityType || 'neutral').primary }
                          ]}>
                            {getShortLabel(char.personalityType || 'neutral')}
                          </Text>
                        </>
                      )}
                    </View>
                  );
                })}
              </View>

              {/* Gender & Attitude Indicator - Top Right */}
              {currentSpeaker && (
                <View style={styles.attitudeContainer}>
                  {currentSpeaker.gender && (
                    <View style={styles.genderBox}>
                      <Text style={[
                        styles.genderText,
                        { color: currentSpeaker.gender === 'female' ? '#FF69B4' : currentSpeaker.gender === 'male' ? '#4A90D9' : colors.secondary }
                      ]}>
                        {currentSpeaker.gender === 'female' ? '♀' : currentSpeaker.gender === 'male' ? '♂' : '⚧'}
                        {' '}
                        {currentSpeaker.gender.charAt(0).toUpperCase() + currentSpeaker.gender.slice(1)}
                      </Text>
                    </View>
                  )}
                  {(() => {
                    const attitude = calculateAttitude(currentDialogIndex || 0, currentSpeaker.id);
                    const display = ATTITUDE_DISPLAY[attitude];
                    return (
                      <View style={styles.attitudeBox}>
                        <Text style={[styles.attitudeText, { color: display.color }]}>
                          {display.text}
                        </Text>
                      </View>
                    );
                  })()}
                </View>
              )}

              {/* Portrait Section */}
              <View style={styles.portraitSection}>
                {/* Player Card - Top Right */}
                <View style={styles.playerCard}>
                  <View style={styles.playerCardHeader}>
                    <Text style={styles.playerCardIcon}>👤</Text>
                    <Text style={styles.playerCardTitle}>YOU</Text>
                  </View>
                  <View style={styles.playerCardStats}>
                    <Text style={styles.playerCardStat}>{charactersMet.size} met</Text>
                  </View>
                </View>

                {/* Character Portrait */}
                {currentSpeaker ? (
                  <Animated.View style={[styles.portraitContainer, characterStyle]}>
                    <View style={[
                      styles.characterGlow,
                      { backgroundColor: getCharacterColor(currentSpeaker.id) + '30' }
                    ]} />
                    <View style={styles.portraitFrame}>
                      <CharacterPortrait
                        character={currentSpeaker}
                        emotion={currentDialogLine?.emotion || currentSpeaker.defaultEmotion}
                        size="large"
                        speaking={isTyping}
                        showName={false}
                      />
                    </View>
                    {/* Name with type badge */}
                    <View style={styles.nameContainer}>
                      <Text style={[styles.speakerName, { color: getCharacterColor(currentSpeaker.id) }]}>
                        {charactersMet.has(currentSpeaker.id) ? currentSpeaker.name : '???'}
                      </Text>
                      <View style={[
                        styles.typeBadge,
                        { backgroundColor: getCharacterTheme(currentSpeaker.personalityType || 'neutral').primary + '25' }
                      ]}>
                        <Text style={[
                          styles.typeText,
                          { color: getCharacterTheme(currentSpeaker.personalityType || 'neutral').primary }
                        ]}>
                          {getDisplayLabel(currentSpeaker.personalityType || 'neutral')}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                ) : (
                  <View style={styles.portraitPlaceholder} />
                )}
              </View>

              {/* Dialogue Box */}
              {!showingChoices && !lastChoiceFeedback && !(isEnding && isDialogComplete) && (
                <Animated.View style={[
                  styles.dialogueBox,
                  dialogueStyle,
                  currentSpeaker && {
                    borderLeftWidth: 3,
                    borderLeftColor: getCharacterColor(currentSpeaker.id),
                  },
                  isInnerVoiceSpeaking && {
                    borderLeftWidth: 3,
                    borderLeftColor: '#B19CD9',
                  },
                ]}>
                  <Text style={getDialogueStyle()}>
                    {displayedText}
                  </Text>
                  {!isTyping && (
                    <Text style={styles.tapHint}>▼</Text>
                  )}
                </Animated.View>
              )}

              {/* Spacer */}
              <View style={styles.spacer} />

              {/* Choices */}
              {showingChoices && currentScene.choices && !isTransitioning && (
                <Animated.View style={choicesStyle}>
                  {/* Context - what the NPC just said */}
                  {lastNPCLine && (
                    <View style={styles.contextBox}>
                      <Text style={styles.contextText} numberOfLines={2}>
                        {lastNPCLine.text}
                      </Text>
                    </View>
                  )}

                  {/* Inner voice - uses same opacity animation as choices */}
                  {innerVoiceEnabled && innerVoiceForChoices && (
                    <Animated.View style={[styles.innerVoiceBox, choicesStyle]}>
                      <Text style={styles.innerVoiceBoxText}>{innerVoiceForChoices}</Text>
                    </Animated.View>
                  )}

                  {/* Choice buttons */}
                  <ScrollView
                    style={styles.choicesScroll}
                    contentContainerStyle={styles.choicesContainer}
                    showsVerticalScrollIndicator={false}
                  >
                    {currentScene.choices.map((choice) => (
                      <Pressable
                        key={choice.id}
                        style={({ pressed }) => [
                          styles.choiceButton,
                          pressed && styles.choicePressed,
                        ]}
                        onPress={() => handleChoice(choice)}
                      >
                        <Text style={styles.choiceText}>{choice.text}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}

              {/* Feedback */}
              {lastChoiceFeedback && (
                <Animated.View style={[
                  styles.feedbackBox,
                  feedbackStyle,
                  lastChoiceFeedback.includes('OPTIMAL') && styles.feedbackOptimal,
                ]}>
                  <Text style={styles.feedbackText}>{lastChoiceFeedback}</Text>
                  <Text style={styles.tapHint}>▼</Text>
                </Animated.View>
              )}

              {/* Ending */}
              {isEnding && isDialogComplete && (
                <View style={[styles.endingContainer, { paddingBottom: insets.bottom + spacing.md }]}>
                  <View style={styles.endingCard}>
                    <Text style={styles.endingTitle}>{currentScene.endingTitle || 'Scenario Complete'}</Text>
                    <Text style={styles.endingSummary}>
                      {currentScene.endingSummary || 'You\'ve reached the end of this scenario.'}
                    </Text>
                    <Pressable
                      onPress={handleEndingComplete}
                      style={({ pressed }) => [
                        styles.continueButton,
                        pressed && styles.continueButtonPressed,
                      ]}
                    >
                      <Text style={styles.continueButtonText}>See Results</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Animated.View>
          </Pressable>
        </View>
      </ScreenShake>
    </SceneBackground>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  headerContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold as any,
    color: colors.primary,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 2,
  },
  locationText: {
    fontSize: typography.xs,
    color: colors.secondary,
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  sceneContent: {
    flex: 1,
  },
  presenceStrip: {
    position: 'absolute',
    left: spacing.xs,
    top: 40,
    width: 52,
    gap: spacing.xs,
    zIndex: 5,
  },
  presenceItem: {
    alignItems: 'center',
    padding: spacing.xs,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    opacity: 0.6,
  },
  presenceItemActive: {
    opacity: 1,
    backgroundColor: colors.surfaceElevated,
  },
  presenceSilhouette: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 20,
  },
  speakingGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: borderRadius.md + 2,
    zIndex: -1,
  },
  presenceName: {
    fontSize: 9,
    color: colors.tertiary,
    marginTop: 2,
    textAlign: 'center',
  },
  presenceTypeLabel: {
    fontSize: 7,
    fontWeight: '600',
    marginTop: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  attitudeContainer: {
    position: 'absolute',
    top: spacing.xs,
    right: 0,
    zIndex: 10,
  },
  attitudeBox: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  attitudeText: {
    fontSize: typography.xs,
    fontStyle: 'italic',
  },
  genderBox: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  genderText: {
    fontSize: typography.xs,
    color: colors.secondary,
    textAlign: 'center',
  },
  portraitSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  playerCard: {
    position: 'absolute',
    right: 0,
    top: 30,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 70,
  },
  playerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  playerCardIcon: {
    fontSize: 14,
  },
  playerCardTitle: {
    fontSize: typography.xs,
    fontWeight: typography.bold as any,
    color: colors.primary,
  },
  playerCardStats: {
    gap: 2,
  },
  playerCardStat: {
    fontSize: 10,
    color: colors.tertiary,
  },
  portraitContainer: {
    alignItems: 'center',
  },
  portraitPlaceholder: {
    height: 160,
  },
  portraitFrame: {
    borderRadius: 80,
    padding: 4,
  },
  characterGlow: {
    position: 'absolute',
    top: -10,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.6,
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  speakerName: {
    fontSize: typography.md,
    fontWeight: typography.semibold as any,
  },
  typeBadge: {
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    fontSize: typography.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dialogueBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.md,
    minHeight: 100,
    zIndex: 10,
  },
  narrationText: {
    fontSize: 16,
    color: '#CCCCCC',
    fontStyle: 'italic',
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  speechText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  innerVoiceText: {
    fontSize: 15,
    color: '#B19CD9',
    fontStyle: 'italic',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  tapHint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  spacer: {
    flex: 1,
  },
  contextBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  contextText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  innerVoiceBox: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  innerVoiceBoxText: {
    fontSize: typography.sm,
    color: '#B19CD9',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: typography.sm * 1.5,
  },
  choicesScroll: {
    maxHeight: 280,
  },
  choicesContainer: {
    gap: spacing.sm,
  },
  choiceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  choicePressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  choiceText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
  },
  feedbackBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  feedbackOptimal: {
    borderColor: 'rgba(76, 175, 80, 0.5)',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  feedbackText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  endingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  endingCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
  },
  endingTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold as any,
    color: colors.accent,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  endingSummary: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.md * 1.5,
  },
  continueButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
  },
  continueButtonPressed: {
    opacity: 0.9,
  },
  continueButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold as any,
    color: colors.background,
  },
});
