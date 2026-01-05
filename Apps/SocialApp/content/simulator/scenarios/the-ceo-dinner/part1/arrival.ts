// Part 1: The Arrival - Entering the room, first impressions

import type { Scene } from '../../../types';

export const arrivalScenes: Scene[] = [
  // Scene 1: The Briefing
  {
    id: 'dinner-1',
    backgroundId: 'lobby',
    dialog: [
      {
        text: 'Victor pulls you aside before entering.',
      },
      {
        text: 'A few things before we go in.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-1b',
  },
  {
    id: 'dinner-1b',
    backgroundId: 'lobby',
    dialog: [
      {
        text: 'Alexandra Chen is considering a partnership. I\'ve been telling her about your work. Make that investment worthwhile.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'Marcus Webb is quiet. If he engages you, that\'s meaningful. Don\'t squander it.',
        speakerId: 'victor',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dinner-1c',
  },
  {
    id: 'dinner-1c',
    backgroundId: 'lobby',
    dialog: [
      {
        text: 'And remember—you\'re here because I invited you. That reflects on both of us.',
        speakerId: 'victor',
        emotion: 'cold',
      },
      {
        text: 'No pressure. Just your career riding on four hours of dinner.',
        
      },
    ],
    nextSceneId: 'dinner-2',
  },

  // Scene 2: The Room
  {
    id: 'dinner-2',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You enter. 12 people, four conversations in progress.',
      },
      {
        text: 'The room is smaller than you expected. More intimate. Everyone here runs something. Except you.',
      },
    ],
    nextSceneId: 'dinner-2b',
  },
  {
    id: 'dinner-2b',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You\'re the most junior person by a decade. Everyone is noting your presence. Some are wondering why you\'re here.',
        
      },
      {
        text: 'Everyone, this is our rising star. I\'ve been telling you about them.',
        speakerId: 'victor',
        emotion: 'happy',
      },
      {
        text: 'Eleven faces turn.',
      },
      {
        text: 'First impression time.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-2-a',
        text: 'Confident warmth: Smile, make eye contact. "It\'s an honor to be here."',
        nextSceneId: 'dinner-3-confident',
        feedback: 'SOLID: Warm without overdoing it.',
        xpBonus: 15,
      },
      {
        id: 'dinner-2-b',
        text: 'Strategic humility: "I\'m looking forward to learning from this group."',
        nextSceneId: 'dinner-3-humble',
        feedback: 'GOOD: Positions you as listener first.',
        xpBonus: 12,
      },
      {
        id: 'dinner-2-c',
        text: 'Memorable line: "Victor has been generous with his introductions—now I have to earn them."',
        nextSceneId: 'dinner-3-bold',
        feedback: 'OPTIMAL: Confident, aware, memorable.',
        xpBonus: 20,
        isOptimal: true,
      },
      {
        id: 'dinner-2-d',
        text: 'Quiet confidence: Nod, smile, let them come to you.',
        nextSceneId: 'dinner-3-quiet',
        feedback: 'RISKY: Power move or passivity? Hard to tell.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 3: First Impression Aftermath
  {
    id: 'dinner-3-confident',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Polite nods around the room. You\'ve set a professional tone.',
      },
      {
        text: 'Safe landing. Now prove you deserve to be here.',
        
      },
    ],
    nextSceneId: 'dinner-4',
  },
  {
    id: 'dinner-3-humble',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'A few approving looks. Humility plays well with this crowd.',
      },
      {
        text: 'They\'ll expect you to listen more than speak. Is that what you want?',
        
      },
    ],
    nextSceneId: 'dinner-4',
  },
  {
    id: 'dinner-3-bold',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Marcus raises an eyebrow. Victoria smiles slightly. Alexandra looks interested.',
      },
      {
        text: 'You got their attention. Now keep it.',
        
      },
    ],
    nextSceneId: 'dinner-4',
  },
  {
    id: 'dinner-3-quiet',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'The room moves on. Conversations resume.',
      },
      {
        text: 'You\'re watching. But are you being watched? That\'s the question.',
        
      },
    ],
    nextSceneId: 'dinner-4',
  },

  // Scene 4: Victoria Approaches
  {
    id: 'dinner-4',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Victoria Blackwell approaches. The power broker.',
      },
      {
        text: 'So you\'re the one Victor won\'t stop talking about. I had to see for myself.',
        speakerId: 'victoria',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'dinner-4b',
  },
  {
    id: 'dinner-4b',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Tell me something interesting about yourself. Not your resume—everyone here has a resume.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'She\'s testing. What makes you memorable beyond credentials?',
        
      },
    ],
    choices: [
      {
        id: 'dinner-4-a',
        text: 'Unexpected origin: Share something authentic about your journey',
        nextSceneId: 'dinner-5-skeptic',
        feedback: 'OPTIMAL: Authenticity is rare at this level.',
        xpBonus: 18,
        isOptimal: true,
      },
      {
        id: 'dinner-4-b',
        text: 'Sharp observation: "What\'s interesting is how everyone here is positioned relative to the bar."',
        nextSceneId: 'dinner-5-skeptic',
        feedback: 'BOLD: Shows awareness. Risky.',
        xpBonus: 12,
      },
      {
        id: 'dinner-4-c',
        text: 'Redirect: "I\'d rather hear your story. I suspect it\'s more interesting."',
        nextSceneId: 'dinner-5-skeptic',
        feedback: 'SMOOTH: She\'ll appreciate the attention.',
        xpBonus: 14,
      },
      {
        id: 'dinner-4-d',
        text: 'Professional hook: "I\'m solving a problem that affects everyone in this room."',
        nextSceneId: 'dinner-5-skeptic',
        feedback: 'INTRIGUING: Now you have to deliver.',
        xpBonus: 15,
      },
    ],
  },

  // Scene 5: The Skeptic
  {
    id: 'dinner-5-skeptic',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Alexandra Chen intercepts you.',
      },
      {
        text: 'Victor\'s protege.',
        speakerId: 'alexandra',
        emotion: 'cold',
      },
      {
        text: 'She doesn\'t make it sound like a compliment.',
        
      },
    ],
    nextSceneId: 'dinner-5b-skeptic',
  },
  {
    id: 'dinner-5b-skeptic',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'He says you understand our industry. That\'s a bold claim. Most people in suits don\'t understand our industry.',
        speakerId: 'alexandra',
        emotion: 'neutral',
      },
      {
        text: 'Convince me.',
        speakerId: 'alexandra',
        emotion: 'cold',
      },
      {
        text: 'She\'s hostile. Or testing. Either way, you need to deliver.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-5-a',
        text: 'Go deep: Demonstrate genuine, specific knowledge of her industry',
        nextSceneId: 'dinner-6-table',
        feedback: 'OPTIMAL: You showed you\'re not just a suit.',
        xpBonus: 22,
        isOptimal: true,
      },
      {
        id: 'dinner-5-b',
        text: 'Acknowledge limits: "I understand the parts that touch my work. I\'m here to learn the rest."',
        nextSceneId: 'dinner-6-table',
        feedback: 'HONEST: Authenticity over pretense.',
        xpBonus: 15,
      },
      {
        id: 'dinner-5-c',
        text: 'Flip it: "What would convince you? I\'d rather answer your real question."',
        nextSceneId: 'dinner-6-table',
        feedback: 'STRATEGIC: You\'re making her reveal her criteria.',
        xpBonus: 16,
      },
      {
        id: 'dinner-5-d',
        text: 'Confident defer: "Victor doesn\'t overstate. You\'ll see why during dinner."',
        nextSceneId: 'dinner-6-table',
        feedback: 'BOLD: Defers proof but projects confidence.',
        xpBonus: 12,
      },
    ],
  },
];
