// Part 2: The Dinner - Seated conversation, strategic positioning

import type { Scene } from '../../../types';

export const dinnerScenes: Scene[] = [
  // Scene 6: Seating Politics
  {
    id: 'dinner-6-table',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Dinner is called. People move to seats.',
      },
      {
        text: 'Victor has placed you strategically. On your left: Elena Rodriguez, CFO. On your right: Marcus Webb, the investor.',
      },
    ],
    nextSceneId: 'dinner-6b-table',
  },
  {
    id: 'dinner-6b-table',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'This is intentional. Victor put you next to the money and the scrutiny.',
      },
      {
        text: 'I don\'t think we\'ve met before. Are you new to Victor\'s orbit?',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'The evening begins.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-6-a',
        text: '"Relatively new. But I\'ve been making the most of it."',
        nextSceneId: 'dinner-7-investor',
        feedback: 'GOOD: Confident without overselling.',
        xpBonus: 12,
      },
      {
        id: 'dinner-6-b',
        text: '"This is my first dinner like this. I\'m here to learn."',
        nextSceneId: 'dinner-7-investor',
        feedback: 'HONEST: He appreciates directness.',
        xpBonus: 14,
      },
      {
        id: 'dinner-6-c',
        text: '"Victor sees something in me. I intend to prove him right."',
        nextSceneId: 'dinner-7-investor',
        feedback: 'OPTIMAL: Confident, loyal, ambitious.',
        xpBonus: 18,
        isOptimal: true,
      },
      {
        id: 'dinner-6-d',
        text: '"I\'ve been here a while, but these dinners are new territory."',
        nextSceneId: 'dinner-7-investor',
        feedback: 'SAFE: Neither helps nor hurts.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 7: The Investor's Question
  {
    id: 'dinner-7-investor',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Courses are served. Conversation flows. Marcus turns to you directly.',
      },
      {
        text: 'I\'m curious about something. Everyone here has an opinion about the market. What\'s yours?',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-7b-investor',
  },
  {
    id: 'dinner-7b-investor',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Others are listening now.',
      },
      {
        text: 'Not what Victor thinks. Not what the deck says. What do YOU believe will happen in the next 18 months?',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He\'s testing if you can think independently. In front of your CEO.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-7-a',
        text: 'Bold conviction: Share a specific, defensible contrarian view',
        nextSceneId: 'dinner-8-victor-bold',
        feedback: 'OPTIMAL: Independent thinking. Risky but impressive.',
        xpBonus: 25,
        isOptimal: true,
      },
      {
        id: 'dinner-7-b',
        text: 'Thoughtful hedging: "I think X, but with significant uncertainty around Y."',
        nextSceneId: 'dinner-8-victor-safe',
        feedback: 'GOOD: Nuanced. Safe.',
        xpBonus: 15,
      },
      {
        id: 'dinner-7-c',
        text: 'Strategic alignment: "I largely agree with Victor\'s thesis, with one nuance..."',
        nextSceneId: 'dinner-8-victor-aligned',
        feedback: 'SAFE: Loyal but not original.',
        xpBonus: 10,
      },
      {
        id: 'dinner-7-d',
        text: 'Defer: "I\'m still forming my view. I\'d rather listen tonight."',
        nextSceneId: 'dinner-8-victor-weak',
        feedback: 'TRAP: You had the floor and passed.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 8: Victor's Response (varies by path)
  {
    id: 'dinner-8-victor-bold',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Victor has been listening.',
      },
      {
        text: 'That\'s... not exactly our position.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'A beat of tension.',
      },
      {
        text: 'But it\'s well-reasoned. I can see why you\'d think that.',
        speakerId: 'victor',
        emotion: 'happy',
      },
      {
        text: 'Independent thinking. That\'s rare.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-9-cfo',
  },
  {
    id: 'dinner-8-victor-safe',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Victor nods slightly.',
      },
      {
        text: 'The nuance is fair.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'Marcus makes a note. Literally. On a napkin.',
      },
    ],
    nextSceneId: 'dinner-9-cfo',
  },
  {
    id: 'dinner-8-victor-aligned',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Victor nods.',
      },
      {
        text: 'Exactly right.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'Interesting. You think alike.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'That wasn\'t a compliment.',
      },
    ],
    nextSceneId: 'dinner-9-cfo',
  },
  {
    id: 'dinner-8-victor-weak',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Marcus turns away. The moment passes.',
      },
      {
        text: 'You had a chance to be heard by one of the most powerful investors in the room. And you said nothing.',
      },
    ],
    nextSceneId: 'dinner-9-cfo',
  },

  // Scene 9: The CFO's Test
  {
    id: 'dinner-9-cfo',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Elena Rodriguez turns to you.',
      },
      {
        text: 'I heard about your initiative. Victor pitched it to our board.',
        speakerId: 'elena',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-9b-cfo',
  },
  {
    id: 'dinner-9b-cfo',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'She picks up her wine.',
      },
      {
        text: 'The deck said 200 basis points margin improvement. What\'s the real number? Not the presentation. The actual.',
        speakerId: 'elena',
        emotion: 'cold',
      },
      {
        text: 'She\'s testing if you know your own numbers.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-9-a',
        text: 'Know it cold: "Realistic range is 140 to 180 basis points, depending on adoption."',
        nextSceneId: 'dinner-10-spotlight',
        feedback: 'OPTIMAL: You know your numbers. She respects that.',
        xpBonus: 22,
        isOptimal: true,
      },
      {
        id: 'dinner-9-b',
        text: 'Honest qualifier: "The deck is aspirational. We\'re conservatively targeting 150."',
        nextSceneId: 'dinner-10-spotlight',
        feedback: 'GOOD: Honest. Shows you know the difference.',
        xpBonus: 16,
      },
      {
        id: 'dinner-9-c',
        text: 'Strategic vagueness: "It depends on several assumptions. Happy to walk through it."',
        nextSceneId: 'dinner-10-spotlight',
        feedback: 'WEAK: Evasive. She noticed.',
        xpBonus: 5,
      },
      {
        id: 'dinner-9-d',
        text: 'Admit uncertainty: "I\'d want to confirm the latest before quoting."',
        nextSceneId: 'dinner-10-spotlight',
        feedback: 'TRAP: You don\'t know your own project\'s numbers.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 10: The Spotlight
  {
    id: 'dinner-10-spotlight',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Conversation lulls. Victor creates an opening.',
      },
      {
        text: 'Actually, let me have them explain this. They\'re closer to it than I am.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-10b-spotlight',
  },
  {
    id: 'dinner-10b-spotlight',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'Eleven faces turn.',
      },
      {
        text: 'The question was about our strategy in the sector. Give them the two-minute version.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'No deck. No prep. Just you. This is why he invited you.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-10-a',
        text: 'Crisp and compelling: Clear thesis, three supporting points, confident delivery',
        nextSceneId: 'dinner-11-end',
        feedback: 'OPTIMAL: You owned the room.',
        xpBonus: 25,
        isOptimal: true,
      },
      {
        id: 'dinner-10-b',
        text: 'Interactive: "I\'ll give you the thesis, but I\'d love your reactions."',
        nextSceneId: 'dinner-11-end',
        feedback: 'GOOD: Engaging. Builds connection.',
        xpBonus: 18,
      },
      {
        id: 'dinner-10-c',
        text: 'Story-driven: Start with a specific example that illustrates the strategy',
        nextSceneId: 'dinner-11-end',
        feedback: 'MEMORABLE: Stories stick.',
        xpBonus: 20,
      },
      {
        id: 'dinner-10-d',
        text: 'Too detailed: Get into the weeds of execution',
        nextSceneId: 'dinner-11-end-weak',
        feedback: 'TRAP: You lost the room in the details.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 11: Dinner Ends
  {
    id: 'dinner-11-end',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You finish. Silence for a beat.',
      },
      {
        text: 'That was clear.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Alexandra is nodding. Elena is thinking. Victor looks pleased.',
      },
    ],
    nextSceneId: 'dinner-12-afterdinner',
  },
  {
    id: 'dinner-11-end-weak',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You trail off, realizing you\'ve lost them.',
      },
      {
        text: 'Victor jumps in to redirect.',
      },
      {
        text: 'The key point is...',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'He rescued you. Not a good sign.',
      },
    ],
    nextSceneId: 'dinner-12-afterdinner',
  },
];
