import type { ForkScene } from '../../../types';

export const coffeeScenes: ForkScene[] = [
  // Scene 7: Coffee shop arrival
  {
    id: 'coffee-arrival',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: null,
        text: 'Campus Bean is busy. Students huddle over laptops and lattes.',
        emotion: 'neutral',
      },
      {
        speakerId: 'priya',
        text: '"Hey! Over here."',
        emotion: 'happy',
      },
      {
        speakerId: null,
        text: 'Priya waves from a corner booth. She\'s already got two coffees.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'priya-intel',
  },

  // Scene 8: Priya shares intel
  {
    id: 'priya-intel',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'priya',
        text: '"So. Last night. You handled Maris better than most."',
        emotion: 'serious',
      },
      {
        speakerId: 'priya',
        text: '"I watched the whole thing. You didn\'t chase. That\'s rare."',
        emotion: 'knowing',
      },
      {
        speakerId: 'inner-voice',
        text: 'She was watching. Interesting.',
        emotion: 'curious',
      },
    ],
    choices: [
      {
        id: 'ask-priya-why',
        text: '"Why were you watching me?"',
        nextSceneId: 'priya-explains',
        feedback: 'Direct. Get her cards on the table.',
      },
      {
        id: 'accept-compliment',
        text: '"Thanks. Learned it the hard way."',
        nextSceneId: 'priya-bond',
        feedback: 'Humble acknowledgment builds rapport.',
      },
    ],
  },

  // Scene 9a: Priya explains
  {
    id: 'priya-explains',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'priya',
        text: '"Because I tried to crack that circle last year. Failed spectacularly."',
        emotion: 'sad',
      },
      {
        speakerId: 'priya',
        text: '"Maris made me look desperate in front of everyone. I was watching to see if you\'d make the same mistakes."',
        emotion: 'serious',
      },
      {
        speakerId: 'priya',
        text: '"You didn\'t. That makes you worth knowing."',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dana-approaches',
  },

  // Scene 9b: Priya bond
  {
    id: 'priya-bond',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'priya',
        text: '"We all do. The hard way is the only teacher that sticks."',
        emotion: 'neutral',
      },
      {
        speakerId: 'priya',
        text: '"Look, I\'m going to be straight with you. Maris noticed you. That\'s good and bad."',
        emotion: 'serious',
      },
      {
        speakerId: 'priya',
        text: '"Good because doors open. Bad because her attention has a cost."',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dana-approaches',
  },

  // Scene 10: Dana approaches
  {
    id: 'dana-approaches',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: null,
        text: 'A shadow falls across the table. Someone is standing there.',
        emotion: 'neutral',
      },
      {
        speakerId: 'dana',
        text: '"Mind if I join? I\'m Dana. Caleb\'s sister."',
        emotion: 'happy',
      },
      {
        speakerId: 'inner-voice',
        text: 'Caleb. Maris\'s shadow. His sister just happens to find you?',
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'welcome-dana',
        text: '"Sure, have a seat."',
        nextSceneId: 'dana-sits',
        feedback: 'Keep friends close, potential enemies closer.',
      },
      {
        id: 'polite-decline',
        text: '"Actually, we were just finishing up."',
        nextSceneId: 'dana-deflected',
        feedback: 'Trust your instincts.',
        isOptimal: true,
      },
    ],
  },

  // Scene 11a: Dana sits
  {
    id: 'dana-sits',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'dana',
        text: '"Thanks! So I heard you made quite an impression last night."',
        emotion: 'happy',
      },
      {
        speakerId: 'dana',
        text: '"Maris doesn\'t talk to just anyone, you know. What\'s your secret?"',
        emotion: 'curious',
      },
      {
        speakerId: 'priya',
        text: '...',
        emotion: 'concerned',
      },
      {
        speakerId: 'inner-voice',
        text: 'Priya went quiet. She knows something about Dana.',
        emotion: 'knowing',
      },
    ],
    choices: [
      {
        id: 'share-with-dana',
        text: '"No secret. Just being myself."',
        nextSceneId: 'dana-probes',
        feedback: 'Safe answer. But she\'ll keep digging.',
      },
      {
        id: 'redirect-dana',
        text: '"How\'s Caleb doing? He seemed... stressed."',
        nextSceneId: 'dana-deflects',
        feedback: 'Turn the spotlight. See how she handles it.',
        isOptimal: true,
      },
    ],
  },

  // Scene 11b: Dana deflected
  {
    id: 'dana-deflected',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'dana',
        text: '"Oh. Sure. Another time then."',
        emotion: 'sad',
      },
      {
        speakerId: 'dana',
        text: '"I was only trying to help. Not everyone can see that, I suppose."',
        emotion: 'sad',
      },
      {
        speakerId: null,
        text: 'She walks away with a sigh. Somehow you feel like the bad guy.',
        emotion: 'neutral',
      },
      {
        speakerId: 'priya',
        text: '"Good call. That one\'s trouble."',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'priya-warning',
  },

  // Scene 12: Dana probes deeper
  {
    id: 'dana-probes',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'dana',
        text: '"Just being yourself? Come on, there has to be more to it."',
        emotion: 'curious',
      },
      {
        speakerId: 'dana',
        text: '"Did Maris mention anything about upcoming events? She\'s so secretive with me."',
        emotion: 'sad',
      },
      {
        speakerId: 'inner-voice',
        text: 'She wants information. About Maris. Through you.',
        emotion: 'knowing',
      },
    ],
    choices: [
      {
        id: 'give-info-dana',
        text: '"She mentioned something about a private gathering..."',
        nextSceneId: 'dana-gotcha',
        feedback: 'She\'ll have this on group chat before you finish your coffee.',
        isOptimal: false,
      },
      {
        id: 'nothing-dana',
        text: '"Nothing I can share. You understand."',
        nextSceneId: 'dana-retreats',
        feedback: 'Firm but polite. Perfect.',
        isOptimal: true,
      },
    ],
  },

  // Scene 12b: Dana deflects question about Caleb
  {
    id: 'dana-deflects',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'dana',
        text: '"Caleb? He\'s fine. He loves being around Maris."',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'Her tone is clipped. You hit a nerve.',
        emotion: 'neutral',
      },
      {
        speakerId: 'dana',
        text: '"Anyway, I should go. We should hang out sometime. I\'ll text you."',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'priya-warning',
  },

  // Scene 13: Dana gotcha (failure path setup)
  {
    id: 'dana-gotcha',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'dana',
        text: '"A private gathering? Oh that\'s so exciting! When is it?"',
        emotion: 'happy',
      },
      {
        speakerId: null,
        text: 'She\'s pulling out her phone. Typing.',
        emotion: 'neutral',
      },
      {
        speakerId: 'priya',
        text: '"Dana, who are you texting?"',
        emotion: 'concerned',
      },
      {
        speakerId: 'dana',
        text: '"Just... a friend. Gotta run!"',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-info-fail',
  },

  // Scene 13b: Dana retreats
  {
    id: 'dana-retreats',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'dana',
        text: '"Of course. Discretion. I respect that."',
        emotion: 'neutral',
      },
      {
        speakerId: null,
        text: 'Something flickers behind her eyes. Calculation.',
        emotion: 'neutral',
      },
      {
        speakerId: 'dana',
        text: '"Well, I won\'t keep you. See you around."',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'priya-warning',
  },

  // Scene 14: Priya's warning
  {
    id: 'priya-warning',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'priya',
        text: '"Okay, real talk. Dana Morrison is not your friend."',
        emotion: 'serious',
      },
      {
        speakerId: 'priya',
        text: '"She collects information. Uses it. Caleb\'s the same way—just more obvious about it."',
        emotion: 'serious',
      },
      {
        speakerId: 'priya',
        text: '"You handled that well. Keep your cards close."',
        emotion: 'knowing',
      },
      {
        speakerId: 'inner-voice',
        text: 'Allies and enemies. The lines are clearer now.',
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'thank-priya',
        text: '"Thanks for the heads up. I owe you one."',
        nextSceneId: 'ending-success',
        feedback: 'Building trust with the right people.',
        isOptimal: true,
      },
      {
        id: 'ask-more',
        text: '"What else should I know about this world?"',
        nextSceneId: 'priya-final-advice',
        feedback: 'Wisdom from experience is valuable.',
      },
    ],
  },

  // Scene 15: Priya's final advice
  {
    id: 'priya-final-advice',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'priya',
        text: '"First rule—never brag about access. The second you do, you become a mark."',
        emotion: 'serious',
      },
      {
        speakerId: null,
        text: 'She sips her coffee. Waits for that to land.',
        emotion: 'neutral',
      },
      {
        speakerId: 'priya',
        text: '"Second—what someone tells you in private stays private. Even if it seems harmless."',
        emotion: 'serious',
      },
      {
        speakerId: 'inner-voice',
        text: 'That\'s how Dana works. Collect the harmless. Use it later.',
        emotion: 'knowing',
      },
    ],
    choices: [
      {
        id: 'third-rule',
        text: '"And the third?"',
        nextSceneId: 'priya-third-rule',
        feedback: 'She\'s got one more. Listen.',
        isOptimal: true,
      },
      {
        id: 'got-it',
        text: '"Makes sense. I\'ll remember."',
        nextSceneId: 'ending-success',
        feedback: 'Cut it short. You have the essentials.',
      },
    ],
  },
  {
    id: 'priya-third-rule',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        speakerId: 'priya',
        text: '"Never trust anyone who approaches you right after a win."',
        emotion: 'knowing',
      },
      {
        speakerId: 'priya',
        text: '"That\'s Dana\'s whole strategy. Find the person who just leveled up. Be their new best friend. Extract."',
        emotion: 'serious',
      },
      {
        speakerId: 'priya',
        text: '"You passed her test today. That\'s worth something."',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-success',
  },
];
