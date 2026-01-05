// Part 4: The Final Boss
// Scenes 13-17: Diana and salary negotiation

import type { Scene } from '../../../types';

export const finalBossScenes: Scene[] = [
  // Scene 13: Diana Enters
  {
    id: 'interview-13',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The door opens. {director_name} enters. Power suit. Poker face.',
      },
      {
        text: 'She doesn\'t offer a handshake. She sits.',
      },
      {
        text: '"I\'ve heard good things from {hr_name} and {manager_name}. I have a few questions of my own."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'The final boss. Gives nothing away. You can\'t read her. So don\'t try.',
        
        emotion: 'concerned',
      },
      {
        text: '"Where do you see yourself in five years?"',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'The real question: Are you ambitious enough to be useful? Too ambitious to be safe?',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-13-a',
        text: '"Leading a team here, driving the kind of results that get me in rooms like this one."',
        nextSceneId: 'interview-14',
        feedback: 'OPTIMAL: Ambitious but loyal. Perfect calibration.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-13-b',
        text: '"Growing with a company where I can make impact. More focused on work than title."',
        nextSceneId: 'interview-14',
        feedback: 'Safe. A little vague, but she didn\'t dislike it.',
        xpBonus: 8,
      },
      {
        id: 'interview-13-c',
        text: '"Honestly? I\'d love to be doing what you\'re doing. How did you get here?"',
        nextSceneId: 'interview-14',
        feedback: 'Dark arts flattery flip. She thawed slightly. It worked.',
        xpBonus: 12,
      },
      {
        id: 'interview-13-d',
        text: '"Running my own division. Maybe VP within three years."',
        nextSceneId: 'interview-14',
        feedback: 'Too aggressive. Her jaw tightened almost imperceptibly.',
        xpBonus: 3,
      },
    ],
  },

  // Scene 14: Your Questions
  {
    id: 'interview-14',
    backgroundId: 'office',
    dialog: [
      {
        text: '{director_name} checks something on her phone. Looks up.',
      },
      {
        text: '"What questions do you have for us?"',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'This is not optional. "No questions" = you\'re out.',
        
        emotion: 'concerned',
      },
      {
        text: 'The questions you ask reveal what you value.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-14-a',
        text: '"What\'s the biggest challenge facing this team right now?"',
        nextSceneId: 'interview-15',
        feedback: 'OPTIMAL: Shows you\'re thinking about how to help. She engaged.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-14-b',
        text: '"Where do you see this role evolving in the next two years?"',
        nextSceneId: 'interview-15',
        feedback: 'Forward-thinking. She appreciated the strategic mindset.',
        xpBonus: 12,
      },
      {
        id: 'interview-14-c',
        text: '"What do you wish you\'d known before joining?"',
        nextSceneId: 'interview-15',
        feedback: 'Humanized the conversation. First hint of warmth from her.',
        xpBonus: 10,
      },
      {
        id: 'interview-14-d',
        text: '"What\'s the bonus structure like?"',
        nextSceneId: 'interview-15',
        feedback: 'Her face hardened slightly. Wrong moment for money talk.',
        xpBonus: 3,
      },
    ],
  },

  // Scene 15: The Salary Negotiation
  {
    id: 'interview-15',
    backgroundId: 'office',
    dialog: [
      {
        text: '{director_name} closes her folder. Looks at you directly.',
      },
      {
        text: '"We\'re prepared to make you an offer. The base would be $85K, plus standard benefits and 10% bonus potential."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'They went low. Of course they did.',
        
        emotion: 'concerned',
      },
      {
        text: 'Now the game begins. They made an offer—that means they want you. Use it.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-15-a',
        text: '"I appreciate that. To make this work, I\'d need $105K." Then silence.',
        nextSceneId: 'interview-16-high',
        feedback: 'OPTIMAL: Counter high + silence. The most powerful negotiation tool.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-15-b',
        text: '"I\'m weighing another offer at $100K. I\'d prefer to work here, but numbers need to align."',
        nextSceneId: 'interview-16-competing',
        feedback: 'Competing offer play. Risky, but effective if credible.',
        xpBonus: 12,
      },
      {
        id: 'interview-15-c',
        text: '"The base is close. Can we discuss sign-on bonus and additional PTO?"',
        nextSceneId: 'interview-16-creative',
        feedback: 'Creative negotiation. Shows sophistication beyond just salary.',
        xpBonus: 10,
      },
      {
        id: 'interview-15-d',
        text: '"That sounds great. When do I start?"',
        nextSceneId: 'ending-lowball-accept',
        feedback: 'TRAP: You just left $20K on the table. They expected you to negotiate.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 16a: High Counter Response
  {
    id: 'interview-16-high',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Silence. {director_name}\'s expression doesn\'t change.',
      },
      {
        text: 'Five seconds. Ten. The silence stretches.',
      },
      {
        text: 'Don\'t fill it. The first person to speak after a number loses.',
      },
      {
        text: '"That\'s higher than our initial range."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'She pauses. Checks her notes.',
      },
      {
        text: '"I can do $95K. That\'s as high as I can go without additional approvals."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: '$10K more than their opening. Silence worked.',
      },
    ],
    nextSceneId: 'interview-17',
  },

  // Scene 16b: Competing Offer Response
  {
    id: 'interview-16-competing',
    backgroundId: 'office',
    dialog: [
      {
        text: '{director_name}\'s expression shifts almost imperceptibly. Interest.',
      },
      {
        text: '"Another offer. That\'s... good to know."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'She types something on her phone.',
      },
      {
        text: '"Give me a moment."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'A minute passes. Then:',
      },
      {
        text: '"We can do $98K. And we\'ll add a sign-on bonus to help with the transition."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'The competing offer worked. They found the budget.',
      },
    ],
    nextSceneId: 'interview-17',
  },

  // Scene 16c: Creative Negotiation Response
  {
    id: 'interview-16-creative',
    backgroundId: 'office',
    dialog: [
      {
        text: '{director_name} nods slowly. A hint of approval.',
      },
      {
        text: '"I like how you think. Base salary is somewhat fixed, but..."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'She pauses, calculating.',
      },
      {
        text: '"I can do $88K base, plus a $10K sign-on, plus an extra week of PTO."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'Compensation isn\'t just salary. You negotiated the whole picture.',
      },
    ],
    nextSceneId: 'interview-17',
  },

  // Scene 17: The Close
  {
    id: 'interview-17',
    backgroundId: 'office',
    dialog: [
      {
        text: '{director_name} stands. The interview is ending.',
      },
      {
        text: '"I\'ll have HR send the formal offer by end of day. We\'d like an answer within the week."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'She extends her hand. First time she\'s offered it.',
      },
      {
        text: 'Last impression. Make it count.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'interview-17-a',
        text: 'Firm handshake. "I\'m looking forward to it." Hold eye contact. Walk out without looking back.',
        nextSceneId: 'ending-full-win',
        feedback: 'OPTIMAL: Confident close. You left them wanting more.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'interview-17-b',
        text: '"Thank you for your time. I really enjoyed learning about the team."',
        nextSceneId: 'ending-strong-offer',
        feedback: 'Warm close. Professional. Left on good terms.',
        xpBonus: 10,
      },
      {
        id: 'interview-17-c',
        text: '"I really hope to hear from you. This is my first choice."',
        nextSceneId: 'ending-waitlist',
        feedback: 'Showed too much want. You gave away power at the finish line.',
        xpBonus: 5,
      },
      {
        id: 'interview-17-d',
        text: '"I hope you make the right decision." Smile. Walk out.',
        nextSceneId: 'ending-full-win',
        feedback: 'Ballsy. Could go either way. But with a strong interview, it landed.',
        xpBonus: 12,
      },
    ],
  },
];
