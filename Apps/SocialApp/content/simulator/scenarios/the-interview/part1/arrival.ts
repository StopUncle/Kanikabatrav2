// Part 1: The Waiting Room
// Scenes 1-5: Before the interview begins
// Immersion: Professional mood with tense moments

import type { Scene } from '../../../types';

export const arrivalScenes: Scene[] = [
  // Scene 1: The Competition
  {
    id: 'interview-1',
    backgroundId: 'office',
    mood: 'tense', // Rivalry moment
    dialog: [
      {
        text: '9:47 AM. Thirteen minutes early. Perfect.',
      },
      {
        text: 'The lobby is all glass and steel. A wall of awards. The kind of place designed to make you feel small.',
      },
      {
        text: 'A door opens. A man in a perfect suit walks out. Confident stride. Shakes the receptionist\'s hand warmly.',
        speakerId: 'james',
        emotion: 'happy',
      },
      {
        text: '"Thanks so much. Really enjoyed the conversation."',
        speakerId: 'james',
        emotion: 'happy',
      },
      {
        text: 'He notices you. Sizes you up. Smiles.',
      },
      {
        text: '"Good luck in there."',
        speakerId: 'james',
        emotion: 'smirking',
      },
      {
        speakerId: 'inner-voice',
        text: 'The competition. Designed to rattle you.',
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-1-a',
        text: '"Thanks. I\'m sure I won\'t need it."',
        nextSceneId: 'interview-2',
        feedback: 'OPTIMAL: Confident counter. You matched his energy without aggression.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-1-b',
        text: '"Thanks, you too."',
        nextSceneId: 'interview-2',
        feedback: 'Professional and neutral. Neither gains nor loses ground.',
        xpBonus: 8,
      },
      {
        id: 'interview-1-c',
        text: '"How was it?"',
        nextSceneId: 'interview-2',
        feedback: 'You just showed uncertainty. He\'ll walk away knowing he rattled you.',
        xpBonus: 3,
      },
      {
        id: 'interview-1-d',
        text: 'Nod and say nothing.',
        nextSceneId: 'interview-2',
        feedback: 'Power move. But risky—could come off as cold or nervous.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 2: The Receptionist Test
  {
    id: 'interview-2',
    backgroundId: 'office',
    mood: 'professional', // Calm office setting
    dialog: [
      {
        text: 'You approach the front desk. The receptionist looks up with a practiced smile.',
      },
      {
        text: '"You must be here for the PM role. Can I get you anything? Water? Coffee? The team is just finishing up."',
        speakerId: 'receptionist',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: 'This is a test. Receptionists report to HR.',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'interview-2-a',
        text: '"Water would be great, thank you. How\'s your morning going?"',
        nextSceneId: 'interview-3',
        feedback: 'OPTIMAL: Warm, human, professional. You treated the "invisible" person as a person.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-2-b',
        text: '"I\'m fine, thanks."',
        nextSceneId: 'interview-3',
        feedback: 'Efficient. Professional. Forgettable.',
        xpBonus: 8,
      },
      {
        id: 'interview-2-c',
        text: '"Just water."',
        nextSceneId: 'interview-3',
        feedback: 'Curt. She\'ll remember that.',
        xpBonus: 5,
      },
      {
        id: 'interview-2-d',
        text: 'Check your phone, barely acknowledge her.',
        nextSceneId: 'interview-3',
        feedback: 'TRAP: Fatal error. Candidates have been rejected for less.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 3: Rachel's Intel (transition scene - no inner voice)
  {
    id: 'interview-3',
    backgroundId: 'text-screen',
    mood: 'peaceful', // Friendly intel exchange
    dialog: [
      {
        text: 'Your phone buzzes. It\'s {contact_name}—your inside contact.',
      },
      {
        text: '"You there yet?"',
        speakerId: 'rachel',
        emotion: 'neutral',
      },
      {
        text: 'You type back: "In the lobby. Just saw some guy leave looking very pleased with himself."',
      },
      {
        text: '"Ignore him. Probably bombed and doesn\'t know it yet."',
        speakerId: 'rachel',
        emotion: 'smirking',
      },
      {
        text: '"Quick intel: {hr_name} is first. She\'s friendly but she\'s LOOKING for red flags. Don\'t overshare."',
        speakerId: 'rachel',
        emotion: 'neutral',
      },
      {
        text: '"{manager_name} is second. Direct. Hates fluff. Use numbers and specifics."',
        speakerId: 'rachel',
        emotion: 'neutral',
      },
      {
        text: '"{director_name} is last. She\'s intimidating but she\'s also desperate. Her best PM just left for a competitor. They NEED someone."',
        speakerId: 'rachel',
        emotion: 'concerned',
      },
      {
        text: '"But don\'t let them know you know that."',
        speakerId: 'rachel',
        emotion: 'smirking',
      },
      {
        text: 'Information asymmetry. Your secret weapon.',
      },
    ],
    nextSceneId: 'interview-4',
  },

  // Scene 4: The Walk In
  {
    id: 'interview-4',
    backgroundId: 'office',
    mood: 'professional', // Meeting HR
    dialog: [
      {
        text: '{hr_name} appears from around the corner. Warm smile. Hand extended.',
      },
      {
        text: '"You must be our 10 o\'clock. I\'m {hr_name}. Thanks for coming in."',
        speakerId: 'victoria',
        emotion: 'happy',
      },
      {
        text: 'Eye contact. Firm grip—not crushing. Genuine smile. Not too eager.',
      },
      {
        speakerId: 'inner-voice',
        text: 'The handshake. The first 30 seconds. Make them count.',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'interview-4-a',
        text: 'Mirror her energy exactly—warm, professional, matching.',
        nextSceneId: 'interview-5',
        feedback: 'OPTIMAL: Perfect calibration. You matched without mimicking.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-4-b',
        text: 'Dial up the confidence—firmer handshake, slight dominance.',
        nextSceneId: 'interview-5',
        feedback: 'Power move, but HR prefers warm. Slight friction created.',
        xpBonus: 8,
      },
      {
        id: 'interview-4-c',
        text: 'Dial up the warmth—extra friendly, enthusiastic.',
        nextSceneId: 'interview-5',
        feedback: 'Close. But eager can read as desperate in interviews.',
        xpBonus: 7,
      },
      {
        id: 'interview-4-d',
        text: 'Overthink it and fumble slightly.',
        nextSceneId: 'interview-5',
        feedback: 'She noticed. First impression slightly damaged.',
        xpBonus: 2,
      },
    ],
  },

  // Scene 5: The Opening Question
  {
    id: 'interview-5',
    backgroundId: 'office',
    mood: 'tense', // High stakes moment
    dialog: [
      {
        text: 'A small meeting room. {hr_name} gestures to a chair. Takes out a notepad.',
      },
      {
        text: '"So, tell me a little about yourself and what drew you to this role."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'This is not your life story. This is a highlight reel. Present-past-future. 90 seconds max.',
      },
      {
        speakerId: 'inner-voice',
        text: 'The most important question. And the easiest to fail.',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'interview-5-a',
        text: 'The Strategist: Focus on relevant experience + why this role is the logical next step.',
        nextSceneId: 'interview-6',
        feedback: 'OPTIMAL: Tight, relevant, forward-looking. Exactly what she wanted.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-5-b',
        text: 'The Passionate: Lead with enthusiasm for the company and mission.',
        nextSceneId: 'interview-6',
        feedback: 'Solid. Passion is good, but she wanted to see substance too.',
        xpBonus: 10,
      },
      {
        id: 'interview-5-c',
        text: 'The Humble Brag: Achievements presented as "learning experiences."',
        nextSceneId: 'interview-6',
        feedback: 'Transparent. She\'s heard this before.',
        xpBonus: 5,
      },
      {
        id: 'interview-5-d',
        text: 'The Life Story: Start from college, cover everything.',
        nextSceneId: 'interview-6',
        feedback: 'TRAP: Her eyes glazed at minute three. You lost her.',
        xpBonus: 0,
      },
    ],
  },
];
