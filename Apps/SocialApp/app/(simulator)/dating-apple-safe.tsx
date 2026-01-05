// Apple Safe Dating Simulator - Full Version
// Uses exact same CSS and gameplay as Android, with defensive content
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Shield,
  Clock,
  Lock,
  CheckCircle,
  Play,
  Zap,
  Trophy,
  Star,
  GraduationCap,
  Users,
  MapPin,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  glass,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { CharacterPortrait } from '../../components/simulator/CharacterPortrait';
import { SceneBackground } from '../../components/simulator/SceneBackground';
import { MoodParticles, type MoodType } from '../../components/simulator/effects/MoodParticles';
import { DangerVignette } from '../../components/simulator/effects/DangerVignette';
import { ScreenShake, type ScreenShakeRef } from '../../components/simulator/effects/ScreenShake';
import { getDisplayLabel, getShortLabel, getCharacterTheme } from '../../lib/immersion/characterThemes';
import { LevelCard, type StoryLevel } from '../../components/simulator/LevelCard';
import { MissionCard as StoryMissionCard, type Mission as StoryMission } from '../../components/simulator/MissionCard';
import type { Character, BackgroundId, Scene as BaseScene, SceneEndingType, Difficulty } from '../../content/simulator/types';
import type { ForkScene } from '../../content/simulator/types';

// Import Level 1 - University
import {
  partyPathScenes,
  studyPathScenes,
  levelMetadata as level1Metadata,
  characters as level1Characters,
} from '../../content/simulator/scenarios/dating-apple-safe/level-1-university';

// Import Level 2 - Social Scene
import {
  level2Scenarios,
  level2SecretScenario,
  levelMetadata as level2Metadata,
  characters as level2Characters,
} from '../../content/simulator/scenarios/dating-apple-safe/level-2-social-scene';

import type { MissionRewards, LevelId } from '../../content/simulator/scenarios/dating-apple-safe/types';

const APPLE_SAFE_PROGRESS_KEY = '@dark_mirror_apple_safe_progress';

type ViewMode = 'levels' | 'playing';

// Level theme colors matching Android
const LEVEL_COLORS: Record<LevelId, { primary: string; bg: string }> = {
  university: { primary: '#4CAF50', bg: 'rgba(76, 175, 80, 0.15)' },
  'social-scene': { primary: '#2196F3', bg: 'rgba(33, 150, 243, 0.15)' },
  gala: { primary: '#9C27B0', bg: 'rgba(156, 39, 176, 0.15)' },
  escalation: { primary: '#FF5722', bg: 'rgba(255, 87, 34, 0.15)' },
  'private-island': { primary: '#C9A961', bg: 'rgba(201, 169, 97, 0.15)' },
};

// Character accent colors
const CHARACTER_COLORS: Record<string, string> = {
  maris: '#8B0000',
  casey: '#98FB98',
  alex: '#FF8C00',
  riley: '#FF69B4',
  jordan: '#FFD700',
  taylor: '#4169E1',
  sam: '#87CEEB',
  jamie: '#22C55E',
  quinn: '#F59E0B',
  avery: '#EC4899',
  drew: '#8B5CF6',
  skyler: '#7F1D1D',
  blake: '#4169E1',
  aristocrat: '#9C27B0',
  connector: '#DC2626',
  'inner-voice': '#B19CD9',
};

// Map scene moods to MoodParticles moods
const MOOD_TO_PARTICLES: Record<string, MoodType> = {
  romantic: 'romantic',
  tense: 'tense',
  party: 'party',
  professional: 'professional',
  mysterious: 'mysterious',
  peaceful: 'peaceful',
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
  if (sceneIndex < 2) return 'unknown';
  if (sceneIndex < 4) return 'neutral';
  if (sceneIndex < 6) return 'curious';
  if (sceneIndex < 8) return 'warming';
  return 'friendly';
}

// Level 1 missions (built from fork scenes)
interface Level1Mission {
  id: string;
  missionNumber: number;
  title: string;
  tagline: string;
  objective: string;
  estimatedMinutes: number;
  scenes: ForkScene[];
  startSceneId: string;
  rewards: MissionRewards;
  isSecret?: boolean;
}

const level1Missions: Level1Mission[] = [
  {
    id: 'party-path',
    missionNumber: 1,
    title: 'Party Path',
    tagline: 'The Maris Encounter',
    objective: 'Learn to recognize narcissistic manipulation patterns at an elite party.',
    estimatedMinutes: 12,
    scenes: partyPathScenes,
    startSceneId: 'party-arrival',
    rewards: { power: 15, mask: 10, vision: 15 },
  },
  {
    id: 'study-path',
    missionNumber: 2,
    title: 'Study Path',
    tagline: 'The Casey Encounter',
    objective: 'Understand anxious attachment patterns at the library.',
    estimatedMinutes: 10,
    scenes: studyPathScenes,
    startSceneId: 'study-hall-arrival',
    rewards: { power: 10, mask: 15, vision: 15 },
  },
];

// Unified mission format
interface UnifiedMission {
  id: string;
  levelId: LevelId;
  missionNumber: number;
  title: string;
  tagline: string;
  objective: string;
  estimatedMinutes: number;
  rewards: MissionRewards;
  isSecret?: boolean;
  scenesL1?: ForkScene[];
  scenesL2?: BaseScene[];
  startSceneId: string;
  characters: Character[];
}

