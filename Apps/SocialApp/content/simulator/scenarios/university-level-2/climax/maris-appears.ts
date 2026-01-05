import type { ForkScene } from '../../../types';

/**
 * Climax - Maris Appears
 * The psychopath from Level 1 makes her entrance
 */
export const marisSScenes: ForkScene[] = [
  {
    id: 'climax-maris-approaches',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'danger',
    dialog: [
      {
        text: 'The room shifts. Conversations pause. Eyes turn toward the entrance.',
      },
      {
        text: 'Maris Caldwell. On someone\'s arm. Radiating power.',
      },
      {
        text: 'She looks exactly as you remember. Beautiful. Deadly. Bored by everyone.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-maris-scans',
  },
  {
    id: 'climax-maris-scans',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'She moves through the crowd. Greeting. Smiling. Empty charm.',
      },
      {
        text: 'Then her eyes find you.',
      },
      {
        text: 'She stops. Mid-conversation with someone important.',
      },
      {
        text: 'Your blood goes cold. She remembers.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-maris-watches',
  },
  {
    id: 'climax-maris-watches',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'danger',
    dialog: [
      {
        text: 'She doesn\'t approach. Doesn\'t wave. Doesn\'t speak.',
      },
      {
        text: 'Just... watches. A slight smile on her lips.',
      },
      {
        text: 'Like you\'re an old friend. Like you\'re interesting.',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'What does that smile mean? Approval? Amusement? A threat?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'maris-trap',
        text: 'Wave. Acknowledge her. Show you remember.',
        nextSceneId: 'climax-maris-acknowledged',
        isOptimal: false,
        tactic: 'engage',
        reaction: {
          text: 'Her smile widens. Just a fraction. She tips her head. Then turns away.',
          emotion: 'smirking',
          bodyLanguage: 'You acknowledged her power. She noted it.',
          scoreImpact: 0,
        },
      },
      {
        id: 'maris-subtle',
        text: 'Look away. Pretend you didn\'t notice.',
        nextSceneId: 'climax-maris-ignored',
        isOptimal: false,
        tactic: 'avoid',
        reaction: {
          text: 'She keeps watching. Longer now. You feel her gaze on your back.',
          emotion: 'knowing',
          bodyLanguage: 'She knows you noticed. Pretending otherwise is... weak.',
          scoreImpact: -5,
        },
      },
      {
        id: 'maris-close',
        text: 'Meet her eyes. Hold the gaze. Don\'t smile.',
        nextSceneId: 'climax-maris-respected',
        isOptimal: false,
        tactic: 'frame-hold',
        reaction: {
          text: 'Something flickers in her eyes. Interest? Respect? Hard to tell with psychopaths.',
          emotion: 'neutral',
          bodyLanguage: 'You didn\'t fawn. Didn\'t flee. She\'s recalculating.',
          scoreImpact: 10,
        },
      },
      {
        id: 'maris-optimal',
        text: 'Slight nod. Then continue your conversation. She\'s not the center of your night.',
        nextSceneId: 'climax-maris-intrigued',
        isOptimal: true,
        tactic: 'acknowledge-release',
        reaction: {
          text: 'Her smile changes. Genuine amusement. She nods back. Then moves on.',
          emotion: 'smirking',
          bodyLanguage: 'You treated her like an equal, not a goddess. That\'s rare.',
          scoreImpact: 20,
        },
      },
    ],
  },
  // Maris branches
  {
    id: 'climax-maris-acknowledged',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'Blake appears at your elbow.',
      },
      {
        text: '"Was that... Maris Caldwell? THE Maris Caldwell?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"She looked at you like she knows you."',
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"She does." Long story.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'climax-the-bridge',
  },
  {
    id: 'climax-maris-ignored',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'The rest of the night, you feel watched.',
      },
      {
        text: 'Whenever you glance her direction, she\'s already looking elsewhere.',
      },
      {
        text: 'But you know. You KNOW she\'s tracking your movements.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'climax-the-bridge',
  },
  {
    id: 'climax-maris-respected',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'Later. She passes close. Close enough to speak.',
      },
      {
        text: '"You\'ve grown."',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: 'That\'s all. She keeps walking. But those two words—',
      },
      {
        text: 'From a Caldwell, that might as well be a knighthood.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-the-bridge',
  },
  {
    id: 'climax-maris-intrigued',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'mysterious',
    dialog: [
      {
        text: 'An hour later. A server approaches with a drink.',
      },
      {
        text: '"From the woman in red. She said you\'d understand."',
      },
      {
        text: 'You look across the room. Maris raises her glass. Slight smile.',
      },
      {
        text: 'Then she leaves. With whoever she came with. Says nothing else.',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'You\'re on her radar now. For better or worse.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'climax-the-bridge',
  },
];
