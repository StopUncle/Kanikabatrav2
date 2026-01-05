// Part 1: Diagnosis - Boss Type Selection and Pattern Recognition

import type { Scene } from '../../../types';

export const diagnosisScenes: Scene[] = [
  // Scene 1: A Day in the Life - Boss Type Selection
  {
    id: 'boss-1',
    backgroundId: 'office',
    dialog: [
      {
        text: '9:15 AM. Already your third message from Jordan.',
      },
      {
        text: 'Every day is a test. Not of your work—of your ability to survive your manager.',
        
      },
    ],
    choices: [
      {
        id: 'boss-1-a',
        text: 'Third email asking for status on a task you started an hour ago',
        nextSceneId: 'boss-2-micromanager',
        feedback: 'The Micromanager. Anxiety in inbox form.',
        xpBonus: 5,
      },
      {
        id: 'boss-1-b',
        text: 'Email forwarding your work to leadership with "I put this together..."',
        nextSceneId: 'boss-2-credit-thief',
        feedback: 'The Credit Thief. Your work, their name.',
        xpBonus: 5,
      },
      {
        id: 'boss-1-c',
        text: 'Fourth canceled one-on-one this month. No guidance on priorities.',
        nextSceneId: 'boss-2-absent',
        feedback: 'The Absent Manager. Ghost with a title.',
        xpBonus: 5,
      },
      {
        id: 'boss-1-d',
        text: 'Public Slack message criticizing your work in the team channel',
        nextSceneId: 'boss-2-hostile',
        feedback: 'The Hostile Manager. This is war.',
        xpBonus: 5,
      },
    ],
  },

  // === MICROMANAGER PATH ===
  {
    id: 'boss-2-micromanager',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Following up on my 9 AM email. Also my 9:08 email. Just want to make sure we\'re aligned.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'It\'s been twelve minutes since the last email. Twelve. Minutes.',
        
      },
    ],
    nextSceneId: 'boss-2m-morgan',
  },
  {
    id: 'boss-2m-morgan',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Did you get the triple email yet?',
        speakerId: 'morgan',
        emotion: 'smirking',
      },
      {
        text: 'Quadruple.',
      },
      {
        text: 'New record.',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'This isn\'t about your work. This is about their anxiety.',
        
      },
    ],
    nextSceneId: 'boss-3-micromanager',
  },
  {
    id: 'boss-3-micromanager',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Micromanagers need one thing: the feeling of control.',
      },
      {
        text: 'If you proactively update, you calm their anxiety.',
      },
      {
        text: 'How do you handle this?',
        
      },
    ],
    choices: [
      {
        id: 'boss-3m-a',
        text: 'Proactive over-communication - send status before they ask',
        nextSceneId: 'boss-4-micro-proactive',
        feedback: 'OPTIMAL: Feed the beast before it gets hungry.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-3m-b',
        text: 'Push back - "I\'ll update you when there\'s something to report"',
        nextSceneId: 'boss-4-micro-conflict',
        feedback: 'TRAP: You just triggered every anxiety they have.',
        xpBonus: 0,
      },
      {
        id: 'boss-3m-c',
        text: 'Match their energy - reply to every email immediately',
        nextSceneId: 'boss-4-micro-exhausting',
        feedback: 'Exhausting. You\'re enabling the cycle.',
        xpBonus: 5,
      },
      {
        id: 'boss-3m-d',
        text: 'Document the pattern - track every request for skip-level',
        nextSceneId: 'boss-4-micro-document',
        feedback: 'Building protection. Smart, but doesn\'t fix the daily problem.',
        xpBonus: 10,
      },
    ],
  },

  // === CREDIT THIEF PATH ===
  {
    id: 'boss-2-credit-thief',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Leadership presentation. Jordan at the front. Your slides.',
      },
      {
        text: 'I\'ve been working on this solution for the Henderson challenge...',
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: '"I\'ve." Not "the team." Not your name.',
        
      },
    ],
    nextSceneId: 'boss-2c-casey',
  },
  {
    id: 'boss-2c-casey',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Great work on Henderson, Jordan. Keep it up.',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'This is the third time this quarter. Your work. Their credit.',
        
      },
    ],
    nextSceneId: 'boss-3-credit-thief',
  },
  {
    id: 'boss-3-credit-thief',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Credit thieves survive by being between you and visibility.',
      },
      {
        text: 'Build relationships above them. Make your work visible.',
      },
      {
        text: 'How do you reclaim your credit?',
        
      },
    ],
    choices: [
      {
        id: 'boss-3c-a',
        text: 'Build skip-level relationships - find reasons to interact with Casey directly',
        nextSceneId: 'boss-4-credit-skip',
        feedback: 'OPTIMAL: Go around the obstacle.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-3c-b',
        text: 'Document and share widely - CC leadership on key deliverables',
        nextSceneId: 'boss-4-credit-visible',
        feedback: 'Smart. Create visibility before they can steal it.',
        xpBonus: 12,
      },
      {
        id: 'boss-3c-c',
        text: 'Confront Jordan - "I\'d like to present my own work"',
        nextSceneId: 'boss-4-credit-confront',
        feedback: 'Risky. They\'ll smile and nod. And resent you.',
        xpBonus: 5,
      },
      {
        id: 'boss-3c-d',
        text: 'Accept and outlast - focus on building your exit options',
        nextSceneId: 'boss-4-credit-exit',
        feedback: 'Practical. But you\'re still getting robbed.',
        xpBonus: 8,
      },
    ],
  },

  // === ABSENT MANAGER PATH ===
  {
    id: 'boss-2-absent',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Your calendar shows: "1:1 with Jordan - CANCELED"',
      },
      {
        text: 'Fourth cancellation this month. No guidance on priorities.',
      },
    ],
    nextSceneId: 'boss-2a-email',
  },
  {
    id: 'boss-2a-email',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Hey - swamped. You\'ve got good judgment. Just handle it.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: '"Handle it." Handle what? Leadership is asking questions you can\'t answer.',
        
      },
    ],
    nextSceneId: 'boss-3-absent',
  },
  {
    id: 'boss-3-absent',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Absent managers leave a power vacuum. Fill it or drown.',
      },
      {
        text: 'What\'s your move?',
        
      },
    ],
    choices: [
      {
        id: 'boss-3a-a',
        text: 'Create your own structure - set priorities, find other mentors',
        nextSceneId: 'boss-4-absent-structure',
        feedback: 'OPTIMAL: Become self-managing.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-3a-b',
        text: 'Fill the vacuum - start making decisions in their absence',
        nextSceneId: 'boss-4-absent-fill',
        feedback: 'Aggressive play. High risk, high reward.',
        xpBonus: 10,
      },
      {
        id: 'boss-3a-c',
        text: 'Escalate to Casey - "I need guidance and I\'m not getting it"',
        nextSceneId: 'boss-4-absent-escalate',
        feedback: 'You\'re throwing Jordan under the bus.',
        xpBonus: 5,
      },
      {
        id: 'boss-3a-d',
        text: 'Force communication - keep booking meetings',
        nextSceneId: 'boss-4-absent-force',
        feedback: 'You can\'t force someone to be present.',
        xpBonus: 3,
      },
    ],
  },

  // === HOSTILE MANAGER PATH ===
  {
    id: 'boss-2-hostile',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Public Slack channel - #team-projects:',
      },
      {
        text: '@[You] - The Henderson deck needs serious work. This isn\'t the standard I expect.',
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        text: '27 people can see this message. Public humiliation. Again.',
        
      },
    ],
    nextSceneId: 'boss-2h-check',
  },
  {
    id: 'boss-2h-check',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You check the deck. It\'s exactly what they asked for.',
      },
      {
        text: 'That was messed up. The deck is fine.',
        speakerId: 'morgan',
        emotion: 'angry',
      },
      {
        text: 'This isn\'t about the deck. This is about them.',
        
      },
    ],
    nextSceneId: 'boss-3-hostile',
  },
  {
    id: 'boss-3-hostile',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Hostile managers are the most dangerous.',
      },
      {
        text: 'Documentation protects. Exit planning is mandatory.',
      },
      {
        text: 'How do you protect yourself?',
        
      },
    ],
    choices: [
      {
        id: 'boss-3h-a',
        text: 'Document everything - paper trail of every incident',
        nextSceneId: 'boss-4-hostile-document',
        feedback: 'OPTIMAL: Build your case before you need it.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'boss-3h-b',
        text: 'Go to HR - report a pattern of hostile behavior',
        nextSceneId: 'boss-4-hostile-hr',
        feedback: 'TRAP: HR without documentation is suicide.',
        xpBonus: 0,
      },
      {
        id: 'boss-3h-c',
        text: 'Build alliances - connect with others who see the pattern',
        nextSceneId: 'boss-4-hostile-alliance',
        feedback: 'Strength in numbers.',
        xpBonus: 12,
      },
      {
        id: 'boss-3h-d',
        text: 'Grey rock - minimize interaction',
        nextSceneId: 'boss-4-hostile-grey',
        feedback: 'Defensive. Survival mode.',
        xpBonus: 8,
      },
    ],
  },
];
