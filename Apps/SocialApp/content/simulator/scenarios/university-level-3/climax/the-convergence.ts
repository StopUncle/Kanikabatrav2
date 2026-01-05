import type { ForkScene } from '../../../types';

/**
 * Mission 15: The Final Choice - The Convergence
 * All players gather. The main event begins.
 */
export const convergenceScenes: ForkScene[] = [
  {
    id: 'climax-convergence-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    chapter: { name: 'Mission 15: The Final Choice', index: 1, total: 5 },
    mood: 'professional',
    dialog: [
      {
        text: 'A gong sounds. The crowd shifts. It\'s time.',
      },
      {
        text: 'Charles Whitmore takes the stage. Beaming. Oblivious.',
      },
      {
        text: '"Friends! The moment you\'ve been waiting for. Our annual recognition ceremony!"',
        speakerId: 'charles',
        emotion: 'happy',
      },
      {
        text: 'Victoria takes his arm. The real power behind the smile.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'climax-recognition-begins',
  },
  {
    id: 'climax-recognition-begins',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: '"This year, we\'re doing something different."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: '"Instead of just celebrating our established members... we\'re welcoming new blood."',
        speakerId: 'victoria',
        emotion: 'seductive',
      },
      {
        text: 'Murmurs in the crowd. This isn\'t normal.',
      },
      {
        text: 'Maris appears at your elbow. Silent. Watching.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'Something\'s happening. Something planned.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-spotlight',
  },
  {
    id: 'climax-spotlight',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: '"Harrison Cole will announce our... candidates."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Harrison steps forward. The room goes silent.',
      },
      {
        text: '"Tonight, three individuals impressed us enough to be considered for our network."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'He reads names. Two people you don\'t know. Then—',
      },
      {
        text: 'Your name. In front of everyone.',
      },
      {
        text: 'Blake grabs your arm. "Did he just—"',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: 'The spotlight finds you.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-public-moment',
  },
  {
    id: 'climax-public-moment',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'Every eye in the room turns to you.',
      },
      {
        text: '"Please. Join us."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'The two other candidates are already walking forward. Confident. Practiced.',
      },
      {
        text: 'Maris whispers: "This is your moment. Don\'t waste it."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: 'Everyone is watching. How do you approach?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'spotlight-trap',
        text: 'Rush forward. Show enthusiasm. Don\'t keep them waiting.',
        nextSceneId: 'climax-on-stage',
        isOptimal: false,
        tactic: 'eager',
        reaction: {
          text: 'You stumble slightly in your haste. Victoria\'s smile tightens.',
          emotion: 'neutral',
          bodyLanguage: 'Too eager. You looked desperate.',
          scoreImpact: -15,
        },
      },
      {
        id: 'spotlight-subtle',
        text: 'Walk steadily. Neutral expression. Give nothing away.',
        nextSceneId: 'climax-on-stage',
        isOptimal: false,
        tactic: 'controlled',
        reaction: {
          text: 'You reach the stage. Professional. Unremarkable.',
          emotion: 'neutral',
          bodyLanguage: 'Safe. Forgettable. Not what they\'re looking for.',
          scoreImpact: 0,
        },
      },
      {
        id: 'spotlight-close',
        text: 'Smile. Make eye contact with key players as you walk. Own the moment.',
        nextSceneId: 'climax-on-stage',
        isOptimal: false,
        tactic: 'confident',
        reaction: {
          text: 'Harrison nods slightly. You belong here. You know it.',
          emotion: 'smirking',
          bodyLanguage: 'Confident but not arrogant. Good.',
          scoreImpact: 10,
        },
      },
      {
        id: 'spotlight-optimal',
        text: 'Pause. Acknowledge Kai with a look. Then walk like you\'ve done this before.',
        nextSceneId: 'climax-on-stage',
        isOptimal: true,
        tactic: 'acknowledge-path',
        reaction: {
          text: 'Kai nods imperceptibly. The room sees it. You have backing.',
          emotion: 'knowing',
          bodyLanguage: 'You showed your sponsor respect. Politics 101.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'climax-on-stage',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: 'You\'re on the stage now. The other two candidates flank you.',
      },
      {
        text: 'Harrison studies each of you in turn.',
      },
      {
        text: '"These three have demonstrated... potential. But potential isn\'t membership."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Before we proceed, there\'s one more test."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'The crowd shifts. This wasn\'t in the program.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-revelation-intro',
  },
];
