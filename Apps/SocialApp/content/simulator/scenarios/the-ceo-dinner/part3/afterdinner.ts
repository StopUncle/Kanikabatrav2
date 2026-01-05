// Part 3: The After-Dinner - Drinks, relationships, follow-up

import type { Scene } from '../../../types';

export const afterdinnerScenes: Scene[] = [
  // Scene 12: The Sidebar
  {
    id: 'dinner-12-afterdinner',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'Dinner ends. People move to comfortable chairs. Drinks flow.',
      },
      {
        text: 'Marcus Webb finds you alone for a moment.',
      },
    ],
    nextSceneId: 'dinner-12b-afterdinner',
  },
  {
    id: 'dinner-12b-afterdinner',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'You handled yourself well in there.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He sips something amber.',
      },
      {
        text: 'I invest in people more than companies. Victor is an interesting judge of talent. We\'ll see if he\'s right about you.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-12c-afterdinner',
  },
  {
    id: 'dinner-12c-afterdinner',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'What are you actually trying to build? Not for Victor. For you.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'This is the real question. What do you say?',
        
      },
    ],
    choices: [
      {
        id: 'dinner-12-a',
        text: 'Ambitious vision: Share your long-term goal honestly',
        nextSceneId: 'dinner-13-alexandra',
        feedback: 'OPTIMAL: He respects ambition with substance.',
        xpBonus: 22,
        isOptimal: true,
      },
      {
        id: 'dinner-12-b',
        text: 'Strategic alignment: "What I\'m building serves what Victor is building."',
        nextSceneId: 'dinner-13-alexandra',
        feedback: 'SAFE: Loyal. But he wanted to hear about YOU.',
        xpBonus: 10,
      },
      {
        id: 'dinner-12-c',
        text: 'Exploratory: "I\'m still discovering what\'s possible. Tonight opened my eyes."',
        nextSceneId: 'dinner-13-alexandra',
        feedback: 'GOOD: Humble. Shows growth mindset.',
        xpBonus: 15,
      },
      {
        id: 'dinner-12-d',
        text: 'Career aspiration: "I want to be in Victor\'s seat someday."',
        nextSceneId: 'dinner-13-alexandra',
        feedback: 'RISKY: Ambition is good. Overreach is not.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 13: Alexandra's Thaw
  {
    id: 'dinner-13-alexandra',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'Alexandra Chen approaches. Different energy than before.',
      },
      {
        text: 'You surprised me.',
        speakerId: 'alexandra',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-13b-alexandra',
  },
  {
    id: 'dinner-13b-alexandra',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'She almost smiles.',
      },
      {
        text: 'Most people Victor brings are empty suits. You\'re... not entirely empty.',
        speakerId: 'alexandra',
        emotion: 'happy',
      },
      {
        text: 'High praise from a skeptic.',
      },
    ],
    nextSceneId: 'dinner-13c-alexandra',
  },
  {
    id: 'dinner-13c-alexandra',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'If the partnership moves forward, I\'d want you involved. Give me a reason to remember that.',
        speakerId: 'alexandra',
        emotion: 'neutral',
      },
      {
        text: 'This is the follow-up opportunity. Don\'t waste it.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-13-a',
        text: 'Create follow-up: "I\'ll send you the analysis that informed our approach."',
        nextSceneId: 'dinner-14-victor',
        feedback: 'OPTIMAL: Concrete. Creates reason to reconnect.',
        xpBonus: 22,
        isOptimal: true,
      },
      {
        id: 'dinner-13-b',
        text: 'Confident response: "You\'ll remember. The work will speak for itself."',
        nextSceneId: 'dinner-14-victor',
        feedback: 'BOLD: Confident. Maybe too confident.',
        xpBonus: 12,
      },
      {
        id: 'dinner-13-c',
        text: 'Ask for something: "I\'d love 30 minutes with your team to understand your side better."',
        nextSceneId: 'dinner-14-victor',
        feedback: 'GOOD: Creates relationship opportunity.',
        xpBonus: 18,
      },
      {
        id: 'dinner-13-d',
        text: 'Humble gratitude: "That means a lot. Thank you for the tough questions."',
        nextSceneId: 'dinner-14-victor',
        feedback: 'SAFE: Gracious but no next step.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 14: Victor's Debrief
  {
    id: 'dinner-14-victor',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'Victor catches you as guests depart.',
      },
      {
        text: 'You did well.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-14b-victor',
  },
  {
    id: 'dinner-14b-victor',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'He doesn\'t elaborate.',
      },
      {
        text: 'Alexandra was impressed. Marcus asked questions. That\'s unusual for Marcus.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-14c-victor',
  },
  {
    id: 'dinner-14c-victor',
    backgroundId: 'bar',
    dialog: [
      {
        text: 'Don\'t waste it. The door is open. Walk through it.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'The dinner ends. But the relationships are just beginning.',
        
      },
    ],
    choices: [
      {
        id: 'dinner-14-a',
        text: '"I won\'t. I have follow-ups scheduled already."',
        nextSceneId: 'ending-memorable',
        feedback: 'OPTIMAL: Proactive. Victor respects action.',
        xpBonus: 20,
        isOptimal: true,
      },
      {
        id: 'dinner-14-b',
        text: '"Thank you for the opportunity. I learned a lot."',
        nextSceneId: 'ending-natural',
        feedback: 'GOOD: Grateful. Professional.',
        xpBonus: 15,
      },
      {
        id: 'dinner-14-c',
        text: '"I think I held my own."',
        nextSceneId: 'ending-door-opener',
        feedback: 'CONFIDENT: You know your worth.',
        xpBonus: 12,
      },
      {
        id: 'dinner-14-d',
        text: '"Was it enough?"',
        nextSceneId: 'ending-learning',
        feedback: 'UNCERTAIN: Seeking validation.',
        xpBonus: 5,
      },
    ],
  },
];
