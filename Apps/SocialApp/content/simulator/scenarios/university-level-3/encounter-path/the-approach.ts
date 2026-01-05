import type { ForkScene } from '../../../types';

/**
 * Mission 12: First Encounter - The Approach
 * She finds you. Not the other way around.
 */
export const approachScenes: ForkScene[] = [
  {
    id: 'maris-approach-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    chapter: { name: 'First Encounter', index: 3, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'Thirty minutes into the gala. You\'ve mapped the room. Made some connections.',
      },
      {
        text: 'And then the crowd shifts. Parts.',
      },
      {
        text: 'Maris Caldwell walks toward you. Unhurried. Certain.',
      },
      {
        text: 'She didn\'t wait for you to approach. She chose when.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-approach-moment',
  },
  {
    id: 'maris-approach-moment',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake sees her coming. His face goes pale.',
      },
      {
        text: '"I should... go check on something."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'He melts into the crowd. Smart man.',
      },
      {
        text: 'And then she\'s there. Close. Too close.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'maris-first-words',
  },
  {
    id: 'maris-first-words',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: '"You\'ve grown."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'Two words. Her first real words to you since everything started.',
      },
      {
        text: '"Since the restaurant. Since the university. You were... interesting. Now you\'re here."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She\'s been watching longer than you knew.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'approach-trap',
        text: '"I\'m honored you noticed."',
        nextSceneId: 'maris-approach-weak',
        isOptimal: false,
        tactic: 'deference',
        reaction: {
          text: '"Honored." She tastes the word. Finds it lacking. "Don\'t be."',
          emotion: 'cold',
          bodyLanguage: 'You submitted. She lost interest.',
          scoreImpact: -20,
        },
      },
      {
        id: 'approach-subtle',
        text: '"I noticed you too. At the restaurant. You didn\'t say hello."',
        nextSceneId: 'maris-approach-curious',
        isOptimal: false,
        tactic: 'observation',
        reaction: {
          text: '"I don\'t say hello. I wait to see if people are worth speaking to."',
          emotion: 'neutral',
          bodyLanguage: 'You showed you were paying attention. She noted it.',
          scoreImpact: 5,
        },
      },
      {
        id: 'approach-close',
        text: '"Growing is what I do. Stagnation is for people without ambition."',
        nextSceneId: 'maris-approach-bold',
        isOptimal: false,
        tactic: 'matching-energy',
        reaction: {
          text: 'Her eyes narrow. Evaluating. "Ambition is common. Execution is rare."',
          emotion: 'knowing',
          bodyLanguage: 'Bold, but you sounded like you were trying to impress her.',
          scoreImpact: 10,
        },
      },
      {
        id: 'approach-optimal',
        text: '"And you\'re here to evaluate if that growth was an accident or a pattern."',
        nextSceneId: 'maris-approach-intrigued',
        isOptimal: true,
        tactic: 'reading-intent',
        reaction: {
          text: 'A pause. Something shifts in her expression. Genuine interest.',
          emotion: 'smirking',
          bodyLanguage: 'You read her correctly. She didn\'t expect that.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'maris-approach-weak',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: 'She looks past you. Already done.',
      },
      {
        text: '"Kai vouched for you. I told her it was premature. It seems I was right."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"Wait—"',
      },
      {
        text: '"Enjoy the party." She turns away.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Failed. Before it even started.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'maris-recovery-chance',
  },
  {
    id: 'maris-approach-curious',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Observant." She tilts her head. "Most people are too busy trying to be seen to actually see."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Is that what you look for? People who see?"',
      },
      {
        text: '"I look for people who understand what they\'re seeing. Rare quality."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'A thread. Pull carefully.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-setup',
  },
  {
    id: 'maris-approach-bold',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"You talk about ambition like you understand it."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Most people confuse wanting with deserving. With earning."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"I earn."',
      },
      {
        text: '"Do you? We\'ll see."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'A challenge. She\'s measuring you now.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'maris-test-setup',
  },
  {
    id: 'maris-approach-intrigued',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Pattern recognition." She says it like she\'s tasting wine. Savoring.',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: '"Most people can\'t see past the moment. They think each event is isolated. Random."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Nothing is random in your world."',
      },
      {
        text: '"Now we\'re getting somewhere."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'You have her attention. The real kind.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-setup',
  },
  {
    id: 'maris-recovery-chance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: 'She\'s walking away. The moment slipping.',
      },
      {
        text: 'But she hasn\'t left yet. There\'s still a chance.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'recovery-trap',
        text: 'Let her go. The damage is done.',
        nextSceneId: 'maris-encounter-failed',
        isOptimal: false,
        tactic: 'surrender',
        reaction: {
          text: 'She disappears into the crowd. You failed her test before it began.',
          emotion: 'cold',
          bodyLanguage: 'Game over. At least for tonight.',
          scoreImpact: -30,
        },
      },
      {
        id: 'recovery-subtle',
        text: '"That was a test. I failed it."',
        nextSceneId: 'maris-recovery-honest',
        isOptimal: false,
        tactic: 'honesty',
        reaction: {
          text: 'She pauses. Turns back. Something flickers in her eyes.',
          emotion: 'neutral',
          bodyLanguage: 'Unexpected. Most people wouldn\'t admit failure.',
          scoreImpact: 10,
        },
      },
      {
        id: 'recovery-close',
        text: '"I came here to learn. Teach me why I was wrong."',
        nextSceneId: 'maris-recovery-student',
        isOptimal: false,
        tactic: 'submission',
        reaction: {
          text: '"I don\'t teach. I evaluate. You either have it or you don\'t."',
          emotion: 'cold',
          bodyLanguage: 'Wrong approach. She respects strength, not supplication.',
          scoreImpact: -5,
        },
      },
      {
        id: 'recovery-optimal',
        text: '"You expected deference. I gave it. Now I know better. Ask again."',
        nextSceneId: 'maris-recovery-reframe',
        isOptimal: true,
        tactic: 'reframe',
        reaction: {
          text: 'She stops. Turns fully. "Interesting. A course correction in real-time."',
          emotion: 'smirking',
          bodyLanguage: 'You learned from your mistake. Instantly. That impressed her.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'maris-encounter-failed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: 'She\'s gone. The crowd closes behind her.',
      },
      {
        text: 'Blake reappears. "What happened? She looked..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"I blew it."',
      },
      {
        text: 'First encounter: catastrophic failure. The night continues.',
        speakerId: 'inner-voice',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'power-network-intro',
  },
  {
    id: 'maris-recovery-honest',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Self-awareness." She says. "Also rare."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She walks back. Closer again.',
      },
      {
        text: '"You recognized the test. You recognized your failure. Most would have blamed me for being difficult."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Second chance. Don\'t waste it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-setup',
  },
  {
    id: 'maris-recovery-student',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Teaching requires patience. I have very little."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'But she hasn\'t left. Not quite.',
      },
      {
        text: '"What I will say is this: I don\'t want followers. I want... peers."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Peers. She\'s looking for equals. Or the closest she can find.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-setup',
  },
  {
    id: 'maris-recovery-reframe',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"You adapted." She walks back. Studying you.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Most people make a mistake and then spiral. Justify. Defend. You... recalibrated."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"I learn fast."',
      },
      {
        text: '"Let\'s find out."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'Back in the game. Barely.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-setup',
  },
];
