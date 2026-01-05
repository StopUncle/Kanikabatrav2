import type { ForkScene } from '../../../types';

/**
 * Club Path - VIP Proposition
 * Tyler offers something valuable - what does he want in return?
 */
export const vipSectionScenes: ForkScene[] = [
  // RECOVERY SCENE (from dismissive)
  {
    id: 'club-tyler-recovery',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake sidles up. "That could have gone better."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Tyler\'s... sensitive. If you don\'t make him feel special, he shuts down."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Histrionic 101. They NEED to be the center. You didn\'t provide that.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'recovery-trap',
        text: '"I should apologize. Can you get me another chance with him?"',
        nextSceneId: 'club-mission-failed',
        isOptimal: false,
        tactic: 'supplication',
        reaction: {
          text: 'Blake winces. "That\'ll make it worse. Trust me."',
          emotion: 'concerned',
          bodyLanguage: 'Chasing makes you look desperate.',
          scoreImpact: -20,
        },
      },
      {
        id: 'recovery-subtle',
        text: '"His loss. Who else should I meet here?"',
        nextSceneId: 'club-alternative-connection',
        isOptimal: false,
        tactic: 'pivot',
        reaction: {
          text: '"That\'s the spirit. Come on, I know some people."',
          emotion: 'happy',
          bodyLanguage: 'Not Tyler\'s inner circle, but still useful.',
          scoreImpact: 5,
        },
      },
      {
        id: 'recovery-close',
        text: '"He\'ll come around when he sees me networking without him."',
        nextSceneId: 'club-social-proof-play',
        isOptimal: false,
        tactic: 'strategic-distance',
        reaction: {
          text: '"Risky. But if it works, it works." Blake looks impressed.',
          emotion: 'smirking',
          bodyLanguage: 'Playing a longer game.',
          scoreImpact: 10,
        },
      },
      {
        id: 'recovery-optimal',
        text: '"Watch this." Walk over, make Tyler laugh at something, then leave.',
        nextSceneId: 'club-masterclass-recovery',
        isOptimal: true,
        tactic: 'charm-and-withdraw',
        reaction: {
          text: 'Blake watches, stunned, as Tyler calls after you.',
          emotion: 'knowing',
          bodyLanguage: 'Give them what they want, then take it away.',
          scoreImpact: 25,
        },
      },
    ],
  },
  // COLD PROPOSITION (neutral relationship)
  {
    id: 'club-vip-proposition-cold',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Later. Tyler finds you again. Alcohol\'s loosened him up.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"Hey. I host an after-party next week. Private. Very exclusive."',
        speakerId: 'tyler',
        emotion: 'seductive',
      },
      {
        text: '"Bring someone interesting and you\'re in. Can you do that?"',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: 'He wants you to prove value by who you bring. A test.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'cold-trap',
        text: '"Absolutely! I know TONS of interesting people. You won\'t be disappointed!"',
        nextSceneId: 'club-mission-partial',
        isOptimal: false,
        tactic: 'over-promise',
        reaction: {
          text: '"We\'ll see." He\'s skeptical. You sound desperate.',
          emotion: 'neutral',
          bodyLanguage: 'Overeagerness reads as low value.',
          scoreImpact: -5,
        },
      },
      {
        id: 'cold-subtle',
        text: '"Maybe. Depends on the after-party."',
        nextSceneId: 'club-mission-success-basic',
        isOptimal: false,
        tactic: 'conditional',
        reaction: {
          text: '"Fair. Here\'s my number. Text me." Functional exchange.',
          emotion: 'neutral',
          bodyLanguage: 'You\'re in. Barely.',
          scoreImpact: 5,
        },
      },
      {
        id: 'cold-close',
        text: '"Who do YOU want there? I might know someone."',
        nextSceneId: 'club-mission-success-good',
        isOptimal: false,
        tactic: 'needs-discovery',
        reaction: {
          text: 'His eyes light up. He LOVES being asked what he wants.',
          emotion: 'happy',
          bodyLanguage: 'Now you\'re speaking his language.',
          scoreImpact: 10,
        },
      },
      {
        id: 'cold-optimal',
        text: '"Tell me about the after-party first. Then I\'ll decide who deserves to be there."',
        nextSceneId: 'club-mission-success-strong',
        isOptimal: true,
        tactic: 'frame-flip',
        reaction: {
          text: '"...I like how you think." Real respect now.',
          emotion: 'happy',
          bodyLanguage: 'YOU\'RE vetting HIM. Power shift.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // WEAK PROPOSITION (satellite status)
  {
    id: 'club-vip-proposition-weak',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler turns back, almost as an afterthought.',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: '"Oh. There\'s a thing next week. You can come if you want."',
        speakerId: 'tyler',
        emotion: 'neutral',
      },
      {
        text: 'Casual invitation. You\'re welcome, but not special.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'club-mission-partial',
  },
  // STANDARD PROPOSITION
  {
    id: 'club-vip-proposition',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler pulls out his phone. Actually adding your number.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"Next Saturday. Rooftop. Very exclusive. You\'re invited."',
        speakerId: 'tyler',
        emotion: 'seductive',
      },
      {
        text: '"Don\'t tell anyone. This is inner circle only."',
        speakerId: 'tyler',
        emotion: 'serious',
      },
      {
        text: 'Inner circle access. That\'s valuable currency.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'club-mission-success-good',
  },
  // STRONG PROPOSITION (shown off to others)
  {
    id: 'club-vip-proposition-strong',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Tyler introduces you to everyone. By name. With compliments.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"This one gets it. Watch out for this one."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: 'He\'s endorsing you publicly. In HPD terms, you\'re now an extension of his brand.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"Next week. The REAL party. My place. You\'re on the list."',
        speakerId: 'tyler',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'club-mission-success-strong',
  },
  // OPTIMAL PROPOSITION (genuine connection)
  {
    id: 'club-vip-proposition-optimal',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'romantic',
    dialog: [
      {
        text: 'Tyler takes you somewhere quieter. The balcony.',
        speakerId: 'tyler',
        emotion: 'happy',
      },
      {
        text: '"I don\'t usually... I mean, people usually want something from me."',
        speakerId: 'tyler',
        emotion: 'sad',
      },
      {
        text: 'The mask slips. Just for a second. Underneath the drama: loneliness.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: '"You didn\'t ask for VIP. Didn\'t namedrop. Just... talked to me."',
        speakerId: 'tyler',
        emotion: 'happy',
      },
    ],
    dialogueChoices: [
      {
        id: 'optimal-trap',
        text: '"That\'s because I genuinely think you\'re amazing, Tyler."',
        nextSceneId: 'club-mission-success-strong',
        isOptimal: false,
        tactic: 'validation',
        reaction: {
          text: 'He smiles, but the moment passes. Too easy.',
          emotion: 'happy',
          bodyLanguage: 'The vulnerability closes back up.',
          scoreImpact: 5,
        },
      },
      {
        id: 'optimal-subtle',
        text: '"Everyone plays a role here. Gets exhausting, right?"',
        nextSceneId: 'club-mission-success-excellent',
        isOptimal: false,
        tactic: 'empathy',
        reaction: {
          text: '"...yeah. It really does." He exhales. Genuine.',
          emotion: 'sad',
          bodyLanguage: 'You saw him. Actually saw him.',
          scoreImpact: 15,
        },
      },
      {
        id: 'optimal-close',
        text: '"I asked because I was curious. Not because I wanted anything."',
        nextSceneId: 'club-mission-success-excellent',
        isOptimal: false,
        tactic: 'honesty',
        reaction: {
          text: 'He pauses. Studies you. Then nods slowly.',
          emotion: 'curious',
          bodyLanguage: 'Real connection forming.',
          scoreImpact: 15,
        },
      },
      {
        id: 'optimal-optimal',
        text: 'Just let the silence sit. Don\'t fill it.',
        nextSceneId: 'club-mission-success-perfect',
        isOptimal: true,
        tactic: 'presence',
        reaction: {
          text: 'He looks at you. Really looks. Then smiles—small, real.',
          emotion: 'happy',
          bodyLanguage: 'You didn\'t try to fix it. Just stayed. That\'s rare.',
          scoreImpact: 25,
        },
      },
    ],
  },
  // ALTERNATIVE PATHS
  {
    id: 'club-alternative-connection',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'Blake introduces you around. Not Tyler\'s inner circle, but solid contacts.',
      },
      {
        text: 'Marketing directors. Event planners. People who throw their own parties.',
      },
      {
        text: 'Not VIP. But you made connections. That\'s something.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'club-mission-partial',
  },
  {
    id: 'club-social-proof-play',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'You work the room without Tyler. Laugh loudly. Make yourself visible.',
      },
      {
        text: 'An hour later, Tyler\'s watching. From VIP. He keeps glancing over.',
      },
      {
        text: '"That person from earlier—bring them up here."',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: 'He summons you. It worked.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'club-vip-proposition',
  },
  {
    id: 'club-masterclass-recovery',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'club',
    mood: 'party',
    dialog: [
      {
        text: 'You approach Tyler again. But differently this time.',
      },
      {
        text: 'Quick joke about something he said. He laughs—loudly.',
      },
      {
        text: 'Then you turn away. Start talking to someone else.',
      },
      {
        text: '"Wait—where are you going?"',
        speakerId: 'tyler',
        emotion: 'curious',
      },
      {
        text: 'Hook. Line. Sinker.',
        speakerId: 'inner-voice',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'club-vip-proposition-optimal',
  },
];
