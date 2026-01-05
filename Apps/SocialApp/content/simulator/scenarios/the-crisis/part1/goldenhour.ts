// Part 1: The Golden Hour - Story breaking, chaos, securing position

import type { Scene } from '../../../types';

export const goldenHourScenes: Scene[] = [
  // Scene 1: 6:02 AM - The Wake Up
  {
    id: 'crisis-1',
    backgroundId: 'bedroom',
    dialog: [
      {
        text: 'Your phone hasn\'t stopped buzzing for three minutes.',
      },
      {
        text: 'MESSAGE 1 [UNKNOWN NUMBER]: "This is James Park from the Tribune. Story runs at 8 AM. Call me."',
      },
      {
        text: 'MESSAGE 2 [VICTORIA CHEN - LEGAL]: "Call me immediately. Do not talk to anyone."',
      },
      {
        text: 'MESSAGE 3 [ELENA RODRIGUEZ]: "I just got a call from a reporter asking about your division. What\'s happening?"',
      },
    ],
    nextSceneId: 'crisis-2',
  },
  {
    id: 'crisis-2',
    backgroundId: 'bedroom',
    dialog: [
      {
        text: 'Something bad. Something very bad.',
        
      },
      {
        text: 'You have 118 minutes before a story breaks. What you do in the next hour determines everything.',
      },
    ],
    choices: [
      {
        id: 'crisis-2-call-legal',
        text: 'Call Victoria - General Counsel',
        nextSceneId: 'crisis-3-legal',
        feedback: 'Company counsel first. She knows what\'s coming.',
      },
      {
        id: 'crisis-2-call-reporter',
        text: 'Call the reporter back',
        nextSceneId: 'crisis-3-reporter',
        feedback: 'Bold. Get the story directly from the source.',
      },
      {
        id: 'crisis-2-call-elena',
        text: 'Call Elena to find out what she knows',
        nextSceneId: 'crisis-3-elena',
        feedback: 'She reached out fast. Too fast. What does she know?',
      },
    ],
  },

  // Scene 3: Understanding the threat - Legal path
  {
    id: 'crisis-3-legal',
    backgroundId: 'bedroom',
    dialog: [
      {
        speakerId: 'victoria',
        text: 'A reporter contacted us. They\'re alleging your division falsified Q3 safety data.',
        emotion: 'cold',
      },
      {
        speakerId: 'victoria',
        text: 'They have documents. Emails, apparently. From someone in your team.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'crisis-4',
  },

  // Scene 3: Reporter path
  {
    id: 'crisis-3-reporter',
    backgroundId: 'bedroom',
    dialog: [
      {
        speakerId: 'james',
        text: 'Thanks for calling back. I\'m running a story about data manipulation in your division.',
        emotion: 'neutral',
      },
      {
        speakerId: 'james',
        text: 'Multiple sources confirm safety data was altered. I have emails suggesting leadership pressure.',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'crisis-4',
  },

  // Scene 3: Elena path
  {
    id: 'crisis-3-elena',
    backgroundId: 'bedroom',
    dialog: [
      {
        speakerId: 'elena',
        text: 'Reporter called me asking if I knew about data issues in your division. I said I couldn\'t comment.',
        emotion: 'concerned',
      },
      {
        speakerId: 'elena',
        text: 'What\'s going on? Is there something I should know?',
        emotion: 'neutral',
      },
      {
        text: 'Her concern sounds genuine. Her timing feels calculated.',
        
      },
    ],
    nextSceneId: 'crisis-4',
  },

  // Scene 4: The Evidence
  {
    id: 'crisis-4',
    backgroundId: 'home-office',
    dialog: [
      {
        text: 'First rule of crisis: secure your evidence. Before it can be... managed.',
        
      },
      {
        text: 'Your email, your files, your records. The company controls all of it.',
      },
      {
        text: 'If they decide you\'re the sacrifice, evidence can disappear.',
      },
    ],
    choices: [
      {
        id: 'crisis-4-secure',
        text: 'Secure everything - forward emails, document timeline',
        nextSceneId: 'crisis-5-secured',
        feedback: 'OPTIMAL: Documentation is the only defense that survives.',
        xpBonus: 15,
      },
      {
        id: 'crisis-4-lawyer',
        text: 'Call personal counsel first',
        nextSceneId: 'crisis-5-counsel',
        feedback: 'Smart. Company lawyers serve the company, not you.',
        xpBonus: 12,
      },
      {
        id: 'crisis-4-team',
        text: 'Call Sarah - find out what actually happened',
        nextSceneId: 'crisis-5-sarah',
        feedback: 'Risk. She might already be compromised.',
        xpBonus: 5,
      },
      {
        id: 'crisis-4-office',
        text: 'Head to the office immediately',
        nextSceneId: 'crisis-5-office',
        feedback: 'No time to secure. You\'re flying blind.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 5: Evidence secured
  {
    id: 'crisis-5-secured',
    backgroundId: 'home-office',
    dialog: [
      {
        text: 'You forward key emails to your personal account. Screenshot the audit trail. Document the timeline.',
      },
      {
        text: 'The emails exist. Your team did modify some data. But the context matters.',
        
      },
      {
        text: 'You find one email that concerns you. A subordinate wrote: "Boss wants these numbers cleaner."',
      },
      {
        text: 'You didn\'t write it. But you didn\'t stop it either.',
      },
    ],
    nextSceneId: 'crisis-6',
  },

  // Scene 5: Personal counsel path
  {
    id: 'crisis-5-counsel',
    backgroundId: 'home-office',
    dialog: [
      {
        text: 'Your attorney answers on the second ring. "What happened?"',
      },
      {
        text: 'You explain. He\'s quiet for a moment.',
      },
      {
        text: '"First thing: secure your documentation. Forward emails to me directly. Don\'t trust company systems."',
      },
    ],
    nextSceneId: 'crisis-6',
  },

  // Scene 5: Called Sarah
  {
    id: 'crisis-5-sarah',
    backgroundId: 'home-office',
    dialog: [
      {
        speakerId: 'sarah',
        text: 'I don\'t know what to tell you. I followed the process we were given.',
        emotion: 'sad',
      },
      {
        speakerId: 'sarah',
        text: 'If there are problems, they didn\'t start with me.',
        emotion: 'neutral',
      },
      {
        text: 'She\'s scared. Scared people say things. To reporters. To investigators.',
        
      },
    ],
    nextSceneId: 'crisis-6',
  },

  // Scene 5: Went to office
  {
    id: 'crisis-5-office',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You arrive to controlled chaos. Legal has already set up in the conference room.',
      },
      {
        text: 'Victoria sees you. Her expression is unreadable.',
      },
      {
        text: '"We need to talk. Now."',
        speakerId: 'victoria',
      },
    ],
    nextSceneId: 'crisis-6',
  },

  // Scene 6: The Call to the Reporter
  {
    id: 'crisis-6',
    backgroundId: 'home-office',
    dialog: [
      {
        text: '70 minutes before the story runs. James Park calls again.',
      },
      {
        speakerId: 'james',
        text: 'I\'m giving you a chance to comment before we publish. Do you have a statement?',
        emotion: 'neutral',
      },
      {
        speakerId: 'james',
        text: 'Your statement will be included. Or I can note that you declined to comment.',
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'crisis-6-deny',
        text: '"These allegations are inaccurate. We stand behind our data processes."',
        nextSceneId: 'crisis-7',
        feedback: 'Simple denial. Sets your narrative.',
        xpBonus: 8,
      },
      {
        id: 'crisis-6-context',
        text: '"Any changes were documented corrections, not falsification. I can provide context."',
        nextSceneId: 'crisis-7',
        feedback: 'Engaging with details. Riskier but more control.',
        xpBonus: 12,
      },
      {
        id: 'crisis-6-delay',
        text: '"I need to understand the specifics. Can you push the story?"',
        nextSceneId: 'crisis-7',
        feedback: 'Worth trying. Won\'t work, but might buy minutes.',
        xpBonus: 3,
      },
      {
        id: 'crisis-6-nocomment',
        text: '"I decline to comment at this time."',
        nextSceneId: 'crisis-7',
        feedback: 'Safe for legal exposure. Terrible for narrative.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 7: The CEO Call
  {
    id: 'crisis-7',
    backgroundId: 'car',
    dialog: [
      {
        text: 'You\'re driving to the office. Victor Sterling - the CEO - calls.',
      },
      {
        speakerId: 'victor',
        text: 'What the hell is happening.',
        emotion: 'angry',
      },
      {
        text: 'Not a question.',
      },
      {
        speakerId: 'victor',
        text: 'I just got a call from Marcus Webb. The board chair. About YOUR division.',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'crisis-8',
  },

  // Scene 8: CEO demands answers
  {
    id: 'crisis-8',
    backgroundId: 'car',
    dialog: [
      {
        speakerId: 'victor',
        text: 'I need to know: are you the problem, or are you going to fix the problem?',
        emotion: 'cold',
      },
      {
        text: 'Victor\'s not asking if you\'re okay. He\'s asking how bad this is for HIM.',
        
      },
    ],
    choices: [
      {
        id: 'crisis-8-own',
        text: '"This happened on my watch. I\'m going to fix it and tell you how."',
        nextSceneId: 'crisis-9-own',
        feedback: 'OPTIMAL: Ownership with action. Exactly what CEOs want.',
        xpBonus: 15,
      },
      {
        id: 'crisis-8-distance',
        text: '"I just learned about this. I\'m investigating who\'s responsible."',
        nextSceneId: 'crisis-9-distance',
        feedback: 'Distance. Protects you but looks like blame-shifting.',
        xpBonus: 5,
      },
      {
        id: 'crisis-8-context',
        text: '"The story is misleading. The changes were documented corrections."',
        nextSceneId: 'crisis-9-context',
        feedback: 'Good context. But Victor wants accountability first.',
        xpBonus: 10,
      },
      {
        id: 'crisis-8-support',
        text: '"I need the company behind me on this. Are you?"',
        nextSceneId: 'crisis-9-support',
        feedback: 'Testing loyalty. Risky with a CEO who protects himself.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 9: CEO responses
  {
    id: 'crisis-9-own',
    backgroundId: 'car',
    dialog: [
      {
        speakerId: 'victor',
        text: 'Good. I need a full briefing in one hour. Have a plan.',
        emotion: 'neutral',
      },
      {
        text: 'He hangs up. That was the first test. You passed.',
        
      },
    ],
    nextSceneId: 'crisis-10',
  },
  {
    id: 'crisis-9-distance',
    backgroundId: 'car',
    dialog: [
      {
        speakerId: 'victor',
        text: 'You just learned about your own division\'s data? That\'s not reassuring.',
        emotion: 'cold',
      },
      {
        text: 'He doubts you already.',
        
      },
    ],
    nextSceneId: 'crisis-10',
  },
  {
    id: 'crisis-9-context',
    backgroundId: 'car',
    dialog: [
      {
        speakerId: 'victor',
        text: 'Context doesn\'t matter if the story runs first. What\'s our response?',
        emotion: 'neutral',
      },
      {
        text: 'He wants action, not explanation.',
        
      },
    ],
    nextSceneId: 'crisis-10',
  },
  {
    id: 'crisis-9-support',
    backgroundId: 'car',
    dialog: [
      {
        speakerId: 'victor',
        text: 'I\'ll support whoever isn\'t the problem. So... which is it?',
        emotion: 'cold',
      },
      {
        text: 'He didn\'t answer. That IS the answer.',
        
      },
    ],
    nextSceneId: 'crisis-10',
  },

  // Scene 10: Arrival at the office
  {
    id: 'crisis-10',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The office is already active. Legal in the conference room. PR in the war room.',
      },
      {
        text: '45 minutes until the story runs. The golden hour is almost over.',
      },
      {
        text: 'Phase one is done. Now the real fight begins.',
        
      },
    ],
    nextSceneId: 'crisis-11',
  },
];
