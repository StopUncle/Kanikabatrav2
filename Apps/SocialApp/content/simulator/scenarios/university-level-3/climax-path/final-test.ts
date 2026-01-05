import type { ForkScene } from '../../../types';

/**
 * Mission 15: The Moment of Truth - Final Test
 * The final confrontation and consequences
 */
export const finalTestScenes: ForkScene[] = [
  {
    id: 'final-victoria',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'Victoria sees you approach. A slow smile.',
      },
      {
        text: '"Couldn\'t stay away?"',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: '"You\'re about to do something. I\'d like to understand it."',
      },
      {
        text: '"Understand it. Or stop it?"',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
      {
        text: 'She knows. Of course she knows.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'victoria-truth',
        text: '"Stop it. The Caldwells helped me. I owe them."',
        nextSceneId: 'final-victoria-honest',
        isOptimal: false,
        tactic: 'honesty',
        reaction: {
          text: 'Her face hardens. "The Caldwells HELPED you. Do you have any idea what they DID to me? To my family?" Her voice drops, venomous. "But please. Tell me more about your precious loyalty. I\'m sure that makes everything they\'ve done acceptable."',
          emotion: 'angry',
          bodyLanguage: 'You triggered something. The wound is still fresh.',
          scoreImpact: -10,
        },
      },
      {
        id: 'victoria-deal',
        text: '"Understand first. I might be able to help."',
        nextSceneId: 'final-victoria-deal',
        isOptimal: false,
        tactic: 'negotiation',
        reaction: {
          text: '"Help." She tilts her head. "Interesting. Tell me more."',
          emotion: 'curious',
          bodyLanguage: 'You offered value. She\'s listening.',
          scoreImpact: 15,
        },
      },
      {
        id: 'victoria-both',
        text: '"Neither. I want to be on the winning side. Whichever that is."',
        nextSceneId: 'final-victoria-opportunist',
        isOptimal: true,
        tactic: 'pragmatism',
        reaction: {
          text: 'Her eyes flash—just for a second. "The winning side." The words come out clipped. "Implying there\'s a question." Then she laughs, but it\'s controlled. "I suppose I can appreciate someone who doesn\'t pretend to have principles."',
          emotion: 'cold',
          bodyLanguage: 'She bristled first. Then recovered. The ego took a hit.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'final-maris',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'Maris sees you coming. Her expression sharpens.',
      },
      {
        text: '"You have that look. The one that means trouble."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
      {
        text: '"Victoria. She\'s about to make a move. Against your mother."',
      },
      {
        text: '"I know."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: 'She knows. Of course she knows.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'maris-warn',
        text: '"You know? Then why aren\'t you stopping it?"',
        nextSceneId: 'final-maris-plan',
        isOptimal: false,
        tactic: 'confusion',
        reaction: {
          text: '"Because I want her to try. Then I want her to fail. Publicly."',
          emotion: 'smirking',
          bodyLanguage: 'She has a plan. A trap.',
          scoreImpact: 10,
        },
      },
      {
        id: 'maris-help',
        text: '"What can I do?"',
        nextSceneId: 'final-maris-role',
        isOptimal: false,
        tactic: 'offer',
        reaction: {
          text: '"Watch. Learn. And when the moment comes, play your part."',
          emotion: 'knowing',
          bodyLanguage: 'You\'re a piece on her board. Willingly.',
          scoreImpact: 15,
        },
      },
      {
        id: 'maris-leverage',
        text: '"I came to warn you. Remember that when this is over."',
        nextSceneId: 'final-maris-debt',
        isOptimal: true,
        tactic: 'investment',
        reaction: {
          text: 'A genuine smile. "Collecting debts already. I taught you well."',
          emotion: 'happy',
          bodyLanguage: 'You played the long game. She\'s impressed.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'final-harrison',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: 'Harrison acknowledges you with a nod.',
      },
      {
        text: '"I wondered when you\'d figure it out."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Figure what out?"',
      },
      {
        text: '"That I\'m the one who told Victoria about Millicent. Twenty years ago."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'The architect. He started this war.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'harrison-why',
        text: '"Why? Why start this war?"',
        nextSceneId: 'final-harrison-truth',
        isOptimal: false,
        tactic: 'understanding',
        reaction: {
          text: '"Balance. No one should have too much power. Including the Caldwells."',
          emotion: 'neutral',
          bodyLanguage: 'He sees himself as a stabilizer.',
          scoreImpact: 10,
        },
      },
      {
        id: 'harrison-side',
        text: '"And tonight? Which side are you on?"',
        nextSceneId: 'final-harrison-position',
        isOptimal: false,
        tactic: 'practical',
        reaction: {
          text: '"The winning side. As always."',
          emotion: 'knowing',
          bodyLanguage: 'He doesn\'t commit. Ever.',
          scoreImpact: 15,
        },
      },
      {
        id: 'harrison-use',
        text: '"You could have ended this years ago. You\'re letting it happen for a reason."',
        nextSceneId: 'final-harrison-game',
        isOptimal: true,
        tactic: 'insight',
        reaction: {
          text: 'A slow smile. "And what reason would that be?"',
          emotion: 'smirking',
          bodyLanguage: 'You see his game. He\'s intrigued.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'final-diversion',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'tense',
    dialog: [
      {
        text: 'You don\'t go to any of them. Instead, you head for the stage.',
      },
      {
        text: 'Blake grabs your arm. "What are you doing?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Changing the game."',
      },
      {
        text: 'You take the microphone. All eyes turn.',
      },
      {
        text: 'Now everyone\'s watching. Including Victoria. Including Maris.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'diversion-toast',
        text: 'Give a toast to the Whitmore Foundation. Delay Victoria\'s moment.',
        nextSceneId: 'final-diversion-toast',
        isOptimal: false,
        tactic: 'delay',
        reaction: {
          text: 'The crowd applauds. Victoria fumes. Time bought.',
          emotion: 'neutral',
          bodyLanguage: 'You delayed. But didn\'t solve.',
          scoreImpact: 15,
        },
      },
      {
        id: 'diversion-expose',
        text: 'Call out Victoria directly. Force her hand.',
        nextSceneId: 'final-diversion-expose',
        isOptimal: false,
        tactic: 'aggression',
        reaction: {
          text: 'Gasps. Victoria\'s face goes white. Then red.',
          emotion: 'angry',
          bodyLanguage: 'You made an enemy. Permanently.',
          scoreImpact: -10,
        },
      },
      {
        id: 'diversion-unity',
        text: 'Call for unity. Make conflict tonight impossible.',
        nextSceneId: 'final-diversion-unity',
        isOptimal: true,
        tactic: 'diplomacy',
        reaction: {
          text: 'The crowd responds. Warmth. Connection. Victoria can\'t strike now.',
          emotion: 'happy',
          bodyLanguage: 'You created an environment where war is impossible.',
          scoreImpact: 30,
        },
      },
    ],
  },
  // Outcome branches
  {
    id: 'final-victoria-honest',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'Victoria takes a breath. Composes herself. When she speaks again, her voice is eerily calm.',
      },
      {
        text: '"You know what\'s fascinating? I\'m the one they hurt. I\'m the one who lost everything. And somehow—" She laughs. "—I\'m the villain for wanting justice."',
        speakerId: 'victoria',
        emotion: 'cold',
      },
      {
        text: '"But you\'ve made your choice. You\'ll regret it."',
        speakerId: 'victoria',
        emotion: 'angry',
      },
      {
        text: 'She turned herself into the victim. In one sentence.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-victoria-deal',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"You want to make a deal. With me. Against the Caldwells."',
        speakerId: 'victoria',
        emotion: 'curious',
      },
      {
        text: '"I want to survive. Deals help with that."',
      },
      {
        text: '"Survival. Finally, someone speaking my language."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-victoria-opportunist',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"The winning side." Victoria studies you.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"You know, I like you. You\'re honest about being dishonest."',
        speakerId: 'victoria',
        emotion: 'smirking',
      },
      {
        text: '"Stay close. We might be useful to each other."',
        speakerId: 'victoria',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-maris-plan',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Victoria thinks she has leverage. She doesn\'t know I have the receipts."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: '"When she strikes, I counterstrike. And she loses everything."',
        speakerId: 'maris',
        emotion: 'cold',
      },
      {
        text: '"Watch. And learn how real power works."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-maris-role',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Your part is simple. When I give the signal, you testify."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: '"Testify to what?"',
      },
      {
        text: '"To what Victoria offered you tonight. To turn on us. You declined. Right?"',
        speakerId: 'maris',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-maris-debt',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Collecting debts." Maris laughs. Real. "My mother would like you."',
        speakerId: 'maris',
        emotion: 'happy',
      },
      {
        text: '"Fine. You have a debt from me. Use it wisely."',
        speakerId: 'maris',
        emotion: 'serious',
      },
      {
        text: '"Now watch. History is about to happen."',
        speakerId: 'maris',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-harrison-truth',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"Balance. The Caldwells were growing too powerful. Someone had to check them."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Victoria was the perfect weapon. Grief. Rage. Purpose."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"And twenty years later, you\'re still playing the same game."',
      },
      {
        text: '"The game never ends. Only the players change."',
        speakerId: 'harrison',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-harrison-position',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"The winning side." He sips his drink.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Tonight, that means neither. I\'m an observer. A facilitator."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"You should consider the same position. Less exciting. Much safer."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-harrison-game',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: '"The reason." He sets down his drink.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"Conflict creates opportunity. For people smart enough to exploit it."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"People like us."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-diversion-toast',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'The toast lands. Charles Whitmore is touched. The moment passes.',
      },
      {
        text: 'Victoria\'s window closes. For now.',
      },
      {
        text: 'Kai finds you. Quiet.',
      },
      {
        text: '"Clever. You bought us time."',
        speakerId: 'kai',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-diversion-expose',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'The room goes silent. All eyes on Victoria.',
      },
      {
        text: '"You don\'t know what you\'ve done." She hisses.',
        speakerId: 'victoria',
        emotion: 'angry',
      },
      {
        text: 'She storms out. Maris approaches. Satisfied.',
      },
      {
        text: '"Dramatic. Effective. Expensive."',
        speakerId: 'maris',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  {
    id: 'final-diversion-unity',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    dialog: [
      {
        text: 'Your words land. The room softens. People embrace. Old enemies smile.',
      },
      {
        text: 'Victoria can\'t strike now. Not in this atmosphere.',
      },
      {
        text: 'You step down. Multiple people approach. Grateful. Impressed.',
      },
      {
        text: 'You changed the game. Neither side won. Everyone won.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ending-choice',
  },
  // Final choice setup
  {
    id: 'ending-choice',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'climax',
    mood: 'professional',
    dialog: [
      {
        text: 'The night ends. Not with explosion. With possibility.',
      },
      {
        text: 'Everyone will remember what happened. What you did. What you chose.',
      },
      {
        text: 'Blake finds you. "So... what now?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'Now comes the question. Who do you want to be?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'ending-caldwell',
        text: '"The Caldwells. I\'m with them."',
        nextSceneId: 'ending-good-caldwell',
        isOptimal: false,
        tactic: 'loyalty',
        reaction: {
          text: 'Blake nods. "Power path. Makes sense."',
          emotion: 'neutral',
          bodyLanguage: 'You chose a side. The dominant one.',
          scoreImpact: 20,
        },
      },
      {
        id: 'ending-victoria',
        text: '"Victoria. She has vision."',
        nextSceneId: 'ending-good-victoria',
        isOptimal: false,
        tactic: 'insurgent',
        reaction: {
          text: 'Blake looks surprised. "The underdog play. Bold."',
          emotion: 'curious',
          bodyLanguage: 'You chose the challenger. Risk and reward.',
          scoreImpact: 15,
        },
      },
      {
        id: 'ending-harrison',
        text: '"Neither. I\'m building my own thing."',
        nextSceneId: 'ending-good-independent',
        isOptimal: true,
        tactic: 'independence',
        reaction: {
          text: 'Blake grins. "Now that\'s the move."',
          emotion: 'happy',
          bodyLanguage: 'You chose yourself. The hardest path. The best one.',
          scoreImpact: 30,
        },
      },
    ],
  },
];
