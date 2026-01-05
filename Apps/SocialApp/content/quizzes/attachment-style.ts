// Attachment Style Assessment - 20 Questions
// Identifies relationship patterns: Secure, Anxious, Avoidant, Disorganized

export interface AttachmentQuestion {
  id: string;
  text: string;
  scores: {
    secure: number;
    anxious: number;
    avoidant: number;
    disorganized: number;
  };
}

export interface AttachmentOption {
  value: number;
  label: string;
}

export const attachmentOptions: AttachmentOption[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export const attachmentStyleQuiz = {
  id: 'attachment-style',
  slug: 'attachment-style',
  title: 'Attachment Style Assessment',
  description: 'Your attachment style shapes every relationship you have - and determines exactly how you can be manipulated. Understanding your pattern is the first step to breaking it.',
  tier: 'premium' as const,
  estimatedMinutes: 10,
  totalQuestions: 20,
  styles: ['secure', 'anxious', 'avoidant', 'disorganized'] as const,

  questions: [
    // Questions measuring secure attachment
    {
      id: 'as-1',
      text: 'I find it relatively easy to get close to others.',
      scores: { secure: 1, anxious: 0.5, avoidant: -0.5, disorganized: 0 },
    },
    {
      id: 'as-2',
      text: 'I am comfortable depending on others and having others depend on me.',
      scores: { secure: 1, anxious: 0.3, avoidant: -0.8, disorganized: -0.3 },
    },
    {
      id: 'as-3',
      text: 'I don\'t worry about being abandoned or about someone getting too close to me.',
      scores: { secure: 1, anxious: -0.8, avoidant: 0.3, disorganized: -0.5 },
    },
    {
      id: 'as-4',
      text: 'I feel comfortable sharing my thoughts and feelings with people close to me.',
      scores: { secure: 1, anxious: 0.5, avoidant: -0.7, disorganized: -0.2 },
    },
    {
      id: 'as-5',
      text: 'I trust that my relationships will work out well.',
      scores: { secure: 1, anxious: -0.3, avoidant: 0, disorganized: -0.5 },
    },

    // Questions measuring anxious attachment
    {
      id: 'as-6',
      text: 'I often worry that my partner doesn\'t really love me.',
      scores: { secure: -0.5, anxious: 1, avoidant: 0, disorganized: 0.5 },
    },
    {
      id: 'as-7',
      text: 'I need a lot of reassurance that I am loved.',
      scores: { secure: -0.3, anxious: 1, avoidant: -0.5, disorganized: 0.3 },
    },
    {
      id: 'as-8',
      text: 'When I\'m not in a relationship, I feel somewhat anxious and incomplete.',
      scores: { secure: -0.5, anxious: 1, avoidant: -0.3, disorganized: 0.3 },
    },
    {
      id: 'as-9',
      text: 'I often wish that my partner\'s feelings for me were as strong as mine for them.',
      scores: { secure: -0.3, anxious: 1, avoidant: 0, disorganized: 0.3 },
    },
    {
      id: 'as-10',
      text: 'I get very upset when my partner doesn\'t respond to my messages quickly.',
      scores: { secure: -0.5, anxious: 1, avoidant: 0, disorganized: 0.5 },
    },

    // Questions measuring avoidant attachment
    {
      id: 'as-11',
      text: 'I prefer not to show a partner how I feel deep down.',
      scores: { secure: -0.5, anxious: 0, avoidant: 1, disorganized: 0.3 },
    },
    {
      id: 'as-12',
      text: 'I feel uncomfortable when others want to be too close.',
      scores: { secure: -0.5, anxious: -0.3, avoidant: 1, disorganized: 0.3 },
    },
    {
      id: 'as-13',
      text: 'I find it difficult to fully trust and depend on others.',
      scores: { secure: -0.5, anxious: 0.3, avoidant: 1, disorganized: 0.5 },
    },
    {
      id: 'as-14',
      text: 'I am nervous when anyone gets too close emotionally.',
      scores: { secure: -0.5, anxious: 0.3, avoidant: 1, disorganized: 0.3 },
    },
    {
      id: 'as-15',
      text: 'I value my independence more than my relationships.',
      scores: { secure: -0.3, anxious: -0.5, avoidant: 1, disorganized: 0 },
    },

    // Questions measuring disorganized attachment
    {
      id: 'as-16',
      text: 'I simultaneously want closeness and feel the urge to push people away.',
      scores: { secure: -0.5, anxious: 0.5, avoidant: 0.3, disorganized: 1 },
    },
    {
      id: 'as-17',
      text: 'My feelings toward relationships often feel confusing or contradictory.',
      scores: { secure: -0.5, anxious: 0.3, avoidant: 0.3, disorganized: 1 },
    },
    {
      id: 'as-18',
      text: 'I\'ve been told I send mixed signals in relationships.',
      scores: { secure: -0.5, anxious: 0.3, avoidant: 0.3, disorganized: 1 },
    },
    {
      id: 'as-19',
      text: 'I sometimes fear the people I\'m closest to.',
      scores: { secure: -0.8, anxious: 0.3, avoidant: 0.3, disorganized: 1 },
    },
    {
      id: 'as-20',
      text: 'Intimacy with others feels both desperately needed and deeply threatening.',
      scores: { secure: -0.8, anxious: 0.5, avoidant: 0.3, disorganized: 1 },
    },
  ] as AttachmentQuestion[],
};

// Scoring function
export function calculateAttachmentStyle(answers: Record<string, number>) {
  const rawScores = {
    secure: 0,
    anxious: 0,
    avoidant: 0,
    disorganized: 0,
  };

  let answeredCount = 0;

  for (const question of attachmentStyleQuiz.questions) {
    const answer = answers[question.id];
    if (answer !== undefined) {
      answeredCount++;
      // Convert 1-5 answer to a normalized weight (-1 to +1)
      // 1 -> -1, 3 -> 0, 5 -> +1
      const weight = (answer - 3) / 2;
      rawScores.secure += question.scores.secure * weight;
      rawScores.anxious += question.scores.anxious * weight;
      rawScores.avoidant += question.scores.avoidant * weight;
      rawScores.disorganized += question.scores.disorganized * weight;
    }
  }

  // Calculate max possible score per style based on actual coefficients
  // With weight range -1 to +1 and coefficients ranging from -0.8 to +1.0
  // Max contribution: sum of absolute values of positive coefficients
  // For realistic normalization, use empirical max based on scoring structure
  const maxPossible = answeredCount > 0 ? answeredCount * 0.6 : 12; // ~0.6 avg positive contribution per question

  // Normalize to 0-100 scale, centered at 50 (neutral weight = 0)
  const normalize = (score: number) => {
    const normalized = ((score / maxPossible) + 1) / 2 * 100;
    return Math.max(0, Math.min(100, Math.round(normalized)));
  };

  const scores = {
    secure: normalize(rawScores.secure),
    anxious: normalize(rawScores.anxious),
    avoidant: normalize(rawScores.avoidant),
    disorganized: normalize(rawScores.disorganized),
  };

  // Determine primary style
  const entries = Object.entries(scores) as [keyof typeof scores, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][0];

  return {
    scores,
    primary,
    secondary,
  };
}

// Style descriptions
export const attachmentStyles = {
  secure: {
    name: 'Secure',
    color: '#10B981',
    icon: '🏠',
    summary: 'You form healthy connections without losing yourself.',
    description: 'You\'re comfortable with intimacy and independence. You can depend on others without becoming clingy, and you don\'t fear abandonment or engulfment. This is the gold standard - but only 50% of adults are securely attached.',
    strengths: [
      'Comfortable with emotional intimacy',
      'Trusting but not naive',
      'Good at communicating needs',
      'Recovers well from relationship conflicts',
      'Balanced autonomy and connection',
    ],
    vulnerabilities: [
      'May underestimate others\' insecurity',
      'Can be blindsided by manipulation from trusted sources',
      'May not recognize red flags quickly in unfamiliar patterns',
    ],
    manipulationRisk: 'Low - but not immune. Your trust, while usually well-placed, can be exploited by sophisticated manipulators who initially present as secure.',
  },
  anxious: {
    name: 'Anxious',
    color: '#F59E0B',
    icon: '📱',
    summary: 'You seek closeness but fear it will be taken away.',
    description: 'You crave intimacy and often worry about your partner\'s commitment. You\'re highly attuned to shifts in mood and may interpret small things as signs of rejection. This hypervigilance was likely adaptive in your past but creates anxiety now.',
    strengths: [
      'Highly attuned to others\' emotional states',
      'Deeply committed once invested',
      'Willing to work on relationships',
      'Good at reading social cues',
      'Capable of profound emotional connection',
    ],
    vulnerabilities: [
      'Susceptible to intermittent reinforcement',
      'Can be controlled through approval/withdrawal cycles',
      'May tolerate poor treatment for fear of abandonment',
      'Prone to protest behaviors that push partners away',
      'Vulnerable to love-bombing',
    ],
    manipulationRisk: 'High - The anxious attachment style is the most exploited by manipulators. Your need for reassurance creates leverage, and your fear of abandonment keeps you trapped longer.',
  },
  avoidant: {
    name: 'Avoidant',
    color: '#6366F1',
    icon: '🏔️',
    summary: 'You value independence and find closeness uncomfortable.',
    description: 'You prize self-sufficiency and feel uncomfortable with too much intimacy. You may emotionally withdraw when relationships get serious. This isn\'t about not wanting connection - it\'s about associating vulnerability with danger.',
    strengths: [
      'Strong boundaries',
      'Self-sufficient and independent',
      'Less reactive to emotional manipulation',
      'Harder to guilt-trip or obligation-trap',
      'Clear sense of personal identity',
    ],
    vulnerabilities: [
      'May push away healthy connections',
      'Can be manipulated through appeals to autonomy',
      'May not recognize manipulation masked as "giving space"',
      'Vulnerable to partners who pursue then withdraw',
      'May miss out on genuine intimacy',
    ],
    manipulationRisk: 'Moderate - Standard tactics often fail, but skilled manipulators can exploit your independence by making you feel "chosen" or by framing control as respect for your autonomy.',
  },
  disorganized: {
    name: 'Disorganized',
    color: '#EF4444',
    icon: '🌀',
    summary: 'You experience conflicting urges toward and away from intimacy.',
    description: 'You want closeness but also fear it. Your approach to relationships may seem contradictory - pursuing then pushing away, wanting love but expecting hurt. This often develops when early caregivers were both a source of comfort and fear.',
    strengths: [
      'Deep capacity for empathy (often through suffering)',
      'Can understand complex emotional dynamics',
      'Often highly perceptive about human nature',
      'Capable of profound growth when aware',
      'Strong survival instincts',
    ],
    vulnerabilities: [
      'Most vulnerable to abusive dynamics',
      'May be drawn to what\'s familiar (including dysfunction)',
      'Sends mixed signals that can attract manipulators',
      'Internal chaos makes reality-testing difficult',
      'May recreate trauma patterns unconsciously',
    ],
    manipulationRisk: 'Very High - Disorganized attachment creates multiple entry points for manipulation. Your conflicting needs can be played against each other, and chaotic relationship patterns may feel normal.',
  },
};

export function getStyleDescription(style: keyof typeof attachmentStyles) {
  return attachmentStyles[style];
}

// Relationship pattern insights
export const relationshipPatterns = {
  'anxious-avoidant': {
    title: 'The Anxious-Avoidant Trap',
    description: 'When anxious and avoidant styles pair up, they create a painful dance: one pursues, one withdraws, triggering each other\'s deepest wounds. This is one of the most common - and destructive - relationship patterns.',
  },
  'anxious-anxious': {
    title: 'The Emotional Rollercoaster',
    description: 'Two anxious partners can create intense, passionate connections but may amplify each other\'s insecurities. Without a grounding force, the relationship can become volatile.',
  },
  'avoidant-avoidant': {
    title: 'The Parallel Lives',
    description: 'Two avoidants may coexist comfortably but miss out on deeper connection. The relationship may feel stable but emotionally shallow.',
  },
  'secure-insecure': {
    title: 'The Earned Security Path',
    description: 'A secure partner can help anxious or avoidant partners develop "earned security" over time - but only if the insecure partner is committed to growth.',
  },
};
