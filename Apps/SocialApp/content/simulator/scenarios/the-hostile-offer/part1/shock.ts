// Part 1: The Shock - The offer arrives, initial response

import type { Scene } from '../../../types';

export const shockScenes: Scene[] = [
  // Scene 1: The Letter
  {
    id: 'hostile-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Monday, 9:14 AM. Your assistant interrupts.',
      },
      {
        text: 'This was hand-delivered. Marked urgent.',
        speakerId: 'assistant',
        emotion: 'concerned',
      },
      {
        text: 'Sterling Capital letterhead.',
      },
      {
        text: 'Your stomach drops before you read it.',
        
      },
    ],
    nextSceneId: 'hostile-1b',
  },
  {
    id: 'hostile-1b',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The letter:',
      },
      {
        text: '"Dear Board of Directors, Sterling Capital is pleased to submit this proposal to acquire 100% of your company for $4.2 billion in cash, representing a 35% premium to Friday\'s closing price."',
      },
    ],
    nextSceneId: 'hostile-1c',
  },
  {
    id: 'hostile-1c',
    backgroundId: 'office',
    dialog: [
      {
        text: '"This offer is subject to board recommendation and standard regulatory approval. We expect a response within 48 hours."',
      },
      {
        text: 'A hostile bid. This is real. Everything changes now.',
        
      },
    ],
    nextSceneId: 'hostile-2',
  },

  // Scene 2: Emergency Board Call
  {
    id: 'hostile-2',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Board convenes within the hour. Video conference.',
      },
      {
        text: 'I\'ve distributed the Sterling letter. We have 48 hours to respond. What are our options?',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'hostile-2b',
  },
  {
    id: 'hostile-2b',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Legally, we have several defenses available. Our poison pill makes a hostile acquisition very expensive. But it won\'t stop a proxy fight.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'At $4.2 billion, they\'re offering 12x EBITDA. That\'s a premium. Our stock hasn\'t hit this level in two years.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'hostile-2c',
  },
  {
    id: 'hostile-2c',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'My fiduciary duty is to shareholders. 35% premium is significant. We need to take this seriously.',
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: 'All eyes turn to you.',
      },
      {
        text: 'What\'s your recommendation?',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'This is the defining moment. What\'s your strategy?',
        
      },
    ],
    choices: [
      {
        id: 'hostile-2-a',
        text: 'Fight: "We reject this offer. This company is worth more."',
        nextSceneId: 'hostile-3-fight',
        feedback: 'BOLD: You\'re betting on yourself. High risk, high reward.',
        xpBonus: 15,
      },
      {
        id: 'hostile-2-b',
        text: 'Explore: "We evaluate all alternatives—including the offer."',
        nextSceneId: 'hostile-3-explore',
        feedback: 'OPTIMAL: Keep options open. Play the board.',
        xpBonus: 20,
        isOptimal: true,
      },
      {
        id: 'hostile-2-c',
        text: 'White Knight: "We find a better partner than Sterling."',
        nextSceneId: 'hostile-3-knight',
        feedback: 'STRATEGIC: Control your exit. Choose your buyer.',
        xpBonus: 15,
      },
      {
        id: 'hostile-2-d',
        text: 'Accept: "The premium is real. We should recommend acceptance."',
        nextSceneId: 'ending-quick-accept',
        feedback: 'SURRENDER: You\'re walking away from the fight.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 3: Personal Calculation
  {
    id: 'hostile-3-fight',
    backgroundId: 'office',
    dialog: [
      {
        text: 'After the call. You do the math. Alone.',
      },
      {
        text: 'Your equity stake: $85 million at this premium. Guaranteed.',
        
      },
      {
        text: 'If you fight and lose, that could drop to half. If you fight and win, maybe it doubles in five years. Or maybe it doesn\'t.',
      },
    ],
    nextSceneId: 'hostile-3b',
  },
  {
    id: 'hostile-3-explore',
    backgroundId: 'office',
    dialog: [
      {
        text: 'After the call. You do the math. Alone.',
      },
      {
        text: 'Your equity stake: $85 million at this premium. Guaranteed.',
        
      },
      {
        text: 'If you fight and lose, that could drop to half. If you fight and win, maybe it doubles in five years.',
      },
    ],
    nextSceneId: 'hostile-3b',
  },
  {
    id: 'hostile-3-knight',
    backgroundId: 'office',
    dialog: [
      {
        text: 'After the call. You do the math. Alone.',
      },
      {
        text: 'Your equity stake: $85 million at this premium. Maybe more with the right buyer.',
        
      },
      {
        text: 'A white knight still means selling. But on your terms.',
      },
    ],
    nextSceneId: 'hostile-3b',
  },
  {
    id: 'hostile-3b',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Twelve years. From startup to this. If Sterling takes over, 30% of employees go. The culture dies. Everything you built—gone.',
        
      },
      {
        text: 'But $85 million is life-changing money. And this fight could destroy you.',
      },
      {
        text: 'What\'s driving your decision?',
        
      },
    ],
    choices: [
      {
        id: 'hostile-3-a',
        text: '"This is about the company. The people. What we built."',
        nextSceneId: 'hostile-4-defense',
        feedback: 'OPTIMAL: Conviction. That\'s what it takes to fight.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'hostile-3-b',
        text: '"This is about winning. I don\'t lose to people like Sterling."',
        nextSceneId: 'hostile-4-defense',
        feedback: 'Ego can fuel a fight. Or blind you.',
        xpBonus: 10,
      },
      {
        id: 'hostile-3-c',
        text: '"The money would be nice, but I\'m not done yet."',
        nextSceneId: 'hostile-4-defense',
        feedback: 'Ambition. You want to build more.',
        xpBonus: 12,
      },
      {
        id: 'hostile-3-d',
        text: '"I need to think about my family. The security."',
        nextSceneId: 'hostile-4-negotiate',
        feedback: 'Honest. Personal stakes matter.',
        xpBonus: 8,
      },
    ],
  },
];
