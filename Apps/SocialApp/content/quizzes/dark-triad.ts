// Dark Triad Assessment - 27 Questions
// Measures Machiavellianism, Narcissism, and Psychopathy

export interface QuizQuestion {
  id: string;
  text: string;
  trait: 'machiavellianism' | 'narcissism' | 'psychopathy';
  reverse?: boolean; // If true, lower scores indicate higher trait
}

export interface QuizOption {
  value: number;
  label: string;
}

export const darkTriadOptions: QuizOption[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export const darkTriadQuiz = {
  id: 'dark-triad',
  slug: 'dark-triad',
  title: 'Dark Triad Assessment',
  description: 'Discover your levels of Machiavellianism, Narcissism, and Psychopathy. This assessment reveals the shadow aspects of your personality that drive ambition, influence, and self-interest.',
  tier: 'free' as const,
  estimatedMinutes: 12,
  totalQuestions: 27,
  traits: ['machiavellianism', 'narcissism', 'psychopathy'] as const,

  questions: [
    // MACHIAVELLIANISM (9 questions)
    {
      id: 'dt-m1',
      text: 'It\'s wise to keep track of information that you can use against people later.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m2',
      text: 'I believe strategic deception is sometimes necessary to get ahead.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m3',
      text: 'You should wait for the right time to get back at people.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m4',
      text: 'There are things you should hide from others because they don\'t need to know.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m5',
      text: 'Make sure your plans benefit yourself, not others.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m6',
      text: 'Most people can be manipulated if you find the right approach.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m7',
      text: 'Whatever it takes, you must get the important people on your side.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m8',
      text: 'I avoid direct conflict and prefer working behind the scenes.',
      trait: 'machiavellianism' as const,
    },
    {
      id: 'dt-m9',
      text: 'It\'s smart to let people think they\'re in control when they\'re not.',
      trait: 'machiavellianism' as const,
    },

    // NARCISSISM (9 questions)
    {
      id: 'dt-n1',
      text: 'I know that I am special because everyone keeps telling me so.',
      trait: 'narcissism' as const,
    },
    {
      id: 'dt-n2',
      text: 'I like to get acquainted with important people.',
      trait: 'narcissism' as const,
    },
    {
      id: 'dt-n3',
      text: 'I feel embarrassed when someone compliments me.',
      trait: 'narcissism' as const,
      reverse: true,
    },
    {
      id: 'dt-n4',
      text: 'I have been compared to famous people.',
      trait: 'narcissism' as const,
    },
    {
      id: 'dt-n5',
      text: 'I deserve special treatment because of who I am.',
      trait: 'narcissism' as const,
    },
    {
      id: 'dt-n6',
      text: 'I insist on getting the respect that is due to me.',
      trait: 'narcissism' as const,
    },
    {
      id: 'dt-n7',
      text: 'I like to be the center of attention at social gatherings.',
      trait: 'narcissism' as const,
    },
    {
      id: 'dt-n8',
      text: 'People see me as a natural leader.',
      trait: 'narcissism' as const,
    },
    {
      id: 'dt-n9',
      text: 'I hate being just another face in the crowd.',
      trait: 'narcissism' as const,
    },

    // PSYCHOPATHY (9 questions)
    {
      id: 'dt-p1',
      text: 'I like to get revenge on authorities who wrong me.',
      trait: 'psychopathy' as const,
    },
    {
      id: 'dt-p2',
      text: 'I avoid dangerous situations at all costs.',
      trait: 'psychopathy' as const,
      reverse: true,
    },
    {
      id: 'dt-p3',
      text: 'Payback needs to be quick and unforgiving.',
      trait: 'psychopathy' as const,
    },
    {
      id: 'dt-p4',
      text: 'People often say I\'m out of control.',
      trait: 'psychopathy' as const,
    },
    {
      id: 'dt-p5',
      text: 'It\'s true that I can be mean to others.',
      trait: 'psychopathy' as const,
    },
    {
      id: 'dt-p6',
      text: 'I rarely feel guilty after hurting someone.',
      trait: 'psychopathy' as const,
    },
    {
      id: 'dt-p7',
      text: 'I enjoy taking risks that could get me in trouble.',
      trait: 'psychopathy' as const,
    },
    {
      id: 'dt-p8',
      text: 'I tend to speak my mind regardless of consequences.',
      trait: 'psychopathy' as const,
    },
    {
      id: 'dt-p9',
      text: 'I find it hard to feel sorry for people who get hurt by my actions.',
      trait: 'psychopathy' as const,
    },
  ] as QuizQuestion[],
};

// Scoring functions
export function calculateDarkTriadScores(answers: Record<string, number>) {
  const traits = {
    machiavellianism: { sum: 0, count: 0 },
    narcissism: { sum: 0, count: 0 },
    psychopathy: { sum: 0, count: 0 },
  };

  for (const question of darkTriadQuiz.questions) {
    const answer = answers[question.id];
    if (answer !== undefined) {
      const score = question.reverse ? (6 - answer) : answer;
      traits[question.trait].sum += score;
      traits[question.trait].count += 1;
    }
  }

  // Helper to safely calculate percentage, guarding against division by zero
  const safePercent = (sum: number, count: number) =>
    count > 0 ? Math.round((sum / (count * 5)) * 100) : 0;

  return {
    machiavellianism: safePercent(traits.machiavellianism.sum, traits.machiavellianism.count),
    narcissism: safePercent(traits.narcissism.sum, traits.narcissism.count),
    psychopathy: safePercent(traits.psychopathy.sum, traits.psychopathy.count),
  };
}

// Trait descriptions
export const darkTriadDescriptions = {
  machiavellianism: {
    name: 'Machiavellianism',
    high: 'You see the strategic dimension in every interaction. You understand that influence often works through indirect channels, and you\'re comfortable operating with that awareness. This gives you an edge in negotiations and politics.',
    moderate: 'You balance idealism with pragmatism. You understand that strategy matters but prefer straightforward approaches when possible. You can be tactical when necessary but don\'t default to manipulation.',
    low: 'You prefer direct, honest communication and trust that authenticity will serve you. You may be vulnerable to those who operate more strategically, but your straightforward nature builds genuine trust.',
    color: '#8B5CF6',
  },
  narcissism: {
    name: 'Narcissism',
    high: 'You have a strong sense of self-worth and believe in your own significance. This confidence can be magnetic and drive ambitious goals. The shadow side is potentially overestimating your abilities or dismissing others\' perspectives.',
    moderate: 'You have healthy self-esteem without excessive self-focus. You can appreciate recognition without needing constant validation. This balance allows for confidence without alienating others.',
    low: 'You tend toward humility and may undervalue your own contributions. While this makes you likeable, it may also mean you don\'t advocate for yourself as strongly as you should.',
    color: '#F59E0B',
  },
  psychopathy: {
    name: 'Psychopathy',
    high: 'You operate with low anxiety and high tolerance for risk. You can make cold decisions without emotional interference. This can be advantageous in high-stakes situations but may create blind spots in relationships.',
    moderate: 'You can detach emotionally when needed but generally maintain empathic connections. You take calculated risks without being reckless. This balance serves you in both personal and professional domains.',
    low: 'You\'re highly empathic and risk-averse. You feel others\' emotions strongly and consider consequences carefully. This makes you trustworthy but may also make you vulnerable to manipulation by those who target empaths.',
    color: '#EF4444',
  },
};

export function getTraitDescription(trait: keyof typeof darkTriadDescriptions, score: number) {
  const desc = darkTriadDescriptions[trait];
  if (score >= 70) return desc.high;
  if (score >= 40) return desc.moderate;
  return desc.low;
}
