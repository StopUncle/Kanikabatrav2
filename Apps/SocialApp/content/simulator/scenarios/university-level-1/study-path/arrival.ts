import type { ForkScene } from '../../../types';

/**
 * Study Hall Path - Scene 1: Arrival
 * A quieter environment. Different energy entirely.
 */
export const arrivalScenes: ForkScene[] = [
  {
    id: 'study-hall-arrival',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    chapter: {
      name: 'The Common Room',
      index: 1,
      total: 5,
    },
    dialog: [
      {
        text: 'The common room is almost empty. A few students scattered around tables, heads buried in textbooks. The only sounds are pages turning and the quiet hum of a vending machine.',
      },
      {
        text: 'After the intensity of deciding not to go to the party, this feels like a different world.',
      },
      {
        text: 'You spot her immediately. In the corner by the window—a girl with dark hair pulled back, surrounded by a fortress of books. She\'s wearing an oversized cardigan and hasn\'t looked up once.',
      },
      {
        text: 'That must be Casey.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'arrival-observe',
        text: 'Take a seat nearby. Watch how she operates before approaching.',
        reaction: {
          text: 'You settle into a chair a few tables away. She\'s completely absorbed—hasn\'t noticed you at all.',
          emotion: 'neutral',
          bodyLanguage: 'Patient approach. Smart.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-observation',
        isOptimal: true,
      },
      {
        id: 'arrival-direct',
        text: 'Walk right up and introduce yourself.',
        reaction: {
          text: 'She jumps when she sees you, knocking a highlighter off the table. "Oh! I—sorry—you startled me."',
          emotion: 'confused',
          bodyLanguage: 'Her cheeks flush. She wasn\'t expecting human interaction.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-meeting-casey',
      },
      {
        id: 'arrival-ask-help',
        text: 'Approach with a question about one of her textbooks.',
        reaction: {
          text: 'She looks up, surprise melting into cautious interest when she sees what you\'re pointing at. "The microeconomics one? Are you in Professor Walsh\'s section?"',
          emotion: 'curious',
          bodyLanguage: 'A topic she knows. She relaxes slightly.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-meeting-casey',
      },
    ],
  },
  {
    id: 'study-observation',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'You watch from your table. Casey is meticulous—color-coded notes, tabs on every chapter, a system that probably took years to develop.',
      },
      {
        text: 'She checks her phone twice in fifteen minutes. Both times, her face falls slightly at whatever she sees—or doesn\'t see.',
      },
      {
        text: 'Lonely. Waiting for someone to reach out.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: 'When a book slips from her stack and lands loudly on the floor, she looks around with genuine embarrassment—like she\'s apologizing to the room for existing.',
      },
      {
        text: 'Careful. She bruises easy.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'obs-help-book',
        text: 'Get up and hand her the fallen book with a friendly smile.',
        reaction: {
          text: 'She looks up at you, startled but grateful. "Oh—thank you. You really didn\'t have to."',
          emotion: 'happy',
          bodyLanguage: 'Simple kindness. It means more to her than it should.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-meeting-casey',
        isOptimal: true,
      },
      {
        id: 'obs-wait-more',
        text: 'Keep watching. More information is better.',
        reaction: {
          text: 'She picks up the book herself, glancing around. For a moment, her eyes land on you—and away. Did she notice you watching?',
          emotion: 'neutral',
          bodyLanguage: 'Careful not to seem like a stalker.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-meeting-casey',
      },
    ],
  },
  {
    id: 'study-hall-late-arrival',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'It\'s late now. The party failed. But maybe this path was always the better one.',
      },
      {
        text: 'The common room is almost deserted. Just one person left—a girl in the corner, surrounded by books, eyes heavy with fatigue.',
      },
      {
        text: 'Casey. She\'s still here.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: 'She looks up as you approach, blinking like she\'s not sure you\'re real.',
      },
      {
        text: '"The common room closes in thirty minutes..." She trails off, uncertain why she\'s telling you this.',
        speakerId: 'casey',
        emotion: 'confused',
      },
    ],
    dialogueChoices: [
      {
        id: 'late-friendly',
        text: '"I know. Rough night. Mind if I sit?"',
        reaction: {
          text: 'She gestures to the chair across from her, still puzzled but not unwelcoming. "Sure. I\'m just... wrapping up anyway."',
          emotion: 'neutral',
          bodyLanguage: 'Late night connection. Different energy than daytime.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-meeting-casey',
      },
      {
        id: 'late-honest',
        text: '"I just left a party. Needed somewhere quieter."',
        reaction: {
          text: 'Her eyebrows rise. "A party? The Caldwell one?" She seems to shrink slightly.',
          emotion: 'sad',
          bodyLanguage: 'She knows about it. Wasn\'t invited.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-meeting-casey',
      },
    ],
  },
];
