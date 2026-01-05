// TacticSimulatorScene - New tactic-based gameplay UI
// Replaces dialogue choices with 2x2 tactic grid and intelligence panels
// Enhanced with immersion toolkit: atmosphere effects, haptics, character themes

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, StatusBar, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, glass } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import {
  useSimulatorStore,
  selectCurrentDialogLine,
  selectIsEnding,
  selectLastNPCLine,
} from '../../stores/simulatorStore';
import { SceneBackground } from './SceneBackground';
import { SpeechBubble } from './SpeechBubble';
import { CharacterPortrait } from './CharacterPortrait';
import { CharacterCard } from './CharacterCard';
import { YourReadPanel } from './YourReadPanel';
import { TacticGrid } from './TacticGrid';
import { ExecutionReveal } from './ExecutionReveal';
import { ControlMeter } from './ControlMeter';
import { MoodIndicator } from './MoodIndicator';
import { AtmosphereLayer, AtmosphereLayerRef, MoodType } from './effects';
import { useImmersion, getCharacterTheme } from '../../lib/immersion';
import type { BackgroundId, TacticChoice, CharacterProfile, YourRead, Character } from '../../content/simulator';
import type { TacticScene } from '../../content/simulator/scenarios/dating/types';

interface TacticSimulatorSceneProps {
  onComplete: () => void;
  onExit: () => void;
  characterProfiles?: Record<string, CharacterProfile>;
}

type Phase = 'dialog' | 'intel' | 'choice' | 'execution' | 'feedback';

