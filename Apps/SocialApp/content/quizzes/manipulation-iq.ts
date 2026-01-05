// Manipulation IQ Test - 20 Scenario-Based Questions
// Tests ability to recognize manipulation tactics in real situations

export interface ManipulationScenario {
  id: string;
  scenario: string;
  question: string;
  options: {
    text: string;
    tactic: string | null; // null = no manipulation
    isCorrect: boolean;
  }[];
  explanation: string;
  category: 'gaslighting' | 'guilt-trip' | 'love-bombing' | 'fear-induction' | 'triangulation' | 'intermittent-reinforcement';
}

export const manipulationIQQuiz = {
  id: 'manipulation-iq',
  slug: 'manipulation-iq',
  title: 'Manipulation IQ Test',
  description: 'How well can you spot manipulation in the wild? This scenario-based test measures your ability to recognize psychological tactics before they work on you.',
  tier: 'free' as const,
  estimatedMinutes: 15,
  totalQuestions: 20,
  categories: ['gaslighting', 'guilt-trip', 'love-bombing', 'fear-induction', 'triangulation', 'intermittent-reinforcement'] as const,

  scenarios: [
    // GASLIGHTING (4 scenarios)
    {
      id: 'miq-g1',
      category: 'gaslighting' as const,
      scenario: 'Your partner forgot your birthday. When you bring it up, they say: "I didn\'t forget. We talked about celebrating next weekend. Don\'t you remember? You\'re always forgetting our conversations."',
      question: 'What tactic is being used here?',
      options: [
        { text: 'Memory manipulation / Gaslighting', tactic: 'gaslighting', isCorrect: true },
        { text: 'Honest miscommunication', tactic: null, isCorrect: false },
        { text: 'Deflection', tactic: 'deflection', isCorrect: false },
        { text: 'Guilt-tripping', tactic: 'guilt-trip', isCorrect: false },
      ],
      explanation: 'This is gaslighting - making you doubt your own memory. The phrase "you\'re always forgetting" is designed to make you question your reality rather than hold them accountable.',
    },
    {
      id: 'miq-g2',
      category: 'gaslighting' as const,
      scenario: 'After a heated argument where your coworker yelled at you in front of others, they later say: "I didn\'t yell. I was just being passionate. You\'re so sensitive - everyone else thought it was a normal discussion."',
      question: 'What manipulation technique is this?',
      options: [
        { text: 'Legitimate perspective difference', tactic: null, isCorrect: false },
        { text: 'Reality distortion / Gaslighting', tactic: 'gaslighting', isCorrect: true },
        { text: 'Simple denial', tactic: 'denial', isCorrect: false },
        { text: 'Minimization', tactic: 'minimization', isCorrect: false },
      ],
      explanation: 'This combines gaslighting with social proof manipulation. They\'re rewriting what happened AND claiming others agree, making you doubt both your perception and your social standing.',
    },
    {
      id: 'miq-g3',
      category: 'gaslighting' as const,
      scenario: 'You find messages on your partner\'s phone from an ex. They say: "You\'re imagining things. That account was hacked months ago. Why are you always looking for problems? This is why I don\'t tell you things."',
      question: 'Identify the manipulation:',
      options: [
        { text: 'Plausible explanation', tactic: null, isCorrect: false },
        { text: 'Defensive reaction', tactic: 'defense', isCorrect: false },
        { text: 'DARVO (Deny, Attack, Reverse Victim/Offender)', tactic: 'gaslighting', isCorrect: true },
        { text: 'Privacy boundary setting', tactic: null, isCorrect: false },
      ],
      explanation: 'Classic DARVO: Deny the evidence, Attack you for finding it, Reverse roles so they\'re the victim of your "paranoia." The goal is to make you apologize for discovering their behavior.',
    },
    {
      id: 'miq-g4',
      category: 'gaslighting' as const,
      scenario: 'Your boss consistently gives important projects to less experienced colleagues. When you ask why, they say: "I give you plenty of opportunities. You just don\'t see them because you focus on the negative."',
      question: 'What\'s happening here?',
      options: [
        { text: 'Valid feedback about your attitude', tactic: null, isCorrect: false },
        { text: 'Perception manipulation', tactic: 'gaslighting', isCorrect: true },
        { text: 'Management style difference', tactic: null, isCorrect: false },
        { text: 'Constructive criticism', tactic: null, isCorrect: false },
      ],
      explanation: 'This is perception manipulation - making you doubt observable reality (project assignments) by attributing it to your mindset. A honest response would address the specific pattern you noticed.',
    },

    // GUILT-TRIPPING (4 scenarios)
    {
      id: 'miq-gt1',
      category: 'guilt-trip' as const,
      scenario: 'You decline a friend\'s invitation because you need rest. They respond: "Fine. I guess I\'ll just go alone again. It\'s not like I was really looking forward to spending time with you after my horrible week."',
      question: 'What tactic is being used?',
      options: [
        { text: 'Honest disappointment', tactic: null, isCorrect: false },
        { text: 'Guilt manipulation', tactic: 'guilt-trip', isCorrect: true },
        { text: 'Passive communication', tactic: 'passive', isCorrect: false },
        { text: 'Boundary testing', tactic: 'boundary-test', isCorrect: false },
      ],
      explanation: 'This is guilt manipulation - using emotional pain ("horrible week," "alone again") to pressure you into changing your decision. Your need for rest is being positioned as causing their suffering.',
    },
    {
      id: 'miq-gt2',
      category: 'guilt-trip' as const,
      scenario: 'Your parent says: "After everything I sacrificed for you, you can\'t even call once a week? I gave up my career to raise you, and this is the thanks I get."',
      question: 'Identify the manipulation technique:',
      options: [
        { text: 'Fair request for contact', tactic: null, isCorrect: false },
        { text: 'Historical guilt weaponization', tactic: 'guilt-trip', isCorrect: true },
        { text: 'Expressing hurt feelings', tactic: null, isCorrect: false },
        { text: 'Setting expectations', tactic: null, isCorrect: false },
      ],
      explanation: 'This weaponizes past sacrifices to create perpetual obligation. Healthy relationships don\'t keep score. The message implies you can never repay the debt, so you must comply with current demands.',
    },
    {
      id: 'miq-gt3',
      category: 'guilt-trip' as const,
      scenario: 'Your partner wants you to skip your friend\'s wedding for their family event. When you say no, they say: "My mother will be devastated. She\'s been so stressed lately. I can\'t believe you\'d do this to her."',
      question: 'What manipulation is present?',
      options: [
        { text: 'Family loyalty appeal', tactic: null, isCorrect: false },
        { text: 'Third-party guilt triangulation', tactic: 'guilt-trip', isCorrect: true },
        { text: 'Reasonable request', tactic: null, isCorrect: false },
        { text: 'Conflict avoidance', tactic: 'avoidance', isCorrect: false },
      ],
      explanation: 'This uses a third party (mother) to amplify guilt. You\'re not just disappointing your partner - you\'re "devastating" a stressed woman. This triangulation makes refusing feel cruel.',
    },
    {
      id: 'miq-gt4',
      category: 'guilt-trip' as const,
      scenario: 'After ending a relationship, your ex says: "I don\'t know how I\'ll survive without you. You were everything to me. I hope you can live with yourself."',
      question: 'What\'s the manipulation tactic?',
      options: [
        { text: 'Genuine emotional expression', tactic: null, isCorrect: false },
        { text: 'Despair manipulation / Guilt weaponization', tactic: 'guilt-trip', isCorrect: true },
        { text: 'Closure seeking', tactic: null, isCorrect: false },
        { text: 'Love confession', tactic: null, isCorrect: false },
      ],
      explanation: 'This puts the weight of their wellbeing on your shoulders. The implicit threat ("survive") combined with "live with yourself" is designed to make you responsible for their emotional state, potentially reversing your decision.',
    },

    // LOVE-BOMBING (3 scenarios)
    {
      id: 'miq-lb1',
      category: 'love-bombing' as const,
      scenario: 'After two dates, someone says: "I\'ve never felt this connection with anyone. I think you might be my soulmate. I cleared my whole schedule this month just to be available for you."',
      question: 'What should you be alert to?',
      options: [
        { text: 'Romantic enthusiasm', tactic: null, isCorrect: false },
        { text: 'Love-bombing / Accelerated intimacy', tactic: 'love-bombing', isCorrect: true },
        { text: 'Good match indicators', tactic: null, isCorrect: false },
        { text: 'Healthy communication', tactic: null, isCorrect: false },
      ],
      explanation: 'Love-bombing creates artificial intimacy through overwhelming attention and premature declarations. Clearing a whole schedule after two dates is a red flag - it creates obligation and tests your boundaries.',
    },
    {
      id: 'miq-lb2',
      category: 'love-bombing' as const,
      scenario: 'A new friend showers you with expensive gifts, constant compliments, and wants to spend every free moment together. When you need space, they act hurt and confused.',
      question: 'What pattern is this?',
      options: [
        { text: 'Generous friendship', tactic: null, isCorrect: false },
        { text: 'Anxious attachment', tactic: 'attachment', isCorrect: false },
        { text: 'Investment-based manipulation', tactic: 'love-bombing', isCorrect: true },
        { text: 'Cultural difference in friendship', tactic: null, isCorrect: false },
      ],
      explanation: 'This is investment-based manipulation - creating a sense of debt through gifts and time, then leveraging that debt when you assert boundaries. The hurt reaction punishes you for wanting space.',
    },
    {
      id: 'miq-lb3',
      category: 'love-bombing' as const,
      scenario: 'A new manager praises your work excessively in meetings, gives you special projects, and confides in you about office politics. Gradually, they start asking you to cover for their mistakes.',
      question: 'What manipulation strategy is this?',
      options: [
        { text: 'Mentorship building', tactic: null, isCorrect: false },
        { text: 'Favoritism', tactic: 'favoritism', isCorrect: false },
        { text: 'Strategic grooming / Obligation creation', tactic: 'love-bombing', isCorrect: true },
        { text: 'Team building', tactic: null, isCorrect: false },
      ],
      explanation: 'Professional love-bombing creates a debt of loyalty through special treatment. The confidences create false intimacy. The eventual "asks" leverage all this built-up obligation.',
    },

    // FEAR INDUCTION (3 scenarios)
    {
      id: 'miq-fi1',
      category: 'fear-induction' as const,
      scenario: 'Your partner says: "If you leave me, I\'ll tell everyone what you told me in confidence. No one will see you the same way again."',
      question: 'What manipulation is this?',
      options: [
        { text: 'Warning about consequences', tactic: null, isCorrect: false },
        { text: 'Blackmail / Fear-based control', tactic: 'fear-induction', isCorrect: true },
        { text: 'Desperate plea', tactic: 'desperation', isCorrect: false },
        { text: 'Trust discussion', tactic: null, isCorrect: false },
      ],
      explanation: 'This is explicit blackmail - using fear of exposure to prevent you from leaving. It reveals they\'ve been cataloging information as leverage, a deeply manipulative pattern.',
    },
    {
      id: 'miq-fi2',
      category: 'fear-induction' as const,
      scenario: 'Your boss says: "The economy is rough. A lot of companies are laying off. I\'d hate for you to be job hunting right now, so let\'s make sure you\'re being a team player, okay?"',
      question: 'Identify the tactic:',
      options: [
        { text: 'Realistic market assessment', tactic: null, isCorrect: false },
        { text: 'Career advice', tactic: null, isCorrect: false },
        { text: 'Implied threat / Fear manipulation', tactic: 'fear-induction', isCorrect: true },
        { text: 'Motivational management', tactic: null, isCorrect: false },
      ],
      explanation: 'This is an implied threat wrapped in friendly language. The message is: comply or risk your job. The vague "team player" gives them flexibility to demand anything while maintaining deniability.',
    },
    {
      id: 'miq-fi3',
      category: 'fear-induction' as const,
      scenario: 'A friend says: "You shouldn\'t hang out with Sarah anymore. She said some things about you that I can\'t repeat. Just trust me - she\'s not your friend."',
      question: 'What\'s happening here?',
      options: [
        { text: 'Protective friendship', tactic: null, isCorrect: false },
        { text: 'Fear-based isolation attempt', tactic: 'fear-induction', isCorrect: true },
        { text: 'Honest warning', tactic: null, isCorrect: false },
        { text: 'Loyalty testing', tactic: 'test', isCorrect: false },
      ],
      explanation: 'This uses fear (someone talked about you) to isolate you from other connections. The refusal to share details prevents verification and forces you to "just trust" them - a control mechanism.',
    },

    // TRIANGULATION (3 scenarios)
    {
      id: 'miq-tr1',
      category: 'triangulation' as const,
      scenario: 'Your partner frequently mentions how their ex was "so understanding" and "never complained" whenever you express a concern about the relationship.',
      question: 'What tactic is this?',
      options: [
        { text: 'Nostalgia', tactic: null, isCorrect: false },
        { text: 'Comparison triangulation', tactic: 'triangulation', isCorrect: true },
        { text: 'Communication attempt', tactic: null, isCorrect: false },
        { text: 'Unprocessed feelings', tactic: 'feelings', isCorrect: false },
      ],
      explanation: 'This is triangulation - using a third party (ex) to create competition and suppress your concerns. The message is: be more like them or risk being replaced. It makes you compete rather than communicate.',
    },
    {
      id: 'miq-tr2',
      category: 'triangulation' as const,
      scenario: 'A coworker tells you: "I heard from someone in HR that the boss thinks you\'re not committed. You didn\'t hear this from me, but maybe step up your visibility."',
      question: 'What manipulation is present?',
      options: [
        { text: 'Friendly heads-up', tactic: null, isCorrect: false },
        { text: 'Gossip', tactic: 'gossip', isCorrect: false },
        { text: 'Anxiety-inducing triangulation', tactic: 'triangulation', isCorrect: true },
        { text: 'Career guidance', tactic: null, isCorrect: false },
      ],
      explanation: 'This creates anxiety through unverifiable third-party claims. You can\'t confirm it, can\'t confront it, but now feel compelled to change behavior. The "didn\'t hear from me" prevents accountability.',
    },
    {
      id: 'miq-tr3',
      category: 'triangulation' as const,
      scenario: 'In a group setting, someone says: "Everyone agrees with me on this, right?" while looking at others for support, after you\'ve disagreed with them.',
      question: 'What\'s the manipulation?',
      options: [
        { text: 'Seeking consensus', tactic: null, isCorrect: false },
        { text: 'Social proof triangulation', tactic: 'triangulation', isCorrect: true },
        { text: 'Democratic decision-making', tactic: null, isCorrect: false },
        { text: 'Confidence building', tactic: null, isCorrect: false },
      ],
      explanation: 'This weaponizes social pressure to isolate your position. By recruiting the group as allies, they turn a one-on-one disagreement into you-versus-everyone, making capitulation socially easier than standing firm.',
    },

    // INTERMITTENT REINFORCEMENT (3 scenarios)
    {
      id: 'miq-ir1',
      category: 'intermittent-reinforcement' as const,
      scenario: 'Your partner alternates between intense affection and cold distance without explanation. When they\'re warm, it feels amazing. When they\'re cold, you find yourself working harder to get back to the good times.',
      question: 'What pattern is this?',
      options: [
        { text: 'Normal relationship fluctuation', tactic: null, isCorrect: false },
        { text: 'Intermittent reinforcement / Trauma bonding', tactic: 'intermittent-reinforcement', isCorrect: true },
        { text: 'Moody personality', tactic: null, isCorrect: false },
        { text: 'Stress response', tactic: 'stress', isCorrect: false },
      ],
      explanation: 'This is intermittent reinforcement - the most addictive pattern in psychology. Unpredictable rewards create stronger bonds than consistent ones. Your "working harder" is exactly the intended response.',
    },
    {
      id: 'miq-ir2',
      category: 'intermittent-reinforcement' as const,
      scenario: 'Your boss randomly gives you praise and recognition, then ignores you for weeks. You notice you\'re constantly trying to figure out what earns the positive attention.',
      question: 'What\'s happening?',
      options: [
        { text: 'Busy management', tactic: null, isCorrect: false },
        { text: 'Inconsistent leadership', tactic: 'inconsistent', isCorrect: false },
        { text: 'Variable reward manipulation', tactic: 'intermittent-reinforcement', isCorrect: true },
        { text: 'Merit-based recognition', tactic: null, isCorrect: false },
      ],
      explanation: 'Variable reward schedules create obsessive pattern-seeking. Your constant analysis of what "works" means you\'re investing more mental energy than with consistent feedback - which benefits them.',
    },
    {
      id: 'miq-ir3',
      category: 'intermittent-reinforcement' as const,
      scenario: 'A friend sometimes responds enthusiastically to your texts within minutes, other times takes days. You notice you feel a rush when they respond quickly and anxiety when they don\'t.',
      question: 'What pattern is this creating?',
      options: [
        { text: 'Normal communication variation', tactic: null, isCorrect: false },
        { text: 'Dopamine manipulation through unpredictability', tactic: 'intermittent-reinforcement', isCorrect: true },
        { text: 'Busy lifestyle', tactic: null, isCorrect: false },
        { text: 'Introvert behavior', tactic: null, isCorrect: false },
      ],
      explanation: 'While this may be unintentional, the effect is dopamine manipulation. The rush/anxiety cycle mirrors slot machine psychology. Healthy relationships have generally predictable response patterns.',
    },
  ] as ManipulationScenario[],
};

