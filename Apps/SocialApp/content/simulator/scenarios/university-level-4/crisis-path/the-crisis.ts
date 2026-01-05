import type { ForkScene } from '../../../types';

/**
 * Mission 20: The Crisis
 * Harrison's test - and Blake's breaking point
 */
export const crisisScenes: ForkScene[] = [
  {
    id: 'crisis-summons',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'crisis',
    chapter: { name: 'The Crisis', index: 1, total: 4 },
    mood: 'tense',
    dialog: [
      {
        text: 'Night falls. The Grove feels smaller. Darker.',
      },
      {
        text: 'A knock at the door. Staff in white.',
      },
      {
        text: '"Mr. Cole requests your presence. Both of you. The observatory."',
      },
      {
        text: 'Blake looks at you. Fear in his eyes. "This is it, isn\'t it?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"The test."',
      },
      {
        text: 'Whatever happens next changes everything.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'crisis-observatory',
  },
  {
    id: 'crisis-observatory',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'tense',
    dialog: [
      {
        text: 'The observatory. Glass dome. Stars above. The island spread below.',
      },
      {
        text: 'Harrison stands at the center. Tyler already there. Pale. Shaking.',
      },
      {
        text: '"Welcome." Harrison\'s voice echoes.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Tonight, we learn who you truly are. Not who you pretend to be."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Each of you will face a choice. There are no right answers—only honest ones."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'The game begins.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'crisis-tyler-test',
  },
  {
    id: 'crisis-tyler-test',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'tense',
    dialog: [
      {
        text: '"Tyler first." Harrison turns to him.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Your sister Elena trades in secrets. Including some of mine."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"I could destroy her. One word. One call."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Give me a reason not to."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Tyler trembles. "She\'s my sister..."',
        speakerId: 'tyler',
        emotion: 'sad',
      },
      {
        text: 'Harrison watches without mercy.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'crisis-tyler-breaks',
  },
  {
    id: 'crisis-tyler-breaks',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    dialog: [
      {
        text: 'Tyler collapses onto his knees. Sobbing.',
        speakerId: 'tyler',
        emotion: 'sad',
      },
      {
        text: '"I\'ll do anything. Please. Don\'t hurt Elena."',
        speakerId: 'tyler',
        emotion: 'pleading',
      },
      {
        text: '"Anything?" Harrison\'s voice is ice.',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Tell me something I don\'t know. About your sister\'s network. A secret."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'Tyler hesitates. Then speaks. Words that will destroy something.',
      },
      {
        text: 'He broke. Betrayed his sister to save her. Harrison won.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'crisis-blake-turn',
  },
  {
    id: 'crisis-blake-turn',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'tense',
    dialog: [
      {
        text: '"Thank you, Tyler. You may sit." Harrison turns.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Blake Rivera."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Blake stiffens. You feel him tense beside you.',
      },
      {
        text: '"You came here as a plus-one. The loyal friend. The support."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"But I know what you really want. What you told Maris."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Maris told him. About Blake\'s wound. His invisibility.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'crisis-blake-offer',
  },
  {
    id: 'crisis-blake-offer',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    dialog: [
      {
        text: '"You want to be seen. Recognized. Not as someone\'s sidekick."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"I can give you that. A place in my network. Your own."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Blake\'s breath catches. His dream, offered on a platter.',
      },
      {
        text: '"But there\'s a price. There\'s always a price."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Tell me something about your friend here. Something damaging."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'No. Not Blake. Not this.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'crisis-blake-choice',
  },
  {
    id: 'crisis-blake-choice',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake looks at you. Conflict warring in his eyes.',
      },
      {
        text: '"I... I don\'t..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Don\'t lie to me." Harrison\'s voice sharpens.',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"You know things. Everyone knows things about their friends."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Share. Or remain invisible forever."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'The moment stretches. Blake\'s loyalty against his deepest wound.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'crisis-blake-betrayal',
  },
  {
    id: 'crisis-blake-betrayal',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake closes his eyes. When they open, something has changed.',
      },
      {
        text: '"They\'re afraid."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: '"What?"',
      },
      {
        text: '"They\'re afraid of being ordinary. Terrified of failing."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: '"All this confidence? It\'s performance. Inside, they\'re scared they don\'t belong anywhere."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: 'He\'s talking about you. Exposing your deepest fear.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'crisis-aftermath',
  },
  {
    id: 'crisis-aftermath',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'cold',
    dialog: [
      {
        text: 'Harrison nods slowly. Satisfied.',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: '"Good. Honest. Damaging."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You have a place here, Blake. We\'ll discuss terms."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Blake won\'t meet your eyes. His hands shake.',
      },
      {
        text: '"Now. Your turn."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Blake betrayed you. And now it\'s your move.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    dialogueChoices: [
      {
        id: 'aftermath-trap',
        text: '"Blake just sold me out. What more do you want?"',
        nextSceneId: 'crisis-your-test-angry',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Emotion. Understandable but useless."',
          emotion: 'cold',
          bodyLanguage: 'You showed you\'re reactive. Weakness.',
          scoreImpact: -10,
        },
      },
      {
        id: 'aftermath-subtle',
        text: '"Ask your question. I\'ll answer it."',
        nextSceneId: 'crisis-your-test-direct',
        isOptimal: false,
        tactic: 'compliance',
        reaction: {
          text: '"Direct. Good."',
          emotion: 'neutral',
          bodyLanguage: 'You didn\'t let emotion derail you. Noted.',
          scoreImpact: 10,
        },
      },
      {
        id: 'aftermath-close',
        text: '"Blake did what he needed to survive. I understand. What\'s my test?"',
        nextSceneId: 'crisis-your-test-composed',
        isOptimal: false,
        tactic: 'understanding',
        reaction: {
          text: 'Surprise flickers. "You\'re not angry?"',
          emotion: 'curious',
          bodyLanguage: 'You processed betrayal without breaking. Impressive.',
          scoreImpact: 20,
        },
      },
      {
        id: 'aftermath-optimal',
        text: '"You gave Blake what he needed to hear. Now give me the real test—not the warm-up."',
        nextSceneId: 'crisis-your-test-challenge',
        isOptimal: true,
        tactic: 'escalation',
        reaction: {
          text: 'Harrison actually laughs. "You see through the layers."',
          emotion: 'happy',
          bodyLanguage: 'You called his bluff. He respects it.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'crisis-your-test-angry',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    dialog: [
      {
        text: '"Useless emotion." Harrison dismisses it.',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Your test is simple. Blake betrayed you for visibility."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"I\'m offering you the same trade. Give me something on Blake—and take his spot."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Revenge and advancement. Or refuse, and leave with nothing."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Revenge. He\'s offering revenge.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'crisis-final-choice',
  },
  {
    id: 'crisis-your-test-direct',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    dialog: [
      {
        text: '"Direct." Harrison nods.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Your test: Blake betrayed you. He gets a place here."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You can take it from him. One damaging truth about Blake, and you\'re in. He\'s out."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Fair trade?"',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'He\'s testing if we\'ll retaliate. Eye for an eye.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'crisis-final-choice',
  },
  {
    id: 'crisis-your-test-composed',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    dialog: [
      {
        text: '"Not angry." Harrison studies you.',
        speakerId: 'harrison',
        emotion: 'curious',
      },
      {
        text: '"Interesting. Most people collapse at betrayal."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Your test then: I\'m offering you Blake\'s spot. Betray him back, and you\'re in."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Or refuse, and prove you\'re too... soft for this world."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'Soft. He thinks mercy is weakness.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'crisis-final-choice',
  },
  {
    id: 'crisis-your-test-challenge',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    dialog: [
      {
        text: '"The real test." Harrison\'s eyes gleam.',
        speakerId: 'harrison',
        emotion: 'happy',
      },
      {
        text: '"Blake betrayed you. I\'m offering his position. One truth about him, and you\'re in."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"But here\'s the twist: if you refuse, you can both stay. As a pair."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: '"Weaker positions. But together."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'Third option revealed. Together but weakened. Or revenge and power.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'crisis-final-choice',
  },
  {
    id: 'crisis-final-choice',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake stands in the corner. Small. Shaking. He knows what\'s happening.',
      },
      {
        text: 'Harrison waits. The observatory feels like a courtroom.',
      },
      {
        text: 'Tyler watches. Broken. Judging.',
      },
      {
        text: 'This moment defines everything that comes next.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    dialogueChoices: [
      {
        id: 'final-revenge',
        text: '"Blake\'s weakness is validation. He\'ll do anything to feel important—even betray friends."',
        nextSceneId: 'crisis-revenge-path',
        isOptimal: false,
        tactic: 'retaliation',
        reaction: {
          text: 'Harrison nods. Blake crumbles. "Welcome to the network."',
          emotion: 'smirking',
          bodyLanguage: 'You chose power over loyalty. Harrison approves—but at what cost?',
          scoreImpact: 15,
        },
      },
      {
        id: 'final-refuse',
        text: '"No. I won\'t become what he just became."',
        nextSceneId: 'crisis-moral-path',
        isOptimal: false,
        tactic: 'principle',
        reaction: {
          text: 'Harrison\'s expression is unreadable. "Principle over power."',
          emotion: 'neutral',
          bodyLanguage: 'You held the line. But did you lose everything?',
          scoreImpact: 5,
        },
      },
      {
        id: 'final-third',
        text: '"We stay together. Weaker positions. But Blake and I leave this room as partners, not enemies."',
        nextSceneId: 'crisis-unity-path',
        isOptimal: false,
        tactic: 'unity',
        reaction: {
          text: 'Blake looks up. Hope in broken eyes.',
          emotion: 'hopeful',
          bodyLanguage: 'You chose relationship over advancement. Rare.',
          scoreImpact: 20,
        },
      },
      {
        id: 'final-architect',
        text: '"Neither. I\'m offering you something better: two assets working together instead of broken individuals competing."',
        nextSceneId: 'crisis-architect-path',
        isOptimal: true,
        tactic: 'reframing',
        reaction: {
          text: 'Harrison freezes. Then smiles. "You\'re negotiating with me."',
          emotion: 'happy',
          bodyLanguage: 'You rejected all options and created your own. That\'s architect thinking.',
          scoreImpact: 35,
        },
      },
    ],
  },
  {
    id: 'crisis-revenge-path',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'cold',
    dialog: [
      {
        text: '"Welcome to the network." Harrison extends his hand.',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'You shake it. Cold. Transactional.',
      },
      {
        text: 'Blake stands frozen. Destroyed.',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"He\'ll be escorted off the island tomorrow." Harrison dismisses him.',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'We won. But at the cost of who we were.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-dark-intro',
  },
  {
    id: 'crisis-moral-path',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'cold',
    dialog: [
      {
        text: '"Principle over power." Harrison considers.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Rare. Foolish perhaps. But rare."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You may stay. Both of you. Observe. But you\'re not in the network."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Not yet."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'We held principle. But we\'re outsiders now.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'climax-observer-intro',
  },
  {
    id: 'crisis-unity-path',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake\'s eyes widen. You see hope crack through the shame.',
        speakerId: 'blake',
        emotion: 'hopeful',
      },
      {
        text: '"Partners." Harrison considers.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Loyalty after betrayal. Interesting play."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Very well. Lesser positions. Together. We\'ll see how that serves you."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'We chose each other over power. Harrison didn\'t expect that.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-unity-intro',
  },
  {
    id: 'crisis-architect-path',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'crisis',
    mood: 'professional',
    dialog: [
      {
        text: '"Negotiating with me." Harrison steps closer.',
        speakerId: 'harrison',
        emotion: 'happy',
      },
      {
        text: '"You\'re offering me... an alliance instead of a transaction."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Two assets. Working together. Under your supervision, yes. But not broken."',
      },
      {
        text: 'Harrison looks at Blake. Then at you. Calculating.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"This is architect thinking. Building instead of destroying."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: '"I accept."',
        speakerId: 'harrison',
        emotion: 'happy',
      },
      {
        text: 'We rewrote the game. Harrison respects that.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-architect-intro',
  },
];
