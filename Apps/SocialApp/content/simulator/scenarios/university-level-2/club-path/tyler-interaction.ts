import type { ForkScene } from '../../../types';

/**
 * Club Path - Tyler Interaction
 * Core dialogue with Tyler (HPD) - validation-seeking, dramatic, volatile
 */
export const tylerInteractionScenes: ForkScene[] = [
  // DEFENSIVE INTRO (low status entry)
  {
    id: 'club-tyler-intro-defensive',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'tense',
    dialog: [
      {
        text: 'Tyler looks you over. The assessment isn\'t subtle.',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: '"So. Blake\'s friend." His tone drips with "I expected more."',
        speakerId: 'tyler',
        emotion: 'cold',
      },
      {
        text: '"What exactly do you... do?"',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: 'He\'s testing. Decide how much validation to give.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'defensive-trap',
        text: '"I actually know some really influential people. I was at the Caldwell Gala last year."',
        nextSceneId: 'club-tyler-dismissive',
        isOptimal: false,
        tactic: 'name-dropping',
        reaction: {
          text: '"The Caldwell Gala. Cute." His eyes glaze. He\'s heard this before.',
          emotion: 'cold',
          bodyLanguage: 'Already looking past you.',
          scoreImpact: -15,
        },
      },
      {
        id: 'defensive-subtle',
        text: '"I\'m still figuring things out. Just graduated."',
        nextSceneId: 'club-tyler-neutral',
        isOptimal: false,
        tactic: 'honesty',
        reaction: {
          text: '"Figuring things out. How... fresh." Condescending smile.',
          emotion: 'smirking',
          bodyLanguage: 'You\'re categorized as young and unimportant.',
          scoreImpact: -5,
        },
      },
      {
        id: 'defensive-close',
        text: '"Does it matter? I\'m here. You\'re here. What else is relevant?"',
        nextSceneId: 'club-tyler-intrigued',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: 'His eyebrow arches. "Ooh. Mysterious."',
          emotion: 'curious',
          bodyLanguage: 'Slightly interested despite himself.',
          scoreImpact: 5,
        },
      },
      {
        id: 'defensive-optimal',
        text: '"What do YOU do, Tyler? Beyond throwing the best parties in town?"',
        nextSceneId: 'club-tyler-charmed',
        isOptimal: true,
        tactic: 'redirect-to-them',
        reaction: {
          text: 'His face transforms. Genuine delight. "Finally. Someone who asks the RIGHT questions."',
          emotion: 'happy',
          bodyLanguage: 'HPD feeds on interest in THEM. You\'re giving him what he craves.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // STANDARD INTRO
  {
    id: 'club-tyler-intro',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: '"Welcome, welcome!" Tyler spreads his arms theatrically.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"Blake says you\'re interesting. I\'ll be the judge of that."',
        speakerId: 'tyler',
        emotion: 'smirking',
      },
      {
        text: 'He wants you to prove yourself. The question is: should you?',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'intro-trap',
        text: '"I\'ll do my best to impress you, Tyler. Your parties are legendary."',
        nextSceneId: 'club-tyler-satisfied',
        isOptimal: false,
        tactic: 'supplication',
        reaction: {
          text: '"They ARE, aren\'t they?" He preens. You\'ve fed the beast.',
          emotion: 'happy',
          bodyLanguage: 'Happy, but you\'re now just another sycophant.',
          scoreImpact: -10,
        },
      },
      {
        id: 'intro-subtle',
        text: '"Blake has good taste in friends. You have good taste in parties."',
        nextSceneId: 'club-tyler-neutral',
        isOptimal: false,
        tactic: 'balance',
        reaction: {
          text: '"Acceptable answer." He nods, moving on.',
          emotion: 'neutral',
          bodyLanguage: 'You pass, but don\'t stand out.',
          scoreImpact: 0,
        },
      },
      {
        id: 'intro-close',
        text: '"Interesting is relative. What made Blake interesting to you?"',
        nextSceneId: 'club-tyler-intrigued',
        isOptimal: false,
        tactic: 'curiosity',
        reaction: {
          text: '"Ooh. A curious one." He tilts his head like a predator spotting prey.',
          emotion: 'curious',
          bodyLanguage: 'Engaged. Wants more.',
          scoreImpact: 5,
        },
      },
      {
        id: 'intro-optimal',
        text: '"Judge away. But I\'m not here to audition. Who should I meet tonight?"',
        nextSceneId: 'club-tyler-charmed',
        isOptimal: true,
        tactic: 'frame-flip',
        reaction: {
          text: 'His eyes light up. "Now THAT is the right energy. Come. Let me introduce you."',
          emotion: 'happy',
          bodyLanguage: 'You\'re not chasing. He loves it.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // ADVANTAGE INTRO (high status entry)
  {
    id: 'club-tyler-intro-advantage',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler approaches YOU. This almost never happens.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"I noticed you didn\'t come straight to VIP. Most people trip over themselves to get up here."',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: '"Why didn\'t you?"',
        speakerId: 'tyler',
        emotion: 'curious',
      },
    ],
    dialogueChoices: [
      {
        id: 'advantage-trap',
        text: '"Oh, I wanted to! But the line was long and I figured I\'d wait for the right moment."',
        nextSceneId: 'club-tyler-satisfied',
        isOptimal: false,
        tactic: 'backpedal',
        reaction: {
          text: 'His interest dims. "Ah. So you DID want in." Disappointing.',
          emotion: 'neutral',
          bodyLanguage: 'The mystery vanishes.',
          scoreImpact: -10,
        },
      },
      {
        id: 'advantage-subtle',
        text: '"I wasn\'t sure VIP was where the interesting people were."',
        nextSceneId: 'club-tyler-intrigued',
        isOptimal: false,
        tactic: 'honest-doubt',
        reaction: {
          text: '"Fair point. It\'s often not." He laughs. Genuine.',
          emotion: 'happy',
          bodyLanguage: 'Self-aware moment. Refreshing to him.',
          scoreImpact: 5,
        },
      },
      {
        id: 'advantage-close',
        text: '"VIP finds you when you\'re ready. Seems like it did."',
        nextSceneId: 'club-tyler-charmed',
        isOptimal: false,
        tactic: 'frame-match',
        reaction: {
          text: '"Smooth. I like that." He grins widely.',
          emotion: 'happy',
          bodyLanguage: 'Enjoying the wordplay.',
          scoreImpact: 10,
        },
      },
      {
        id: 'advantage-optimal',
        text: 'Slight smile. "Because you\'re more interesting out here."',
        nextSceneId: 'club-tyler-hooked',
        isOptimal: true,
        tactic: 'direct-compliment',
        reaction: {
          text: 'He actually blushes. Tyler Vance. Blushing.',
          emotion: 'happy',
          bodyLanguage: 'HPD lives for this. Specific, personal validation.',
          scoreImpact: 20,
        },
      },
    ],
  },
  // OUTCOME BRANCHES
  {
    id: 'club-tyler-dismissive',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'cold',
    dialog: [
      {
        text: 'Tyler\'s attention drifts. Someone else catches his eye.',
      },
      {
        text: '"Excuse me. Important people." He\'s gone. Conversation over.',
        speakerId: 'tyler',
        emotion: 'cold',
      },
      {
        text: 'Blake winces from across the room. He\'s seen this before.',
      },
    ],
    nextSceneId: 'club-tyler-recovery',
  },
  {
    id: 'club-tyler-neutral',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler nods politely. Neither warm nor cold.',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: '"Enjoy the party. We should chat later."',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: 'He means "we probably won\'t." But the door isn\'t closed.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'club-vip-proposition-cold',
  },
  {
    id: 'club-tyler-satisfied',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler smiles. The smile of someone who got what they wanted.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"I like you. Stick around. Blake, get them a drink."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'You\'re in his orbit now. But as a satellite, not a planet.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'club-vip-proposition-weak',
  },
  {
    id: 'club-tyler-intrigued',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler leans in. The dramatic gestures pause.',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: '"You\'re different. I can\'t tell if that\'s a good thing yet."',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: '"But I want to find out."',
        speakerId: 'tyler',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'club-vip-proposition',
  },
  {
    id: 'club-tyler-charmed',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler grabs your arm. Not pushy—excited.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"You. I like you. Come. There\'s someone you HAVE to meet."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'He\'s showing you off now. Associating himself with you. That\'s HPD approval.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'club-vip-proposition-strong',
  },
  {
    id: 'club-tyler-hooked',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'romantic',
    dialog: [
      {
        text: 'Tyler pauses. For once, he\'s speechless.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"...I don\'t know what to do with you."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'He\'s completely disarmed. You gave him genuine validation without chasing.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"Come with me. VIP is boring. I know somewhere better."',
        speakerId: 'tyler',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'club-vip-proposition-optimal',
  },
];
