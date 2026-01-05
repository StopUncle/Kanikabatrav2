// Part 3: The Day - The layoffs happen

import type { Scene } from '../../../types';

export const dayScenes: Scene[] = [
  // Scene 13: The Morning
  {
    id: 'layoff-13-day',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Friday morning. Week 4. The day.',
      },
      {
        text: 'You know today is the day. The HR meetings are scheduled. The lists have been finalized.',
      },
      {
        text: 'You arrive at the office. Everything looks normal.',
      },
      {
        text: 'But it\'s not.',
        
      },
    ],
    nextSceneId: 'layoff-13b-day',
  },
  {
    id: 'layoff-13b-day',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Some people will get meeting invitations today. Those people won\'t be here on Monday.',
        
      },
      {
        text: 'You check your calendar. Nothing yet.',
      },
      {
        text: 'You check Slack. Active. Normal.',
      },
      {
        text: 'You wait.',
      },
    ],
    nextSceneId: 'layoff-14-wait',
  },

  // Scene 14: The Wait
  {
    id: 'layoff-14-wait',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Two hours pass. Then three.',
      },
      {
        text: 'You see colleagues get up from their desks. Walk to conference rooms. Some come back. Some don\'t.',
      },
      {
        text: 'Every hour that passes without a meeting invitation, your odds improve.',
        
      },
    ],
    nextSceneId: 'layoff-15-outcome',
  },

  // Scene 15: The Outcome Split
  {
    id: 'layoff-15-outcome',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Your phone buzzes. New calendar invitation.',
      },
      {
        text: 'Your heart stops.',
        
      },
      {
        text: 'You look at the screen.',
      },
      {
        text: 'This is the moment.',
        
      },
    ],
    choices: [
      {
        id: 'layoff-15-a',
        text: 'It\'s from Jordan (HR). Room 4. 15 minutes.',
        nextSceneId: 'layoff-cut-1',
        feedback: 'That\'s the meeting. You know what it means.',
        xpBonus: 0,
      },
      {
        id: 'layoff-15-b',
        text: 'It\'s a team sync from Chen. Regular work stuff.',
        nextSceneId: 'layoff-survive-1',
        feedback: 'Not the meeting. You might be okay.',
        xpBonus: 15,
      },
    ],
  },

  // === CUT PATH ===
  {
    id: 'layoff-cut-1',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You walk to Room 4. Jordan is there. A security person outside.',
      },
      {
        text: 'Please have a seat.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Jordan pushes papers across the table.',
      },
    ],
    nextSceneId: 'layoff-cut-2',
  },
  {
    id: 'layoff-cut-2',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I\'m sorry to inform you that your position has been eliminated as part of the organizational restructure.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'The words hit.',
        
      },
      {
        text: 'This isn\'t about your performance. It\'s a business decision affecting many people.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'layoff-cut-3',
  },
  {
    id: 'layoff-cut-3',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Cold comfort. You\'re still out.',
        
      },
      {
        text: 'Here\'s your severance package. Please let me know if you have questions.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'How you handle this moment matters.',
        
      },
    ],
    choices: [
      {
        id: 'layoff-cut-3-a',
        text: 'Graceful exit - "I understand. Thank you. I\'ll transition professionally."',
        nextSceneId: 'ending-graceful',
        feedback: 'OPTIMAL: Dignity intact. Reputation preserved.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'layoff-cut-3-b',
        text: 'Ask why - "Can you tell me why I was selected?"',
        nextSceneId: 'layoff-cut-4-why',
        feedback: 'Fair question. May or may not get an honest answer.',
        xpBonus: 10,
      },
      {
        id: 'layoff-cut-3-c',
        text: 'Negotiate - "Is there flexibility on the severance terms?"',
        nextSceneId: 'layoff-cut-4-negotiate',
        feedback: 'Worth trying. You might get more.',
        xpBonus: 10,
      },
      {
        id: 'layoff-cut-3-d',
        text: 'Express frustration - "This is ridiculous. I delivered more than anyone."',
        nextSceneId: 'ending-burned',
        feedback: 'TRAP: You just burned a bridge. They\'ll remember this.',
        xpBonus: 0,
      },
    ],
  },
  {
    id: 'layoff-cut-4-why',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Can you tell me why I was selected?',
      },
      {
        text: 'It was a combination of factors. Cost optimization across the department. I really can\'t go into specifics.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Translation: you were too expensive, or not protected enough, or both.',
        
      },
    ],
    nextSceneId: 'ending-lesson',
  },
  {
    id: 'layoff-cut-4-negotiate',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Is there flexibility on the severance terms?',
      },
      {
        text: 'Jordan pauses. Looks at the paperwork.',
        
      },
      {
        text: 'I can check with the team about extending your health coverage by one month. No promises.',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'It\'s something. You asked, they might give.',
        
      },
    ],
    nextSceneId: 'ending-graceful',
  },

  // === SURVIVED PATH ===
  {
    id: 'layoff-survive-1',
    backgroundId: 'office',
    dialog: [
      {
        text: '5 PM. The meetings have stopped. Your calendar stayed clear.',
      },
      {
        text: 'You made it.',
        
      },
      {
        text: 'You look around. Desks are empty. People are gone.',
      },
    ],
    nextSceneId: 'layoff-survive-2',
  },
  {
    id: 'layoff-survive-2',
    backgroundId: 'office',
    dialog: [
      {
        text: 'It\'s over. I think.',
        speakerId: 'colleague',
        emotion: 'concerned',
      },
      {
        text: 'You survived. Some of your colleagues didn\'t.',
        
      },
    ],
    nextSceneId: 'layoff-survive-3',
  },
  {
    id: 'layoff-survive-3',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The next week. The office is quieter. Relief mixed with guilt.',
      },
      {
        text: 'You walk past empty desks. Alex is gone. Others too.',
      },
      {
        text: 'People you worked with. People you liked.',
        
      },
    ],
    nextSceneId: 'layoff-survive-4',
  },
  {
    id: 'layoff-survive-4',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'We need to talk about redistributing work. There\'s more to do with fewer people.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Survival has a price. More work. Fewer resources. And the knowledge that you might be next time.',
        
      },
    ],
    nextSceneId: 'layoff-survive-5',
  },
  {
    id: 'layoff-survive-5',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Chen pulls you aside after the meeting.',
      },
      {
        text: 'I want you to know—your name came up. Marcus took it off the list.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Your positioning worked. Someone said your name in a room.',
        
      },
    ],
    choices: [
      {
        id: 'layoff-survive-5-a',
        text: '"What did Marcus say about me?"',
        nextSceneId: 'ending-protected',
        feedback: 'The sponsor made the difference.',
        xpBonus: 12,
      },
      {
        id: 'layoff-survive-5-b',
        text: '"Is there opportunity now? With the restructure?"',
        nextSceneId: 'ending-promoted',
        feedback: 'Thinking ahead. Layoffs create vacuums.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'layoff-survive-5-c',
        text: '"I\'m just glad I\'m still here."',
        nextSceneId: 'ending-survivor',
        feedback: 'Relief. But don\'t forget to capitalize.',
        xpBonus: 8,
      },
    ],
  },
];
