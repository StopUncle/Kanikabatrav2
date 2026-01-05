import type { ForkScene } from '../../../types';

/**
 * Study Hall Path - Scene 3: Building Rapport
 * Deepening the connection with Casey through validation exchange
 */
export const rapportScenes: ForkScene[] = [
  {
    id: 'study-rapport',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    chapter: {
      name: 'The Common Room',
      index: 3,
      total: 5,
    },
    dialog: [
      {
        text: 'The conversation has shifted. Casey\'s posture is more open now, her books pushed aside.',
      },
      {
        text: '"Can I tell you something weird?" She fidgets with her highlighter. "You\'re the first person who\'s actually asked me about my classes. Not the gala. Not who I know. Just... me."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She\'s been overlooked her whole life. This is what she craves.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'rapport-genuine',
        text: '"That sucks. People should care about more than what you can do for them."',
        reaction: {
          text: 'Casey blinks. "Yeah. It does." She laughs softly, surprised by your bluntness.',
          emotion: 'happy',
          bodyLanguage: 'You didn\'t sugarcoat it. She appreciates that.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-opening-up',
        isOptimal: true,
        tactic: 'validation-exchange',
      },
      {
        id: 'rapport-deflect',
        text: '"People are dumb. Ignore them."',
        reaction: {
          text: 'Casey half-smiles, but it doesn\'t reach her eyes. "Yeah. I guess." The moment passes.',
          emotion: 'neutral',
          bodyLanguage: 'Generic validation. She wanted something more personal.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-opening-up',
      },
      {
        id: 'rapport-redirect',
        text: '"Well, I\'m glad I asked. Now tell me about that economics class."',
        reaction: {
          text: 'She brightens slightly and launches into a description of her professor. Safe territory again.',
          emotion: 'neutral',
          bodyLanguage: 'Redirecting away from vulnerability. She noticed.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-opening-up',
      },
    ],
  },
  {
    id: 'study-opening-up',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Casey starts talking. Really talking. About her hometown, her overbearing parents, how she ended up at Whitmore because it was far enough away but not too far.',
      },
      {
        text: '"My mom wanted me to go to a school closer to home. She\'s..." Casey pauses. "She\'s a lot. Everything has to be perfect. Report cards. Room cleanliness. Even my friends had to be \'appropriate.\'"',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"I thought college would be different. But I\'m still just... invisible. The people who notice me want something."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'She\'s handing you her blueprint. Handle with care.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'open-mirror',
        text: '"Yeah. I get that. High school was like that for me too."',
        reaction: {
          text: 'Casey\'s eyes widen slightly. "Really? You seem so... put together."',
          emotion: 'curious',
          bodyLanguage: 'You shared something without oversharing. Good balance.',
          scoreImpact: 15,
        },
        nextSceneId: 'study-connection',
        isOptimal: true,
        tactic: 'strategic-vulnerability',
      },
      {
        id: 'open-advice',
        text: '"Have you tried putting yourself out there more? Joining clubs?"',
        reaction: {
          text: 'Casey\'s expression flattens. "That\'s what the counselor said." She returns to her books.',
          emotion: 'sad',
          bodyLanguage: 'Unsolicited advice. The opposite of what she needed.',
          scoreImpact: -10,
        },
        nextSceneId: 'study-recovery',
      },
      {
        id: 'open-compliment',
        text: '"You\'re smart and clearly capable. People will see that eventually."',
        reaction: {
          text: '"Eventually." She repeats the word with a bitter edge. "Yeah. I\'ve been waiting for eventually."',
          emotion: 'sad',
          bodyLanguage: 'Generic reassurance. She\'s heard it before.',
          scoreImpact: 0,
        },
        nextSceneId: 'study-connection',
      },
      {
        id: 'open-mock',
        text: '"Sounds like you need therapy, not a study buddy."',
        reaction: {
          text: 'Casey goes completely still. Then, without a word, she begins gathering her things.',
          emotion: 'cold',
          bodyLanguage: 'Silence. Worse than anger.',
          scoreImpact: -50,
        },
        nextSceneId: 'casey-mock-exit',
      },
    ],
  },
  {
    id: 'study-connection',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Something shifts between you. The guarded distance Casey maintained has shrunk.',
      },
      {
        text: '"You know what\'s funny?" She glances at the clock. "I was supposed to finish three chapters tonight. I haven\'t opened a single book since you sat down."',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: '"I don\'t mind, though. This is... nice."',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'The bond is forming. Now maintain it without pushing.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'conn-reciprocate',
        text: '"Same. This beats staring at my phone alone in my room."',
        reaction: {
          text: 'Casey smiles—a real one. "Low bar, but I\'ll take it."',
          emotion: 'happy',
          bodyLanguage: 'Self-deprecating humor landed. She\'s comfortable now.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-discovery',
        isOptimal: true,
      },
      {
        id: 'conn-tease',
        text: '"Don\'t worry, I won\'t tell your professor you slacked off."',
        reaction: {
          text: 'She laughs. A real one. "Deal. Our secret."',
          emotion: 'happy',
          bodyLanguage: 'Light humor. Creating an inside joke between you.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-discovery',
      },
      {
        id: 'conn-push',
        text: '"We should hang out more. Maybe grab coffee sometime?"',
        reaction: {
          text: 'Casey\'s smile falters slightly. "Oh. Um. Sure. Maybe." She retreats an inch.',
          emotion: 'confused',
          bodyLanguage: 'Too fast. She needs more time before escalation.',
          scoreImpact: -5,
        },
        nextSceneId: 'study-discovery',
      },
    ],
  },
  {
    id: 'study-recovery',
    backgroundId: 'common-room',
    sceneType: 'dialogue',
    pathId: 'study-hall',
    mood: 'tense',
    dialog: [
      {
        text: 'The conversation has stalled. Casey is back in her books, the earlier openness gone.',
      },
      {
        text: 'You\'ve lost ground. Time to recover.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
      {
        text: 'She glances up briefly, then back at her notes. The wall is back up, but not fully.',
      },
    ],
    dialogueChoices: [
      {
        id: 'recover-acknowledge',
        text: '"Hey. I didn\'t mean to sound preachy back there. Old habit."',
        reaction: {
          text: 'Casey looks up. "It\'s okay. Everyone thinks they know what I need." A pause. "At least you noticed."',
          emotion: 'neutral',
          bodyLanguage: 'Acknowledging the misstep. That takes maturity.',
          scoreImpact: 10,
        },
        nextSceneId: 'study-connection',
        isOptimal: true,
      },
      {
        id: 'recover-silence',
        text: 'Give her space. Pull out your phone and pretend to check something.',
        reaction: {
          text: 'After a few minutes, she speaks without looking up. "Sorry. I get defensive sometimes."',
          emotion: 'sad',
          bodyLanguage: 'She apologized. Interesting.',
          scoreImpact: 5,
        },
        nextSceneId: 'study-discovery',
      },
      {
        id: 'recover-leave',
        text: '"I should let you study. Nice meeting you."',
        reaction: {
          text: '"Oh." Disappointment flickers across her face. "Okay. Yeah. See you around."',
          emotion: 'sad',
          bodyLanguage: 'She wanted you to stay. Now you\'ve confirmed her fears.',
          scoreImpact: -15,
        },
        nextSceneId: 'ending-study-fail',
      },
    ],
  },
];
