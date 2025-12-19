// The Dark Mirror Assessment - Quiz Questions & Scoring Logic
// Scenario-based questions assessing 5 Cluster B personality types + Neurotypical
// Includes functioning assessment for clinical-style diagnosis

export type PersonalityType = 'psychopathic' | 'sociopathic' | 'narcissistic' | 'borderline' | 'histrionic' | 'neurotypical'

export type FunctioningLevel = 'high' | 'moderate' | 'low'

export interface QuizAnswer {
  id: string
  text: string
  type: PersonalityType
}

export interface QuizQuestion {
  id: number
  title: string
  scenario: string
  answers: QuizAnswer[]
  category: 'personality' | 'functioning'
}

export interface QuizScores {
  psychopathic: number
  sociopathic: number
  narcissistic: number
  borderline: number
  histrionic: number
  neurotypical: number
}

export interface FunctioningScores {
  impulseControl: number
  socialSuccess: number
  selfAwareness: number
  relationshipStability: number
  consequenceAwareness: number
}

export interface PersonalityProfile {
  type: PersonalityType
  name: string
  tagline: string
  description: string
  traits: string[]
  strengths: string[]
  blindSpots: string[]
  relationshipPattern: string
}

export interface DiagnosisResult {
  primaryType: PersonalityType
  primaryScore: number
  secondaryType: PersonalityType
  secondaryScore: number
  functioningLevel: FunctioningLevel
  functioningScore: number
  clinicalLabel: string
  description: string
}

