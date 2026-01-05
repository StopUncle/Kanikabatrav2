import type { ForkScene } from '../../../types';

/**
 * Mission 15: The Final Choice - The Decision
 * Inside or outside the circle? The ultimate choice.
 */
export const decisionScenes: ForkScene[] = [
  {
    id: 'climax-decision-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: 'Harrison raises his hand. Silence falls.',
      },
      {
        text: '"Enough. The debate is informative, but unnecessary."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He turns to you. Direct. Evaluating.',
      },
      {
        text: '"The question isn\'t whether you\'re worthy. It\'s whether you want this."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Join us. Formally. With all that entails."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'climax-the-offer',
  },
  {
    id: 'climax-the-offer',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: '"The network offers access. Resources. Protection."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"In return, we ask for loyalty. Discretion. And occasional... services."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'The crowd watches. This is unprecedented—an offer made publicly.',
      },
      {
        text: '"You have until the end of the evening to decide."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Kai catches your eye. Nodding slightly. Encouraging.',
        speakerId: 'kai',
        emotion: 'knowing',
      },
      {
        text: 'Millicent\'s warning echoes: "You can still walk away."',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-final-choice',
  },
  {
    id: 'climax-final-choice',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'The crowd disperses. The spotlight dims. But eyes are still watching.',
      },
      {
        text: 'Blake pulls you aside. "You don\'t have to do this. We can leave. Right now."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Maris appears. "Whatever you choose, choose quickly. Indecision is worse than a wrong answer."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Victoria is watching from across the room. Waiting.',
      },
      {
        text: 'This is it. The moment everything led to.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'final-refuse',
        text: '"I\'m walking away. This isn\'t what I want."',
        nextSceneId: 'climax-refuse',
        isOptimal: false,
        tactic: 'integrity',
        reaction: {
          text: 'Maris\'s expression doesn\'t change. "Then we have nothing more to discuss."',
          emotion: 'cold',
          bodyLanguage: 'You chose integrity. But you\'ve made powerful enemies.',
          scoreImpact: 0,
        },
      },
      {
        id: 'final-stall',
        text: '"I need more information. What exactly are these \'services\'?"',
        nextSceneId: 'climax-negotiate',
        isOptimal: false,
        tactic: 'cautious',
        reaction: {
          text: '"You\'ll learn when you need to. That\'s how trust works here."',
          emotion: 'neutral',
          bodyLanguage: 'Questions show uncertainty. They expected commitment.',
          scoreImpact: -10,
        },
      },
      {
        id: 'final-accept',
        text: '"I accept. I\'m in. Whatever it takes."',
        nextSceneId: 'climax-accept',
        isOptimal: false,
        tactic: 'commit',
        reaction: {
          text: 'Maris smiles. Cold. Satisfied. "Welcome to the next level."',
          emotion: 'seductive',
          bodyLanguage: 'You\'re in. But you signed blind. What did you agree to?',
          scoreImpact: 15,
        },
      },
      {
        id: 'final-conditional',
        text: '"I\'m interested. But I have conditions. I choose what services I provide."',
        nextSceneId: 'climax-conditional',
        isOptimal: true,
        tactic: 'negotiate-power',
        reaction: {
          text: 'Harrison\'s eyes sharpen. "Conditions. Interesting. What are they?"',
          emotion: 'curious',
          bodyLanguage: 'You\'re not a pawn. You\'re demanding a seat at the table.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'climax-refuse',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: 'Maris turns away. Dismissal.',
      },
      {
        text: 'Victoria actually looks pleased. One less competitor.',
      },
      {
        text: 'Kai finds you. "You sure? This door doesn\'t open twice."',
        speakerId: 'kai',
        emotion: 'concerned',
      },
      {
        text: '"I\'m sure."',
      },
      {
        text: 'Blake exhales in relief. "Let\'s get out of here."',
        speakerId: 'blake',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-neutral-intro',
  },
  {
    id: 'climax-negotiate',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'cold',
    dialog: [
      {
        text: '"Services include information gathering. Relationship management. Occasional leverage."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Nothing illegal. Usually. Nothing you wouldn\'t do anyway."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'She leans in.',
      },
      {
        text: '"The question is: are you in? Or are you wasting my time?"',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Decision forced. Now or never.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-final-moment',
  },
  {
    id: 'climax-accept',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: '"Then it\'s settled."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Harrison approaches. Extends his hand. You shake it.',
      },
      {
        text: '"You\'ll receive instructions tomorrow. Welcome to the network."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Victoria watches. She\'s lost this round. She knows it.',
      },
      {
        text: 'You\'re in. Whatever that means.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-bridge-intro',
  },
  {
    id: 'climax-conditional',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: 'Harrison and Maris exchange a look. Something passes between them.',
      },
      {
        text: '"No one\'s set conditions before. Most are too eager."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Name them."',
        speakerId: 'maris',
        emotion: 'curious',
      },
      {
        text: '"I choose my projects. I know what I\'m getting into before I commit. And I can walk away if the line moves."',
      },
      {
        text: 'A long moment. Then—',
      },
      {
        text: '"Acceptable. For now."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'You negotiated from a position of leverage. They respect that.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-bridge-intro',
  },
  {
    id: 'climax-final-moment',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'Maris waits. Patient. Deadly patient.',
      },
      {
        text: '"In or out?"',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Blake is pale. This is beyond his world.',
      },
      {
        text: 'One word. One choice. Everything changes.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'final-moment-out',
        text: '"Out. I\'m done playing."',
        nextSceneId: 'ending-neutral-intro',
        isOptimal: false,
        tactic: 'exit',
        reaction: {
          text: '"Pity." Maris turns away. You\'re invisible now.',
          emotion: 'cold',
          bodyLanguage: 'The door closes. Forever.',
          scoreImpact: -5,
        },
      },
      {
        id: 'final-moment-in',
        text: '"In. Let\'s see where this goes."',
        nextSceneId: 'climax-bridge-intro',
        isOptimal: true,
        tactic: 'commit-curious',
        reaction: {
          text: '"Curiosity. That\'s what I was looking for." She almost smiles.',
          emotion: 'seductive',
          bodyLanguage: 'You\'re in. With conditions implied.',
          scoreImpact: 15,
        },
      },
    ],
  },
];
