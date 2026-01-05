// Part 1: The Signal - Warning signs, intel gathering, and strategy selection

import type { Scene } from '../../../types';

export const signalScenes: Scene[] = [
  // Scene 1: The All-Hands
  {
    id: 'layoff-1',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Company all-hands. The CEO is speaking to 500 employees.',
      },
      {
        text: 'In light of market conditions, we\'re evaluating our organizational structure.',
        speakerId: 'ceo',
        emotion: 'neutral',
      },
      {
        text: '"Evaluating organizational structure." That\'s the phrase. That means layoffs.',
        
      },
    ],
    nextSceneId: 'layoff-1b',
  },
  {
    id: 'layoff-1b',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'You look around. Nervous faces everywhere.',
      },
      {
        text: 'We\'re committed to transparency. We expect to have more information in the coming weeks.',
        speakerId: 'ceo',
        emotion: 'neutral',
      },
      {
        text: 'I want to be clear—nothing is decided. We\'re still assessing what\'s best for the company.',
        speakerId: 'ceo',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'layoff-1c',
  },
  {
    id: 'layoff-1c',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Translation: things are decided. Just not announced.',
      },
      {
        text: 'You have weeks. Maybe days. The game starts now.',
        
      },
    ],
    nextSceneId: 'layoff-2',
  },

  // Scene 2: The Intel
  {
    id: 'layoff-2',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'Priya. The one who always knows things before anyone else.',
      },
      {
        text: 'So you got the "evaluating organizational structure" email.',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'What do you know?',
      },
    ],
    nextSceneId: 'layoff-2b',
  },
  {
    id: 'layoff-2b',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: '15%. That\'s the target. Maybe 20% if the board pushes harder.',
        speakerId: 'priya',
        emotion: 'concerned',
      },
      {
        text: '15%. One in seven. Those aren\'t great odds.',
        
      },
    ],
    nextSceneId: 'layoff-2c',
  },
  {
    id: 'layoff-2c',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'They\'re looking at three things.',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'Cost. Meaning how much you make.',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'Criticality. Meaning what breaks if you leave.',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'And political protection. Meaning who cares if you stay.',
        speakerId: 'priya',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'layoff-2d',
  },
  {
    id: 'layoff-2d',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'Where do you stand on all three?',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'Honest assessment time.',
        
      },
    ],
    nextSceneId: 'layoff-3',
  },

  // Scene 3: Self-Assessment (Choice)
  {
    id: 'layoff-3',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Time to honestly evaluate your position.',
      },
      {
        text: 'COST: Are you expensive relative to your peers? Recent raises?',
      },
      {
        text: 'CRITICALITY: What breaks if you\'re gone? Are you on a project that can\'t fail?',
      },
      {
        text: 'POLITICAL PROTECTION: Who would fight for you? Does Marcus know you exist?',
      },
      {
        text: 'Be honest. Delusion won\'t save you.',
        
      },
    ],
    choices: [
      {
        id: 'layoff-3-a',
        text: 'I\'m well-positioned. Average cost, critical project, Chen advocates.',
        nextSceneId: 'layoff-4',
        feedback: 'Good starting position. But don\'t get complacent.',
        xpBonus: 10,
      },
      {
        id: 'layoff-3-b',
        text: 'I\'m vulnerable. Higher paid, no critical project, limited visibility.',
        nextSceneId: 'layoff-4',
        feedback: 'At least you\'re honest. That\'s step one.',
        xpBonus: 8,
      },
      {
        id: 'layoff-3-c',
        text: 'I\'m uncertain. I need more information before I can assess.',
        nextSceneId: 'layoff-4',
        feedback: 'Uncertainty is dangerous. But so is false confidence.',
        xpBonus: 5,
      },
      {
        id: 'layoff-3-d',
        text: 'I\'m probably fine. I do good work.',
        nextSceneId: 'layoff-4-trap',
        feedback: 'TRAP: Good work doesn\'t protect you. Politics does.',
        xpBonus: 0,
      },
    ],
  },

  // Trap scene for overconfidence
  {
    id: 'layoff-4-trap',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'You assume your work speaks for itself.',
      },
      {
        text: 'Here\'s the problem: in layoffs, decision-makers aren\'t evaluating work quality. They\'re evaluating cost, visibility, and protection.',
      },
      {
        text: 'The best performer on the team can still get cut if no one in power knows their name.',
        
      },
    ],
    nextSceneId: 'layoff-4',
  },

  // Scene 4: The Strategy
  {
    id: 'layoff-4',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'Four weeks. What\'s the play?',
        
      },
      {
        text: 'VISIBILITY CAMPAIGN: Get in front of decision-makers. Risk: highlights problems if you\'ve had any.',
      },
      {
        text: 'INDISPENSABILITY: Attach to something critical. Risk: if the project gets cut, you go with it.',
      },
      {
        text: 'SPONSOR HUNT: Find someone powerful to protect you. Risk: may not work in time.',
      },
      {
        text: 'HEDGING: Prepare for the worst. Risk: distraction from positioning.',
      },
      {
        text: 'You probably need some combination. What\'s your priority?',
        
      },
    ],
    choices: [
      {
        id: 'layoff-4-a',
        text: 'Visibility first - Get in front of Marcus, make my value known',
        nextSceneId: 'layoff-5-visibility',
        feedback: 'OPTIMAL: Decision-makers can\'t keep who they don\'t know.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'layoff-4-b',
        text: 'Indispensability first - Attach to critical project, become essential',
        nextSceneId: 'layoff-5-indispensable',
        feedback: 'Strong play. Make yourself too expensive to remove.',
        xpBonus: 12,
      },
      {
        id: 'layoff-4-c',
        text: 'Sponsor first - Build a relationship with someone who can protect me',
        nextSceneId: 'layoff-5-sponsor',
        feedback: 'Protection matters. But building trust takes time.',
        xpBonus: 10,
      },
      {
        id: 'layoff-4-d',
        text: 'Hedge first - Update resume, start looking, prepare for worst',
        nextSceneId: 'layoff-5-hedge',
        feedback: 'Practical. But might signal you\'ve given up.',
        xpBonus: 5,
      },
    ],
  },

  // Scene 5: Visibility Path
  {
    id: 'layoff-5-visibility',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Marcus needs to know who you are. And he needs to know what you\'ve done.',
        
      },
      {
        text: 'You engineer a reason to interact.',
      },
      {
        text: 'Email to Marcus: "Following up on the Henderson project—we closed ahead of schedule and under budget. Happy to walk you through the approach if helpful."',
      },
    ],
    nextSceneId: 'layoff-5b-visibility',
  },
  {
    id: 'layoff-5b-visibility',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Response comes within hours.',
      },
      {
        text: 'Good work on Henderson. Let\'s find 15 minutes.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Door opened. Now make it count.',
        
      },
    ],
    nextSceneId: 'layoff-6-marcus',
  },

  // Scene 5: Indispensability Path
  {
    id: 'layoff-5-indispensable',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Meeting with Chen.',
      },
      {
        text: 'I want to take on the Q4 integration. I know it\'s critical. I think I can lead it.',
      },
      {
        text: 'That\'s a high-profile project. Marcus is watching it closely.',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'Exactly.',
        
      },
    ],
    nextSceneId: 'layoff-5b-indispensable',
  },
  {
    id: 'layoff-5b-indispensable',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'If you take it and it goes wrong...',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'I understand the risk.',
      },
      {
        text: 'Okay. It\'s yours. Don\'t let me down.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'You\'re now attached to something that can\'t fail. If it succeeds, you\'re safe. If it fails...',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },

  // Scene 5: Sponsor Path
  {
    id: 'layoff-5-sponsor',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Chen might not be enough. Their own position might be uncertain.',
        
      },
      {
        text: 'You need someone higher. Someone whose word matters.',
      },
      {
        text: 'Options: Marcus (VP, hard to access). Sarah (Director, has Marcus\'s ear). Chen (strengthen existing relationship).',
      },
      {
        text: 'Who do you try to build a relationship with?',
        
      },
    ],
    choices: [
      {
        id: 'layoff-5-sponsor-a',
        text: 'Go for Marcus directly - high risk, high reward',
        nextSceneId: 'layoff-6-marcus',
        feedback: 'Bold. If you can get the meeting.',
        xpBonus: 12,
      },
      {
        id: 'layoff-5-sponsor-b',
        text: 'Build with Sarah - more accessible, can advocate upward',
        nextSceneId: 'layoff-6-sarah',
        feedback: 'Smart. Lower risk, still effective.',
        xpBonus: 10,
      },
      {
        id: 'layoff-5-sponsor-c',
        text: 'Strengthen Chen relationship - make sure they fight hard for you',
        nextSceneId: 'layoff-6-chen',
        feedback: 'Practical. But is Chen\'s word enough?',
        xpBonus: 8,
      },
    ],
  },

  // Scene 5: Hedge Path
  {
    id: 'layoff-5-hedge',
    backgroundId: 'apartment',
    dialog: [
      {
        text: 'You spend the weekend updating your resume. LinkedIn. Networking messages.',
      },
      {
        text: 'It\'s the responsible thing to do. Prepare for the worst.',
        
      },
      {
        text: 'But every hour you spend job hunting is an hour you\'re not positioning yourself to stay.',
      },
      {
        text: 'The question: are you preparing to survive, or preparing to leave?',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },

  // Scene 6: Marcus Meeting
  {
    id: 'layoff-6-marcus',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Marcus\'s office. 15 minutes that might determine your future.',
      },
      {
        text: 'Henderson went well. Walk me through how you did it.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'This isn\'t a project update. This is an audition for survival.',
        
      },
    ],
    choices: [
      {
        id: 'layoff-6-marcus-a',
        text: 'Results focus: Lead with numbers, impact, measurable value',
        nextSceneId: 'layoff-6b-marcus-results',
        feedback: 'OPTIMAL: Numbers are hard to argue with.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'layoff-6-marcus-b',
        text: 'Leadership focus: Emphasize your role in coordinating and driving',
        nextSceneId: 'layoff-6b-marcus-lead',
        feedback: 'Good. Shows you\'re more than a doer.',
        xpBonus: 12,
      },
      {
        id: 'layoff-6-marcus-c',
        text: 'Humble credit-share: "The team really delivered. I\'m proud of what we built."',
        nextSceneId: 'layoff-6b-marcus-humble',
        feedback: 'Graceful. But you might not stand out.',
        xpBonus: 5,
      },
      {
        id: 'layoff-6-marcus-d',
        text: 'Future value: "Here\'s what I\'d do next. Here\'s the opportunity I see."',
        nextSceneId: 'layoff-6b-marcus-future',
        feedback: 'Bold. Shows forward thinking.',
        xpBonus: 10,
      },
    ],
  },
  {
    id: 'layoff-6b-marcus-results',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'We came in 15% under budget and two weeks ahead of schedule. Client NPS was 92.',
      },
      {
        text: 'Those are strong numbers.',
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: 'He\'s writing something down. Good sign.',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },
  {
    id: 'layoff-6b-marcus-lead',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I coordinated across three teams, unblocked the vendor issue, and kept everything on track when priorities shifted.',
      },
      {
        text: 'That sounds like leadership material.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'He\'s seeing you as more than a contributor. That matters.',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },
  {
    id: 'layoff-6b-marcus-humble',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'The team really delivered. I\'m proud of what we built together.',
      },
      {
        text: 'Good team dynamics are important.',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'Polite. But did he learn anything new about YOU?',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },
  {
    id: 'layoff-6b-marcus-future',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Based on Henderson, I see an opportunity to expand this model across the portfolio. Here\'s what I\'d do next.',
      },
      {
        text: 'Interesting. Send me a one-pager.',
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: 'He sees you as someone with vision. That\'s valuable currency.',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },

  // Scene 6: Sarah Path
  {
    id: 'layoff-6-sarah',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'Coffee with Sarah, Director of Operations. She has Marcus\'s ear.',
      },
      {
        text: 'I wanted to get your perspective on my career path here. You\'ve navigated the organization well.',
      },
      {
        text: 'Sarah smiles. People love being asked for advice.',
        
      },
    ],
    nextSceneId: 'layoff-6b-sarah',
  },
  {
    id: 'layoff-6b-sarah',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: 'You\'re smart to be thinking about this. The next few weeks will be... clarifying.',
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: 'She knows something. Everyone in the room does.',
        
      },
      {
        text: 'Keep your head down, deliver value, and make sure the right people know what you\'re doing. I can help with that last part.',
        speakerId: 'sarah',
        emotion: 'neutral',
      },
      {
        text: 'You have an ally. Maybe not a full sponsor, but an ally.',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },

  // Scene 6: Chen Path
  {
    id: 'layoff-6-chen',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'One-on-one with Chen. You need to know where you stand.',
      },
      {
        text: 'I want to be direct. If decisions are being made, I want to make sure you can advocate for me.',
      },
      {
        text: 'Chen pauses. This isn\'t a comfortable conversation.',
        
      },
    ],
    nextSceneId: 'layoff-6b-chen',
  },
  {
    id: 'layoff-6b-chen',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I\'m doing everything I can. But I don\'t have full visibility into the decisions.',
        speakerId: 'chen',
        emotion: 'concerned',
      },
      {
        text: 'That\'s either reassuring or terrifying. Hard to tell which.',
        
      },
      {
        text: 'I value you on this team. I\'ll make that clear. That\'s what I can promise.',
        speakerId: 'chen',
        emotion: 'neutral',
      },
      {
        text: 'It\'s something. Is it enough?',
        
      },
    ],
    nextSceneId: 'layoff-7-campaign',
  },
];
