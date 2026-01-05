// Part 1: Before You Enter - Preparation, anxiety management, the walk

import type { Scene } from '../../../types';

export const preparationScenes: Scene[] = [
  // Scene 1: The Night Before
  {
    id: 'exec-1',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Tomorrow. 2 PM. Board room.',
      },
      {
        text: 'You\'re reviewing slides. Again.',
      },
      {
        text: 'You\'ve practiced this twenty times. You know the content cold.',
        
      },
    ],
    nextSceneId: 'exec-1b',
  },
  {
    id: 'exec-1b',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'But knowing the content isn\'t what this is about.',
      },
      {
        text: 'You catch your reflection in the window.',
      },
      {
        text: 'Tomorrow, they\'re not evaluating your slides. They\'re evaluating YOU.',
        
      },
    ],
    nextSceneId: 'exec-1c',
  },
  {
    id: 'exec-1c',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Do you project authority? Do you handle pressure? Do you seem like you belong at their level?',
      },
      {
        text: 'That\'s the real test.',
        
      },
    ],
    nextSceneId: 'exec-2',
  },

  // Scene 2: Chen's Advice
  {
    id: 'exec-2',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Morning of the presentation. Chen pulls you aside.',
      },
      {
        text: 'You ready?',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'I think so.',
      },
    ],
    nextSceneId: 'exec-2b',
  },
  {
    id: 'exec-2b',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Let me give you some advice.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'These people don\'t need more data. They need someone who can distill data into insight.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'exec-2c',
  },
  {
    id: 'exec-2c',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Less is more. Cut 30% of your slides. Say less. Mean more.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'And when Victoria asks a question—she\'s not asking for information. She\'s testing you.',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'Answer like someone who belongs in that room. Because today, you need to prove you do.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Good advice. What do you take from it?',
        
      },
    ],
    choices: [
      {
        id: 'exec-2-a',
        text: '"Got it. Focus on insights, not data."',
        nextSceneId: 'exec-3',
        feedback: 'OPTIMAL: You\'re thinking like an executive.',
        xpBonus: 12,
        isOptimal: true,
      },
      {
        id: 'exec-2-b',
        text: '"What if I don\'t know an answer?"',
        nextSceneId: 'exec-2d-dontknow',
        feedback: 'Practical concern. Chen has advice for this.',
        xpBonus: 10,
      },
      {
        id: 'exec-2-c',
        text: '"Any specific landmines I should know about?"',
        nextSceneId: 'exec-2d-intel',
        feedback: 'Smart. Information is ammunition.',
        xpBonus: 10,
      },
      {
        id: 'exec-2-d',
        text: '"Thanks. I\'m just going to be myself."',
        nextSceneId: 'exec-3',
        feedback: 'Risky. "Yourself" might not be enough at this level.',
        xpBonus: 5,
      },
    ],
  },
  {
    id: 'exec-2d-dontknow',
    backgroundId: 'office',
    dialog: [
      {
        text: 'If you don\'t know, say so. But say it confidently.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: '"I don\'t have that fully mapped. Here\'s my initial thinking..." Then give them something. Show you can think on your feet.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Acknowledge gaps with confidence. That\'s the move.',
        
      },
    ],
    nextSceneId: 'exec-3',
  },
  {
    id: 'exec-2d-intel',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Marcus will challenge your numbers. Have your assumptions cold.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Elena wants execution detail. Show you\'ve thought through implementation.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Victoria... just don\'t freeze if she asks something unexpected.',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'Intel gathered. Now use it.',
        
      },
    ],
    nextSceneId: 'exec-3',
  },

  // Scene 3: The Anxiety
  {
    id: 'exec-3',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Five minutes before. You\'re in the bathroom, looking in the mirror.',
      },
      {
        text: 'Breathe.',
        
      },
      {
        text: 'Your heart is pounding.',
      },
    ],
    nextSceneId: 'exec-3b',
  },
  {
    id: 'exec-3b',
    backgroundId: 'office',
    dialog: [
      {
        text: 'This is adrenaline. It\'s supposed to happen.',
        
      },
      {
        text: 'The question is what you do with it. You can let it make you faster, sharper, more present. Or you can let it make you scattered, nervous, small.',
      },
    ],
    nextSceneId: 'exec-3c',
  },
  {
    id: 'exec-3c',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You take a breath. Ground yourself.',
      },
      {
        text: 'You know the content. You\'ve done hard things before. The only difference is the audience.',
        
      },
      {
        text: 'And the stakes.',
        
      },
    ],
    nextSceneId: 'exec-4',
  },

  // Scene 4: The Walk
  {
    id: 'exec-4',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Walking to the board room.',
      },
      {
        text: 'Last chance to set your mental state.',
        
      },
      {
        text: 'Body language starts before you speak. Your posture, your pace, your energy—they\'ll read all of it.',
      },
      {
        text: 'How do you want to walk into that room?',
        
      },
    ],
    choices: [
      {
        id: 'exec-4-a',
        text: 'Power stance mentality - Shoulders back, pace steady, take up space',
        nextSceneId: 'exec-5-entrance',
        feedback: 'OPTIMAL: You own the room before you say a word.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'exec-4-b',
        text: 'Calm and collected - Breathe, center yourself, project quiet confidence',
        nextSceneId: 'exec-5-entrance',
        feedback: 'Good. Controlled energy is still energy.',
        xpBonus: 12,
      },
      {
        id: 'exec-4-c',
        text: 'Review notes one more time - Glance at key points on your phone',
        nextSceneId: 'exec-5-entrance-weak',
        feedback: 'Might seem underprepared. But maybe necessary.',
        xpBonus: 5,
      },
      {
        id: 'exec-4-d',
        text: 'Just get through this - Survival mode',
        nextSceneId: 'exec-5-entrance-weak',
        feedback: 'TRAP: Survival energy reads as low-status energy.',
        xpBonus: 0,
      },
    ],
  },
];
