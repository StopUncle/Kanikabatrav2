// Art of Influence - Premium Course
// Master the architecture of psychological influence

import { Lesson } from './dark-psychology-101';

export const artOfInfluence: {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'vip';
  lessons: Lesson[];
} = {
  id: 'art-of-influence',
  title: 'The Art of Influence',
  description: 'Control is not something you take. It is something you build. Learn to construct systems of influence that make others want to do what you want them to do.',
  tier: 'premium',
  lessons: [
    {
      id: 'aoi-1',
      title: 'The Architecture of Control',
      duration: '11 min',
      content: [
        {
          type: 'text',
          content: 'Most people think control is about force, about dominance, about making someone do what you want through threats or intimidation. This is the thinking of amateurs. True control is invisible. It is the art of making someone want to do what you want them to do.',
        },
        {
          type: 'insight',
          content: 'The predator does not think in terms of feelings—she thinks in terms of systems. Every interaction, every conversation, every shared experience is a brick in the architecture you are building. The beauty of this architecture is that it is invisible, forged from the target\'s own hopes, fears, and desires.',
        },
        {
          type: 'list',
          content: 'The Three Pillars of Control:',
          items: [
            'Dependency: Creating neurochemical and emotional need for your presence and validation',
            'Scarcity: Positioning yourself as a rare, valuable resource that must be earned',
            'Reality Framing: Shaping how they interpret their world and their relationship with you',
          ],
        },
        {
          type: 'text',
          content: 'Each pillar reinforces the others, creating a self-sustaining system that becomes stronger over time. Your target does not just comply with your wishes—they become incapable of imagining life without you.',
        },
        {
          type: 'quote',
          content: '"Control is not something you take. It is something you build. Brick by brick, until your target finds themselves in a structure of your design—and thanking you for it."',
        },
        {
          type: 'tactic',
          content: 'An amateur thinks of control as isolated tactics. A master understands it is a holistic system where every element supports every other element. You are not executing random moves—you are constructing comprehensive architecture.',
        },
        {
          type: 'insight',
          content: 'True influence is invisible. The best control feels like the target\'s own idea. They think they are making choices—but you have constructed all the options they are choosing from.',
        },
      ],
      keyTakeaways: [
        'Control is built, not taken—think in systems, not isolated tactics',
        'Three pillars: dependency, scarcity, reality framing',
        'Each pillar reinforces the others in a self-sustaining loop',
        'True control is invisible—it feels like free choice',
        'You construct the options; they think they are choosing',
      ],
      exercise: {
        title: 'Architecture Mapping',
        description: 'Map the current control architecture in your key relationships.',
        steps: [
          'Choose one significant relationship to analyze',
          'Rate the dependency level 1-10: How much do they need you vs. how much do you need them?',
          'Rate your scarcity 1-10: How available and predictable are you?',
          'Rate your reality framing 1-10: Whose interpretation of events dominates?',
          'Identify the weakest pillar—this is where to focus',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'aoi-1-q1',
            question: 'What are the three pillars of control architecture?',
            options: [
              'Force, intimidation, and threats',
              'Dependency, scarcity, and reality framing',
              'Love, trust, and commitment',
              'Communication, attraction, and chemistry',
            ],
            correctIndex: 1,
            explanation: 'The three pillars are Dependency (creating emotional need), Scarcity (positioning as valuable), and Reality Framing (shaping interpretation). Each reinforces the others.',
          },
          {
            id: 'aoi-1-q2',
            question: 'According to this lesson, true control should feel like:',
            options: [
              'Obvious dominance',
              'Mutual partnership',
              'The target\'s own idea',
              'External pressure',
            ],
            correctIndex: 2,
            explanation: 'True influence is invisible. The best control feels like the target\'s own idea—they think they are making choices, but you have constructed all the options.',
          },
          {
            id: 'aoi-1-q3',
            question: 'An amateur approaches control with isolated tactics. A master approaches it as:',
            options: [
              'A game of chance',
              'A holistic system',
              'Emotional manipulation',
              'Pure intimidation',
            ],
            correctIndex: 1,
            explanation: 'A master understands control is a holistic system where every element supports every other element—not random isolated moves.',
          },
        ],
      },
    },
    {
      id: 'aoi-2',
      title: 'The Dopamine Cycle',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Dependency is not created through constant kindness. It is created through intermittent reinforcement—the same psychological principle that makes slot machines addictive. You are not a loving partner. You are a dopamine dealer, and your product is the most addictive drug on the planet: human validation.',
        },
        {
          type: 'list',
          content: 'The Three Phases of the Cycle:',
          items: [
            'Phase 1 - Flooding: Shower attention, affection, and validation. Create a baseline of intense pleasure they will spend the relationship trying to recapture.',
            'Phase 2 - Strategic Withdrawal: Become distant, preoccupied, emotionally unavailable. Create a vacuum where your affection used to be. Induce anxiety and desperation.',
            'Phase 3 - Intermittent Reward: After withdrawal, offer a small, unpredictable reward. A loving message. A moment of connection. The jackpot. Just enough to keep them hooked.',
          ],
        },
        {
          type: 'insight',
          content: 'The power is in the unpredictability. If they could predict when reward is coming, the addiction weakens. When rewards are random and infrequent, the craving intensifies. This is neuroscience, not cruelty.',
        },
        {
          type: 'tactic',
          content: 'Think of yourself as a variable ratio reinforcement schedule. Sometimes you respond immediately. Sometimes you wait hours. Sometimes you are warm. Sometimes you are cool. The variability is what creates the obsession.',
        },
        {
          type: 'text',
          content: 'The first phase creates the baseline—what they experienced with you at the beginning becomes the standard they spend the relationship trying to recapture. Every moment of withdrawal makes them remember the flood, and every small reward reminds them it is possible again.',
        },
        {
          type: 'quote',
          content: '"The intermittent reward is the jackpot, the moment the slot machine pays out. Just enough to keep them pulling the lever again and again."',
        },
        {
          type: 'list',
          content: 'Implementation Principles:',
          items: [
            'The initial flood must be intense enough to create strong memory anchors',
            'Withdrawal should be gradual enough not to trigger abandonment alarm',
            'Rewards must be unpredictable—never on a schedule they can anticipate',
            'Each reward should recreate glimpses of the flood phase',
            'The cycle should escalate subtly over time',
          ],
        },
      ],
      keyTakeaways: [
        'Dependency is created through intermittent, not constant, reward',
        'Three phases: flooding, withdrawal, intermittent reward',
        'Unpredictability is the engine of addiction',
        'The initial baseline becomes the standard they chase',
        'Variable reinforcement creates the strongest bonds',
      ],
      exercise: {
        title: 'The Reinforcement Audit',
        description: 'Analyze your current reward patterns and their effects.',
        steps: [
          'Review your communication patterns over the past week with someone important',
          'Are you too predictable? Too available? On a schedule?',
          'Identify moments where you could have created strategic withdrawal',
          'Plan one week of variable response timing—sometimes fast, sometimes slow',
          'Track their behavior changes as your pattern becomes less predictable',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'aoi-2-q1',
            question: 'Dependency is created through what type of reinforcement?',
            options: [
              'Constant positive reinforcement',
              'Immediate and predictable rewards',
              'Intermittent (unpredictable) reinforcement',
              'Negative reinforcement only',
            ],
            correctIndex: 2,
            explanation: 'Dependency is created through intermittent reinforcement—the same principle that makes slot machines addictive. Unpredictability intensifies craving.',
          },
          {
            id: 'aoi-2-q2',
            question: 'The purpose of Phase 1 (Flooding) is to:',
            options: [
              'Test their loyalty',
              'Create a baseline of pleasure they will chase',
              'Overwhelm them so they leave',
              'Show your authentic self',
            ],
            correctIndex: 1,
            explanation: 'Flooding creates a baseline of intense pleasure. What they experienced at the beginning becomes the standard they spend the relationship trying to recapture.',
          },
          {
            id: 'aoi-2-q3',
            question: 'Why does unpredictability strengthen the dopamine cycle?',
            options: [
              'It keeps them confused and off-balance',
              'If they could predict rewards, the addiction weakens',
              'It makes you seem mysterious',
              'Predictability is boring',
            ],
            correctIndex: 1,
            explanation: 'When rewards are random and infrequent, craving intensifies. Predictable rewards weaken the addiction because the anticipation is gone.',
          },
        ],
      },
    },
    {
      id: 'aoi-3',
      title: 'The Economics of Scarcity',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Scarcity creates value. This is fundamental economics, and it applies to relationships exactly as it applies to luxury goods. You must position yourself as a scarce resource—a luxury item that they are fortunate to have. This is achieved by controlling three commodities: time, attention, and access.',
        },
        {
          type: 'list',
          content: 'The Three Scarcity Levers:',
          items: [
            'Scarcity of Time: You are busy, important. Your time is valuable. You cannot be available whenever they want. Your unavailability makes the time you spend together more precious.',
            'Scarcity of Attention: In the modern world, attention is the ultimate currency. Be a miser with your attention. Delayed, unpredictable responses. Make them work for it.',
            'Scarcity of Access: Your inner world, your vulnerability, your authentic self—these are not free. They are earned through demonstrated investment and loyalty.',
          ],
        },
        {
          type: 'insight',
          content: 'The person who has your full, undivided attention should feel like they have won the lottery. If your attention is constantly available, it becomes worthless. What is given freely is valued accordingly.',
        },
        {
          type: 'tactic',
          content: 'Do not always answer the phone. Let responses be delayed. Do not explain your absences unless strategically beneficial. "I was busy" is a complete sentence. Mystery enhances scarcity.',
        },
        {
          type: 'list',
          content: 'Advanced Scarcity Tactics:',
          items: [
            'The Cancellation: Never flake—cancel with a good reason. This creates sympathy, not resentment, and makes the rescheduled time more valuable.',
            'The Timed Withdrawal: Random 24-hour periods of minimal contact with no explanation. Creates anxiety without confrontation.',
            'The Attention Lottery: Periods of intense focus followed by periods of scarcity. They never know which version they will get.',
          ],
        },
        {
          type: 'quote',
          content: '"You are the jackpot, and they are the gambler. Sometimes you pay out. Sometimes you do not. The uncertainty is what keeps them playing."',
        },
        {
          type: 'text',
          content: 'Scarcity should not feel manufactured—it should feel like the natural result of your high-value life. You are not playing games. You genuinely have priorities, commitments, and a life that does not revolve around any single person.',
        },
      ],
      keyTakeaways: [
        'Value is determined by scarcity—control yours deliberately',
        'Three levers: time, attention, and access',
        'Your attention is currency—spend it strategically',
        'Scarcity should feel organic, not manufactured',
        'What is easily obtained is rarely valued',
      ],
      exercise: {
        title: 'Scarcity Positioning',
        description: 'Assess and adjust your current scarcity positioning.',
        steps: [
          'Track your average response time to messages over the past week',
          'Count how many times you were immediately available when asked',
          'Identify one relationship where you are too abundant',
          'Implement a scarcity adjustment: longer response times, fewer initiated contacts',
          'Note changes in how they pursue your attention over two weeks',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'aoi-3-q1',
            question: 'What are the three scarcity levers?',
            options: [
              'Money, status, and looks',
              'Time, attention, and access',
              'Love, trust, and commitment',
              'Intelligence, humor, and kindness',
            ],
            correctIndex: 1,
            explanation: 'The three scarcity levers are Time (being busy and important), Attention (being selective), and Access (your inner world is earned, not given freely).',
          },
          {
            id: 'aoi-3-q2',
            question: 'According to scarcity economics, constant availability signals:',
            options: [
              'High dedication and love',
              'Relationship readiness',
              'Low perceived value',
              'Emotional maturity',
            ],
            correctIndex: 2,
            explanation: 'What is given freely is valued accordingly. If your attention is constantly available, it becomes worthless. The busy person is always more attractive.',
          },
          {
            id: 'aoi-3-q3',
            question: 'Why should scarcity feel organic rather than manufactured?',
            options: [
              'So they don\'t get angry',
              'Because games are immature',
              'It should seem like natural result of a high-value life',
              'Manufactured scarcity doesn\'t work',
            ],
            correctIndex: 2,
            explanation: 'Scarcity should feel like the natural result of your high-value life—you genuinely have priorities and commitments, not playing obvious games.',
          },
        ],
      },
    },
    {
      id: 'aoi-4',
      title: 'Strategic Withdrawal',
      duration: '9 min',
      content: [
        {
          type: 'text',
          content: 'Strategic withdrawal is not punishment—it is positioning. It is removing your presence to remind someone of its value. Most people fear that withdrawal will push someone away. The opposite is true. Withdrawal, executed correctly, pulls them closer.',
        },
        {
          type: 'list',
          content: 'Types of Strategic Withdrawal:',
          items: [
            'Emotional Withdrawal: Become slightly cooler, less engaged, more distracted. You are present but not fully present.',
            'Communication Withdrawal: Reduce frequency and warmth of messages. Shorter responses. Longer gaps.',
            'Physical Withdrawal: Less available for plans. Busier schedule. Other commitments take precedence.',
            'Complete Withdrawal: The nuclear option—full silence for a defined period. Use sparingly but decisively.',
          ],
        },
        {
          type: 'insight',
          content: 'The key is that withdrawal must be unexplained. The moment you explain or justify your absence, you give away the power. Let them wonder. Let them create their own narrative. Their imagination will do more work than your words ever could.',
        },
        {
          type: 'tactic',
          content: 'After a period of withdrawal, do not apologize or explain when you return. Simply re-engage as if nothing happened. This teaches them that your absence is a fact of life, not a negotiable situation. Your presence is a privilege, not an entitlement.',
        },
        {
          type: 'text',
          content: 'Timing is critical. Withdraw when things are going well, not when there is conflict. Withdrawing during conflict looks like sulking. Withdrawing during good times looks like mysterious confidence—you have something more important to attend to.',
        },
        {
          type: 'quote',
          content: '"Your silence is more terrifying than your anger. Your absence more powerful than your presence. They must learn that the price of your displeasure is the one thing they fear most: your disappearance."',
        },
        {
          type: 'list',
          content: 'Withdrawal Recovery:',
          items: [
            'Return without explanation or apology',
            'Be warm but not excessively so—do not overcompensate',
            'Let them express relief at your return without acknowledging it directly',
            'Resume normal patterns, establishing the withdrawal as an accepted reality',
            'The cycle continues—but now they know you can disappear',
          ],
        },
      ],
      keyTakeaways: [
        'Withdrawal reminds others of your value—absence creates longing',
        'Never explain or justify the withdrawal',
        'Withdraw during good times, not during conflict',
        'Return without apology—your presence is a gift',
        'Once they know you can disappear, they cling tighter',
      ],
      exercise: {
        title: 'Strategic Withdrawal Plan',
        description: 'Design and execute a strategic withdrawal.',
        steps: [
          'Identify a relationship where you want to increase your value positioning',
          'Choose the type of withdrawal appropriate to the situation',
          'Set a specific duration (24 hours minimum for meaningful effect)',
          'Execute without explanation—resist the urge to check in or explain',
          'Return and resume normally. Note changes in their pursuit behavior.',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'aoi-4-q1',
            question: 'When should you strategically withdraw?',
            options: [
              'During arguments and conflict',
              'When things are going well',
              'After they hurt you',
              'When you feel insecure',
            ],
            correctIndex: 1,
            explanation: 'Withdraw when things are going well, not during conflict. Withdrawing during conflict looks like sulking. Withdrawing during good times looks like mysterious confidence.',
          },
          {
            id: 'aoi-4-q2',
            question: 'How should you return after a strategic withdrawal?',
            options: [
              'With an apology and explanation',
              'Acting cold and distant',
              'Simply re-engage as if nothing happened',
              'By confronting them about their behavior',
            ],
            correctIndex: 2,
            explanation: 'Return without explanation or apology. Simply resume normally. This teaches them your absence is a fact of life, not negotiable. Your presence is a privilege.',
          },
          {
            id: 'aoi-4-q3',
            question: 'Why must withdrawal remain unexplained?',
            options: [
              'To seem mysterious',
              'Because explaining gives away the power',
              'Explanations are boring',
              'It saves time',
            ],
            correctIndex: 1,
            explanation: 'The moment you explain or justify your absence, you give away the power. Let them wonder—their imagination will do more work than your words ever could.',
          },
        ],
      },
    },
    {
      id: 'aoi-5',
      title: 'The Rotation System',
      duration: '11 min',
      content: [
        {
          type: 'text',
          content: 'Maintaining multiple options simultaneously ensures you never find yourself emotionally or practically dependent on any single person. While they keep their options open—and make no mistake, they do—you will be doing the same, but with strategic precision.',
        },
        {
          type: 'insight',
          content: 'The person who needs the interaction less controls the interaction more. This is not about deception—it is about maintaining leverage. The moment you become exclusive with someone who has not fully committed to you, you lose all negotiating power.',
        },
        {
          type: 'list',
          content: 'The Rotation Structure:',
          items: [
            'The Primary: Your highest-value prospect. Receives majority of attention but never all of it. Position is earned, not guaranteed.',
            'The Backup: Genuinely interested, would step into primary role if needed. Your insurance against heartbreak.',
            'The Entertainer: Provides excitement and social stimulation without serious evaluation pressure.',
            'The Resource: Provides practical benefits—connections, opportunities, status elevation.',
          ],
        },
        {
          type: 'tactic',
          content: 'Never abandon the rotation the moment you feel a spark. That is precisely when it is most important. When you are developing feelings, you are most vulnerable to emotional decisions that undermine your position. The rotation protects you.',
        },
        {
          type: 'list',
          content: 'Benefits of the Rotation:',
          items: [
            'Abundance Mindset: Never desperate or needy because you have options',
            'Competition Anxiety: When they know they are not the only one, they work harder',
            'Emotional Protection: One disappointment cannot devastate you',
            'Leverage Maintenance: You maintain negotiating position until full commitment',
          ],
        },
        {
          type: 'text',
          content: 'Compartmentalization is essential. When you are with one, the others do not exist. You are fully present, analyzing, assessing—but emotionally unattached. This is not emotional multitasking. It is emotional compartmentalization.',
        },
        {
          type: 'quote',
          content: '"You are building an empire, not collecting bodies. Each person in your rotation serves a strategic purpose. When they stop serving that purpose, they are gracefully removed."',
        },
      ],
      keyTakeaways: [
        'Multiple options ensure you never become dependent',
        'Four roles: primary, backup, entertainer, resource',
        'The rotation is most important when you catch feelings',
        'Competition increases their effort and investment',
        'Compartmentalize—when with one, others do not exist',
      ],
      exercise: {
        title: 'Rotation Assessment',
        description: 'Design or evaluate your current rotation system.',
        steps: [
          'Map your current social/romantic landscape against the four roles',
          'Identify which roles are unfilled or underdeveloped',
          'Rate your emotional attachment to each person 1-10',
          'Note where you have become too invested in a single option',
          'Create a plan to build genuine abundance, not manufactured scarcity',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'aoi-5-q1',
            question: 'What are the four roles in the rotation system?',
            options: [
              'Lover, friend, family, colleague',
              'Primary, backup, entertainer, resource',
              'Hot, warm, cold, dormant',
              'New, developing, committed, exiting',
            ],
            correctIndex: 1,
            explanation: 'The four roles are: Primary (highest value), Backup (insurance), Entertainer (excitement), and Resource (practical benefits). Each serves a strategic purpose.',
          },
          {
            id: 'aoi-5-q2',
            question: 'When is the rotation system MOST important to maintain?',
            options: [
              'When you are single and searching',
              'When you feel bored with dating',
              'When you start developing feelings',
              'When you are fully committed',
            ],
            correctIndex: 2,
            explanation: 'The rotation is most important when you catch feelings—that is precisely when you are most vulnerable to emotional decisions that undermine your position.',
          },
          {
            id: 'aoi-5-q3',
            question: 'What is the key mindset when interacting with someone in your rotation?',
            options: [
              'Be distracted thinking about others',
              'Be fully present—compartmentalize',
              'Compare them to other options',
              'Keep checking your phone',
            ],
            correctIndex: 1,
            explanation: 'Compartmentalization is essential. When you are with one, the others do not exist. You are fully present, analyzing, assessing—but emotionally unattached.',
          },
        ],
      },
    },
    {
      id: 'aoi-6',
      title: 'Reality Framing',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Reality framing is the mortar that holds the bricks of your influence together. It is the narrative that justifies dependency, explains scarcity, and makes everything feel like the natural order of things. Whoever controls the narrative controls the relationship.',
        },
        {
          type: 'insight',
          content: 'The target tells themselves a story to make sense of their situation. Your job is to be the author of that story. When done correctly, they do not feel controlled—they feel understood, they feel connected, they feel like this is exactly what they wanted.',
        },
        {
          type: 'list',
          content: 'Framing Techniques:',
          items: [
            'Preframing: Establish the interpretation before the event. "This will be challenging but worth it" frames difficulty as meaningful.',
            'Reframing: When reality contradicts their expectations, provide new interpretation. Turn your withdrawal into "giving them space."',
            'Future Framing: Describe the future you want as if it is inevitable. "When we..." not "If we..."',
            'Identity Framing: Position them as the kind of person who does what you want. "You seem like someone who values..."',
          ],
        },
        {
          type: 'tactic',
          content: 'When confronted about behavior, do not get defensive—get confused. "What are you talking about? That is not what happened." Make them doubt their perception. You are not lying—you are offering an alternative interpretation that serves you.',
        },
        {
          type: 'text',
          content: 'The Frog in Boiling Water principle applies here. Framing shifts must be gradual, imperceptible. Each individual reframe should be small enough to be accepted. It is only in aggregate that the new reality becomes clear—but by then, it is simply how things are.',
        },
        {
          type: 'list',
          content: 'Reality Anchoring:',
          items: [
            'Establish yourself as the calm, stable one—the arbiter of what is reasonable',
            'When they get emotional, remain detached—this positions you as the rational party',
            'Reference shared experiences with your interpretation already embedded',
            'Create "remember when" moments that reinforce your narrative',
            'Their reality gradually aligns with yours because yours is always presented as obvious',
          ],
        },
        {
          type: 'quote',
          content: '"The most effective prisons are the ones we build for ourselves. The strongest bars are not made of iron—they are made of stories we tell ourselves about why we must stay."',
        },
      ],
      keyTakeaways: [
        'Whoever controls the narrative controls the relationship',
        'Four framing techniques: pre, re, future, and identity framing',
        'Changes must be gradual enough to be imperceptible',
        'Position yourself as the calm, rational arbiter of reality',
        'Their reality slowly aligns with the story you are writing',
      ],
      exercise: {
        title: 'Narrative Control Practice',
        description: 'Practice deliberate reality framing in a low-stakes situation.',
        steps: [
          'Choose an upcoming interaction where you want a specific outcome',
          'Write out the narrative you want them to accept',
          'Identify three specific phrases that embed your frame (preframing)',
          'Prepare one reframe for a likely objection',
          'Execute and note how the frame shaped the conversation',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'aoi-6-q1',
            question: 'What are the four framing techniques?',
            options: [
              'Blaming, shaming, deflecting, ignoring',
              'Pre, re, future, and identity framing',
              'Emotional, logical, social, practical',
              'Direct, indirect, subtle, overt',
            ],
            correctIndex: 1,
            explanation: 'The four techniques are: Preframing (establish interpretation before event), Reframing (provide new interpretation), Future Framing (describe future as inevitable), and Identity Framing (position them as someone who does what you want).',
          },
          {
            id: 'aoi-6-q2',
            question: 'The "Frog in Boiling Water" principle means:',
            options: [
              'Act fast before they catch on',
              'Make changes gradual and imperceptible',
              'Increase pressure until they comply',
              'Test their limits aggressively',
            ],
            correctIndex: 1,
            explanation: 'Framing shifts must be gradual and imperceptible. Each individual reframe should be small enough to accept. Only in aggregate does the new reality become clear—by then, it is simply how things are.',
          },
          {
            id: 'aoi-6-q3',
            question: 'When confronted about your behavior, you should:',
            options: [
              'Apologize and explain yourself',
              'Get defensive and argue',
              'Get confused and offer alternative interpretation',
              'Admit everything and promise to change',
            ],
            correctIndex: 2,
            explanation: 'Do not get defensive—get confused. "That is not what happened." You are not lying—you are offering an alternative interpretation that serves you. Position yourself as the calm, rational arbiter of reality.',
          },
        ],
      },
    },
  ],
};
