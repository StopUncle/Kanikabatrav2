// Emotional Armor Assessment - 15 Questions
// Measures psychological defense strength across key dimensions

export interface ArmorQuestion {
  id: string;
  text: string;
  dimension: 'boundaries' | 'detachment' | 'reality-testing' | 'recovery' | 'self-worth';
  reverse?: boolean;
}

export interface ArmorOption {
  value: number;
  label: string;
}

export const armorOptions: ArmorOption[] = [
  { value: 1, label: 'Never' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Always' },
];

export const emotionalArmorQuiz = {
  id: 'emotional-armor',
  slug: 'emotional-armor',
  title: 'Emotional Armor Assessment',
  description: 'How protected are you from psychological manipulation? This assessment measures your defensive strength across five critical dimensions: boundaries, detachment, reality-testing, recovery, and self-worth.',
  tier: 'premium' as const,
  estimatedMinutes: 8,
  totalQuestions: 15,
  dimensions: ['boundaries', 'detachment', 'reality-testing', 'recovery', 'self-worth'] as const,

  questions: [
    // BOUNDARIES (3 questions)
    {
      id: 'ea-b1',
      text: 'I say no to requests that conflict with my priorities, even when it disappoints others.',
      dimension: 'boundaries' as const,
    },
    {
      id: 'ea-b2',
      text: 'I change my plans to accommodate others even when it\'s inconvenient for me.',
      dimension: 'boundaries' as const,
      reverse: true,
    },
    {
      id: 'ea-b3',
      text: 'I can end conversations or leave situations that feel uncomfortable without excessive guilt.',
      dimension: 'boundaries' as const,
    },

    // DETACHMENT (3 questions)
    {
      id: 'ea-d1',
      text: 'Other people\'s moods significantly affect my own emotional state.',
      dimension: 'detachment' as const,
      reverse: true,
    },
    {
      id: 'ea-d2',
      text: 'I can observe someone\'s emotional reaction without feeling responsible for fixing it.',
      dimension: 'detachment' as const,
    },
    {
      id: 'ea-d3',
      text: 'I can make decisions based on logic even when someone is emotionally pressuring me.',
      dimension: 'detachment' as const,
    },

    // REALITY-TESTING (3 questions)
    {
      id: 'ea-r1',
      text: 'When someone denies something I witnessed, I trust my own perception over their version.',
      dimension: 'reality-testing' as const,
    },
    {
      id: 'ea-r2',
      text: 'I question my memory or perception when someone confidently contradicts me.',
      dimension: 'reality-testing' as const,
      reverse: true,
    },
    {
      id: 'ea-r3',
      text: 'I document important conversations or agreements rather than relying on memory.',
      dimension: 'reality-testing' as const,
    },

    // RECOVERY (3 questions)
    {
      id: 'ea-rc1',
      text: 'After a conflict, I can mentally move on within a reasonable timeframe.',
      dimension: 'recovery' as const,
    },
    {
      id: 'ea-rc2',
      text: 'Criticism affects my mood and productivity for extended periods.',
      dimension: 'recovery' as const,
      reverse: true,
    },
    {
      id: 'ea-rc3',
      text: 'I have reliable methods to restore my emotional equilibrium after being upset.',
      dimension: 'recovery' as const,
    },

    // SELF-WORTH (3 questions)
    {
      id: 'ea-s1',
      text: 'My sense of self-worth depends heavily on others\' approval.',
      dimension: 'self-worth' as const,
      reverse: true,
    },
    {
      id: 'ea-s2',
      text: 'I know my core values and priorities, even when others challenge them.',
      dimension: 'self-worth' as const,
    },
    {
      id: 'ea-s3',
      text: 'I can recognize my accomplishments without needing external validation.',
      dimension: 'self-worth' as const,
    },
  ] as ArmorQuestion[],
};

// Scoring function
export function calculateArmorScore(answers: Record<string, number>) {
  const dimensions = {
    boundaries: { sum: 0, count: 0 },
    detachment: { sum: 0, count: 0 },
    'reality-testing': { sum: 0, count: 0 },
    recovery: { sum: 0, count: 0 },
    'self-worth': { sum: 0, count: 0 },
  };

  for (const question of emotionalArmorQuiz.questions) {
    const answer = answers[question.id];
    if (answer !== undefined) {
      const score = question.reverse ? (6 - answer) : answer;
      dimensions[question.dimension].sum += score;
      dimensions[question.dimension].count += 1;
    }
  }

  // Helper to safely calculate percentage, guarding against division by zero
  const safePercent = (sum: number, count: number) =>
    count > 0 ? Math.round((sum / (count * 5)) * 100) : 0;

  const dimensionScores = {
    boundaries: safePercent(dimensions.boundaries.sum, dimensions.boundaries.count),
    detachment: safePercent(dimensions.detachment.sum, dimensions.detachment.count),
    realityTesting: safePercent(dimensions['reality-testing'].sum, dimensions['reality-testing'].count),
    recovery: safePercent(dimensions.recovery.sum, dimensions.recovery.count),
    selfWorth: safePercent(dimensions['self-worth'].sum, dimensions['self-worth'].count),
  };

  const overall = Math.round(
    (dimensionScores.boundaries +
      dimensionScores.detachment +
      dimensionScores.realityTesting +
      dimensionScores.recovery +
      dimensionScores.selfWorth) / 5
  );

  return {
    overall,
    dimensions: dimensionScores,
  };
}

// Dimension descriptions
export const armorDimensions = {
  boundaries: {
    name: 'Boundary Strength',
    icon: '🛡️',
    high: 'Your boundaries are fortress walls. You can refuse requests without guilt and protect your time and energy effectively. Manipulators quickly learn you\'re not an easy target.',
    moderate: 'Your boundaries exist but have gaps. You can say no in some situations but struggle in others, especially with people you care about or authority figures.',
    low: 'Your boundaries are porous. You frequently prioritize others\' needs over your own and struggle to refuse requests. This makes you vulnerable to anyone who tests limits.',
  },
  detachment: {
    name: 'Emotional Detachment',
    icon: '🧊',
    high: 'You can observe without absorbing. Others\' emotional states don\'t automatically become yours, giving you clarity in charged situations. You resist emotional manipulation well.',
    moderate: 'You have some detachment capability but can get pulled into emotional currents, especially with those close to you. High-pressure tactics may still work.',
    low: 'You\'re highly empathic - you feel what others feel. While this makes you caring, it also makes you vulnerable to mood manipulation and emotional blackmail.',
  },
  realityTesting: {
    name: 'Reality Anchoring',
    icon: '🎯',
    high: 'You trust your perceptions and document what matters. Gaslighting attempts fail because you have both confidence in your reality and evidence to support it.',
    moderate: 'You generally trust yourself but can be shaken by confident contradiction. Under sustained pressure or from trusted sources, your reality can be distorted.',
    low: 'You\'re susceptible to reality distortion. When others confidently contradict your experience, you question yourself first. This is the primary gaslighting vulnerability.',
  },
  recovery: {
    name: 'Recovery Speed',
    icon: '⚡',
    high: 'You bounce back quickly from emotional impacts. You have reliable reset mechanisms and don\'t carry wounds longer than necessary. This limits how much damage any single attack can do.',
    moderate: 'You recover, but it takes time. Conflicts and criticism linger in your mind, affecting your functioning. Repeated attacks can accumulate before you\'ve processed each one.',
    low: 'Emotional impacts stay with you. A single criticism can affect your mood for days. This extended vulnerability window means manipulators can stack attacks.',
  },
  selfWorth: {
    name: 'Self-Worth Foundation',
    icon: '💎',
    high: 'Your worth comes from within. You don\'t need external validation to feel valuable, which makes praise-and-withdrawal tactics ineffective against you.',
    moderate: 'You have some internal worth but still seek external confirmation. Approval and disapproval affect you more than you\'d like, creating leverage points.',
    low: 'Your worth is largely dependent on others\' opinions. This creates significant vulnerability to anyone who positions themselves as a source of validation.',
  },
};

export function getDimensionDescription(
  dimension: keyof typeof armorDimensions,
  score: number
) {
  const desc = armorDimensions[dimension];
  if (score >= 70) return desc.high;
  if (score >= 40) return desc.moderate;
  return desc.low;
}

// Overall interpretations
export const overallArmorInterpretations = {
  fortified: {
    range: '80-100',
    title: 'Fortified',
    description: 'Your psychological defenses are strong. You\'re a difficult target for manipulation - you can identify tactics, maintain boundaries, trust your reality, and recover from attacks. Continue maintaining these defenses.',
  },
  protected: {
    range: '60-79',
    title: 'Protected',
    description: 'You have solid defenses with some vulnerabilities. You can handle standard manipulation but may struggle with sophisticated tactics or sustained campaigns. Focus on your weakest dimensions.',
  },
  developing: {
    range: '40-59',
    title: 'Developing',
    description: 'Your armor has significant gaps. You\'re protected against obvious manipulation but vulnerable to patient, skilled manipulators. Building defenses should be a priority.',
  },
  exposed: {
    range: 'Below 40',
    title: 'Exposed',
    description: 'Your psychological defenses need urgent attention. You\'re currently vulnerable to multiple manipulation vectors. The good news: these are learnable skills. Start with your lowest dimension.',
  },
};

export function getOverallInterpretation(score: number) {
  if (score >= 80) return overallArmorInterpretations.fortified;
  if (score >= 60) return overallArmorInterpretations.protected;
  if (score >= 40) return overallArmorInterpretations.developing;
  return overallArmorInterpretations.exposed;
}
