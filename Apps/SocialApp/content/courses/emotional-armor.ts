// Emotional Armor - Premium Course
// Build psychological resilience and protect yourself from manipulation

import { Lesson } from './dark-psychology-101';

export const emotionalArmor: {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'vip';
  lessons: Lesson[];
} = {
  id: 'emotional-armor',
  title: 'Emotional Armor',
  description: 'Build unshakeable psychological resilience. Learn to recognize manipulation, set bulletproof boundaries, and protect your emotional wellbeing in any situation.',
  tier: 'premium',
  lessons: [
    {
      id: 'ea-1',
      title: 'Understanding Your Vulnerabilities',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'The first step to building emotional armor is understanding exactly where you\'re vulnerable. Self-awareness isn\'t weakness—it\'s the foundation of all psychological strength. You cannot protect what you don\'t understand.',
        },
        {
          type: 'insight',
          content: 'Your greatest strengths are often your greatest vulnerabilities from a different angle. The compassionate are easily guilted. The loyal are easily exploited. The ambitious are easily manipulated through flattery.',
        },
        {
          type: 'list',
          content: 'Common Vulnerability Patterns:',
          items: [
            'Validation Seeking: Needing external approval to feel okay',
            'People Pleasing: Prioritizing others\' comfort over your own needs',
            'Fear of Abandonment: Tolerating poor treatment to keep someone close',
            'Savior Complex: Feeling responsible for "fixing" others',
            'Conflict Avoidance: Sacrificing truth for temporary peace',
            'Perfectionism: Believing you must be flawless to be loved',
          ],
        },
        {
          type: 'text',
          content: 'How Vulnerabilities Get Exploited:',
        },
        {
          type: 'list',
          content: 'Manipulators probe for your specific pattern:',
          items: [
            'The insecure are controlled through conditional validation',
            'The guilt-prone are controlled through manufactured crises',
            'The fearful are controlled through threats of abandonment',
            'The vain are controlled through strategic admiration',
            'The saviors are controlled by playing victim',
          ],
        },
        {
          type: 'warning',
          content: 'Knowing your vulnerabilities doesn\'t mean eliminating them—it means building awareness and protective strategies around them.',
        },
      ],
      keyTakeaways: [
        'Self-awareness is the foundation of protection',
        'Everyone has vulnerability patterns',
        'Manipulators probe for and exploit specific patterns',
        'Awareness itself is protective',
      ],
      exercise: {
        title: 'Vulnerability Mapping',
        description: 'Create a detailed map of your personal vulnerability patterns.',
        steps: [
          'Review the vulnerability patterns listed above',
          'Identify your top 2-3 patterns (be brutally honest)',
          'For each, write one specific example of when it was exploited',
          'Identify the "hook"—what need was being targeted?',
          'Write one protective strategy for each vulnerability',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'ea-1-q1',
            question: 'According to this lesson, your greatest strengths are often:',
            options: [
              'Your best protection',
              'Your greatest vulnerabilities from a different angle',
              'What attract manipulators',
              'What you should hide',
            ],
            correctIndex: 1,
            explanation: 'Your greatest strengths are often your greatest vulnerabilities from a different angle. The compassionate are easily guilted. The loyal are easily exploited.',
          },
          {
            id: 'ea-1-q2',
            question: 'How do manipulators control someone with a "savior complex"?',
            options: [
              'Through threats of abandonment',
              'Through strategic admiration',
              'By playing victim',
              'Through conditional validation',
            ],
            correctIndex: 2,
            explanation: 'Saviors are controlled by people who play victim. The savior feels responsible for "fixing" them, and the manipulator exploits this need.',
          },
          {
            id: 'ea-1-q3',
            question: 'The purpose of knowing your vulnerabilities is to:',
            options: [
              'Eliminate them completely',
              'Hide them from everyone',
              'Build awareness and protective strategies around them',
              'Use them against others',
            ],
            correctIndex: 2,
            explanation: 'Knowing your vulnerabilities doesn\'t mean eliminating them—it means building awareness and protective strategies around them.',
          },
        ],
      },
    },
    {
      id: 'ea-2',
      title: 'The Anatomy of Manipulation',
      duration: '12 min',
      content: [
        {
          type: 'text',
          content: 'Manipulation is the covert attempt to influence your behavior without your awareness or genuine consent. Understanding its structure helps you recognize it before you\'re caught in its web.',
        },
        {
          type: 'list',
          content: 'The Manipulation Cycle:',
          items: [
            'Phase 1 - Love Bombing: Overwhelming positive attention creates dependency',
            'Phase 2 - Devaluation: Gradual withdrawal creates anxiety and need',
            'Phase 3 - Intermittent Reinforcement: Unpredictable rewards create addiction',
            'Phase 4 - Control: Your behavior becomes shaped by avoiding punishment',
          ],
        },
        {
          type: 'insight',
          content: 'This cycle mirrors how addiction works. The unpredictability is the key—it\'s the same psychology that makes gambling addictive.',
        },
        {
          type: 'list',
          content: 'Gaslighting Indicators:',
          items: [
            '"You\'re imagining things" - Denying your perceptions',
            '"That never happened" - Rewriting shared history',
            '"You\'re too sensitive" - Invalidating your feelings',
            '"No one else thinks that" - Isolating your perspective',
            '"You\'re crazy" - Attacking your mental stability',
          ],
        },
        {
          type: 'list',
          content: 'Guilt-Trip Indicators:',
          items: [
            '"After all I\'ve done for you"',
            '"I sacrificed so much"',
            '"If you really loved me, you would..."',
            '"You always disappoint me"',
            '"I thought I could count on you"',
          ],
        },
        {
          type: 'list',
          content: 'Fear-Based Control Indicators:',
          items: [
            '"If you don\'t do this, I\'ll..."',
            '"You\'ll regret this"',
            '"This is your last chance"',
            '"Everyone will know"',
            '"You have no other options"',
          ],
        },
      ],
      keyTakeaways: [
        'Manipulation follows predictable patterns',
        'The unpredictability is what creates psychological dependency',
        'Gaslighting attacks your perception of reality',
        'Recognition is the first step to protection',
      ],
      exercise: {
        title: 'Pattern Recognition Review',
        description: 'Review a past or current relationship for manipulation patterns.',
        steps: [
          'Think of a relationship that has felt confusing or emotionally volatile',
          'Map it against the manipulation cycle—can you identify the phases?',
          'Note any gaslighting, guilt-tripping, or fear-based language used',
          'Document specific quotes or incidents',
          'Share this analysis with a trusted friend for outside perspective',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'ea-2-q1',
            question: 'Which phrase is a classic gaslighting indicator?',
            options: [
              '"I need some space"',
              '"That never happened"',
              '"I disagree with you"',
              '"Let me think about it"',
            ],
            correctIndex: 1,
            explanation: '"That never happened" is gaslighting—rewriting shared history to make you doubt your own memory and perception.',
          },
          {
            id: 'ea-2-q2',
            question: 'What makes the manipulation cycle psychologically addictive?',
            options: [
              'Constant positive reinforcement',
              'Clear expectations',
              'Intermittent, unpredictable rewards',
              'Logical reasoning',
            ],
            correctIndex: 2,
            explanation: 'The unpredictability creates addiction—the same psychology that makes gambling addictive. You never know when the "reward" (kindness) will return.',
          },
          {
            id: 'ea-2-q3',
            question: '"After all I\'ve done for you" is an example of:',
            options: [
              'Gaslighting',
              'Fear-based control',
              'Guilt-tripping',
              'Honest feedback',
            ],
            correctIndex: 2,
            explanation: 'This phrase is classic guilt-tripping—designed to make you feel obligated through accumulated "debt" you supposedly owe them.',
          },
        ],
      },
    },
    {
      id: 'ea-3',
      title: 'Building Bulletproof Boundaries',
      duration: '11 min',
      content: [
        {
          type: 'text',
          content: 'Boundaries are not walls—they\'re doors with locks. They allow connection while protecting your wellbeing. Many people struggle with boundaries because they confuse them with rejection or cruelty. They are neither.',
        },
        {
          type: 'quote',
          content: '"Daring to set boundaries is about having the courage to love ourselves, even when we risk disappointing others." — Brené Brown',
        },
        {
          type: 'list',
          content: 'What Boundaries Actually Are:',
          items: [
            'Statements about what you will and won\'t accept',
            'Consequences you enforce for violations',
            'Self-care, not punishment of others',
            'Consistent across situations and people',
            'Non-negotiable limits for your wellbeing',
          ],
        },
        {
          type: 'list',
          content: 'What Boundaries Are NOT:',
          items: [
            'Ultimatums or threats',
            'Attempts to control others\' behavior',
            'Punishments for disagreement',
            'Negotiable based on the other person\'s reaction',
            'Optional when inconvenient',
          ],
        },
        {
          type: 'insight',
          content: 'A boundary is not about changing someone else\'s behavior—it\'s about deciding what you will do if certain behaviors occur.',
        },
        {
          type: 'list',
          content: 'The Boundary Formula:',
          items: [
            '"When you [specific behavior]..."',
            '"I feel [impact on you]..."',
            '"I need [what you need]..."',
            '"If this continues, I will [consequence you control]..."',
            'Then enforce consistently without drama',
          ],
        },
        {
          type: 'warning',
          content: 'The hardest part isn\'t setting boundaries—it\'s enforcing them when tested. And they will be tested.',
        },
      ],
      keyTakeaways: [
        'Boundaries are self-care, not cruelty',
        'Focus on what you will do, not what they should do',
        'Consistency is essential—one exception resets to zero',
        'Healthy people respect boundaries; manipulators test them',
      ],
      exercise: {
        title: 'Boundary Building',
        description: 'Design and prepare to implement one new boundary.',
        steps: [
          'Identify one situation where you consistently feel drained or violated',
          'Write the specific behavior that crosses your line',
          'Define the consequence you will enforce (something YOU control)',
          'Script how you will communicate this boundary using the formula',
          'Prepare for pushback—what will you say when tested?',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'ea-3-q1',
            question: 'A boundary is NOT:',
            options: [
              'A statement about what you will accept',
              'Consistent across situations',
              'An attempt to control someone else\'s behavior',
              'Self-care for your wellbeing',
            ],
            correctIndex: 2,
            explanation: 'A boundary is NOT about controlling others\' behavior—it\'s about deciding what YOU will do if certain behaviors occur.',
          },
          {
            id: 'ea-3-q2',
            question: 'When you set a boundary and it gets tested, you should:',
            options: [
              'Make an exception to keep the peace',
              'Enforce it consistently without drama',
              'Explain yourself until they understand',
              'Apologize for being difficult',
            ],
            correctIndex: 1,
            explanation: 'The hardest part isn\'t setting boundaries—it\'s enforcing them when tested. Consistency is essential—one exception resets to zero.',
          },
          {
            id: 'ea-3-q3',
            question: 'How do healthy people and manipulators differ in their response to boundaries?',
            options: [
              'Healthy people ignore them, manipulators respect them',
              'Healthy people respect them, manipulators test them',
              'Both respect boundaries equally',
              'Both test boundaries equally',
            ],
            correctIndex: 1,
            explanation: 'Healthy people respect boundaries; manipulators test them. A boundary\'s first test is actually diagnostic—it tells you who you\'re dealing with.',
          },
        ],
      },
    },
    {
      id: 'ea-4',
      title: 'The Power of Strategic Detachment',
      duration: '9 min',
      content: [
        {
          type: 'text',
          content: 'Strategic detachment is the ability to observe without being consumed. It\'s caring without being controlled, engaging without being enmeshed. This is not coldness—it\'s clarity.',
        },
        {
          type: 'list',
          content: 'Signs You\'re Too Enmeshed:',
          items: [
            'Their mood controls your mood',
            'You can\'t enjoy yourself if they\'re unhappy',
            'Their opinion of you determines your self-worth',
            'You feel responsible for their emotions',
            'You can\'t separate their problems from your problems',
          ],
        },
        {
          type: 'insight',
          content: 'You can love someone deeply while recognizing that their emotions, choices, and reactions are not your responsibility.',
        },
        {
          type: 'list',
          content: 'Practicing Strategic Detachment:',
          items: [
            'Pause before reacting to emotional provocations',
            'Ask: "Is this my problem to solve, or theirs?"',
            'Let uncomfortable silences exist without filling them',
            'Allow others to experience consequences of their choices',
            'Maintain your own emotional baseline regardless of external chaos',
          ],
        },
        {
          type: 'text',
          content: 'The 24-Hour Rule:',
        },
        {
          type: 'list',
          content: 'For important emotional decisions:',
          items: [
            'Don\'t respond to provocative messages immediately',
            'Sleep on major decisions before committing',
            'Write your response, then wait before sending',
            'Notice how your feelings change with time',
            'Clarity almost always comes with distance',
          ],
        },
      ],
      keyTakeaways: [
        'Detachment is clarity, not coldness',
        'Their emotions are not your responsibility',
        'Time and distance create perspective',
        'Pause before reacting to provocations',
      ],
      exercise: {
        title: 'Detachment Practice',
        description: 'Practice strategic detachment in an emotionally charged situation.',
        steps: [
          'Identify a relationship where you tend to get enmeshed',
          'The next time something emotionally provocative happens, pause',
          'Before responding, write: "This is their emotion, not my emergency"',
          'Wait at least 2 hours before responding',
          'Notice the difference in your response compared to your initial reaction',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'ea-4-q1',
            question: 'Strategic detachment means:',
            options: [
              'Not caring about anyone',
              'Being cold and unfeeling',
              'Observing without being consumed; caring without being controlled',
              'Avoiding all emotional situations',
            ],
            correctIndex: 2,
            explanation: 'Strategic detachment is caring without being controlled, engaging without being enmeshed. This is not coldness—it\'s clarity.',
          },
          {
            id: 'ea-4-q2',
            question: 'A sign you\'re too enmeshed in a relationship is:',
            options: [
              'You maintain your own hobbies',
              'Their mood controls your mood',
              'You sometimes disagree with them',
              'You have friends outside the relationship',
            ],
            correctIndex: 1,
            explanation: 'If their mood controls your mood, you can\'t enjoy yourself if they\'re unhappy, or their opinion determines your self-worth—you\'re too enmeshed.',
          },
          {
            id: 'ea-4-q3',
            question: 'The 24-Hour Rule suggests you should:',
            options: [
              'Respond immediately to show you care',
              'Wait before responding to emotional provocations or making major decisions',
              'Never talk about problems',
              'Sleep for 24 hours to avoid conflict',
            ],
            correctIndex: 1,
            explanation: 'Don\'t respond to provocative messages immediately. Sleep on major decisions. Clarity almost always comes with distance and time.',
          },
        ],
      },
    },
    {
      id: 'ea-5',
      title: 'Protecting Your Reality',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Gaslighting and reality distortion work by making you doubt your own perceptions. The antidote is becoming an unshakeable anchor for your own truth. This requires practices that reinforce your connection to reality.',
        },
        {
          type: 'list',
          content: 'Reality Anchors:',
          items: [
            'Documentation: Write things down as they happen',
            'Trusted perspectives: Maintain relationships outside the situation',
            'Physical evidence: Screenshots, emails, records',
            'Body awareness: Trust your gut feelings',
            'Pattern recognition: Look at aggregate behavior, not isolated incidents',
          ],
        },
        {
          type: 'insight',
          content: 'If you have to constantly convince yourself that a relationship is good, it probably isn\'t. Healthy relationships don\'t require reality maintenance.',
        },
        {
          type: 'list',
          content: 'Journaling for Reality Protection:',
          items: [
            'After significant interactions, write what happened',
            'Include exact quotes when possible',
            'Note how you felt during and after',
            'Document any attempts to rewrite the narrative later',
            'Review periodically to see patterns',
          ],
        },
        {
          type: 'warning',
          content: 'If someone makes you feel crazy for having reasonable perceptions, that itself is a massive red flag.',
        },
        {
          type: 'list',
          content: 'Phrases That Protect Your Reality:',
          items: [
            '"I trust my perception of what happened"',
            '"We can disagree about this, but I know what I experienced"',
            '"I don\'t need you to agree for my experience to be valid"',
            '"I\'m not going to debate my own feelings"',
            '"I\'ve documented this, and I trust my records"',
          ],
        },
      ],
      keyTakeaways: [
        'Document important interactions',
        'Maintain outside perspectives',
        'Trust your gut feelings',
        'You don\'t need others\' agreement for your reality to be valid',
      ],
      exercise: {
        title: 'Reality Journal',
        description: 'Start a reality protection journal for one relationship.',
        steps: [
          'Choose a relationship where you sometimes doubt yourself',
          'After each significant interaction, write: what happened, what was said, how you felt',
          'Include exact quotes when possible',
          'If they later describe events differently, note the discrepancy',
          'After one week, review for patterns',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'ea-5-q1',
            question: 'What is a "reality anchor" for protecting yourself from gaslighting?',
            options: [
              'A trusted friend who agrees with the manipulator',
              'Documentation, trusted outside perspectives, physical evidence',
              'Believing whatever keeps the peace',
              'Ignoring your gut feelings',
            ],
            correctIndex: 1,
            explanation: 'Reality anchors include: documentation, trusted perspectives outside the situation, physical evidence, body awareness (gut feelings), and pattern recognition.',
          },
          {
            id: 'ea-5-q2',
            question: 'If you constantly have to convince yourself a relationship is good, it:',
            options: [
              'Means you need to try harder',
              'Is completely normal',
              'Probably isn\'t good—healthy relationships don\'t require reality maintenance',
              'Means you\'re being too picky',
            ],
            correctIndex: 2,
            explanation: 'If you have to constantly convince yourself that a relationship is good, it probably isn\'t. Healthy relationships don\'t require reality maintenance.',
          },
          {
            id: 'ea-5-q3',
            question: 'Which phrase helps protect your reality when someone tries to rewrite events?',
            options: [
              '"Maybe you\'re right and I\'m wrong"',
              '"We can disagree, but I know what I experienced"',
              '"I\'m sorry for how I perceived things"',
              '"Let me check if others agree with you"',
            ],
            correctIndex: 1,
            explanation: 'Protective phrases like "We can disagree, but I know what I experienced" assert your reality without requiring agreement. You don\'t need their validation.',
          },
        ],
      },
    },
    {
      id: 'ea-6',
      title: 'The No-Apology Audit',
      duration: '7 min',
      content: [
        {
          type: 'text',
          content: 'Many people, especially those prone to guilt or people-pleasing, apologize compulsively. They apologize for their opinions, their needs, their existence. This habit signals vulnerability and invites exploitation.',
        },
        {
          type: 'list',
          content: 'Unnecessary Apologies:',
          items: [
            '"Sorry, but I think..." - Apologizing for having an opinion',
            '"Sorry to bother you" - Apologizing for existing',
            '"Sorry, can I just..." - Apologizing for having needs',
            '"Sorry if this is a stupid question" - Apologizing for learning',
            '"Sorry I can\'t" - Apologizing for boundaries',
          ],
        },
        {
          type: 'insight',
          content: 'Notice what you\'re really communicating: "I\'m not sure I have the right to speak, to need things, to set boundaries." This invites others to treat you accordingly.',
        },
        {
          type: 'list',
          content: 'Replace With:',
          items: [
            '"I think..." - Own your opinion',
            '"Excuse me" or just ask - You\'re not a burden',
            '"I need..." - State your needs clearly',
            '"I have a question" - Curiosity is strength',
            '"I can\'t" or "I won\'t" - Boundaries don\'t need apology',
          ],
        },
        {
          type: 'text',
          content: 'When TO Apologize:',
        },
        {
          type: 'list',
          content: 'Real apologies are for:',
          items: [
            'Genuine mistakes that hurt someone',
            'Breaking commitments you made',
            'Actual wrongdoing you\'re taking responsibility for',
            'NOT for having needs, opinions, or boundaries',
          ],
        },
      ],
      keyTakeaways: [
        'Compulsive apologizing signals vulnerability',
        'Stop apologizing for having needs or opinions',
        'Real apologies are for genuine wrongdoing',
        'Language shapes how others perceive and treat you',
      ],
      exercise: {
        title: 'The Apology Audit',
        description: 'Track and eliminate unnecessary apologies for one week.',
        steps: [
          'For one week, keep a tally every time you apologize',
          'Note what you were apologizing for',
          'Ask: Was this a genuine wrong, or am I apologizing for existing?',
          'Practice replacing unnecessary apologies with direct statements',
          'Notice how people respond differently to your directness',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'ea-6-q1',
            question: '"Sorry, but I think..." is an example of:',
            options: [
              'Polite communication',
              'Apologizing for having an opinion',
              'Proper boundary setting',
              'Assertive expression',
            ],
            correctIndex: 1,
            explanation: 'When you say "Sorry, but I think..." you\'re apologizing for having an opinion. Replace with simply "I think..." Own your thoughts.',
          },
          {
            id: 'ea-6-q2',
            question: 'Compulsive apologizing signals to others that you:',
            options: [
              'Are polite and considerate',
              'Respect their time',
              'Are not sure you have the right to speak, need, or set boundaries',
              'Have strong emotional intelligence',
            ],
            correctIndex: 2,
            explanation: 'Compulsive apologizing signals "I\'m not sure I have the right to speak, to need things, to set boundaries." This invites others to treat you accordingly.',
          },
          {
            id: 'ea-6-q3',
            question: 'Real apologies should be reserved for:',
            options: [
              'Having needs',
              'Expressing opinions others disagree with',
              'Setting boundaries that inconvenience others',
              'Genuine mistakes and wrongdoing that hurt someone',
            ],
            correctIndex: 3,
            explanation: 'Real apologies are for genuine mistakes that hurt someone, breaking commitments, and actual wrongdoing—NOT for having needs, opinions, or boundaries.',
          },
        ],
      },
    },
  ],
};
