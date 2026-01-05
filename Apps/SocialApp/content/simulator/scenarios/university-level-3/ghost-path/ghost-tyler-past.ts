import type { ForkScene } from '../../../types';

/**
 * Mission 14: Ghosts of the Past - Tyler (Past Connection)
 * The old Tyler who knew you before the transformation
 * (Appears if player took social path in L2)
 */
export const ghostTylerScenes: ForkScene[] = [
  {
    id: 'ghost-tyler-past-appears',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Ghosts of the Past', index: 5, total: 5 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'Wait. That\'s not the Tyler from tonight.',
      },
      {
        text: 'That\'s a face from before. From the early days. Before everything.',
      },
      {
        text: 'Jordan. The friend who introduced you to Tyler. Who started all of this.',
      },
      {
        text: '"It\'s been a while."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'The origin point. Standing right here.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-jordan-approach',
  },
  {
    id: 'ghost-jordan-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"You look different. More... polished."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"Time changes people."',
      },
      {
        text: '"I heard you\'re with the Caldwells now. Maris herself."',
        speakerId: 'jordan',
        emotion: 'curious',
      },
      {
        text: '"News travels."',
      },
      {
        text: '"In these circles? Always."',
        speakerId: 'jordan',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'jordan-trap',
        text: '"Why are you here, Jordan?"',
        nextSceneId: 'ghost-jordan-defensive',
        isOptimal: false,
        tactic: 'suspicious',
        reaction: {
          text: '"Can\'t I just say hello to an old friend?"',
          emotion: 'sad',
          bodyLanguage: 'Defensive question. You created distance.',
          scoreImpact: -5,
        },
      },
      {
        id: 'jordan-subtle',
        text: '"It\'s good to see a familiar face."',
        nextSceneId: 'ghost-jordan-warm',
        isOptimal: false,
        tactic: 'friendly',
        reaction: {
          text: '"Is it? You look like you\'ve outgrown familiar faces."',
          emotion: 'sad',
          bodyLanguage: 'Sad recognition. Things have changed.',
          scoreImpact: 5,
        },
      },
      {
        id: 'jordan-close',
        text: '"You started me on this path. I haven\'t forgotten."',
        nextSceneId: 'ghost-jordan-acknowledged',
        isOptimal: false,
        tactic: 'acknowledgment',
        reaction: {
          text: '"I introduced you to Tyler. The rest was all you."',
          emotion: 'neutral',
          bodyLanguage: 'Credit given. Humble deflection.',
          scoreImpact: 10,
        },
      },
      {
        id: 'jordan-optimal',
        text: '"You see the irony? The person who started this is watching me finish it."',
        nextSceneId: 'ghost-jordan-poetic',
        isOptimal: true,
        tactic: 'perspective',
        reaction: {
          text: 'A sad smile. "Finish it. That\'s... optimistic."',
          emotion: 'knowing',
          bodyLanguage: 'You acknowledged the journey. They appreciated it.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'ghost-jordan-defensive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Old friends don\'t need reasons."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"But since you ask... I wanted to warn you."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: '"About?"',
      },
      {
        text: '"The person you\'re becoming. Is it still you?"',
        speakerId: 'jordan',
        emotion: 'concerned',
      },
      {
        text: 'A mirror held up. Uncomfortable but necessary.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-jordan-warning',
  },
  {
    id: 'ghost-jordan-warm',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Outgrown." They look away. "Maybe."',
        speakerId: 'jordan',
        emotion: 'sad',
      },
      {
        text: '"I remember when you were terrified of these rooms. Now you own them."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"Growth. Isn\'t that the point?"',
      },
      {
        text: '"Growth. Or transformation. Different things."',
        speakerId: 'jordan',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-jordan-warning',
  },
  {
    id: 'ghost-jordan-acknowledged',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"All me." They shake their head. "I gave you a key. You opened doors I never imagined."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"Is that good or bad?"',
      },
      {
        text: '"Depends on what you find behind them."',
        speakerId: 'jordan',
        emotion: 'knowing',
      },
      {
        text: 'Cryptic. But they\'ve always been that way.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-jordan-warning',
  },
  {
    id: 'ghost-jordan-poetic',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Finish. You think there\'s a finish line?"',
        speakerId: 'jordan',
        emotion: 'knowing',
      },
      {
        text: '"There\'s only the next level. Always."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"And the next level after that?"',
      },
      {
        text: '"That\'s when you become what you\'ve been chasing. Or it consumes you."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: 'Philosophy from someone who watched the beginning.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-jordan-choice',
  },
  {
    id: 'ghost-jordan-warning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"A warning, then. Since you\'re clearly going to keep climbing."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: '"The Caldwells. Victoria. Harrison. They\'ve all lost something along the way."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"What did they lose?"',
      },
      {
        text: '"Themselves. The person they were before the game."',
        speakerId: 'jordan',
        emotion: 'sad',
      },
      {
        text: 'A reminder. Of what\'s at stake beyond power.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-jordan-choice',
  },
  {
    id: 'ghost-jordan-choice',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"I\'m not here to stop you. I couldn\'t even if I tried."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"I\'m here to ask one thing."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: '"Ask."',
      },
      {
        text: '"Remember who you were. Before all this. That person matters too."',
        speakerId: 'jordan',
        emotion: 'pleading',
      },
      {
        text: 'The past, asking for a place in the future.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'remember-trap',
        text: '"That person was weak. I\'m stronger now."',
        nextSceneId: 'ghost-jordan-sad',
        isOptimal: false,
        tactic: 'rejection',
        reaction: {
          text: '"Strong." They look away. "I hope it\'s worth it."',
          emotion: 'sad',
          bodyLanguage: 'You rejected your past. They felt it.',
          scoreImpact: -10,
        },
      },
      {
        id: 'remember-subtle',
        text: '"I\'ll try."',
        nextSceneId: 'ghost-jordan-hopeful',
        isOptimal: false,
        tactic: 'noncommittal',
        reaction: {
          text: '"Try. That\'s something." A small smile.',
          emotion: 'hopeful',
          bodyLanguage: 'A promise. However weak.',
          scoreImpact: 5,
        },
      },
      {
        id: 'remember-close',
        text: '"I\'m still that person. Just... evolved."',
        nextSceneId: 'ghost-jordan-reassured',
        isOptimal: false,
        tactic: 'integration',
        reaction: {
          text: '"Evolved. I hope so. I really do."',
          emotion: 'neutral',
          bodyLanguage: 'You claimed continuity. They want to believe it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'remember-optimal',
        text: '"That person is why I\'m here. Not in spite of them. Because of them."',
        nextSceneId: 'ghost-jordan-peace',
        isOptimal: true,
        tactic: 'integration',
        reaction: {
          text: 'A real smile. Relief. "Then you haven\'t lost yourself. Yet."',
          emotion: 'happy',
          bodyLanguage: 'You honored both versions. That matters.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-jordan-sad',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Worth it." They repeat. Hollow.',
        speakerId: 'jordan',
        emotion: 'sad',
      },
      {
        text: '"Goodbye. I hope you find what you\'re looking for."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'They walk away. A bridge burned.',
      },
      {
        text: 'The past, officially left behind.',
        speakerId: 'inner-voice',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-jordan-hopeful',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Something. It\'s something."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"If you ever need to remember... I\'m around."',
        speakerId: 'jordan',
        emotion: 'hopeful',
      },
      {
        text: 'They disappear into the crowd.',
      },
      {
        text: 'An anchor to the past. Still there. If needed.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-jordan-reassured',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Evolved." They nod slowly.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"Just... don\'t evolve too far. Some things shouldn\'t change."',
        speakerId: 'jordan',
        emotion: 'knowing',
      },
      {
        text: '"I\'ll remember that."',
      },
      {
        text: '"Do."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-jordan-peace',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Because of them." They breathe. Relief.',
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: '"That\'s the answer I needed to hear."',
        speakerId: 'jordan',
        emotion: 'knowing',
      },
      {
        text: '"Go. Win your wars. Build your empire. Just don\'t forget why."',
        speakerId: 'jordan',
        emotion: 'serious',
      },
      {
        text: 'Blessing and warning. Wrapped together.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
];
