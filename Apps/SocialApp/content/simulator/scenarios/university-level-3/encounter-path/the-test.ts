import type { ForkScene } from '../../../types';

/**
 * Mission 12: First Encounter - The Test
 * Maris evaluates you directly - the critical scene
 */
export const testScenes: ForkScene[] = [
  {
    id: 'maris-test-setup',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    chapter: { name: 'First Encounter', index: 3, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'Maris gestures toward a quieter corner. Away from ears.',
      },
      {
        text: '"Walk with me."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Not a request.',
      },
      {
        text: 'The crowd parts. Everyone watches. Nobody follows.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-corner',
  },
  {
    id: 'maris-test-corner',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: 'A private alcove. Two chairs. A view of the entire room.',
      },
      {
        text: '"My mother taught me that people are either useful or decorative."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She sits. Crosses her legs. Complete control.',
      },
      {
        text: '"You\'re neither. Yet. So I have a question."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Here it comes. The real test.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'maris-test-question',
  },
  {
    id: 'maris-test-question',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: '"There\'s a woman in this room who destroyed my friend\'s career. False accusations. Whisper campaigns. Complete annihilation."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"She\'s standing by the champagne tower. Laughing. Untouched."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'You look. Victoria Ashworth. Of course.',
      },
      {
        text: '"What would you do?"',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'This is the test. There is no right answer. Only revealing ones.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'test-trap',
        text: '"I\'d expose her. Publicly. Let everyone see what she really is."',
        nextSceneId: 'maris-test-reactive',
        isOptimal: false,
        tactic: 'revenge',
        reaction: {
          text: '"Emotional. Satisfying. And ultimately self-destructive." She shakes her head.',
          emotion: 'cold',
          bodyLanguage: 'You showed impulse. She values calculation.',
          scoreImpact: -15,
        },
      },
      {
        id: 'test-subtle',
        text: '"Nothing. It\'s not my fight. Getting involved would be foolish."',
        nextSceneId: 'maris-test-passive',
        isOptimal: false,
        tactic: 'avoidance',
        reaction: {
          text: '"Safe. Cowardly. Boring." She sounds disappointed.',
          emotion: 'neutral',
          bodyLanguage: 'You showed no fire. She wanted to see something.',
          scoreImpact: -10,
        },
      },
      {
        id: 'test-close',
        text: '"I\'d gather information first. Find her vulnerabilities. Then act strategically."',
        nextSceneId: 'maris-test-strategic',
        isOptimal: false,
        tactic: 'planning',
        reaction: {
          text: '"Better. But still reactive. You\'re responding to her actions."',
          emotion: 'neutral',
          bodyLanguage: 'You showed thought. Not enough originality.',
          scoreImpact: 10,
        },
      },
      {
        id: 'test-optimal',
        text: '"I\'d become more valuable to her than her victim ever was. Then I\'d own her."',
        nextSceneId: 'maris-test-impressed',
        isOptimal: true,
        tactic: 'long-game',
        reaction: {
          text: 'Silence. Then a smile. Real. Dangerous. "Now that\'s interesting."',
          emotion: 'smirking',
          bodyLanguage: 'You showed the predator\'s mindset. She recognizes it.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'maris-test-reactive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Public exposure feels good. For a moment. Then you\'re the villain."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"She would spin it. Become the victim. You would become the attacker."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"So... what? Do nothing?"',
      },
      {
        text: '"I didn\'t say that. I said your approach was wrong."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She\'s teaching. Whether she admits it or not.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-lesson',
  },
  {
    id: 'maris-test-passive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Not your fight." She repeats. Flat.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"In this world, everything is your fight. Every interaction shifts power."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: '"Neutrality is a position. A weak one."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She\'s disappointed. But still talking. That means something.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-test-lesson',
  },
  {
    id: 'maris-test-strategic',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Information. Vulnerabilities. Strategy." She lists them.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"All good. All reactive. You\'re still playing defense."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"The question isn\'t how to hurt her. It\'s how to make hurting her irrelevant."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'Reframe the game. Don\'t play their rules.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-test-lesson',
  },
  {
    id: 'maris-test-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Ownership." She savors the word.',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: '"Not destruction. Not revenge. Control. Permanent leverage."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"She destroyed your friend. You make her dependent on you. Who wins?"',
      },
      {
        text: '"Now you\'re thinking like someone worth knowing."',
        speakerId: 'maris',
        emotion: 'happy',
      },
      {
        text: 'You passed. Not the test. A test.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-second-question',
  },
  {
    id: 'maris-test-lesson',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: 'She leans back. Considering.',
      },
      {
        text: '"The correct approach: become indispensable. To her. To her enemies. To everyone."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Make destroying you more costly than tolerating you. Then more costly than helping you."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"That\'s how you win without fighting."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'Power through dependency. She\'s describing her entire strategy.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-second-question',
  },
  {
    id: 'maris-second-question',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    mood: 'tense',
    dialog: [
      {
        text: '"Second question. More personal."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'She watches you. The scrutiny is almost physical.',
      },
      {
        text: '"Why are you here? Not the gala. Here. Playing this game. Entering this world."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'The real question. What drives you?',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'why-trap',
        text: '"Power. I want to be powerful."',
        nextSceneId: 'maris-why-shallow',
        isOptimal: false,
        tactic: 'direct-ambition',
        reaction: {
          text: '"Power." She sounds bored. "Everyone wants power. Few deserve it."',
          emotion: 'neutral',
          bodyLanguage: 'Generic answer. She\'s heard it a thousand times.',
          scoreImpact: -5,
        },
      },
      {
        id: 'why-subtle',
        text: '"I was invited. It seemed rude to refuse."',
        nextSceneId: 'maris-why-deflection',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"You\'re deflecting. With me." Her voice sharpens.',
          emotion: 'cold',
          bodyLanguage: 'She doesn\'t tolerate evasion. Not from potential allies.',
          scoreImpact: -10,
        },
      },
      {
        id: 'why-close',
        text: '"Because the alternative—staying small—would kill me slowly."',
        nextSceneId: 'maris-why-honest',
        isOptimal: false,
        tactic: 'vulnerability',
        reaction: {
          text: 'Something shifts in her eyes. Recognition? "That I understand."',
          emotion: 'neutral',
          bodyLanguage: 'You showed a real wound. She respects that.',
          scoreImpact: 15,
        },
      },
      {
        id: 'why-optimal',
        text: '"Because I met you. And I realized there were levels I didn\'t know existed."',
        nextSceneId: 'maris-why-perfect',
        isOptimal: true,
        tactic: 'truth',
        reaction: {
          text: 'A long pause. "That\'s... not what I expected you to say."',
          emotion: 'curious',
          bodyLanguage: 'You surprised her. Genuinely. That\'s rare.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'maris-why-shallow',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"Power is a result. Not a goal." She sounds like a professor. Disappointed.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"The question is: power for what? Power over whom?"',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"If you don\'t know, you\'ll never achieve it. You\'ll just chase shadows."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She\'s right. Power without purpose is aimless.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-verdict-setup',
  },
  {
    id: 'maris-why-deflection',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"I asked you a real question. I expect a real answer."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"Games are for people who don\'t matter. We\'re past that. Aren\'t we?"',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: 'She\'s giving you one more chance. Take it.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'maris-verdict-setup',
  },
  {
    id: 'maris-why-honest',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"The slow death of mediocrity." She nods slowly.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"I know that feeling. Waking up one day and realizing you\'ve become... ordinary."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: '"It\'s the closest thing to fear I\'ve ever experienced."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'A crack in the armor. She showed something real.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-verdict-setup',
  },
  {
    id: 'maris-why-perfect',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'encounter',
    dialog: [
      {
        text: '"You\'re saying I\'m the reason you\'re here."',
        speakerId: 'maris',
        emotion: 'curious',
      },
      {
        text: '"Not flattery. Just true. Before you, I didn\'t know this world existed."',
      },
      {
        text: 'She\'s silent for a long moment. Processing.',
      },
      {
        text: '"Most people would lie. Tell me what they think I want to hear."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"You didn\'t."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Truth cuts through everything. Even her defenses.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'maris-verdict-setup',
  },
];