// Personality Type Profiles for Results
export const PERSONALITY_PROFILES: Record<PersonalityType, PersonalityProfile> = {
  psychopathic: {
    type: 'psychopathic',
    name: 'The Predator',
    tagline: 'Cold. Calculated. Unstoppable.',
    description: 'You operate from a place of complete emotional detachment. Where others feel, you analyze. Where others react, you calculate. This isn\'t cruelty—it\'s efficiency. You see human interactions as a chess game, and you\'re always three moves ahead.',
    traits: [
      'Emotional detachment as default state',
      'Fearlessness in high-stakes situations',
      'Natural ability to read and manipulate others',
      'Complete absence of guilt or remorse',
      'Superficial charm that activates on command'
    ],
    strengths: [
      'Unshakeable under pressure',
      'Excellent at strategic long-term planning',
      'Immune to emotional manipulation',
      'Natural leadership in crisis situations'
    ],
    blindSpots: [
      'May underestimate emotional bonds',
      'Can appear robotic to perceptive partners',
      'Risk of isolation when mask slips'
    ],
    relationshipPattern: 'You treat relationships as acquisitions. Partners are selected based on utility and status. When they no longer serve your goals, you move on without looking back.'
  },
  sociopathic: {
    type: 'sociopathic',
    name: 'The Wildcard',
    tagline: 'Rules were made to be broken.',
    description: 'You live by your own code—and only your own code. Society\'s rules feel like suggestions at best, obstacles at worst. Your emotions run hot, and when provoked, you strike fast. You\'re not calculating like the psychopath; you\'re reactive, impulsive, and unapologetically chaotic.',
    traits: [
      'Impulsive decision-making',
      'Disregard for social norms and rules',
      'Hot-tempered when challenged',
      'Thrill-seeking behavior',
      'Difficulty maintaining long-term bonds'
    ],
    strengths: [
      'Authentic in a world of pretenders',
      'Fearless in confrontation',
      'Quick to act when others hesitate',
      'Natural boundary-setter'
    ],
    blindSpots: [
      'Impulsivity can sabotage long-term goals',
      'Burns bridges that could have been useful',
      'Struggle to trust others'
    ],
    relationshipPattern: 'Your relationships are intense but short-lived. You connect fast, burn bright, and often leave destruction in your wake. Loyalty exists, but only on your terms.'
  },
  narcissistic: {
    type: 'narcissistic',
    name: 'The Emperor',
    tagline: 'I am the prize. Always.',
    description: 'Your self-worth isn\'t up for debate—it\'s a fact. You know you\'re exceptional, and you expect the world to recognize it. Admiration isn\'t just nice to have; it\'s oxygen. When it\'s withheld, you know exactly how to reclaim the spotlight.',
    traits: [
      'Grandiose sense of self-importance',
      'Deep need for admiration and validation',
      'Sense of entitlement in all interactions',
      'Envy of others, or belief others envy you',
      'Exploitative relationship patterns'
    ],
    strengths: [
      'Unshakeable confidence',
      'Natural ability to command attention',
      'High standards that drive success',
      'Immune to imposter syndrome'
    ],
    blindSpots: [
      'Criticism feels like a personal attack',
      'May miss genuine connection',
      'Vulnerability feels like weakness'
    ],
    relationshipPattern: 'Partners are extensions of your brand. You need someone who reflects well on you, admires you, and never outshines you. When they stop feeding your ego, they become disposable.'
  },
  borderline: {
    type: 'borderline',
    name: 'The Storm',
    tagline: 'Feel everything. Fear nothing.',
    description: 'You experience emotions at a frequency others can\'t comprehend. Love is consuming, fear is paralyzing, and anger is volcanic. You\'re terrified of abandonment, so you test constantly—pushing people away to see who stays.',
    traits: [
      'Intense, rapidly shifting emotions',
      'Fear of real or imagined abandonment',
      'Unstable sense of identity',
      'Pattern of idealization and devaluation',
      'Impulsive, self-sabotaging behaviors'
    ],
    strengths: [
      'Depth of emotional experience',
      'Passionate and all-in when committed',
      'Highly intuitive about others\' emotions',
      'Creative and expressive'
    ],
    blindSpots: [
      'Emotional intensity can overwhelm partners',
      'Self-sabotage when things go well',
      'Struggle to regulate reactions'
    ],
    relationshipPattern: 'You fall hard and fast, putting partners on a pedestal. But when they inevitably disappoint you, the crash is devastating. The cycle of idealization and devaluation keeps repeating.'
  },
  histrionic: {
    type: 'histrionic',
    name: 'The Siren',
    tagline: 'All eyes on me.',
    description: 'You were born for the spotlight, and you know exactly how to command it. Your emotional expressiveness is a performance—and what a performance it is. Attention isn\'t just wanted; it\'s required for your existence.',
    traits: [
      'Constant need to be center of attention',
      'Dramatic emotional expression',
      'Provocative or seductive behavior',
      'Easily influenced by others',
      'Shallow, rapidly shifting emotions'
    ],
    strengths: [
      'Natural charisma and social magnetism',
      'Excellent at making memorable impressions',
      'Adaptable to any social environment',
      'Skilled at reading room dynamics'
    ],
    blindSpots: [
      'Attention-seeking can push people away',
      'Difficulty with genuine intimacy',
      'May feel empty when not performing'
    ],
    relationshipPattern: 'You need a partner who makes you feel seen and special—constantly. Relationships feel like a stage where you must always be the star. When they stop applauding, you find a new audience.'
  },
  neurotypical: {
    type: 'neurotypical',
    name: 'The Balanced',
    tagline: 'Grounded in reality.',
    description: 'You process emotions and relationships in a regulated, healthy way. You can experience the full range of human emotions without being consumed by them. Your responses to stress and conflict are proportionate and considered.',
    traits: [
      'Emotional regulation under stress',
      'Stable sense of identity',
      'Capacity for genuine empathy',
      'Healthy boundary-setting',
      'Proportionate reactions to situations'
    ],
    strengths: [
      'Authentic emotional connections',
      'Long-term relationship stability',
      'Resilience in face of rejection',
      'Balanced self-esteem'
    ],
    blindSpots: [
      'May struggle to understand darker motivations',
      'Can be taken advantage of by manipulators',
      'Might seem "boring" to more intense types'
    ],
    relationshipPattern: 'You seek genuine connection and mutual respect. Disagreements are handled through communication rather than manipulation. You can love without losing yourself.'
  }
}

