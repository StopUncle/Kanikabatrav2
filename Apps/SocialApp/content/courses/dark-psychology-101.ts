// Dark Psychology 101 - Free Course
// The Foundation: Master the fundamentals of psychological power

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: LessonContent[];
  keyTakeaways: string[];
  exercise?: Exercise;
  quiz?: Quiz;
}

export interface LessonContent {
  type: 'text' | 'quote' | 'list' | 'warning' | 'insight' | 'tactic';
  content: string;
  items?: string[];
}

export interface Exercise {
  title: string;
  description: string;
  steps: string[];
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const darkPsychology101: {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'premium' | 'vip';
  lessons: Lesson[];
} = {
  id: 'dark-psychology-101',
  title: 'Dark Psychology 101',
  description: 'Master the fundamentals of psychological power. Learn the operating system that separates those who control their reality from those who are controlled by it.',
  tier: 'free',
  lessons: [
    {
      id: 'dp101-1',
      title: 'The Doctrine of Cold',
      duration: '8 min',
      content: [
        {
          type: 'text',
          content: 'Most people navigate relationships in a fog of emotion—falling in love before assessing value, bonding before testing loyalty, giving everything before receiving anything. They operate on hope instead of strategy, and then wonder why they keep getting burned.',
        },
        {
          type: 'insight',
          content: 'The Doctrine of Cold is not about being cruel or heartless. It is about being strategic, calculated, and emotionally self-sufficient. It is the operating system of those who win.',
        },
        {
          type: 'text',
          content: 'While others are blinded by neurochemical reactions—oxytocin, dopamine, the whole cocktail designed to bond them to someone before they know if that person deserves it—you will learn to assess before you invest. To calculate before you fall. To strategize before you hope.',
        },
        {
          type: 'list',
          content: 'The Four Pillars of Cold:',
          items: [
            'Emotional Independence: You do not need anyone to complete you, validate you, or make you happy. Relationships enhance your life—they do not define it.',
            'Strategic Thinking: Every interaction is evaluated for its return on investment. Your time, energy, and attention have value. Spend them wisely.',
            'Controlled Vulnerability: You reveal only what serves your purpose. Your pain, fears, and insecurities are strategic weapons, not conversation starters.',
            'Calculated Detachment: You can walk away from anyone, at any time, without looking back. This is not cruelty—this is freedom.',
          ],
        },
        {
          type: 'quote',
          content: '"The absence of anxiety is a superpower. While others agonize over what might go wrong, we act with precision."',
        },
        {
          type: 'text',
          content: 'When others meet someone attractive, their internal monologue spirals: "Should I approach? What if they reject me? I\'ll look stupid." They choke. Their fear of judgment paralyzes them.',
        },
        {
          type: 'tactic',
          content: 'Your internal monologue is different: "Target identified. Approach executed. If not receptive, move on—nothing lost." You do not consider rejection because it is irrelevant. You do not feel the sting of disapproval because you do not value the approval of strangers.',
        },
        {
          type: 'text',
          content: 'This is your new operating system. You are no longer the one who gives everything and receives nothing. You are no longer the one who wonders why bad things keep happening to good people.',
        },
        {
          type: 'insight',
          content: 'You are the one who moves with intention now. And those who move with intention do not beg for scraps—they position themselves to receive what they deserve.',
        },
      ],
      keyTakeaways: [
        'Emotion clouds judgment—strategy creates outcomes',
        'Emotional independence is the foundation of all power',
        'Your attention and energy are finite resources with real value',
        'The ability to walk away is the ultimate leverage',
        'Assessment before investment prevents regret',
      ],
      exercise: {
        title: 'The Cold Audit',
        description: 'Evaluate your current relationships through the lens of the Doctrine of Cold.',
        steps: [
          'List your five most significant relationships (romantic, family, friends)',
          'For each, honestly answer: Am I investing more than I am receiving?',
          'Identify which relationships make you feel anxious vs. which make you feel valued',
          'Note any relationships where you cannot imagine walking away—these are your vulnerabilities',
          'Choose one relationship where you will practice strategic detachment this week',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'dp101-1-q1',
            question: 'According to the Doctrine of Cold, what is the foundation of all power in relationships?',
            options: [
              'Being more attractive than your partner',
              'Emotional independence',
              'Having more money',
              'Being more intelligent',
            ],
            correctIndex: 1,
            explanation: 'Emotional independence is the foundation—you do not need anyone to complete you, validate you, or make you happy.',
          },
          {
            id: 'dp101-1-q2',
            question: 'What gives you "the ultimate leverage" in any relationship?',
            options: [
              'Having insider information about them',
              'Being more physically attractive',
              'The ability to walk away at any time',
              'Having mutual friends on your side',
            ],
            correctIndex: 2,
            explanation: 'Calculated detachment—the ability to walk away from anyone, at any time, without looking back—is true freedom and ultimate leverage.',
          },
          {
            id: 'dp101-1-q3',
            question: 'Why do most people "keep getting burned" in relationships according to this lesson?',
            options: [
              'They are not attractive enough',
              'They operate on hope instead of strategy',
              'They date the wrong type of person',
              'They move too slowly',
            ],
            correctIndex: 1,
            explanation: 'Most people navigate relationships in a fog of emotion—falling in love before assessing value, bonding before testing loyalty, operating on hope instead of strategy.',
          },
          {
            id: 'dp101-1-q4',
            question: 'What is "Controlled Vulnerability" according to the Four Pillars?',
            options: [
              'Never showing any weakness',
              'Being completely open about all your feelings',
              'Revealing only what serves your purpose strategically',
              'Crying on command to manipulate',
            ],
            correctIndex: 2,
            explanation: 'Controlled Vulnerability means revealing only what serves your purpose—your pain, fears, and insecurities are strategic tools, not conversation starters.',
          },
        ],
      },
    },
    {
      id: 'dp101-2',
      title: 'The Investment Ladder',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Every successful business understands scarcity. Limited-time offers. Exclusive memberships. Waiting lists. These tactics work because they trigger a fundamental psychological response: we want what we cannot easily have, and we value what must be earned.',
        },
        {
          type: 'insight',
          content: 'The same principle applies to you. When you are too available, too eager, too accommodating—your value plummets. When you must be earned, pursued, and won over—your value skyrockets.',
        },
        {
          type: 'text',
          content: 'The Investment Ladder is a framework for ensuring that anyone who wants access to you must demonstrate their value first. Each rung requires more effort to climb. Most will fall off. That is the point.',
        },
        {
          type: 'list',
          content: 'The Five Rungs of Investment:',
          items: [
            'Rung 1 - Attention: They must work to get your attention in the first place. You do not notice everyone—only those who have distinguished themselves.',
            'Rung 2 - Time: Your time is limited and valuable. They must earn it through consistent effort and demonstrated interest.',
            'Rung 3 - Access: They do not get to know your real life, your vulnerabilities, your inner world until they have proven trustworthy.',
            'Rung 4 - Priority: Being important to you is earned, not given. They compete with your goals, your ambitions, your other relationships.',
            'Rung 5 - Commitment: The final rung. Only reached after sustained investment and demonstrated loyalty.',
          ],
        },
        {
          type: 'tactic',
          content: 'Never let someone skip rungs. The person who gets commitment without investment will never value what they have. The person who climbs every rung will fight to protect their position.',
        },
        {
          type: 'text',
          content: 'Consider what happens when you give access too quickly: They have not invested enough to value it. They have not worked hard enough to fear losing it. They have not climbed high enough to appreciate the view.',
        },
        {
          type: 'quote',
          content: '"What is given freely is valued less. What must be earned is treasured."',
        },
        {
          type: 'list',
          content: 'Signs Someone Is Trying to Skip Rungs:',
          items: [
            'Love bombing—excessive affection before earning it',
            'Pushing for commitment before building trust',
            'Demanding vulnerability without reciprocating',
            'Creating urgency—"We have something special, why wait?"',
            'Isolating you from other options to force exclusivity',
          ],
        },
        {
          type: 'insight',
          content: 'When someone tries to skip rungs, they are revealing that they want the benefits of investment without doing the work. This is a red flag, not flattery.',
        },
      ],
      keyTakeaways: [
        'Scarcity creates value—be scarce',
        'Investment must be earned, not given',
        'Those who skip rungs will not value their position',
        'Rushing is a red flag, not romance',
        'Your standards filter out those who do not belong',
      ],
      exercise: {
        title: 'The Investment Audit',
        description: 'Map your current or recent relationship against the Investment Ladder.',
        steps: [
          'Think of someone currently pursuing your attention or interest',
          'Which rung are they actually on vs. which rung are they acting like they deserve?',
          'Identify any rungs they have tried to skip',
          'Note specific behaviors that showed investment vs. entitlement',
          'Decide: Do they need to climb more before you offer the next level?',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'dp101-2-q1',
            question: 'What psychological principle makes scarcity tactics work?',
            options: [
              'People want what is easily available',
              'People want what they cannot easily have',
              'People are attracted to generosity',
              'People value consistency above all',
            ],
            correctIndex: 1,
            explanation: 'We want what we cannot easily have, and we value what must be earned. This is why scarcity and limited availability increase perceived value.',
          },
          {
            id: 'dp101-2-q2',
            question: 'Love bombing is a sign that someone is trying to:',
            options: [
              'Show genuine deep affection',
              'Move the relationship at a healthy pace',
              'Skip rungs on the Investment Ladder',
              'Demonstrate their high value',
            ],
            correctIndex: 2,
            explanation: 'Love bombing—excessive affection before earning it—is a red flag that someone wants the benefits of investment without doing the work.',
          },
          {
            id: 'dp101-2-q3',
            question: 'Why will someone who "skips rungs" never truly value the relationship?',
            options: [
              'They are fundamentally bad people',
              'They have not invested enough to fear losing it',
              'They are too attractive to care',
              'They have too many other options',
            ],
            correctIndex: 1,
            explanation: 'Those who skip rungs have not invested enough to value what they have, worked hard enough to fear losing it, or climbed high enough to appreciate the view.',
          },
          {
            id: 'dp101-2-q4',
            question: 'What is the final rung of the Investment Ladder?',
            options: [
              'Attention',
              'Time',
              'Access',
              'Commitment',
            ],
            correctIndex: 3,
            explanation: 'Commitment is the final rung, only reached after sustained investment and demonstrated loyalty through the previous rungs of Attention, Time, Access, and Priority.',
          },
        ],
      },
    },
    {
      id: 'dp101-3',
      title: 'The Mask Collection',
      duration: '9 min',
      content: [
        {
          type: 'text',
          content: 'Most people have one personality. They wake up every morning as the same person they were yesterday, with the same insecurities, patterns, and emotional responses. They are predictable because they are "authentic." They are authentic because they do not know how to be anything else.',
        },
        {
          type: 'insight',
          content: 'You are not limited to one self. You possess—or can develop—a collection of personas, each designed for a specific purpose. These are not lies. They are adaptations. Social chameleons capable of becoming exactly what any situation requires.',
        },
        {
          type: 'text',
          content: 'You see this as dishonest. Those who master it see it as efficient. When you meet someone skilled at this, you are not meeting a person—you are meeting a performance designed specifically for you.',
        },
        {
          type: 'list',
          content: 'The Core Masks:',
          items: [
            'The Innocent: Wide-eyed, curious, and slightly naive. Disarms cynical people who think they have seen it all. They become protectors, mentors, heroes—exactly what you need them to be.',
            'The Listener: Empathetic, understanding, exceptional at creating space for others to reveal themselves. They leave feeling seen and understood, never realizing they just handed over their psychological blueprint.',
            'The Mystery: Intriguing, slightly unreachable, impossible to fully know. For those who are bored with predictable people and crave the thrill of pursuit.',
            'The Anchor: Stable, grounding, reliable. The person someone can count on when they are tired of chaos. They think they are choosing security—you know they are choosing you.',
          ],
        },
        {
          type: 'tactic',
          content: 'The key is reading what the situation requires. The Innocent works on protector types. The Listener works on those who feel unheard. The Mystery works on those who are bored. The Anchor works on those who are exhausted.',
        },
        {
          type: 'text',
          content: 'This is not manipulation—it is communication. You are simply speaking their language, meeting them in their world, presenting the version of yourself that will resonate most powerfully.',
        },
        {
          type: 'quote',
          content: '"We do not have a true self in the way you understand it. We have a collection of selves, each one calibrated for maximum effectiveness."',
        },
        {
          type: 'list',
          content: 'Building Your Collection:',
          items: [
            'Study each mask—their mannerisms, voice patterns, emotional range',
            'Practice in low-stakes situations first',
            'Learn to read what the situation requires within the first few minutes',
            'Transitions between masks should be seamless and situational',
            'Your "default" persona is whatever serves your current goals',
          ],
        },
      ],
      keyTakeaways: [
        'Adaptability is power—rigidity is weakness',
        'Different situations require different approaches',
        'Reading what someone needs allows you to provide it',
        'Authenticity is overrated—effectiveness is underrated',
        'The best communicators speak every language',
      ],
      exercise: {
        title: 'The Mask Practice',
        description: 'Practice wearing a mask in a low-stakes social situation.',
        steps: [
          'Choose one mask from the list that feels least natural to you',
          'For your next three casual social interactions, try embodying that mask',
          'Pay attention to how people respond differently to this version of you',
          'Note: What felt fake? What felt surprisingly natural?',
          'Reflect: What did this reveal about your default patterns?',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'dp101-3-q1',
            question: 'Which mask works best on men who are bored with predictable people?',
            options: [
              'The Innocent',
              'The Listener',
              'The Mystery',
              'The Anchor',
            ],
            correctIndex: 2,
            explanation: 'The Mystery—intriguing, slightly unreachable, impossible to fully know—works on those who crave the thrill of pursuit and are bored with predictable people.',
          },
          {
            id: 'dp101-3-q2',
            question: 'What is the key to selecting the right mask for a situation?',
            options: [
              'Using the same mask consistently',
              'Reading what the situation requires',
              'Always using the most powerful mask',
              'Randomly switching between masks',
            ],
            correctIndex: 1,
            explanation: 'The key is reading what the situation requires within the first few minutes and adapting accordingly. Different people need different approaches.',
          },
          {
            id: 'dp101-3-q3',
            question: 'According to this lesson, what does "authenticity" represent?',
            options: [
              'The highest form of personal expression',
              'A limitation that prevents adaptation',
              'The key to lasting relationships',
              'A sign of emotional maturity',
            ],
            correctIndex: 1,
            explanation: 'People who are "authentic" are predictable because they do not know how to be anything else. Adaptability is power—rigidity is weakness.',
          },
          {
            id: 'dp101-3-q4',
            question: 'Which mask type works best on protector/mentor personality types?',
            options: [
              'The Mystery',
              'The Anchor',
              'The Innocent',
              'The Listener',
            ],
            correctIndex: 2,
            explanation: 'The Innocent—wide-eyed, curious, slightly naive—disarms cynical people and makes them want to be protectors, mentors, and heroes.',
          },
        ],
      },
    },
    {
      id: 'dp101-4',
      title: 'Reading Weakness',
      duration: '10 min',
      content: [
        {
          type: 'text',
          content: 'Every person carries vulnerabilities—patterns that drive their behavior, often without their awareness. Understanding these patterns does not make you a predator. It makes you perceptive. And perception is the foundation of influence.',
        },
        {
          type: 'list',
          content: 'The Four Horsemen of Weakness:',
          items: [
            'Insecurity: The need for validation. Manifests as seeking reassurance, fishing for compliments, over-apologizing. Core wound: "I am not enough."',
            'Vanity: The need for admiration. Manifests as name-dropping, steering conversations to self, humble-bragging. Core wound: "I must be seen as special."',
            'Guilt: The need to be good. Manifests as over-accommodating, difficulty saying no, martyr behavior. Core wound: "I must earn love through sacrifice."',
            'Fear: The need for safety. Manifests as avoiding conflict, excessive planning, catastrophizing. Core wound: "The world is dangerous."',
          ],
        },
        {
          type: 'insight',
          content: 'Your greatest strengths are often your greatest vulnerabilities, just viewed from a different angle. The compassionate are easily guilted. The ambitious are easily flattered. The loyal are easily exploited. Know this about yourself first.',
        },
        {
          type: 'tactic',
          content: 'To identify someone\'s primary weakness, watch what they seek. The insecure seek validation. The vain seek admiration. The guilty seek permission. The fearful seek certainty. What someone repeatedly pursues reveals what they lack.',
        },
        {
          type: 'text',
          content: 'Body language provides the diagnostic data. Words can be controlled—the body cannot.',
        },
        {
          type: 'list',
          content: 'The Body Never Lies:',
          items: [
            'The Lip Purse: Tightening lips signals disagreement, even while smiling',
            'The Neck Touch: Hand to throat indicates vulnerability or discomfort',
            'Feet Direction: Feet point toward what we want—toward the door means escape',
            'The Lean: Leaning in shows interest; leaning away shows distance',
            'Eye Contact Patterns: Too much signals seeking; too little signals hiding',
          ],
        },
        {
          type: 'quote',
          content: '"Your body betrays you constantly. When you are nervous, your hands shake. When you are lying, your voice changes. Learn to control these tells—and read them in others."',
        },
      ],
      keyTakeaways: [
        'Everyone has core vulnerabilities that drive their behavior',
        'What someone seeks reveals what they lack',
        'Know your own weaknesses before analyzing others',
        'Body language reveals what words conceal',
        'Perception is the foundation of all influence',
      ],
      exercise: {
        title: 'The Diagnostic Hour',
        description: 'Practice reading weakness in real-world observation.',
        steps: [
          'Spend one hour in a public place with conversations happening',
          'Identify three people and try to determine their primary weakness',
          'Watch their body language—what do their movements reveal?',
          'Note what they seem to be seeking in their interactions',
          'Compare your reads: Which weakness appears most in the people around you?',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'dp101-4-q1',
            question: 'If someone constantly steers conversations back to themselves and name-drops, their primary weakness is likely:',
            options: [
              'Insecurity',
              'Vanity',
              'Guilt',
              'Fear',
            ],
            correctIndex: 1,
            explanation: 'Vanity manifests as name-dropping, steering conversations to self, and humble-bragging. Their core wound is: "I must be seen as special."',
          },
          {
            id: 'dp101-4-q2',
            question: 'What body language signal indicates someone is looking for an escape route?',
            options: [
              'Leaning in toward you',
              'Steady eye contact',
              'Feet pointing toward the door',
              'Touching their chin',
            ],
            correctIndex: 2,
            explanation: 'Feet point toward what we want—toward the door means escape. The body never lies about intentions even when words do.',
          },
          {
            id: 'dp101-4-q3',
            question: 'Someone who over-accommodates, has difficulty saying no, and engages in martyr behavior is driven by:',
            options: [
              'Fear',
              'Vanity',
              'Insecurity',
              'Guilt',
            ],
            correctIndex: 3,
            explanation: 'Guilt manifests as over-accommodating, difficulty saying no, and martyr behavior. Their core wound is: "I must earn love through sacrifice."',
          },
          {
            id: 'dp101-4-q4',
            question: 'To identify someone\'s primary weakness, you should watch for what they:',
            options: [
              'Say they hate',
              'Repeatedly pursue or seek',
              'Claim to have mastered',
              'Ignore completely',
            ],
            correctIndex: 1,
            explanation: 'What someone repeatedly pursues reveals what they lack. The insecure seek validation, the vain seek admiration, the guilty seek permission, the fearful seek certainty.',
          },
        ],
      },
    },
    {
      id: 'dp101-5',
      title: 'Strategic Positioning',
      duration: '8 min',
      content: [
        {
          type: 'text',
          content: 'Every social interaction has an invisible power dynamic. Someone is seeking approval. Someone is granting it. Someone is leading. Someone is following. Most people float through these dynamics unconsciously, reacting rather than positioning.',
        },
        {
          type: 'insight',
          content: 'The person who needs the interaction less, controls the interaction more. This is not about manipulation—it is about not being desperate. Desperation is visible, and it repels.',
        },
        {
          type: 'list',
          content: 'Signs You Are in the Seeking Position:',
          items: [
            'Excessive laughing at things that are not funny',
            'Rapid speech, as if afraid of being interrupted',
            'Constant eye contact seeking validation',
            'Over-explaining or justifying your choices',
            'Deferring decisions: "Whatever you want is fine"',
          ],
        },
        {
          type: 'list',
          content: 'Signs You Are in the Granting Position:',
          items: [
            'Relaxed posture and measured speech',
            'Comfortable with pauses and silence',
            'Making statements without qualifiers',
            'Steady eye contact without desperation',
            'Taking up physical and conversational space',
          ],
        },
        {
          type: 'tactic',
          content: 'The Strategic Pause: Most people rush to fill silence because it makes them uncomfortable. Learn to be comfortable with silence. Count to three before responding. Let the pause stretch. The person who can hold silence holds power.',
        },
        {
          type: 'text',
          content: 'The Economics of Attention:',
        },
        {
          type: 'list',
          content: 'Your attention operates like currency:',
          items: [
            'What is given freely is valued less',
            'What must be earned is treasured',
            'Constant availability signals low self-worth',
            'Strategic absence creates longing',
            'The busy person is always more attractive than the available one',
          ],
        },
        {
          type: 'quote',
          content: '"Women often underestimate how much value they confer simply by standing next to someone. Every time you stay with someone who does not deserve you, you market their value. Every time you walk, you delist them."',
        },
        {
          type: 'insight',
          content: 'Having your own life—your own goals, ambitions, and pursuits—is the foundation of healthy power dynamics. You cannot position yourself as the prize if you have nothing else going on.',
        },
      ],
      keyTakeaways: [
        'Power dynamics exist in every interaction—become aware of them',
        'The less desperate party has more influence',
        'Silence is a weapon—learn to wield it',
        'Your attention has value—spend it strategically',
        'Your own life is your greatest source of power',
      ],
      exercise: {
        title: 'Position Mapping',
        description: 'Analyze your default position in social dynamics.',
        steps: [
          'Review your last five significant conversations',
          'For each: Were you seeking or granting? Leading or following?',
          'Identify your patterns—do you consistently end up in one position?',
          'Choose one upcoming interaction where you will consciously position yourself differently',
          'Practice the Strategic Pause: In your next conversation, wait three seconds before responding to anything',
        ],
      },
      quiz: {
        questions: [
          {
            id: 'dp101-5-q1',
            question: 'Who controls an interaction more according to power dynamics?',
            options: [
              'The person who talks the most',
              'The person who needs the interaction less',
              'The person who arrived first',
              'The person with more social status',
            ],
            correctIndex: 1,
            explanation: 'The person who needs the interaction less, controls the interaction more. Desperation is visible and it repels.',
          },
          {
            id: 'dp101-5-q2',
            question: 'What is the purpose of "The Strategic Pause"?',
            options: [
              'To think of a clever response',
              'To demonstrate that you hold power through silence',
              'To confuse the other person',
              'To buy time when nervous',
            ],
            correctIndex: 1,
            explanation: 'Most people rush to fill silence because it makes them uncomfortable. The person who can hold silence holds power.',
          },
          {
            id: 'dp101-5-q3',
            question: 'Which behavior signals you are in the "seeking" position?',
            options: [
              'Comfortable with pauses and silence',
              'Making statements without qualifiers',
              'Excessive laughing at things that are not funny',
              'Taking up physical and conversational space',
            ],
            correctIndex: 2,
            explanation: 'Excessive laughing, rapid speech, constant eye contact seeking validation, and over-explaining are signs you are in the seeking (weaker) position.',
          },
          {
            id: 'dp101-5-q4',
            question: 'According to the Economics of Attention, constant availability signals:',
            options: [
              'High value and dedication',
              'Healthy relationship priorities',
              'Low self-worth',
              'Strong emotional connection',
            ],
            correctIndex: 2,
            explanation: 'What is given freely is valued less. Constant availability signals low self-worth—the busy person is always more attractive than the available one.',
          },
        ],
      },
    },
  ],
};
