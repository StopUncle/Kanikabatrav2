// Test Visuals Page - Story Flow Demo
// Features continuous dialogue with multiple characters, natural choice flow
// Full immersion with SceneBackground, MoodParticles, haptics

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { ChevronLeft, MapPin, Shuffle } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { CharacterPortrait } from '../../components/simulator/CharacterPortrait';
import { SceneBackground } from '../../components/simulator/SceneBackground';
import { MoodParticles, type MoodType } from '../../components/simulator/effects/MoodParticles';
import { DangerVignette } from '../../components/simulator/effects/DangerVignette';
import { ScreenShake, type ScreenShakeRef } from '../../components/simulator/effects/ScreenShake';
import { immersiveHaptics } from '../../lib/immersion/hapticPatterns';
import { getDisplayLabel, getShortLabel, getCharacterTheme } from '../../lib/immersion/characterThemes';
import type { EmotionType, Character, BackgroundId } from '../../content/simulator/types';

// ============================================
// MOOD TO PARTICLES MAPPING
// ============================================

// Map scene moods to MoodParticles moods (they're slightly different)
const MOOD_TO_PARTICLES: Record<string, MoodType> = {
  romantic: 'romantic',
  tense: 'tense',
  party: 'party',
  professional: 'professional',
  mysterious: 'mysterious',
  peaceful: 'peaceful',
};

// ============================================
// CHARACTER DEFINITIONS - UNIVERSITY CAST
// ============================================

interface TestCharacter {
  id: string;
  name: string;
  role: string;
  personalityType: string;
  silhouetteType: string;
  defaultEmotion: EmotionType;
}

// Helper to convert TestCharacter to Character (for CharacterPortrait)
function toCharacter(tc: TestCharacter, emotion?: EmotionType): Character {
  return {
    id: tc.id,
    name: tc.name,
    description: tc.role,
    traits: [tc.role],
    defaultEmotion: emotion || tc.defaultEmotion,
    personalityType: tc.personalityType,
    silhouetteType: tc.silhouetteType as any,
  };
}

// Character accent colors for visual differentiation
const CHARACTER_COLORS: Record<string, string> = {
  morgan: '#8B0000',   // Dark red - dangerous
  taylor: '#4169E1',   // Royal blue - cold/distant
  casey: '#98FB98',    // Pale green - gentle
  jordan: '#FFD700',   // Gold - authority
  alex: '#FF8C00',     // Orange - energetic
  riley: '#FF69B4',    // Hot pink - charismatic
  sam: '#87CEEB',      // Sky blue - neutral
};

// Character signature elements for visual distinction
const CHARACTER_SIGNATURES: Record<string, { icon: string; role: string; borderStyle: 'solid' | 'dashed' | 'dotted' }> = {
  morgan: { icon: '👔', role: 'The Power Player', borderStyle: 'solid' },
  taylor: { icon: '💎', role: 'The Enigma', borderStyle: 'dashed' },
  casey: { icon: '📚', role: 'The Wallflower', borderStyle: 'dotted' },
  jordan: { icon: '🎖️', role: 'The Authority', borderStyle: 'solid' },
  alex: { icon: '🏀', role: 'Your Roommate', borderStyle: 'solid' },
  riley: { icon: '✨', role: 'The Social Magnet', borderStyle: 'dashed' },
  sam: { icon: '👁️', role: 'The Observer', borderStyle: 'dotted' },
};

// Attitude calculation based on rapport/respect values
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

function calculateAttitude(rapport: number, respect: number, hasMet: boolean): AttitudeLevel {
  if (!hasMet) return 'unknown';

  const combined = (rapport + respect) / 2;

  if (combined < 20) return 'hostile';
  if (combined < 35) return 'cold';
  if (combined < 45) return 'guarded';
  if (combined < 55) return 'neutral';
  if (combined < 65) return 'curious';
  if (combined < 75) return 'warming';
  if (combined < 85) return 'friendly';
  return 'trusting';
}

const CHARACTERS: Record<string, TestCharacter> = {
  morgan: {
    id: 'morgan',
    name: 'Morgan',
    role: 'Covert Narcissist',
    personalityType: 'narcissist',
    silhouetteType: 'male-imposing',
    defaultEmotion: 'cold',
  },
  taylor: {
    id: 'taylor',
    name: 'Taylor',
    role: 'Dismissive Avoidant',
    personalityType: 'avoidant',
    silhouetteType: 'male-lean', // Enigmatic, lean silhouette
    defaultEmotion: 'neutral',
  },
  casey: {
    id: 'casey',
    name: 'Casey',
    role: 'Wallflower',
    personalityType: 'genuine',
    silhouetteType: 'female-soft',
    defaultEmotion: 'neutral',
  },
  jordan: {
    id: 'jordan',
    name: 'Jordan',
    role: 'Authority (RA)',
    personalityType: 'authority',
    silhouetteType: 'male-athletic', // Strong, authoritative build
    defaultEmotion: 'neutral',
  },
  alex: {
    id: 'alex',
    name: 'Alex',
    role: 'Roommate',
    personalityType: 'competitor',
    silhouetteType: 'male-athletic',
    defaultEmotion: 'happy',
  },
  riley: {
    id: 'riley',
    name: 'Riley',
    role: 'Social Magnet',
    personalityType: 'chameleon',
    silhouetteType: 'hair-styled',
    defaultEmotion: 'happy',
  },
  sam: {
    id: 'sam',
    name: 'Sam',
    role: 'Neutral Observer',
    personalityType: 'genuine',
    silhouetteType: 'male-lean',
    defaultEmotion: 'neutral',
  },
};

