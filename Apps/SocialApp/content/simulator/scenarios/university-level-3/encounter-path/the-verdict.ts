import type { ForkScene } from '../../../types';

/**
 * Mission 12: First Encounter - The Verdict
 * Maris delivers her judgment: ally, neutral, or dismissed
 */
export const verdictScenes: ForkScene[] = [
  {
    id: 'maris-verdict-setup',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    chapter: { name: 'First Encounter', index: 3, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'She studies you. The silence stretches.',
      },
      {
        text: 'Behind you, the party continues. Laughter. Clinking glasses. A world away.',
      },
      {
        text: '"I\'ve made a decision."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Here it comes.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'verdict-trap',
        text: '"And? Don\'t keep me in suspense."',
        nextSceneId: 'maris-verdict-impatient',
        isOptimal: false,
        tactic: 'impatience',
        reaction: {
          text: '"Eager. That\'s not always a virtue." She sounds disappointed.',
          emotion: 'cold',
          bodyLanguage: 'You showed need. She values composure.',
          scoreImpact: -10,
        },
      },
      {
        id: 'verdict-subtle',
        text: 'Wait. Let her speak on her own terms.',
        nextSceneId: 'maris-verdict-patient',
        isOptimal: false,
        tactic: 'patience',
        reaction: {
          text: 'She nods slightly. Approving of your restraint.',
          emotion: 'neutral',
          bodyLanguage: 'Good. You can wait. Many can\'t.',
          scoreImpact: 5,
        },
      },
      {
        id: 'verdict-close',
        text: '"I\'ve made one about you too."',
        nextSceneId: 'maris-verdict-bold',
        isOptimal: false,
        tactic: 'matching',
        reaction: {
          text: 'Her eyebrow rises. Amused. "Have you now."',
          emotion: 'smirking',
          bodyLanguage: 'Bold. She\'ll want to hear it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'verdict-optimal',
        text: '"I know. The question is whether you\'ll tell me, or make me figure it out."',
        nextSceneId: 'maris-verdict-impressed',
        isOptimal: true,
        tactic: 'meta-awareness',
        reaction: {
          text: 'A genuine smile. Brief. "You understand the game."',
          emotion: 'knowing',
          bodyLanguage: 'You acknowledged the dance. She respects that.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'maris-verdict-impatient',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Patience is a currency here. You spent yours too quickly."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She rises. The conversation ending.',
      },
      {
        text: '"You have potential. But potential is common. Discipline is rare."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'Not dismissed. But not chosen either.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-verdict-neutral-path',
  },
  {
    id: 'maris-verdict-patient',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: 'The silence continues. A test within a test.',
      },
      {
        text: '"Most people fill silence with noise. You didn\'t."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"That tells me more than your answers did."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'You passed something. Maybe not everything. But something.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-verdict-considered',
  },
  {
    id: 'maris-verdict-bold',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Tell me, then. What\'s your verdict?"',
        speakerId: 'maris',
        emotion: 'curious',
      },
      {
        text: '"You\'re lonely at the top. Looking for someone who can keep up."',
      },
      {
        text: 'A flash of something in her eyes. Recognition? Discomfort?',
      },
      {
        text: '"Careful. Insight can be a weapon. And weapons invite retaliation."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'You touched something real. She didn\'t like it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-verdict-considered',
  },
  {
    id: 'maris-verdict-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Most people want the answer handed to them. You want the method."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"That\'s either very wise or very dangerous."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Can\'t it be both?"',
      },
      {
        text: 'She laughs. Actually laughs. Heads turn.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-verdict-ally-path',
  },
  {
    id: 'maris-verdict-neutral-path',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"I\'ll be watching. From a distance."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Prove me wrong. Or prove me right. Either way, I\'ll know."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She walks away. Not dismissal. Probation.',
      },
      {
        text: 'Not the outcome you wanted. But not the worst either.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'maris-encounter-end-neutral',
  },
  {
    id: 'maris-verdict-considered',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: 'She considers you. Really considers.',
      },
      {
        text: '"You\'re not quite what I expected. I\'m not sure if that\'s good or bad."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"There\'s someone I want you to meet. My mother."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Millicent Caldwell. The original. This just escalated.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'millicent-trap',
        text: '"Your mother? I\'d be honored."',
        nextSceneId: 'maris-millicent-defer',
        isOptimal: false,
        tactic: 'deference',
        reaction: {
          text: '"Honored." She sighs. "We\'re back to that word."',
          emotion: 'cold',
          bodyLanguage: 'You reverted to submission. She noticed.',
          scoreImpact: -10,
        },
      },
      {
        id: 'millicent-subtle',
        text: '"Is this another test?"',
        nextSceneId: 'maris-millicent-aware',
        isOptimal: false,
        tactic: 'awareness',
        reaction: {
          text: '"Everything is a test. But this one... matters more."',
          emotion: 'serious',
          bodyLanguage: 'At least you\'re paying attention.',
          scoreImpact: 5,
        },
      },
      {
        id: 'millicent-close',
        text: '"What should I know about her before I do?"',
        nextSceneId: 'maris-millicent-prepared',
        isOptimal: false,
        tactic: 'preparation',
        reaction: {
          text: '"Smart. But incomplete. You\'ll learn more by observing than asking."',
          emotion: 'neutral',
          bodyLanguage: 'Good instinct. Wrong approach.',
          scoreImpact: 10,
        },
      },
      {
        id: 'millicent-optimal',
        text: '"The teacher wants me to meet the master. Lead the way."',
        nextSceneId: 'maris-millicent-confident',
        isOptimal: true,
        tactic: 'confident-acknowledgment',
        reaction: {
          text: 'A genuine smile. "You learn fast. That\'s going to be useful."',
          emotion: 'smirking',
          bodyLanguage: 'You understood the hierarchy. And you weren\'t threatened by it.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'maris-verdict-ally-path',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"I don\'t make allies often. It\'s inefficient. Creates obligations."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"But occasionally, someone comes along who might be worth the investment."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Investment implies return. What do you expect from me?"',
      },
      {
        text: '"Nothing. Yet. That\'s the point. When I call, you\'ll want to answer."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'She\'s not offering friendship. She\'s offering... opportunity.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-introduces-millicent',
  },
  {
    id: 'maris-millicent-defer',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"My mother eats honored people for breakfast. Literally. It\'s her favorite meal."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"Then what should I be?"',
      },
      {
        text: '"Yourself. But the version that doesn\'t flinch."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'A warning. Or advice. With her, it\'s the same thing.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-introduces-millicent',
  },
  {
    id: 'maris-millicent-aware',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"My mother is the final exam. Everything before was practice."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"No pressure."',
      },
      {
        text: '"Pressure creates diamonds. Or dust. We\'ll see which you are."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Encouraging. In a terrifying way.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'maris-introduces-millicent',
  },
  {
    id: 'maris-millicent-prepared',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Three things. She values directness. She despises weakness. And she always knows more than she lets on."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: '"Sounds familiar."',
      },
      {
        text: '"Where do you think I learned?"',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'The original Caldwell. This should be interesting.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-introduces-millicent',
  },
  {
    id: 'maris-millicent-confident',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Teacher." She rolls the word around. "I suppose I am. In a way."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"But my mother is... different. I play games. She writes the rules."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: '"Then I\'ll learn to read the rulebook."',
      },
      {
        text: '"Bold. She\'ll like that. Or destroy you for it. Possibly both."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'maris-introduces-millicent',
  },
  {
    id: 'maris-introduces-millicent',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: 'Maris leads you across the room. The crowd parts.',
      },
      {
        text: 'And there she is. Millicent Caldwell.',
      },
      {
        text: 'Silver hair. Perfect posture. Eyes that have seen empires rise and fall.',
      },
      {
        text: 'She looks at you. Through you.',
      },
      {
        text: '"Mother. This is the one I mentioned."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Mentioned. She already knew you were coming.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'millicent-first-words',
  },
  {
    id: 'millicent-first-words',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: '"Mm."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'One syllable. Somehow devastating.',
      },
      {
        text: '"My daughter collects strays. Most don\'t survive the winter."',
        speakerId: 'millicent',
        emotion: 'cold',
      },
      {
        text: '"Mother."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Don\'t \'mother\' me. I\'m stating facts."',
        speakerId: 'millicent',
        emotion: 'cold',
      },
      {
        text: 'She\'s testing you already. The moment she saw you.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'millicent-first-trap',
        text: '"I\'m not a stray. I\'m an investment."',
        nextSceneId: 'millicent-dismissive',
        isOptimal: false,
        tactic: 'correction',
        reaction: {
          text: '"Investments are made. You were found. Different." Ice.',
          emotion: 'cold',
          bodyLanguage: 'You tried to reframe. She didn\'t allow it.',
          scoreImpact: -15,
        },
      },
      {
        id: 'millicent-first-subtle',
        text: '"Winter is coming. I\'ve prepared."',
        nextSceneId: 'millicent-interested',
        isOptimal: false,
        tactic: 'metaphor',
        reaction: {
          text: '"Have you. We\'ll see." Slightly less dismissive.',
          emotion: 'neutral',
          bodyLanguage: 'You played her game. She noticed.',
          scoreImpact: 5,
        },
      },
      {
        id: 'millicent-first-close',
        text: '"Then I\'ll have to be the exception."',
        nextSceneId: 'millicent-challenged',
        isOptimal: false,
        tactic: 'confidence',
        reaction: {
          text: '"Everyone says that. None mean it."',
          emotion: 'cold',
          bodyLanguage: 'Generic confidence. She\'s heard it before.',
          scoreImpact: 0,
        },
      },
      {
        id: 'millicent-first-optimal',
        text: '"Facts are useful. So is knowing when they don\'t apply."',
        nextSceneId: 'millicent-intrigued',
        isOptimal: true,
        tactic: 'reframe',
        reaction: {
          text: 'A pause. Something shifts. "Go on."',
          emotion: 'curious',
          bodyLanguage: 'You surprised her. That\'s rare.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'millicent-dismissive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Maris, take your project somewhere else. I have actual conversations to have."',
        speakerId: 'millicent',
        emotion: 'cold',
      },
      {
        text: 'Maris\'s jaw tightens. But she nods.',
      },
      {
        text: '"Come. We\'ll try again later."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Dismissed. By Millicent Caldwell herself.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'maris-encounter-end-neutral',
  },
  {
    id: 'millicent-interested',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Preparation. An underrated virtue."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'She gestures to a nearby chair. An invitation. Or a command.',
      },
      {
        text: '"Sit. Let\'s see what my daughter found."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'Still in the game. Barely.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'millicent-evaluation',
  },
  {
    id: 'millicent-challenged',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"The last exception lasted four months. He\'s now selling insurance in Ohio."',
        speakerId: 'millicent',
        emotion: 'cold',
      },
      {
        text: 'Maris shifts uncomfortably.',
      },
      {
        text: '"But exceptions do exist. Rarely."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'A thread. Thin. But there.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'millicent-evaluation',
  },
  {
    id: 'millicent-intrigued',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Maris." Millicent doesn\'t look away from you. "Leave us."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'Maris hesitates. Then nods and walks away.',
      },
      {
        text: 'Alone with Millicent Caldwell. The architect of dynasties.',
      },
      {
        text: '"Now. Tell me why facts don\'t apply to you."',
        speakerId: 'millicent',
        emotion: 'curious',
      },
      {
        text: 'She gave you an opening. Don\'t waste it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'millicent-evaluation',
  },
  {
    id: 'millicent-evaluation',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    chapter: { name: 'Mission Complete: First Encounter', index: 3, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'Millicent studies you like a chess piece. Calculating positions.',
      },
      {
        text: '"My daughter sees something in you. She\'s usually right about these things."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: '"Usually?"',
      },
      {
        text: '"The exceptions are... instructive."',
        speakerId: 'millicent',
        emotion: 'smirking',
      },
      {
        text: 'First encounter complete. You survived. Now the real work begins.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'power-network-intro',
  },
  {
    id: 'maris-encounter-end-neutral',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    chapter: { name: 'Mission Complete: First Encounter', index: 3, total: 5 },
    dialog: [
      {
        text: 'Maris leads you back to the main room.',
      },
      {
        text: '"That could have gone better."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"It could have gone worse."',
      },
      {
        text: '"Perspective. Good. Keep that."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Not the outcome you wanted. But the night isn\'t over.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'power-network-intro',
  },
];