// The Quiz Questions - Personality Assessment
// Questions are designed to be non-obvious with NT options mixed in
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // PERSONALITY QUESTIONS (1-15)
  {
    id: 1,
    title: 'The Silent Treatment',
    scenario: 'Your partner hasn\'t responded to your messages in two days. No explanation, no warning. You:',
    category: 'personality',
    answers: [
      { id: '1a', text: 'Reach out once more, then give them space. People need time sometimes.', type: 'neurotypical' },
      { id: '1b', text: 'Start planning your exit. If they can\'t communicate, they\'re not worth your energy.', type: 'psychopathic' },
      { id: '1c', text: 'Show up at their place. This is disrespectful and you won\'t tolerate it.', type: 'sociopathic' },
      { id: '1d', text: 'Post something amazing online. Remind them what they\'re missing.', type: 'narcissistic' },
      { id: '1e', text: 'Feel your chest tightening. Check their social media obsessively. What did you do wrong?', type: 'borderline' }
    ]
  },
  {
    id: 2,
    title: 'The Confession',
    scenario: 'A close friend confides they\'re struggling with something embarrassing. You:',
    category: 'personality',
    answers: [
      { id: '2a', text: 'Listen and offer support. Everyone goes through hard times.', type: 'neurotypical' },
      { id: '2b', text: 'Store this information. You never know when vulnerability becomes leverage.', type: 'psychopathic' },
      { id: '2c', text: 'Share something about yourself too—maybe something you shouldn\'t.', type: 'sociopathic' },
      { id: '2d', text: 'Relate it back to a similar (but more impressive) struggle you overcame.', type: 'narcissistic' },
      { id: '2e', text: 'Feel their pain so deeply it almost becomes your own crisis.', type: 'borderline' }
    ]
  },
  {
    id: 3,
    title: 'The Party Dynamics',
    scenario: 'At a social gathering, you notice you\'re not getting much attention tonight. You:',
    category: 'personality',
    answers: [
      { id: '3a', text: 'Focus on having a few good conversations. Not every night needs to be your night.', type: 'neurotypical' },
      { id: '3b', text: 'Observe who has power in the room and position yourself near them.', type: 'psychopathic' },
      { id: '3c', text: 'Leave early. These people clearly don\'t appreciate what you bring.', type: 'sociopathic' },
      { id: '3d', text: 'Tell a story that puts you center stage. Reclaim the spotlight.', type: 'narcissistic' },
      { id: '3e', text: 'Do something attention-grabbing—spill a drink, get emotional, start drama.', type: 'histrionic' }
    ]
  },
  {
    id: 4,
    title: 'The Suspicious Text',
    scenario: 'You see a flirty text notification flash on your partner\'s phone. They don\'t know you saw. You:',
    category: 'personality',
    answers: [
      { id: '4a', text: 'Bring it up calmly. There might be an explanation, and you\'d rather know.', type: 'neurotypical' },
      { id: '4b', text: 'Say nothing. Watch their behavior closely. Gather evidence before confronting.', type: 'psychopathic' },
      { id: '4c', text: 'Confront them immediately. You won\'t be made a fool of.', type: 'sociopathic' },
      { id: '4d', text: 'Start flirting with others too. Level the playing field.', type: 'narcissistic' },
      { id: '4e', text: 'Feel physically sick. Oscillate between confronting them and pretending you didn\'t see.', type: 'borderline' }
    ]
  },
  {
    id: 5,
    title: 'The Mistake',
    scenario: 'You made a significant error at work that might affect a colleague. You:',
    category: 'personality',
    answers: [
      { id: '5a', text: 'Own it and fix it. Mistakes happen—what matters is the response.', type: 'neurotypical' },
      { id: '5b', text: 'Figure out how to subtly shift the blame before anyone notices.', type: 'psychopathic' },
      { id: '5c', text: 'Admit it only if directly accused. Otherwise, not your problem.', type: 'sociopathic' },
      { id: '5d', text: 'Point out that if others had done their jobs, this wouldn\'t have happened.', type: 'narcissistic' },
      { id: '5e', text: 'Spiral into shame. Apologize excessively. Assume everyone hates you now.', type: 'borderline' }
    ]
  },
  {
    id: 6,
    title: 'The Boundary',
    scenario: 'Your partner says they need some alone time this weekend—just for themselves. You:',
    category: 'personality',
    answers: [
      { id: '6a', text: 'Respect it. Make your own plans. Everyone needs space sometimes.', type: 'neurotypical' },
      { id: '6b', text: 'Agree, but use the time to strengthen other connections that serve you.', type: 'psychopathic' },
      { id: '6c', text: 'Feel irritated. What are they doing that doesn\'t include you?', type: 'sociopathic' },
      { id: '6d', text: 'Feel privately insulted. Are you not enough for them?', type: 'narcissistic' },
      { id: '6e', text: 'Panic. Is this the beginning of the end? Do they still love you?', type: 'borderline' }
    ]
  },
  {
    id: 7,
    title: 'The Opportunity',
    scenario: 'You discover information that could help you but would hurt someone who trusts you. You:',
    category: 'personality',
    answers: [
      { id: '7a', text: 'Don\'t use it. Some advantages aren\'t worth the betrayal.', type: 'neurotypical' },
      { id: '7b', text: 'Use it strategically, in a way they\'ll never trace back to you.', type: 'psychopathic' },
      { id: '7c', text: 'Use it without much hesitation. They\'d do the same to you.', type: 'sociopathic' },
      { id: '7d', text: 'Use it if it elevates your status. Your success matters most.', type: 'narcissistic' },
      { id: '7e', text: 'Feel torn apart. Use it, then drown in guilt afterward.', type: 'borderline' }
    ]
  },
  {
    id: 8,
    title: 'The Criticism',
    scenario: 'Someone you respect gives you constructive but painful feedback. You:',
    category: 'personality',
    answers: [
      { id: '8a', text: 'Thank them genuinely. It stings, but they\'re probably right.', type: 'neurotypical' },
      { id: '8b', text: 'Accept it outwardly, file away that they\'re willing to undermine you.', type: 'psychopathic' },
      { id: '8c', text: 'Push back. Who are they to criticize you?', type: 'sociopathic' },
      { id: '8d', text: 'Feel enraged but smile. Find something to criticize about them later.', type: 'narcissistic' },
      { id: '8e', text: 'Feel crushed. Question everything about yourself. Were they ever on your side?', type: 'borderline' }
    ]
  },
  {
    id: 9,
    title: 'The Ex Returns',
    scenario: 'An ex reaches out wanting to reconnect. You\'re in a happy relationship. You:',
    category: 'personality',
    answers: [
      { id: '9a', text: 'Decline politely. You\'ve moved on and that chapter is closed.', type: 'neurotypical' },
      { id: '9b', text: 'Respond warmly. Keep them in your orbit—you never know.', type: 'psychopathic' },
      { id: '9c', text: 'Meet up. Your current partner doesn\'t control who you talk to.', type: 'sociopathic' },
      { id: '9d', text: 'Screenshot it and show your partner. You love being desired.', type: 'narcissistic' },
      { id: '9e', text: 'Tell your partner immediately—in a dramatic way that demands reassurance.', type: 'histrionic' }
    ]
  },
  {
    id: 10,
    title: 'The Rejection',
    scenario: 'Someone you were interested in clearly isn\'t interested in you. You:',
    category: 'personality',
    answers: [
      { id: '10a', text: 'Feel disappointed but move on. Not everyone will be into you, and that\'s okay.', type: 'neurotypical' },
      { id: '10b', text: 'Mentally note what you could\'ve done differently. Refine your approach.', type: 'psychopathic' },
      { id: '10c', text: 'Get angry. Their loss—they\'ll regret this.', type: 'sociopathic' },
      { id: '10d', text: 'Make sure they see you thriving and desirable to others.', type: 'narcissistic' },
      { id: '10e', text: 'Obsess over what\'s wrong with you. Feel worthless for days.', type: 'borderline' }
    ]
  },
  {
    id: 11,
    title: 'The Power Shift',
    scenario: 'Someone you helped is now more successful than you. You:',
    category: 'personality',
    answers: [
      { id: '11a', text: 'Feel genuinely happy for them. Their success doesn\'t diminish yours.', type: 'neurotypical' },
      { id: '11b', text: 'Note how you can leverage this connection now that they\'re valuable.', type: 'psychopathic' },
      { id: '11c', text: 'Feel bitter. You should\'ve gotten more credit.', type: 'sociopathic' },
      { id: '11d', text: 'Remind everyone you were instrumental to their success.', type: 'narcissistic' },
      { id: '11e', text: 'Feel abandoned. They\'ve outgrown you and will leave you behind.', type: 'borderline' }
    ]
  },
  {
    id: 12,
    title: 'The Truth',
    scenario: 'Your partner asks if their outfit looks bad. It does. You:',
    category: 'personality',
    answers: [
      { id: '12a', text: 'Gently suggest something else might be more flattering.', type: 'neurotypical' },
      { id: '12b', text: 'Tell them what they want to hear. What does it matter to you?', type: 'psychopathic' },
      { id: '12c', text: 'Tell them bluntly. Honesty over comfort.', type: 'sociopathic' },
      { id: '12d', text: 'Point out the flaw while comparing it to your own better choice.', type: 'narcissistic' },
      { id: '12e', text: 'Feel anxious about hurting them. Say it looks fine. Hope they don\'t notice later.', type: 'borderline' }
    ]
  },
  {
    id: 13,
    title: 'The Argument',
    scenario: 'A fight with your partner is escalating. They\'re getting emotional. You:',
    category: 'personality',
    answers: [
      { id: '13a', text: 'Suggest a break to cool down. This isn\'t productive right now.', type: 'neurotypical' },
      { id: '13b', text: 'Stay calm and logical. Their emotions are a weakness you can use.', type: 'psychopathic' },
      { id: '13c', text: 'Match their energy. If they want a fight, they\'ll get one.', type: 'sociopathic' },
      { id: '13d', text: 'Turn it around to how their behavior is hurting YOU.', type: 'narcissistic' },
      { id: '13e', text: 'Escalate until it becomes a crisis. Bring up everything from the past.', type: 'borderline' }
    ]
  },
  {
    id: 14,
    title: 'The Test',
    scenario: 'Someone gives you access to their private information—passwords, secrets. You:',
    category: 'personality',
    answers: [
      { id: '14a', text: 'Respect their trust. You wouldn\'t want someone snooping on you.', type: 'neurotypical' },
      { id: '14b', text: 'Look through everything. Information is power, and trust is naivety.', type: 'psychopathic' },
      { id: '14c', text: 'Maybe peek. They shouldn\'t have been so careless.', type: 'sociopathic' },
      { id: '14d', text: 'Look to make sure they\'re not hiding anything about you.', type: 'narcissistic' },
      { id: '14e', text: 'Look for evidence they\'re going to leave you. Find reasons to worry.', type: 'borderline' }
    ]
  },
  {
    id: 15,
    title: 'The Ending',
    scenario: 'A relationship is ending. It\'s mutual but painful. You:',
    category: 'personality',
    answers: [
      { id: '15a', text: 'Grieve it properly. Allow yourself to feel sad and eventually move on.', type: 'neurotypical' },
      { id: '15b', text: 'Move on quickly. You were already preparing alternatives anyway.', type: 'psychopathic' },
      { id: '15c', text: 'Cut them off completely. Once someone\'s out, they\'re out.', type: 'sociopathic' },
      { id: '15d', text: 'Make sure the narrative favors you. Control how others see the breakup.', type: 'narcissistic' },
      { id: '15e', text: 'Stage an unforgettable exit. If it\'s ending, make it memorable.', type: 'histrionic' }
    ]
  },

  // FUNCTIONING ASSESSMENT QUESTIONS (16-20)
  {
    id: 16,
    title: 'Career Trajectory',
    scenario: 'Thinking about your work or school history, which best describes your pattern?',
    category: 'functioning',
    answers: [
      { id: '16a', text: 'Steady progress with occasional setbacks. Generally moving upward.', type: 'neurotypical' },
      { id: '16b', text: 'Strategic moves that serve my long-term goals. Success is calculated.', type: 'psychopathic' },
      { id: '16c', text: 'Frequent job changes. I get bored or clash with authority.', type: 'sociopathic' },
      { id: '16d', text: 'Highs and lows. Sometimes sabotaged by my own emotional reactions.', type: 'borderline' },
      { id: '16e', text: 'Great at first impressions, but relationships at work often sour.', type: 'histrionic' }
    ]
  },
  {
    id: 17,
    title: 'Impulse History',
    scenario: 'When you look back at impulsive decisions you\'ve made, how do you feel?',
    category: 'functioning',
    answers: [
      { id: '17a', text: 'Some regrets, but I\'ve learned from them and make better choices now.', type: 'neurotypical' },
      { id: '17b', text: 'I rarely act impulsively. I prefer calculated moves.', type: 'psychopathic' },
      { id: '17c', text: 'Many regrets. My impulsivity has cost me relationships and opportunities.', type: 'sociopathic' },
      { id: '17d', text: 'Deep shame. I\'ve hurt people and myself in ways I can\'t take back.', type: 'borderline' },
      { id: '17e', text: 'The drama was worth it at the time. I live for intensity.', type: 'histrionic' }
    ]
  },
  {
    id: 18,
    title: 'Relationship Track Record',
    scenario: 'Looking at your romantic relationship history overall:',
    category: 'functioning',
    answers: [
      { id: '18a', text: 'A mix of good and difficult relationships. I\'ve grown from all of them.', type: 'neurotypical' },
      { id: '18b', text: 'I\'ve maintained relationships as long as they were useful to me.', type: 'psychopathic' },
      { id: '18c', text: 'Intense but short. They often end explosively.', type: 'sociopathic' },
      { id: '18d', text: 'Patterns of getting very close then pushing people away. Lots of "almost."', type: 'borderline' },
      { id: '18e', text: 'Partners say I\'m too much—too needy, too dramatic, too everything.', type: 'histrionic' }
    ]
  },
  {
    id: 19,
    title: 'Consequence Awareness',
    scenario: 'When making a decision that might hurt someone, you:',
    category: 'functioning',
    answers: [
      { id: '19a', text: 'Weigh the impact carefully. Try to minimize harm where possible.', type: 'neurotypical' },
      { id: '19b', text: 'Calculate if the consequences will affect you. Others\' feelings aren\'t really your concern.', type: 'psychopathic' },
      { id: '19c', text: 'Often don\'t think about consequences until it\'s too late.', type: 'sociopathic' },
      { id: '19d', text: 'Get overwhelmed by guilt before, during, and after. Sometimes paralyzed by it.', type: 'borderline' },
      { id: '19e', text: 'Think about it, but prioritize your own needs. You deserve to put yourself first.', type: 'narcissistic' }
    ]
  },
  {
    id: 20,
    title: 'Self-Awareness',
    scenario: 'How do you relate to your own patterns and behaviors?',
    category: 'functioning',
    answers: [
      { id: '20a', text: 'I can see my flaws and I\'m actively working on them.', type: 'neurotypical' },
      { id: '20b', text: 'I understand exactly what I am. I use it as a tool.', type: 'psychopathic' },
      { id: '20c', text: 'I know I have issues, but I don\'t really care to change.', type: 'sociopathic' },
      { id: '20d', text: 'I hate aspects of myself but feel powerless to change them.', type: 'borderline' },
      { id: '20e', text: 'I am who I am. People should accept me or leave.', type: 'narcissistic' }
    ]
  }
]

