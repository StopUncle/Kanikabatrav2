import type { ForkScene } from '../../../types';

/**
 * Mission 13: The Power Play - The Choice
 * Whose side are you on? Victoria or Maris?
 */
export const choiceScenes: ForkScene[] = [
  {
    id: 'power-choice-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'tense',
    dialog: [
      {
        text: 'Victoria Ashworth materializes. Millicent vanishes.',
      },
      {
        text: '"I see you\'ve been making friends."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'She\'s not smiling. Her eyes are calculating something.',
      },
      {
        text: '"Maris. Elena. Even the other Caldwell. Quite the network you\'re building."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'victoria-confrontation',
  },
  {
    id: 'victoria-confrontation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"I tried to have you removed earlier. Maris intervened."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"That tells me something. She sees value in you. Or threat."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'She steps closer. Old money confidence.',
      },
      {
        text: '"The question is: do you understand what you\'re getting into?"',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Two queens. One board. And you\'re a piece in play.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'victoria-trap',
        text: '"I\'m just here for the party. I\'m not getting into anything."',
        nextSceneId: 'victoria-laughs',
        isOptimal: false,
        tactic: 'denial',
        reaction: {
          text: 'She laughs. Cold. "Oh, darling. You\'re already in it."',
          emotion: 'smirking',
          bodyLanguage: 'Denial is weakness. She\'s categorizing you.',
          scoreImpact: -15,
        },
      },
      {
        id: 'victoria-subtle',
        text: '"I understand there are different factions here. I\'m learning."',
        nextSceneId: 'victoria-considers',
        isOptimal: false,
        tactic: 'humble-student',
        reaction: {
          text: '"Learning. A student. Students can be shaped."',
          emotion: 'knowing',
          bodyLanguage: 'She\'s considering you as a resource.',
          scoreImpact: 5,
        },
      },
      {
        id: 'victoria-close',
        text: '"Maris showed interest. So did Harrison. That seems to concern you."',
        nextSceneId: 'victoria-reveals',
        isOptimal: false,
        tactic: 'observant',
        reaction: {
          text: '"Concern isn\'t the word. Interest, perhaps."',
          emotion: 'cold',
          bodyLanguage: 'You named the dynamic. She respects awareness.',
          scoreImpact: 10,
        },
      },
      {
        id: 'victoria-optimal',
        text: '"I understand that you and Maris want different things. I\'m curious what you want."',
        nextSceneId: 'victoria-offers',
        isOptimal: true,
        tactic: 'direct-inquiry',
        reaction: {
          text: 'Her expression shifts. "Now that\'s the right question."',
          emotion: 'seductive',
          bodyLanguage: 'You asked about her interests. Power responds to attention.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'victoria-laughs',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"The moment Maris spoke to you, you became a piece on the board."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: '"The question isn\'t whether you\'re playing. It\'s who\'s playing you."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'She produces a card. Gold embossed.',
      },
      {
        text: '"If you want to know how this really works... call me. Before Maris sinks her claws deeper."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-transition',
  },
  {
    id: 'victoria-considers',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"Students are moldable. That can be valuable."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: '"Maris finds raw material. I prefer... finished products. But exceptions can be made."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'She hands you a card. Elegant. Simple.',
      },
      {
        text: '"The old families have resources Maris can\'t match. Remember that."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'ghost-transition',
  },
  {
    id: 'victoria-reveals',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'cold',
    dialog: [
      {
        text: '"Harrison and Maris represent... new methods. Effective, but destructive."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"I represent stability. Tradition. Sustainability."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"They burn through people. I invest in them."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'She offers a card.',
      },
      {
        text: '"When Maris disappoints you—and she will—call me."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ghost-transition',
  },
  {
    id: 'victoria-offers',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'professional',
    dialog: [
      {
        text: '"I want what I\'ve always wanted. Stability. Control. Legacy."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"Maris and Harrison burn through people like fuel. I build them up."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: '"The question is: do you want to be fuel? Or foundation?"',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: 'She produces a card. Different from Harrison\'s. Gold instead of plain.',
      },
      {
        text: '"Think about it. But don\'t think too long."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ghost-transition',
  },
  {
    id: 'ghost-transition',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'tense',
    dialog: [
      {
        text: 'Victoria glides away. You\'re left with two cards. Two invitations. Two paths.',
      },
      {
        text: 'Blake finds you. "I\'ve been watching from across the room. That looked intense."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Victoria Ashworth just offered me... something. I\'m not sure what."',
      },
      {
        text: 'Movement at the edge of your vision. A familiar face.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Wait. Is that—',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-appearance-intro',
  },
];
