import type { ForkScene } from '../../../types';

/**
 * Mission 13: Power Network - Harrison Cole
 * The quiet power broker makes his move
 */
export const harrisonScenes: ForkScene[] = [
  {
    id: 'power-network-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    chapter: { name: 'Power Network', index: 4, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'The gala continues. New opportunities emerging.',
      },
      {
        text: 'Blake finds you. "You survived Maris AND Millicent? That\'s... that\'s impressive."',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Barely."',
      },
      {
        text: '"Barely counts. Now look. Three o\'clock. Harrison Cole. He\'s been watching you."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'The quiet one. The one who runs things without anyone noticing.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-approaches',
  },
  {
    id: 'harrison-approaches',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: 'He walks over. No entourage. No fanfare. Just presence.',
      },
      {
        text: '"You\'ve made quite an impression tonight."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Not a question. A statement of fact.',
      },
      {
        text: '"Both Caldwells in one evening. That\'s usually a career-ending experience."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'He knows everything that happened. Of course he does.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'harrison-trap',
        text: '"I\'m just trying to make connections."',
        nextSceneId: 'harrison-dismissive',
        isOptimal: false,
        tactic: 'modest',
        reaction: {
          text: '"Connections." He sounds bored. "Everyone makes connections. Few make impact."',
          emotion: 'neutral',
          bodyLanguage: 'Generic answer. He expected more.',
          scoreImpact: -10,
        },
      },
      {
        id: 'harrison-subtle',
        text: '"Career-ending for some. Character-building for others."',
        nextSceneId: 'harrison-interested',
        isOptimal: false,
        tactic: 'reframe',
        reaction: {
          text: '"Character." He tilts his head. "That\'s an interesting word choice."',
          emotion: 'curious',
          bodyLanguage: 'You showed perspective. He noted it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'harrison-close',
        text: '"You\'ve been watching too. What did you see?"',
        nextSceneId: 'harrison-direct',
        isOptimal: false,
        tactic: 'direct',
        reaction: {
          text: '"Direct. I appreciate that." He nods. "I saw adaptation."',
          emotion: 'neutral',
          bodyLanguage: 'Good approach. Could have been more nuanced.',
          scoreImpact: 5,
        },
      },
      {
        id: 'harrison-optimal',
        text: '"The Caldwells were tests. You\'re the offer. What\'s the proposition?"',
        nextSceneId: 'harrison-impressed',
        isOptimal: true,
        tactic: 'pattern-recognition',
        reaction: {
          text: 'His eyes sharpen. Real interest. "You see the board, not just the pieces."',
          emotion: 'knowing',
          bodyLanguage: 'You read the situation. He respects that.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'harrison-dismissive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Connections happen naturally. Or they don\'t."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He pulls a card from his pocket. Plain. White. A number.',
      },
      {
        text: '"If something interesting happens, call. Otherwise... enjoy the party."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Dismissed. Politely. But definitely dismissed.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-departs',
  },
  {
    id: 'harrison-interested',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Character is the only thing that compounds. Money fluctuates. Power shifts. Character... builds."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Is that what you look for?"',
      },
      {
        text: '"I look for people who understand that. Most don\'t."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'He\'s evaluating you. Differently than Maris. More... patiently.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-proposition',
  },
  {
    id: 'harrison-direct',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Adaptation. Under pressure. That\'s rare."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Maris pushes. You bent but didn\'t break. Millicent probed. You held ground."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You were watching that closely?"',
      },
      {
        text: '"I watch everything closely. It\'s why I\'m still here."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'A waiter stumbles nearby. Red wine cascades down a guest\'s white dress. The woman gasps, humiliated.',
      },
      {
        text: 'Harrison watches. His expression doesn\'t change. "Fascinating how quickly dignity evaporates." He takes a sip of his drink. "She\'ll never recover socially. That waiter just ended a career she spent decades building."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'No concern. No sympathy. Just... observation. Like watching insects.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'harrison-proposition',
  },
  {
    id: 'harrison-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"The proposition." He smiles. Actually smiles.',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: '"I collect talent. Not for myself. For the ecosystem. Good people in good positions make everything work."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"And you think I\'m... good people?"',
      },
      {
        text: '"I think you might be. The jury\'s still out. But I like what I\'ve seen."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'An offer. Not explicit. But there.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-proposition',
  },
  {
    id: 'harrison-proposition',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"I\'m hosting a smaller gathering. Thursday. Invitation only."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He hands you a card. Heavy cardstock. Embossed.',
      },
      {
        text: '"Consider this your invitation. If you choose to use it."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'Another door opening. Or another test.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'proposition-trap',
        text: '"I\'ll definitely be there."',
        nextSceneId: 'harrison-too-eager',
        isOptimal: false,
        tactic: 'eager',
        reaction: {
          text: '"Definitely." A slight frown. "Certainty without information. Interesting."',
          emotion: 'neutral',
          bodyLanguage: 'Too eager. He values deliberation.',
          scoreImpact: -5,
        },
      },
      {
        id: 'proposition-subtle',
        text: '"Thank you. I\'ll consider it."',
        nextSceneId: 'harrison-respectful',
        isOptimal: false,
        tactic: 'polite',
        reaction: {
          text: '"Consider carefully. These gatherings have... consequences."',
          emotion: 'neutral',
          bodyLanguage: 'Neutral response. Neither impressed nor disappointed.',
          scoreImpact: 0,
        },
      },
      {
        id: 'proposition-close',
        text: '"What should I expect?"',
        nextSceneId: 'harrison-curious',
        isOptimal: false,
        tactic: 'information',
        reaction: {
          text: '"Expect to be tested. Again. By different people. For different things."',
          emotion: 'knowing',
          bodyLanguage: 'Good question. Honest answer.',
          scoreImpact: 10,
        },
      },
      {
        id: 'proposition-optimal',
        text: '"Who else will be there that you want me to meet?"',
        nextSceneId: 'harrison-strategic',
        isOptimal: true,
        tactic: 'strategic',
        reaction: {
          text: 'A real smile. "You\'re asking the right questions. I like that."',
          emotion: 'smirking',
          bodyLanguage: 'You think ahead. That\'s what he was testing.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'harrison-too-eager',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Eagerness can be a liability. In certain rooms."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Point taken."',
      },
      {
        text: '"Good. Learning from subtle criticism. That\'s useful."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'A lesson wrapped in a correction. He\'s teaching whether he admits it or not.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-departs',
  },
  {
    id: 'harrison-respectful',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Consequences can be opportunities. Or they can be endings."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Which one depends on...?"',
      },
      {
        text: '"Preparation. Awareness. And a little luck."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'He believes in luck. That\'s interesting.',
        speakerId: 'inner-voice',
        emotion: 'curious',
      },
    ],
    nextSceneId: 'harrison-departs',
  },
  {
    id: 'harrison-curious',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"I don\'t give previews. It defeats the purpose."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"The purpose being...?"',
      },
      {
        text: '"To see how people respond to the unexpected. Plans are useful. Adaptability is essential."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'No safety net. Just raw ability. That\'s his test.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-departs',
  },
  {
    id: 'harrison-strategic',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"A few people. Maris, obviously. Her mother, perhaps."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"There\'s a woman named Sarah Chen. Tech sector. Very sharp. I think you\'d get along."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"And Victoria?"',
      },
      {
        text: '"Victoria will not be invited. For reasons that will become clear."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Factions. There are factions here. And Harrison isn\'t on Victoria\'s side.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'harrison-departs',
  },
  {
    id: 'harrison-departs',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"I should circulate. Duties of the evening."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He extends his hand. Firm. Brief.',
      },
      {
        text: '"Thursday. Eight PM. Address is on the card. Don\'t be late."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: 'He disappears into the crowd. Like smoke.',
      },
      {
        text: 'Harrison Cole. Quiet power. The most dangerous kind.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'victoria-approaches',
  },
];