// Calculate scores from answers
export function calculateScores(answers: Record<number, PersonalityType>): QuizScores {
  const scores: QuizScores = {
    psychopathic: 0,
    sociopathic: 0,
    narcissistic: 0,
    borderline: 0,
    histrionic: 0,
    neurotypical: 0
  }

  // Count answers for each type
  Object.values(answers).forEach(type => {
    scores[type]++
  })

  // Convert to percentages
  const total = Object.values(scores).reduce((sum, val) => sum + val, 0)

  if (total === 0) return scores

  return {
    psychopathic: Math.round((scores.psychopathic / total) * 100),
    sociopathic: Math.round((scores.sociopathic / total) * 100),
    narcissistic: Math.round((scores.narcissistic / total) * 100),
    borderline: Math.round((scores.borderline / total) * 100),
    histrionic: Math.round((scores.histrionic / total) * 100),
    neurotypical: Math.round((scores.neurotypical / total) * 100)
  }
}

// Calculate functioning level from functioning questions
export function calculateFunctioning(answers: Record<number, PersonalityType>): { level: FunctioningLevel; score: number } {
  // Functioning questions are 16-20
  const functioningQuestions = [16, 17, 18, 19, 20]
  let adaptiveScore = 0

  functioningQuestions.forEach(qId => {
    const answer = answers[qId]
    if (!answer) return

    // Neurotypical answers indicate high functioning
    // Psychopathic answers indicate calculated/controlled (high functioning)
    // Others indicate varying levels of dysfunction
    switch (answer) {
      case 'neurotypical':
        adaptiveScore += 3
        break
      case 'psychopathic':
        adaptiveScore += 2 // Controlled, strategic = functional
        break
      case 'narcissistic':
        adaptiveScore += 1
        break
      case 'histrionic':
        adaptiveScore += 1
        break
      case 'sociopathic':
        adaptiveScore += 0
        break
      case 'borderline':
        adaptiveScore += 0
        break
    }
  })

  // Max score is 15 (5 questions * 3 points)
  const percentage = Math.round((adaptiveScore / 15) * 100)

  let level: FunctioningLevel
  if (percentage >= 60) {
    level = 'high'
  } else if (percentage >= 30) {
    level = 'moderate'
  } else {
    level = 'low'
  }

  return { level, score: percentage }
}

