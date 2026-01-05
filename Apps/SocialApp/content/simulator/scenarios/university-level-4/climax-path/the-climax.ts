import type { ForkScene } from '../../../types';

/**
 * Mission 21: The Climax
 * Harrison's final verdict - all paths converge
 */
export const climaxScenes: ForkScene[] = [
  // Dark Path - Took revenge on Blake
  {
    id: 'climax-dark-intro',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    chapter: { name: 'The Verdict', index: 1, total: 3 },
    mood: 'cold',
    dialog: [
      {
        text: 'Morning. Final day. The island feels different. Quieter.',
      },
      {
        text: 'Blake\'s room is empty. Shipped off before dawn.',
      },
      {
        text: 'You won. The network is yours. But something is missing.',
      },
      {
        text: 'Harrison summons you to the library. Private meeting.',
      },
      {
        text: 'Victory tastes like ash.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'climax-harrison-dark',
  },
  {
    id: 'climax-harrison-dark',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: '"You chose power." Harrison studies you.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Blake was weak. You saw that. Exploited it."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"That\'s the instinct this world rewards."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"But remember: someone will do the same to you. Someday."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Warning received. The game never ends.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-dark-verdict',
  },
  {
    id: 'climax-dark-verdict',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"You\'re in. Fully." Harrison extends his hand.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Maris will mentor you. She asked for you specifically."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"The network requires... certain tasks. You\'ll learn."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Welcome to the inside."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Inside. At what cost? Blake\'s ghost will haunt this victory.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ending-dark-network',
  },

  // Observer Path - Refused to play
  {
    id: 'climax-observer-intro',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    chapter: { name: 'The Verdict', index: 1, total: 3 },
    mood: 'professional',
    dialog: [
      {
        text: 'Morning. Final day. You\'re still here. Barely.',
      },
      {
        text: 'Blake sits in the Grove. Silent. Ashamed.',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: 'You didn\'t destroy him. But you didn\'t embrace him either.',
      },
      {
        text: 'Harrison summons you. Alone.',
      },
      {
        text: 'Principle held. But at what cost?',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'climax-harrison-observer',
  },
  {
    id: 'climax-harrison-observer',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: '"You refused the game." Harrison paces.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Not out of weakness. Out of principle."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"I don\'t understand principle. But I respect it."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"You\'re not in my network. But you\'re not my enemy either."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Neutral ground. Watching from the outside.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'climax-observer-verdict',
  },
  {
    id: 'climax-observer-verdict',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"You may stay in touch. Observe. Learn."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Perhaps... someday you\'ll understand why power matters."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Or perhaps you\'ll build something different. Either way, I\'ll be watching."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Watching. Still being evaluated. The game never truly ends.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-observer',
  },

  // Unity Path - Chose Blake over power
  {
    id: 'climax-unity-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'climax',
    chapter: { name: 'The Verdict', index: 1, total: 3 },
    mood: 'peaceful',
    dialog: [
      {
        text: 'Morning. Final day. Blake sits on the Grove\'s porch. Waiting.',
      },
      {
        text: '"I don\'t deserve your forgiveness."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"I know. But you have it anyway."',
      },
      {
        text: 'He breaks. Tears. Real ones.',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"Why? I betrayed you."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"Because Harrison wanted me to become like him. I chose not to."',
      },
      {
        text: 'Loyalty over power. Strange currency here.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-harrison-unity',
  },
  {
    id: 'climax-harrison-unity',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: 'Harrison summons you. Both of you.',
      },
      {
        text: '"An unusual choice." He studies the pair of you.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Blake broke. You forgave. Together you\'re... something I didn\'t expect."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Weaker individually. But together? Unpredictable."',
        speakerId: 'harrison',
        emotion: 'curious',
      },
      {
        text: 'He sees something. Value in unity.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-unity-verdict',
  },
  {
    id: 'climax-unity-verdict',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Lesser positions. But positions nonetheless."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"You\'ll work together. A unit. Report to Millicent."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'Blake\'s eyes widen. Hope.',
        speakerId: 'blake',
        emotion: 'hopeful',
      },
      {
        text: '"Millicent sees something in you both. I trust her judgment."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Don\'t disappoint."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Millicent. The reformer. That\'s significant.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-unity',
  },

  // Architect Path - Negotiated new terms
  {
    id: 'climax-architect-intro',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    chapter: { name: 'The Verdict', index: 1, total: 3 },
    mood: 'professional',
    dialog: [
      {
        text: 'Morning. Final day. Harrison summons you early.',
      },
      {
        text: 'Blake is already there. Different. Standing taller.',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"Last night changed things." Blake says.',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: '"You didn\'t destroy me. Or forgive me. You... rebuilt the game."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"That\'s what partners do."',
      },
      {
        text: 'True partnership. Forged in crisis.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-harrison-architect',
  },
  {
    id: 'climax-harrison-architect',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: '"You rewrote my test." Harrison stands at the window.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"I offered binary choices. You created a third option."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"That\'s... rare. I built my empire doing exactly that."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: '"Refusing the game as given. Building a new one."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'He sees himself in this. The architect recognizing architecture.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-architect-verdict',
  },
  {
    id: 'climax-architect-verdict',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Both of you. In. Full positions. As a pair."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Blake exhales. Relief and surprise.',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"You\'ll report to me directly. Not Maris. Not Millicent. Me."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: '"I want to see what you build. What kind of architects you become."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Don\'t disappoint me. I rarely give second chances."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Direct report. Highest possible entry. The Architect\'s heirs.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-architect',
  },
];
