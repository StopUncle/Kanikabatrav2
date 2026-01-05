// Part 3: The Day - The layoffs happen. Who survives?

import type { Scene } from '../../../types';

export const outcomeScenes: Scene[] = [
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
        text: 'You arrive at the office. Everything looks normal. But it\'s not.',
        
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'layoff-13b-waiting',
  },

  {
    id: 'layoff-13b-waiting',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Some people will get meeting invitations today. Those people won\'t be here on Monday.',
      },
      {
        text: 'You check your calendar. Nothing yet. You check Slack. Active. Normal.',
      },
      {
        text: 'The next few hours will determine your future.',
        
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'layoff-14-outcome',
  },

  // Scene 14: The Outcome Split
  {
    id: 'layoff-14-outcome',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Two hours pass. Then three. Colleagues start disappearing. Quiet conversations. Boxes being packed.',
      },
      {
        text: 'Your calendar stays empty. Or does it?',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'layoff-14-a',
        text: 'Calendar notification appears: "Meeting with Jordan (HR) - 15 minutes"',
        nextSceneId: 'layoff-15-cut',
        xpBonus: 0,
        feedback: 'That\'s the meeting. You know what it means.',
      },
      {
        id: 'layoff-14-b',
        text: 'No meeting. The hours pass. By 5 PM, it\'s over.',
        nextSceneId: 'layoff-15-survived',
        xpBonus: 15,
        feedback: 'Every hour that passed, your odds improved. You made it.',
      },
    ],
  },

  // ============ CUT PATH ============

  {
    id: 'layoff-15-cut',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You walk to Room 4. Jordan is there. A security person outside.',
      },
      {
        text: '"Please have a seat."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'layoff-15b-cut',
  },

  {
    id: 'layoff-15b-cut',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Jordan pushes papers across the table.',
      },
      {
        text: '"I\'m sorry to inform you that your position has been eliminated as part of the organizational restructure."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'The words hit. You knew it was possible. But knowing doesn\'t soften it.',
        
        emotion: 'sad',
      },
    ],
    nextSceneId: 'layoff-15c-cut',
  },

  {
    id: 'layoff-15c-cut',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: '"This isn\'t about your performance. It\'s a business decision affecting many people."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Cold comfort. You\'re still out.',
        
        emotion: 'neutral',
      },
      {
        text: '"Here\'s your severance package. Please let me know if you have questions."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'How you handle this moment matters.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'layoff-15c-a',
        text: '"I understand. Thank you for the severance. I\'ll transition professionally."',
        nextSceneId: 'ending-graceful',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'OPTIMAL: Dignity in defeat. This will be remembered well.',
      },
      {
        id: 'layoff-15c-b',
        text: '"Can you tell me why I was selected?"',
        nextSceneId: 'layoff-16-ask-why',
        xpBonus: 8,
        feedback: 'Fair question. You might get an answer. Might not.',
      },
      {
        id: 'layoff-15c-c',
        text: '"Is there flexibility on the severance terms?"',
        nextSceneId: 'layoff-16-negotiate',
        xpBonus: 10,
        feedback: 'Worth asking. They can always say no.',
      },
      {
        id: 'layoff-15c-d',
        text: '"This is ridiculous. I delivered more than anyone."',
        nextSceneId: 'ending-burned',
        xpBonus: 0,
        feedback: 'TRAP: You just guaranteed a bad reference.',
      },
    ],
  },

  // Ask Why Path
  {
    id: 'layoff-16-ask-why',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: '"I can\'t comment on specific criteria. I can only say it was a difficult decision affecting many roles."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'HR speak. They won\'t tell you. Maybe they can\'t.',
        
        emotion: 'neutral',
      },
      {
        text: 'You nod. Pack your things. Walk out with your head high.',
      },
    ],
    nextSceneId: 'ending-lesson',
  },

  // Negotiate Path
  {
    id: 'layoff-16-negotiate',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Jordan pauses. Checks a document.',
      },
      {
        text: '"I can add two weeks to the severance. Given your tenure."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Small win. But a win.',
        
        emotion: 'neutral',
      },
      {
        text: 'You sign the papers. Professional to the end.',
      },
    ],
    nextSceneId: 'ending-graceful',
  },

  // ============ SURVIVED PATH ============

  {
    id: 'layoff-15-survived',
    backgroundId: 'office',
    dialog: [
      {
        text: '5 PM. The meetings have stopped. Your calendar stayed clear.',
      },
      {
        text: 'You made it.',
        
        emotion: 'happy',
      },
    ],
    nextSceneId: 'layoff-15b-survived',
  },

  {
    id: 'layoff-15b-survived',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You look around. Desks are empty. People are gone. Alex is gone.',
      },
      {
        text: '"It\'s over. I think."',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'You survived. Some of your colleagues didn\'t.',
        
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'layoff-16-aftermath',
  },

  // Scene 16: Survivor Aftermath
  {
    id: 'layoff-16-aftermath',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The next Monday. The office is quieter. The energy is strange—relief mixed with guilt.',
      },
      {
        text: 'You walk past empty desks. People you worked with. People you liked.',
      },
      {
        text: '"We need to talk about redistributing work. There\'s more to do with fewer people."',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'Survival has a price. More work. Fewer resources. And the knowledge that you might be next time.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'layoff-16-a',
        text: 'Find out what saved you—talk to Chen or Priya',
        nextSceneId: 'layoff-17-learn',
        isOptimal: true,
        xpBonus: 12,
        feedback: 'OPTIMAL: Learn why you survived. Use it next time.',
      },
      {
        id: 'layoff-16-b',
        text: 'Keep your head down—get back to work',
        nextSceneId: 'ending-survivor',
        xpBonus: 8,
        feedback: 'Safe. But don\'t miss the lesson.',
      },
      {
        id: 'layoff-16-c',
        text: 'Look for opportunity—what\'s opened up?',
        nextSceneId: 'layoff-17-opportunity',
        xpBonus: 10,
        feedback: 'Strategic. Layoffs create vacuums.',
      },
    ],
  },

  // Scene 17: Learn What Saved You
  {
    id: 'layoff-17-learn',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'Coffee with Priya. Post-mortem.',
      },
      {
        text: '"What happened? Why did I make it?"',
      },
      {
        text: '"Marcus took your name off the list. Said you were critical for Q1."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'The visibility campaign worked. He knew your name. He knew your value.',
        
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-protected',
  },

  // Scene 17: Look for Opportunity
  {
    id: 'layoff-17-opportunity',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You notice: there\'s a director position open. The previous holder was cut.',
      },
      {
        text: 'Layoffs create vacuums. Vacuums create opportunities.',
        
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'layoff-17b-opportunity',
  },

  {
    id: 'layoff-17b-opportunity',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You request time with Marcus.',
      },
      {
        text: '"I\'d like to discuss the open director role. I think I can step up."',
      },
      {
        text: '"You impressed me during the downsizing. You handled the pressure well."',
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: '"Let\'s talk."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-promoted',
  },
];
