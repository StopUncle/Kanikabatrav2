import type { ForkScene } from '../../../types';

/**
 * Ex Path - History & Triangulation
 * Marcus creates competition and push-pull dynamics
 */
export const historyScenes: ForkScene[] = [
  {
    id: 'ex-history-lesson',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Blake watches Marcus work the room. Old pain on his face.',
      },
      {
        text: '"We dated for six months. Longest he\'s ever stayed with anyone."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: '"The highs were incredible. But the disappearing acts..."',
        speakerId: 'blake',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'ex-blake-warns',
  },
  {
    id: 'ex-blake-warns',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"He\'ll be all in. Then gone for weeks. Then back, acting like nothing happened."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"If you ever engage with him... just know. You\'ll always feel like you\'re not enough."',
        speakerId: 'blake',
        emotion: 'sad',
      },
      {
        text: 'Dismissive avoidant pattern. Closeness triggers their fears. They run.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-marcus-returns',
  },
  {
    id: 'ex-drink-offer',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Marcus returns with drinks. Smooth. Practiced.',
      },
      {
        text: '"Blake, you don\'t mind if I steal them for a minute?"',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: 'Stealing. In front of the ex. Classic triangulation.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'drink-trap',
        text: 'Accept the drink. Let him lead you away.',
        nextSceneId: 'ex-isolated',
        isOptimal: false,
        tactic: 'compliance',
        reaction: {
          text: 'Blake\'s face falls. Marcus notices. Smiles.',
          emotion: 'smirking',
          bodyLanguage: 'He wanted to hurt Blake. You helped.',
          scoreImpact: -15,
        },
      },
      {
        id: 'drink-subtle',
        text: '"Thanks for the drink. But Blake and I were in the middle of something."',
        nextSceneId: 'ex-boundary-set',
        isOptimal: false,
        tactic: 'boundary',
        reaction: {
          text: '"Fair enough. I can wait."',
          emotion: 'neutral',
          bodyLanguage: 'He respects it. But he\'s not giving up.',
          scoreImpact: 10,
        },
      },
      {
        id: 'drink-close',
        text: '"You can talk to both of us. No one\'s being stolen."',
        nextSceneId: 'ex-group-dynamic',
        isOptimal: false,
        tactic: 'reframe',
        reaction: {
          text: 'He pauses. "That\'s... new." Genuine surprise.',
          emotion: 'curious',
          bodyLanguage: 'You broke his triangle. He doesn\'t know what to do.',
          scoreImpact: 10,
        },
      },
      {
        id: 'drink-optimal',
        text: '"Blake decides if he minds. Not you."',
        nextSceneId: 'ex-power-restored',
        isOptimal: true,
        tactic: 'respect',
        reaction: {
          text: 'Blake looks at you, surprised. Marcus looks... impressed.',
          emotion: 'knowing',
          bodyLanguage: 'You defended the person he was trying to hurt.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'ex-fresh-start',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"I\'m Marcus. I was being an ass. Let me make it up to you."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'The arrogance is tempered now. Real interest underneath.',
      },
      {
        text: 'He\'s showing vulnerability. Whether it\'s real or strategic... hard to tell.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'fresh-trap',
        text: '"Apology accepted. I\'d love to get to know you better."',
        nextSceneId: 'ex-too-easy',
        isOptimal: false,
        tactic: 'eager',
        reaction: {
          text: 'His eyes cool slightly. Too available. Interest fading.',
          emotion: 'neutral',
          bodyLanguage: 'DAs lose interest when you\'re too accessible.',
          scoreImpact: -10,
        },
      },
      {
        id: 'fresh-subtle',
        text: '"Fair enough. But Blake stays in this conversation."',
        nextSceneId: 'ex-group-dynamic',
        isOptimal: false,
        tactic: 'inclusion',
        reaction: {
          text: '"Both of you. Got it." He seems genuinely pleased.',
          emotion: 'happy',
          bodyLanguage: 'You\'re not competing for him. New experience.',
          scoreImpact: 10,
        },
      },
      {
        id: 'fresh-close',
        text: '"Making it up to me means being honest. What do you actually want?"',
        nextSceneId: 'ex-honesty-check',
        isOptimal: false,
        tactic: 'direct',
        reaction: {
          text: 'Long pause. "I don\'t know yet. That\'s unusual for me."',
          emotion: 'confused',
          bodyLanguage: 'Genuine uncertainty. The mask is cracking.',
          scoreImpact: 15,
        },
      },
      {
        id: 'fresh-optimal',
        text: '"You can make it up by not treating people like they\'re disposable."',
        nextSceneId: 'ex-called-out',
        isOptimal: true,
        tactic: 'direct-truth',
        reaction: {
          text: 'He flinches. Barely. But you caught it.',
          emotion: 'sad',
          bodyLanguage: 'You hit the wound. He knows exactly what he does.',
          scoreImpact: 20,
        },
      },
    ],
  },
  // Branch scenes
  {
    id: 'ex-marcus-returns',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Later. Marcus appears again. Like he never left.',
      },
      {
        text: '"Still talking about me?"',
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: 'Blake stiffens. Old wounds.',
      },
    ],
    nextSceneId: 'ex-drink-offer',
  },
  {
    id: 'ex-marcus-reapproach',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Marcus finally approaches again. Different energy now.',
      },
      {
        text: '"Sorry about earlier. I was testing you. Bad habit."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He\'s being honest. Or he wants you to think he is.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ex-fresh-start',
  },
  {
    id: 'ex-isolated',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    mood: 'romantic',
    dialog: [
      {
        text: 'He leads you to a quieter corner. All attention on you now.',
      },
      {
        text: '"Blake\'s nice. But limited. You seem... more."',
        speakerId: 'marcus',
        emotion: 'seductive',
      },
      {
        text: 'Devaluing Blake to elevate you. Classic love-bombing setup.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-resolution',
  },
  {
    id: 'ex-boundary-set',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Marcus lingers nearby. Watching. Waiting.',
      },
      {
        text: '"He does this."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Creates competition. Makes you feel special by excluding others."',
        speakerId: 'blake',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'ex-resolution',
  },
  {
    id: 'ex-group-dynamic',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'The three of you talk. Marcus keeps trying to split the attention.',
      },
      {
        text: 'But you keep including Blake. Every time.',
      },
      {
        text: 'His usual tactics aren\'t working. He\'s recalibrating.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-resolution',
  },
  {
    id: 'ex-power-restored',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'Blake smiles. First real smile all night.',
      },
      {
        text: '"Actually... I don\'t mind. But thanks for asking."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: 'Marcus nods slowly. "I see." Something shifts.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'You just showed him what respect looks like.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-resolution',
  },
  {
    id: 'ex-too-easy',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: 'The conversation continues, but his engagement fades.',
      },
      {
        text: 'Within twenty minutes, he\'s spotted someone else.',
      },
      {
        text: '"It was nice meeting you. Blake—we should catch up sometime."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Dismissed. Too available equals too boring for a DA.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-resolution',
  },
  {
    id: 'ex-honesty-check',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    dialog: [
      {
        text: '"Usually I know exactly what I want. Take it or leave it."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"With you... I want to figure out what this is before it disappears."',
        speakerId: 'marcus',
        emotion: 'confused',
      },
      {
        text: 'He\'s used to people chasing him. You\'re just... being.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-resolution',
  },
  {
    id: 'ex-called-out',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ex',
    mood: 'cold',
    dialog: [
      {
        text: 'Long silence.',
      },
      {
        text: '"You\'re not wrong." His voice is quieter now. Real.',
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: '"I push people away before they can leave. Stupid, I know."',
        speakerId: 'marcus',
        emotion: 'sad',
      },
      {
        text: 'Self-awareness doesn\'t mean healing. But it\'s a start.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-resolution',
  },
];