// Get primary and secondary types from scores
export function getPersonalityTypes(scores: QuizScores): { primary: PersonalityType; secondary: PersonalityType } {
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a) as [PersonalityType, number][]

  return {
    primary: sorted[0][0],
    secondary: sorted[1][0]
  }
}

// Generate clinical diagnosis
export function generateDiagnosis(answers: Record<number, PersonalityType>): DiagnosisResult {
  const scores = calculateScores(answers)
  const { primary, secondary } = getPersonalityTypes(scores)
  const { level, score: functioningScore } = calculateFunctioning(answers)

  const functioningLabels: Record<FunctioningLevel, string> = {
    high: 'High Adaptive Function',
    moderate: 'Moderate Adaptive Function',
    low: 'Low Adaptive Function'
  }

  const primaryProfile = PERSONALITY_PROFILES[primary]

  // Generate clinical-style label
  let clinicalLabel: string
  if (primary === 'neurotypical') {
    clinicalLabel = `Neurotypical Baseline with ${functioningLabels[level]}`
  } else {
    const typeLabel = primary.charAt(0).toUpperCase() + primary.slice(1)
    clinicalLabel = `Primary: ${typeLabel} (${scores[primary]}%) - ${functioningLabels[level]}`
  }

  // Generate description based on functioning
  let description: string
  if (level === 'high') {
    description = `Your ${primaryProfile.name} tendencies operate within socially adaptive boundaries. You've learned to channel these traits productively, maintaining relationships and career progression while preserving your core nature.`
  } else if (level === 'moderate') {
    description = `Your ${primaryProfile.name} patterns show a mix of adaptive and maladaptive expressions. Some areas of life function well while others show strain. Growth potential exists with self-awareness.`
  } else {
    description = `Your ${primaryProfile.name} traits currently manifest in ways that may be causing significant life disruption. Relationships, career, or self-image may be impacted. Consider whether professional support could help.`
  }

  return {
    primaryType: primary,
    primaryScore: scores[primary],
    secondaryType: secondary,
    secondaryScore: scores[secondary],
    functioningLevel: level,
    functioningScore,
    clinicalLabel,
    description
  }
}

// Quiz metadata
export const QUIZ_INFO = {
  name: 'The Dark Mirror Assessment',
  tagline: 'See what\'s really looking back at you.',
  description: 'A 20-question psychological assessment that reveals your dominant personality patterns across Cluster B types, plus a clinical-style functioning evaluation.',
  price: 9.99,
  currency: 'USD',
  questionCount: 20,
  estimatedTime: '5-7 minutes',
  disclaimer: 'DISCLAIMER: The Dark Mirror Assessment is for entertainment and educational purposes only. It is not a clinical diagnosis, psychological evaluation, or medical advice. This quiz was not created by licensed mental health professionals and should not be used as a substitute for professional psychological assessment. The results are self-reported observations and do not constitute a diagnosis of any personality disorder. If you have concerns about your mental health, please consult a licensed mental health professional.'
}