// Build unified mission list
function buildUnifiedMissions(): { university: UnifiedMission[]; 'social-scene': UnifiedMission[] } {
  const universityMissions: UnifiedMission[] = level1Missions.map((m) => ({
    id: m.id,
    levelId: 'university' as LevelId,
    missionNumber: m.missionNumber,
    title: m.title,
    tagline: m.tagline,
    objective: m.objective,
    estimatedMinutes: m.estimatedMinutes,
    rewards: m.rewards,
    isSecret: m.isSecret,
    scenesL1: m.scenes,
    startSceneId: m.startSceneId,
    characters: level1Characters,
  }));

  const socialSceneMissions: UnifiedMission[] = level2Scenarios.map((s) => ({
    id: s.id,
    levelId: 'social-scene' as LevelId,
    missionNumber: s.missionNumber,
    title: s.title,
    tagline: s.tagline,
    objective: s.objective,
    estimatedMinutes: s.estimatedMinutes,
    rewards: s.rewards,
    isSecret: false,
    scenesL2: s.scenes,
    startSceneId: s.startSceneId,
    characters: level2Characters,
  }));

  if (level2SecretScenario) {
    socialSceneMissions.push({
      id: level2SecretScenario.id,
      levelId: 'social-scene' as LevelId,
      missionNumber: 99,
      title: level2SecretScenario.title,
      tagline: level2SecretScenario.tagline,
      objective: level2SecretScenario.objective,
      estimatedMinutes: level2SecretScenario.estimatedMinutes,
      rewards: level2SecretScenario.rewards,
      isSecret: true,
      scenesL2: level2SecretScenario.scenes,
      startSceneId: level2SecretScenario.startSceneId,
      characters: level2Characters,
    });
  }

  return {
    university: universityMissions,
    'social-scene': socialSceneMissions,
  };
}

const MISSIONS = buildUnifiedMissions();

interface LevelInfo {
  id: LevelId;
  name: string;
  description: string;
  icon: typeof GraduationCap;
  missions: UnifiedMission[];
  secretMission?: UnifiedMission;
}

const LEVELS: LevelInfo[] = [
  {
    id: 'university',
    name: level1Metadata.name,
    description: level1Metadata.description,
    icon: GraduationCap,
    missions: MISSIONS.university.filter((m) => !m.isSecret),
    secretMission: MISSIONS.university.find((m) => m.isSecret),
  },
  {
    id: 'social-scene',
    name: level2Metadata.name,
    description: level2Metadata.description,
    icon: Users,
    missions: MISSIONS['social-scene'].filter((m) => !m.isSecret),
    secretMission: MISSIONS['social-scene'].find((m) => m.isSecret),
  },
];

// Flat progression for Android-style layout
type AppleProgressionType = 'level' | 'mission';

interface AppleLevelItem {
  type: 'level';
  id: string;
  number: number;
  title: string;
  subtitle: string;
  scenes: number | null;
  color: string;
  missionRef: UnifiedMission | null;
  requiresCompletion: string | null;
}

interface AppleMissionItem {
  type: 'mission';
  id: string;
  number: string;
  title: string;
  duration: string;
  difficulty: Difficulty;
  missionRef: UnifiedMission;
  requiresCompletion: string | null;
}

type AppleProgressionItem = AppleLevelItem | AppleMissionItem;

const APPLE_SAFE_PROGRESSION: AppleProgressionItem[] = [
  // Level 1: University
  {
    type: 'level',
    id: 'level-university',
    number: 1,
    title: level1Metadata.name,
    subtitle: level1Metadata.description,
    scenes: 30,
    color: LEVEL_COLORS.university.primary,
    missionRef: null,
    requiresCompletion: null,
  },
  // Mission 1.1: Party Path
  {
    type: 'mission',
    id: 'mission-1-1',
    number: '1.1',
    title: 'Party Path',
    duration: '12 min',
    difficulty: 'beginner' as Difficulty,
    missionRef: MISSIONS.university[0],
    requiresCompletion: null,
  },
  // Mission 1.2: Study Path
  {
    type: 'mission',
    id: 'mission-1-2',
    number: '1.2',
    title: 'Study Path',
    duration: '10 min',
    difficulty: 'beginner' as Difficulty,
    missionRef: MISSIONS.university[1],
    requiresCompletion: 'mission-1-1',
  },
  // Level 2: Social Scene
  {
    type: 'level',
    id: 'level-social-scene',
    number: 2,
    title: level2Metadata.name,
    subtitle: level2Metadata.description,
    scenes: 45,
    color: LEVEL_COLORS['social-scene'].primary,
    missionRef: null,
    requiresCompletion: 'mission-1-2',
  },
  // Add Level 2 missions dynamically
  ...MISSIONS['social-scene']
    .filter((m) => !m.isSecret)
    .map((m, idx) => ({
      type: 'mission' as const,
      id: `mission-2-${idx + 1}`,
      number: `2.${idx + 1}`,
      title: m.title,
      duration: `${m.estimatedMinutes} min`,
      difficulty: (idx < 2 ? 'beginner' : idx < 4 ? 'intermediate' : 'advanced') as Difficulty,
      missionRef: m,
      requiresCompletion: idx === 0 ? 'level-social-scene' : `mission-2-${idx}`,
    })),
];

function isAppleLevelItem(item: AppleProgressionItem): item is AppleLevelItem {
  return item.type === 'level';
}

function isAppleMissionItem(item: AppleProgressionItem): item is AppleMissionItem {
  return item.type === 'mission';
}

