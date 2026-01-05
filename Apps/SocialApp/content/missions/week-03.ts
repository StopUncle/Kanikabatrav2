// Week 3: The Predator's Gaze
// Master the art of reading weakness

import type { WeeklyMission } from './types';

export const week03Mission: WeeklyMission = {
  id: 'week-03-predators-gaze',
  week: 3,
  title: "The Predator's Gaze",
  subtitle: 'See the world as it is, not as it pretends to be.',
  description: 'Most people navigate the world through a fog of social conditioning—a soft-focus filter of empathy and mutual vulnerability. They see potential partners and friends. You will learn to see a landscape of weakness, a target-rich environment of emotional leverage points. This is not cruelty; it is clarity.',
  icon: 'Eye',
  color: '#DC2626',
  tier: 'free',

  tacticalBrief: {
    opening: 'Before you can influence a system, you must understand it. Before you can pull the levers of human behavior, you must identify where they are. A person\'s greatest strengths are often their greatest weaknesses, just viewed from a different angle. The compassionate are easily guilted. The ambitious are easily flattered. The loyal are easily exploited.',

    concepts: [
      {
        title: 'The Four Horsemen of Weakness',
        content: 'INSECURITY: The black hole of need. They seek external validation to fill an internal void. Core belief: "I am not enough." VANITY: The peacock\'s plume. Addicted to admiration. Core belief: "I must be seen as superior." GUILT: The martyr\'s cross. Constantly atoning, proving goodness. Core belief: "I must earn love through sacrifice." FEAR: The rabbit\'s heart. Prisoners of anxiety, craving safety above all. Core belief: "The world is dangerous."',
      },
      {
        title: 'The Narcissist Taxonomy',
        content: 'THE GRANDIOSE (The Rooster): Overt superiority, name-dropping, status-obsessed. Cannot handle indifference. THE VULNERABLE (The Perpetual Victim): Constant victim narrative, passive-aggressive, uses guilt. Cannot compete if you refuse to engage. THE MALIGNANT (The Predator): Antisocial traits, enjoys your pain, vengeful. Do NOT engage—plan your exit. THE COMMUNAL (The Saint): Derives supply from being seen as selfless. Performative virtue. Question their motives.',
      },
      {
        title: 'The Avoidant Taxonomy',
        content: 'THE DISMISSIVE (The Lone Wolf): Fiercely independent, "I don\'t need anyone," punishes you for loving them. Reverse the chase. THE FEARFUL (The Chaos Agent): Push-pull behavior, self-sabotages when things get good, addicted to chaos. Refuse to engage with drama. THE BUSY (The Delusional Professional): Hides behind calendar, treats relationships like a hobby. Out-busy them—become the scarce resource.',
      },
      {
        title: 'Diagnostic Tells',
        content: 'Insecurity: Fishes for compliments, over-apologizes, compares themselves to others. Vanity: Name-drops, steers conversations to themselves, humblebrags. Guilt: Overly accommodating, cannot say no, history of being taken advantage of. Fear: Avoids conflict, seeks constant reassurance, over-reliant on routines. Watch what they seek—it reveals what they lack.',
      },
      {
        title: 'The Probe Techniques',
        content: 'The Confessional Probe: Share a fabricated vulnerability to encourage them to share a real one. The Hypothetical Probe: Pose a scenario to gauge their moral compass. The Silence Probe: Ask an uncomfortable question and wait—do not fill the silence. They will reveal far more than intended.',
      },
      {
        title: 'The Body Never Lies',
        content: 'The Lip Purse: Tightening lips signals disagreement, even while smiling. The Neck Touch: Hand to throat indicates vulnerability or discomfort. Feet Direction: Feet point toward what we want—toward the door means escape. Mirroring: When they mirror your movements, they are seeking your approval.',
      },
    ],

    keyTakeaways: [
      'Everyone has core weaknesses driving their behavior',
      'What someone seeks reveals what they lack',
      'Know your own weaknesses before analyzing others',
      'Body language reveals what words conceal',
      'Identify narcissist type: Grandiose, Vulnerable, Malignant, or Communal',
      'Identify avoidant type: Dismissive, Fearful, or Busy—each requires different tactics',
      'Perception is the foundation of all influence',
    ],
  },

  objectives: [
    {
      id: 'w3-obj-1',
      text: 'Master the Four Horsemen diagnostic framework',
      type: 'learn',
    },
    {
      id: 'w3-obj-2',
      text: 'Practice identifying weakness tells in 5 people',
      type: 'practice',
    },
    {
      id: 'w3-obj-3',
      text: 'Execute at least one probe technique',
      type: 'practice',
    },
    {
      id: 'w3-obj-4',
      text: 'Practice body language observation for one hour',
      type: 'practice',
    },
    {
      id: 'w3-obj-5',
      text: 'Complete the end-of-week reflection',
      type: 'reflect',
    },
  ],

  fieldExercises: [
    {
      id: 'w3-ex-1',
      task: 'The Four Horsemen Mapping',
      context: 'Choose five people you interact with regularly.',
      successCriteria: 'For each, hypothesize their primary weakness based on behavior. List specific behaviors that support your diagnosis. Identify what this weakness makes them seek and avoid.',
      difficulty: 'beginner',
    },
    {
      id: 'w3-ex-2',
      task: 'The Observation Hour',
      context: 'Go to a busy cafe, bar, or public space.',
      successCriteria: 'Spend one hour observing interactions. For each pair: Who is leaning in? Who is leaning away? Where do their feet point? Identify three people and hypothesize their primary weakness based on body language alone.',
      difficulty: 'beginner',
    },
    {
      id: 'w3-ex-3',
      task: 'The Confessional Probe',
      context: 'In a one-on-one conversation with someone you want to understand better.',
      successCriteria: 'Share a fabricated or exaggerated vulnerability, then observe. Did they reciprocate with a real vulnerability? What did their response reveal about their primary weakness?',
      difficulty: 'intermediate',
    },
    {
      id: 'w3-ex-4',
      task: 'The Silence Probe',
      context: 'In any conversation where you want to extract more information.',
      successCriteria: 'Ask a slightly uncomfortable question, then take a slow sip of your drink and wait. Count the seconds until they break the silence. Note what they reveal in their discomfort.',
      difficulty: 'intermediate',
    },
    {
      id: 'w3-ex-5',
      task: 'The Digital Profile',
      context: 'Choose someone\'s social media to analyze.',
      successCriteria: 'Apply the Four Horsemen framework. What does their content reveal? Constant selfies (insecurity)? Humblebrags (vanity)? Virtue signaling (guilt)? Beige content (fear)? Create a complete profile.',
      difficulty: 'advanced',
    },
  ],

  reflectionPrompts: [
    'What is your own primary weakness from the Four Horsemen? How does it show up?',
    'What patterns did you notice across the people you analyzed?',
    'Which probe technique was most effective? What did it reveal?',
    'How did observing body language change your understanding of a conversation?',
    'Now that you can see weakness, how will you use this perception?',
  ],

  quiz: {
    questions: [
      {
        id: 'w3-q1',
        question: 'What are the Four Horsemen of Weakness?',
        options: [
          'Anger, Sadness, Fear, Joy',
          'Insecurity, Vanity, Guilt, Fear',
          'Pride, Envy, Greed, Lust',
          'Anxiety, Depression, Trauma, Stress',
        ],
        correctIndex: 1,
        explanation: 'The Four Horsemen are Insecurity (needs validation), Vanity (needs admiration), Guilt (needs to atone), and Fear (needs safety).',
      },
      {
        id: 'w3-q2',
        question: 'A Grandiose Narcissist (The Rooster) cannot handle:',
        options: [
          'Direct confrontation',
          'Being ignored or treated with indifference',
          'Logical arguments',
          'Public criticism',
        ],
        correctIndex: 1,
        explanation: 'The Grandiose Narcissist is overt, status-obsessed, and name-drops constantly. Their kryptonite is indifference—they cannot compete if you simply do not care.',
      },
      {
        id: 'w3-q3',
        question: 'The Dismissive Avoidant (The Lone Wolf) should be handled by:',
        options: [
          'Pursuing them more aggressively',
          'Having emotional conversations about the relationship',
          'Reversing the chase—become less available than they are',
          'Giving them more attention and validation',
        ],
        correctIndex: 2,
        explanation: 'The Dismissive Avoidant punishes you for loving them. The counter-move is to reverse the chase: become less available than they are. Out-independent the independent.',
      },
      {
        id: 'w3-q4',
        question: 'You encounter someone who constantly plays the victim, uses passive-aggression, and weaponizes guilt. This is likely:',
        options: [
          'A Grandiose Narcissist',
          'A Vulnerable/Covert Narcissist',
          'A Fearful Avoidant',
          'A Dismissive Avoidant',
        ],
        correctIndex: 1,
        explanation: 'The Vulnerable/Covert Narcissist (The Perpetual Victim) maintains a constant victim narrative, uses passive-aggression, and weaponizes guilt. They cannot compete if you refuse to engage with their drama.',
      },
    ],
  },

  requirements: {
    minExercisesCompleted: 3,
    reflectionRequired: true,
  },
};
