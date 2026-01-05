// Part 3: The Aftermath
// Scenes for escalation path if needed

import type { Scene } from '../../../types';

export const aftermathScenes: Scene[] = [
  // Scene: If blocked, escalation decision
  {
    id: 'raise-escalate-decision',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Derek said no. The offer was insultingly low. Decision time.',
      },
      {
        text: 'Options: Accept defeat. Go above him. Use your BATNA for real.',
      },
      {
        text: 'Going above him is nuclear. But sometimes the bridge needs burning.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-esc-a',
        text: 'Request a meeting with Marcus, the VP.',
        nextSceneId: 'raise-vp-meeting',
        feedback: 'Nuclear option. Win or lose, your relationship with Derek is changed forever.',
        xpBonus: 10,
      },
      {
        id: 'raise-esc-b',
        text: 'Present your case to HR as a retention risk.',
        nextSceneId: 'raise-hr-meeting',
        feedback: 'Less confrontational than going to VP. But HR serves the company, not you.',
        xpBonus: 8,
      },
      {
        id: 'raise-esc-c',
        text: 'Accept the other offer. Put in your notice.',
        nextSceneId: 'ending-exit-win',
        feedback: 'Sometimes the best negotiation is walking away.',
        xpBonus: 12,
      },
      {
        id: 'raise-esc-d',
        text: 'Accept defeat. Stay and update your resume quietly.',
        nextSceneId: 'ending-defeat',
        feedback: 'TRAP: You asked, you got nothing, and now they know you\'ll accept it.',
        xpBonus: 0,
      },
    ],
  },

  // Scene: VP Meeting
  {
    id: 'raise-vp-meeting',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You\'re in Marcus\'s office. Derek is not happy about this meeting.',
      },
      {
        text: '"Derek mentioned you wanted to discuss compensation. Walk me through your thinking."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'You went over your manager\'s head. Now you need to make it worth it.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-vp-a',
        text: 'Present your documentation: wins, market data, the full case. Don\'t mention Derek.',
        nextSceneId: 'raise-vp-response',
        feedback: 'OPTIMAL: Let the data speak. Don\'t badmouth Derek. Just demonstrate.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-vp-b',
        text: '"Derek hasn\'t been supportive of my growth. I need to discuss this at your level."',
        nextSceneId: 'raise-vp-response',
        feedback: 'Dangerous. VPs don\'t like employees complaining about their managers.',
        xpBonus: 5,
      },
    ],
  },

  // Scene: VP Response
  {
    id: 'raise-vp-response',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Marcus reviews your documentation carefully.',
      },
      {
        text: '"These are solid contributions."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"I\'ll talk to HR. We don\'t want to lose good people over preventable issues."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He heard you. But watch your back now. Derek knows you went around him.',
        
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ending-escalation-win',
  },

  // Scene: HR Meeting
  {
    id: 'raise-hr-meeting',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You meet with Priya from HR.',
      },
      {
        text: '"I understand you have concerns about compensation. Walk me through the situation."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'HR serves the company. But retention problems are company problems.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'raise-hr-a',
        text: '"I\'m a flight risk. I have an offer. I\'d prefer to stay, but I need this resolved."',
        nextSceneId: 'raise-hr-response',
        feedback: 'OPTIMAL: Frame it as their problem to solve. Retention is an HR metric.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-hr-b',
        text: '"I feel undervalued and would like to discuss my options."',
        nextSceneId: 'raise-hr-response',
        feedback: 'Too soft. HR hears feelings all day. Give them business case.',
        xpBonus: 8,
      },
    ],
  },

  // Scene: HR Response
  {
    id: 'raise-hr-response',
    backgroundId: 'office',
    dialog: [
      {
        text: '"I see. Let me look into what we can do. Market adjustments are handled case by case."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'A week later: $90K approved. Not what you asked, but movement.',
      },
      {
        text: 'HR didn\'t fight for you out of kindness. They fought because losing you costs more than paying you.',
        
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-hr-win',
  },
];
