import type { ForkScene } from '../../../types';

/**
 * Setup Path - Dana's Offer
 * The covert narcissist "just wants to help"
 */
export const offerScenes: ForkScene[] = [
  {
    id: 'setup-dana-coffee',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'Mission 3: The Setup', index: 3, total: 5 },
    mood: 'peaceful',
    dialog: [
      {
        text: 'Coffee shop. Dana waves from a corner booth. Huge smile. Bigger agenda.',
      },
      {
        text: '"You came! I\'m so happy to see you. You look AMAZING by the way."',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'The compliments flow too easily. Like she\'s checked a box.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-dana-pitch',
  },
  {
    id: 'setup-dana-pitch',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"So. I have someone PERFECT for you. His name is Derek. Finance. Really successful."',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: '"He\'s exactly your type. I mean, not that I know your type better than you, but... I do." She laughs.',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'She knows your type better than you. Did you catch that?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'pitch-trap',
        text: '"Wow, thank you! That\'s so sweet of you to think of me."',
        nextSceneId: 'setup-dana-pleased',
        isOptimal: false,
        tactic: 'gratitude',
        reaction: {
          text: '"I just want to see you happy! Unlike some people..." She trails off meaningfully.',
          emotion: 'happy',
          bodyLanguage: 'Already building herself up by implying others don\'t care.',
          scoreImpact: -10,
        },
      },
      {
        id: 'pitch-subtle',
        text: '"How do you know him?"',
        nextSceneId: 'setup-dana-connection',
        isOptimal: false,
        tactic: 'inquiry',
        reaction: {
          text: '"Oh, we used to date. Ages ago. Totally over it. He\'s great though!"',
          emotion: 'happy',
          bodyLanguage: 'Used to date. Setting you up with her ex. Hmm.',
          scoreImpact: 5,
        },
      },
      {
        id: 'pitch-close',
        text: '"Why are you setting me up? What\'s in it for you?"',
        nextSceneId: 'setup-dana-deflects',
        isOptimal: false,
        tactic: 'motive-check',
        reaction: {
          text: '"What? Nothing! I just care about you." Hurt flickers across her face. "Wow, okay."',
          emotion: 'sad',
          bodyLanguage: 'Instant victim pivot. You\'re the bad guy now for questioning.',
          scoreImpact: 5,
        },
      },
      {
        id: 'pitch-optimal',
        text: '"Tell me more about Derek. But also—tell me about the last person you set someone up with."',
        nextSceneId: 'setup-dana-exposed',
        isOptimal: true,
        tactic: 'pattern-inquiry',
        reaction: {
          text: '"Oh... well..." Her smile tightens. "That didn\'t work out. But this is different!"',
          emotion: 'neutral',
          bodyLanguage: 'She has a track record. You\'re now asking for it.',
          scoreImpact: 15,
        },
      },
    ],
  },
  // Branch scenes
  {
    id: 'setup-dana-pleased',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Dana beams. She\'s in control of this situation now.',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: '"I\'ll set up the date. This weekend. You\'ll love him. I KNOW you will."',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'She\'s orchestrating your life. And you just thanked her for it.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-the-date',
  },
  {
    id: 'setup-dana-connection',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"It was nothing serious. He just... wasn\'t ready for someone like me."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: '"But you two would be perfect! Different dynamics, you know?"',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'Setting you up with her ex. Either she\'s over him... or she\'s testing something.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-dana-history',
  },
  {
    id: 'setup-dana-deflects',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I can\'t believe you\'d think I have ulterior motives."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: '"I literally just wanted to help. But if you don\'t trust me..."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'Wait. She flipped it. Now YOU\'RE the one who hurt HER?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'deflects-trap',
        text: '"No, I\'m sorry! I didn\'t mean it like that. Please, tell me more about Derek."',
        nextSceneId: 'setup-dana-pleased',
        isOptimal: false,
        tactic: 'backpedal',
        reaction: {
          text: '"Okay... if you\'re sure." She sniffles. Recovers. Smiles.',
          emotion: 'happy',
          bodyLanguage: 'You apologized for asking a question. She wins.',
          scoreImpact: -15,
        },
      },
      {
        id: 'deflects-subtle',
        text: '"I trust you. I just like to understand things."',
        nextSceneId: 'setup-dana-probes',
        isOptimal: false,
        tactic: 'de-escalate',
        reaction: {
          text: '"That\'s fair. You\'re careful. I respect that." The mood shifts back.',
          emotion: 'neutral',
          bodyLanguage: 'She adjusts. Waits for the next opening.',
          scoreImpact: 0,
        },
      },
      {
        id: 'deflects-close',
        text: '"I didn\'t say I don\'t trust you. I asked a question."',
        nextSceneId: 'setup-dana-caught',
        isOptimal: false,
        tactic: 'hold-frame',
        reaction: {
          text: 'Her eyes flash. The mask slips for a millisecond. Then: "You\'re right. Sorry."',
          emotion: 'cold',
          bodyLanguage: 'She didn\'t like that. But she can\'t say so.',
          scoreImpact: 10,
        },
      },
      {
        id: 'deflects-optimal',
        text: 'Wait in silence. Let her fill it.',
        nextSceneId: 'setup-dana-squirms',
        isOptimal: true,
        tactic: 'silence',
        reaction: {
          text: 'She fidgets. "Okay, fine. I just thought you\'d be less... suspicious."',
          emotion: 'confused',
          bodyLanguage: 'Silence is unbearable to coverts. They fill it with truth.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'setup-dana-exposed',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"The last one? Oh, that was... complicated."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"She ended up... well, let\'s just say some people can\'t handle good advice."',
        speakerId: 'dana',
        emotion: 'smirking',
      },
      {
        text: 'The last person she "helped" got hurt. The pattern is forming.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-dana-probes',
  },
  // History and probing scenes
  {
    id: 'setup-dana-history',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"We dated for three months. He was great but... distant. You know the type."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"But you! You\'re different. You can handle him."',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: 'Handle him. Like a challenge. Like a project.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-dana-probes',
  },
  {
    id: 'setup-dana-caught',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Dana recovers quickly. But something\'s different now.',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"You\'re sharp. I like that about you. Most people just... go along."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: 'Genuine acknowledgment. Or recalibrating her approach. Hard to tell.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'setup-dana-probes',
  },
  {
    id: 'setup-dana-squirms',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Fine. Cards on the table."',
        speakerId: 'dana',
        emotion: 'neutral',
      },
      {
        text: '"Derek\'s great but he never appreciated me. Maybe if he sees me being a good friend, setting up someone great..."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'There it is. You\'re a prop in her play to win back her ex.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-dana-truth',
  },
  {
    id: 'setup-dana-probes',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"So anyway. This weekend. I\'ll set it all up. You just show up looking gorgeous."',
        speakerId: 'dana',
        emotion: 'happy',
      },
      {
        text: '"I\'ll text you the details. Trust me. This is going to be SO good."',
        speakerId: 'dana',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'setup-the-date',
  },
  {
    id: 'setup-dana-truth',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I know how it sounds. But I do want you to be happy. Both things can be true."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'Can they? She wants to look good. You getting hurt... optional.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'truth-trap',
        text: '"I appreciate your honesty. Let\'s do it."',
        nextSceneId: 'setup-the-date',
        isOptimal: false,
        tactic: 'acceptance',
        reaction: {
          text: '"Really? You\'re the best!" She hugs you. Too tight.',
          emotion: 'happy',
          bodyLanguage: 'You\'re her pawn now. With permission.',
          scoreImpact: -5,
        },
      },
      {
        id: 'truth-subtle',
        text: '"I\'ll think about it. But no promises."',
        nextSceneId: 'setup-maybe',
        isOptimal: false,
        tactic: 'deferral',
        reaction: {
          text: '"Of course! No pressure." Her smile stays, but her eyes cool.',
          emotion: 'neutral',
          bodyLanguage: 'She doesn\'t like uncertainty. Control issues.',
          scoreImpact: 5,
        },
      },
      {
        id: 'truth-close',
        text: '"If your agenda is that transparent, what else haven\'t you told me?"',
        nextSceneId: 'setup-confrontation',
        isOptimal: false,
        tactic: 'press',
        reaction: {
          text: 'Long pause. "Nothing. I swear." The words come too fast.',
          emotion: 'neutral',
          bodyLanguage: 'More layers. But you\'ve rattled her.',
          scoreImpact: 10,
        },
      },
      {
        id: 'truth-optimal',
        text: '"I\'ll meet Derek. On MY terms. You coordinate, but I drive."',
        nextSceneId: 'setup-power-shift',
        isOptimal: true,
        tactic: 'terms',
        reaction: {
          text: '"...sure. Of course." She blinks. Not used to this.',
          emotion: 'confused',
          bodyLanguage: 'You took her script and rewrote it.',
          scoreImpact: 20,
        },
      },
    ],
  },
];
