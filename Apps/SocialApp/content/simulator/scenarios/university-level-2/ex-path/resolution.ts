import type { ForkScene } from '../../../types';

/**
 * Ex Path - Resolution
 * How the Marcus encounter ends and what you learned
 */
export const resolutionScenes: ForkScene[] = [
  {
    id: 'ex-resolution',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'The night winds down. Marcus lingers near your group.',
      },
      {
        text: '"Can I get your number?"',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'The question everyone asks. But with him, it means something different.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'resolution-trap',
        text: '"Absolutely! Here, let me type it in."',
        nextSceneId: 'ex-gave-number-eager',
        isOptimal: false,
        tactic: 'eager',
        reaction: {
          text: 'He takes the phone. Saves it. But his energy has already shifted down.',
          emotion: 'neutral',
          bodyLanguage: 'Too easy. The chase is over for him.',
          scoreImpact: -10,
        },
      },
      {
        id: 'resolution-subtle',
        text: '"What would you do with it?"',
        nextSceneId: 'ex-gave-number-curious',
        isOptimal: false,
        tactic: 'inquiry',
        reaction: {
          text: '"Text you. Maybe. When I feel like it." At least he\'s honest.',
          emotion: 'smirking',
          bodyLanguage: 'Dismissive avoidant honesty: I\'ll contact you on my terms.',
          scoreImpact: 5,
        },
      },
      {
        id: 'resolution-close',
        text: '"Give me yours. I\'ll text you if I feel like it."',
        nextSceneId: 'ex-flipped-script',
        isOptimal: false,
        tactic: 'flip',
        reaction: {
          text: 'He laughs. Genuine. "I like that." He types his number in.',
          emotion: 'happy',
          bodyLanguage: 'You took his power move and reversed it.',
          scoreImpact: 15,
        },
      },
      {
        id: 'resolution-optimal',
        text: '"Numbers are easy. What matters is what happens after."',
        nextSceneId: 'ex-real-talk',
        isOptimal: true,
        tactic: 'depth',
        reaction: {
          text: 'He pauses. "You\'re different." Not flirty. Genuine observation.',
          emotion: 'curious',
          bodyLanguage: 'You skipped the game. He doesn\'t know how to respond.',
          scoreImpact: 20,
        },
      },
    ],
  },
  // Resolution branches
  {
    id: 'ex-gave-number-eager',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    chapter: { name: 'Mission Complete: The Ex Returns', index: 4, total: 5 },
    dialog: [
      {
        text: 'He pockets the phone. "I\'ll be in touch."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He won\'t be. Or he\'ll text once in three weeks. On his schedule.',
      },
      {
        text: 'Dismissive avoidant lesson: they only value what retreats.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-event-intro',
  },
  {
    id: 'ex-gave-number-curious',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    chapter: { name: 'Mission Complete: The Ex Returns', index: 4, total: 5 },
    dialog: [
      {
        text: '"Honest answer? I don\'t know. I never know until later."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He takes your number anyway. But now you both know the terms.',
      },
      {
        text: 'At least he\'s upfront about his pattern. That\'s something.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-event-intro',
  },
  {
    id: 'ex-flipped-script',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    chapter: { name: 'Mission Complete: The Ex Returns', index: 4, total: 5 },
    dialog: [
      {
        text: '"No one\'s ever done that before."',
        speakerId: 'marcus',
        emotion: 'curious',
      },
      {
        text: '"Usually they\'re falling over themselves to give me their number."',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: '"Maybe that\'s the problem."',
      },
      {
        text: 'He nods slowly. Actually considering it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-event-intro',
  },
  {
    id: 'ex-real-talk',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    chapter: { name: 'Mission Complete: The Ex Returns', index: 4, total: 5 },
    dialog: [
      {
        text: '"You know... Blake never called me out. He just took it."',
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: '"I think that\'s why I kept pushing. To see if he\'d fight back."',
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: 'Self-sabotage. He was testing whether people cared enough to stay.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"Here." He hands you his phone. "Text yourself."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ex-real-talk-choice',
  },
  {
    id: 'ex-real-talk-choice',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'He looks at Blake. Something like regret.',
      },
      {
        text: '"I owe you an apology. A real one. Not tonight, but... sometime."',
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: 'Blake blinks. Doesn\'t know what to say.',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: 'Progress. Small, but real.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-event-intro',
  },
];