export default function AppleSafeDatingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('levels');
  const [expandedLevel, setExpandedLevel] = useState<LevelId | null>('university');
  const [completedMissions, setCompletedMissions] = useState<Record<string, SceneEndingType>>({});

  // Playing state
  const [activeMission, setActiveMission] = useState<UnifiedMission | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState<string>('');
  const [dialogIndex, setDialogIndex] = useState(0);
  const [showingChoices, setShowingChoices] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [isEnding, setIsEnding] = useState(false);

  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  const prevSpeakerId = useRef<string | null>(null);
  const lastNpcSpeakerId = useRef<string | null>(null);

  // Visual effects state
  const [charactersMet, setCharactersMet] = useState<Set<string>>(new Set());
  const screenShakeRef = useRef<ScreenShakeRef>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animation values
  const sceneFade = useSharedValue(1);
  const dialogueOpacity = useSharedValue(1);
  const choicesOpacity = useSharedValue(0);
  const feedbackOpacity = useSharedValue(0);
  const characterX = useSharedValue(0);        // Character slide position
  const characterOpacity = useSharedValue(1);  // Character fade
  const endingOpacity = useSharedValue(0);     // Ending card fade

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const stored = await AsyncStorage.getItem(APPLE_SAFE_PROGRESS_KEY);
        if (stored) {
          setCompletedMissions(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading apple safe progress:', error);
      }
    };
    void loadProgress();
  }, []);

  // Get current scene
  const currentScene = useMemo(() => {
    if (!activeMission) return null;
    if (activeMission.scenesL1) {
      return activeMission.scenesL1.find((s) => s.id === currentSceneId) || null;
    } else if (activeMission.scenesL2) {
      return activeMission.scenesL2.find((s) => s.id === currentSceneId) || null;
    }
    return null;
  }, [activeMission, currentSceneId]);

  // Get current dialog line
  const currentDialogLine = useMemo(() => {
    if (!currentScene || !currentScene.dialog) return null;
    return currentScene.dialog[dialogIndex] || null;
  }, [currentScene, dialogIndex]);

  const fullText = currentDialogLine?.text || '';

  // Is inner voice speaking?
  const isInnerVoiceSpeaking = currentDialogLine?.speakerId === 'inner-voice' || currentDialogLine?.speakerId === 'inner';

  // Track last NPC speaker for display during narration
  const currentSpeakerId = currentDialogLine?.speakerId;

  // Update lastNpcSpeakerId when an NPC speaks
  useEffect(() => {
    if (currentSpeakerId && currentSpeakerId !== 'inner-voice' && currentSpeakerId !== 'inner' && currentSpeakerId !== 'player') {
      lastNpcSpeakerId.current = currentSpeakerId;
    }
  }, [currentSpeakerId]);

  // Display speaker ID: current NPC speaker, or fall back to last NPC speaker during narration/inner-voice
  const displaySpeakerId = (currentSpeakerId && currentSpeakerId !== 'inner-voice' && currentSpeakerId !== 'inner' && currentSpeakerId !== 'player')
    ? currentSpeakerId
    : lastNpcSpeakerId.current;

  // Get speaking character using displaySpeakerId (persists during narration)
  const speakingCharacter = useMemo(() => {
    if (!displaySpeakerId || !activeMission) return null;
    return activeMission.characters.find((c) => c.id === displaySpeakerId) || null;
  }, [displaySpeakerId, activeMission]);

  // Speaker change animation - slide/fade when character changes
  useEffect(() => {
    if (!speakingCharacter) return;

    const isNewCharacter = prevSpeakerId.current !== speakingCharacter.id;
    const wasNoOne = !prevSpeakerId.current;

    if (isNewCharacter && !wasNoOne) {
      // Cancel running animations to prevent conflicts
      cancelAnimation(characterOpacity);
      cancelAnimation(characterX);

      // Crossfade with slide - smooth speaker transition
      characterOpacity.value = withSequence(
        withTiming(0, { duration: 100 }),
        withTiming(1, { duration: 150 })
      );
      characterX.value = withSequence(
        withTiming(-15, { duration: 100, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) })
      );
    } else if (wasNoOne) {
      // First character entry - slide in from right
      characterOpacity.value = 0;
      characterX.value = 25;
      characterOpacity.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) });
      characterX.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
    }

    prevSpeakerId.current = speakingCharacter.id;
  }, [speakingCharacter?.id]);  // Don't include shared values - causes re-render loops

  const getCharacterColor = (charId: string) => {
    return CHARACTER_COLORS[charId] || colors.accent;
  };

  // Characters present in current mission
  const charactersPresent = useMemo(() => {
    if (!activeMission) return [];
    // Filter out player and inner-voice, keep only NPCs
    return activeMission.characters.filter(
      (c) => c.id !== 'player' && c.id !== 'inner-voice' && c.id !== 'inner'
    );
  }, [activeMission]);

  // Get character theme for visual effects
  const characterTheme = useMemo(() => {
    if (!speakingCharacter) return null;
    return getCharacterTheme(speakingCharacter.personalityType || 'neutral');
  }, [speakingCharacter]);

  // Track when characters speak (for presence strip name reveal)
  useEffect(() => {
    if (speakingCharacter && !charactersMet.has(speakingCharacter.id)) {
      setCharactersMet((prev) => new Set([...prev, speakingCharacter.id]));
    }
  }, [speakingCharacter]);

  // Reset speaker refs when mission changes to prevent ghost characters
  useEffect(() => {
    if (activeMission) {
      lastNpcSpeakerId.current = null;
      prevSpeakerId.current = null;
      setCharactersMet(new Set());
    }
  }, [activeMission?.id]);

  // Trigger screen shake on emotion changes
  useEffect(() => {
    if (!currentDialogLine?.emotion || !screenShakeRef.current) return;
    const emotion = currentDialogLine.emotion;

    if (emotion === 'angry') {
      screenShakeRef.current.shake('impact');
    } else if (emotion === 'cold') {
      screenShakeRef.current.shake('threat');
    } else if (emotion === 'seductive') {
      screenShakeRef.current.shake('heartbeat');
    } else if (emotion === 'confused') {
      screenShakeRef.current.shake('nervousness');
    } else if (emotion === 'smirking' || emotion === 'knowing') {
      screenShakeRef.current.shake('revelation');
    } else if (emotion === 'sad') {
      screenShakeRef.current.shake('defeat');
    }
  }, [currentDialogLine?.emotion]);

  // NOTE: Character tracking handled by effect at line 530
  // Removed duplicate effect that was overwriting prevSpeakerId.current

  // Typewriter effect
  useEffect(() => {
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
    }

    // Stop any running screen shake before new dialogue
    screenShakeRef.current?.stop?.();

    if (fullText.length > 0) {
      setDisplayedText(fullText.charAt(0));
      setIsTyping(true);

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
    } else {
      setDisplayedText('');
      setIsTyping(false);
    }

    return () => {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
      }
    };
  }, [fullText, dialogIndex, currentSceneId]);

  // Choices fade animation - smooth crossfade between dialogue and choices (Android timing)
  useEffect(() => {
    // Cancel running animations to prevent conflicts
    cancelAnimation(dialogueOpacity);
    cancelAnimation(choicesOpacity);

    if (showingChoices) {
      dialogueOpacity.value = withTiming(0, { duration: 120 });
      choicesOpacity.value = withDelay(80, withTiming(1, { duration: 200 }));
    } else {
      choicesOpacity.value = withTiming(0, { duration: 120 });
      dialogueOpacity.value = withDelay(80, withTiming(1, { duration: 180 }));
    }
  }, [showingChoices]);  // Don't include shared values - causes re-render loops

  // Feedback fade animation
  useEffect(() => {
    cancelAnimation(feedbackOpacity);
    if (lastFeedback) {
      feedbackOpacity.value = withTiming(1, { duration: 250 });
    } else {
      feedbackOpacity.value = withTiming(0, { duration: 150 });
    }
  }, [lastFeedback]);

  // Ending card fade animation
  useEffect(() => {
    cancelAnimation(endingOpacity);
    if (isEnding) {
      endingOpacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
    } else {
      endingOpacity.value = 0;
    }
  }, [isEnding]);  // Don't include shared values

  // Save progress
  const saveProgress = useCallback(async (missionId: string, outcome: SceneEndingType) => {
    try {
      const updated = { ...completedMissions, [missionId]: outcome };
      setCompletedMissions(updated);
      await AsyncStorage.setItem(APPLE_SAFE_PROGRESS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [completedMissions]);

  const handleBack = () => {
    haptics.light();
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
    }
    // Clear feedback timeout to prevent memory leaks
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    if (viewMode === 'playing') {
      setViewMode('levels');
      setActiveMission(null);
      setCurrentSceneId('');
      setDialogIndex(0);
      setShowingChoices(false);
      setLastFeedback(null);
      setIsEnding(false);
      setDisplayedText('');
      setIsTyping(false);
    } else {
      router.replace('/(simulator)');
    }
  };

  const toggleLevel = (levelId: LevelId) => {
    haptics.light();
    setExpandedLevel(expandedLevel === levelId ? null : levelId);
  };

  const handleSelectMission = useCallback((mission: UnifiedMission) => {
    haptics.medium();
    setActiveMission(mission);
    setCurrentSceneId(mission.startSceneId);
    setDialogIndex(0);
    setShowingChoices(false);
    setLastFeedback(null);
    setIsEnding(false);
    setDisplayedText('');
    setIsTyping(false);
    prevSpeakerId.current = null;
    setViewMode('playing');
  }, []);

  const handleTap = useCallback(() => {
    haptics.light();

    // If showing feedback, dismiss it
    if (lastFeedback) {
      setLastFeedback(null);
      return;
    }

    // If showing choices, do nothing
    if (showingChoices) return;

    // If typing, skip to end
    if (isTyping) {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
      }
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    // Advance dialog
    if (!currentScene) return;

    const nextIndex = dialogIndex + 1;
    const dialogLength = currentScene.dialog?.length || 0;

    if (nextIndex < dialogLength) {
      // Smooth fade transition between dialogue lines
      cancelAnimation(dialogueOpacity);
      dialogueOpacity.value = withTiming(0, { duration: 80, easing: Easing.out(Easing.ease) });
      setTimeout(() => {
        setDialogIndex(nextIndex);
        dialogueOpacity.value = withTiming(1, { duration: 120, easing: Easing.in(Easing.ease) });
      }, 90);  // 10ms buffer after 80ms fade to prevent race
    } else {
      // Dialog complete - check what to do next
      const isL1 = activeMission?.scenesL1 != null;

      if (isL1) {
        const forkScene = currentScene as ForkScene;
        if (forkScene.dialogueChoices && forkScene.dialogueChoices.length > 0) {
          setShowingChoices(true);
        } else if (forkScene.isEnding) {
          setIsEnding(true);
        } else if (forkScene.nextSceneId) {
          transitionToScene(forkScene.nextSceneId);
        }
      } else {
        const scene = currentScene as BaseScene;
        if (scene.choices && scene.choices.length > 0) {
          setShowingChoices(true);
        } else if (scene.isEnding) {
          setIsEnding(true);
          if (activeMission && scene.outcomeType) {
            saveProgress(activeMission.id, scene.outcomeType);
          }
        } else if (scene.nextSceneId) {
          transitionToScene(scene.nextSceneId);
        }
      }
    }
  }, [currentScene, dialogIndex, isTyping, fullText, showingChoices, lastFeedback, activeMission, saveProgress]);

  const transitionToScene = useCallback((sceneId: string) => {
    // Smooth scene transition with proper fade
    sceneFade.value = withTiming(0.4, { duration: 200, easing: Easing.out(Easing.ease) });
    setTimeout(() => {
      setCurrentSceneId(sceneId);
      setDialogIndex(0);
      setShowingChoices(false);
      setDisplayedText('');     // Reset to prevent stale text flash
      setIsTyping(false);       // Reset typing state
      setLastFeedback(null);    // Clear any feedback
      sceneFade.value = withTiming(1, { duration: 280, easing: Easing.out(Easing.ease) });
    }, 200);
  }, []);

  const handleChoiceSelect = useCallback((choiceId: string, nextSceneId: string) => {
    if (!currentScene || !activeMission) return;
    haptics.medium();

    const isL1 = activeMission.scenesL1 != null;
    let feedback: string | null = null;

    if (isL1) {
      const forkScene = currentScene as ForkScene;
      const choice = forkScene.dialogueChoices?.find((c) => c.id === choiceId);
      if (choice?.reaction?.bodyLanguage) {
        feedback = choice.reaction.bodyLanguage;
      } else if (choice?.reaction?.text) {
        feedback = choice.reaction.text;
      }
    } else {
      const scene = currentScene as BaseScene;
      const choice = scene.choices?.find((c) => c.id === choiceId);
      if (choice?.feedback) {
        feedback = choice.feedback;
      }
    }

    setShowingChoices(false);

    if (feedback) {
      setLastFeedback(feedback);
      // Clear any existing timeout to prevent memory leaks
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
      feedbackTimeoutRef.current = setTimeout(() => {
        setLastFeedback(null);
        navigateAfterChoice(nextSceneId);
      }, 2000);
    } else {
      navigateAfterChoice(nextSceneId);
    }
  }, [currentScene, activeMission]);

  const navigateAfterChoice = useCallback((sceneId: string) => {
    if (!activeMission) return;

    const isL1 = activeMission.scenesL1 != null;
    let nextScene: ForkScene | BaseScene | undefined;

    if (isL1) {
      nextScene = activeMission.scenesL1?.find((s) => s.id === sceneId);
    } else {
      nextScene = activeMission.scenesL2?.find((s) => s.id === sceneId);
    }

    if (nextScene?.isEnding) {
      setCurrentSceneId(sceneId);
      setDialogIndex(0);
      setIsEnding(true);
      if (!isL1 && (nextScene as BaseScene).outcomeType) {
        saveProgress(activeMission.id, (nextScene as BaseScene).outcomeType!);
      }
    } else {
      transitionToScene(sceneId);
    }
  }, [activeMission, saveProgress, transitionToScene]);

  const handleRestart = useCallback(() => {
    haptics.medium();
    if (activeMission) {
      setCurrentSceneId(activeMission.startSceneId);
      setDialogIndex(0);
      setShowingChoices(false);
      setLastFeedback(null);
      setIsEnding(false);
      setDisplayedText('');
      setIsTyping(false);
      prevSpeakerId.current = null;
    }
  }, [activeMission]);

  const getMissionStatus = (missionId: string) => {
    const outcome = completedMissions[missionId];
    return {
      unlocked: true,
      completed: outcome != null,
      outcome,
    };
  };

  const getLevelStats = (levelId: LevelId) => {
    const level = LEVELS.find((l) => l.id === levelId);
    if (!level) return { completed: 0, total: 0 };
    const completed = level.missions.filter((m) => completedMissions[m.id] != null).length;
    return { completed, total: level.missions.length };
  };

  // Animated styles
  const sceneStyle = useAnimatedStyle(() => ({
    opacity: sceneFade.value,
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

  const characterStyle = useAnimatedStyle(() => ({
    opacity: characterOpacity.value,
    transform: [{ translateX: characterX.value }],
  }));

  const endingStyle = useAnimatedStyle(() => ({
    opacity: endingOpacity.value,
  }));

  // Get choices for current scene
  const getChoices = () => {
    if (!currentScene) return [];
    const isL1 = activeMission?.scenesL1 != null;
    if (isL1) {
      return (currentScene as ForkScene).dialogueChoices?.map((c) => ({
        id: c.id,
        text: c.text,
        nextSceneId: c.nextSceneId,
      })) || [];
    } else {
      return (currentScene as BaseScene).choices?.map((c) => ({
        id: c.id,
        text: c.text,
        nextSceneId: c.nextSceneId,
      })) || [];
    }
  };

  // Render Level Selection
  if (viewMode === 'levels') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <ChevronLeft size={24} color={colors.primary} />
          </Pressable>

          <View style={styles.headerContent}>
            <View style={styles.headerRow}>
              <Shield size={20} color="#22C55E" />
              <Text style={styles.headerTitle}>Pattern Recognition</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Defensive Dating Simulator (Apple Safe)
            </Text>
          </View>
        </View>

        {/* Story Progression - Flat Layout (Android Style) */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + spacing.xl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.storyHeader}>
              <View style={styles.storyHeaderIcon}>
                <GraduationCap size={20} color={colors.accent} />
              </View>
              <View>
                <Text style={styles.storyHeaderTitle}>Story Mode</Text>
                <Text style={styles.storyHeaderSubtitle}>
                  Navigate social dynamics through levels and missions
                </Text>
              </View>
            </View>

            {APPLE_SAFE_PROGRESSION.map((item, idx) => {
              // Check completion - for levels we check if any mission is done
              // For missions we check the specific mission
              const isCompleted = item.type === 'mission' && item.missionRef
                ? completedMissions[item.missionRef.id] != null
                : false;
              const isFailed = item.type === 'mission' && item.missionRef
                ? completedMissions[item.missionRef.id] === 'bad'
                : false;

              // Calculate unlocked state
              const isUnlocked = item.requiresCompletion === null ||
                (item.requiresCompletion.startsWith('mission-') &&
                  APPLE_SAFE_PROGRESSION.some(
                    (p) =>
                      p.id === item.requiresCompletion &&
                      p.type === 'mission' &&
                      p.missionRef &&
                      completedMissions[p.missionRef.id] != null
                  )) ||
                (item.requiresCompletion.startsWith('level-') && idx > 0);

              // Render Level Card
              if (isAppleLevelItem(item)) {
                const levelData: StoryLevel = {
                  id: item.id,
                  number: item.number,
                  title: item.title,
                  subtitle: item.subtitle,
                  scenes: item.scenes,
                  color: item.color,
                  unlocked: true, // Levels are always unlocked for display
                  scenarioId: null,
                  requiresCompletion: item.requiresCompletion || undefined,
                  comingSoon: false,
                };

                return (
                  <LevelCard
                    key={item.id}
                    level={levelData}
                    isCompleted={false}
                    onPress={() => {
                      // Level cards are informational, scroll to first mission
                      haptics.light();
                    }}
                  />
                );
              }

              // Render Mission Card
              if (isAppleMissionItem(item) && item.missionRef) {
                const missionData: StoryMission = {
                  id: item.id,
                  number: item.number,
                  title: item.title,
                  duration: item.duration,
                  difficulty: item.difficulty,
                  scenarioId: null,
                  unlocked: isUnlocked || idx < 3, // First 3 items unlocked by default
                  requiresCompletion: item.requiresCompletion || undefined,
                };

                return (
                  <StoryMissionCard
                    key={item.id}
                    mission={missionData}
                    isCompleted={isCompleted}
                    isFailed={isFailed}
                    onPress={() => {
                      if (item.missionRef) {
                        handleSelectMission(item.missionRef);
                      }
                    }}
                  />
                );
              }

              return null;
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Render Playing Mode - Full Android-style simulator
  const choices = getChoices();
  const levelColor = activeMission ? LEVEL_COLORS[activeMission.levelId]?.primary : colors.accent;

  // Determine current mood for particles
  const sceneMood = ((currentScene as any)?.mood as MoodType) || 'mysterious';
  const isDangerScene = sceneMood === 'danger' || sceneMood === 'tense';

  return (
    <SceneBackground backgroundId={(currentScene?.backgroundId as BackgroundId) || 'apartment'}>
      <MoodParticles mood={sceneMood} intensity={0.5} />
      <DangerVignette
        controlScore={isDangerScene ? 30 : 0}
        characterTheme={characterTheme ?? undefined}
        enabled={isDangerScene}
      />
      <ScreenShake ref={screenShakeRef}>
        <View style={[styles.playContainer, { paddingTop: insets.top }]}>
          <StatusBar barStyle="light-content" />

          {/* Header */}
          <View style={styles.playHeader}>
            <Pressable onPress={handleBack} style={styles.playBackButton}>
              <ChevronLeft size={24} color={colors.primary} />
            </Pressable>
            <View style={styles.playHeaderContent}>
              <Text style={styles.playHeaderTitle} numberOfLines={1}>{activeMission?.title}</Text>
              <View style={styles.locationBadge}>
                <MapPin size={12} color={colors.accent} />
                <Text style={styles.locationText}>{currentScene?.backgroundId || 'scene'}</Text>
              </View>
            </View>
            <View style={styles.playBackButton} />
          </View>

          {/* Main Content - Tappable */}
          <Pressable style={styles.playContent} onPress={handleTap}>
            <Animated.View style={[styles.sceneContent, sceneStyle]}>
              {/* Character Presence Strip - Left Side */}
              <View style={styles.presenceStrip}>
                {charactersPresent.slice(0, 4).map((char) => {
                  const isSpeaking = speakingCharacter?.id === char.id;
                  const charColor = getCharacterColor(char.id);
                  const hasMet = charactersMet.has(char.id);
                  const charTheme = getCharacterTheme(char.personalityType || 'neutral');

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
                            { color: charTheme.primary }
                          ]}>
                            {getShortLabel(char.personalityType || 'neutral')}
                          </Text>
                        </>
                      )}
                    </View>
                  );
                })}
              </View>

              {/* Attitude Container - Top Right */}
              {speakingCharacter && (
                <View style={styles.attitudeContainer}>
                  {speakingCharacter.gender && (
                    <View style={styles.genderBox}>
                      <Text style={[
                        styles.genderText,
                        { color: speakingCharacter.gender === 'female' ? '#FF69B4' : speakingCharacter.gender === 'male' ? '#4A90D9' : colors.secondary }
                      ]}>
                        {speakingCharacter.gender === 'female' ? '♀' : speakingCharacter.gender === 'male' ? '♂' : '⚧'}
                        {' '}
                        {speakingCharacter.gender.charAt(0).toUpperCase() + speakingCharacter.gender.slice(1)}
                      </Text>
                    </View>
                  )}
                  {(() => {
                    const attitude = calculateAttitude(dialogIndex || 0, speakingCharacter.id);
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

                {/* Character Portrait - with slide/fade animation */}
                {speakingCharacter ? (
                  <Animated.View style={[styles.portraitContainer, characterStyle]}>
                    <View style={[
                      styles.characterGlow,
                      { backgroundColor: getCharacterColor(speakingCharacter.id) + '30' }
                    ]} />
                    <View style={styles.portraitFrame}>
                      <CharacterPortrait
                        character={speakingCharacter}
                        emotion={currentDialogLine?.emotion || speakingCharacter.defaultEmotion}
                        size="large"
                        speaking={isTyping}
                        showName={false}
                      />
                    </View>
                    <View style={styles.nameContainer}>
                      <Text style={[styles.speakerName, { color: characterTheme?.primary || getCharacterColor(speakingCharacter.id) }]}>
                        {charactersMet.has(speakingCharacter.id) ? speakingCharacter.name : '???'}
                      </Text>
                      {characterTheme && (
                        <View style={[styles.typeBadge, { backgroundColor: characterTheme.primary + '25' }]}>
                          <Text style={[styles.typeText, { color: characterTheme.primary }]}>
                            {getDisplayLabel(speakingCharacter.personalityType || 'neutral')}
                          </Text>
                        </View>
                      )}
                    </View>
                  </Animated.View>
                ) : (
                  <View style={styles.portraitPlaceholder} />
                )}
              </View>

            {/* Dialogue Box */}
            {!showingChoices && !lastFeedback && !isEnding && currentDialogLine && (
              <Animated.View style={[
                styles.dialogueBox,
                dialogueStyle,
                {
                  borderLeftWidth: 3,
                  borderLeftColor: isInnerVoiceSpeaking
                    ? '#B19CD9'
                    : speakingCharacter
                      ? getCharacterColor(speakingCharacter.id)
                      : 'transparent',
                },
              ]}>
                <Text style={[
                  styles.dialogueText,
                  {
                    color: isInnerVoiceSpeaking
                      ? '#B19CD9'
                      : speakingCharacter
                        ? '#FFFFFF'
                        : '#CCCCCC',
                    // Italic for inner voice AND narration (no speaker)
                    fontStyle: (isInnerVoiceSpeaking || !speakingCharacter) ? 'italic' : 'normal',
                  }
                ]}>
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
            {showingChoices && choices.length > 0 && (
              <Animated.View style={choicesStyle}>
                <ScrollView
                  style={styles.choicesScroll}
                  contentContainerStyle={styles.choicesContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {choices.map((choice) => (
                    <Pressable
                      key={choice.id}
                      style={({ pressed }) => [
                        styles.choiceButton,
                        pressed && styles.choicePressed,
                      ]}
                      onPress={() => handleChoiceSelect(choice.id, choice.nextSceneId)}
                    >
                      <Text style={styles.choiceText}>{choice.text}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </Animated.View>
            )}

            {/* Feedback */}
            {lastFeedback && (
              <Animated.View style={[styles.feedbackBox, feedbackStyle]}>
                <Text style={styles.feedbackText}>{lastFeedback}</Text>
                <Text style={styles.tapHint}>▼</Text>
              </Animated.View>
            )}

            {/* Ending - with fade-in animation */}
            {isEnding && (
              <Animated.View style={[styles.endingContainer, endingStyle, { paddingBottom: insets.bottom + spacing.md }]}>
                <View style={styles.endingCard}>
                  <Text style={styles.endingTitle}>{(currentScene as any)?.endingTitle || 'Scenario Complete'}</Text>
                  <Text style={styles.endingSummary}>
                    {(currentScene as any)?.endingSummary || 'You\'ve completed this path.'}
                  </Text>
                  <Pressable
                    onPress={handleRestart}
                    style={({ pressed }) => [
                      styles.continueButton,
                      pressed && styles.continueButtonPressed,
                    ]}
                  >
                    <Text style={styles.continueButtonText}>Play Again</Text>
                  </Pressable>
                  <Pressable onPress={handleBack} style={styles.exitButtonSmall}>
                    <Text style={styles.exitButtonText}>Back to Menu</Text>
                  </Pressable>
                </View>
              </Animated.View>
            )}
          </Animated.View>
        </Pressable>
        </View>
      </ScreenShake>
    </SceneBackground>
  );
}

// Mission Card Component
interface MissionCardProps {
  mission: UnifiedMission;
  levelColor: string;
  unlocked: boolean;
  completed: boolean;
  outcome?: SceneEndingType;
  onSelect: () => void;
  isSecret?: boolean;
}

function MissionCard({
  mission,
  levelColor,
  unlocked,
  completed,
  outcome,
  onSelect,
  isSecret = false,
}: MissionCardProps) {
  const outcomeConfig = outcome ? getOutcomeConfig(outcome) : null;

  return (
    <Pressable
      onPress={unlocked ? onSelect : undefined}
      style={({ pressed }) => [
        styles.missionCard,
        pressed && unlocked && styles.missionCardPressed,
        !unlocked && styles.missionCardLocked,
        isSecret && styles.missionCardSecret,
        completed && outcomeConfig && {
          borderColor: outcomeConfig.borderColor,
          borderWidth: 1.5,
        },
      ]}
    >
      <View style={styles.missionContent}>
        <View
          style={[
            styles.missionNumber,
            { backgroundColor: unlocked ? levelColor : colors.tertiary },
            isSecret && { backgroundColor: colors.accent },
          ]}
        >
          {isSecret ? (
            <Star size={14} color={colors.background} fill={colors.background} />
          ) : (
            <Text style={styles.missionNumberText}>{mission.missionNumber}</Text>
          )}
        </View>

        <View style={styles.missionInfo}>
          <Text
            style={[
              styles.missionTitle,
              !unlocked && styles.missionTitleLocked,
            ]}
          >
            {mission.title}
          </Text>
          <Text
            style={[
              styles.missionObjective,
              !unlocked && styles.missionObjectiveLocked,
            ]}
            numberOfLines={2}
          >
            {mission.objective}
          </Text>

          <View style={styles.missionMeta}>
            <View style={styles.missionMetaItem}>
              <Clock size={12} color={unlocked ? colors.secondary : colors.tertiary} />
              <Text style={[styles.missionMetaText, !unlocked && styles.missionMetaTextLocked]}>
                {mission.estimatedMinutes} min
              </Text>
            </View>
            <View style={styles.missionMetaItem}>
              <Zap size={12} color={unlocked ? colors.accent : colors.tertiary} />
              <Text style={[styles.missionMetaText, !unlocked && styles.missionMetaTextLocked]}>
                +{mission.rewards.power + mission.rewards.mask + mission.rewards.vision} stats
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.missionStatus}>
          {!unlocked ? (
            <Lock size={18} color={colors.tertiary} />
          ) : completed && outcomeConfig ? (
            <View style={[styles.outcomeBadge, { backgroundColor: outcomeConfig.bgColor }]}>
              {outcomeConfig.icon === 'trophy' ? (
                <Trophy size={14} color={outcomeConfig.color} />
              ) : (
                <CheckCircle size={14} color={outcomeConfig.color} />
              )}
            </View>
          ) : (
            <View style={[styles.playButtonIcon, { backgroundColor: levelColor + '20' }]}>
              <Play size={14} color={levelColor} fill={levelColor} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

function getOutcomeConfig(outcome: SceneEndingType) {
  const configs: Record<SceneEndingType, {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: 'trophy' | 'check';
  }> = {
    bad: {
      label: 'Learned',
      color: colors.error,
      bgColor: 'rgba(229, 69, 69, 0.15)',
      borderColor: 'rgba(229, 69, 69, 0.4)',
      icon: 'check',
    },
    neutral: {
      label: 'Survived',
      color: colors.warning,
      bgColor: 'rgba(255, 176, 32, 0.15)',
      borderColor: 'rgba(255, 176, 32, 0.4)',
      icon: 'check',
    },
    good: {
      label: 'Victory',
      color: colors.success,
      bgColor: 'rgba(76, 175, 80, 0.15)',
      borderColor: 'rgba(76, 175, 80, 0.4)',
      icon: 'trophy',
    },
    excellent: {
      label: 'Excellent',
      color: '#22C55E',
      bgColor: 'rgba(34, 197, 94, 0.15)',
      borderColor: 'rgba(34, 197, 94, 0.4)',
      icon: 'trophy',
    },
    outstanding: {
      label: 'Outstanding',
      color: colors.accent,
      bgColor: 'rgba(201, 169, 97, 0.15)',
      borderColor: 'rgba(201, 169, 97, 0.4)',
      icon: 'trophy',
    },
    master: {
      label: 'Mastered',
      color: '#9C27B0',
      bgColor: 'rgba(156, 39, 176, 0.15)',
      borderColor: 'rgba(156, 39, 176, 0.4)',
      icon: 'trophy',
    },
  };
  return configs[outcome];
}

const styles = StyleSheet.create({
  // Level selection styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  headerContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: '#22C55E',
  },
  headerSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  // Story header styles (Android-style flat layout)
  section: {
    gap: spacing.sm,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  storyHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(201, 169, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyHeaderTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: colors.primary,
  },
  storyHeaderSubtitle: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  levelContainer: {
    marginBottom: spacing.sm,
  },
  levelHeader: {
    ...glass.medium,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelHeaderPressed: {
    opacity: 0.9,
  },
  levelGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  levelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  levelNumberText: {
    fontSize: typography.md,
    fontWeight: '700',
    color: colors.background,
  },
  levelTitleContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: typography.md,
    fontWeight: '600',
    color: colors.primary,
  },
  levelDescription: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
  },
  levelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  progressText: {
    fontSize: typography.sm,
    fontWeight: '600',
  },
  missionsContainer: {
    marginTop: spacing.sm,
    paddingLeft: spacing.md,
    gap: spacing.sm,
  },
  missionCard: {
    ...glass.light,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  missionCardPressed: {
    opacity: 0.9,
    borderColor: colors.accent,
  },
  missionCardLocked: {
    opacity: 0.5,
  },
  missionCardSecret: {
    borderColor: 'rgba(201, 169, 97, 0.3)',
  },
  missionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  missionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  missionNumberText: {
    fontSize: typography.sm,
    fontWeight: '700',
    color: colors.background,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 2,
  },
  missionTitleLocked: {
    color: colors.tertiary,
  },
  missionObjective: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  missionObjectiveLocked: {
    color: colors.tertiary,
  },
  missionMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  missionMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  missionMetaText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  missionMetaTextLocked: {
    color: colors.tertiary,
  },
  missionStatus: {
    marginLeft: spacing.sm,
  },
  outcomeBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secretSection: {
    marginTop: spacing.sm,
  },
  secretDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  secretLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.accent + '40',
  },
  secretLabel: {
    fontSize: typography.xs,
    color: colors.accent,
    fontWeight: '500',
  },

  // Playing mode styles - matching SimulatorScene.tsx exactly
  playContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  playHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  playBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  playHeaderContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  playHeaderTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
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

  // Presence Strip - Mini portraits on left side (clean, minimal)
  presenceStrip: {
    position: 'absolute',
    left: spacing.sm,
    top: spacing.md,
    width: 56,
    gap: spacing.sm,
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

  // Attitude Container - Top Right
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

  playContent: {
    flex: 1,
    padding: spacing.md,
  },
  sceneContent: {
    flex: 1,
  },
  portraitSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
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
    alignSelf: 'center',
    top: '50%',
    marginTop: -90,  // Half of height to center vertically
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
    fontWeight: '600',
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

  // Player Card - Top Right
  playerCard: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.md,
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
    fontWeight: '700',
    color: colors.primary,
  },
  playerCardStats: {
    gap: 2,
  },
  playerCardStat: {
    fontSize: 10,
    color: colors.tertiary,
  },

  dialogueBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.md,
    minHeight: 100,
    zIndex: 10,
  },
  dialogueText: {
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0.3,
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
  feedbackText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  feedbackOptimal: {
    borderColor: 'rgba(76, 175, 80, 0.5)',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },

  // Context and inner voice boxes before choices
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
    lineHeight: 21,
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
    fontWeight: '700',
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
    fontWeight: '700',
    color: colors.background,
  },
  exitButtonSmall: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  exitButtonText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
});