// Scoring function
export function calculateManipulationIQ(answers: Record<string, string>) {
  let correct = 0;
  const categoryScores: Record<string, { correct: number; total: number }> = {
    gaslighting: { correct: 0, total: 0 },
    'guilt-trip': { correct: 0, total: 0 },
    'love-bombing': { correct: 0, total: 0 },
    'fear-induction': { correct: 0, total: 0 },
    triangulation: { correct: 0, total: 0 },
    'intermittent-reinforcement': { correct: 0, total: 0 },
  };

  for (const scenario of manipulationIQQuiz.scenarios) {
    const userAnswer = answers[scenario.id];
    const correctOption = scenario.options.find(o => o.isCorrect);

    categoryScores[scenario.category].total += 1;

    if (userAnswer === correctOption?.text) {
      correct += 1;
      categoryScores[scenario.category].correct += 1;
    }
  }

  const percentage = Math.round((correct / manipulationIQQuiz.scenarios.length) * 100);

  return {
    score: correct,
    total: manipulationIQQuiz.scenarios.length,
    percentage,
    categoryBreakdown: categoryScores,
  };
}

// Result interpretations
export const manipulationIQInterpretations = {
  high: {
    range: '85-100%',
    title: 'Psychological Tactician',
    description: 'You see through manipulation like glass. Your pattern recognition is exceptional - you likely catch tactics before they\'re even fully deployed. This awareness is protective, but be careful not to see manipulation where none exists.',
  },
  good: {
    range: '70-84%',
    title: 'Tactical Defender',
    description: 'Strong manipulation detection with occasional blind spots. You recognize most common tactics but might miss sophisticated variations or struggle when emotionally invested. Focus on your weaker categories.',
  },
  moderate: {
    range: '50-69%',
    title: 'Developing Awareness',
    description: 'You catch some manipulation but miss enough to be vulnerable. The tactics you missed are likely active in your life right now. Study your incorrect answers - they reveal your specific vulnerabilities.',
  },
  low: {
    range: 'Below 50%',
    title: 'High Vulnerability',
    description: 'Your manipulation detection needs significant development. This isn\'t about intelligence - many brilliant people score here because they assume good faith in others. This trust is exploited by manipulators. Prioritize learning these patterns.',
  },
};

export function getManipulationIQInterpretation(percentage: number) {
  if (percentage >= 85) return manipulationIQInterpretations.high;
  if (percentage >= 70) return manipulationIQInterpretations.good;
  if (percentage >= 50) return manipulationIQInterpretations.moderate;
  return manipulationIQInterpretations.low;
}
