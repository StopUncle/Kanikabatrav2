export interface QuizQuestion {
  id: number
  question: string
  answers: {
    text: string
    scores: {
      narcissism: number
      machiavellianism: number
      psychopathy: number
    }
  }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When someone insults you in a group setting, you most likely:",
    answers: [
      {
        text: "Feel deeply hurt but say nothing",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      },
      {
        text: "Make a mental note to get them back later",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 3 }
      },
      {
        text: "Respond immediately with a devastating comeback",
        scores: { narcissism: 4, machiavellianism: 2, psychopathy: 4 }
      },
      {
        text: "Laugh it off—you genuinely don't care what they think",
        scores: { narcissism: 1, machiavellianism: 3, psychopathy: 5 }
      }
    ]
  },
  {
    id: 2,
    question: "In relationships, you believe the most important thing is:",
    answers: [
      {
        text: "Being admired and appreciated",
        scores: { narcissism: 5, machiavellianism: 2, psychopathy: 1 }
      },
      {
        text: "Getting what you need from the relationship",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 3 }
      },
      {
        text: "Keeping things exciting and avoiding boredom",
        scores: { narcissism: 3, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "Building genuine emotional connection",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 3,
    question: "When making important decisions, you primarily rely on:",
    answers: [
      {
        text: "What will make you look good to others",
        scores: { narcissism: 5, machiavellianism: 3, psychopathy: 1 }
      },
      {
        text: "Strategic calculation of outcomes",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 3 }
      },
      {
        text: "Your gut instinct—you rarely overthink",
        scores: { narcissism: 2, machiavellianism: 1, psychopathy: 5 }
      },
      {
        text: "How it will affect others around you",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 4,
    question: "You find out a close friend has been talking behind your back. You:",
    answers: [
      {
        text: "Confront them immediately—how dare they",
        scores: { narcissism: 5, machiavellianism: 1, psychopathy: 3 }
      },
      {
        text: "Start gathering information to use later",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 4 }
      },
      {
        text: "Cut them off without explanation",
        scores: { narcissism: 3, machiavellianism: 3, psychopathy: 5 }
      },
      {
        text: "Try to understand why and work it out",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 5,
    question: "At a party, you're most likely to:",
    answers: [
      {
        text: "Be the center of attention—naturally",
        scores: { narcissism: 5, machiavellianism: 2, psychopathy: 3 }
      },
      {
        text: "Network strategically with useful people",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 2 }
      },
      {
        text: "Do something risky or unconventional for thrills",
        scores: { narcissism: 3, machiavellianism: 1, psychopathy: 5 }
      },
      {
        text: "Have genuine conversations with a few people",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 6,
    question: "When someone cries in front of you, you typically:",
    answers: [
      {
        text: "Wonder if this is somehow about you",
        scores: { narcissism: 5, machiavellianism: 2, psychopathy: 2 }
      },
      {
        text: "Assess how you can use this vulnerability",
        scores: { narcissism: 1, machiavellianism: 5, psychopathy: 4 }
      },
      {
        text: "Feel awkward—you don't really understand why they're crying",
        scores: { narcissism: 2, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "Feel genuine empathy and want to help",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 7,
    question: "Your ideal weekend involves:",
    answers: [
      {
        text: "Being pampered and receiving attention",
        scores: { narcissism: 5, machiavellianism: 1, psychopathy: 2 }
      },
      {
        text: "Working on long-term plans and goals",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 1 }
      },
      {
        text: "Doing something dangerous or spontaneous",
        scores: { narcissism: 2, machiavellianism: 1, psychopathy: 5 }
      },
      {
        text: "Quality time with people you care about",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 8,
    question: "If you could have any superpower, you would choose:",
    answers: [
      {
        text: "The ability to make everyone admire you",
        scores: { narcissism: 5, machiavellianism: 2, psychopathy: 1 }
      },
      {
        text: "Mind reading to know everyone's true intentions",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 3 }
      },
      {
        text: "Invincibility—to do anything without consequences",
        scores: { narcissism: 2, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "Healing—to help others in pain",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 9,
    question: "When you succeed at something, your first thought is:",
    answers: [
      {
        text: "I knew I was better than everyone else",
        scores: { narcissism: 5, machiavellianism: 2, psychopathy: 2 }
      },
      {
        text: "Good—this positions me well for the next move",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 2 }
      },
      {
        text: "That was fun—what's the next challenge?",
        scores: { narcissism: 2, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "I'm grateful and want to share this moment",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 10,
    question: "How do you handle being wrong about something?",
    answers: [
      {
        text: "I'm rarely wrong, and when I am, I don't admit it",
        scores: { narcissism: 5, machiavellianism: 3, psychopathy: 2 }
      },
      {
        text: "I adjust my strategy—being wrong is just information",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 3 }
      },
      {
        text: "I don't really dwell on it—I just move on",
        scores: { narcissism: 2, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "I apologize and try to learn from it",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 11,
    question: "Your biggest fear in life is:",
    answers: [
      {
        text: "Being seen as ordinary or forgettable",
        scores: { narcissism: 5, machiavellianism: 2, psychopathy: 1 }
      },
      {
        text: "Being outsmarted or losing control",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 2 }
      },
      {
        text: "Nothing really scares me",
        scores: { narcissism: 2, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "Losing the people I love",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 12,
    question: "When it comes to rules and laws, you believe:",
    answers: [
      {
        text: "They don't apply to exceptional people like me",
        scores: { narcissism: 5, machiavellianism: 3, psychopathy: 3 }
      },
      {
        text: "They're tools—follow them when useful, bend them when not",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 4 }
      },
      {
        text: "Rules are meant to be broken—life is too short",
        scores: { narcissism: 2, machiavellianism: 1, psychopathy: 5 }
      },
      {
        text: "They exist for good reasons and should be followed",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 13,
    question: "In a group project, you typically:",
    answers: [
      {
        text: "Take over because no one else can do it as well",
        scores: { narcissism: 5, machiavellianism: 3, psychopathy: 2 }
      },
      {
        text: "Position yourself to get credit for success",
        scores: { narcissism: 3, machiavellianism: 5, psychopathy: 3 }
      },
      {
        text: "Get bored and let others handle the boring parts",
        scores: { narcissism: 2, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "Collaborate and ensure everyone contributes",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 14,
    question: "How do you feel about revenge?",
    answers: [
      {
        text: "It's essential when someone disrespects me",
        scores: { narcissism: 5, machiavellianism: 3, psychopathy: 3 }
      },
      {
        text: "Best served cold and strategically planned",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 4 }
      },
      {
        text: "Satisfying in the moment—I don't hold grudges long",
        scores: { narcissism: 2, machiavellianism: 2, psychopathy: 5 }
      },
      {
        text: "Not worth the energy—I'd rather forgive and move on",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  },
  {
    id: 15,
    question: "What's your relationship with guilt?",
    answers: [
      {
        text: "I feel guilty when I'm not living up to my potential",
        scores: { narcissism: 5, machiavellianism: 2, psychopathy: 2 }
      },
      {
        text: "Guilt is a weakness that holds people back",
        scores: { narcissism: 2, machiavellianism: 5, psychopathy: 4 }
      },
      {
        text: "I genuinely don't experience much guilt",
        scores: { narcissism: 2, machiavellianism: 3, psychopathy: 5 }
      },
      {
        text: "I feel guilty when I've hurt someone",
        scores: { narcissism: 1, machiavellianism: 1, psychopathy: 1 }
      }
    ]
  }
]

export type ResultType = 'narcissist' | 'machiavellian' | 'psychopath' | 'hybrid' | 'balanced'

export interface ResultProfile {
  type: ResultType
  title: string
  subtitle: string
  description: string
  strengths: string[]
  darkSide: string[]
  recommendation: {
    product: string
    reason: string
    link: string
  }
  color: string
}

export const resultProfiles: Record<ResultType, ResultProfile> = {
  narcissist: {
    type: 'narcissist',
    title: 'The Narcissist',
    subtitle: 'The Spotlight Seeker',
    description: "You're driven by a deep need for admiration and recognition. Your confidence is magnetic, and you naturally command attention in any room. You see yourself as exceptional—and honestly, you probably are. Your self-belief is your superpower.",
    strengths: [
      'Unshakeable confidence',
      'Natural charisma and presence',
      'High ambition and drive',
      'Ability to inspire and lead others'
    ],
    darkSide: [
      'Hypersensitivity to criticism',
      'Difficulty with genuine empathy',
      'Relationships can feel transactional',
      'Fragile ego beneath the surface'
    ],
    recommendation: {
      product: 'Empire Building Coaching',
      reason: "Your natural charisma needs strategic direction. Learn to build a personal brand that monetizes your magnetic presence.",
      link: '/coaching'
    },
    color: '#d4af37'
  },
  machiavellian: {
    type: 'machiavellian',
    title: 'The Machiavellian',
    subtitle: 'The Chess Master',
    description: "You're a strategic thinker who always sees several moves ahead. While others react emotionally, you're calculating outcomes. You understand that the world is a game, and you play to win. Your cold logic is your greatest asset.",
    strengths: [
      'Strategic long-term thinking',
      'Emotional control under pressure',
      'Ability to read people accurately',
      'Goal-oriented decision making'
    ],
    darkSide: [
      'Difficulty trusting others',
      'Can seem cold or calculating',
      'May struggle with genuine connection',
      'Others may eventually see through manipulation'
    ],
    recommendation: {
      product: 'Mind Architecture Coaching',
      reason: "Refine your psychological framework and learn advanced manipulation detection and power dynamics.",
      link: '/coaching'
    },
    color: '#722139'
  },
  psychopath: {
    type: 'psychopath',
    title: 'The Psychopath',
    subtitle: 'The Cold Calculator',
    description: "You experience life without the emotional interference that slows others down. Fear doesn't cloud your judgment. Guilt doesn't haunt your decisions. This gives you a clarity and courage that most people will never understand.",
    strengths: [
      'Fearless decision making',
      'Thrives under pressure',
      'Natural charm and charisma',
      'Unbothered by judgment or criticism'
    ],
    darkSide: [
      'Difficulty with long-term relationships',
      'Impulsivity can create problems',
      'May miss emotional nuances',
      'Others may find you unsettling'
    ],
    recommendation: {
      product: 'Dark Feminine Mastery',
      reason: "Learn to channel your detachment into strategic seduction and create obsession without emotional investment.",
      link: '/coaching'
    },
    color: '#4a1426'
  },
  hybrid: {
    type: 'hybrid',
    title: 'The Dark Triad',
    subtitle: 'The Complete Package',
    description: "You scored high across all three dimensions—narcissism, Machiavellianism, and psychopathy. This rare combination makes you exceptionally effective at influencing others and achieving your goals. You're the person others study but can't quite figure out.",
    strengths: [
      'Maximum psychological flexibility',
      'Can adapt to any situation',
      'Powerful combination of charm, strategy, and fearlessness',
      'Natural leader and influencer'
    ],
    darkSide: [
      'May feel isolated from "normal" people',
      'Risk of overconfidence',
      'Complex relationship with authenticity',
      'Others may sense something "different" about you'
    ],
    recommendation: {
      product: 'Sociopathic Dating Bible + Coaching Bundle',
      reason: "You're ready for the full transformation. Get the book AND a coaching session at a special bundle price.",
      link: '/book'
    },
    color: '#0f172a'
  },
  balanced: {
    type: 'balanced',
    title: 'The Empath',
    subtitle: 'The Vulnerable Target',
    description: "Your scores suggest you have low levels of dark triad traits. You value genuine connection, operate with empathy, and follow your moral compass. This makes you a good person—but also a potential target for those who do have these traits.",
    strengths: [
      'Genuine emotional connections',
      'Strong moral foundation',
      'Trusted by others',
      'Natural empathy and compassion'
    ],
    darkSide: [
      'Vulnerable to manipulation',
      'May be taken advantage of',
      'Difficulty recognizing dark personalities',
      'Can be too trusting'
    ],
    recommendation: {
      product: 'Sociopathic Dating Bible',
      reason: "You need to understand how dark psychology works to protect yourself from those who would exploit your nature.",
      link: '/book'
    },
    color: '#1e3a5f'
  }
}
