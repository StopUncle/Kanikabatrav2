import type { ForkScene } from '../../../types';

/**
 * Mission 13: Power Network - Elena
 * Tyler's sister collects secrets. Now she wants yours.
 */
export const elenaScenes: ForkScene[] = [
  {
    id: 'elena-appears',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    chapter: { name: 'Power Network', index: 4, total: 5 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'Blake heads for the bar. You turn to follow.',
      },
      {
        text: '"You\'re quite popular tonight."',
      },
      {
        text: 'A woman you don\'t recognize. Dark hair. Dark eyes. Knowing smile.',
      },
      {
        text: '"Elena. Tyler\'s sister. He mentioned you."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'The secret collector. Tyler warned about her.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'elena-intro',
  },
  {
    id: 'elena-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'mysterious',
    dialog: [
      {
        text: '"I\'ve been watching your performance. The Caldwells. Harrison. Victoria."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"Quite the circuit for a newcomer."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"It\'s been an interesting evening."',
      },
      {
        text: '"Interesting. One word for it. Dangerous is another."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'She knows things. More than she should.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'elena-trap',
        text: '"What do you want?"',
        nextSceneId: 'elena-direct-fail',
        isOptimal: false,
        tactic: 'blunt',
        reaction: {
          text: '"Direct. I prefer subtlety, but I can adapt." She shrugs.',
          emotion: 'neutral',
          bodyLanguage: 'Too aggressive. She prefers finesse.',
          scoreImpact: -5,
        },
      },
      {
        id: 'elena-subtle',
        text: '"Tyler speaks highly of you. When he speaks at all."',
        nextSceneId: 'elena-amused',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"My brother is better at listening than talking. I taught him that."',
          emotion: 'smirking',
          bodyLanguage: 'You played it safe. She noted your evasion.',
          scoreImpact: 5,
        },
      },
      {
        id: 'elena-close',
        text: '"You collect information. I\'m wondering what you\'ve collected on me."',
        nextSceneId: 'elena-impressed',
        isOptimal: false,
        tactic: 'awareness',
        reaction: {
          text: '"Smart. Most people don\'t ask that question directly."',
          emotion: 'knowing',
          bodyLanguage: 'You know her game. She respects that.',
          scoreImpact: 15,
        },
      },
      {
        id: 'elena-optimal',
        text: '"You\'re the one who actually runs the information network. Tyler\'s the front."',
        nextSceneId: 'elena-delighted',
        isOptimal: true,
        tactic: 'insight',
        reaction: {
          text: 'Something flickers in her eyes. Assessment. Recalculation. "Interesting. That observation just bought you something. Now—what can you offer in return?"',
          emotion: 'smirking',
          bodyLanguage: 'Even your insight became a transaction. Nothing is free.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'elena-direct-fail',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"What I want is simple. Information. Everyone has some."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"And you think I have information worth having?"',
      },
      {
        text: '"I think you\'ve accumulated quite a bit tonight. The Caldwell dynamic. Victoria\'s paranoia. Harrison\'s plans."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'She\'s pumping you for intel. Classic move.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-trade',
  },
  {
    id: 'elena-amused',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Tyler is a useful interface. He meets people. I remember people."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"That sounds like a team effort."',
      },
      {
        text: '"It sounds like an ecosystem. We all have our roles."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"And my role?"',
      },
      {
        text: '"That\'s what we\'re here to determine."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'elena-trade',
  },
  {
    id: 'elena-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"What I\'ve collected? Let\'s see."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"You came from nowhere. No family connections. Built yourself up through sheer will. Caught Kai\'s attention. Then Maris\'s."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"Either very talented or very lucky. Possibly both."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'She knows your background. She\'s done research.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'elena-trade',
  },
  {
    id: 'elena-delighted',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Tyler attracts attention. I process it. It\'s a perfect arrangement."',
        speakerId: 'elena',
        emotion: 'happy',
      },
      {
        text: '"Most people never see past the surface. You looked deeper."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"Pattern recognition. It\'s a skill."',
      },
      {
        text: '"It\'s THE skill. And you have it."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'She\'s evaluating you for something. Something specific.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-trade',
  },
  {
    id: 'elena-trade',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    mood: 'mysterious',
    dialog: [
      {
        text: '"Information is currency here. The only real one."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"Money comes and goes. Power shifts. But knowing the right thing at the right time? That\'s eternal."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"So. Let\'s trade."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'She wants something. And she\'s offering something.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'trade-trap',
        text: '"I don\'t have anything worth trading."',
        nextSceneId: 'elena-disappointed',
        isOptimal: false,
        tactic: 'modest',
        reaction: {
          text: '"False modesty. Boring." She sighs.',
          emotion: 'neutral',
          bodyLanguage: 'You undersold yourself. She lost interest.',
          scoreImpact: -10,
        },
      },
      {
        id: 'trade-subtle',
        text: '"What are you offering?"',
        nextSceneId: 'elena-offer',
        isOptimal: false,
        tactic: 'cautious',
        reaction: {
          text: '"Context. History. The things people don\'t tell you."',
          emotion: 'knowing',
          bodyLanguage: 'Safe play. Standard negotiation.',
          scoreImpact: 5,
        },
      },
      {
        id: 'trade-close',
        text: '"You first. Show me the value."',
        nextSceneId: 'elena-proof',
        isOptimal: false,
        tactic: 'negotiation',
        reaction: {
          text: '"Cautious. I appreciate that." She nods.',
          emotion: 'neutral',
          bodyLanguage: 'Good negotiation tactic. She respects it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'trade-optimal',
        text: '"I\'ll tell you what Victoria said about the Caldwells. You tell me why."',
        nextSceneId: 'elena-perfect',
        isOptimal: true,
        tactic: 'strategic-trade',
        reaction: {
          text: 'A real smile. "Now we\'re talking. Sit."',
          emotion: 'happy',
          bodyLanguage: 'You offered real value for real context. Perfect trade.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'elena-disappointed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: 'Her expression doesn\'t change. She simply... recalculates.',
      },
      {
        text: '"You just wasted my time. That\'s a debt, not a favor."',
        speakerId: 'elena',
        emotion: 'cold',
      },
      {
        text: '"I\'ll remember this the next time you need something."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'She walks away. No anger. Just... a ledger updated.',
      },
      {
        text: 'You didn\'t refuse her. You failed to transact. Somehow that\'s worse.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'power-network-complete',
  },
  {
    id: 'elena-offer',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Victoria and Millicent Caldwell were friends once. Close friends."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"What happened?"',
      },
      {
        text: '"That wasn\'t free." She tilts her head. "But I\'ll give you more. Something involving a man. A betrayal. The details cost extra."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: '"The hatred though? That I\'ll give you. It\'s common knowledge."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'Even the free samples have a price. She\'s establishing a tab.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-intel-shared',
  },
  {
    id: 'elena-proof',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Fine. A sample."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"Harrison Cole has been positioning against Victoria for two years. Quietly. Methodically."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"Why?"',
      },
      {
        text: '"That\'s not a sample. That\'s the premium tier."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'She gave you something real. Now she wants something back.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'elena-intel-shared',
  },
  {
    id: 'elena-perfect',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: 'You share Victoria\'s comments. The factions. The accusations against the Caldwells.',
      },
      {
        text: 'Elena\'s expression doesn\'t change. She\'s calculating value, not reacting to content.',
      },
      {
        text: '"That\'s worth something. Here\'s your payment: Victoria blames Millicent for her first husband\'s death. Suicide. Or so they say."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"We\'re even now. For this exchange. The next one starts fresh."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'Suicide. Or murder. And she gave it to you like settling an invoice.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'elena-full-intel',
  },
  {
    id: 'elena-intel-shared',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"Your turn. What did you learn tonight?"',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'You share what you can. Victoria\'s territorial warning. Harrison\'s invitation.',
      },
      {
        text: '"Harrison inviting you. That\'s significant."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"He doesn\'t invite anyone unless he sees potential. Specific potential."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'power-network-complete',
  },
  {
    id: 'elena-full-intel',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    dialog: [
      {
        text: '"The suicide happened twenty years ago. Everyone important knows. Nobody talks."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"But the hatred between Victoria and Millicent? It shaped everything. Every alliance. Every betrayal."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"And now?"',
      },
      {
        text: '"Now there\'s you. A new piece on a very old board. Both sides want you."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'A pawn. Or a player. The choice is yours.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'power-network-complete',
  },
  {
    id: 'power-network-complete',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'power',
    chapter: { name: 'Mission Complete: Power Network', index: 4, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'Elena disappears into the crowd. Like she was never there.',
      },
      {
        text: 'Blake returns with drinks. "You look like you\'ve seen things."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"This world has layers. I\'m just starting to see them."',
      },
      {
        text: '"Should we be worried?"',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"Always. But also... optimistic."',
      },
      {
        text: 'Power network mapped. Relationships forming. Now the real game begins.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-intro',
  },
];
