import type { ForkScene } from '../../../types';

/**
 * Party Path - Scene 5: The Ticket Moment
 * Maris decides. This scene's outcome depends on cumulative performance.
 */
export const ticketMomentScenes: ForkScene[] = [
  {
    id: 'party-ticket-moment',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'mysterious',
    chapter: {
      name: 'The Party',
      index: 5,
      total: 5,
    },
    dialog: [
      {
        text: 'Maris reaches into her clutch. Pulls out an envelope. The Caldwell crest catches the light—gold on cream, unmistakable.',
      },
      {
        text: '"These are harder to get than admission letters." Her voice is soft. "You know that, right?"',
        speakerId: 'maris',
        emotion: 'seductive',
      },
      {
        text: 'Everything from tonight led here. The game, the questions, how you handled her.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: '"One ticket. I\'ll see you at the gala." She holds it out, her fingers lingering.',
        speakerId: 'maris',
        emotion: 'seductive',
      },
    ],
    dialogueChoices: [
      {
        id: 'ticket-accept-cool',
        text: 'Take it. Don\'t thank her. "See you there."',
        reaction: {
          text: 'Her smile deepens. "I know you will." Something dangerous and promising in her eyes.',
          emotion: 'seductive',
          bodyLanguage: 'This isn\'t a gift. It\'s a first payment on something you don\'t fully understand yet.',
          scoreImpact: 15,
        },
        nextSceneId: 'ending-party-success',
        isOptimal: true,
      },
      {
        id: 'ticket-accept-grateful',
        text: '"I—wow. Thank you." Mean it.',
        reaction: {
          text: 'Something flickers across her face—is that disappointment? "Don\'t thank me. You earned a chance. That\'s all."',
          emotion: 'neutral',
          bodyLanguage: 'She doesn\'t want gratitude. She wants intrigue.',
          scoreImpact: 5,
        },
        nextSceneId: 'ending-party-success',
      },
      {
        id: 'ticket-question',
        text: '"Why me?"',
        reaction: {
          text: 'She considers. "Because you didn\'t bore me. You didn\'t break." Her smile curves. "And you\'re not afraid of me. That\'s... refreshing."',
          emotion: 'curious',
          bodyLanguage: 'A glimpse behind the mask. Maybe.',
          scoreImpact: 10,
        },
        nextSceneId: 'ending-party-success',
        tactic: 'understanding-motive',
      },
      {
        id: 'ticket-expose',
        text: '"I know what you\'re doing. The hot and cold thing."',
        reaction: {
          text: 'The envelope slides back into her clutch. Her smile doesn\'t waver. "Interesting theory." She walks away without looking back.',
          emotion: 'cold',
          bodyLanguage: 'You called out a psychopath. They don\'t forget.',
          scoreImpact: -50,
        },
        nextSceneId: 'maris-expose-exit',
      },
    ],
  },
  {
    id: 'party-ticket-denied',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'party',
    mood: 'cold',
    dialog: [
      {
        text: 'Maris\'s hand goes to her clutch. Hovers there. Then drops to her side.',
      },
      {
        text: '"You know... I was going to give you one." Her voice is sympathetic. Kind, even. "But something doesn\'t feel right."',
        speakerId: 'maris',
        emotion: 'sad',
      },
      {
        text: '"Maybe next time. When you\'ve... grown a little." She touches your cheek briefly, then turns away.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She slips back inside without another word.',
      },
    ],
    dialogueChoices: [
      {
        id: 'denied-accept',
        text: 'Say nothing. Let her go.',
        reaction: {
          text: 'The glass door closes. You\'re alone on the balcony with the city lights and a lesson learned.',
          emotion: 'neutral',
          bodyLanguage: 'Sometimes you play everything right and still lose.',
          scoreImpact: 0,
        },
        nextSceneId: 'ending-party-fail',
      },
      {
        id: 'denied-ask',
        text: '"Wait—what did I do wrong?"',
        reaction: {
          text: 'Maris pauses, glances back with something like pity. "You wanted it too much. Or not enough. I couldn\'t tell." The door clicks shut.',
          emotion: 'cold',
          bodyLanguage: 'Vague rejection. The cruelest kind.',
          scoreImpact: -5,
        },
        nextSceneId: 'ending-party-fail',
      },
      {
        id: 'denied-redirect',
        text: 'Head for the common room. Casey might still be there.',
        reaction: {
          text: 'You leave the balcony. The party noise washes over you as you slip toward the door.',
          emotion: 'neutral',
          bodyLanguage: 'One path closed. Another might still be open.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-hall-late-arrival',
      },
    ],
  },
];
