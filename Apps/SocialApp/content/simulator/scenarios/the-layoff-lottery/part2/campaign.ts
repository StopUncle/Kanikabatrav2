// Part 2: The Campaign - Four weeks of positioning

import type { Scene } from '../../../types';

export const campaignScenes: Scene[] = [
  // Scene 7: The Campaign Begins
  {
    id: 'layoff-7-campaign',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Week 2. You\'re executing your strategy.',
      },
      {
        text: 'The office energy has shifted. People are quieter. More careful.',
      },
      {
        text: 'Everyone knows the score. No one talks about it directly.',
        
      },
    ],
    nextSceneId: 'layoff-8-anxiety',
  },

  // Scene 8: The Anxiety Check
  {
    id: 'layoff-8-anxiety',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Night. You check your phone. Email. Slack. Checking for signals.',
      },
      {
        text: 'Every meeting invitation makes your heart race. "Can we talk for a minute?" feels like a death sentence.',
        
      },
      {
        text: 'You haven\'t been sleeping well. This is what survival mode feels like.',
      },
      {
        text: 'The question is: can you function through it?',
        
      },
    ],
    choices: [
      {
        id: 'layoff-8-a',
        text: 'Compartmentalize - "I can only control what I can control"',
        nextSceneId: 'layoff-9-compartment',
        feedback: 'OPTIMAL: Mental discipline. The game continues.',
        xpBonus: 12,
        isOptimal: true,
      },
      {
        id: 'layoff-8-b',
        text: 'Double down - "Sleep is for after this is over"',
        nextSceneId: 'layoff-9-burnout',
        feedback: 'Risky. Burnout makes mistakes.',
        xpBonus: 5,
      },
      {
        id: 'layoff-8-c',
        text: 'Confide in someone - Talk to Alex, check on others',
        nextSceneId: 'layoff-9-alex',
        feedback: 'Shared anxiety. But also shared intel.',
        xpBonus: 10,
      },
      {
        id: 'layoff-8-d',
        text: 'Prepare exit - "Time to update the resume. Just in case."',
        nextSceneId: 'layoff-9-exit',
        feedback: 'Practical. But are you giving up?',
        xpBonus: 8,
      },
    ],
  },

  // Scene 9: Compartmentalize Path
  {
    id: 'layoff-9-compartment',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'You close the laptop. Take a breath.',
      },
      {
        text: 'I can only control what I can control. The rest is noise.',
        
      },
      {
        text: 'Tomorrow, you focus on delivering. On being visible. On playing the game.',
      },
      {
        text: 'Whatever happens, you\'ll face it with a clear head.',
        
      },
    ],
    nextSceneId: 'layoff-10-week3',
  },

  // Scene 9: Burnout Path
  {
    id: 'layoff-9-burnout',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You work late. Come in early. Every email answered within minutes.',
      },
      {
        text: 'If they\'re going to cut someone, it won\'t be the hardest worker.',
        
      },
      {
        text: 'By week three, you\'re running on fumes. The quality of your work is slipping.',
      },
      {
        text: 'Ironic. You\'re so focused on not getting cut that you might give them a reason to.',
        
      },
    ],
    nextSceneId: 'layoff-10-week3',
  },

  // Scene 9: Alex Path
  {
    id: 'layoff-9-alex',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'Coffee with Alex. Another threatened colleague.',
      },
      {
        text: 'Are you hearing anything? I\'m getting nervous.',
        speakerId: 'alex',
        emotion: 'concerned',
      },
      {
        text: 'My last project didn\'t go well. You think that matters?',
        speakerId: 'alex',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'layoff-9b-alex',
  },
  {
    id: 'layoff-9b-alex',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'I think everything matters right now.',
      },
      {
        text: 'Alex shares what they\'ve heard. Rumors. Names. Who might be protected, who might not be.',
        
      },
      {
        text: 'Priya said they\'re finalizing lists this week.',
        speakerId: 'alex',
        emotion: 'concerned',
      },
      {
        text: 'Intel is survival. Now you know the timeline.',
        
      },
    ],
    nextSceneId: 'layoff-10-week3',
  },

  // Scene 9: Exit Prep Path
  {
    id: 'layoff-9-exit',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Resume updated. LinkedIn refreshed. Three recruiter messages answered.',
      },
      {
        text: 'You have options. That\'s power.',
        
      },
      {
        text: 'But you notice: you\'re spending more time on the exit than the survival strategy.',
      },
      {
        text: 'Have you already decided you\'re leaving?',
        
      },
    ],
    nextSceneId: 'layoff-10-week3',
  },

  // Scene 10: Week 3 Check-In
  {
    id: 'layoff-10-week3',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Week 3. One-on-one with Chen.',
      },
      {
        text: 'How are you holding up?',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Are they checking on you? Or checking if you know something?',
        
      },
    ],
    nextSceneId: 'layoff-10b-week3',
  },
  {
    id: 'layoff-10b-week3',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I\'m focused on delivering. That\'s all I can control.',
      },
      {
        text: 'I want you to know—I\'m advocating for my whole team. I can\'t make promises, but I\'m doing what I can.',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'That\'s either reassuring or a warning. Hard to tell which.',
        
      },
    ],
    nextSceneId: 'layoff-10c-week3',
  },
  {
    id: 'layoff-10c-week3',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Just keep doing what you\'re doing.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'The waiting is the hardest part.',
        
      },
    ],
    nextSceneId: 'layoff-11-week4',
  },

  // Scene 11: Week 4 - Final Positioning
  {
    id: 'layoff-11-week4',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Week 4. The rumors say this is the week.',
      },
      {
        text: 'Last chance to make an impression. What\'s your final move?',
        
      },
    ],
    choices: [
      {
        id: 'layoff-11-a',
        text: 'One more visibility play - Send Marcus that one-pager with your ideas',
        nextSceneId: 'layoff-12-final-visible',
        feedback: 'OPTIMAL: Top of mind when decisions are made.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'layoff-11-b',
        text: 'Deliver something big - Finish the Q4 project ahead of schedule',
        nextSceneId: 'layoff-12-final-deliver',
        feedback: 'Strong. Results speak.',
        xpBonus: 12,
      },
      {
        id: 'layoff-11-c',
        text: 'Stay quiet - Don\'t draw attention, ride it out',
        nextSceneId: 'layoff-12-final-quiet',
        feedback: 'Risky. Invisible people are easier to cut.',
        xpBonus: 5,
      },
      {
        id: 'layoff-11-d',
        text: 'Ask directly - Request a meeting with Chen about your status',
        nextSceneId: 'layoff-12-final-direct',
        feedback: 'Bold. But they probably can\'t tell you anything.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 12: Final Move - Visibility
  {
    id: 'layoff-12-final-visible',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You send Marcus the one-pager. Strategic initiatives for Q1.',
      },
      {
        text: 'Response comes that afternoon.',
      },
      {
        text: 'Good thinking. Let\'s discuss after the restructure settles.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"After the restructure settles." That implies you\'re still here after.',
        
      },
    ],
    nextSceneId: 'layoff-13-day',
  },

  // Scene 12: Final Move - Deliver
  {
    id: 'layoff-12-final-deliver',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You push through. The Q4 integration goes live a week early.',
      },
      {
        text: 'Nice work. Marcus noticed.',
        speakerId: 'chen',
        emotion: 'happy',
      },
      {
        text: 'Results on the board right before decisions are made. Timing matters.',
        
      },
    ],
    nextSceneId: 'layoff-13-day',
  },

  // Scene 12: Final Move - Quiet
  {
    id: 'layoff-12-final-quiet',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You keep your head down. Do your work. Don\'t make waves.',
      },
      {
        text: 'The theory: don\'t give them a reason to think about you.',
        
      },
      {
        text: 'The problem: if they don\'t think about you, they might forget to protect you.',
      },
      {
        text: 'Invisibility is a double-edged sword.',
        
      },
    ],
    nextSceneId: 'layoff-13-day',
  },

  // Scene 12: Final Move - Direct
  {
    id: 'layoff-12-final-direct',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You ask Chen directly: "Can you tell me where I stand?"',
      },
      {
        text: 'I really can\'t say anything specific. I wish I could.',
        speakerId: 'chen',
        emotion: 'sad',
      },
      {
        text: 'Translation: they either don\'t know, or they can\'t tell you.',
        
      },
      {
        text: 'You\'re no more informed than before. But they know you\'re anxious.',
        
      },
    ],
    nextSceneId: 'layoff-13-day',
  },
];