// ============================================
// NEW SCENE STRUCTURE - CONTINUOUS DIALOGUE
// ============================================

interface DialogueLine {
  text: string;
  speakerId?: string | null; // null = narration, 'inner-voice' = gut, character id = speech
  emotion?: EmotionType;
  position?: 'left' | 'center' | 'right'; // Character position for spatial feel
}

interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  isOptimal?: boolean;
  feedback?: string;
}

interface StoryScene {
  id: string;
  title: string;
  location: string;
  backgroundId: BackgroundId; // For SceneBackground component
  mood: 'romantic' | 'tense' | 'party' | 'professional' | 'mysterious' | 'peaceful';
  charactersPresent: string[]; // Character IDs present in this scene
  dialogue: DialogueLine[];
  choices: Choice[];
}

// ============================================
// 10 TEST SCENES - MULTI-CHARACTER STORY FLOW
// ============================================

const STORY_SCENES: StoryScene[] = [
  // SCENE 1: Move-In Day - Jordan & Alex
  {
    id: 'scene-1-move-in',
    title: 'Move-In Day',
    location: 'Dorm Hallway',
    backgroundId: 'apartment',
    mood: 'peaceful',
    charactersPresent: ['alex', 'jordan'],
    dialogue: [
      { text: 'The hallway smells like fresh paint and anxiety. Move-in day chaos. You stop at room 314 - your new home for the year.' },
      { text: '"Hey! You must be my new roommate!" A guy with an athletic build and an easy smile extends his hand. "I\'m Alex. Already claimed the left side - hope that\'s cool?"', speakerId: 'alex', emotion: 'happy' },
      { text: 'A door opens down the hall. Someone in a cap steps out.', speakerId: 'jordan', emotion: 'serious' },
      { text: '"Keep it down, people are still moving in." Jordan\'s voice carries authority. The RA badge gleams on their lanyard.', speakerId: 'jordan', emotion: 'serious' },
      { text: 'Alex leans in conspiratorially. "That\'s Jordan, the RA. Total control freak. But useful to have on your side."', speakerId: 'alex', emotion: 'smirking' },
      { text: 'Jordan glances at you. Evaluating. Waiting to see which way you\'ll lean.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '1a', text: 'Wave to Jordan. "Nice to meet you."', nextSceneId: 'scene-2-common', isOptimal: true, feedback: 'Smart. You acknowledged authority without over-investing.' },
      { id: '1b', text: 'Ignore Jordan. Focus on Alex.', nextSceneId: 'scene-2-common', feedback: 'You picked a side already. Jordan noticed.' },
      { id: '1c', text: '"Control freak, huh?" Laugh with Alex.', nextSceneId: 'scene-2-common', feedback: 'Bonding over gossip. Alex likes you. Jordan heard you.' },
    ],
  },

  // SCENE 2: Common Room - Morgan & Riley
  {
    id: 'scene-2-common',
    title: 'The Common Room',
    location: 'Dorm Common Area',
    backgroundId: 'apartment',
    mood: 'mysterious',
    charactersPresent: ['morgan', 'riley'],
    dialogue: [
      { text: 'The common room buzzes with first-week energy. Two people dominate the space without trying. Morgan - tall, composed, surrounded by an invisible force field of superiority. Riley - effortlessly popular, the center of every orbit.' },
      { text: '"Fresh meat." Morgan\'s eyes meet yours. Cold. Assessing. The kind of look that makes you wonder what they already know.', speakerId: 'morgan', emotion: 'smirking' },
      { text: '"Don\'t mind Morgan." Riley appears beside you, their smile warm but their eyes calculating. "They\'re just... selective. I\'m Riley, by the way."', speakerId: 'riley', emotion: 'seductive' },
      { text: '"I\'ve heard things about you." Morgan lets the words hang in the air. That pause - deliberate. They want you to ask what.', speakerId: 'morgan', emotion: 'cold' },
      { text: 'Classic hook. They\'re fishing for your curiosity. Don\'t bite.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '2a', text: '"All good things, I hope."', nextSceneId: 'scene-3-study', feedback: 'You took the bait. Morgan controls the narrative now.' },
      { id: '2b', text: 'Slight nod. "I\'m sure you have."', nextSceneId: 'scene-3-study', isOptimal: true, feedback: 'OPTIMAL: Unfazed. You didn\'t chase Morgan\'s hook.' },
      { id: '2c', text: 'Turn to Riley. "Nice to meet you."', nextSceneId: 'scene-3-study', feedback: 'You chose warmth over cold. Morgan noticed the slight.' },
    ],
  },

  // SCENE 3: Study Lounge - Casey
  {
    id: 'scene-3-study',
    title: 'The Study Lounge',
    location: 'Second Floor Lounge',
    backgroundId: 'coffee-shop',
    mood: 'peaceful',
    charactersPresent: ['casey'],
    dialogue: [
      { text: 'The study lounge is mostly empty. One person sits alone in the corner - Casey. You\'ve seen them around, always on the edges. The kind of person most people walk right past.' },
      { text: 'They look up as you enter. Startled, like a deer caught in headlights. "Oh. Hi." They quickly look back at their book.', speakerId: 'casey', emotion: 'neutral' },
      { text: '"Sorry, I didn\'t mean to take your spot or anything." They\'re already apologizing. For existing.', speakerId: 'casey', emotion: 'concerned' },
      { text: 'Something about them feels overlooked. Undervalued. The kind of ally everyone ignores until they need something.', speakerId: 'inner-voice', emotion: 'concerned' },
    ],
    choices: [
      { id: '3a', text: '"You\'re fine. Mind if I study here too?"', nextSceneId: 'scene-4-night', isOptimal: true, feedback: 'OPTIMAL: Genuine. No agenda. Casey relaxes slightly.' },
      { id: '3b', text: 'Nod and find a different seat.', nextSceneId: 'scene-4-night', feedback: 'Safe distance. Casey goes back to being invisible.' },
      { id: '3c', text: '"What are you reading? Looks intense."', nextSceneId: 'scene-4-night', feedback: 'Friendly, but coming on a bit strong. Casey\'s walls stay up.' },
    ],
  },

  // SCENE 4: Night Walk - Taylor
  {
    id: 'scene-4-night',
    title: 'Night Walk',
    location: 'Campus Quad',
    backgroundId: 'park',
    mood: 'romantic',
    charactersPresent: ['taylor'],
    dialogue: [
      { text: 'The quad is quiet after dark. Just you and the streetlights casting long shadows across the grass. Until someone steps out of the darkness.' },
      { text: 'Taylor. The one everyone talks about but no one really knows. "Out late." Not a question. Not quite an observation either. "Couldn\'t sleep."', speakerId: 'taylor', emotion: 'neutral' },
      { text: 'They fall into step beside you. Uninvited. Testing. "You\'re the new one Morgan\'s been talking about."', speakerId: 'taylor', emotion: 'smirking' },
      { text: 'They\'re watching your reaction carefully. This is a test. Don\'t chase - make them come to you.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '4a', text: '"Morgan talks a lot." Keep walking.', nextSceneId: 'scene-5-party', isOptimal: true, feedback: 'OPTIMAL: Unbothered. Taylor has to keep up with you.' },
      { id: '4b', text: '"What did Morgan say?"', nextSceneId: 'scene-5-party', feedback: 'You bit. Taylor smiles - they found a thread to pull.' },
      { id: '4c', text: 'Stop walking. Face Taylor.', nextSceneId: 'scene-5-party', feedback: 'Too invested. Taylor\'s already got you reacting.' },
    ],
  },

  // SCENE 5: First Party - Morgan, Riley, Taylor
  {
    id: 'scene-5-party',
    title: 'The First Party',
    location: 'Off-Campus House',
    backgroundId: 'bar',
    mood: 'party',
    charactersPresent: ['morgan', 'riley', 'taylor'],
    dialogue: [
      { text: 'Music pounds through the walls. Your first college party. Morgan holds court in the corner while Riley works the room. Taylor leans against a wall, watching everyone like a hawk.' },
      { text: '"You came." Riley appears beside you with two drinks, their smile knowing. "Morgan bet you wouldn\'t. I knew better."', speakerId: 'riley', emotion: 'seductive' },
      { text: 'Across the room, Morgan catches your eye. "Looks like Riley\'s found a new project." The words carry across the noise, deliberate.', speakerId: 'morgan', emotion: 'cold' },
      { text: 'Taylor\'s watching this exchange from the shadows. Amused. Everyone\'s playing a game here.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '5a', text: 'Take the drink. "Thanks for believing in me."', nextSceneId: 'scene-6-tension', feedback: 'You\'re in Riley\'s orbit now. Morgan\'s territory.' },
      { id: '5b', text: '"A project? I prefer partnership."', nextSceneId: 'scene-6-tension', isOptimal: true, feedback: 'OPTIMAL: Reframed the dynamic. Both Riley and Morgan recalculate.' },
      { id: '5c', text: 'Ignore Riley. Walk toward Morgan.', nextSceneId: 'scene-6-tension', feedback: 'Bold. Direct into the lion\'s den.' },
    ],
  },

  // SCENE 6: Rising Tension - Morgan & Alex
  {
    id: 'scene-6-tension',
    title: 'Rising Tension',
    location: 'Dorm Room',
    backgroundId: 'apartment',
    mood: 'tense',
    charactersPresent: ['alex'],
    dialogue: [
      { text: 'Back in your room. Alex pauses his video game and turns to face you. "Heard you talked to Morgan at the party. Be careful with that one. I\'ve seen people get burned."', speakerId: 'alex', emotion: 'concerned' },
      { text: '"Morgan plays games. And they always win." His phone buzzes. He glances at it and frowns. "Speaking of which..."', speakerId: 'alex', emotion: 'serious' },
      { text: 'He shows you the screen. A group chat. Morgan just added you. The message: "Let\'s see if the new one can keep up."' },
      { text: 'An invitation. Or a challenge. Hard to tell with Morgan.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '6a', text: '"What kind of games?"', nextSceneId: 'scene-7-test', feedback: 'Intel gathering. Smart, but Alex sees you\'re intrigued.' },
      { id: '6b', text: '"I don\'t play games I can\'t win."', nextSceneId: 'scene-7-test', isOptimal: true, feedback: 'OPTIMAL: Confident but not naive. Alex nods approvingly.' },
      { id: '6c', text: 'Join the chat. "I keep up just fine."', nextSceneId: 'scene-7-test', feedback: 'Direct engagement. Morgan\'s got you playing already.' },
    ],
  },

  // SCENE 7: The Test - Jordan & Sam
  {
    id: 'scene-7-test',
    title: 'The Test',
    location: 'Floor Meeting',
    backgroundId: 'office',
    mood: 'professional',
    charactersPresent: ['jordan', 'sam'],
    dialogue: [
      { text: 'Mandatory floor meeting. Jordan stands at the front, expression stern. "Someone\'s been propping open the fire exit. If I find out who, there will be consequences."', speakerId: 'jordan', emotion: 'serious' },
      { text: 'Sam sits next to you and whispers. "It\'s Morgan\'s crew. Everyone knows. But no one\'s gonna say anything."', speakerId: 'sam', emotion: 'concerned' },
      { text: 'Jordan\'s eyes scan the room and land on you. Waiting. Testing where your loyalties lie.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '7a', text: 'Stay silent. Not your problem.', nextSceneId: 'scene-8-alliance', feedback: 'You passed the loyalty test. Morgan\'s crew accepts you.' },
      { id: '7b', text: 'Meet Jordan\'s eyes. Slight headshake.', nextSceneId: 'scene-8-alliance', isOptimal: true, feedback: 'OPTIMAL: You communicated without snitching. Jordan notes the nuance.' },
      { id: '7c', text: '"Maybe check the security footage?"', nextSceneId: 'scene-8-alliance', feedback: 'Helpful but naive. Both sides now distrust you.' },
    ],
  },

  // SCENE 8: The Alliance - Casey & Riley
  {
    id: 'scene-8-alliance',
    title: 'Unexpected Alliance',
    location: 'Library',
    backgroundId: 'coffee-shop',
    mood: 'peaceful',
    charactersPresent: ['casey', 'riley'],
    dialogue: [
      { text: 'The library. Final exams approaching. Casey is at a table surrounded by notes, and they actually smile when they see you. "Hey. Thanks for... before. In the study lounge. Most people don\'t even see me."', speakerId: 'casey', emotion: 'happy' },
      { text: 'Riley appears out of nowhere, spotting you with Casey. "Making new friends?" Something shifts in their expression. Calculating.', speakerId: 'riley', emotion: 'curious' },
      { text: 'Riley didn\'t expect you to notice Casey. This changes their calculation about you.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '8a', text: '"Old friends, actually."', nextSceneId: 'scene-9-power', isOptimal: true, feedback: 'OPTIMAL: You claimed Casey. Riley\'s worldview cracks slightly.' },
      { id: '8b', text: '"Just studying."', nextSceneId: 'scene-9-power', feedback: 'Dismissive of Casey. They shrink back.' },
      { id: '8c', text: '"Want to join us, Riley?"', nextSceneId: 'scene-9-power', feedback: 'Inclusive, but you let Riley control the dynamic.' },
    ],
  },

  // SCENE 9: Power Play - Morgan
  {
    id: 'scene-9-power',
    title: 'Power Play',
    location: 'Student Center',
    backgroundId: 'office',
    mood: 'tense',
    charactersPresent: ['morgan'],
    dialogue: [
      { text: 'Morgan corners you in the student center. No Riley. No Taylor. Just them. "You\'re interesting. Most people fall in line by now. Or run away."', speakerId: 'morgan', emotion: 'cold' },
      { text: '"But you... you\'re playing your own game." They step closer, voice dropping. "I could use someone like you. On my side."', speakerId: 'morgan', emotion: 'seductive' },
      { text: '"Or I could destroy you. Your choice." The mask slipped. For just a moment, you saw what\'s underneath.', speakerId: 'morgan', emotion: 'cold' },
      { text: 'There it is. The threat behind the charm. Now you know exactly who you\'re dealing with.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '9a', text: '"I don\'t pick sides."', nextSceneId: 'scene-10-end', isOptimal: true, feedback: 'OPTIMAL: Maintained frame. Morgan can\'t categorize you.' },
      { id: '9b', text: '"What would being on your side look like?"', nextSceneId: 'scene-10-end', feedback: 'You\'re negotiating. Morgan has leverage now.' },
      { id: '9c', text: '"Go ahead and try."', nextSceneId: 'scene-10-end', feedback: 'Defiant. But you just made an enemy.' },
    ],
  },

  // SCENE 10: End of Semester - Everyone
  {
    id: 'scene-10-end',
    title: 'End of Semester',
    location: 'Dorm Rooftop',
    backgroundId: 'park',
    mood: 'romantic',
    charactersPresent: ['alex', 'casey', 'jordan', 'morgan', 'riley', 'taylor'],
    dialogue: [
      { text: 'End of semester party on the rooftop. Everyone\'s here - the whole cast of your first year. Alex raises a drink with a grin. "We survived." Even Jordan actually smiles for once.', speakerId: 'alex', emotion: 'happy' },
      { text: 'Casey is here too, part of the group now. Thanks to you. Riley watches Morgan from across the roof - something shifted between them this semester.' },
      { text: 'Taylor appears beside you. "You played it well. This semester. Most people break. You bent." Morgan catches your eye from across the roof and nods once.', speakerId: 'taylor', emotion: 'smirking' },
      { text: 'Not allies. Not enemies. Something else entirely. And this is only the beginning.', speakerId: 'inner-voice', emotion: 'neutral' },
    ],
    choices: [
      { id: '10a', text: '"It\'s not over yet."', nextSceneId: 'scene-1-move-in', isOptimal: true, feedback: 'OPTIMAL: You understand. The game continues.' },
      { id: '10b', text: 'Smile. Raise your drink.', nextSceneId: 'scene-1-move-in', feedback: 'Celebration. You\'ve earned a moment.' },
      { id: '10c', text: 'Look at the stars. Stay silent.', nextSceneId: 'scene-1-move-in', feedback: 'Reflective. Taking it all in.' },
    ],
  },
];

// ============================================
// MAIN COMPONENT - CONTINUOUS STORY FLOW
// ============================================

// Simulated relationship values per character
const INITIAL_RELATIONSHIPS: Record<string, { rapport: number; respect: number }> = {
  morgan: { rapport: 35, respect: 50 },
  taylor: { rapport: 45, respect: 55 },
  casey: { rapport: 60, respect: 40 },
  jordan: { rapport: 50, respect: 65 },
  alex: { rapport: 70, respect: 55 },
  riley: { rapport: 55, respect: 45 },
  sam: { rapport: 50, respect: 50 },
};

export default function TestVisualsScreen() {
  const router = useRouter();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [previousSpeaker, setPreviousSpeaker] = useState<string | null>(null);
  const [relationships, setRelationships] = useState(INITIAL_RELATIONSHIPS);
  const [charactersMet, setCharactersMet] = useState<Set<string>>(new Set());

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  // Screen shake ref for dramatic moments
  const screenShakeRef = useRef<ScreenShakeRef>(null);

  // Store pending scene change for after feedback dismissal
  const [pendingSceneId, setPendingSceneId] = useState<string | null>(null);

  // Character transition animation - SLOWER for story feel
  const characterOpacity = useSharedValue(1);
  const characterX = useSharedValue(0);

  // Scene transition fade animation
  const sceneOpacity = useSharedValue(1);

  // Choices fade-in/out animation
  const choicesOpacity = useSharedValue(0);

  // Dialogue box fade animation
  const dialogueOpacity = useSharedValue(1);

  // Feedback fade animation
  const feedbackOpacity = useSharedValue(0);

  const scene = STORY_SCENES[currentSceneIndex];
  const currentLine = scene.dialogue[dialogueIndex];
  const isLastLine = dialogueIndex >= scene.dialogue.length - 1;
  const fullText = currentLine?.text || '';

  // Get current speaker character
  const currentSpeaker = currentLine?.speakerId && currentLine.speakerId !== 'inner-voice'
    ? CHARACTERS[currentLine.speakerId]
    : null;

  const currentSpeakerId = currentSpeaker?.id || null;

  // Get relationship for current speaker
  const currentRelationship = currentSpeakerId ? relationships[currentSpeakerId] : null;

  // Animate character transitions - handles all cases:
  // - Narration -> Character (fade in)
  // - Character -> Different Character (crossfade)
  // - Character -> Narration (fade out)
  // - Same character continues (no animation)
  useEffect(() => {
    const hasNewSpeaker = !!currentSpeakerId;
    const hadPreviousSpeaker = !!previousSpeaker;
    const speakerChanged = currentSpeakerId !== previousSpeaker;

    if (hasNewSpeaker && !hadPreviousSpeaker) {
      // Narration/inner-voice -> Character: Fade in from right
      characterOpacity.value = 0;
      characterX.value = 30;
      characterOpacity.value = withTiming(1, { duration: 350, easing: Easing.out(Easing.ease) });
      characterX.value = withTiming(0, { duration: 350, easing: Easing.out(Easing.ease) });
    } else if (hasNewSpeaker && hadPreviousSpeaker && speakerChanged) {
      // Character A -> Character B: Crossfade with slide
      characterOpacity.value = withSequence(
        withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 350, easing: Easing.in(Easing.ease) })
      );
      characterX.value = withSequence(
        withTiming(-30, { duration: 250, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 350, easing: Easing.in(Easing.ease) })
      );
    } else if (!hasNewSpeaker && hadPreviousSpeaker) {
      // Character -> Narration/inner-voice: Fade out
      characterOpacity.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
      characterX.value = withTiming(-20, { duration: 250, easing: Easing.out(Easing.ease) });
    }
    // Same character continues speaking - no animation needed

    // Track current speaker for next comparison
    setPreviousSpeaker(currentSpeakerId);

    // Mark character as "met" when they speak
    if (currentSpeakerId && !charactersMet.has(currentSpeakerId)) {
      setCharactersMet(prev => new Set([...prev, currentSpeakerId]));
    }
  }, [currentSpeakerId, dialogueIndex]);

  // Typewriter effect - type out text character by character
  useEffect(() => {
    // Clear any existing typewriter
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
    }

    // Show first character immediately to prevent flash
    if (fullText.length > 0) {
      setDisplayedText(fullText.charAt(0));
      setIsTyping(true);

      // Stop any repeating shakes from previous dialogue
      screenShakeRef.current?.stop();

      // Special case: Morgan's power play threat gets the strongest effects
      const isMorganThreat = currentLine?.speakerId === 'morgan' && fullText.includes('destroy you');

      if (isMorganThreat) {
        // Morgan's threat - most intense effects, don't double-trigger
        screenShakeRef.current?.shake('danger');
        immersiveHaptics.maskSlip();
      } else if (currentLine?.emotion) {
        // Regular emotional haptics for non-Morgan-threat lines
        switch (currentLine.emotion) {
          case 'cold':
            immersiveHaptics.coldMoment();
            // Screen shake for other threatening moments
            if (fullText.toLowerCase().includes('destroy') || fullText.toLowerCase().includes('threat')) {
              screenShakeRef.current?.shake('threat');
            }
            break;
          case 'seductive':
            immersiveHaptics.intimate();
            screenShakeRef.current?.shake('heartbeat'); // Romantic pulse
            break;
          case 'angry':
            immersiveHaptics.dangerEscalation();
            screenShakeRef.current?.shake('impact');
            break;
          case 'happy':
            immersiveHaptics.victory(); // Triumphant feeling
            break;
          case 'sad':
            screenShakeRef.current?.shake('defeat'); // Heavy emotional weight
            break;
          case 'confused':
            immersiveHaptics.heartRacing(); // Anxious heartbeat
            screenShakeRef.current?.shake('nervousness'); // Disoriented jitter
            break;
          case 'smirking':
            screenShakeRef.current?.shake('revelation'); // Knowing moment
            break;
        }
      }
    } else {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    let charIndex = 1; // Start from second character
    const typeSpeed = 25; // ms per character

    typewriterRef.current = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        // Done typing
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
  }, [fullText, dialogueIndex, currentSceneIndex]);

  const characterStyle = useAnimatedStyle(() => ({
    opacity: characterOpacity.value,
    transform: [{ translateX: characterX.value }],
  }));

  // Animate choices fade-in/out
  useEffect(() => {
    if (showChoices) {
      // Fade out dialogue, fade in choices
      dialogueOpacity.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) });
      choicesOpacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
    } else {
      // Fade out choices (don't snap)
      choicesOpacity.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) });
      // Fade dialogue back in after choices fade
      dialogueOpacity.value = withTiming(1, { duration: 200, easing: Easing.in(Easing.ease) });
    }
  }, [showChoices]);

  // Animate feedback fade-in/out
  useEffect(() => {
    if (feedback) {
      feedbackOpacity.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) });
    } else {
      feedbackOpacity.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) });
    }
  }, [feedback]);

  const choicesStyle = useAnimatedStyle(() => ({
    opacity: choicesOpacity.value,
  }));

  const dialogueStyle = useAnimatedStyle(() => ({
    opacity: dialogueOpacity.value,
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    opacity: feedbackOpacity.value,
  }));

  // Scene content fade style
  const sceneStyle = useAnimatedStyle(() => ({
    opacity: sceneOpacity.value,
  }));

  // Transition to a new scene with fade animation
  const transitionToScene = (sceneId: string) => {
    const nextIndex = STORY_SCENES.findIndex(s => s.id === sceneId);
    if (nextIndex < 0) return;

    // Stop any repeating shakes before transitioning
    screenShakeRef.current?.stop();

    // Fade out (250ms)
    sceneOpacity.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });

    // Wait slightly longer than animation to ensure it completes
    setTimeout(() => {
      // Change scene while faded out
      setCurrentSceneIndex(nextIndex);
      setDialogueIndex(0);
      setShowChoices(false);
      setFeedback(null);
      setPendingSceneId(null);
      setPreviousSpeaker(null);

      // Reset dialogue opacity for new scene
      dialogueOpacity.value = 1;
      feedbackOpacity.value = 0;
      choicesOpacity.value = 0;

      // Fade back in
      sceneOpacity.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) });
    }, 270); // Slightly longer than fade-out duration
  };

  const handleBack = () => {
    haptics.light();
    screenShakeRef.current?.stop(); // Stop any repeating shakes before leaving
    router.back();
  };

  const handleTap = () => {
    haptics.light();

    if (feedback && pendingSceneId) {
      // Dismiss feedback and transition to the pending scene
      transitionToScene(pendingSceneId);
      return;
    }

    if (showChoices) {
      // Choices are showing, tap does nothing
      return;
    }

    // If still typing, skip to full text
    if (isTyping) {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
      }
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    if (isLastLine) {
      // Stop any repeating shakes when transitioning to choices
      screenShakeRef.current?.stop();
      // Show choices
      setShowChoices(true);
    } else {
      // Advance dialogue with subtle fade
      dialogueOpacity.value = withSequence(
        withTiming(0.3, { duration: 100, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 150, easing: Easing.in(Easing.ease) })
      );
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  const handleChoice = async (choice: Choice) => {
    // Immersive haptics based on choice quality
    if (choice.isOptimal) {
      await immersiveHaptics.optimalChoice();
    } else if (choice.feedback?.includes('TRAP')) {
      await immersiveHaptics.trapChoice();
    } else {
      await immersiveHaptics.choiceSelect();
    }

    setShowChoices(false); // Hide choices immediately
    setFeedback(choice.feedback || 'Choice made.');
    setPendingSceneId(choice.nextSceneId); // Store pending scene for after feedback

    // Update relationships based on choice
    // Optimal choices increase rapport/respect, bad choices decrease
    if (previousSpeaker) {
      setRelationships(prev => {
        const current = prev[previousSpeaker] || { rapport: 50, respect: 50 };
        const rapportDelta = choice.isOptimal ? 5 : (choice.feedback?.includes('TRAP') ? -5 : 0);
        const respectDelta = choice.isOptimal ? 3 : (choice.feedback?.includes('TRAP') ? -3 : 1);
        return {
          ...prev,
          [previousSpeaker]: {
            rapport: Math.max(0, Math.min(100, current.rapport + rapportDelta)),
            respect: Math.max(0, Math.min(100, current.respect + respectDelta)),
          }
        };
      });
    }
    // Scene transition happens when user taps to dismiss feedback
  };

  const shuffleScene = () => {
    haptics.medium();
    const randomIndex = Math.floor(Math.random() * STORY_SCENES.length);
    const randomSceneId = STORY_SCENES[randomIndex].id;
    transitionToScene(randomSceneId);
  };

  // Get dialogue style based on speaker
  const getDialogueStyle = () => {
    if (!currentLine) return styles.narrationText;
    if (currentLine.speakerId === 'inner-voice') return styles.innerVoiceText;
    if (currentLine.speakerId) return styles.speechText;
    return styles.narrationText;
  };

  // Calculate control score for vignette (based on mood)
  const controlScore = scene.mood === 'tense' ? -30 : scene.mood === 'mysterious' ? -10 : 20;

  // Get particle mood type
  const particleMood = MOOD_TO_PARTICLES[scene.mood] || 'mysterious';

  return (
    <SceneBackground backgroundId={scene.backgroundId}>
      <ScreenShake ref={screenShakeRef}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />

          {/* Atmospheric particles */}
          <MoodParticles mood={particleMood} intensity={0.7} />

          {/* Danger vignette for tense scenes */}
          <DangerVignette controlScore={controlScore} enabled={scene.mood === 'tense'} />

          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.primary} />
            </Pressable>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{scene.title}</Text>
              <View style={styles.locationBadge}>
                <MapPin size={12} color={colors.accent} />
                <Text style={styles.locationText}>{scene.location}</Text>
              </View>
            </View>
            <Pressable onPress={shuffleScene} style={styles.shuffleButton}>
              <Shuffle size={18} color={colors.accent} />
            </Pressable>
          </View>

          {/* Scene Counter */}
          <Text style={styles.sceneCounter}>
            Scene {currentSceneIndex + 1} / {STORY_SCENES.length}
          </Text>

          {/* Main Content */}
          <Pressable style={styles.content} onPress={handleTap}>
            <Animated.View style={[styles.sceneContent, sceneStyle]}>
              {/* Character Presence Strip - Left Side */}
              <View style={styles.presenceStrip}>
                {scene.charactersPresent.map((charId) => {
                  const char = CHARACTERS[charId];
                  if (!char) return null;
                  const isSpeaking = currentSpeakerId === charId;
                  const charColor = CHARACTER_COLORS[charId] || colors.accent;
                  const hasMet = charactersMet.has(charId);

                  return (
                    <View
                      key={charId}
                      style={[
                        styles.presenceItem,
                        isSpeaking && styles.presenceItemActive,
                      ]}
                    >
                      <View style={styles.presenceSilhouette}>
                        <CharacterPortrait
                          character={toCharacter(char)}
                          emotion={isSpeaking ? (currentLine?.emotion || char.defaultEmotion) : char.defaultEmotion}
                          personalityType={char.personalityType}
                          silhouetteType={char.silhouetteType as any}
                          size="small"
                          speaking={isSpeaking && isTyping}
                          showName={false}
                        />
                      </View>
                      {isSpeaking && (
                        <View style={[styles.speakingGlow, { backgroundColor: charColor + '40' }]} />
                      )}
                      {/* Character name and type label */}
                      {!isSpeaking && (
                        <>
                          <Text style={[styles.presenceName, { color: colors.tertiary }]}>
                            {hasMet ? char.name : '???'}
                          </Text>
                          <Text style={[
                            styles.presenceTypeLabel,
                            { color: getCharacterTheme(char.personalityType).primary }
                          ]}>
                            {getShortLabel(char.personalityType)}
                          </Text>
                        </>
                      )}
                    </View>
                  );
                })}
              </View>

              {/* Attitude Indicator - Top Right Corner */}
              {currentSpeaker && currentRelationship && (
                <View style={styles.attitudeContainer}>
                  {(() => {
                    const attitude = calculateAttitude(
                      currentRelationship.rapport,
                      currentRelationship.respect,
                      charactersMet.has(currentSpeaker.id)
                    );
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

              {/* Top Section - Portrait with Player Card (always rendered for layout stability) */}
              <View style={styles.portraitSection}>
                {/* Player Card - Top Right */}
                <View style={styles.playerCard}>
                  <View style={styles.playerCardHeader}>
                    <Text style={styles.playerCardIcon}>👤</Text>
                    <Text style={styles.playerCardTitle}>YOU</Text>
                  </View>
                  <View style={styles.playerCardStats}>
                    <Text style={styles.playerCardStat}>Scene {currentSceneIndex + 1}</Text>
                    <Text style={styles.playerCardStat}>{charactersMet.size} met</Text>
                  </View>
                </View>

                {/* Character Portrait or Placeholder */}
                {currentSpeaker ? (
                  <Animated.View style={[styles.portraitContainer, characterStyle]}>
                    {/* Colored glow ring behind portrait */}
                    <View style={[
                      styles.characterGlow,
                      { backgroundColor: CHARACTER_COLORS[currentSpeaker.id] + '30' }
                    ]} />
                    <View style={styles.portraitFrame}>
                      <CharacterPortrait
                        character={toCharacter(currentSpeaker, currentLine?.emotion)}
                        emotion={currentLine?.emotion || currentSpeaker.defaultEmotion}
                        personalityType={currentSpeaker.personalityType}
                        silhouetteType={currentSpeaker.silhouetteType as any}
                        size="large"
                        speaking={isTyping}
                        showName={false}
                      />
                    </View>
                    {/* Name with type badge */}
                    <View style={styles.nameContainer}>
                      <Text style={[styles.speakerName, { color: CHARACTER_COLORS[currentSpeaker.id] }]}>
                        {charactersMet.has(currentSpeaker.id) ? currentSpeaker.name : '???'}
                      </Text>
                      <View style={[
                        styles.typeBadge,
                        { backgroundColor: getCharacterTheme(currentSpeaker.personalityType).primary + '25' }
                      ]}>
                        <Text style={[
                          styles.typeText,
                          { color: getCharacterTheme(currentSpeaker.personalityType).primary }
                        ]}>
                          {getDisplayLabel(currentSpeaker.personalityType)}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                ) : (
                  <View style={styles.portraitPlaceholder} />
                )}
              </View>

              {/* Middle Section - Dialogue Box with Character Color Accent */}
              {!showChoices && !feedback && (
                <Animated.View style={[
                  styles.dialogueBox,
                  dialogueStyle,
                  currentSpeaker && {
                    borderLeftWidth: 3,
                    borderLeftColor: CHARACTER_COLORS[currentSpeaker.id] || colors.accent,
                  },
                  currentLine?.speakerId === 'inner-voice' && {
                    borderLeftWidth: 3,
                    borderLeftColor: '#B19CD9', // Purple for inner voice
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

              {/* Spacer to push choices to bottom */}
              <View style={styles.spacer} />

              {/* Bottom Section - Context + Choices (fade in together) */}
              {showChoices && !feedback && (
                <Animated.View style={choicesStyle}>
                  {/* Last dialogue as context */}
                  <View style={styles.contextBox}>
                    <Text
                      style={[
                        styles.contextText,
                        currentLine?.speakerId === 'inner-voice' && styles.contextTextInnerVoice,
                      ]}
                      numberOfLines={2}
                    >
                      {fullText}
                    </Text>
                  </View>

                  {/* Choices */}
                  <View style={styles.choicesContainer}>
                    {scene.choices.map((choice) => (
                      <Pressable
                        key={choice.id}
                        style={({ pressed }) => [
                          styles.choiceButton,
                          choice.isOptimal && styles.choiceOptimal,
                          pressed && styles.choicePressed,
                        ]}
                        onPress={() => handleChoice(choice)}
                      >
                        <Text style={styles.choiceText}>{choice.text}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Animated.View>
              )}

              {/* Feedback */}
              {feedback && (
                <Animated.View style={[
                  styles.feedbackBox,
                  feedbackStyle,
                  feedback.includes('OPTIMAL') && styles.feedbackOptimal,
                ]}>
                  <Text style={styles.feedbackText}>{feedback}</Text>
                  <Text style={styles.tapHint}>▼</Text>
                </Animated.View>
              )}
            </Animated.View>
          </Pressable>
        </SafeAreaView>
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
    backgroundColor: 'transparent', // Let gradient show through
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
    fontWeight: typography.bold,
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
  },
  shuffleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  sceneCounter: {
    fontSize: typography.xs,
    color: colors.tertiary,
    textAlign: 'center',
    paddingVertical: spacing.xs,
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
    top: 40, // Below the attitude indicator
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
    fontWeight: typography.bold,
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
    height: 160, // Matches portrait height for layout stability
  },
  speakerName: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  portraitFrame: {
    borderRadius: 80,
    padding: 4,
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
  characterGlow: {
    position: 'absolute',
    top: -10,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.6,
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
  dialogueBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.md,
    minHeight: 100,
    zIndex: 10, // Above presenceStrip (zIndex: 5) so dialogue always overlaps
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
  contextTextInnerVoice: {
    color: '#B19CD9',
  },
  spacer: {
    flex: 1,
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
  choiceOptimal: {
    borderColor: 'rgba(76, 175, 80, 0.4)',
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
});
