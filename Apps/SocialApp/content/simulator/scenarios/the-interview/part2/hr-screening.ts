// Part 2: HR Screening
// Scenes 6-8: The gatekeeper round

import type { Scene } from '../../../types';

export const hrScreeningScenes: Scene[] = [
  // Scene 6: The Weakness Trap
  {
    id: 'interview-6',
    backgroundId: 'office',
    dialog: [
      {
        text: '{hr_name} nods, makes a note. Good sign.',
      },
      {
        text: '"What would you say is your biggest weakness?"',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: '"I work too hard" is transparent bullshit. "I have crippling anxiety" is a red flag.',
        
        emotion: 'concerned',
      },
      {
        text: 'The answer: a real weakness you\'re actively addressing... or a strength disguised as a weakness.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-6-a',
        text: '"I can be too detail-oriented. I\'m learning to delegate and trust my team."',
        nextSceneId: 'interview-7',
        feedback: 'OPTIMAL: Strategic weakness. Shows self-awareness and growth.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-6-b',
        text: 'Share a genuine weakness and how you\'re working on it.',
        nextSceneId: 'interview-7',
        feedback: 'Honest approach. She appreciated the authenticity.',
        xpBonus: 10,
      },
      {
        id: 'interview-6-c',
        text: '"My biggest weakness is that I care too much."',
        nextSceneId: 'interview-7',
        feedback: 'Her eyes glazed. She\'s heard this one a thousand times.',
        xpBonus: 3,
      },
      {
        id: 'interview-6-d',
        text: '"My old manager said I make others look bad by comparison."',
        nextSceneId: 'interview-7',
        feedback: 'Too aggressive. She wrote something down. Probably not good.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 7: The Salary Trap
  {
    id: 'interview-7',
    backgroundId: 'office',
    dialog: [
      {
        text: '{hr_name} checks something on her notepad. Looks up with a practiced smile.',
      },
      {
        text: '"Before we go further, I want to make sure we\'re aligned. What are your salary expectations for this role?"',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Trap. If you go low, you\'ve anchored yourself into poverty. High without justification? Delusional.',
        
        emotion: 'concerned',
      },
      {
        text: 'The anchoring game begins.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-7-a',
        text: '"Based on the scope and my experience, I\'m looking at $105K. I\'m seeing similar offers in that range."',
        nextSceneId: 'interview-8',
        feedback: 'OPTIMAL: High anchor with market justification. You set the ceiling.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-7-b',
        text: '"I\'m open. My research shows $85-$100K for this role. What\'s the budget?"',
        nextSceneId: 'interview-8',
        feedback: 'Good. Range gives flexibility, and you got intel on their budget.',
        xpBonus: 12,
      },
      {
        id: 'interview-7-c',
        text: '"I\'d rather understand the full scope before discussing numbers."',
        nextSceneId: 'interview-8',
        feedback: 'Deflection. It works, but you didn\'t anchor. They will.',
        xpBonus: 8,
      },
      {
        id: 'interview-7-d',
        text: '"I\'m currently at $70K, so anything above that works."',
        nextSceneId: 'interview-8',
        feedback: 'TRAP: You just cost yourself $30K by anchoring to your current underpayment.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 8: HR Transition
  {
    id: 'interview-8',
    backgroundId: 'office',
    dialog: [
      {
        text: '{hr_name} closes her notepad. Stands.',
      },
      {
        text: '"Great. I think {manager_name} is going to really enjoy talking with you."',
        speakerId: 'victoria',
        emotion: 'happy',
      },
      {
        text: 'She shakes your hand. Same warmth as before. Good sign.',
      },
      {
        text: 'Round one cleared. But that was the easy one.',
      },
      {
        text: 'She leads you down the hall to another meeting room. Different energy already.',
      },
      {
        text: 'The hiring manager is next. Your potential boss. This is where it gets real.',
      },
    ],
    nextSceneId: 'interview-9',
  },
];
