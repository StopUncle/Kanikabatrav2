export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; points: number }[];
}

export interface QuizResult {
  type: string;
  title: string;
  range: [number, number];
  description: string;
  cta: { label: string; href: string };
}

export const MANIPULATION_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question:
      "A new person in your life showers you with compliments and attention in the first week. How do you respond?",
    options: [
      { label: "I assume they want something from me", points: 0 },
      {
        label: "I'm flattered but cautious — too much too fast is a pattern",
        points: 1,
      },
      { label: "I'm suspicious but I don't say anything", points: 2 },
      { label: "I enjoy it and reciprocate — it feels genuine", points: 3 },
    ],
  },
  {
    id: 2,
    question:
      "A friend cancels on you for the third time, but always has a 'good reason.' What do you do?",
    options: [
      {
        label: "I recognize the pattern and adjust my expectations immediately",
        points: 0,
      },
      { label: "I confront them directly about the pattern", points: 1 },
      { label: "I stop making plans with them without saying why", points: 2 },
      {
        label: "I give them the benefit of the doubt — things happen",
        points: 3,
      },
    ],
  },
  {
    id: 3,
    question:
      "Your partner says 'If you really loved me, you wouldn't need to check my phone.' Your reaction?",
    options: [
      {
        label:
          "That's a deflection — the question was about their behavior, not mine",
        points: 0,
      },
      { label: "That logic sounds off but I can't explain why", points: 2 },
      {
        label: "They're right — trust is important in a relationship",
        points: 3,
      },
      { label: "I feel guilty for even thinking about it", points: 3 },
    ],
  },
  {
    id: 4,
    question:
      "A coworker presents your idea in a meeting as their own. What do you do?",
    options: [
      { label: "I correct the record in the meeting, calmly", points: 0 },
      { label: "I address it privately afterward", points: 1 },
      { label: "I vent to other coworkers but don't confront them", points: 2 },
      { label: "Nothing — maybe I'm overreacting", points: 3 },
    ],
  },
  {
    id: 5,
    question:
      "Someone you just met asks for a 'small favor' that actually requires significant effort. How do you handle it?",
    options: [
      { label: "I say no without explanation", points: 0 },
      { label: "I negotiate — I'll help if it's truly small", points: 1 },
      { label: "I help but feel resentful afterward", points: 2 },
      { label: "I help — I want to make a good impression", points: 3 },
    ],
  },
  {
    id: 6,
    question:
      "Someone gives you the silent treatment after a disagreement. What's your first instinct?",
    options: [
      {
        label: "I recognize it as a control tactic and refuse to chase",
        points: 0,
      },
      { label: "I wait — they'll come around when they're ready", points: 2 },
      { label: "I feel anxious and try to fix things immediately", points: 3 },
      {
        label: "I apologize to end the tension, even if I wasn't wrong",
        points: 3,
      },
    ],
  },
  {
    id: 7,
    question:
      "A charismatic stranger buys your drinks all night and asks you to leave with them. You...",
    options: [
      { label: "Wonder what they're really after", points: 0 },
      { label: "Enjoy the attention but leave alone", points: 1 },
      {
        label: "Feel special — this kind of attention doesn't happen often",
        points: 3,
      },
      { label: "Go with them — you only live once", points: 3 },
    ],
  },
];

export const QUIZ_RESULTS: QuizResult[] = [
  {
    type: "operator",
    title: "The Operator",
    range: [0, 5],
    description:
      "You see through most tactics before they land. You read intent, not words — and you rarely give someone a second chance to manipulate you. Most people can't touch you. The question is whether your guard is a shield or a wall.",
    cta: {
      label: "Follow for advanced content",
      href: "https://instagram.com/kanikabatra",
    },
  },
  {
    type: "strategist",
    title: "The Strategist",
    range: [6, 10],
    description:
      "You catch most manipulation, but the subtle ones slip through — especially from people you care about. You've got strong instincts, but emotional proximity dulls them. The books will sharpen what's already there.",
    cta: { label: "Get the Books", href: "#books" },
  },
  {
    type: "empath",
    title: "The Empath",
    range: [11, 15],
    description:
      "You feel other people's emotions more than your own. That makes you generous, compassionate — and an easy target for anyone who knows how to weaponize your empathy. You need frameworks, not just feelings.",
    cta: { label: "Get the Books", href: "#books" },
  },
  {
    type: "open-heart",
    title: "The Trusting Heart",
    range: [16, 21],
    description:
      "You lead with trust and give people the benefit of the doubt — every time. That's a beautiful quality, but it's also a vulnerability that experienced manipulators can exploit in minutes. You need a private session.",
    cta: { label: "Book a Session", href: "/coaching" },
  },
];

export function getResult(score: number): QuizResult {
  return (
    QUIZ_RESULTS.find((r) => score >= r.range[0] && score <= r.range[1]) ||
    QUIZ_RESULTS[QUIZ_RESULTS.length - 1]
  );
}
