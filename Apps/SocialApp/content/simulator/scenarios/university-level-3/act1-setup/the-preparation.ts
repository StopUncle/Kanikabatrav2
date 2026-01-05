import type { ForkScene } from '../../../types';

/**
 * Act 1: The Preparation
 * Getting ready for the gala - stakes established
 */
export const preparationScenes: ForkScene[] = [
  {
    id: 'gala-preparation-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'The Invitation', index: 1, total: 5 },
    dialog: [
      {
        text: 'Night of the gala. Black dress. Black suit. Black tie.',
      },
      {
        text: 'Blake adjusts his collar in the mirror. Nervous energy.',
      },
      {
        text: '"You ready for this?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Ready? No. Going anyway.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'prep-trap',
        text: '"Honestly? I\'m terrified."',
        nextSceneId: 'gala-prep-vulnerable',
        isOptimal: false,
        tactic: 'vulnerability',
        reaction: {
          text: '"That makes two of us." He tries to smile. Doesn\'t quite manage it.',
          emotion: 'concerned',
          bodyLanguage: 'Shared fear. Not helpful tonight.',
          scoreImpact: -5,
        },
      },
      {
        id: 'prep-subtle',
        text: '"It\'s just networking. How bad can it be?"',
        nextSceneId: 'gala-prep-denial',
        isOptimal: false,
        tactic: 'minimizing',
        reaction: {
          text: '"Right. Just networking. With sharks."',
          emotion: 'neutral',
          bodyLanguage: 'He knows you\'re lying to yourself.',
          scoreImpact: 0,
        },
      },
      {
        id: 'prep-close',
        text: '"I\'ve been preparing. I know who\'s who, what they want."',
        nextSceneId: 'gala-prep-strategic',
        isOptimal: false,
        tactic: 'confidence',
        reaction: {
          text: '"Good. Because I\'ll be watching the exits and trying not to embarrass you."',
          emotion: 'happy',
          bodyLanguage: 'He trusts you. Don\'t let him down.',
          scoreImpact: 10,
        },
      },
      {
        id: 'prep-optimal',
        text: '"Ready enough. Let\'s go make some interesting mistakes."',
        nextSceneId: 'gala-prep-confident',
        isOptimal: true,
        tactic: 'controlled-risk',
        reaction: {
          text: 'He laughs. "That\'s the spirit. Let\'s go get into trouble."',
          emotion: 'happy',
          bodyLanguage: 'Right mindset. Confident but not cocky.',
          scoreImpact: 15,
        },
      },
    ],
  },
  {
    id: 'gala-prep-vulnerable',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Look. Whatever happens tonight, we leave together. No one gets left behind."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'You nod. It helps, a little.',
      },
      {
        text: 'But fear is showing. They\'ll smell it the moment you walk in.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-car-ride',
  },
  {
    id: 'gala-prep-denial',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Just don\'t forget - everyone there has an agenda. Even the ones who seem friendly."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"Especially the ones who seem friendly."',
      },
      {
        text: 'At least you\'re not naive. That\'s something.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'gala-car-ride',
  },
  {
    id: 'gala-prep-strategic',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Run me through it again. Who\'s the biggest threat?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Victoria controls access. Harrison controls outcomes. Maris... controls everything else."',
      },
      {
        text: '"And your friend Kai?"',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Kai controls whether I get a second chance if this goes wrong."',
      },
      {
        text: 'He nods slowly. "No pressure then."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'gala-car-ride',
  },
  {
    id: 'gala-prep-confident',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"One last thing." Blake hands you something. A business card holder. Sterling silver.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Borrowed it from my dad. He said it opens doors. Don\'t ask me what that means."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: 'You pocket it. A prop, maybe. But props matter in this world.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-car-ride',
  },
  {
    id: 'gala-car-ride',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The car pulls up. Black, sleek. Kai arranged it.',
      },
      {
        text: 'Blake whistles again. "She doesn\'t do things halfway, does she?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'The driver doesn\'t speak. Just opens the door.',
      },
      {
        text: 'You look back at your apartment. Your world.',
      },
      {
        text: 'When you come back—if you come back—something will be different.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'gala-arrival-intro',
  },
];
