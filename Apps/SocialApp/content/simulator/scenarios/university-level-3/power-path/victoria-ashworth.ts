import type { ForkScene } from '../../../types';

/**
 * Mission 13: Power Network - Victoria Ashworth
 * The hostess delivers a warning
 */
export const victoriaScenes: ForkScene[] = [
  {
    id: 'victoria-approaches',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    chapter: { name: 'Power Network', index: 4, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'Blake returns. "Heads up. Victoria incoming. She does not look happy."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Victoria Ashworth glides toward you. Perfect hair. Perfect dress. Eyes like daggers.',
      },
      {
        text: '"Well, well. The rising star everyone keeps whispering about."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'This is not going to be friendly.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'victoria-territorial',
  },
  {
    id: 'victoria-territorial',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'tense',
    dialog: [
      {
        text: '"Let me be direct. This is my event. My foundation. My guest list."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"I know who you are. I know where you came from. I know who brought you here."',
        speakerId: 'victoria',
        emotion: 'serious',
      },
      {
        text: 'She knows about Kai. About Maris. About everything.',
      },
      {
        text: '"And I\'m still deciding whether that\'s a problem."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'A threat. Thinly veiled but clear.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'victoria-trap',
        text: '"I\'m not here to cause problems. I\'m just networking."',
        nextSceneId: 'victoria-weak',
        isOptimal: false,
        tactic: 'defensive',
        reaction: {
          text: '"Networking." She laughs. Cold. "Everyone is networking. Few matter."',
          emotion: 'smirking',
          bodyLanguage: 'You showed weakness. She smells blood.',
          scoreImpact: -15,
        },
      },
      {
        id: 'victoria-subtle',
        text: '"I appreciate the hospitality. Your home is beautiful."',
        nextSceneId: 'victoria-redirect',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Don\'t patronize me. I\'ve been doing this longer than you\'ve been alive."',
          emotion: 'cold',
          bodyLanguage: 'Deflection failed. She\'s not easily distracted.',
          scoreImpact: -5,
        },
      },
      {
        id: 'victoria-close',
        text: '"If I were a problem, you\'d know by now. I prefer to be an asset."',
        nextSceneId: 'victoria-intrigued',
        isOptimal: false,
        tactic: 'reframe',
        reaction: {
          text: '"An asset. To whom?" She narrows her eyes.',
          emotion: 'curious',
          bodyLanguage: 'You shifted the dynamic. She\'s listening.',
          scoreImpact: 10,
        },
      },
      {
        id: 'victoria-optimal',
        text: '"You\'re deciding. But so am I. We both have choices to make."',
        nextSceneId: 'victoria-respect',
        isOptimal: true,
        tactic: 'equal-footing',
        reaction: {
          text: 'A pause. Something flickers in her eyes. "Interesting approach."',
          emotion: 'neutral',
          bodyLanguage: 'You didn\'t cower. She didn\'t expect that.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'victoria-weak',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Let me give you some advice. Free of charge."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'She steps closer. Lowering her voice.',
      },
      {
        text: '"The Caldwells use people. They build them up, extract what they need, then discard them."',
        speakerId: 'victoria',
        emotion: 'serious',
      },
      {
        text: '"When Maris is done with you—and she will be done—you\'ll have nothing. And nowhere to go."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'Warning or threat? Maybe both.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'victoria-warning-complete',
  },
  {
    id: 'victoria-redirect',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"I\'m not your society page puff piece. Don\'t treat me like one."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"Fair enough. What do you actually want?"',
      },
      {
        text: '"I want to know whose side you\'re on. Because in this world, you\'re always on a side."',
        speakerId: 'victoria',
        emotion: 'serious',
      },
      {
        text: 'She\'s drawing lines. And forcing you to pick.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'victoria-sides',
  },
  {
    id: 'victoria-intrigued',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"An asset. To everyone who matters."',
      },
      {
        text: '"Everyone." She raises an eyebrow. "That\'s ambitious."',
        speakerId: 'victoria',
        emotion: 'curious',
      },
      {
        text: '"Or pragmatic. Depends on your perspective."',
      },
      {
        text: '"Pragmatism. Now that\'s a language I understand."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'A crack in the ice. Tiny. But there.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'victoria-sides',
  },
  {
    id: 'victoria-respect',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"You have options?" She sounds almost amused.',
        speakerId: 'victoria',
        emotion: 'curious',
      },
      {
        text: '"Everyone has options. Most people just don\'t know how to exercise them."',
      },
      {
        text: '"And you do?"',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"I\'m learning."',
      },
      {
        text: '"Honesty." She tilts her head. "Unexpected."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'victoria-sides',
  },
  {
    id: 'victoria-sides',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'tense',
    dialog: [
      {
        text: '"Let me be clear about the landscape."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"There\'s the Caldwell orbit. Maris, Millicent, their associates. Power through fear."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"And then there\'s... everyone else. The rest of us. Building actual alliances."',
        speakerId: 'victoria',
        emotion: 'serious',
      },
      {
        text: 'She\'s recruiting. Or warning. Hard to tell which.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'sides-trap',
        text: '"I\'m with the Caldwells. They chose me."',
        nextSceneId: 'victoria-dismissed',
        isOptimal: false,
        tactic: 'loyalty',
        reaction: {
          text: '"Chose you. Like they chose the others. Good luck."',
          emotion: 'cold',
          bodyLanguage: 'You declared a side. She\'s now your enemy.',
          scoreImpact: -20,
        },
      },
      {
        id: 'sides-subtle',
        text: '"I\'m not with anyone. I\'m building my own path."',
        nextSceneId: 'victoria-skeptical',
        isOptimal: false,
        tactic: 'independence',
        reaction: {
          text: '"Independence. Noble. Usually fatal."',
          emotion: 'neutral',
          bodyLanguage: 'Idealistic answer. She\'s not impressed.',
          scoreImpact: 0,
        },
      },
      {
        id: 'sides-close',
        text: '"Alliances shift. I prefer to keep my options open."',
        nextSceneId: 'victoria-understanding',
        isOptimal: false,
        tactic: 'flexible',
        reaction: {
          text: '"Flexible. A survival trait. But eventually, you\'ll have to choose."',
          emotion: 'knowing',
          bodyLanguage: 'She understands. But doesn\'t fully trust.',
          scoreImpact: 10,
        },
      },
      {
        id: 'sides-optimal',
        text: '"The Caldwells and I have an understanding. That doesn\'t mean we\'re exclusive."',
        nextSceneId: 'victoria-approved',
        isOptimal: true,
        tactic: 'strategic-ambiguity',
        reaction: {
          text: 'A real smile. First one tonight. "Now you\'re speaking my language."',
          emotion: 'smirking',
          bodyLanguage: 'You kept doors open. Exactly what she wanted to hear.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'victoria-dismissed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Then we have nothing more to discuss."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'She turns away. Ice in human form.',
      },
      {
        text: '"Enjoy the party. While you can."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'An enemy made. Hopefully not a fatal mistake.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'victoria-warning-complete',
  },
  {
    id: 'victoria-skeptical',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Your own path." She sounds tired.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"Everyone thinks they\'re the exception. Until they\'re not."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"When the Caldwells are done using you, call me. If you still have a phone."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'A door left slightly open. Not much. But something.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'victoria-warning-complete',
  },
  {
    id: 'victoria-understanding',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Options are a luxury. Enjoy them while they last."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'She pulls a card from her clutch. Different from Harrison\'s. Heavier.',
      },
      {
        text: '"When you\'re ready to have a real conversation. About real things."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'Two invitations. Two different worlds. The game is getting complicated.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'victoria-warning-complete',
  },
  {
    id: 'victoria-approved',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Non-exclusive." She nods slowly.',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: '"I can work with that. In fact, I prefer it."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'She pulls out a card. Hands it over.',
      },
      {
        text: '"My private line. For when you want to discuss options. Beyond Caldwell territory."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'An alliance offer. From the Caldwells\' apparent enemy. This is getting interesting.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'victoria-warning-complete',
  },
  {
    id: 'victoria-warning-complete',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: 'Victoria drifts away. Back to her hosting duties.',
      },
      {
        text: 'Blake exhales. "That was... intense."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"She\'s territorial. Makes sense."',
      },
      {
        text: '"I need a drink. A real one."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Two power players. Two different games. And you\'re in the middle.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-appears',
  },
];
