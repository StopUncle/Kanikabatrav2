// Day 3: The Ceremony
// Scenes 29-30 - The wedding and the look

import type { Scene } from '../../../types';

export const ceremonyScenes: Scene[] = [
  {
    id: 'scene-29-ceremony',
    backgroundId: 'park',
    dialog: [
      {
        text: "The ceremony. You're seated three rows back, groom's side. {boyfriend} is up front with the groomsmen. {ex} is across from him.",
      },
      {
        text: "The processional begins. {boyfriend} walks with {ex}, arm in arm. They look good together. Natural. It stings.",
      },
    ],
    nextSceneId: 'scene-30-vows',
  },
  {
    id: 'scene-30-vows',
    backgroundId: 'park',
    dialog: [
      {
        text: "The vows. {bride} and {groom} face each other. \"For better or worse. In sickness and in health.\" The words echo. {boyfriend} glances at {ex} during \"for better or worse.\" She glances back.",
        speakerId: 'sophia',
        emotion: 'happy',
      },
      {
        
        text: "That look. There it was again.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-30-1',
        text: 'Focus on the ceremony. Not them.',
        nextSceneId: 'scene-30-let-go',
        xpBonus: 5,
        feedback: 'Discipline. But you\'re not learning anything.',
        tactic: 'mental_surrender',
      },
      {
        id: 'choice-30-2',
        text: 'Let it show. See if he notices.',
        nextSceneId: 'scene-30-react',
        feedback: 'You showed your hand. Now they know where to aim next time.',
        tactic: 'visible_pain',
      },
      {
        id: 'choice-30-3',
        text: 'Watch {bride} instead. Something\'s off between those two.',
        nextSceneId: 'scene-30-observe',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Intel. {bride}\'s not happy. {groom}\'s smiles don\'t reach his eyes. Noted.',
        tactic: 'strategic_observation',
      },
      {
        id: 'choice-30-4',
        text: 'Watch. Learn. Decide later.',
        nextSceneId: 'scene-30-reflect',
        xpBonus: 10,
        feedback: 'The right question. No answer yet, but asking matters.',
        tactic: 'self_clarity',
      },
    ],
  },
  {
    id: 'scene-30-let-go',
    backgroundId: 'park',
    dialog: [
      {
        text: "You focus on the ceremony. The flowers. The vows. Not on them. Not on what that look might have meant.",
      },
      {
        text: "\"I now pronounce you husband and wife.\" The crowd cheers. {boyfriend} catches your eye from the front. He smiles. Maybe it's enough.",
      },
    ],
    nextSceneId: 'scene-31-reception',
  },
  {
    id: 'scene-30-react',
    backgroundId: 'park',
    dialog: [
      {
        text: "Your face falls before you can stop it. {sister} beside you squeezes your hand. \"I saw it too,\" she whispers. \"We'll talk at the reception.\"",
        speakerId: 'lily',
        emotion: 'concerned',
      },
      {
        text: "The ceremony ends. {boyfriend} finds you immediately. \"Hey. You okay?\" He saw your face. He knows something's wrong.",
        speakerId: 'ethan',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'scene-31-reception',
  },
  {
    id: 'scene-30-observe',
    backgroundId: 'park',
    dialog: [
      {
        text: "You watch {bride} and {groom} instead. Really watch. {bride} looks... nervous. Not happy-nervous. Anxious. {groom}'s smiles don't quite reach his eyes.",
      },
      {
        text: "Interesting. Everyone's focused on the love story. But something's off between the leads. You file that away.",
      },
    ],
    nextSceneId: 'scene-31-reception',
  },
  {
    id: 'scene-30-reflect',
    backgroundId: 'park',
    dialog: [
      {
        text: "You stare past the ceremony. Think. Is this what you want? This group? These people? The constant tests? The never quite belonging?",
      },
      {
        text: "The question forms clearly: Are you fighting for {boyfriend} or against the idea of losing? When the ceremony ends, you still don't have an answer.",
      },
    ],
    nextSceneId: 'scene-31-reception',
  },
];
