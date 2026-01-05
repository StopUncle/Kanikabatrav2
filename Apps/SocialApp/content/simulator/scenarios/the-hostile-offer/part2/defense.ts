// Part 2: The Defense - Executing your strategy

import type { Scene } from '../../../types';

export const defenseScenes: Scene[] = [
  // Scene 4: Activating Defenses
  {
    id: 'hostile-4-defense',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Defense strategy session with your general counsel.',
      },
      {
        text: 'I\'ve activated the poison pill. If Sterling acquires more than 15% without board approval, existing shareholders can purchase stock at 50% discount.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'hostile-4b-defense',
  },
  {
    id: 'hostile-4b-defense',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'It makes the acquisition prohibitively expensive. But it\'s not permanent.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'How long do we have?',
      },
      {
        text: 'Proxy season is 60 days. If shareholders are unhappy enough, they vote us out and vote Sterling in.',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'The clock is ticking. You have 60 days to prove this company is worth more.',
        
      },
    ],
    nextSceneId: 'hostile-5-knight',
  },

  // Negotiate path
  {
    id: 'hostile-4-negotiate',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You decide to engage. On your terms.',
      },
      {
        text: 'If we\'re going to consider this, we need better terms. We need to negotiate.',
        
      },
      {
        text: 'Victoria agrees to let you explore a counteroffer.',
      },
    ],
    nextSceneId: 'hostile-5-negotiate',
  },

  // Scene 5: White Knight Option
  {
    id: 'hostile-5-knight',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Call with Alexandra Chen, TechCorp CEO. Potential white knight.',
      },
      {
        text: 'I\'ve seen the Sterling offer. I might be interested in a friendly alternative.',
        speakerId: 'alexandra',
        emotion: 'neutral',
      },
      {
        text: 'What are you thinking?',
      },
    ],
    nextSceneId: 'hostile-5b-knight',
  },
  {
    id: 'hostile-5b-knight',
    backgroundId: 'office',
    dialog: [
      {
        text: 'I\'d need exclusivity. Can\'t waste time if you\'re playing me against Sterling.',
        speakerId: 'alexandra',
        emotion: 'neutral',
      },
      {
        text: 'And I\'ll need real diligence. If the numbers support it, I could potentially go higher.',
        speakerId: 'alexandra',
        emotion: 'neutral',
      },
      {
        text: 'Higher than $4.2 billion? But you\'d still lose control. Is a friendly buyer actually better?',
        
      },
    ],
    choices: [
      {
        id: 'hostile-5-a',
        text: '"Let\'s discuss terms. I\'m open to the right partnership."',
        nextSceneId: 'hostile-6-whiteknight',
        feedback: 'You\'re engaging the white knight path. Less independence, more control.',
        xpBonus: 15,
      },
      {
        id: 'hostile-5-b',
        text: '"I want to explore this while keeping options open."',
        nextSceneId: 'hostile-6-escalate',
        feedback: 'RISKY: She might walk. But you\'re not committed.',
        xpBonus: 10,
      },
      {
        id: 'hostile-5-c',
        text: '"I\'m not interested in any sale. We\'re staying independent."',
        nextSceneId: 'hostile-6-escalate',
        feedback: 'BOLD: Independence or nothing. All in on the fight.',
        xpBonus: 12,
      },
    ],
  },

  // Negotiate path continues
  {
    id: 'hostile-5-negotiate',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Victor Sterling calls. Direct.',
      },
      {
        text: 'I understand you want to talk terms. I respect that.',
        speakerId: 'victor',
        emotion: 'seductive',
      },
      {
        text: 'This is a generous offer. Your shareholders deserve to decide. Don\'t let your ego stand in the way of their value.',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'He\'s testing you. Every word is calculated.',
        
      },
    ],
    nextSceneId: 'hostile-5c-negotiate',
  },
  {
    id: 'hostile-5c-negotiate',
    backgroundId: 'office',
    dialog: [
      {
        text: 'What would it take to get your recommendation?',
        speakerId: 'victor',
        emotion: 'neutral',
      },
      {
        text: 'This is negotiation. What do you want?',
        
      },
    ],
    choices: [
      {
        id: 'hostile-5n-a',
        text: '"$4.8 billion. And employee protections for 24 months."',
        nextSceneId: 'hostile-6-counter',
        feedback: 'STRONG: You\'re negotiating from a position.',
        xpBonus: 15,
      },
      {
        id: 'hostile-5n-b',
        text: '"More than you\'re offering. Make a real bid."',
        nextSceneId: 'hostile-6-counter',
        feedback: 'Playing hardball. He may walk.',
        xpBonus: 10,
      },
      {
        id: 'hostile-5n-c',
        text: '"I\'m not sure this can work. But I\'m listening."',
        nextSceneId: 'hostile-6-escalate',
        feedback: 'Weak opening. He smells blood.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 6: White Knight Engagement
  {
    id: 'hostile-6-whiteknight',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Alexandra\'s team begins diligence. Two weeks pass.',
      },
      {
        text: 'Her offer comes in: $4.5 billion. 10% higher than Sterling.',
      },
      {
        text: 'I\'ll maintain the team. Cultural fit matters to me. But I need board approval within 72 hours.',
        speakerId: 'alexandra',
        emotion: 'neutral',
      },
      {
        text: 'A real alternative. Not independence. But not destruction either.',
        
      },
    ],
    nextSceneId: 'hostile-7-shareholder',
  },

  // Scene 6: Counter-offer
  {
    id: 'hostile-6-counter',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Victor considers. A long pause.',
      },
      {
        text: '$4.4 billion. That\'s my ceiling. Employment protections for key executives. Take it or leave it.',
        speakerId: 'victor',
        emotion: 'cold',
      },
      {
        text: 'He moved. That\'s something.',
        
      },
    ],
    nextSceneId: 'hostile-7-shareholder',
  },

  // Scene 6: Escalation
  {
    id: 'hostile-6-escalate',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Sterling escalates. Letter to shareholders, leaked to press.',
      },
      {
        text: '"To the shareholders: Your board has rejected our $4.2 billion offer—a 35% premium that would deliver immediate, certain value."',
      },
    ],
    nextSceneId: 'hostile-6b-escalate',
  },
  {
    id: 'hostile-6b-escalate',
    backgroundId: 'office',
    dialog: [
      {
        text: '"We believe shareholders, not management, should decide. If the board does not reconsider, we will pursue a proxy contest."',
      },
      {
        text: 'Press coverage: "Sterling Goes Hostile"',
      },
      {
        text: 'They\'re going directly to shareholders. Over your head.',
        
      },
    ],
    nextSceneId: 'hostile-7-shareholder',
  },

  // Scene 7: Shareholder Pressure
  {
    id: 'hostile-7-shareholder',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Call from a major shareholder. 8% stake.',
      },
      {
        text: 'I need to understand why you\'re rejecting a 35% premium. My clients are asking.',
        speakerId: 'investor',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'hostile-7b-shareholder',
  },
  {
    id: 'hostile-7b-shareholder',
    backgroundId: 'office',
    dialog: [
      {
        text: '"Believe" isn\'t a number. Show me the model. Show me the path to higher value.',
        speakerId: 'investor',
        emotion: 'cold',
      },
      {
        text: 'Because right now, my fiduciary duty says I vote for the premium.',
        speakerId: 'investor',
        emotion: 'cold',
      },
      {
        text: 'This is the real fight. Board support means nothing if shareholders revolt.',
        
      },
    ],
    choices: [
      {
        id: 'hostile-7-a',
        text: '"We\'ll present our value creation plan to shareholders."',
        nextSceneId: 'hostile-8-value',
        feedback: 'OPTIMAL: Give them something to believe in.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'hostile-7-b',
        text: '"Trust the management team. We\'ve delivered before."',
        nextSceneId: 'hostile-8-value',
        feedback: 'WEAK: Too vague. They need specifics.',
        xpBonus: 5,
      },
      {
        id: 'hostile-7-c',
        text: '"We\'re exploring alternatives that may exceed this offer."',
        nextSceneId: 'hostile-8-value',
        feedback: 'Interesting. But do you have an alternative?',
        xpBonus: 12,
      },
      {
        id: 'hostile-7-d',
        text: '"The offer undervalues our strategic assets."',
        nextSceneId: 'hostile-8-value',
        feedback: 'Standard. But prove it.',
        xpBonus: 8,
      },
    ],
  },

  // Scene 8: Value Case
  {
    id: 'hostile-8-value',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You present to the board. The standalone value case.',
      },
      {
        text: 'If we execute on Q4, plus the new product launch, plus the cost synergies from last year\'s acquisition—we get to $6 billion valuation in 36 months.',
      },
    ],
    nextSceneId: 'hostile-8b-value',
  },
  {
    id: 'hostile-8b-value',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'These projections are defensible. Aggressive, but defensible.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'You\'re asking shareholders to wait three years for a 40% increase—with execution risk. Sterling is offering 35% today, guaranteed.',
        speakerId: 'sarah',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'hostile-8c-value',
  },
  {
    id: 'hostile-8c-value',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'The question is whether shareholders trust management to deliver.',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'That IS the question. Do they trust you?',
        
      },
    ],
    nextSceneId: 'hostile-9-final',
  },
];
