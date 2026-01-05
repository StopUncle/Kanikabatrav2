// Part 2: The Ask
// Scenes 6-12: The negotiation itself

import type { Scene } from '../../../types';

export const theAskScenes: Scene[] = [
  // Scene 6a: Supportive Manager Path - Setting Up
  {
    id: 'raise-6-supportive',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Time to make the ask. You catch Derek after a team win.',
      },
      {
        text: '"Hey, got a minute? There\'s something I\'d like to discuss."',
      },
      {
        text: '"Sure, let\'s grab a room."',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'He seems relaxed. Good. Supportive managers are easier, but you still need to make the case.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'raise-6s-a',
        text: '"I want to discuss my compensation. I\'ve been here two years, delivered strong results, and I\'m currently paid below market."',
        nextSceneId: 'raise-7-present',
        feedback: 'OPTIMAL: Direct, data-focused, professional. Perfect opening.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-6s-b',
        text: '"I really value working here and want to talk about how my compensation can reflect my contribution."',
        nextSceneId: 'raise-7-present',
        feedback: 'Good relationship framing. Slightly soft on the ask.',
        xpBonus: 10,
      },
      {
        id: 'raise-6s-c',
        text: '"I\'ve been approached by other companies. Before I consider anything, I wanted to talk to you."',
        nextSceneId: 'raise-7-present',
        feedback: 'Strong leverage play. Even supportive managers don\'t love feeling threatened.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 6b: Threatened Manager Path - Setting Up
  {
    id: 'raise-6-threatened',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Time to make the ask. You request a meeting formally.',
      },
      {
        text: '"Derek, can we schedule 30 minutes to discuss my career development?"',
      },
      {
        text: '"Career development? Sure. What\'s this about?"',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'Already defensive. Be careful here.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-6t-a',
        text: '"I\'d like to discuss my compensation and how it aligns with my contributions."',
        nextSceneId: 'raise-7-present',
        feedback: 'OPTIMAL: Professional, factual. Gives him less to react defensively to.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-6t-b',
        text: '"I feel like I\'m being underpaid compared to my peers."',
        nextSceneId: 'raise-7-present',
        feedback: 'Feelings give him room to dismiss. Threatened managers will use that opening.',
        xpBonus: 5,
      },
      {
        id: 'raise-6t-c',
        text: '"I have some concerns about my compensation that I need addressed."',
        nextSceneId: 'raise-7-present',
        feedback: 'Demanding tone with a threatened manager? This could escalate badly.',
        xpBonus: 3,
      },
    ],
  },

  // Scene 6c: Checked-Out Manager Path - Setting Up
  {
    id: 'raise-6-checked-out',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Time to make the ask. You catch Derek between meetings.',
      },
      {
        text: '"Derek, I need to talk to you about compensation."',
      },
      {
        text: '"Yeah, sure. Send me a calendar invite."',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'Already brushing you off. He\'s not going to fight for this. You might need to go around him.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-6c-a',
        text: '"I need to discuss this now. It\'s time-sensitive."',
        nextSceneId: 'raise-7-present',
        feedback: 'OPTIMAL: Force the issue. Checked-out managers will delay forever if you let them.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-6c-b',
        text: '"Okay, I\'ll send the invite."',
        nextSceneId: 'raise-7-present',
        feedback: 'He\'ll cancel or postpone. You\'re playing his delay game.',
        xpBonus: 5,
      },
      {
        id: 'raise-6c-c',
        text: '"Actually, should I talk to HR directly about this?"',
        nextSceneId: 'raise-7-present',
        feedback: 'Risky to go around him this early, but he\'s not going to help anyway.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 7: Presenting Your Case
  {
    id: 'raise-7-present',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You\'re in Derek\'s office. Door closed. Time to present.',
      },
      {
        text: 'You lay out your case: tenure, specific wins with dollar values, market data showing you\'re underpaid.',
      },
      {
        text: '"That\'s... comprehensive. You\'ve clearly thought about this."',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'Translation: They weren\'t expecting you to come armed. Good.',
        
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'raise-8-objection',
  },

  // Scene 8: The First Objection
  {
    id: 'raise-8-objection',
    backgroundId: 'office',
    dialog: [
      {
        text: '"Look, I hear you. But the budget is tight right now. We\'re not really doing off-cycle raises."',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'The "budget" objection. Classic. Translation: "I don\'t want to fight for this."',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-8-a',
        text: '"I understand. But there\'s always budget for retention when someone leaves. I\'d rather we solve this proactively."',
        nextSceneId: 'raise-9-anchor',
        feedback: 'OPTIMAL: Reframe the cost. Replacing you costs more than paying you.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-8-b',
        text: '"When would be the right time? And what would I need to demonstrate?"',
        nextSceneId: 'raise-9-anchor',
        feedback: 'Safe play. Creates accountability but kicks the can.',
        xpBonus: 10,
      },
      {
        id: 'raise-8-c',
        text: '"I appreciate that. Which is why I wanted to have this conversation before I started taking recruiter calls seriously."',
        nextSceneId: 'raise-9-anchor',
        feedback: 'The implicit threat. High leverage, high risk.',
        xpBonus: 12,
      },
      {
        id: 'raise-8-d',
        text: '"I understand. Maybe we can revisit at annual review."',
        nextSceneId: 'ending-delay',
        feedback: 'TRAP: You just accepted defeat. Annual review = their timeline, their rules.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 9: The Anchor
  {
    id: 'raise-9-anchor',
    backgroundId: 'office',
    dialog: [
      {
        text: '"Okay. What number are we talking about?"',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'Anchor time. First number sets the range. If market rate is $95-105K and you\'re at $82K, you don\'t ask for $90K.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-9-a',
        text: '"Based on my contributions and market data, I\'m looking at $105K."',
        nextSceneId: 'raise-10-counter',
        feedback: 'OPTIMAL: Anchor high. You\'ll negotiate down, but from strength.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-9-b',
        text: '"The market rate for my role is $95-105K. I should be at least at $95K."',
        nextSceneId: 'raise-10-counter',
        feedback: 'Solid anchor. Leaves room to land at market rate.',
        xpBonus: 12,
      },
      {
        id: 'raise-9-c',
        text: '"I was thinking something like $88K would be fair."',
        nextSceneId: 'raise-10-counter',
        feedback: 'TRAP: You just capped yourself below market. They\'ll offer less.',
        xpBonus: 3,
      },
      {
        id: 'raise-9-d',
        text: '"What do you think is fair?"',
        nextSceneId: 'raise-10-counter',
        feedback: 'TRAP: Fatal error. You just let them anchor. They\'ll lowball.',
        xpBonus: 0,
      },
    ],
  },

  // Scene 10: The Counter Offer
  {
    id: 'raise-10-counter',
    backgroundId: 'office',
    dialog: [
      {
        text: 'A few days later. Derek calls you in.',
      },
      {
        text: '"I talked to leadership. They approved an increase."',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: '"We can do $87K. That\'s a 6% bump. Strong for off-cycle."',
        speakerId: 'derek',
        emotion: 'happy',
      },
      {
        text: '$87K. You asked for $105K. Market rate is $95K. They\'re still underpaying you. 6% sounds nice until you do the math.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'raise-10-a',
        text: '"I appreciate the movement. To make this work, I need to be at market rate - $95K."',
        nextSceneId: 'raise-11-final',
        feedback: 'OPTIMAL: Counter the counter. Never accept the first offer.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-10-b',
        text: '"Can we discuss title change and additional PTO if the base has limits?"',
        nextSceneId: 'raise-11-creative',
        feedback: 'Creative negotiation. Total comp matters, not just base.',
        xpBonus: 12,
      },
      {
        id: 'raise-10-c',
        text: '"I have an offer at $100K I\'m considering. I\'d prefer to stay, but..."',
        nextSceneId: 'raise-11-batna',
        feedback: 'Deploy the BATNA. High stakes. Make sure it\'s real.',
        xpBonus: 10,
      },
      {
        id: 'raise-10-d',
        text: '"Thank you, I really appreciate it."',
        nextSceneId: 'ending-partial',
        feedback: 'TRAP: You just left $8K+ on the table. Never take the first offer.',
        xpBonus: 3,
      },
    ],
  },

  // Scene 11a: Final Push
  {
    id: 'raise-11-final',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Derek pauses. You can see him calculating.',
      },
      {
        text: '"$95K is a big jump. Let me go back to them."',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'Two days later, your phone buzzes. Email from HR.',
      },
      {
        text: '"We\'re pleased to confirm your compensation adjustment to $92,000, effective next pay period."',
      },
      {
        text: '$92K. Not $95K. But $10K more than you had. And you know you can push again at annual review.',
        
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ending-strong-win',
  },

  // Scene 11b: Creative Negotiation
  {
    id: 'raise-11-creative',
    backgroundId: 'office',
    dialog: [
      {
        text: '"That\'s creative thinking. Let me see what we can do."',
        speakerId: 'derek',
        emotion: 'neutral',
      },
      {
        text: 'A week later, the offer comes back: $89K base, title bump to "Senior," extra week of PTO.',
      },
      {
        text: 'Not the base you wanted. But the title opens doors. And time off has real value.',
        
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-creative-win',
  },

  // Scene 11c: BATNA Deployed
  {
    id: 'raise-11-batna',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Derek\'s expression shifts. This just became real.',
      },
      {
        text: '"An offer? That\'s... I didn\'t realize you were actively looking."',
        speakerId: 'derek',
        emotion: 'concerned',
      },
      {
        text: '"I wasn\'t. They came to me. But I have to take it seriously."',
      },
      {
        text: 'You just changed the game. Now it\'s a retention conversation, not a raise request.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'raise-11c-a',
        text: 'Wait for their counter. Let them come to you.',
        nextSceneId: 'raise-12-retention',
        feedback: 'OPTIMAL: You have leverage. Let them use it to make an offer.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'raise-11c-b',
        text: '"I\'d prefer to stay. What can you do to make that happen?"',
        nextSceneId: 'raise-12-retention',
        feedback: 'Shows loyalty while maintaining pressure. Good balance.',
        xpBonus: 12,
      },
    ],
  },

  // Scene 12: Retention Counter
  {
    id: 'raise-12-retention',
    backgroundId: 'office',
    dialog: [
      {
        text: 'The next day. Derek and Marcus (the VP) want to meet.',
      },
      {
        text: '"We don\'t want to lose you. Here\'s what we can do: $98K, immediate effect, plus equity acceleration."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '$98K. Higher than your ask. They were always able to pay this. They just didn\'t want to.',
        
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'ending-full-win',
  },
];
