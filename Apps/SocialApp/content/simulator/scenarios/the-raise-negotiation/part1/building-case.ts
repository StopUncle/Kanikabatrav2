// Part 1: Building the Case
// Scenes 1-5: Preparation before the ask

import type { Scene } from '../../../types';

export const buildingCaseScenes: Scene[] = [
  // Scene 1: The Realization
  {
    id: 'raise-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'Lunch with Sam. Casual conversation, then their voice drops.',
      },
      {
        text: '"So you know they hired that new PM, right? Taylor? Same level as you?"',
        speakerId: 'sam',
        emotion: 'neutral',
      },
      {
        text: '"Yeah. Seems fine."',
      },
      {
        text: '"You know what they\'re paying them?"',
        speakerId: 'sam',
        emotion: 'concerned',
      },
      {
        text: 'Sam looks around, leans in closer.',
      },
      {
        text: '"$95K. Starting."',
        speakerId: 'sam',
        emotion: 'neutral',
      },
      {
        text: 'You\'ve been here two years. You\'re at $82K. A newcomer just walked in at $13K more than you.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-1-a',
        text: '"That\'s... interesting. Thanks for telling me."',
        nextSceneId: 'raise-2',
        feedback: 'OPTIMAL: Calm exterior. Inside, you\'re already planning.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-1-b',
        text: '"Are you serious? That\'s insane."',
        nextSceneId: 'raise-2',
        feedback: 'The anger is understandable. Channel it into action.',
        xpBonus: 10,
      },
      {
        id: 'raise-1-c',
        text: '"Well, they probably negotiated better than I did."',
        nextSceneId: 'raise-2',
        feedback: 'Self-blame won\'t fix this. But learning from it will.',
        xpBonus: 8,
      },
      {
        id: 'raise-1-d',
        text: '"Maybe they just pay new people more these days."',
        nextSceneId: 'raise-2',
        feedback: 'TRAP: Accepting it won\'t change it. You need to act.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 2: The Documentation
  {
    id: 'raise-2',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'That night. Your laptop open. A blank document stares back at you.',
      },
      {
        text: 'Step one: build the case. Ammunition. Every project saved. Every fire put out. Every dollar made or saved.',
      },
      {
        text: 'Numbers. Specifics. Not feelings.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'raise-2-a',
        text: 'Document everything thoroughly - every win with specific numbers and dollar values.',
        nextSceneId: 'raise-3',
        feedback: 'OPTIMAL: This is your evidence. Courts don\'t accept feelings. Neither do compensation committees.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-2-b',
        text: 'Write quick bullet points - enough to reference in the conversation.',
        nextSceneId: 'raise-3',
        feedback: 'Better than nothing. But thin cases get thin results.',
        xpBonus: 8,
      },
      {
        id: 'raise-2-c',
        text: 'Skip this - your work speaks for itself.',
        nextSceneId: 'raise-3',
        feedback: 'TRAP: Your work doesn\'t speak. You speak for your work. They\'ve already forgotten Q2.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 3: Market Research
  {
    id: 'raise-3',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Step two: know your market value. Your browser shows salary comparison sites.',
      },
      {
        text: 'Glassdoor says your role pays $88-$102K in this market. LinkedIn shows similar roles posted at $95K+. You\'re at $82K.',
      },
      {
        text: 'You\'re not asking for a raise. You\'re correcting a market discrepancy.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'raise-3-a',
        text: 'Compile comprehensive market data with screenshots and sources.',
        nextSceneId: 'raise-4',
        feedback: 'OPTIMAL: Data doesn\'t beg. Data demonstrates.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-3-b',
        text: 'Check a few sites, get a general range to reference.',
        nextSceneId: 'raise-4',
        feedback: 'Good enough for conversation. Not enough for negotiation.',
        xpBonus: 8,
      },
      {
        id: 'raise-3-c',
        text: 'Skip the research - you know you\'re underpaid.',
        nextSceneId: 'raise-4',
        feedback: 'TRAP: Knowing isn\'t proving. "I feel underpaid" gets you nothing.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 4: Building the BATNA
  {
    id: 'raise-4',
    backgroundId: 'text-screen',
    dialog: [
      {
        text: 'LinkedIn notification: "A recruiter wants to connect."',
      },
      {
        text: 'Step three: alternatives. You don\'t need to leave. But you need to be ABLE to leave.',
      },
      {
        text: '"Hi! I came across your profile and think you\'d be a great fit for a Senior PM role. The range is $95-110K. Would you be open to a quick call?"',
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: '$95-110K. You\'re at $82K. Do you engage?',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-4-a',
        text: 'Take the call - a real alternative is your strongest leverage.',
        nextSceneId: 'raise-5',
        feedback: 'OPTIMAL: Real BATNA is the best BATNA. Now you have options.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-4-b',
        text: 'Show polite interest - keep them warm but don\'t commit time yet.',
        nextSceneId: 'raise-5',
        feedback: 'Smart hedge. You\'re building options without burning bridges.',
        xpBonus: 10,
      },
      {
        id: 'raise-4-c',
        text: 'Decline - you want to stay at your current company.',
        nextSceneId: 'raise-5',
        feedback: 'TRAP: Loyalty without leverage is exploitation. They won\'t know you could leave.',
        xpBonus: 0,
      },
      {
        id: 'raise-4-d',
        text: 'Plan to mention "recruiter interest" without actually talking to them.',
        nextSceneId: 'raise-5',
        feedback: 'Risky. Bluffs get called. But sometimes the implication is enough.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 5: Reading Your Manager
  {
    id: 'raise-5',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Before you ask, you need to know who you\'re asking. You observe Derek over the next few days.',
      },
      {
        text: 'Does he take credit for your work? Does he mention you in leadership meetings? Does he seem stressed about budget?',
      },
      {
        text: 'Which Derek are you dealing with?',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-5-a',
        text: 'He\'s been supportive - advocates for the team, shares credit.',
        nextSceneId: 'raise-6-supportive',
        feedback: 'Good sign. A supportive manager will fight for you. Give them the ammunition.',
        xpBonus: 10,
      },
      {
        id: 'raise-5-b',
        text: 'He seems threatened - doesn\'t like team members outshining him.',
        nextSceneId: 'raise-6-threatened',
        feedback: 'Dangerous. He may block you. Prepare to escalate if needed.',
        xpBonus: 10,
      },
      {
        id: 'raise-5-c',
        text: 'He\'s checked out - won\'t fight for anything, just collecting a paycheck.',
        nextSceneId: 'raise-6-checked-out',
        feedback: 'He won\'t help you. But he won\'t block you either. Go around him if needed.',
        xpBonus: 10,
      },
    ],
  },
];