export function TacticSimulatorScene({
  onComplete,
  onExit,
  characterProfiles = {},
}: TacticSimulatorSceneProps) {
  const insets = useSafeAreaInsets();

  // Immersion toolkit
  const immersion = useImmersion();
  const [lastDelta, setLastDelta] = useState(0);

  // Local state for tactic UI flow
  const [phase, setPhase] = useState<Phase>('dialog');
  const [selectedTactic, setSelectedTactic] = useState<TacticChoice | null>(null);
  const [controlScore, setControlScore] = useState(0);

  // Animation values
  const sceneFade = useSharedValue(1);
  const contentSlide = useSharedValue(0);

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
  } = useSimulatorStore();

  const currentDialogLine = useSimulatorStore(selectCurrentDialogLine);
  const isEnding = useSimulatorStore(selectIsEnding);
  const lastNPCLine = useSimulatorStore(selectLastNPCLine);

  // Cast to TacticScene for type safety
  const tacticScene = currentScene as TacticScene | undefined;

  // Get active character profile
  const activeCharacter = tacticScene?.activeCharacterId
    ? characterProfiles[tacticScene.activeCharacterId]
    : null;

  // Get YourRead data
  const yourRead = tacticScene?.yourRead;

  // Get the current speaking character for portrait
  const speakingCharacter: Character | null = currentDialogLine?.speakerId
    ? activeScenario?.characters.find(c => c.id === currentDialogLine.speakerId) || null
    : null;

  // Get character theme for active character
  const characterTheme = activeCharacter?.personalityType
    ? getCharacterTheme(activeCharacter.personalityType)
    : undefined;

  // Get mood particles based on scene context
  const getMoodFromScene = useCallback((): MoodType | null => {
    if (!currentScene) return null;

    // Use scene's explicit mood if set (from immersion toolkit)
    if (currentScene.mood) {
      return currentScene.mood as MoodType;
    }

    const bgId = currentScene.backgroundId;
    // Override based on extreme control scores
    if (controlScore < -40) return 'danger';
    if (controlScore > 40) return 'peaceful';

    // Fallback based on background
    if (bgId === 'bar' || bgId === 'club') return 'party';
    if (bgId === 'bedroom' || bgId === 'restaurant') return 'romantic';
    return 'professional';
  }, [currentScene, controlScore]);

  // Update immersion when character changes
  useEffect(() => {
    if (activeCharacter?.personalityType) {
      immersion.setCharacterTheme(activeCharacter.personalityType);
    }
  }, [activeCharacter?.personalityType, immersion]);

  // Trigger immersion effects on scene entry
  useEffect(() => {
    if (!currentScene) return;

    // Trigger shake on entry if specified
    if (currentScene.shakeOnEntry) {
      immersion.triggerShake(currentScene.shakeOnEntry);
    }

    // Trigger special immersion effects
    if (currentScene.immersionTrigger) {
      const trigger = currentScene.immersionTrigger;
      switch (trigger) {
        case 'manipulation-detected':
          immersion.onManipulationDetected();
          break;
        case 'red-flag-revealed':
          immersion.onRedFlagRevealed();
          break;
        case 'cold-moment':
          immersion.onColdMoment();
          break;
        case 'intimate-moment':
          immersion.onIntimateMessage();
          break;
        case 'shock':
          immersion.onShock();
          break;
        case 'victory':
          immersion.onVictory();
          break;
        case 'defeat':
          immersion.onDefeat();
          break;
      }
    }
  }, [currentScene?.id, immersion]);

  // Update immersion control score
  useEffect(() => {
    immersion.setControlScore(controlScore);
  }, [controlScore, immersion]);

  // Update control score from scene
  useEffect(() => {
    if (tacticScene?.controlScore !== undefined) {
      const newScore = tacticScene.controlScore;
      const delta = newScore - controlScore;
      setControlScore(newScore);
      if (delta !== 0) {
        setLastDelta(delta);
      }
    }
  }, [tacticScene?.controlScore]);

  // Transition to intel phase when choices should show
  useEffect(() => {
    if (showingChoices && phase === 'dialog') {
      setPhase('intel');
    }
  }, [showingChoices, phase]);

  // Handle dialog tap
  const handleTap = useCallback(() => {
    if (phase === 'dialog' && !isTransitioning) {
      sceneFade.value = withSequence(
        withTiming(0.7, { duration: 100 }),
        withTiming(1, { duration: 150 })
      );
      advanceDialog();
    }
  }, [advanceDialog, isTransitioning, phase, sceneFade]);

  // Handle intel phase continue
  const handleIntelContinue = useCallback(() => {
    haptics.light();
    setPhase('choice');
  }, []);

  // Handle tactic selection
  const handleTacticSelect = useCallback(async (tactic: TacticChoice) => {
    haptics.medium();
    setSelectedTactic(tactic);
    setPhase('execution');

    // Trigger immersive feedback based on choice quality
    if (tactic.isOptimal) {
      await immersion.onOptimalChoice();
    } else if (tactic.controlDelta < -10) {
      await immersion.onTrapChoice();
    }
  }, [immersion]);

  // Handle execution continue
  const handleExecutionContinue = useCallback(async () => {
    if (!selectedTactic) return;

    haptics.light();

    // Track delta for display
    const delta = selectedTactic.controlDelta;
    setLastDelta(delta);

    // Update control score
    const newScore = Math.max(-100, Math.min(100, controlScore + delta));
    setControlScore(newScore);

    // Trigger immersion effects based on control change
    await immersion.onControlChange(delta, newScore);

    // Make the choice in the store (converts TacticChoice to Choice)
    await makeChoice({
      id: selectedTactic.id,
      text: selectedTactic.execution,
      nextSceneId: selectedTactic.nextSceneId,
      isOptimal: selectedTactic.isOptimal,
      xpBonus: selectedTactic.xpBonus,
      feedback: selectedTactic.feedback,
    });

    // Reset for next scene
    setSelectedTactic(null);
    setPhase('dialog');
  }, [selectedTactic, makeChoice, controlScore, immersion]);

  // Handle ending completion
  const handleEndingComplete = useCallback(async () => {
    const analysis = await completeScenario();
    if (analysis) {
      if (controlScore > 30) {
        await immersion.onVictory();
      } else if (controlScore < -30) {
        await immersion.onDefeat();
      }
      haptics.success();
      onComplete();
    }
  }, [completeScenario, onComplete, controlScore, immersion]);

  // Handle exit
  const handleExit = useCallback(() => {
    haptics.light();
    onExit();
  }, [onExit]);

  // Animated styles
  const sceneStyle = useAnimatedStyle(() => ({
    opacity: sceneFade.value,
  }));

  // Guard
  if (!activeScenario || !currentScene) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <AtmosphereLayer
        ref={immersion.atmosphereRef}
        particles={getMoodFromScene()}
        particleIntensity={0.5}
        vignette={true}
        controlScore={controlScore}
        characterTheme={characterTheme}
        effectsEnabled={true}
      >
        <Animated.View style={[styles.sceneWrapper, sceneStyle]}>
          <SceneBackground backgroundId={currentScene.backgroundId as BackgroundId}>
          {/* Top bar */}
          <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
            <Pressable
              onPress={handleExit}
              style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
            >
              <X size={24} color={colors.primary} />
            </Pressable>

            <Text style={styles.scenarioTitle} numberOfLines={1}>
              {activeScenario.title}
            </Text>

            {/* Control meter in header */}
            <View style={styles.headerMeter}>
              <ControlMeter score={controlScore} showLabel={false} compact animated={false} />
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            {/* PHASE: Dialog */}
            {phase === 'dialog' && (
              <Pressable style={styles.dialogPhase} onPress={handleTap}>
                {/* Character Portrait - Silhouette with glowing eyes */}
                {speakingCharacter && speakingCharacter.id !== 'inner-voice' && (
                  <View style={styles.portraitContainer}>
                    <CharacterPortrait
                      character={speakingCharacter}
                      emotion={currentDialogLine?.emotion || speakingCharacter.defaultEmotion}
                      speaking={!isDialogComplete}
                      size="large"
                      personalityType={speakingCharacter.personalityType}
                      visible={true}
                    />
                  </View>
                )}

                {/* NPC Speech */}
                {currentDialogLine && (
                  <View style={styles.speechContainer}>
                    <SpeechBubble
                      line={currentDialogLine}
                      characters={activeScenario.characters}
                      onComplete={() => {}}
                      onTap={handleTap}
                      isComplete={isDialogComplete}
                    />
                  </View>
                )}

                {/* Control meter - prominent at bottom */}
                <View style={styles.controlMeterContainer}>
                  <Text style={styles.controlMeterLabel}>FRAME CONTROL</Text>
                  <ControlMeter
                    score={controlScore}
                    showLabel={false}
                    animated
                    tugOfWar={true}
                    characterTheme={characterTheme}
                    showDelta={true}
                    lastDelta={lastDelta}
                  />
                </View>

                {/* Tap hint */}
                {isDialogComplete && !showingChoices && (
                  <View style={styles.tapHint}>
                    <Text style={styles.tapHintText}>Tap to continue</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* PHASE: Intel - Show YourRead panel */}
            {phase === 'intel' && yourRead && (
              <ScrollView style={styles.intelPhase} contentContainerStyle={styles.intelContent}>
                {/* Character Portrait + Card combo */}
                {speakingCharacter && speakingCharacter.id !== 'inner-voice' && (
                  <View style={styles.intelPortrait}>
                    <CharacterPortrait
                      character={speakingCharacter}
                      emotion={currentDialogLine?.emotion || speakingCharacter.defaultEmotion}
                      speaking={false}
                      size="medium"
                      personalityType={speakingCharacter.personalityType}
                      visible={true}
                    />
                  </View>
                )}

                {/* Character intel card */}
                {activeCharacter && (
                  <CharacterCard profile={activeCharacter} showWeakness />
                )}

                {/* Your Read panel */}
                <YourReadPanel read={yourRead} />

                {/* Last NPC line for context */}
                {lastNPCLine && (
                  <View style={styles.contextBubble}>
                    <Text style={styles.contextLabel}>THEY SAID:</Text>
                    <Text style={styles.contextText}>"{lastNPCLine.text}"</Text>
                  </View>
                )}

                {/* Continue button */}
                <Pressable
                  style={styles.continueButton}
                  onPress={handleIntelContinue}
                >
                  <Text style={styles.continueButtonText}>CHOOSE YOUR TACTIC</Text>
                </Pressable>
              </ScrollView>
            )}

            {/* PHASE: Choice - Show TacticGrid */}
            {phase === 'choice' && tacticScene?.tacticChoices && (
              <View style={styles.choicePhase}>
                {/* Compact character reminder */}
                {activeCharacter && (
                  <CharacterCard profile={activeCharacter} compact />
                )}

                {/* Context reminder */}
                {lastNPCLine && (
                  <View style={styles.contextMini}>
                    <Text style={styles.contextMiniText} numberOfLines={2}>
                      "{lastNPCLine.text}"
                    </Text>
                  </View>
                )}

                {/* Tactic grid */}
                <TacticGrid
                  tactics={tacticScene.tacticChoices}
                  onSelect={handleTacticSelect}
                  disabled={false}
                />
              </View>
            )}

            {/* PHASE: Execution - Show result */}
            {phase === 'execution' && selectedTactic && (
              <ScrollView
                style={styles.executionPhase}
                contentContainerStyle={styles.executionContent}
              >
                <ExecutionReveal
                  tacticUsed={selectedTactic.tactic}
                  execution={selectedTactic.execution}
                  innerVoice={selectedTactic.innerVoice}
                  controlDelta={selectedTactic.controlDelta}
                  feedback={selectedTactic.feedback}
                  onContinue={handleExecutionContinue}
                />
              </ScrollView>
            )}
          </View>

          {/* Ending screen */}
          {isEnding && isDialogComplete && (
            <View style={styles.endingContainer}>
              <View style={styles.endingCard}>
                <Text style={styles.endingTitle}>
                  {currentScene.endingTitle || 'Scenario Complete'}
                </Text>
                <Text style={styles.endingSummary}>
                  {currentScene.endingSummary || "You've reached the end."}
                </Text>

                {/* Final control score */}
                <View style={styles.finalScore}>
                  <Text style={styles.finalScoreLabel}>FINAL CONTROL</Text>
                  <ControlMeter score={controlScore} showLabel animated={false} />
                </View>

                <Pressable
                  onPress={handleEndingComplete}
                  style={styles.resultsButton}
                >
                  <Text style={styles.resultsButtonText}>See Results</Text>
                </Pressable>
              </View>
            </View>
          )}
        </SceneBackground>
      </Animated.View>
      </AtmosphereLayer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sceneWrapper: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    zIndex: 100,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  iconButtonPressed: {
    opacity: 0.7,
  },
  scenarioTitle: {
    flex: 1,
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.secondary,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  headerMeter: {
    width: 100,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  // Dialog phase
  dialogPhase: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  portraitContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  speechContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  controlMeterContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  controlMeterLabel: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.tertiary,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  tapHint: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tapHintText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    fontStyle: 'italic',
  },
  // Intel phase
  intelPhase: {
    flex: 1,
  },
  intelContent: {
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  intelPortrait: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  contextBubble: {
    ...glass.light,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
  },
  contextLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  contextText: {
    fontSize: typography.md,
    color: colors.primary,
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  continueButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.bold,
    color: colors.background,
    letterSpacing: 1,
  },
  // Choice phase
  choicePhase: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  contextMini: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  contextMiniText: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Execution phase
  executionPhase: {
    flex: 1,
  },
  executionContent: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  // Ending
  endingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  endingCard: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
  },
  endingTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
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
  finalScore: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  finalScoreLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  resultsButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
  },
  resultsButtonText: {
    fontSize: typography.md,
    fontWeight: typography.bold,
    color: colors.background,
  },
});

export default TacticSimulatorScene;
