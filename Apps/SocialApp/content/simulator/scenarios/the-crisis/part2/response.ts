// Part 2: The Initial Response - First four hours, narrative is set

import type { Scene } from '../../../types';

export const responseScenes: Scene[] = [
  // Scene 11: The Legal Briefing
  {
    id: 'crisis-11',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'Victoria Chen with the company counsel team.',
      },
      {
        speakerId: 'victoria',
        text: 'Let me be clear about my role. I represent the company. Not you personally.',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'crisis-12',
  },
  {
    id: 'crisis-12',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'She slides a document across the table.',
      },
      {
        speakerId: 'victoria',
        text: 'This is a document preservation notice. You cannot delete, alter, or move any files. Do you understand?',
        emotion: 'neutral',
      },
      {
        speakerId: 'victoria',
        text: 'We\'re preparing a company statement. Your personal statement, if any, should be coordinated with us.',
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'crisis-12-secured',
        text: '"I\'ve already secured my records for the investigation."',
        nextSceneId: 'crisis-13',
        feedback: 'Truth, if you did. Power position.',
        xpBonus: 12,
      },
      {
        id: 'crisis-12-cooperate',
        text: '"Understood. I want the company protected."',
        nextSceneId: 'crisis-13',
        feedback: 'Signals cooperation. Buys goodwill.',
        xpBonus: 8,
      },
      {
        id: 'crisis-12-counsel',
        text: '"I\'ll want my own counsel to review anything before I sign."',
        nextSceneId: 'crisis-13',
        feedback: 'Smart but seen as uncooperative.',
        xpBonus: 5,
      },
      {
        id: 'crisis-12-intel',
        text: '"Who else have you spoken to about this?"',
        nextSceneId: 'crisis-13',
        feedback: 'Gathering intel. Always valuable.',
        xpBonus: 10,
      },
    ],
  },

  // Scene 13: The Enemy Emerges
  {
    id: 'crisis-13',
    backgroundId: 'hallway',
    dialog: [
      {
        text: 'Elena Rodriguez intercepts you in the hallway.',
      },
      {
        speakerId: 'elena',
        text: 'This is terrible. How can I help?',
        emotion: 'concerned',
      },
      {
        text: 'Her face says concern. Her eyes say something else.',
        
      },
    ],
    nextSceneId: 'crisis-14',
  },
  {
    id: 'crisis-14',
    backgroundId: 'hallway',
    dialog: [
      {
        speakerId: 'elena',
        text: 'I\'ve already briefed the board on continuity. Just in case they need to understand how operations could continue without disruption.',
        emotion: 'neutral',
      },
      {
        text: 'She\'s moving. While you\'re defending, she\'s positioning.',
        
      },
      {
        speakerId: 'elena',
        text: 'I told them you have my full support, of course.',
        emotion: 'seductive',
      },
    ],
    choices: [
      {
        id: 'crisis-14-confront',
        text: '"Let me be clear: I know what you\'re doing."',
        nextSceneId: 'crisis-15-confront',
        feedback: 'Direct. Creates an enemy, but she already was one.',
        xpBonus: 8,
      },
      {
        id: 'crisis-14-note',
        text: '"Thanks, Elena. I\'ll remember your support."',
        nextSceneId: 'crisis-15-note',
        feedback: 'Strategic acknowledgment. Notes the threat.',
        xpBonus: 12,
      },
      {
        id: 'crisis-14-redirect',
        text: '"The focus should be on facts, not organizational charts."',
        nextSceneId: 'crisis-15-redirect',
        feedback: 'Redirect. Keeps you above the politics.',
        xpBonus: 10,
      },
      {
        id: 'crisis-14-ignore',
        text: '"I have to prepare for the board."',
        nextSceneId: 'crisis-15-ignore',
        feedback: 'Dismissive. She\'ll continue maneuvering.',
        xpBonus: 3,
      },
    ],
  },

  // Scene 15: Elena responses
  {
    id: 'crisis-15-confront',
    backgroundId: 'hallway',
    dialog: [
      {
        speakerId: 'elena',
        text: 'I don\'t know what you mean. I\'m just trying to help the company.',
        emotion: 'cold',
      },
      {
        text: 'Her mask didn\'t slip. But she knows you see her.',
        
      },
    ],
    nextSceneId: 'crisis-16',
  },
  {
    id: 'crisis-15-note',
    backgroundId: 'hallway',
    dialog: [
      {
        text: 'She pauses. Your tone registered.',
      },
      {
        speakerId: 'elena',
        text: 'Of course. We\'re all on the same team.',
        emotion: 'neutral',
      },
      {
        text: 'She\'ll be more careful now. But she won\'t stop.',
        
      },
    ],
    nextSceneId: 'crisis-16',
  },
  {
    id: 'crisis-15-redirect',
    backgroundId: 'hallway',
    dialog: [
      {
        speakerId: 'elena',
        text: 'Absolutely. Facts first.',
        emotion: 'neutral',
      },
      {
        text: 'She nods and walks away. Already planning her next move.',
        
      },
    ],
    nextSceneId: 'crisis-16',
  },
  {
    id: 'crisis-15-ignore',
    backgroundId: 'hallway',
    dialog: [
      {
        speakerId: 'elena',
        text: 'Of course. Good luck in there.',
        emotion: 'smirking',
      },
      {
        text: 'You gave her an opening. She\'ll use it.',
        
      },
    ],
    nextSceneId: 'crisis-16',
  },

  // Scene 16: The Subordinate
  {
    id: 'crisis-16',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Sarah Chen is waiting outside your office. She\'s named in the emails.',
      },
      {
        speakerId: 'sarah',
        text: 'I did what I was told to do. I have the documentation.',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'crisis-17',
  },
  {
    id: 'crisis-17',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'sarah',
        text: 'I followed the process we\'ve always followed. If that process is wrong, it\'s not MY fault.',
        emotion: 'neutral',
      },
      {
        text: 'She has emails. You\'re in some of them. She can help you or hurt you.',
        
      },
      {
        speakerId: 'sarah',
        text: 'What should I tell the investigators?',
        emotion: 'sad',
      },
    ],
    choices: [
      {
        id: 'crisis-17-honest',
        text: '"Tell the truth. Exactly what happened. That\'s what I\'m doing."',
        nextSceneId: 'crisis-18-honest',
        feedback: 'OPTIMAL: Integrity. And aligned stories without coordination.',
        xpBonus: 15,
      },
      {
        id: 'crisis-17-align',
        text: '"Let\'s review what happened together so we\'re consistent."',
        nextSceneId: 'crisis-18-align',
        feedback: 'Risky. Could look like coordination. Could be.',
        xpBonus: 5,
      },
      {
        id: 'crisis-17-distance',
        text: '"I can\'t advise you. You should speak to your own counsel."',
        nextSceneId: 'crisis-18-distance',
        feedback: 'Protects you. Leaves her exposed and potentially hostile.',
        xpBonus: 8,
      },
      {
        id: 'crisis-17-threat',
        text: '"Remember who approved your last two promotions."',
        nextSceneId: 'crisis-18-threat',
        feedback: 'TRAP: Intimidation. This will come back to destroy you.',
        xpBonus: -10,
      },
    ],
  },

  // Scene 18: Sarah responses
  {
    id: 'crisis-18-honest',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'sarah',
        text: 'Okay. The truth. I can do that.',
        emotion: 'neutral',
      },
      {
        text: 'She looks relieved. Scared people who feel supported are less likely to turn on you.',
        
      },
    ],
    nextSceneId: 'crisis-19',
  },
  {
    id: 'crisis-18-align',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'sarah',
        text: 'Yes. We should make sure we\'re... consistent.',
        emotion: 'confused',
      },
      {
        text: 'You just created a paper trail of coordination. Hope it doesn\'t surface.',
        
      },
    ],
    nextSceneId: 'crisis-19',
  },
  {
    id: 'crisis-18-distance',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'sarah',
        text: 'Right. I\'m on my own.',
        emotion: 'sad',
      },
      {
        text: 'Her expression hardens. You just made her a free agent.',
        
      },
    ],
    nextSceneId: 'crisis-19',
  },
  {
    id: 'crisis-18-threat',
    backgroundId: 'office',
    dialog: [
      {
        speakerId: 'sarah',
        text: '...',
        emotion: 'cold',
      },
      {
        text: 'She walks out without another word. You just created an enemy with evidence.',
        
      },
    ],
    nextSceneId: 'crisis-19',
  },

  // Scene 19: The Board Call
  {
    id: 'crisis-19',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'Marcus Webb appears on the video call. Board Chair. The story ran an hour ago.',
      },
      {
        speakerId: 'marcus',
        text: 'The company\'s reputation is on the line. Someone is accountable.',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'crisis-20',
  },
  {
    id: 'crisis-20',
    backgroundId: 'conference-room',
    dialog: [
      {
        speakerId: 'marcus',
        text: 'I\'m not interested in corporate speak. What happened, and who\'s responsible?',
        emotion: 'cold',
      },
      {
        text: 'The board doesn\'t want context. They want a name.',
        
      },
      {
        speakerId: 'victor',
        text: 'We\'re still investigating—',
        emotion: 'neutral',
      },
      {
        speakerId: 'marcus',
        text: 'Victor. I\'m asking them directly.',
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'crisis-20-own',
        text: '"It happened in my division. I\'m responsible for fixing it and for process failures."',
        nextSceneId: 'crisis-21-own',
        feedback: 'OPTIMAL: Ownership without confession. Leadership.',
        xpBonus: 15,
      },
      {
        id: 'crisis-20-facts',
        text: '"The full picture is more complex than the article suggests. Let me explain."',
        nextSceneId: 'crisis-21-facts',
        feedback: 'Good context. But they want accountability first.',
        xpBonus: 10,
      },
      {
        id: 'crisis-20-name',
        text: '"Sarah Chen made the specific decisions. I was not informed."',
        nextSceneId: 'crisis-21-name',
        feedback: 'TRAP: You just threw someone under the bus. Everyone saw.',
        xpBonus: -5,
      },
      {
        id: 'crisis-20-expose',
        text: '"I\'m concerned about who leaked this and why. Elena briefed you before I could."',
        nextSceneId: 'crisis-21-expose',
        feedback: 'Risky redirect. Could backfire spectacularly.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 21: Board responses
  {
    id: 'crisis-21-own',
    backgroundId: 'conference-room',
    dialog: [
      {
        speakerId: 'marcus',
        text: 'That\'s what I wanted to hear. A plan, not excuses.',
        emotion: 'neutral',
      },
      {
        text: 'You bought yourself time. Maybe credibility.',
        
      },
    ],
    nextSceneId: 'crisis-22',
  },
  {
    id: 'crisis-21-facts',
    backgroundId: 'conference-room',
    dialog: [
      {
        speakerId: 'marcus',
        text: 'I said I didn\'t want corporate speak. Try again.',
        emotion: 'cold',
      },
      {
        text: 'He\'s not interested in complexity. Just culpability.',
        
      },
    ],
    nextSceneId: 'crisis-22',
  },
  {
    id: 'crisis-21-name',
    backgroundId: 'conference-room',
    dialog: [
      {
        text: 'Victor\'s expression shifts. He saw what you just did.',
      },
      {
        speakerId: 'marcus',
        text: 'And you, as their manager, knew nothing?',
        emotion: 'cold',
      },
      {
        text: 'You didn\'t protect yourself. You just looked weak AND disloyal.',
        
      },
    ],
    nextSceneId: 'crisis-22',
  },
  {
    id: 'crisis-21-expose',
    backgroundId: 'conference-room',
    dialog: [
      {
        speakerId: 'elena',
        text: 'I briefed the board on operational continuity. That\'s my job.',
        emotion: 'cold',
      },
      {
        speakerId: 'marcus',
        text: 'Let\'s stay focused on the facts, not the politics.',
        emotion: 'cold',
      },
      {
        text: 'He shut you down. But he also noticed the dynamic.',
        
      },
    ],
    nextSceneId: 'crisis-22',
  },

  // Scene 22: End of Day One
  {
    id: 'crisis-22',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The board call ends. Day one is almost over.',
      },
      {
        text: 'The story is out. The narrative is forming. Tomorrow, the investigation begins.',
      },
      {
        text: 'The first battle is over. The war just started.',
        
      },
    ],
    nextSceneId: 'crisis-23',
  },
];
