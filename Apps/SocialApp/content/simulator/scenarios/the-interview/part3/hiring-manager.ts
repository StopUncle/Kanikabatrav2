// Part 3: The Hiring Manager
// Scenes 9-12: The real interview

import type { Scene } from '../../../types';

export const hiringManagerScenes: Scene[] = [
  // Scene 9: Marcus Enters
  {
    id: 'interview-9',
    backgroundId: 'office',
    dialog: [
      {
        text: '{manager_name} enters. Different energy entirely. Direct eye contact. No smile. Assessing.',
      },
      {
        text: '"I\'ve reviewed your resume. Let\'s cut to the chase."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He sits. Opens a folder. Your resume is covered in handwritten notes.',
      },
      {
        text: '"The Henderson project. You led that?"',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'No warmth. No preamble. He\'s testing if you can match his energy.',
      },
      {
        text: 'Mirror him. Direct. Confident. No filler words.',
      },
    ],
    nextSceneId: 'interview-10',
  },

  // Scene 10: The Behavioral Deep Dive
  {
    id: 'interview-10',
    backgroundId: 'office',
    dialog: [
      {
        text: '{manager_name} leans back. Crosses his arms. Not hostile—testing.',
      },
      {
        text: '"Tell me about a time you failed. Not a \'learning experience.\' An actual failure."',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'The real failure question. He wants to see if you own your shit.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'interview-10-a',
        text: 'Own it completely. Share a real failure, what you learned, how you\'d do it differently.',
        nextSceneId: 'interview-11',
        feedback: 'OPTIMAL: Raw honesty. He nodded. Respect earned.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-10-b',
        text: 'Failure + redemption arc. A failure that led to an even bigger success.',
        nextSceneId: 'interview-11',
        feedback: 'Solid. The narrative worked, but he wanted more vulnerability.',
        xpBonus: 10,
      },
      {
        id: 'interview-10-c',
        text: 'Subtle blame shift. A failure where context and others contributed.',
        nextSceneId: 'interview-11',
        feedback: 'His eyes narrowed. He noticed you didn\'t fully own it.',
        xpBonus: 3,
      },
      {
        id: 'interview-10-d',
        text: '"I failed to speak up when I saw the project going wrong. Now I don\'t stay quiet."',
        nextSceneId: 'interview-11',
        feedback: 'Dark arts move. Turned a weakness into positioning. He liked it.',
        xpBonus: 12,
      },
    ],
  },

  // Scene 11: The Hostile Moment
  {
    id: 'interview-11',
    backgroundId: 'office',
    dialog: [
      {
        text: '{manager_name} leans forward. Challenging energy.',
      },
      {
        text: '"Looking at your background, you don\'t have direct experience in enterprise systems. How do you expect to hit the ground running?"',
        speakerId: 'marcus',
        emotion: 'cold',
      },
      {
        text: 'He\'s poking your weak spot. Deliberately.',
        
        emotion: 'concerned',
      },
      {
        text: 'Don\'t get defensive. Don\'t over-explain. Own it or flip it.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-11-a',
        text: '"You\'re right. I haven\'t done enterprise specifically. But I\'ve done Y and Z, which require the same core skills."',
        nextSceneId: 'interview-12',
        feedback: 'Good. Acknowledged the gap, bridged to strengths.',
        xpBonus: 12,
      },
      {
        id: 'interview-11-b',
        text: '"I\'ve found specific experience matters less than problem-solving ability. I was hired without X before and outperformed."',
        nextSceneId: 'interview-12',
        feedback: 'OPTIMAL: Flipped it. He sat back. Point made.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-11-c',
        text: '"Well, the job description didn\'t specifically require that..."',
        nextSceneId: 'interview-12',
        feedback: 'Defensive. He leaned back. Not good.',
        xpBonus: 2,
      },
      {
        id: 'interview-11-d',
        text: 'Launch into a detailed explanation of every adjacent experience.',
        nextSceneId: 'interview-12',
        feedback: 'He checked his watch at minute three. Rambling cost you.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 12: Reading Marcus
  {
    id: 'interview-12',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Twenty minutes in. {manager_name} is tapping his pen. He hasn\'t smiled. But he hasn\'t cut you off either.',
      },
      {
        text: 'What\'s his body language telling you?',
        
        emotion: 'neutral',
      },
      {
        text: 'Tapping pen—impatient? Or processing? No smile—skeptical? Or just his style?',
        
        emotion: 'concerned',
      },
      {
        text: 'You have a chance to course-correct or take control.',
      },
    ],
    choices: [
      {
        id: 'interview-12-a',
        text: '"I want to make sure I\'m giving you what you need. What questions do you still have?"',
        nextSceneId: 'interview-13',
        feedback: 'OPTIMAL: Self-aware. He appreciated the directness.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-12-b',
        text: 'Stay the course. Keep answering his questions as they come.',
        nextSceneId: 'interview-13',
        feedback: 'Safe play. Neither gained nor lost ground.',
        xpBonus: 8,
      },
      {
        id: 'interview-12-c',
        text: '"Can I ask YOU something? What does success look like in the first 90 days?"',
        nextSceneId: 'interview-13',
        feedback: 'Power move. Shows you\'re evaluating them too. He respected it.',
        xpBonus: 12,
      },
      {
        id: 'interview-12-d',
        text: '"How am I doing? Am I on the right track?"',
        nextSceneId: 'interview-13',
        feedback: 'TRAP: Showed insecurity. He noted it.',
        xpBonus: 0,
      },
    ],
  },
];
