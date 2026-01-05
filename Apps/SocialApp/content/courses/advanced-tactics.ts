// Advanced Tactics - VIP Course
// Strategic manipulation defense and power dynamics mastery

import { Lesson } from './dark-psychology-101';

export const advancedTactics: {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'vip';
  lessons: Lesson[];
} = {
  id: 'advanced-tactics',
  title: 'Advanced Tactics',
  description: 'Master the architecture of psychological control. Learn how manipulation systems work so you can recognize them, defend against them, and never be trapped.',
  tier: 'vip',
  lessons: [
    {
      id: 'at-1',
      title: 'The Architecture of Control',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Control is not something you take. It is something built—brick by brick, interaction by interaction—until the target finds themselves living in a prison of someone else\'s design. Understanding this architecture is the first step to never being trapped in one.',
        },
        {
          type: 'insight',
          content: 'The most effective prisons have invisible bars. They\'re built from hope, guilt, and obligation—not threats and force.',
        },
        {
          type: 'list',
          content: 'The Three Pillars of Control:',
          items: [
            'Dependency: Creating psychological and practical reliance',
            'Isolation: Cutting off outside perspectives and support',
            'Reality Distortion: Controlling how the target perceives their situation',
          ],
        },
        {
          type: 'text',
          content: 'These three pillars reinforce each other. The more isolated you become, the more dependent you are on one person. The more dependent you are, the more susceptible you are to their version of reality. The more distorted your reality, the harder it is to see the cage.',
        },
        {
          type: 'list',
          content: 'How Control Architectures Are Built:',
          items: [
            'Phase 1: Establish value and create positive associations',
            'Phase 2: Introduce small obligations and entanglements',
            'Phase 3: Gradually reduce outside connections',
            'Phase 4: Begin reframing reality through selective reinforcement',
            'Phase 5: Maintain through intermittent reward and uncertainty',
          ],
        },
        {
          type: 'warning',
          content: 'The "frog in boiling water" principle: If you try to build control too fast, alarms go off. Effective control is built so gradually that the target doesn\'t notice until it\'s too late.',
        },
      ],
      keyTakeaways: [
        'Control is systematically built, not forcefully taken',
        'Three pillars: dependency, isolation, reality distortion',
        'The pillars reinforce each other in a feedback loop',
        'Gradual construction prevents detection',
      ],
      exercise: {
        title: 'The Control Audit',
        description: 'Assess your relationships for control architecture elements.',
        steps: [
          'Choose one significant relationship to analyze',
          'Rate 1-10: How dependent are you on this person?',
          'Rate 1-10: How isolated has this relationship made you from others?',
          'Rate 1-10: How often do you question your own perception after talking to them?',
          'If any score is above 7, consider whether control dynamics exist',
        ],
      },
    },
    {
      id: 'at-2',
      title: 'The Dopamine Dealer',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Dependency is not created through constant kindness. It\'s created through intermittent reinforcement—the same psychological principle that makes slot machines addictive. The manipulator is not a loving partner; they\'re a dopamine dealer, and validation is their product.',
        },
        {
          type: 'list',
          content: 'The Intermittent Reinforcement Cycle:',
          items: [
            'Love Bombing: Initial flood of attention, affection, and validation',
            'Withdrawal: Gradual removal of positive attention with no explanation',
            'Anxiety: Target scrambles to understand what went wrong',
            'Intermittent Reward: Unpredictable return of affection',
            'Addiction: Target becomes hooked on chasing the "high" of phase one',
          ],
        },
        {
          type: 'insight',
          content: 'This is the exact mechanism behind gambling addiction. Variable reward schedules create stronger habits than consistent rewards. The unpredictability is what makes it impossible to quit.',
        },
        {
          type: 'list',
          content: 'Signs You\'re Being Intermittently Reinforced:',
          items: [
            'You feel anxiety when they don\'t respond, relief when they do',
            'You obsess over what you might have done wrong',
            'Their affection feels like winning a prize rather than a baseline',
            'You work harder to "earn" attention that used to be freely given',
            'The relationship feels like a roller coaster you can\'t get off',
          ],
        },
        {
          type: 'list',
          content: 'Breaking the Cycle:',
          items: [
            'Recognize the pattern—awareness itself is protective',
            'Refuse to change your behavior based on their withdrawal',
            'Maintain consistent boundaries regardless of their warmth or coldness',
            'Build multiple sources of validation (friends, achievements, self-worth)',
            'If the pattern persists, distance is the only cure',
          ],
        },
      ],
      keyTakeaways: [
        'Intermittent reinforcement creates addiction',
        'The unpredictability is what hooks you',
        'Awareness of the pattern begins to break it',
        'Multiple validation sources protect against dependency',
      ],
      exercise: {
        title: 'The Validation Inventory',
        description: 'Map your sources of validation and identify dependencies.',
        steps: [
          'List all sources of validation in your life (people, achievements, etc.)',
          'Rate each: How much of your self-worth depends on this source?',
          'Identify any single source that accounts for >50% of your validation',
          'If one exists, plan two ways to diversify your validation portfolio',
          'Track: When that source withdraws, how does your mood/behavior change?',
        ],
      },
    },
    {
      id: 'at-3',
      title: 'Psychological Cages',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Beyond the general architecture of control, manipulators build specific psychological cages tailored to their target\'s vulnerabilities. These cages exploit your strongest traits and deepest needs.',
        },
        {
          type: 'list',
          content: 'The Guilt Cage:',
          items: [
            'Built for: People with strong conscience and need to be "good"',
            'Method: Position yourself as perpetually suffering victim',
            'Trap: Every attempt to leave triggers guilt ("How could you abandon me?")',
            'Defense: Recognize that their wellbeing is not your responsibility',
            'Truth: Taking care of yourself is not cruelty—it\'s self-preservation',
          ],
        },
        {
          type: 'list',
          content: 'The Obligation Cage:',
          items: [
            'Built for: People with strong sense of duty and commitment',
            'Method: Create web of entanglements (shared finances, living, pets)',
            'Trap: Leaving requires dismantling entire life structure',
            'Defense: Maintain independent resources and connections',
            'Truth: Obligations should be mutual, not chains',
          ],
        },
        {
          type: 'list',
          content: 'The Triangulation Cage:',
          items: [
            'Built for: People with insecurity or fear of abandonment',
            'Method: Introduce real or imagined competition for your attention',
            'Trap: Constant anxiety keeps you focused on "winning" them',
            'Defense: Refuse to compete; your worth doesn\'t depend on comparison',
            'Truth: Someone who makes you compete is not a prize worth winning',
          ],
        },
        {
          type: 'warning',
          content: 'Most people don\'t realize they\'re in a cage until they try to leave. The bars only become visible when tested.',
        },
      ],
      keyTakeaways: [
        'Cages are built around specific vulnerabilities',
        'Guilt, obligation, and triangulation are common cage types',
        'The cage is often invisible until you try to leave',
        'Independence in resources and identity prevents cage construction',
      ],
      exercise: {
        title: 'The Cage Check',
        description: 'Assess whether you\'re in a psychological cage.',
        steps: [
          'Think of your most significant relationship',
          'Imagine clearly stating: "I\'m leaving." What happens in your mind?',
          'Note: What fears arise? Guilt? Logistical panic? Fear of retaliation?',
          'Identify: Which cage type (guilt, obligation, triangulation) resonates?',
          'Ask: Are these legitimate considerations or manufactured barriers?',
        ],
      },
    },
    {
      id: 'at-4',
      title: 'Breaking the Cycle',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Recognizing manipulation is only half the battle. Escaping it requires specific strategies that address both the psychological hooks and practical entanglements that keep people trapped.',
        },
        {
          type: 'list',
          content: 'The Reality Anchor:',
          items: [
            'Document everything: dates, events, exact quotes',
            'When your perception is questioned, check your records',
            'Maintain at least 2-3 outside perspectives you trust',
            'Regular reality checks: "Does this situation make sense to a neutral observer?"',
            'Trust behavioral patterns over words and promises',
          ],
        },
        {
          type: 'list',
          content: 'The Independence Protocol:',
          items: [
            'Maintain your own finances, even if shared accounts exist',
            'Keep friendships alive, even when discouraged from doing so',
            'Have a support system that exists outside the relationship',
            'Maintain skills, career, and identity independent of the relationship',
            'Know you can survive alone—this isn\'t pessimism, it\'s freedom',
          ],
        },
        {
          type: 'list',
          content: 'The Gray Rock Method:',
          items: [
            'When disengagement is needed, become boring and unresponsive',
            'Give short, neutral answers that provide no emotional fuel',
            'Don\'t defend, explain, or engage with provocations',
            'Become so uninteresting that manipulation isn\'t worth the effort',
            'Works best when you can\'t leave immediately (co-parenting, work)',
          ],
        },
        {
          type: 'insight',
          content: 'You don\'t have to prove manipulation happened to justify leaving. "This doesn\'t work for me" is a complete sentence.',
        },
      ],
      keyTakeaways: [
        'Documentation protects against gaslighting',
        'Independence prevents entrapment',
        'Gray rock starves manipulation of its fuel',
        'You don\'t need proof to justify leaving',
      ],
      exercise: {
        title: 'The Independence Inventory',
        description: 'Assess and strengthen your independence.',
        steps: [
          'Financial: Could you support yourself for 3 months independently?',
          'Social: Do you have 3+ close relationships outside this person?',
          'Identity: What activities/interests exist only for you?',
          'Practical: What would you need to leave tomorrow if necessary?',
          'Strengthen any area that scored weak',
        ],
      },
    },
    {
      id: 'at-5',
      title: 'The Scarcity Play',
      duration: '8 min',
      content: [
        {
          type: 'text',
          content: 'Scarcity creates value. This is economics, but it\'s also psychology. The person who controls the perception of scarcity—of their time, attention, and presence—holds power. Understanding this prevents you from being manipulated by manufactured scarcity.',
        },
        {
          type: 'list',
          content: 'How Scarcity Is Manufactured:',
          items: [
            'Artificial unavailability: Being "too busy" strategically',
            'Delayed responses: Creating anxiety through waiting',
            'Attention rationing: Making you earn what should be freely given',
            'Implied options: Suggesting competition without stating it',
            'Mysterious absences: Unexplained disappearances that create obsession',
          ],
        },
        {
          type: 'list',
          content: 'Signs You\'re Being Played by Scarcity:',
          items: [
            'You feel grateful for attention that should be baseline',
            'Their availability seems to decrease as your investment increases',
            'You\'re always the one reaching out, adjusting, accommodating',
            'Their time feels like a prize rather than a mutual exchange',
            'You\'ve noticed their "busy" patterns don\'t quite add up',
          ],
        },
        {
          type: 'insight',
          content: 'Genuine scarcity from a full life is attractive. Manufactured scarcity to create anxiety is manipulation. The difference is in the intent and the pattern.',
        },
        {
          type: 'list',
          content: 'Defending Against Scarcity Plays:',
          items: [
            'Have your own full life—you can\'t be starved if you\'re not hungry',
            'Match energy: If they\'re unavailable, so are you',
            'Refuse to chase—pursuit rewards the behavior',
            'Set deadlines: "Let me know by Friday or I\'ll make other plans"',
            'Trust actions over "I\'ve just been so busy" excuses',
          ],
        },
      ],
      keyTakeaways: [
        'Manufactured scarcity is different from genuine busy-ness',
        'Intent and pattern reveal manipulation',
        'Your own full life is the best defense',
        'Never chase attention that\'s being strategically withheld',
      ],
      exercise: {
        title: 'The Scarcity Audit',
        description: 'Analyze a relationship for scarcity dynamics.',
        steps: [
          'Choose a relationship where you often feel you\'re pursuing',
          'Track for 1 week: Who initiates? Who responds? How quickly?',
          'Note: Do their "busy" periods correlate with anything?',
          'Ask: Is this person genuinely busy or strategically unavailable?',
          'Experiment: Match their energy for one week and observe the shift',
        ],
      },
    },
    {
      id: 'at-6',
      title: 'Strategic Withdrawal',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'The power of absence is one of the most underrated tools in human dynamics. While manipulators use withdrawal punitively, understanding strategic withdrawal allows you to reclaim power, create space, and reset dynamics that have become unhealthy.',
        },
        {
          type: 'list',
          content: 'When to Withdraw:',
          items: [
            'When you\'re being taken for granted',
            'When your presence has become expected rather than valued',
            'When you need perspective that proximity prevents',
            'When engaging would reward bad behavior',
            'When you need to reclaim your emotional equilibrium',
          ],
        },
        {
          type: 'list',
          content: 'The Difference: Punitive vs. Strategic Withdrawal',
          items: [
            'Punitive: Silent treatment designed to cause pain and anxiety',
            'Strategic: Space taken for self-protection and clarity',
            'Punitive: Returns only when target has "earned" it through distress',
            'Strategic: Returns when you\'ve gained clarity, regardless of their state',
            'Punitive: Intent is control; Strategic: Intent is self-care',
          ],
        },
        {
          type: 'list',
          content: 'Executing Strategic Withdrawal:',
          items: [
            'Communicate clearly: "I need space to think" (no punishment frame)',
            'Set a timeframe if possible: "Let\'s talk in a few days"',
            'Use the time for genuine reflection, not manipulation',
            'Don\'t monitor their response—true withdrawal is complete',
            'Return when you have clarity, not when they\'ve suffered enough',
          ],
        },
        {
          type: 'insight',
          content: 'Sometimes the most powerful thing you can do is not be there. Your absence creates a space that forces reflection in ways your presence never could.',
        },
      ],
      keyTakeaways: [
        'Strategic withdrawal is for self-protection, not punishment',
        'Clear communication distinguishes it from silent treatment',
        'Use withdrawal time for genuine reflection',
        'Your absence can create more change than your presence',
      ],
      exercise: {
        title: 'The Withdrawal Reflection',
        description: 'Plan a healthy withdrawal in a dynamic that needs reset.',
        steps: [
          'Identify a relationship where you feel depleted or taken for granted',
          'Plan: What do you need space to figure out?',
          'Script: How will you communicate the withdrawal without punishment frame?',
          'Timeframe: How long do you need? (Start with 3-7 days)',
          'Commitment: What will you do with this time? (Journal, think, rest)',
        ],
      },
    },
    {
      id: 'at-7',
      title: 'The Beige Protocol',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Sometimes you need to exit a situation where dramatic departure would be costly—socially, professionally, or personally. The Beige Protocol is strategic disengagement that protects your reputation while creating distance.',
        },
        {
          type: 'insight',
          content: 'The goal of Beige is simple: become so unremarkable, so neutral, so boring that the other person loses interest naturally—while you remain completely blameless.',
        },
        {
          type: 'list',
          content: 'The Philosophy of Beige:',
          items: [
            'Drama feeds engagement—remove the drama',
            'Strong reactions are still connection—become unreactive',
            'Conflict creates stories they can tell—give them nothing to tell',
            'Boring is invisible—invisible is free',
            'Let them lose interest rather than pushing them away',
          ],
        },
        {
          type: 'list',
          content: 'Beige Tactics:',
          items: [
            'Respond with pleasant but empty answers ("That sounds nice")',
            'Develop interests that exclude them but seem innocent',
            'Become unavailable through legitimate commitments',
            'Remove emotional investment from interactions',
            'Let them feel like they\'re making the choice to disengage',
          ],
        },
        {
          type: 'list',
          content: 'When to Use Beige:',
          items: [
            'Leaving would create professional consequences',
            'Direct confrontation would be unsafe',
            'You share social circles that would be disrupted',
            'The person thrives on drama—any engagement feeds them',
            'You need to exit without being the "bad guy"',
          ],
        },
        {
          type: 'warning',
          content: 'Beige is not for everyone or every situation. Sometimes direct communication is better. Beige is for situations where direct disengagement would cost more than it\'s worth.',
        },
      ],
      keyTakeaways: [
        'Beige removes the drama that feeds engagement',
        'Let them lose interest rather than pushing away',
        'Pleasant but empty keeps you blameless',
        'Use when direct exit would be too costly',
      ],
      exercise: {
        title: 'The Beige Assessment',
        description: 'Evaluate whether Beige is appropriate for a situation.',
        steps: [
          'Identify a connection you want to reduce',
          'Assess: What would direct disengagement cost?',
          'Consider: Does this person thrive on drama/conflict?',
          'Plan: What beige responses could you give?',
          'Decide: Is Beige or direct communication more appropriate here?',
        ],
      },
    },
    {
      id: 'at-8',
      title: 'Becoming Unreadable',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'The ultimate defense against manipulation is becoming unreadable. When no one can see your cards, no one can play them against you. This isn\'t about being fake—it\'s about controlling what information you leak.',
        },
        {
          type: 'list',
          content: 'The Information Economy:',
          items: [
            'Every reaction reveals data about what affects you',
            'Manipulators probe for reactions to map vulnerabilities',
            'Strong emotions signal where you can be hooked',
            'Predictable responses make you controllable',
            'Information is only power when others don\'t have it',
          ],
        },
        {
          type: 'list',
          content: 'Building Your Mask Collection:',
          items: [
            'The Professional: Warm but boundaried, reveals nothing personal',
            'The Curious: Asks questions, deflects personal inquiries',
            'The Mirror: Reflects back what others project, remains undefined',
            'The Pleasant Wall: Agreeable surface, nothing penetrates',
            'The Authentic (selective): True self, shown only to trusted few',
          ],
        },
        {
          type: 'list',
          content: 'Tactical Opacity:',
          items: [
            'Pause before reacting—time kills revealing impulses',
            'Respond to provocation with mild curiosity, not defense',
            'Answer personal questions with questions',
            'Let silence speak rather than filling it with revelation',
            'Keep emotional extremes (highs and lows) private',
          ],
        },
        {
          type: 'insight',
          content: 'You don\'t have to be secretive to be unreadable. You just have to control the gap between your inner experience and your outer expression.',
        },
        {
          type: 'text',
          content: 'The goal isn\'t deception. It\'s agency—choosing what to reveal, to whom, and when. This is the difference between being transparent and being exploited.',
        },
      ],
      keyTakeaways: [
        'Reactions reveal vulnerability',
        'Masks are context-appropriate presentations, not lies',
        'Pause before reacting to maintain control',
        'Choose what to reveal rather than leaking information',
      ],
      exercise: {
        title: 'The Mask Inventory',
        description: 'Identify and refine your contextual presentations.',
        steps: [
          'List 5 different contexts you operate in (work, family, friends, etc.)',
          'For each, describe: How do you present? What do you reveal?',
          'Identify: Which context sees the most "real" you?',
          'Assess: Are there contexts where you reveal too much?',
          'Plan: What mask would be more appropriate in those contexts?',
        ],
      },
    },
  ],
};
