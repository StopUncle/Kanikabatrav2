import type { ForkScene } from '../../../types';

/**
 * Mission 14: Ghosts of the Past - Casey
 * The study partner turned casualty from Level 2
 * (Appears if player took the betrayal path in L2)
 */
export const ghostCaseyScenes: ForkScene[] = [
  {
    id: 'ghost-casey-appears',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Ghosts of the Past', index: 5, total: 5 },
    mood: 'tense',
    dialog: [
      {
        text: 'Casey. The person you stepped over to get here.',
      },
      {
        text: 'They\'ve recovered. Clearly. Better clothes. Better posture. Colder eyes.',
      },
      {
        text: '"Surprised to see me?"',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'The consequences of your choices. Standing right here.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-casey-approach',
  },
  {
    id: 'ghost-casey-approach',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"I heard you were climbing. Congratulations."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'The word drips with something. Not quite sarcasm. Darker.',
      },
      {
        text: '"Casey, I—"',
      },
      {
        text: '"Don\'t. Whatever you\'re about to say. Don\'t."',
        speakerId: 'casey',
        emotion: 'angry',
      },
      {
        text: 'This is not going to be a reconciliation.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'casey-trap',
        text: '"It was business. Nothing personal."',
        nextSceneId: 'ghost-casey-rage',
        isOptimal: false,
        tactic: 'dismissive',
        reaction: {
          text: '"Business." The word is venom. "My life. Business."',
          emotion: 'angry',
          bodyLanguage: 'Wrong move. You made it worse.',
          scoreImpact: -20,
        },
      },
      {
        id: 'casey-subtle',
        text: '"I\'m sorry for how things happened."',
        nextSceneId: 'ghost-casey-hollow',
        isOptimal: false,
        tactic: 'apology',
        reaction: {
          text: '"Sorry." Cold laugh. "That changes everything."',
          emotion: 'cold',
          bodyLanguage: 'Empty apology. Not enough.',
          scoreImpact: -5,
        },
      },
      {
        id: 'casey-close',
        text: '"You recovered. That\'s good."',
        nextSceneId: 'ghost-casey-acknowledgment',
        isOptimal: false,
        tactic: 'acknowledgment',
        reaction: {
          text: '"No thanks to you." But something flickers.',
          emotion: 'neutral',
          bodyLanguage: 'You noticed their success. Small credit.',
          scoreImpact: 10,
        },
      },
      {
        id: 'casey-optimal',
        text: '"I did what I thought I had to. You did too. We\'re both still here."',
        nextSceneId: 'ghost-casey-respect',
        isOptimal: true,
        tactic: 'equal-footing',
        reaction: {
          text: 'A pause. The anger cools. Slightly. "Still here. Yes."',
          emotion: 'neutral',
          bodyLanguage: 'You acknowledged their survival. They heard it.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'ghost-casey-rage',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Business. That\'s what you tell yourself."',
        speakerId: 'casey',
        emotion: 'angry',
      },
      {
        text: '"I was your friend. I trusted you. And you used that."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"Now I know better. Everyone\'s business to you."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: 'An enemy made. Permanently.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-casey-threat',
  },
  {
    id: 'ghost-casey-hollow',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Sorry." They repeat. Testing the word.',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"You\'re not sorry for what you did. You\'re sorry I survived to see this."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"That\'s not—"',
      },
      {
        text: '"It is. We both know it."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'Truth. Uncomfortable but undeniable.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-casey-warning',
  },
  {
    id: 'ghost-casey-acknowledgment',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"No thanks to you." But there\'s less venom now.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"I had to rebuild. From nothing. Do you know how hard that was?"',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"I do."',
      },
      {
        text: '"Do you? Really?"',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'A question worth answering honestly.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-casey-honesty',
  },
  {
    id: 'ghost-casey-respect',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Still here." They almost smile. Almost.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"I didn\'t expect that from you. The acknowledgment."',
        speakerId: 'casey',
        emotion: 'curious',
      },
      {
        text: '"Growth. Supposedly."',
      },
      {
        text: '"Growth." They nod. "We\'ll see about that."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-casey-truce',
  },
  {
    id: 'ghost-casey-threat',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"I\'ve made friends here. Different circles. Victoria\'s people."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"They know about you. What you are. What you do."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"Is that a threat?"',
      },
      {
        text: '"It\'s a promise. What you did to me? I\'ll return it. Tenfold."',
        speakerId: 'casey',
        emotion: 'angry',
      },
      {
        text: 'An enemy in Victoria\'s camp. This complicates things.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-casey-warning',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"I\'m not here for revenge. Not tonight."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"But I am watching. And when you slip—and you will—I\'ll be there."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"Patient."',
      },
      {
        text: '"Very."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'A predator waiting. Thanks to your past actions.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-casey-honesty',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"I know it\'s hard. Because I\'ve done it too. Built from nothing."',
      },
      {
        text: 'They study you. Looking for the lie.',
      },
      {
        text: '"Maybe." Softer now. "Maybe you do."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"It doesn\'t excuse anything. But... I understand the game now."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'honesty-trap',
        text: '"Then you know why I did what I did."',
        nextSceneId: 'ghost-casey-cold-truce',
        isOptimal: false,
        tactic: 'justification',
        reaction: {
          text: '"Knowing and forgiving are different things."',
          emotion: 'cold',
          bodyLanguage: 'You pushed too far. Back to cold.',
          scoreImpact: -5,
        },
      },
      {
        id: 'honesty-subtle',
        text: '"The game changes everyone."',
        nextSceneId: 'ghost-casey-understanding',
        isOptimal: false,
        tactic: 'shared-experience',
        reaction: {
          text: '"It does. That\'s the tragedy."',
          emotion: 'sad',
          bodyLanguage: 'Common ground found. Fragile but real.',
          scoreImpact: 10,
        },
      },
      {
        id: 'honesty-close',
        text: '"I won\'t apologize for surviving. Neither should you."',
        nextSceneId: 'ghost-casey-mutual',
        isOptimal: false,
        tactic: 'mutual-respect',
        reaction: {
          text: '"Survival." They nod slowly. "The only real rule."',
          emotion: 'neutral',
          bodyLanguage: 'You spoke their language.',
          scoreImpact: 15,
        },
      },
      {
        id: 'honesty-optimal',
        text: '"We can keep being enemies. Or we can both be more useful as... neutral parties."',
        nextSceneId: 'ghost-casey-proposition',
        isOptimal: true,
        tactic: 'pragmatism',
        reaction: {
          text: 'A long pause. Calculations behind their eyes. "I\'m listening."',
          emotion: 'curious',
          bodyLanguage: 'You offered something better than revenge.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-casey-cold-truce',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Different things." They step back.',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"I won\'t come for you. Tonight. But we\'re not allies."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"Noted."',
      },
      {
        text: 'Cold peace. Better than war. Barely.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-casey-understanding',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"The tragedy. Yes."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"I don\'t forgive you. But I... understand. Now."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"That\'s something."',
      },
      {
        text: '"It\'s something."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-casey-mutual',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"The only real rule." They repeat it.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"Fine. We both survived. Let\'s leave it there."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"Agreed."',
      },
      {
        text: 'Not peace. Not war. Something in between.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
  {
    id: 'ghost-casey-proposition',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Neutral parties." They consider it.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"You\'re in the Caldwell orbit. I\'m in Victoria\'s. We could... trade."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"Information."',
      },
      {
        text: '"Information. The currency everyone understands."',
        speakerId: 'casey',
        emotion: 'smirking',
      },
      {
        text: 'Enemies turned assets. The best kind of relationship.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-casey-truce',
  },
  {
    id: 'ghost-casey-truce',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Truce, then." They extend a hand.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"For now."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'You shake. Brief. Professional.',
      },
      {
        text: 'The past, transformed into something useful.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-complete',
  },
];
